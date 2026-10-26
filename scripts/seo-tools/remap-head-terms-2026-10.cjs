// 2026-10-26 remap: brand head terms with big volume move from blog/product pages to the collection or hub that can sell them.
//   node scripts/seo-tools/remap-head-terms-2026-10.cjs   then: apply-keywords-v2 + apply-seo-content (+ build-brand-pages)
// Golden rule exception (owner, 2026-10-25): high-volume head terms may be Commercial or brand terms, KD <= 29.
const fs = require('fs'), path = require('path');
const A = path.resolve(__dirname, '..', '..', '..', 'SEO Analysis');
const BANK = path.resolve(__dirname, '..', '..', '..', 'Whisky Keywords Bank', '_SUMMARY', 'keyword-bank-summary-vol50plus.csv');
const MAP = path.join(A, 'mapping-v2.json'), BLOG = path.join(A, 'blog-seo.json');
const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
const blog = JSON.parse(fs.readFileSync(BLOG, 'utf8'));
const k = (kw, vol, kd, intent) => ({ kw, vol, kd, intent, raw: intent, lvl: 'sub-category' });

// 1) collection primaries (old primary becomes the first secondary; the new primary is removed from secondary/tags)
const SET = {
  patron: k('patron', 8100, 17, 'Commercial'),
  belvedere: k('belvedere vodka', 6600, 15, 'Commercial'),
  'grey-goose': k('grey goose', 6600, 28, 'Informational'),
  'baileys-irish-cream': k('baileys', 22200, 21, 'Commercial'),
  'don-julio': k('don julio', 8100, 18, 'Commercial'),
};
for (const [slug, np] of Object.entries(SET)) {
  const e = map.subcategories.find((x) => x.slug === slug);
  const old = e.primary || e.fallbackPrimary;
  const keep = (x) => x.kw !== np.kw;
  e.secondary = [...(old && old.kw !== np.kw ? [old] : []), ...e.secondary.filter(keep)].slice(0, 15);
  e.tags = e.tags.filter(keep);
  delete e.fallbackPrimary; e.primary = np;
  console.log('collection', slug, '->', np.kw, '| secondary starts:', e.secondary.slice(0, 3).map((x) => x.kw).join('; '));
}

// 2) product pages that held a head term fall back to their own name
const HEAD = new Set(['patron', 'patron tequila', 'belvedere vodka', 'moet', 'moet champagne', 'glenmorangie', 'licor 43', 'grey goose', 'baileys', 'don julio', 'absolut vodka']);
for (const e of map.products) { const p = e.primary || e.fallbackPrimary; if (p && HEAD.has(p.kw) && !/^(moet|glenmorangie)$/.test(p.kw)) { delete e.primary; delete e.fallbackPrimary; console.log('product cleared', e.slug, p.kw); } }

// 3) blog primaries that took head terms: pick the best unused Informational/Navigational keyword for the topic
function parse(line) { const o = []; let c = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (q) { if (ch === '"') { if (line[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; } else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
const rows = fs.readFileSync(BANK, 'utf8').replace(/^﻿/, '').split(/\r?\n/).slice(1).filter(Boolean).map((l) => { const p = parse(l); return { kw: p[0], intent: p[2], vol: +p[3], kd: p[4] === '' ? null : +p[4] }; }).filter((r) => r.kd != null && r.kd <= 29 && /^[a-z0-9 ]+$/.test(r.kw));
const used = new Set(['absolut vodka', 'baileys', 'baileys irish', 'grey goose', 'grey goose liquor', 'belvedere vodka', 'don julio', 'patron']);
const walk = (x) => { if (!x) return; if (typeof x === 'string') return; if (Array.isArray(x)) return x.forEach(walk); if (typeof x === 'object') { if (x.kw) used.add(String(x.kw).toLowerCase()); Object.values(x).forEach(walk); } };
for (const f of ['mapping-v2.json', 'home-seo.json', 'page-seo.json']) walk(JSON.parse(fs.readFileSync(path.join(A, f), 'utf8')));
for (const v of Object.values(blog)) used.add(v.primary);
const BLOGS = [
  ['vodka-brands-absolut-skyy-titos-how-to-choose', /vodka brand|types of vodka|best vodka|vodka|skyy|tito/],
  ['grey-goose-vs-belvedere-vodka-compared', /grey goose|belvedere|premium vodka|vodka/],
  ['best-cream-coffee-liqueurs-for-cocktails', /cream liqueur|coffee liqueur|irish cream|liqueur/],
];
for (const [slug, re] of BLOGS) {
  const b = blog[slug];
  const pool = rows.filter((r) => re.test(r.kw) && !used.has(r.kw) && /^(Informational|Navigational)/.test(r.intent) && r.vol >= 50).sort((a, z) => z.vol - a.vol);
  const pick = pool[0];
  if (!pick) { console.log('no replacement for', slug); continue; }
  const oldp = b.primary;
  b.secondary = [oldp, ...b.secondary.filter((x) => x !== pick.kw && x !== oldp)].slice(0, 15);
  b.primary = pick.kw; b.vol = pick.vol; b.kd = pick.kd; b.primarySource = 'bank (Nav/Info), re-mapped 2026-10-26 so the head term sits on the shop page';
  used.add(pick.kw);
  console.log('blog', slug, oldp, '->', pick.kw, pick.vol + '/' + pick.kd);
}
fs.writeFileSync(MAP, JSON.stringify(map));
fs.writeFileSync(BLOG, JSON.stringify(blog));
