// Keyword-engine pipeline (Mode A) for Doctors of Whisky.
// Reads every CSV in "Whisky Keywords Bank/", applies the keyword-engine filter/tier/intent rules,
// maps keyword pools onto the site's subcategories and writes:
//   lib/data/seo-keywords.ts   (generated, consumed by the site)
//   docs/keyword-master.md, keyword-map.md, keyword-cluster.txt   (internal strategy, never in public/)
// Usage: node scripts/seo-strategy.mjs   (run from DOCTORS-OF-WHISKY/)
import fs from 'node:fs';
import path from 'node:path';
import { SUBCATEGORIES } from './subcategory-map.mjs';

const ROOT = process.cwd();
const BANK = path.resolve(ROOT, '..', 'Whisky Keywords Bank');
const DOCS = path.join(ROOT, 'docs');
fs.mkdirSync(DOCS, { recursive: true });

// ---------- load ----------
// The bank mixes several CSV layouts (Trend / Potential Traffic / Personal KD columns), so columns are read by header name.
function splitLine(line) {
  const f = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { f.push(cur); cur = ''; }
    else cur += c;
  }
  f.push(cur);
  return f;
}
const byFile = {};
let rawRows = 0;
for (const f of fs.readdirSync(BANK).filter((n) => n.endsWith('.csv'))) {
  const src = f.split('_all-keywords')[0];
  const rows = [];
  const lines = fs.readFileSync(path.join(BANK, f), "utf8").split(/\r?\n/);
  const header = splitLine(lines[0]).map((h) => h.trim());
  const ix = (n) => header.indexOf(n);
  const [iK, iI, iR, iV, iD] = [ix('Keyword'), ix('Intent'), ix('Relevance'), ix('Volume'), ix('Keyword Difficulty')];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const c = splitLine(lines[i]);
    rawRows++;
    const k = (c[iK] || '').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,;:!?]+$/g, '');
    if (!k) continue;
    rows.push({ k, intent: c[iI] || '', rel: +c[iR] || 0, vol: +c[iV] || 0, kd: c[iD] === '' || c[iD] === undefined ? null : +c[iD], src });
  }
  byFile[src] = rows;
}

// ---------- cleaning ----------
const OFF_TOPIC = /\b(paint|lure|colou?r|fashion|dress|shoe|nail|pantone|hex|wall|carpet|fabric|etymology|eyes|rgb|hue|pizza|cafe|coca cola|coke|fattening|calories|lyrics|meme|logo|wallpaper|font|movie|song|tattoo|casino|cricket|football|nfl|nba|lawn|garden|fertili[sz]er|dog|cat|baby|pregnan|acne|diet|ml to|oz to|converter|salary|jobs|career|stock|share price|asx|nyse|bar sydney|cafe|restaurant|clothing|apparel|lagery|merch|shirt|hat|candle|perfume|soap|recipe book)\b/i;
const LATIN = /^[a-z0-9 '&.\-éèñüöäíóáúç]+$/i;

function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
    prev = cur;
  }
  return prev[n];
}
// true when `a` looks like a misspelling/variant of `b` (b already accepted, higher volume)
function isVariantOf(a, b) {
  if (a === b) return true;
  const aw = a.split(' '), bw = b.split(' ');
  if (aw.length === bw.length) {
    let diff = 0;
    for (let i = 0; i < aw.length; i++) {
      if (aw[i] === bw[i]) continue;
      if (/\d/.test(aw[i]) || /\d/.test(bw[i])) return false;
      const maxLen = Math.max(aw[i].length, bw[i].length);
      if (maxLen < 5 || aw[i][0] !== bw[i][0]) return false;
      if (lev(aw[i], bw[i]) > (maxLen >= 8 ? 2 : 1)) return false;
      diff++;
    }
    return diff <= 1;
  }
  // "s" plural / "the" prefix
  const strip = (s) => s.replace(/^the /, '').replace(/s$/, '');
  return strip(a) === strip(b);
}
function repeatNoise(k) {
  const w = k.split(' ');
  if (w.length >= 2 && w.length % 2 === 0) {
    const h = w.length / 2;
    if (w.slice(0, h).join(' ') === w.slice(h).join(' ')) return true;
  }
  return w.some((x, i) => x.length > 2 && w.indexOf(x) !== i);
}
const isCT = (i) => /commercial|transactional/i.test(i);
const isInfo = (i) => /informational|navigational/i.test(i);
const isTrans = (i) => /transactional/i.test(i);
function tier(kd) {
  if (kd === null) return 'U';
  if (kd <= 25) return 'T1';
  if (kd <= 40) return 'T2';
  if (kd <= 55) return 'T3';
  return 'X';
}
function mainIntent(i) {
  if (/transactional/i.test(i)) return 'Transactional';
  if (/commercial/i.test(i)) return 'Commercial';
  if (/navigational/i.test(i)) return 'Navigational';
  return 'Informational';
}

const STOP = new Set(['all', 'the', 'and', 'non', 'energy', 'water']);
function topicTokens(src) {
  return src.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[-\s]+/).filter((t) => t.length >= 3 && !STOP.has(t));
}
function topical(r) {
  return topicTokens(r.src).some((t) => r.k.includes(t));
}
function cleanPool(rows, { relMin = 65, volMin = 70 } = {}) {
  const seen = new Map();
  for (const r of rows) {
    if (r.vol < volMin) continue;
    if (r.rel < relMin && !(r.rel >= 35 && topical(r))) continue;
    if (!LATIN.test(r.k) || OFF_TOPIC.test(r.k) || repeatNoise(r.k)) continue;
    if (r.kd !== null && r.kd > 55) continue; // keyword-engine: KD 56+ dropped
    const e = seen.get(r.k);
    if (!e || r.vol > e.vol || (r.vol === e.vol && r.rel > e.rel)) seen.set(r.k, r);
  }
  const sorted = [...seen.values()].sort((a, b) => b.vol - a.vol || b.rel - a.rel);
  const accepted = [];
  for (const r of sorted) {
    if (accepted.some((a) => isVariantOf(r.k, a.k))) continue;
    accepted.push(r);
  }
  return accepted;
}

const GLOBAL = new Map();
for (const r of Object.values(byFile).flat()) {
  const e = GLOBAL.get(r.k);
  if (!e || r.vol > e.vol) GLOBAL.set(r.k, r);
}
const PRIMARY_OVERRIDES = {
  'non-alcoholic-beer': 'non alcoholic beer',
  'zero-sugar-seltzers': 'zero sugar seltzer',
  'rose-wine': 'rose wine',
  'port-wine': 'port wine',
  'french-vodka': 'french vodka',
  cider: 'cider',
  bourbon: 'bourbon',
  'rye-whiskey': 'rye whiskey',
  patron: 'patron',
  'australian-whisky': 'australian whiskey',
  'cognac-brandy': 'cognac',
  'mixers-water-condiments': 'energy drinks',
  'port-wine': 'port wine',
};

// ---------- per subcategory (two passes: all primaries are reserved first, then secondaries) ----------
const TYPE_WORDS = ['gin', 'rum', 'beer', 'vodka', 'tequila', 'mezcal', 'whisky', 'wine', 'cognac', 'brandy', 'liqueur', 'cider', 'lager', 'bourbon', 'soju', 'baijiu', 'sake', 'champagne', 'prosecco', 'seltzer', 'absinthe', 'sambuca', 'amaro', 'limoncello', 'ipa', 'stout', 'ale', 'whiskey'];
const norm = (t) => (t === 'whiskey' ? 'whisky' : t);
function allowedTypes(sub) {
  const text = `${sub.name} ${sub.keywordFiles.join(' ')}`.toLowerCase().replace(/-/g, ' ');
  return new Set(TYPE_WORDS.filter((t) => new RegExp(`\\b${t}s?\\b`).test(text)).map(norm));
}
function offType(k, allowed) {
  const found = TYPE_WORDS.filter((t) => new RegExp(`\\b${t}s?\\b`).test(k)).map(norm);
  return found.some((t) => !allowed.has(t));
}
const stripAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const GENERIC = new Set(['whiskey', 'whisky', 'vodka', 'tequila', 'rum', 'wine', 'beer', 'liqueur', 'cream']);
const out = {};
const clusterLines = [];
const mapRows = [];
const usedKeywords = new Set();
// Brand/specific subcategories reserve first so generic head terms ("vodka", "tequila") fall to the umbrella pages.
const ORDER = (s) => (['grey-goose', 'belvedere', 'patron', 'don-julio', 'jose-cuervo'].includes(s.slug) ? 0 : 1);
const SUBS = [...SUBCATEGORIES].sort((a, b) => ORDER(a) - ORDER(b));
const ctx = new Map();

// pass 1 — pools + primaries
for (const sub of SUBS) {
  const merged = [];
  for (const f of sub.keywordFiles) merged.push(...(byFile[f] || []));
  const allowed = allowedTypes(sub);
  const pool = cleanPool(merged).filter((r) => !offType(r.k, allowed));
  const ct = pool.filter((r) => isCT(r.intent));
  const info = pool.filter((r) => isInfo(r.intent) && !isCT(r.intent));

  // primary: head term for the subcategory. A commercial term wins unless a non-commercial head term has more
  // than twice its volume (keyword-engine: category pages take the head term).
  const nameTokens = stripAccents(sub.name.toLowerCase()).split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w));
  const nonGeneric = nameTokens.filter((w) => !GENERIC.has(w));
  const forced = PRIMARY_OVERRIDES[sub.slug] || sub.primaryOverride;
  let prim;
  if (forced) {
    const g = GLOBAL.get(forced);
    prim = { k: forced, vol: g ? g.vol : 0, kd: g ? g.kd : null };
  } else {
    const ok = (r) => r.kd !== null && r.kd <= 40 && !usedKeywords.has(r.k);
    let cand = pool.filter((r) => ok(r) && nameTokens.every((w) => r.k.replace(/whiskey/g, 'whisky').includes(w))).sort((a, b) => b.vol - a.vol);
    if (!cand.length) cand = pool.filter((r) => ok(r) && (nonGeneric.length ? nonGeneric : nameTokens).some((w) => r.k.includes(w))).sort((a, b) => b.vol - a.vol);
    const bestAny = cand[0];
    const bestCt = cand.find((r) => isCT(r.intent));
    prim = bestCt && bestAny && bestCt.vol * 2 >= bestAny.vol ? bestCt : (bestAny || ct.find((r) => !usedKeywords.has(r.k)) || pool[0]);
  }
  usedKeywords.add(prim.k);
  ctx.set(sub.slug, { pool, ct, info, prim });
}

// pass 2 — secondaries, tags, FAQ seeds
for (const sub of SUBS) {
  const { pool, ct, info, prim } = ctx.get(sub.slug);
  // secondary: T1/T2 commercial keywords, on-topic for this subcategory (share a token with name/brand files), max 20
  const brandTokens = new Set([...stripAccents(sub.name.toLowerCase()).split(/\s+/), ...sub.keywordFiles.flatMap((f) => stripAccents(f.toLowerCase()).split(/[-\s]+/))].filter((w) => w.length >= 3 && !STOP.has(w)));
  const BRAND_SUBS = ['grey-goose', 'belvedere', 'patron', 'don-julio', 'jose-cuervo'];
  const brandOnly = stripAccents(sub.name.toLowerCase()).split(/s+/).filter((w) => w.length >= 3);
  const onTopic = BRAND_SUBS.includes(sub.slug)
    ? (r) => brandOnly.some((t) => r.k.includes(t)) || (sub.slug === 'grey-goose' && /gr[ae]y goose/.test(r.k))
    : (r) => [...brandTokens].some((t) => r.k.includes(t)) || r.rel >= 80;
  const secondary = ct
    .filter((r) => !usedKeywords.has(r.k) && r.kd !== null && r.kd <= 40 && onTopic(r))
    .slice(0, 20);
  secondary.forEach((r) => usedKeywords.add(r.k)); // one keyword = one URL (no cannibalisation)
  // tags: every commercial/transactional keyword with volume >= 70 (hidden, JSON-LD + meta only)
  const tags = ct.filter(onTopic).slice(0, 150).map((r) => r.k);
  const faqSeeds = [...ct, ...info]
    .filter((r) => r.kd !== null && r.kd <= 40 && onTopic(r) && r.k !== prim.k)
    .sort((a, b) => b.vol - a.vol)
    .slice(0, 12)
    .map((r) => ({ keyword: r.k, volume: r.vol, kd: r.kd, intent: mainIntent(r.intent) }));
  const informational = info.filter(onTopic).slice(0, 25).map((r) => ({ keyword: r.k, volume: r.vol, kd: r.kd, intent: mainIntent(r.intent) }));
  const transactional = ct.filter((r) => isTrans(r.intent) && onTopic(r)).slice(0, 15).map((r) => r.k);

  out[sub.slug] = {
    primary: prim.k,
    primaryVolume: prim.vol,
    primaryKd: prim.kd,
    secondary: secondary.map((r) => r.k),
    tags,
    faqSeeds,
    informational,
    transactional,
  };
  mapRows.push({ sub, prim, secondary, tags: tags.length, pool: pool.length });
  clusterLines.push(`${sub.slug} | primary: ${prim.k} (vol ${prim.vol}, KD ${prim.kd ?? 'n/a'}) | secondary: ${secondary.slice(0, 5).map((r) => r.k).join('; ')} | lsi: ${secondary.slice(5, 20).map((r) => r.k).join('; ')}`);
}

// ---------- category head terms (unassigned high-volume keywords go to the category pages) ----------
const CAT_OF = Object.fromEntries(SUBCATEGORIES.map((x) => [x.slug, x.category]));
const categoryKeywords = {};
for (const sub of SUBCATEGORIES) {
  const { pool } = ctx.get(sub.slug);
  const bucket = (categoryKeywords[sub.category] ||= new Map());
  for (const r of pool) if (r.kd !== null && r.kd <= 55 && r.vol >= 1000 && !usedKeywords.has(r.k) && isCT(r.intent)) bucket.set(r.k, r);
}
const CATEGORY_KEYWORDS = Object.fromEntries(Object.entries(categoryKeywords).map(([c, m]) => [c, [...m.values()].sort((a, b) => b.vol - a.vol).slice(0, 12).map((r) => r.k)]));

// ---------- site-wide ----------
const allRows = Object.values(byFile).flat();
const sitePool = cleanPool(allRows, { relMin: 70, volMin: 70 });
const siteCT = sitePool.filter((r) => isCT(r.intent));
const siteTags = siteCT.slice(0, 200).map((r) => r.k);

const top = (arr, n) => arr.slice(0, n);
const rel80 = cleanPool(allRows, { relMin: 80, volMin: 70 });
const low = top(rel80.filter((r) => r.kd !== null && r.kd <= 30), 25);
const high = top(rel80.filter((r) => r.kd !== null && r.kd > 30 && r.kd <= 55), 25);

// transactional modifiers = quickest revenue keywords
const MOD = /\b(buy|online|price|cheap|sale|order|shop|delivery|near me|australia|au|sydney|melbourne|gift|store|deal|discount|for sale|cost)\b/i;
const moneyKw = cleanPool(allRows, { relMin: 65, volMin: 70 })
  .filter((r) => isCT(r.intent) && MOD.test(r.k) && r.kd !== null && r.kd <= 35)
  .slice(0, 60);

// generated TS
const ts = `// GENERATED by scripts/seo-strategy.mjs from the Whisky Keywords Bank — do not edit by hand.
export interface SeoKeywordSet {
  primary: string;
  primaryVolume: number;
  primaryKd: number | null;
  secondary: string[];
  /** commercial + transactional keywords with volume >= 70 — emitted as meta keywords / JSON-LD keywords only, never as visible text */
  tags: string[];
  faqSeeds: { keyword: string; volume: number; kd: number; intent: string }[];
  informational: { keyword: string; volume: number; kd: number | null; intent: string }[];
  transactional: string[];
}

export const SEO_KEYWORDS: Record<string, SeoKeywordSet> = ${JSON.stringify(out, null, 1)};

export const SITE_TAGS: string[] = ${JSON.stringify(siteTags)};

export const CATEGORY_KEYWORDS: Record<string, string[]> = ${JSON.stringify(CATEGORY_KEYWORDS, null, 1)};
`;
fs.writeFileSync(path.join(ROOT, 'lib', 'data', 'seo-keywords.ts'), ts);

// ---------- docs ----------
const prodText = [...fs.readFileSync(path.join(ROOT, 'lib', 'data', 'products.ts'), 'utf8').matchAll(/"(?:name|brand)": "([^"]+)"/g)].map((m) => m[1].toLowerCase());
const TYPE_SET = new Set(TYPE_WORDS);
const FILLER = new RegExp('^(buy|best|cheap|online|price|australia|au|near|me|the|for|and|drink|drinks|brands|alcohol|with|of)$');
function stocked(k) {
  const toks = k.split(' ').filter((t) => !TYPE_SET.has(t.replace(/s$/, '')) && t.length > 2 && !FILLER.test(t));
  if (!toks.length) return 'category';
  return prodText.some((p) => toks.every((t) => p.includes(t))) ? 'yes' : 'no';
}
const fmt = (r, i) => `| ${i + 1} | ${r.k} | ${r.vol.toLocaleString()} | ${r.kd} | ${mainIntent(r.intent)} | ${r.src.replace(/-/g, ' ')} | ${stocked(r.k)} |`;
let md = `# Doctors of Whisky — Keyword Master (internal, never publish)\n\nGenerated ${new Date().toISOString().slice(0, 10)} by \`scripts/seo-strategy.mjs\` from ${Object.keys(byFile).length} keyword-bank CSVs (${rawRows.toLocaleString()} raw rows).\n\nFilters (keyword-engine rules): relevance >= 65, volume >= 70, KD <= 55 (KD 56+ dropped), typo/variant/duplicate collapse, off-topic strip.\nTiers: T1 KD 0-25 (quick win) | T2 KD 26-40 | T3 KD 41-55 (supporting only, never a primary).\n\n## Top 25 high-volume keywords — LOW difficulty (KD 0-30)\n\n| # | Keyword | Volume/mo | KD | Intent | Source | In catalogue |\n|---|---|---|---|---|---|---|\n${low.map(fmt).join('\n')}\n\n## Top 25 high-volume keywords — HIGHER difficulty (KD 31-55)\n\n| # | Keyword | Volume/mo | KD | Intent | Source | In catalogue |\n|---|---|---|---|---|---|---|\n${high.map(fmt).join('\n')}\n\n## Quick-win transactional keywords (buy / price / online / delivery modifiers, KD <= 35)\n\n| # | Keyword | Volume/mo | KD | Intent | Source | In catalogue |\n|---|---|---|---|---|---|---|\n${moneyKw.map(fmt).join('\n')}\n\n## Primary + secondary keywords per subcategory page\n\n`;
for (const { sub, prim, secondary } of mapRows) {
  md += `### ${sub.name} — /shop/${sub.category}/collection/${sub.slug}/\n- **Primary:** ${prim.k} (vol ${prim.vol.toLocaleString()}, KD ${prim.kd ?? 'n/a'})\n- **Secondary (T1/T2):** ${secondary.map((r) => `${r.k} (${r.vol}/${r.kd})`).join(', ') || '—'}\n- **Hidden tags:** ${out[sub.slug].tags.length} commercial/transactional keywords, volume >= 70\n\n`;
}
md += '## Category-page head terms (unassigned, volume >= 1,000)\n\n';
for (const [c, l] of Object.entries(CATEGORY_KEYWORDS)) md += `- **${c}**: ${l.join(', ')}\n`;
fs.writeFileSync(path.join(DOCS, 'keyword-master.md'), md);

let map = `# keyword-map.md — one cluster = one URL\n\n| URL | Page type | Primary (vol/KD) | Tier | Secondary keywords | Tags (hidden) |\n|---|---|---|---|---|---|\n`;
for (const { sub, prim, secondary, tags } of mapRows) {
  map += `| /shop/${sub.category}/collection/${sub.slug}/ | subcategory | ${prim.k} (${prim.vol}/${prim.kd ?? 'n/a'}) | ${tier(prim.kd)} | ${secondary.slice(0, 5).map((r) => r.k).join('; ')} | ${tags} |\n`;
}
fs.writeFileSync(path.join(DOCS, 'keyword-map.md'), map);
fs.writeFileSync(path.join(DOCS, 'keyword-cluster.txt'), clusterLines.join('\n') + '\n');
fs.writeFileSync(path.join(DOCS, 'quick-wins.json'), JSON.stringify({ low, high, moneyKw }, null, 1));

// ---------- blog plan, FAQ bank, product gaps ----------
const QUESTION = /^(what|how|is|are|can|does|do|where|which|why|when|should|who|will|whats)\b/;
const cap = (k) => k.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bIpa\b/g, 'IPA').replace(/\bVsop\b/g, 'VSOP');
const slugOf = (k) => k.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// existing blog primaries (already covered) — read from the data file
const blogSrc = fs.readFileSync(path.join(ROOT, 'lib', 'data', 'blog.ts'), 'utf8');
const extraSrc = ['blog-extra-whisky', 'blog-extra-spirits', 'blog-extra-drinks']
  .map((f) => fs.readFileSync(path.join(ROOT, 'lib', 'data', f + '.ts'), 'utf8'))
  .join(' ');
const existingBlog = [...blogSrc.matchAll(/"primaryKeyword": "([^"]+)"/g), ...extraSrc.matchAll(/primaryKeyword: '([^']+)'/g)].map((m) => m[1]);
const existingSlugs = [...blogSrc.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]);

const blogCandidates = [];
for (const sub of SUBCATEGORIES) {
  const { pool } = ctx.get(sub.slug);
  const BAD_BLOG = /\b(hotel|beverage|gingerbread|blanc|amaretto|resort|cafe|motel|bar|pub|shop|store|near me|lyrics|clothing)\b|\b(and|of|the|with|a|in|on|for)$|^(and|of|the|with|a)\b|\b(wine and|and white|and red)\b/;
  const infoRows = pool.filter(
    (r) =>
      isInfo(r.intent) &&
      r.kd !== null &&
      r.kd <= 40 &&
      r.vol >= 390 &&
      !usedKeywords.has(r.k) &&
      !existingBlog.includes(r.k) &&
      !BAD_BLOG.test(r.k) &&
      stocked(r.k) !== 'no' // only topics the shop can actually link to and sell
  );
  for (const r of infoRows.slice(0, 4)) blogCandidates.push({ ...r, sub });
}
const seenBlog = new Set();
const blogList = blogCandidates
  .sort((a, b) => (tier(a.kd) === tier(b.kd) ? b.vol - a.vol : tier(a.kd) < tier(b.kd) ? -1 : 1))
  .filter((r) => (seenBlog.has(r.k) ? false : (seenBlog.add(r.k), true)))
  .slice(0, 36);
const titleFor = (k) => (QUESTION.test(k) ? `${cap(k)}?` : / vs /.test(k) ? `${cap(k)}: What's the Difference?` : `${cap(k)}: The Australian Buyer's Guide`);
let blog = `# blog-plan.md — internal (never publish)\n\nGenerated from the keyword bank. Existing guides: ${existingSlugs.length} (see lib/data/blog.ts). Every post below targets ONE informational/navigational primary keyword (KD <= 40, volume >= 390) not yet covered.\n\n**Standards per post (SEO 90+ checklist):** 1,200+ words (pillars 2,500+), keyword in H1 + first 100 words + one H2 + meta description + image alt, 5+ H2/H3 sections, key-takeaways box, 3-5 FAQ (FAQPage schema), 3+ internal links (collection, 2 related guides, 1 product), 3 authoritative outbound links (regulator / trade body / encyclopaedic source, dofollow), BlogPosting schema, hidden tags from the collection pool.\n\n## Priority queue (T1 first, then volume)\n\n| # | Primary keyword | Vol | KD | Tier | Proposed H1 | Slug | Link to (collection) | Format |\n|---|---|---|---|---|---|---|---|---|\n`;
blogList.forEach((r, i) => {
  blog += `| ${i + 1} | ${r.k} | ${r.vol} | ${r.kd} | ${tier(r.kd)} | ${titleFor(r.k)} | /blog/${slugOf(r.k)}/ | /shop/${r.sub.category}/collection/${r.sub.slug}/ | ${QUESTION.test(r.k) ? 'explainer' : / vs /.test(r.k) ? 'comparison' : 'guide'} |\n`;
});
blog += `\n## 12-week publishing calendar (3 posts / week, T1 first)\n\n`;
for (let w = 0; w < 12; w++) {
  const items = blogList.slice(w * 3, w * 3 + 3);
  if (items.length) blog += `- **Week ${w + 1}:** ${items.map((r) => `${r.k} (${r.vol}/${r.kd})`).join(' · ')}\n`;
}
blog += `\n## Existing guides (all ${existingSlugs.length} expanded)\n\nEvery existing guide now has H2 sections, key takeaways, 4 keyword-targeted FAQs and a primary keyword matched to its topic (lib/data/blog-extra-*.ts). Next step: expand each to 1,500+ words and add original images.\n`;
fs.writeFileSync(path.join(DOCS, 'blog-plan.md'), blog);

// FAQ bank: question-intent keywords per page
let faq = `# faq-bank.md — internal (never publish)\n\nQuestion-intent keywords (volume >= 70, KD <= 40) grouped by the page that should answer them. Answer format: 40-60 words on the homepage / 50-80 on the FAQ page, concrete (never "it depends"), one supporting keyword, one internal link, FAQPage JSON-LD, answer visible in the HTML.\n\n`;
let faqTotal = 0;
for (const sub of SUBCATEGORIES) {
  const { pool } = ctx.get(sub.slug);
  const qs = pool.filter((r) => QUESTION.test(r.k) && r.kd !== null && r.kd <= 40 && r.vol >= 70).slice(0, 8);
  if (!qs.length) continue;
  faqTotal += qs.length;
  faq += `## ${sub.name} — /shop/${sub.category}/collection/${sub.slug}/\n${qs.map((r) => `- ${r.k}? (${r.vol}/${r.kd})`).join('\n')}\n\n`;
}
fs.writeFileSync(path.join(DOCS, 'faq-bank.md'), faq);

// Product / brand gaps: keyword-bank topics with real demand that have no dedicated page or stock
const productsSrc = fs.readFileSync(path.join(ROOT, 'lib', 'data', 'products.ts'), 'utf8');
const brandCount = {};
for (const m of productsSrc.matchAll(/"brand": "([^"]+)"/g)) brandCount[m[1].toLowerCase()] = (brandCount[m[1].toLowerCase()] || 0) + 1;
const gapRows = [];
const covered = new Set(SUBCATEGORIES.flatMap((s) => s.keywordFiles));
for (const [src, rows] of Object.entries(byFile)) {
  const pool = cleanPool(rows, { relMin: 65, volMin: 70 }).filter((r) => isCT(r.intent));
  if (!pool.length) continue;
  const head = pool.slice().sort((a, b) => b.vol - a.vol)[0];
  const demand = pool.filter((r) => r.kd !== null && r.kd <= 55).reduce((s, r) => s + r.vol, 0);
  const brand = src.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-/g, ' ');
  const stocked = Object.entries(brandCount).filter(([b]) => brand.includes(b.replace(/^the /, '')) || b.replace(/^the /, '').includes(brand)).reduce((s, [, n]) => s + n, 0);
  gapRows.push({ src, head, demand, stocked, dedicated: SUBCATEGORIES.some((s) => s.slug.replace(/-/g, ' ') === brand || s.name.toLowerCase() === brand) });
}
gapRows.sort((a, b) => b.demand - a.demand);
let gaps = `# product-gaps.md — internal (never publish)\n\nKeyword-bank topics ranked by commercial/transactional demand (sum of volumes, KD <= 55). "Stocked" = products in the catalogue whose brand matches the topic. Topics with high demand and no dedicated collection are the next pages to build (each needs real stock and photography — do not publish empty collections).\n\n| Topic (CSV) | Head keyword (vol/KD) | Total demand /mo | Stocked bottles | Dedicated collection |\n|---|---|---|---|---|\n`;
for (const g of gapRows.slice(0, 45)) gaps += `| ${g.src.replace(/-/g, ' ')} | ${g.head.k} (${g.head.vol}/${g.head.kd ?? 'n/a'}) | ${g.demand.toLocaleString()} | ${g.stocked} | ${g.dedicated ? 'yes' : (covered.has(g.src) ? 'folded into a sibling' : 'NO')} |\n`;
gaps += `\n## Proposed new collections (folded today, no photography yet)\n\n| Collection | Folded into | Primary target | Why |\n|---|---|---|---|\n`;
const wanted = ['Aperol', 'Campari', 'Cointreau', 'Chartreuse', 'Jägermeister', 'Kahlúa', 'Grand-Marnier', 'Disaronno', 'St-Germain', 'Dark-Rum', 'Pale-Ale', 'IPA', 'Gin-Premix', 'Macallan', 'Glenfiddich', 'Johnnie-Walker'];
for (const w of wanted) {
  const g = gapRows.find((x) => x.src === w);
  if (g) gaps += `| ${w.replace(/-/g, ' ')} | ${SUBCATEGORIES.find((s) => s.keywordFiles.includes(w))?.name || '—'} | ${g.head.k} (${g.head.vol}/${g.head.kd ?? 'n/a'}) | ${g.demand.toLocaleString()} searches/mo demand, ${g.stocked} bottles stocked |\n`;
}
fs.writeFileSync(path.join(DOCS, 'product-gaps.md'), gaps);
console.log(`blog candidates ${blogList.length}, faq questions ${faqTotal}, gap topics ${gapRows.length}`);

console.log(`raw rows ${rawRows}, subcategories ${mapRows.length}, site tags ${siteTags.length}`);
for (const { sub, prim, secondary, tags, pool } of mapRows) {
  console.log(`${sub.slug.padEnd(24)} primary="${prim.k}" (${prim.vol}/${prim.kd}) sec=${secondary.length} tags=${tags} pool=${pool}`);
}
