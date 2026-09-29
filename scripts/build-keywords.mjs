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
      keyword: (r['Keyword'] || '').trim().replace(/[.,;:!?]+$/g, '').trim(),
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

function isRepeatWordNoise(keyword) {
  const words = keyword.toLowerCase().trim().split(/\s+/);
  if (words.length === 2 && words[0] === words[1]) return true;
  return false;
}

function buildForSubcategory(sub) {
  const allRows = [];
  for (const csvName of sub.keywordFiles) {
    allRows.push(...loadCsv(csvName));
  }

  // Dedupe by lowercase keyword, keep highest-volume occurrence
  const byKeyword = new Map();
  for (const r of allRows) {
    const key = r.keyword.toLowerCase();
    const existing = byKeyword.get(key);
    if (!existing || r.volume > existing.volume) byKeyword.set(key, r);
  }
  const rows = Array.from(byKeyword.values()).filter((r) => !isRepeatWordNoise(r.keyword));

  // On-topic, reasonably clean rows (filter out low-relevance junk/typos)
  const clean = rows.filter((r) => r.relevance >= 80 && r.volume >= 10);
  const looseClean = rows.filter((r) => r.relevance >= 65 && r.volume >= 10);

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
