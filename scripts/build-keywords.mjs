import fs from 'node:fs';
import path from 'node:path';
import { parseCsv } from './csv.mjs';
import { SUBCATEGORIES } from './subcategory-map.mjs';

const ROOT = path.resolve(process.cwd(), '..');
const BANK_DIR = path.join(ROOT, 'Whisky Keywords Bank');

function loadCsv(name) {
  const file = path.join(BANK_DIR, `${name}_all-keywords_au_2026-09-28.csv`);
  if (!fs.existsSync(file)) {
    console.warn(`Missing keyword CSV: ${name}`);
    return [];
  }
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  return rows
    .map((r) => ({
      keyword: (r['Keyword'] || '').trim().replace(/[.,;:!?]+$/g, '').replace(/(?<=[a-z])\.(?=[a-z])/gi, ' ').replace(/\s+/g, ' ').trim(),
      intent: (r['Intent'] || '').trim(),
      relevance: parseInt(r['Relevance'] || '0', 10) || 0,
      volume: parseInt(r['Volume'] || '0', 10) || 0,
      kd: r['Keyword Difficulty'] ? parseInt(r['Keyword Difficulty'], 10) : null,
    }))
    .filter((r) => r.keyword.length > 1);
}

function isCommercialOrTransactional(intent) {
  return /commercial|transactional/i.test(intent);
}

// Some liqueur/spirit names double as color, paint or lure terms (Chartreuse
// being the obvious case) — the keyword bank mixes those unrelated searches
// in with genuine drink-buying intent, so strip anything that looks off-topic.
const OFF_TOPIC_PATTERN = /\b(paint|lure|colou?r|fashion|dress|shoe|nail|pantone|hex|wall|carpet|fabric|etymology|meaning|eyes|rgb|hue)\b/i;

function isRepeatWordNoise(keyword) {
  const words = keyword.toLowerCase().trim().split(/\s+/);
  if (words.length === 2 && words[0] === words[1]) return true;
  // Catch "AB AB" duplication artifacts (e.g. "grey goose grey goose")
  if (words.length === 4 && words[0] === words[2] && words[1] === words[3]) return true;
  if (words.length >= 4 && words.length % 2 === 0) {
    const half = words.length / 2;
    if (words.slice(0, half).join(' ') === words.slice(half).join(' ')) return true;
  }
  return false;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

// Collapses near-identical misspellings of the same keyword (e.g. "chartreuse"
// vs "charteuse"/"chatreuse") down to whichever spelling has the highest
// search volume, so typo variants never surface in visible copy or the
// primary/secondary keyword arrays.
function dedupeNearSpellings(rows) {
  // Only the top ~150 by volume are ever used downstream (primary + 20
  // secondary + FAQ seeds), so cap the pairwise-comparison pool for speed.
  const sorted = [...rows].sort((a, b) => b.volume - a.volume).slice(0, 150);
  const accepted = [];
  for (const r of sorted) {
    const norm = r.keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isDuplicate = accepted.some((a) => {
      const aNorm = a.keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
      const maxLen = Math.max(aNorm.length, norm.length);
      if (Math.abs(aNorm.length - norm.length) > Math.ceil(maxLen / 3)) return false;
      if (maxLen < 5) return aNorm === norm;
      const threshold = maxLen <= 6 ? 1 : maxLen <= 10 ? 2 : maxLen <= 14 ? 3 : 4;
      return levenshtein(aNorm, norm) <= threshold;
    });
    if (!isDuplicate) accepted.push(r);
  }
  return accepted;
}

function buildForSubcategory(sub) {
  const allRows = [];
  for (const csvName of sub.keywordFiles) {
    allRows.push(...loadCsv(csvName));
  }

  // Dedupe by lowercase keyword. The same keyword often appears in more than
  // one merged CSV (e.g. "disaronno" shows up in both Disaronno's own file
  // AND as a comparison term inside Campari's file) with the SAME rounded
  // volume but very different relevance — so break ties on relevance, not
  // just "whichever file loaded last".
  const byKeyword = new Map();
  for (const r of allRows) {
    const key = r.keyword.toLowerCase();
    const existing = byKeyword.get(key);
    if (!existing || r.volume > existing.volume || (r.volume === existing.volume && r.relevance > existing.relevance)) {
      byKeyword.set(key, r);
    }
  }
  const rows = Array.from(byKeyword.values()).filter((r) => !isRepeatWordNoise(r.keyword) && !OFF_TOPIC_PATTERN.test(r.keyword));

  // On-topic, reasonably clean rows (filter out low-relevance junk/typos)
  const clean = dedupeNearSpellings(rows.filter((r) => r.relevance >= 80 && r.volume >= 10));
  const looseClean = dedupeNearSpellings(rows.filter((r) => r.relevance >= 65 && r.volume >= 10));

  const commercial = clean.filter((r) => isCommercialOrTransactional(r.intent));
  const byVolumeDesc = [...commercial].sort((a, b) => b.volume - a.volume);

  // Prefer a primary keyword that actually contains the subcategory's own hint words
  let primaryCandidates = byVolumeDesc;
  if (sub.primaryHints && sub.primaryHints.length > 0) {
    const hinted = byVolumeDesc.filter((r) =>
      sub.primaryHints.some((hint) => r.keyword.toLowerCase().includes(hint.toLowerCase()))
    );
    if (hinted.length > 0) primaryCandidates = hinted;
  }
  const primary = sub.primaryOverride
    ? { keyword: sub.primaryOverride }
    : (primaryCandidates[0] || byVolumeDesc[0] || clean.sort((a, b) => b.volume - a.volume)[0]);

  const secondaryPool = byVolumeDesc.filter((r) => r.keyword.toLowerCase() !== primary?.keyword.toLowerCase());
  const secondaryKeywords = secondaryPool.slice(0, 20).map((r) => r.keyword);
  const padPools = [clean, looseClean];
  for (const pool of padPools) {
    while (secondaryKeywords.length < 15) {
      const next = pool
        .filter((r) => r.keyword.toLowerCase() !== primary?.keyword.toLowerCase() && !secondaryKeywords.some((k) => k.toLowerCase() === r.keyword.toLowerCase()))
        .sort((a, b) => b.volume - a.volume)[secondaryKeywords.length % pool.length];
      if (!next) break;
      if (!secondaryKeywords.some((k) => k.toLowerCase() === next.keyword.toLowerCase())) {
        secondaryKeywords.push(next.keyword);
      } else break;
    }
  }

  // FAQ seeds: high-volume, low-KD, commercial/transactional keywords (progressively relaxed thresholds)
  const looseCommercial = looseClean.filter((r) => isCommercialOrTransactional(r.intent));
  const faqSeeds = [];
  const thresholds = [
    { pool: commercial, kd: 30, vol: 200 },
    { pool: looseCommercial, kd: 35, vol: 100 },
    { pool: looseCommercial, kd: 60, vol: 30 },
    { pool: looseClean, kd: 100, vol: 10 },
  ];
  for (const { pool, kd, vol } of thresholds) {
    if (faqSeeds.length >= 3) break;
    const candidates = pool
      .filter((r) => (r.kd === null || r.kd <= kd) && r.volume >= vol)
      .sort((a, b) => b.volume - a.volume);
    for (const r of candidates) {
      if (faqSeeds.length >= 3) break;
      if (faqSeeds.some((f) => f.keyword.toLowerCase() === r.keyword.toLowerCase())) continue;
      faqSeeds.push({ keyword: r.keyword, volume: r.volume, kd: r.kd ?? 20 });
    }
  }

  return {
    primaryKeyword: primary ? primary.keyword : sub.name.toLowerCase(),
    secondaryKeywords,
    faqSeeds,
  };
}

const output = {};
for (const sub of SUBCATEGORIES) {
  output[sub.slug] = buildForSubcategory(sub);
  console.log(`${sub.slug}: primary="${output[sub.slug].primaryKeyword}" secondary=${output[sub.slug].secondaryKeywords.length} faq=${output[sub.slug].faqSeeds.length}`);
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'keywords-manifest.json'),
  JSON.stringify(output, null, 2)
);
console.log('\nWrote scripts/keywords-manifest.json');
