// Aligns catalogue prices that were wrong by more than 3x with the reference retailer (thedrinksociety.com.au, project rule).
//   node scripts/apply-price-corrections.mjs && node scripts/apply-seo-content.mjs
// Idempotent. Source list: scripts/price-corrections.json (slug, was, now, source URL). Only a clear error is changed:
// every row differs from the reference price by more than 3x, was matched by exact size and age tokens, and was reviewed.
import fs from 'node:fs';

const FILE = new URL('../lib/data/products.ts', import.meta.url);
const text = fs.readFileSync(FILE, 'utf8');
const start = text.indexOf('= [', text.indexOf('export const PRODUCTS')) + 2;
const end = text.indexOf('\n];', start) + 3;
const products = JSON.parse(text.slice(start, end - 1));
const fixes = JSON.parse(fs.readFileSync(new URL('./price-corrections.json', import.meta.url), 'utf8'));
const bySlug = new Map(products.map((p) => [p.slug, p]));
let changed = 0;
for (const f of fixes) {
  const p = bySlug.get(f.slug);
  if (!p) throw new Error('unknown slug ' + f.slug);
  if (p.price === f.now) continue;
  if (p.price !== f.was) throw new Error(`${f.slug}: price is ${p.price}, expected ${f.was}`);
  p.price = f.now;
  delete p.originalPrice; // a strike-through "was" price no longer applies
  changed++;
}
if (changed) fs.writeFileSync(FILE, text.slice(0, start) + JSON.stringify(products, null, 2) + text.slice(end - 1));
console.log(`price corrections applied: ${changed} of ${fixes.length}`);
