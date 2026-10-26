// Adds the products listed in scripts/semrush-add-2026-10.json (brands with proven AU search demand) with real photos.
//   node scripts/add-semrush-products.mjs [--dry-run]
// Then: node scripts/seo-tools/new-product-keywords.cjs && node scripts/apply-keywords-v2.mjs && node scripts/apply-seo-content.mjs
// Additive and idempotent: existing slugs / names are skipped. Photo: white background, 1000x1000 JPEG in public/images/products/<collection>/.
import fs from 'node:fs';
import sharp from 'sharp';
const DRY = process.argv.includes('--dry-run');
const list = JSON.parse(fs.readFileSync(new URL('./semrush-add-2026-10.json', import.meta.url), 'utf8'));
const T = fs.readFileSync(new URL('../lib/data/products.ts', import.meta.url), 'utf8');
const start = T.indexOf('= [', T.indexOf('export const PRODUCTS')) + 2;
const end = T.indexOf('\n];', start) + 3;
const products = JSON.parse(T.slice(start, end - 1));
const S = fs.readFileSync(new URL('../lib/data/subcategories.ts', import.meta.url), 'utf8');
const subs = {};
for (const m of S.matchAll(/"slug": "([a-z0-9-]+)",\s*"name": "([^"]+)",\s*"category": "([a-z-]+)"/g)) subs[m[1]] = { name: m[2], category: m[3] };
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const have = new Set(products.map((p) => p.slug));
const haveNames = new Set(products.map((p) => norm(`${p.name} ${p.size}`)));
let added = 0;
for (const r of list) {
  const name = r.title.replace(/\s*\b\d+(\.\d+)?\s?(ml|l)\b/i, '').replace(/\s+/g, ' ').trim();
  const slug = slugify(name + (/\b1l\b/i.test(r.size) ? ' 1l' : /375/.test(r.size) ? ' 375ml' : ''));
  if (have.has(slug) || haveNames.has(norm(`${name} ${r.size}`)) || !subs[r.sub]) { console.log('skip', r.title); continue; }
  if (/Hennessy (VSOP|XO)|Piper-Heidsieck/.test(r.title)) { console.log('skip (in catalogue)', r.title); continue; }
  const dir = `public/images/products/${r.sub}`;
  const file = `${dir}/${slug}.jpg`;
  if (!DRY) {
    fs.mkdirSync(dir, { recursive: true });
    const res = await fetch(r.img);
    if (!res.ok) { console.log('image failed', r.title, res.status); continue; }
    await sharp(Buffer.from(await res.arrayBuffer())).flatten({ background: '#fff' }).trim({ background: '#fff', threshold: 12 }).resize(1000, 1000, { fit: 'contain', background: '#fff' }).jpeg({ quality: 84 }).toFile(file);
  }
  const age = r.title.match(/(\d{1,2})\s?(?:Year|Yr|YO)/i);
  products.push({
    id: `prod-${slug}`.slice(0, 70), slug, name, brand: r.brand,
    category: subs[r.sub].category, subCategorySlug: r.sub, subCategory: subs[r.sub].name,
    country: '', price: r.price, ...(age ? { age: `${age[1]} Years` } : {}), abv: '', size: r.size,
    images: [`/${file.replace('public/', '')}`], description: '', stock: 6, featured: false,
    sku: `SMR-${slug.toUpperCase().replace(/-/g, '').slice(0, 24)}`,
    primaryKeyword: '', secondaryKeywords: [], faqs: [], metaTitle: '', metaDescription: '',
  });
  have.add(slug); added++;
  console.log('+', name, r.size, '$' + r.price, '->', r.sub);
}
console.log(`${DRY ? 'would add' : 'added'} ${added}`);
if (!DRY && added) fs.writeFileSync(new URL('../lib/data/products.ts', import.meta.url), T.slice(0, start) + JSON.stringify(products, null, 2) + T.slice(end - 1));
