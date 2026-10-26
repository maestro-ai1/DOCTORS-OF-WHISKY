// Adds keyword entries for new blog posts to ../SEO Analysis/blog-seo.json (primary + 15 secondary I/N + 20 commercial tags, KD <= 29, from the bank),
// then run: node scripts/apply-keywords-v2.mjs
const fs = require('fs'), path = require('path');
const A = path.resolve(__dirname, '..', '..', '..', 'SEO Analysis');
const BANK = path.resolve(__dirname, '..', '..', '..', 'Whisky Keywords Bank', '_SUMMARY', 'keyword-bank-summary-vol50plus.csv');
function parse(line) { const o = []; let c = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (q) { if (ch === '"') { if (line[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; } else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
const rows = fs.readFileSync(BANK, 'utf8').replace(/^﻿/, '').split(/\r?\n/).slice(1).filter(Boolean).map((l) => { const p = parse(l); return { kw: p[0], intent: p[2], vol: +p[3], kd: p[4] === '' ? null : +p[4] }; }).filter((r) => r.kd != null && r.kd <= 29 && /^[a-z0-9 ]+$/.test(r.kw));
const BS = JSON.parse(fs.readFileSync(path.join(A, 'blog-seo.json'), 'utf8'));
const used = new Set(); // primaries and every page-level keyword
const walk = (x) => { if (!x) return; if (typeof x === 'string') { used.add(x.toLowerCase()); return; } if (Array.isArray(x)) return x.forEach(walk); if (typeof x === 'object') { if (x.kw) used.add(String(x.kw).toLowerCase()); Object.values(x).forEach(walk); } };
for (const f of ['mapping-v2.json', 'home-seo.json', 'page-seo.json']) walk(JSON.parse(fs.readFileSync(path.join(A, f), 'utf8')));
for (const v of Object.values(BS)) used.add(v.primary);
const POSTS = [
  ['limoncello-spritz-recipe', 'limoncello spritz recipe', 3600, 22, /limoncello|lemoncello|zoncello|spritz/],
  ['what-is-gin-made-from', 'what is gin made from', 1900, 11, /\bgin\b|juniper|botanical/],
  ['how-many-standard-drinks-in-a-bottle-of-wine', 'how many standard drinks in a bottle of wine', 1600, 22, /standard drink|wine|alcohol|abv/],
  ['what-is-prosecco', 'what is prosecco', 1300, 20, /prosecco|sparkling|bubbly/],
  ['cointreau-cocktails', 'cointreau cocktails', 1000, 24, /cointreau|triple sec|orange liqueur|margarita|cosmopolitan|sidecar/],
  ['cognac-vs-brandy', 'cognac vs brandy', 720, 13, /cognac|brandy|hennessy|vsop|martell|courvoisier|remy/],
  ['how-long-does-champagne-last', 'how long does champagne last', 260, 9, /champagne|bubbly|moet|veuve|sparkling/],
  ['absolut-vodka-flavours', 'absolut vodka flavours', 260, 16, /absolut|flavou?red vodka|vodka/],
  ['best-tequila-for-margaritas', 'best tequila for margaritas', 390, 13, /tequila|margarita|casamigos|espolon|patron|don julio/],
];
for (const [slug, primary, vol, kd, re] of POSTS) {
  const pool = rows.filter((r) => re.test(r.kw) && r.kw !== primary && !used.has(r.kw));
  const sec = pool.filter((r) => /^(Informational|Navigational)/.test(r.intent)).sort((a, b) => b.vol - a.vol).slice(0, 15);
  const tag = pool.filter((r) => r.intent === 'Commercial' || r.intent === 'Transactional').sort((a, b) => b.vol - a.vol).slice(0, 20);
  BS[slug] = { primary, primarySource: 'Semrush AU Keyword Overview 2026-10-26 (informational/commercial, KD <= 29, unused)', vol, kd, secondary: sec.map((r) => r.kw), tags: tag.map((r) => r.kw) };
  console.log(slug, '| sec', sec.length, '| tags', tag.length);
}
fs.writeFileSync(path.join(A, 'blog-seo.json'), JSON.stringify(BS));
