// Builds lib/data/brand-pages.ts: one brand hub page per stocked brand (/brands/<slug>/), each owning one unique primary keyword.
//   node scripts/seo-tools/build-brand-pages.cjs [--dry-run]
// Source: Semrush bank (KD <= 29, Transactional/Commercial), the live catalogue, and the primaries already used by other pages.
// Primary = highest-volume Transactional keyword that names the brand; a Commercial keyword is used when it is far bigger
// (golden-rule exception for high-volume keywords). Secondary = next 5 highest-volume Transactional/Commercial keywords.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const A = path.resolve(ROOT, '..', 'SEO Analysis');
const BANK = path.resolve(ROOT, '..', 'Whisky Keywords Bank', '_SUMMARY', 'keyword-bank-summary-vol50plus.csv');
const DRY = process.argv.includes('--dry-run');

const t = fs.readFileSync(path.join(ROOT, 'lib/data/products.ts'), 'utf8');
const s = t.indexOf('= [', t.indexOf('export const PRODUCTS')) + 2;
const products = JSON.parse(t.slice(s, t.indexOf('\n];', s) + 2));
const map = JSON.parse(fs.readFileSync(path.join(A, 'mapping-v2.json'), 'utf8'));
const home = JSON.parse(fs.readFileSync(path.join(A, 'home-seo.json'), 'utf8'));

const norm = (x) => x.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const MOD = new Set('buy online price prices cost cheap cheapest australia australian au sale order shop delivery deal deals specials best bottle bottles pack the of and 1l 700ml 750ml litre 1 700 750 ml l for gift whisky whiskey vodka gin rum tequila wine beer champagne cognac liqueur scotch bourbon single malt'.split(' '));
function parse(line) { const o = []; let c = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (q) { if (ch === '"') { if (line[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; } else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
const BLOCK = /\b(bws|liquorland|dan murphy|murphys?|coles|aldi|iga|woolworths|near me|pizza|menu|hotel|recipe|recipes|calories|percentage|alcohol content)\b/;
const K = fs.readFileSync(BANK, 'utf8').replace(/^﻿/, '').split(/\r?\n/).slice(1).filter(Boolean).map((l) => {
  const p = parse(l);
  return { kw: p[0], raw: p[1], intent: p[2], vol: +p[3], kd: p[4] === '' ? null : +p[4] };
}).filter((k) => k.kd != null && k.kd <= 29 && /^(Transactional|Commercial)$/.test(k.intent) && /^[a-z0-9 ]+$/.test(k.kw) && !BLOCK.test(k.kw))
  .map((k) => ({ ...k, w: k.kw.split(' ') }))
  .filter((k) => new Set(k.w).size === k.w.length);

// every primary already owned by another page
const used = new Set();
// (product-level primaries do not block a brand hub: the hub takes the brand head term and the product falls back to its own name)
for (const g of ['categories', 'subcategories', 'pages']) for (const e of map[g] || []) { const p = e.primary || e.fallbackPrimary; if (p) used.add(p.kw); }
// curated landing pages
['buy tequila online', 'smirnoff liquor', 'buy absolut vodka', 'gin gifts australia', 'whisky gift pack', 'whisky sale'].forEach((k) => used.add(k));

// brands that already have their own collection or are not real brands
// Keywords read from Semrush AU (Domain/Keyword Overview, 2026-10-25) that the Sep-28 bank export does not carry.
const EXTRA = {
  Heineken: [{ kw: 'heineken', raw: 'Transactional', intent: 'Transactional', vol: 6600, kd: 26 }],
  // Semrush AU Keyword Overview, 2026-10-26: brand head terms (Commercial, KD <= 29)
  'Veuve Clicquot': [{ kw: 'veuve clicquot', raw: 'Commercial', intent: 'Commercial', vol: 14800, kd: 22 }, { kw: 'veuve clicquot price', raw: 'Transactional', intent: 'Transactional', vol: 390, kd: 17 }],
  Hennessy: [{ kw: 'hennessy', raw: 'Commercial', intent: 'Commercial', vol: 12100, kd: 26 }, { kw: 'hennessy vsop', raw: 'Commercial', intent: 'Commercial', vol: 3600, kd: 17 }],
  Jameson: [{ kw: 'jameson', raw: 'Commercial', intent: 'Commercial', vol: 4400, kd: 16 }, { kw: 'jameson whiskey price', raw: 'Transactional', intent: 'Transactional', vol: 390, kd: 14 }],
  Bollinger: [{ kw: 'bollinger champagne', raw: 'Commercial', intent: 'Commercial', vol: 4400, kd: 20 }],
  Espolon: [{ kw: 'espolon tequila', raw: 'Commercial', intent: 'Commercial', vol: 2400, kd: 17 }],
  Casamigos: [{ kw: 'casamigos', raw: 'Commercial', intent: 'Commercial', vol: 1900, kd: 17 }],
  'Crown Royal': [{ kw: 'crown royal', raw: 'Commercial', intent: 'Commercial', vol: 1900, kd: 19 }],
  Starward: [{ kw: 'starward', raw: 'Navigational', intent: 'Navigational', vol: 1900, kd: 19 }],
  Taittinger: [{ kw: 'taittinger', raw: 'Commercial', intent: 'Commercial', vol: 1000, kd: 17 }],
  'Pol Roger': [{ kw: 'pol roger', raw: 'Commercial', intent: 'Commercial', vol: 1300, kd: 11 }],
  'Captain Morgan': [{ kw: 'captain morgan', raw: 'Commercial', intent: 'Commercial', vol: 5400, kd: 14 }],
};
const SKIP = new Set(['Baileys', 'Patron', 'Don Julio', 'Grey Goose', 'Belvedere', 'Smirnoff', 'Absolut', 'Jose Cuervo', 'Lark', 'Absinthe', 'Russian Vodka', 'Vodka Premix', 'Little', 'Captain', 'Penfolds', 'Sheridans', 'Courvoisier']);
const by = {};
for (const p of products) (by[p.brand] ||= []).push(p);
const slugify = (x) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const rows = [];
for (const [brand, list] of Object.entries(by)) {
  if (SKIP.has(brand) || list.filter((p) => !p.images[0].endsWith(".svg")).length < 3) continue; // hub needs 3+ real-photo products
  const bt = norm(brand).split(' ').filter((x) => x.length > 2);
  if (!bt.length) continue;
  const cand = [...(EXTRA[brand] || []).map((k) => ({ ...k, w: k.kw.split(' ') })), ...K].filter((k) => bt.every((x) => k.w.includes(x)) && k.w.every((x) => bt.includes(x) || MOD.has(x) || /^\d+$/.test(x)));
  { const seenKw = new Set(); for (let i = 0; i < cand.length; i++) { if (seenKw.has(cand[i].kw)) cand.splice(i--, 1); else seenKw.add(cand[i].kw); } } // EXTRA (fresh Semrush) wins over the bank
  if (!cand.length) continue;
  const best = (arr) => arr.slice().sort((a, b) => b.vol - a.vol);
  const T = best(cand.filter((k) => k.intent === 'Transactional' && !used.has(k.kw)));
  const C = best(cand.filter((k) => k.intent === 'Commercial' && !used.has(k.kw)));
  let primary = T[0] || null;
  if (C[0] && (!primary || (C[0].vol >= 1000 && C[0].vol >= primary.vol * 2.5))) primary = C[0]; // high-volume exception
  if (!primary || primary.vol < 300) continue;
  const rest = best(cand.filter((k) => k.kw !== primary.kw && !used.has(k.kw) && k.vol >= 100)).slice(0, 5);
  rows.push({ brand, slug: slugify(brand), n: list.length, primary, secondary: rest });
}
rows.sort((a, b) => b.primary.vol - a.primary.vol);
// uniqueness between brand pages
const taken = new Set();
const out = [];
for (const r of rows) {
  if (taken.has(r.primary.kw)) continue;
  taken.add(r.primary.kw);
  r.secondary = r.secondary.filter((k) => !taken.has(k.kw));
  r.secondary.forEach((k) => taken.add(k.kw));
  out.push(r);
}
// product pages that held a brand head term lose it (they fall back to their own name as primary, so the hub owns the keyword)
const hubKw = new Set([...out.map((r) => r.primary.kw), ...out.flatMap((r) => r.secondary.map((k) => k.kw))]);
let cleared = 0;
for (const e of map.products || []) { const p = e.primary || e.fallbackPrimary; if (p && hubKw.has(p.kw)) { console.log('product primary moved to hub:', e.slug, '->', p.kw); if (!DRY) { delete e.primary; delete e.fallbackPrimary; cleared++; } } }
if (!DRY && cleared) fs.writeFileSync(path.join(A, 'mapping-v2.json'), JSON.stringify(map));
console.log(out.length + ' brand pages');
out.forEach((r) => console.log(r.brand.padEnd(18), String(r.n).padStart(2), '|', r.primary.kw, r.primary.vol + '/' + r.primary.kd, r.primary.intent[0], '|', r.secondary.map((k) => k.kw + ' ' + k.vol).join('; ')));
if (!DRY) {
  const data = out.map((r) => ({
    slug: r.slug, brand: r.brand,
    primary: { kw: r.primary.kw, vol: r.primary.vol, kd: r.primary.kd, intent: r.primary.intent },
    secondary: r.secondary.map((k) => ({ kw: k.kw, vol: k.vol, kd: k.kd, intent: k.intent })),
  }));
  fs.writeFileSync(path.join(ROOT, 'lib/data/brand-pages.ts'),
    '// GENERATED by scripts/seo-tools/build-brand-pages.cjs from the Semrush bank (KD <= 29) and the catalogue - do not edit by hand.\n' +
    '// One brand hub page per stocked brand: /brands/<slug>/ owns one unique primary keyword plus 5 secondary keywords.\n' +
    'export interface BrandPageSeo { slug: string; brand: string; primary: { kw: string; vol: number; kd: number; intent: string }; secondary: { kw: string; vol: number; kd: number; intent: string }[] }\n' +
    'export const BRAND_PAGES: BrandPageSeo[] = ' + JSON.stringify(data, null, 1) + ';\n');
  console.log('wrote lib/data/brand-pages.ts');
}
