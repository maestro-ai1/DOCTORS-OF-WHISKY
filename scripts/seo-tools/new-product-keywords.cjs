// Gives every product that has no keyword entry yet a primary (Transactional), 15 secondary (Commercial first) and 20 tags (Commercial),
// taken from the Semrush bank (KD <= 29). Writes entries to ../SEO Analysis/mapping-v2.json (products[]), which apply-seo-content.mjs reads.
//   node scripts/seo-tools/new-product-keywords.cjs [--dry-run]
// Safe to re-run: products that already have an entry are left untouched. Other pages' primaries are never reused.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const A = path.resolve(ROOT, '..', 'SEO Analysis');
const BANK = path.resolve(ROOT, '..', 'Whisky Keywords Bank', '_SUMMARY', 'keyword-bank-summary-vol50plus.csv');
const DRY = process.argv.includes('--dry-run');

const mapFile = path.join(A, 'mapping-v2.json');
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
const t = fs.readFileSync(path.join(ROOT, 'lib/data/products.ts'), 'utf8');
const s = t.indexOf('= [', t.indexOf('export const PRODUCTS')) + 2;
const products = JSON.parse(t.slice(s, t.indexOf('\n];', s) + 2));

const norm = (x) => x.toLowerCase().replace(/gray/g, 'grey').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const toks = (x) => norm(x).split(' ').filter(Boolean);
const MOD = new Set('buy online price prices cost cheap cheapest australia australian au sale order shop delivery deal deals specials best bottle bottles pack the of and 1l 700ml 750ml litre 1 700 750 ml l near me for gift'.split(' '));
const TYPE = new Set('whisky whiskey scotch bourbon vodka gin rum tequila wine beer cider champagne prosecco sparkling cognac brandy liqueur liquor soju premix lager single malt blended red white rose'.split(' '));
const BLOCK = /\b(bws|liquorland|dan murphy|murphys?|coles|aldi|iga|woolworths|near me|pizza|menu|hotel)\b/;

function parse(line) { const o = []; let c = '', q = false; for (let i = 0; i < line.length; i++) { const ch = line[i]; if (q) { if (ch === '"') { if (line[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; } else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
const K = fs.readFileSync(BANK, 'utf8').replace(/^﻿/, '').split(/\r?\n/).slice(1).filter(Boolean).map((l) => {
  const p = parse(l);
  return { kw: p[0], raw: p[1], intent: p[2], vol: +p[3], kd: p[4] === '' ? null : +p[4] };
}).filter((k) => k.kd != null && k.kd <= 29 && /^(Transactional|Commercial)$/.test(k.intent) && /^[a-z0-9 '&-]+$/i.test(k.kw) && !BLOCK.test(k.kw))
  .map((k) => ({ ...k, t: toks(k.kw) }))
  .filter((k) => new Set(k.t).size === k.t.length);

const used = new Set();
for (const g of ['categories', 'subcategories', 'pages', 'products']) for (const e of map[g] || []) { const p = e.primary || e.fallbackPrimary; if (p) used.add(p.kw); }
const have = new Set((map.products || []).map((p) => p.slug));
const fmt = (k, lvl) => ({ kw: k.kw, vol: k.vol, kd: k.kd, intent: k.intent, raw: k.raw, lvl });
let n = 0;
for (const p of products) {
  if (have.has(p.slug)) continue;
  const brand = toks(p.brand).filter((x) => x.length > 2);
  const name = toks(p.name).filter((x) => x.length > 1 && !brand.includes(x));
  const nums = new Set([...toks(p.name), ...toks(p.size || ''), ...toks(p.age || '')].filter((x) => /\d/.test(x)));
  const vocab = new Set([...brand, ...name, ...TYPE, ...MOD]);
  const cand = K.filter((k) => k.t.every((x) => vocab.has(x) || nums.has(x)) && (brand.length ? k.t.some((x) => brand.includes(x)) : k.t.some((x) => name.includes(x))) && k.t.filter((x) => /\d/.test(x)).every((x) => nums.has(x)));
  const spec = name.filter((x) => !TYPE.has(x) && !MOD.has(x) && !/^\d+$/.test(x));
  const hits = (k) => k.t.filter((x) => spec.includes(x)).length;
  const T = cand.filter((k) => k.intent === 'Transactional' && !used.has(k.kw)).sort((a, b) => hits(b) - hits(a) || b.vol - a.vol);
  const Cm = cand.filter((k) => k.intent === 'Commercial').sort((a, b) => hits(b) - hits(a) || b.vol - a.vol);
  // the primary must name this product (brand plus at least one product word), otherwise the product name itself is used
const primary = T.find((k) => hits(k) >= 1) || null;
  if (primary) used.add(primary.kw);
  const rest = [...Cm, ...T].filter((k) => !primary || k.kw !== primary.kw);
  const secondary = rest.slice(0, 15);
  const tags = Cm.filter((k) => !secondary.includes(k) && (!primary || k.kw !== primary.kw)).slice(0, 20);
  // thin brand vocabulary in the bank: top up from the collection's own keyword set (Commercial first), never the same keyword twice
  const sub = (map.subcategories || []).find((x) => x.slug === p.subCategorySlug);
  if (sub) {
    const seen = new Set([...(primary ? [primary.kw] : []), ...secondary.map((k) => k.kw), ...tags.map((k) => k.kw)]);
    const pool = [...(sub.secondary || []), ...(sub.tags || [])].filter((k) => /^(Commercial|Transactional)$/.test(k.intent)).sort((a, b) => (a.intent === b.intent ? b.vol - a.vol : a.intent === 'Commercial' ? -1 : 1));
    for (const k of pool) { if (secondary.length >= 15) break; if (seen.has(k.kw) || (primary && k.kw === primary.kw)) continue; secondary.push({ kw: k.kw, vol: k.vol, kd: k.kd, intent: k.intent, raw: k.raw }); seen.add(k.kw); }
    for (const k of pool.filter((x) => x.intent === 'Commercial')) { if (tags.length >= 20) break; if (seen.has(k.kw)) continue; tags.push({ kw: k.kw, vol: k.vol, kd: k.kd, intent: k.intent, raw: k.raw }); seen.add(k.kw); }
  }
  const entry = {
    type: 'product', name: p.name, url: `/shop/${p.category}/${p.slug}/`, slug: p.slug, brand: p.brand, subcategory: p.subCategorySlug, price: p.price, size: p.size,
    ...(primary ? { primary: fmt(primary, 'this product') } : {}), secondary: secondary.map((k) => fmt(k, 'brand')), tags: tags.map((k) => fmt(k, 'brand')), informational: [],
    pool: cand.length, commercialInSecondary: secondary.filter((k) => k.intent === 'Commercial').length,
  };
  console.log(`${p.name}: ${primary ? primary.kw + ' ' + primary.vol + '/' + primary.kd : '(no bank primary, product name is used)'} | ${secondary.length} secondary, ${tags.length} tags`);
  if (!DRY) (map.products ||= []).push(entry);
  n++;
}
if (!DRY && n) fs.writeFileSync(mapFile, JSON.stringify(map));
console.log(`${DRY ? 'would write' : 'wrote'} keyword entries for ${n} product(s)`);
