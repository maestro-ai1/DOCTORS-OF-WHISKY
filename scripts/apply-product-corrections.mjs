// Idempotent corrections for products whose generated defaults are factually wrong. Run after generate-products / apply-seo-content:
//   node scripts/apply-product-corrections.mjs
//
// D9 seltzers (Saint D9 / Strong D9) are alcoholic Australian seltzers at 9.9% ABV in 500 mL (Saint) or 375 mL (Strong) cans,
// roughly 3.9 and 2.9 standard drinks per can. The generator's seltzer defaults (4.5-5.0% ABV, 330 mL) are wrong for them.
// Verified against Australian retailer listings (Dan Murphy's, Cellars Market, The Drink Society), 2026-10-01.
import fs from 'node:fs';

const FILE = new URL('../lib/data/products.ts', import.meta.url);
const text = fs.readFileSync(FILE, 'utf8');
const start = text.indexOf('= [') + 2;
const end = text.indexOf('\n];') + 2;
const products = JSON.parse(text.slice(start, end));

const FIXES = {
  'd9-sparkling-grape-zero-sugar': { brand: 'Saint', can: 500, flavour: 'grape' },
  'd9-strong-sparkling-grape-zero-sugar': { brand: 'Strong', can: 375, flavour: 'grape' },
  'saint-d9-sparkling-lemon-zero-sugar': { brand: 'Saint', can: 500, flavour: 'lemon' },
  'saint-d9-sparkling-peach-zero-sugar': { brand: 'Saint', can: 500, flavour: 'peach' },
  'strong-double-sparkling-lemon-zero-sugar': { brand: 'Strong', can: 375, flavour: 'lemon' },
};

const ABV = 9.9;
const standardDrinks = (ml) => Math.round(((ml * (ABV / 100) * 0.789) / 10) * 10) / 10; // 10 g alcohol = 1 standard drink

let changed = 0;
for (const p of products) {
  const fix = FIXES[p.slug];
  if (!fix) continue;
  const size = `${fix.can}ml (Case of 24)`;
  const sd = standardDrinks(fix.can);
  const oldSize = p.size;
  const oldAbv = p.abv;
  const brand = fix.brand;

  p.brand = brand;
  p.abv = `${ABV}%`;
  p.size = size;
  p.description = `${p.name} is a zero sugar sparkling seltzer from ${brand}, made in Australia. It is an alcoholic drink at ${ABV}% ABV, sold as a case of 24 x ${fix.can}ml cans, and each can contains about ${sd} standard drinks. Buy it online from Doctors of Whisky with insured delivery across Australia. Buyers must be 18 or over.`;
  p.metaDescription = `Buy ${p.name} (24 x ${fix.can}ml cans, ${ABV}% ABV) online in Australia for $${p.price} AUD. Insured delivery, 18+ only, PayID, bank transfer or crypto.`;

  // Replace the strength / size wherever the generator repeated them in prose.
  const swap = (s) =>
    typeof s === 'string'
      ? s.split(oldSize).join(size).split(oldAbv).join(`${ABV}%`).replace(/is a seltzer from [^,.]+/, `is a ${ABV}% ABV zero sugar seltzer from ${brand}`)
      : s;
  p.faqs = p.faqs.map((f) => ({
    question: f.question,
    answer: f.question.startsWith('What size and strength')
      ? `${p.name} is sold as a case of 24 x ${fix.can}ml cans. It is ${ABV}% ABV, about ${sd} standard drinks per can, so it is much stronger than most seltzers. Check the label for the exact strength of the batch you receive.`
      : swap(f.answer),
  }));
  if (Array.isArray(p.longDescription)) {
    p.longDescription = p.longDescription.map((para) =>
      /listed at .* ABV/.test(para)
        ? `${p.name} is a ${ABV}% ABV seltzer from Australia, sold as a case of 24 x ${fix.can}ml cans with about ${sd} standard drinks per can. Serve very cold in the can, or over ice with a slice of fruit, and pace yourself because it is stronger than most seltzers.`
        : swap(para),
    );
  }
  changed++;
}

const out = text.slice(0, start) + JSON.stringify(products, null, 2) + text.slice(end);
if (out !== text) fs.writeFileSync(FILE, out);
console.log(`corrected ${changed} product(s); file ${out !== text ? 'updated' : 'already up to date'}`);
