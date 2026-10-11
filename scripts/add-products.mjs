// Adds products chosen from docs/products-to-add.csv to lib/data/products.ts (additive and idempotent: nothing existing is removed).
//   node scripts/add-products.mjs --dry-run --priority A            # preview
//   node scripts/add-products.mjs --brand "Veuve Clicquot,Jameson Irish Whiskey"
//   node scripts/add-products.mjs --priority A,B --price-source suggested
// Then: node scripts/seo-tools/new-product-keywords.cjs && node scripts/apply-keywords-v2.mjs && node scripts/apply-seo-content.mjs
// Price = the "Suggested site price" column (retailer price x 1.08, see docs/products-to-add.md). Every new product uses the shared
// placeholder photo until a real photo is supplied. Rows whose collection cannot be decided are listed and skipped.
import fs from 'node:fs';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : null; };
const DRY = args.includes('--dry-run');
const BRANDS = (opt('brand') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const PRIORITY = (opt('priority') || '').split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
if (!BRANDS.length && !PRIORITY.length) { console.error('Choose rows with --brand "A,B" and/or --priority A,B'); process.exit(1); }

const read = (u) => fs.readFileSync(new URL(u, import.meta.url), 'utf8');
function csv(text) {
  const rows = []; let r = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { r.push(f); f = ''; } else if (c === '\n') { r.push(f); rows.push(r); r = []; f = ''; } else if (c !== '\r') f += c;
  }
  if (f || r.length) { r.push(f); rows.push(r); }
  return rows;
}
const rows = csv(read('../docs/products-to-add.csv').replace(/^﻿/, ''));
const H = rows[0];
const col = (n) => H.indexOf(n);
const picked = rows.slice(1).filter((r) => r.length > 8).filter((r) => {
  const brand = r[col('Brand')].toLowerCase();
  return (BRANDS.length ? BRANDS.includes(brand) : true) && (PRIORITY.length ? PRIORITY.includes(r[col('Priority')]) : true);
});

const T = read('../lib/data/products.ts');
const start = T.indexOf('= [', T.indexOf('export const PRODUCTS')) + 2;
const end = T.indexOf('\n];', start) + 3;
const products = JSON.parse(T.slice(start, end - 1));
const S = read('../lib/data/subcategories.ts');
const subs = {};
for (const m of S.matchAll(/"slug": "([a-z0-9-]+)",\s*"name": "([^"]+)",\s*"category": "([a-z-]+)"/g)) subs[m[1]] = { name: m[2], category: m[3] };

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// brand / title -> existing collection slug (first match wins)
const RULES = [
  [/veuve|dom p[eé]rignon|mo[eë]t|krug|perrier|laurent/i, 'champagne'],
  [/arras|jansz|yellow ?tail|grandin|henkell|brown brothers.*moscato/i, 'sparkling'],
  [/jameson|bushmills|redbreast/i, 'irish-whiskey'],
  [/starward|archie rose|lark/i, 'australian-whisky'],
  [/bulleit|jim beam|woodford|wild turkey|maker/i, 'bourbon'],
  [/hakushu|nikka|yamazaki|hibiki|toki/i, 'japanese-whisky'],
  [/glen|balvenie|oban|bowmore|caol ila|benriach|highland park|bladnoch|grant|famous grouse|maclagan|amrut|crown royal|dalmore|laphroaig|ardbeg/i, 'scotch-whisky'],
  [/casamigos|espol[oò]n|sierra|jimador|herradura|fortaleza/i, (t) => (/blanco|silver|plata|white/i.test(t) ? 'white-tequila' : 'gold-tequila')],
  [/haku|skyy|stoli|crystal head|ketel/i, 'vodka'],
  [/gordon|mare\b|gin\b/i, 'gin'],
  [/ratu|spiced/i, 'spiced-rum'],
  [/plantation|havana|zacapa|el dorado|bundaberg|rum\b/i, 'rum'],
  [/st\.? ?r[eé]my|brandy|cognac/i, 'cognac-brandy'],
  [/b[eé]n[eé]dictine|disaronno|amarula|passo[aã]|vermouth|bitters|liqueur/i, 'liqueur'],
  [/ginger/i, 'ginger-beer'],
  [/cider|bilpin|magners/i, 'cider'],
  [/tiger|chang|peroni|pacifico|menabrea|leffe|mythos/i, 'imported-beer'],
  [/balter|coopers|4 pines|stone (&|and) wood|mountain goat|single fin|hahn|xxxx|little creatures|vb\b|victoria bitter/i, 'australian-beer'],
  [/sauvignon blanc|sav blanc/i, 'sauvignon-blanc'],
  [/pinot gris|pinot grigio/i, 'pinot-grigio'],
  [/cabernet/i, 'cabernet-sauvignon'],
  [/shiraz|merlot|malbec|pinot noir|red/i, 'red-wine'],
  [/riesling|chardonnay|moscato|white/i, 'white-wine'],
  [/premix king|cruiser/i, 'vodka-premix'],
  [/energy|mother|rockstar|tonic|lyre/i, 'mixers-water-condiments'],
];
const subFor = (brand, title) => {
  for (const [re, v] of RULES) if (re.test(`${brand} ${title}`)) { const s = typeof v === 'function' ? v(title) : v; return subs[s] ? s : null; }
  return null;
};

const have = new Set(products.map((p) => p.slug));
const names = new Set(products.map((p) => p.name.toLowerCase()));
const added = [], skipped = [];
for (const r of picked) {
  const title = r[col('Product (reference title)')];
  const size = r[col('Size')];
  const brand = r[col('Brand')];
  const price = parseFloat(r[col('Suggested site price')]);
  const name = title.replace(/\s*\b(\d+\s?x\s?)?\d+(\.\d+)?\s?(ml|l)\b/i, '').replace(/\s+/g, ' ').trim();
  const sub = subFor(brand, title);
  if (!sub) { skipped.push(`${title} (no collection rule for "${brand}")`); continue; }
  let slug = slugify(name);
  if (have.has(slug) || names.has(name.toLowerCase())) { skipped.push(`${title} (already in catalogue)`); continue; }
  const ageM = title.match(/(\d{1,2})\s?(?:Year|Yr|YO)/i);
  products.push({
    id: `prod-${slug}`.slice(0, 70), slug, name, brand,
    category: subs[sub].category, subCategorySlug: sub, subCategory: subs[sub].name,
    country: '', price, ...(ageM ? { age: `${ageM[1]} Years` } : {}), abv: '', size,
    images: ['/images/products/coming-soon.svg'], description: '', stock: 6, featured: false,
    sku: `ADD-${slug.toUpperCase().replace(/-/g, '').slice(0, 24)}`,
    primaryKeyword: '', secondaryKeywords: [], faqs: [], metaTitle: '', metaDescription: '',
  });
  have.add(slug); names.add(name.toLowerCase());
  added.push(`${name} [${size}] $${price} -> ${sub}`);
}
console.log(`${DRY ? 'would add' : 'added'} ${added.length}, skipped ${skipped.length}`);
added.slice(0, 80).forEach((a) => console.log('  +', a));
skipped.forEach((s) => console.log('  skip', s));
if (!DRY && added.length) fs.writeFileSync(new URL('../lib/data/products.ts', import.meta.url), T.slice(0, start) + JSON.stringify(products, null, 2) + T.slice(end - 1));
