// Rewrites product + collection copy from the keyword pipeline output.
//   node scripts/seo-strategy.mjs        (produces lib/data/seo-keywords.ts)
//   node scripts/apply-seo-content.mjs   (rewrites lib/data/products.ts and lib/data/subcategories.ts)
// Idempotent: it recomputes generated fields every run and keeps hand-written descriptions.
// Only verifiable category/brand facts (scripts/seo-content-data.mjs) and store rules (lib/config.ts) are used.
import fs from 'node:fs';
import path from 'node:path';
import { SUB_FACTS, BRAND_FACTS } from './seo-content-data.mjs';

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ---- store rules (single source: lib/config.ts) ----
const cfg = read('lib/config.ts');
const num = (re) => Number((cfg.match(re) || [])[1]);
const RULES = {
  min: num(/minOrder:\s*(\d+)/),
  free: num(/freeShippingThreshold:\s*(\d+)/),
  fee: num(/shippingFee:\s*(\d+)/),
  crypto: num(/cryptoDiscountPercent:\s*(\d+)/),
};
const WHATSAPP = (cfg.match(/phone:\s*'([^']+)'/) || [])[1];
const money = (n) => `$${Number(n).toLocaleString('en-AU')}`;

// ---- load generated keyword data ----
const kwTs = read('lib/data/seo-keywords.ts');
const kwJson = kwTs.slice(kwTs.indexOf('= {', kwTs.indexOf('SEO_KEYWORDS')) + 2, kwTs.indexOf(';\n\nexport const SITE_TAGS'));
const SEO = JSON.parse(kwJson);

// ---- keyword strategy v2: per-product primary (Transactional), 15 secondary, 20 Commercial tags (Semrush bank, KD <= 28) ----
const MAPP = Object.fromEntries(JSON.parse(fs.readFileSync(path.resolve(ROOT, '..', 'SEO Analysis', 'mapping-v2.json'), 'utf8')).products.map((e) => [e.slug, e]));
const tc = (s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\b(\d+)(l|ml)\b/gi, (m, n, u) => n + (u.toLowerCase() === 'l' ? 'L' : 'ml')).replace(/\bAnd\b/g, 'and').replace(/\bOf\b/g, 'of');

// ---- load data files (JSON arrays inside TS) ----
function loadArray(file, exportName) {
  const t = read(file);
  const start = t.indexOf('= [', t.indexOf(`export const ${exportName}`)) + 2;
  const end = t.indexOf('\n];', start) + 3;
  return { text: t, start, end, arr: JSON.parse(t.slice(start, end - 1)) };
}
const P = loadArray('lib/data/products.ts', 'PRODUCTS');
const S = loadArray('lib/data/subcategories.ts', 'SUBCATEGORIES');
let products = P.arr;
const subs = S.arr;
const subBySlug = Object.fromEntries(subs.map((s) => [s.slug, s]));

// ---- helpers ----
const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const pick = (arr, seed) => arr[hash(seed) % arr.length];
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const article = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const BRAND_FIX = { Glendronach: 'GlenDronach' };
const NAME_FIX = [[/\bXxo\b/g, 'XXO'], [/\bVsop\b/g, 'VSOP'], [/\bGlendronach\b/g, 'GlenDronach'], [/\bXo\b/g, 'XO'], [/\bVs\b/g, 'VS']];

function cleanName(p) {
  let n = p.name;
  for (const [re, to] of NAME_FIX) n = n.replace(re, to);
  const b = (BRAND_FIX[p.brand] || p.brand).replace(/^The /, '');
  const lower = n.toLowerCase();
  const bl = b.toLowerCase();
  const first = lower.indexOf(bl);
  const last = lower.lastIndexOf(bl);
  if (first !== last && lower.endsWith(bl)) n = n.slice(0, n.length - b.length).trim();
  n = n.replace(/\s+/g, ' ').replace(/\b(\w+)( \1\b)+/gi, '$1');
  return n;
}

const MULTI_BRANDS = ['Johnnie Walker', 'Royal Salute', 'Grey Goose', 'Don Julio', 'Jose Cuervo', 'Jack Daniels', 'Wild Turkey', 'Elijah Craig', 'Four Roses'];
function fixBrand(p) {
  for (const b of MULTI_BRANDS) if (p.name.toLowerCase().startsWith(b.toLowerCase())) return b;
  if (p.brand === 'The Macallan') return 'Macallan';
  return BRAND_FIX[p.brand] || p.brand;
}
const BRAND_SUBS = new Set(['grey-goose', 'belvedere', 'patron', 'don-julio', 'jose-cuervo']);

// ---- 1. de-duplicate products (same name -> keep first, merge images) ----
const seen = new Map();
const kept = [];
let removed = 0;
for (const p of products) {
  p.brand = fixBrand(p);
  p.name = cleanName(p);
  // a product literally named after its brand collides with the brand collection page (duplicate title/H1)
  if (p.name.toLowerCase() === p.brand.toLowerCase()) p.name = `${p.name} ${p.style || p.subCategory}`.replace(/\s+/g, ' ').trim();
  const key = p.name.toLowerCase();
  if (seen.has(key)) {
    const first = seen.get(key);
    for (const img of p.images) if (!first.images.includes(img)) first.images.push(img);
    removed++;
    continue;
  }
  seen.set(key, p);
  kept.push(p);
}
products = kept;

// ---- 2. per-subcategory stats ----
const bySub = {};
for (const p of products) (bySub[p.subCategorySlug] ||= []).push(p);
function stats(slug) {
  const list = bySub[slug] || [];
  const prices = list.map((p) => p.price);
  const brands = {};
  for (const p of list) brands[p.brand] = (brands[p.brand] || 0) + 1;
  const brandList = Object.entries(brands).sort((a, b) => b[1] - a[1]).map(([b, n]) => ({ brand: b, n }));
  return { n: list.length, min: Math.min(...prices), max: Math.max(...prices), brands: brandList, cheapest: list.slice().sort((a, b) => a.price - b.price)[0], list };
}
const joinList = (arr) => (arr.length <= 1 ? arr.join('') : arr.length === 2 ? arr.join(' and ') : `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`);

// ---- 3. product keywords + copy ----
const STOPWORDS = new Set(['the', 'and', 'scotch', 'whisky', 'whiskey', 'single', 'malt', 'year', 'old', 'yo', 'cognac', 'brandy', 'tequila', 'vodka', 'wine', 'beer', 'rum', 'gin', 'liqueur']);
function productKeywords(p) {
  const me = MAPP[p.slug];
  if (me) {
    const pr = me.primary || me.fallbackPrimary;
    const primary = pr ? pr.kw : norm(p.name).split(' ').slice(0, 5).join(' ');
    return { primary, secondary: me.secondary.map((k) => k.kw).filter((k) => k !== primary).slice(0, 15), tags: me.tags.map((k) => k.kw).filter((k) => k !== primary).slice(0, 20) };
  }
  const set = SEO[p.subCategorySlug];
  if (!set) return { primary: p.primaryKeyword, secondary: p.secondaryKeywords };
  const brandTok = norm(p.brand).replace(/^the /, '').split(' ').filter((t) => t.length > 2);
  const nameTok = norm(p.name).split(' ').filter((t) => t.length > 1 && !STOPWORDS.has(t) && !brandTok.includes(t));
  const pool = [...new Set([set.primary, ...set.secondary, ...set.tags])];
  const brandOk = (k) => brandTok.length && brandTok.every((t) => norm(k).includes(t));
  const scored = pool
    .map((k) => {
      const nk = norm(k);
      const nameHits = nameTok.filter((t) => nk.includes(t)).length;
      const score = (brandOk(k) ? 2 : 0) + nameHits * 2;
      return { k, score, nameHits, len: k.split(' ').length };
    })
    .filter((x) => x.score >= 2 && x.len <= 5);
  const order = (a, b) => b.score - a.score || pool.indexOf(a.k) - pool.indexOf(b.k);
  scored.sort(order);
  // A product-level primary must be specific to the product (a tag matching its own name tokens);
  // otherwise the product name itself is the primary, so 20 Macallan pages never all chase "macallan 12".
  const specific = scored.find((x) => x.nameHits >= 1);
  const primary = specific ? specific.k : norm(p.name);
  const secondary = [...new Set([...scored.filter((x) => x.k !== primary).slice(0, 12).map((x) => x.k), ...set.secondary.slice(0, 6)])].filter((k) => k !== primary).slice(0, 15);
  return { primary, secondary };
}

function brandFactFor(p) {
  const b = norm(p.brand).replace(/^the /, '');
  for (const key of Object.keys(BRAND_FACTS)) if (b.includes(key)) return BRAND_FACTS[key];
  return '';
}

function naturalKeyword(p, kws) {
  // one natural phrase (2-4 words) that contains the correctly spelled brand
  const brandTok = norm(p.brand).replace(/^the /, '').split(' ')[0];
  const cands = [kws.primary, ...kws.secondary].filter((k) => k.split(' ').length >= 2 && k.split(' ').length <= 4 && norm(k).includes(brandTok) && !/\b(bws|dan murphy|liquorland|coles|woolworths|aldi|costco|first choice|nz|uk|us|usa)\b/i.test(k));
  return cands[hash(p.slug) % Math.max(1, cands.length)] || cands[0] || `${p.brand} ${p.style || ''}`.trim();
}

let sameBrandCount = {};
for (const p of products) sameBrandCount[p.brand] = (sameBrandCount[p.brand] || 0) + 1;

for (const p of products) {
  const sub = subBySlug[p.subCategorySlug];
  const catName = sub ? sub.name : p.subCategory;
  const catLower = catName.toLowerCase();
  const facts = SUB_FACTS[p.subCategorySlug] || { what: '', serve: '', gift: '' };
  const styleLower = (p.style || catName).toLowerCase();
  const kws = productKeywords(p);
  p.primaryKeyword = kws.primary;
  p.secondaryKeywords = kws.secondary;
  if (kws.tags) p.tags = kws.tags;
  const kw = naturalKeyword(p, kws);
  const brandFact = brandFactFor(p);
  const nOthers = sameBrandCount[p.brand] - 1;
  const seed = p.slug;
  const whatBit = BRAND_SUBS.has(p.subCategorySlug) && brandFact ? '' : facts.what;
  const sizeBit = p.name.toLowerCase().includes(p.size.toLowerCase()) ? '' : ` (${p.size})`;
  const where = p.region && p.region !== p.country ? `${p.region}, ${p.country}` : p.country;
  const styleOk = p.style && !p.style.includes('/') && p.style.toLowerCase() !== p.brand.toLowerCase();
  const styleTitle = styleOk && !catName.toLowerCase().includes(p.style.toLowerCase()) ? p.style : catName.toLowerCase() === p.brand.toLowerCase() ? p.style || 'spirit' : catName;
  const madeIn = ['United States', 'United Kingdom', 'Netherlands', 'Philippines'].includes(p.country) ? `the ${p.country}` : p.country;

  // lead paragraph: keep hand-written descriptions, replace the old generated template
  if (/hand-selected|provenance-verified before dispatch/i.test(p.description) || !p.description || p.description.length < 60) {
    p.description = `${p.name}${sizeBit} is ${article(styleTitle)} ${styleTitle.toLowerCase()} from ${p.brand}${p.country ? `, made in ${madeIn}` : ''}. Buy it online from Doctors of Whisky with insured delivery across Australia.`;
  }

  const ageBit = p.age ? `, carrying an age statement of ${p.age}` : '';
  const p1Variants = [
    `${p.name} comes from ${p.brand}. ${brandFact} ${whatBit}`.replace(/\s+/g, ' ').trim(),
    `${whatBit} ${p.name} is ${p.brand}’s expression in this style${ageBit}. ${brandFact}`.replace(/\s+/g, ' ').trim(),
    `${brandFact} ${p.name} sits in our ${catLower} range${nOthers > 0 ? `, alongside ${nOthers} other ${p.brand} ${nOthers === 1 ? 'bottle' : 'bottles'}` : ''}. ${whatBit}`.replace(/\s+/g, ' ').trim(),
  ];
  const p2 = `${facts.serve} ${p.name} is ${p.abv ? `listed at ${p.abv} ABV in` : 'sold in'} a ${p.size} format${where ? `, from ${where}` : ''}.`;
  const buyVariants = [
    `Buy ${p.name} online in Australia for ${money(p.price)} AUD. Orders of ${money(RULES.free)} AUD or more ship free by express courier; below that a flat ${money(RULES.fee)} AUD fee applies. There is a ${money(RULES.min)} AUD minimum order, delivery is insured, and an adult (18+) must sign for every parcel.`,
    `If you are looking for ${kw}, ${p.name} is available from Doctors of Whisky at ${money(p.price)} AUD. We deliver Australia-wide with insured shipping (free from ${money(RULES.free)} AUD, otherwise ${money(RULES.fee)} AUD), and payment is by PayID, bank transfer, Bitcoin or USDT, with ${RULES.crypto}% off when you pay in crypto.`,
    `${p.name} is ${money(p.price)} AUD at Doctors of Whisky, shipped Australia-wide from Sydney. Pay by PayID, bank transfer, Bitcoin or USDT (${RULES.crypto}% crypto discount), spend ${money(RULES.free)} AUD or more for free express delivery, and remember that every order needs an adult signature.`,
  ];
  p.longDescription = [pick(p1Variants, seed + 'a'), p2, pick(buyVariants, seed + 'b')];

  const orig = p.originalPrice && p.originalPrice > p.price ? ` (down from ${money(p.originalPrice)})` : '';
  const whereQ = pick(
    [`Where can I buy ${p.name} online in Australia?`, `Can I buy ${p.name} online and have it delivered in Australia?`, `Where do I buy ${kw} online in Australia?`],
    seed + 'q'
  );
  p.faqs = [
    {
      question: `How much does ${p.name} cost in Australia?`,
      answer: `${p.name} is priced at ${money(p.price)} AUD${orig} at Doctors of Whisky. Paying with Bitcoin or USDT takes ${RULES.crypto}% off, orders of ${money(RULES.free)} AUD or more ship free, and the minimum order is ${money(RULES.min)} AUD.`,
    },
    {
      question: whereQ,
      answer: `You can buy ${p.name} from Doctors of Whisky, a Sydney-based bottle shop that delivers Australia-wide. Add it to your cart, or message the team on WhatsApp (${WHATSAPP}) to confirm your order. Buyers must be 18 or over.`,
    },
    {
      question: `What size and strength is ${p.name}?`,
      answer: `${p.name} is sold in a ${p.size} format${p.age ? ` and carries an age statement of ${p.age}` : ''}. ${p.abv ? `It is listed at ${p.abv} ABV, and is` : 'It is'} ${article(styleLower)} ${styleLower}${p.country ? ` from ${p.country}` : ''}${p.region && p.region !== p.country ? ` (${p.region})` : ''}. Check the label for the exact strength of the batch you receive.`,
    },
    {
      question: `How should I serve ${p.name}?`,
      answer: facts.serve || `Serve ${p.name} chilled or as directed on the label.`,
    },
    {
      question: `Is ${p.name} a good gift?`,
      answer: `${facts.gift || `${p.name} makes a thoughtful gift for adults who enjoy ${catLower}.`} To arrange a gift order or ask about delivery, message the team on WhatsApp (${WHATSAPP}) before you check out.`,
    },
  ];

  // the primary keyword must read naturally in the lead copy (idempotent: appended once)
  p.description = p.description.replace(/ Looking for [^?]+\? You can buy it online from Doctors of Whisky with insured delivery across Australia\./g, '').replace(/ Searching for [^?]+\? This page lists the price, size and insured delivery details\./g, '').trim();
  if (!norm(p.description).includes(norm(kws.primary))) {
    p.description = `${p.description.trim()} Searching for ${kws.primary}? This page lists the price, size and insured delivery details.`;
  }
  const agePart = p.age && !p.name.toLowerCase().includes(p.age.toLowerCase().split(' ')[0]) ? ` ${p.age}` : '';
  p.metaTitle = `Buy ${p.name}${agePart} Online Australia`;
  if (!norm(p.metaTitle).includes(norm(kws.primary))) p.metaTitle = `${tc(kws.primary)} | ${p.name}${agePart}`;
  p.metaDescription = `Buy ${p.name}${sizeBit} online in Australia for ${money(p.price)} AUD. ${styleTitle} from ${p.brand}. Insured delivery, 18+ only, pay by PayID, bank transfer or crypto.`;
  if (!norm(p.metaDescription).includes(norm(kws.primary))) p.metaDescription = `${tc(kws.primary)}: ${p.metaDescription}`;
}

// ---- 4. subcategories ----
for (const sub of subs) {
  const st = stats(sub.slug);
  const set = SEO[sub.slug];
  const facts = SUB_FACTS[sub.slug] || { what: '', serve: '', gift: '' };
  const catLower = sub.name.toLowerCase();
  const brandNames = st.brands.map((b) => b.brand);
  const topBrands = brandNames.slice(0, 4);
  const primary = set ? set.primary : sub.primaryKeyword;
  sub.primaryKeyword = primary;
  sub.secondaryKeywords = set ? set.secondary : sub.secondaryKeywords;

  sub.tags = set ? set.tags.slice(0, 20) : sub.tags;
  sub.description = `Buy ${sub.name} online in Australia: ${st.n} bottles${topBrands.length ? ` from ${joinList(topBrands.slice(0, 3))}` : ''}, priced from ${money(st.min)} to ${money(st.max)} AUD. Insured delivery, 18+ only.`;
  if (primary && !norm(sub.description).includes(norm(primary))) sub.description = `${tc(primary)}: ${sub.description}`;

  const brandFacts = topBrands.map((b) => brandFactFor({ brand: b })).filter(Boolean).slice(0, 2);
  sub.longDescription = [
    `${facts.what} Doctors of Whisky lists ${st.n} ${catLower} ${st.n === 1 ? 'bottle' : 'bottles'}${brandNames.length ? ` across ${brandNames.length} ${brandNames.length === 1 ? 'brand' : 'brands'}, including ${joinList(topBrands)}` : ''}, priced from ${money(st.min)} to ${money(st.max)} AUD.`,
    [...brandFacts, facts.serve].filter(Boolean).join(' '),
    `To buy ${primary} online in Australia, choose a bottle above and add it to your cart. Orders of ${money(RULES.free)} AUD or more ship free by express courier, while smaller orders pay a flat ${money(RULES.fee)} AUD fee, with a ${money(RULES.min)} AUD minimum order. Every delivery is insured, needs an adult (18+) signature, and can be paid by PayID, bank transfer, Bitcoin or USDT with ${RULES.crypto}% off for crypto.`,
  ];

  const buyKw = set && set.secondary.find((k) => /^(buy|best|cheap)\b/.test(k) && k.split(' ').length <= 5);
  const whereQ = buyKw ? (/^buy /.test(buyKw) ? `Where can I ${buyKw} in Australia?` : `Where can I buy ${primary} online in Australia?`) : `Where can I buy ${primary} online in Australia?`;
  const cheapest = st.cheapest;
  const priciest = st.list.slice().sort((a, b) => b.price - a.price)[0];
  sub.faqs = [
    {
      question: `How much does ${primary} cost in Australia?`,
      answer: `${sub.name} at Doctors of Whisky ranges from ${money(st.min)} AUD (${cheapest ? cheapest.name : 'entry bottles'}) to ${money(st.max)} AUD (${priciest ? priciest.name : 'top-shelf bottles'}). Paying with Bitcoin or USDT takes ${RULES.crypto}% off, and orders of ${money(RULES.free)} AUD or more ship free.`,
    },
    {
      question: whereQ,
      answer: `Order ${primary} from Doctors of Whisky, a Sydney-based bottle shop that delivers across Australia. Add bottles to your cart, choose PayID, bank transfer, Bitcoin or USDT, and an adult (18+) signs for delivery. The minimum order is ${money(RULES.min)} AUD.`,
    },
    {
      question: `Which ${catLower} brands do you sell?`,
      answer: brandNames.length
        ? `Our ${catLower} range includes ${joinList(st.brands.slice(0, 8).map((b) => `${b.brand} (${b.n})`))}. Open any brand or bottle for size, strength and price.`
        : `Browse the ${catLower} range above for the current bottles, sizes and prices.`,
    },
    {
      question: `What is ${catLower}?`,
      answer: facts.what || `${sub.name} is a category of drinks you can browse above.`,
    },
    {
      question: `How do you serve ${catLower}?`,
      answer: facts.serve || `Serve ${catLower} as directed on the label.`,
    },
    {
      question: `Is ${catLower} a good gift?`,
      answer: `${facts.gift || `${sub.name} makes a thoughtful gift for adults.`} Delivery is insured and Australia-wide, and you can message the team on WhatsApp (${WHATSAPP}) with any gift questions.`,
    },
  ];
}

// ---- write back ----
const out = (file, parsed, arr) =>
  fs.writeFileSync(path.join(ROOT, file), parsed.text.slice(0, parsed.start) + JSON.stringify(arr, null, 2) + parsed.text.slice(parsed.end - 1));
out('lib/data/products.ts', P, products);
out('lib/data/subcategories.ts', S, subs);
console.log(`products ${P.arr.length} -> ${products.length} (removed ${removed} duplicates); subcategories ${subs.length}`);
console.log('sample:', products[0].primaryKeyword, '|', products[0].secondaryKeywords.slice(0, 4).join(', '));
