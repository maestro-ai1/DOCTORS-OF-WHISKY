// Adds the new collections and products chosen from the keyword bank (see ../SEO Analysis/new-catalogue.js + select-products.js).
//   Prices and sizes come ONLY from thedrinksociety.com.au (reference retailer). Descriptions are generated; no pictures are copied:
//   every new product points at the shared "photo coming soon" placeholder until you supply real photos.
// Idempotent: existing slugs are skipped. Afterwards run: node scripts/apply-keywords-v2.mjs && node scripts/apply-seo-content.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const A = path.resolve(ROOT, '..', 'SEO Analysis');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const CAT = JSON.parse(fs.readFileSync(path.join(A, 'new-catalogue.json'), 'utf8'));
const SEL = JSON.parse(fs.readFileSync(path.join(A, 'new-products-selected.json'), 'utf8'));

function loadArray(file, exportName) {
  const t = read(file);
  const start = t.indexOf('= [', t.indexOf(`export const ${exportName}`)) + 2;
  const end = t.indexOf('\n];', start) + 3;
  return { text: t, start, end, arr: JSON.parse(t.slice(start, end - 1)) };
}
const P = loadArray('lib/data/products.ts', 'PRODUCTS');
const S = loadArray('lib/data/subcategories.ts', 'SUBCATEGORIES');
const subs = S.arr, products = P.arr;
// re-runnable: drop anything this script added earlier, then add the current selection
for (let i = products.length - 1; i >= 0; i--) if (String(products[i].sku || '').startsWith('NEW-')) products.splice(i, 1);
for (let i = subs.length - 1; i >= 0; i--) if (CAT.subs[subs[i].slug]) subs.splice(i, 1);

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const COUNTRY_TAGS = ['Scotland', 'Ireland', 'Japan', 'Australia', 'France', 'Italy', 'Mexico', 'United States', 'USA', 'Germany', 'Spain', 'Greece', 'China', 'Korea', 'Netherlands', 'England', 'Canada', 'Sweden', 'Jamaica', 'Cuba', 'Barbados', 'New Zealand', 'Czech Republic', 'Belgium'];
const COUNTRY_NAME = { USA: 'United States', England: 'United Kingdom' };

// ---- 1. new collections (only those that will hold at least one product) ----
const addedSubs = [];
const withProducts = new Set(SEL.map((r) => r.sub));
for (const [slug, [name, dept]] of Object.entries(CAT.subs)) {
  if (subs.find((s) => s.slug === slug)) continue;
  if (!withProducts.has(slug)) continue;
  subs.push({ slug, name, category: dept, description: '', heroImage: '', primaryKeyword: '', secondaryKeywords: [], tags: [], faqs: [], longDescription: [] });
  addedSubs.push(slug);
}
const subBySlug = Object.fromEntries(subs.map((s) => [s.slug, s]));

// ---- 2. new products ----
const byName = new Set(products.map((p) => p.name.toLowerCase()));
const bySlug = new Set(products.map((p) => p.slug));
const addedProducts = [];
for (const r of SEL) {
  const sub = subBySlug[r.sub];
  if (!sub) continue;
  const size = r.size || '';
  let name = r.title.replace(/\s*\b(\d+\s?x\s?)?\d+(\.\d+)?\s?(ml|l)\b/i, '').replace(/\s+/g, ' ').trim();
  if (byName.has(name.toLowerCase())) continue;
  let slug = slugify(name);
  if (bySlug.has(slug)) slug = slugify(`${name} ${size}`);
  if (bySlug.has(slug)) continue;
  const country = (r.tags || []).map((t) => COUNTRY_TAGS.find((c) => c.toLowerCase() === String(t).toLowerCase())).filter(Boolean).map((c) => COUNTRY_NAME[c] || c)[0] || '';
  const ageM = r.title.match(/(\d{1,2})\s?(?:Year|Yr|YO)/i);
  const brand = (r.vendor && !/drink society/i.test(r.vendor) ? r.vendor : name.split(' ')[0]).replace(/\s+/g, ' ').trim();
  products.push({
    id: `prod-${slug}`.slice(0, 70),
    slug,
    name,
    brand,
    category: sub.category,
    subCategorySlug: sub.slug,
    subCategory: sub.name,
    ...(r.type ? { style: r.type } : {}),
    country,
    price: r.price,
    ...(r.compareAt && r.compareAt > r.price ? { originalPrice: r.compareAt } : {}),
    ...(ageM ? { age: `${ageM[1]} Years` } : {}),
    abv: '',
    size,
    images: ['/images/products/coming-soon.svg'],
    description: '',
    stock: 6,
    featured: false,
    sku: `NEW-${slug.toUpperCase().replace(/-/g, '').slice(0, 24)}`,
    primaryKeyword: '',
    secondaryKeywords: [],
    faqs: [],
    metaTitle: '',
    metaDescription: '',
  });
  byName.add(name.toLowerCase()); bySlug.add(slug);
  addedProducts.push({ slug, name, sub: sub.slug, price: r.price, size });
}

const out = (file, parsed, arr) => fs.writeFileSync(path.join(ROOT, file), parsed.text.slice(0, parsed.start) + JSON.stringify(arr, null, 2) + parsed.text.slice(parsed.end - 1));
out('lib/data/products.ts', P, products);
out('lib/data/subcategories.ts', S, subs);

// ---- 3. facts used by apply-seo-content.mjs for the new collections ----
const factsFile = path.join(ROOT, 'scripts/seo-content-data.mjs');
let facts = fs.readFileSync(factsFile, 'utf8');
const MARK = '// ---- new collections (keyword strategy v2) ----';
facts = facts.includes(MARK) ? facts.slice(0, facts.indexOf(MARK)) : facts;
const q = (s) => JSON.stringify(s);
facts += `${MARK}\nObject.assign(SUB_FACTS, {\n${Object.entries(CAT.subs).map(([slug, v]) => `  ${q(slug)}: { what: ${q(v[2])}, serve: ${q(v[3])}, gift: ${q(v[4])} },`).join('\n')}\n});\n`;
fs.writeFileSync(factsFile, facts);

// ---- 4. navigation links for the new collections (menu.ts appends them as a "More collections" group) ----
const links = {};
for (const [slug, [name, dept]] of Object.entries(CAT.subs)) if (subs.find((s) => s.slug === slug)) (links[dept] ||= []).push({ label: name, href: `/shop/${dept}/collection/${slug}` });
fs.writeFileSync(
  path.join(ROOT, 'lib/data/new-collections.ts'),
  `// GENERATED by scripts/add-new-catalogue.mjs - collections added from the keyword bank (keyword strategy v2).\nexport const NEW_COLLECTION_LINKS: Record<string, { label: string; href: string }[]> = ${JSON.stringify(links, null, 2)};\n`,
);
const menu = read('lib/data/menu.ts');
if (!menu.includes('NEW_COLLECTION_LINKS')) {
  const crlf = menu.includes('\r\n');
  let m = crlf ? menu.replace(/\r\n/g, '\n') : menu;
  m = m.replace("import { CategoryGroup } from '@/lib/types';", "import { CategoryGroup } from '@/lib/types';\nimport { NEW_COLLECTION_LINKS } from '@/lib/data/new-collections';");
  m += "\n// Collections added from the keyword bank appear under \"More Collections\" in each department menu.\nfor (const cat of MAIN_CATEGORIES) {\n  const extra = NEW_COLLECTION_LINKS[cat.slug];\n  if (extra && extra.length) cat.subGroups.push({ title: 'More Collections', items: extra });\n}\n";
  fs.writeFileSync(path.join(ROOT, 'lib/data/menu.ts'), crlf ? m.replace(/\n/g, '\r\n') : m);
}
console.log(`collections added: ${addedSubs.length}; products added: ${addedProducts.length}; total products ${products.length}`);
fs.writeFileSync(path.join(A, 'added-products.json'), JSON.stringify({ subs: addedSubs, products: addedProducts }, null, 1));
