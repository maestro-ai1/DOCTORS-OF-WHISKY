import fs from 'node:fs';
import path from 'node:path';
import { SUBCATEGORIES, CATEGORY_META } from './subcategory-map.mjs';
import { EXISTING_PRODUCTS } from './existing-products.mjs';
import {
  deriveBrand, priceFor, styleDefaultsFor, tastingNotesFor, descriptionFor,
  faqsFor, slugify, metaTitleFor, metaDescriptionFor,
} from './templates.mjs';
const SHOP_RULES = { freeShippingThreshold: 1500, shippingFee: 75 };

const imageManifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'image-manifest.json'), 'utf8'));
const keywordsManifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'keywords-manifest.json'), 'utf8'));
const heroManifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'brand-hero-manifest.json'), 'utf8'));

const usedSlugs = new Set(EXISTING_PRODUCTS.map((p) => p.slug));
const usedSkus = new Set(EXISTING_PRODUCTS.map((p) => p.sku));

function uniqueSlug(base) {
  let s = base;
  let n = 2;
  while (usedSlugs.has(s)) {
    s = `${base}-${n}`;
    n++;
  }
  usedSlugs.add(s);
  return s;
}

function uniqueSku(base) {
  let s = base;
  let n = 2;
  while (usedSkus.has(s)) {
    s = `${base}-${n}`;
    n++;
  }
  usedSkus.add(s);
  return s;
}

function skuFrom(str) {
  return str
    .toUpperCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 4)
    .join('-');
}

const BADGE_CYCLE = ['BEST SELLER', undefined, undefined, 'LIMITED EDITION', undefined, undefined, 'COLLECTOR RELEASE', undefined, undefined, undefined];

function bestImagesFor(p, sub) {
  const images = imageManifest[sub.slug] || [];
  const brandMatches = images.filter((img) => img.brand.toLowerCase() === p.brand.toLowerCase().replace(/^the /, ''));
  const pool = brandMatches.length > 0 ? brandMatches : images;
  if (pool.length === 0) return p.images;
  const rnd = Math.floor(Math.abs(Math.sin(p.id.length * 999)) * pool.length);
  return [pool[rnd % pool.length].webPath];
}

function enrichExisting(p, sub, kw) {
  return {
    ...p,
    images: bestImagesFor(p, sub),
    subCategorySlug: sub.slug,
    primaryKeyword: kw.primaryKeyword,
    secondaryKeywords: kw.secondaryKeywords,
    faqs: faqsFor(kw.faqSeeds, {
      name: p.name,
      price: p.price,
      abv: p.abv,
      age: p.age,
      subcategoryName: sub.name,
      freeShippingThreshold: SHOP_RULES.freeShippingThreshold,
      shippingFee: SHOP_RULES.shippingFee,
    }),
    metaTitle: metaTitleFor(p.name),
    metaDescription: metaDescriptionFor(p.name, kw.primaryKeyword),
  };
}

function buildGeneratedProduct(sub, imgEntry, index, kw) {
  const brand = deriveBrand(imgEntry.brand, imgEntry.humanizedName);
  const hasTypeWord = /whisky|whiskey|vodka|tequila|gin|rum|wine|beer|cognac|brandy|liqueur|cider|soju|baijiu|mezcal|cream|sambuca|limoncello|amaro/i.test(imgEntry.humanizedName);
  const name = hasTypeWord ? imgEntry.humanizedName : `${imgEntry.humanizedName} ${sub.name}`;
  const seed = `${sub.slug}-${imgEntry.webPath}`;
  const slugBase = slugify(`${name}`);
  const slug = uniqueSlug(slugBase);
  const price = priceFor(seed, sub.priceTier);
  const defaults = { ...styleDefaultsFor(sub.slug) };
  const sizeMatch = imgEntry.humanizedName.match(/\b(\d{2,4}\s?ml|\d(\.\d)?\s?l)\b/i);
  if (sizeMatch) defaults.size = sizeMatch[0].replace(/\s+/g, '').replace(/l$/i, 'L').replace(/ml$/i, 'ml');
  const badge = BADGE_CYCLE[index % BADGE_CYCLE.length];
  const stock = 4 + (index % 9);

  const secondaryKeywords = kw.secondaryKeywords;
  const description = descriptionFor({
    name, brand, subcategoryName: sub.name, country: sub.country, secondaryKeywords,
  });
  const tastingNotes = tastingNotesFor(sub.category, seed);

  const product = {
    id: `prod-${slug}`,
    slug,
    name,
    brand,
    category: sub.category,
    subCategory: sub.name,
    subCategorySlug: sub.slug,
    style: sub.style,
    country: sub.country,
    region: sub.country,
    price,
    abv: defaults.abv,
    size: defaults.size,
    images: imgEntry.images && imgEntry.images.length > 0 ? imgEntry.images : [imgEntry.webPath],
    description,
    tastingNotes,
    ...(badge ? { badge } : {}),
    stock,
    sku: uniqueSku(skuFrom(`${brand}-${name}`) || `SKU-${index}`),
    primaryKeyword: kw.primaryKeyword,
    secondaryKeywords,
    faqs: faqsFor(kw.faqSeeds, {
      name, price, abv: defaults.abv, age: undefined, subcategoryName: sub.name,
      freeShippingThreshold: SHOP_RULES.freeShippingThreshold, shippingFee: SHOP_RULES.shippingFee,
    }),
    metaTitle: metaTitleFor(name),
    metaDescription: metaDescriptionFor(name, kw.primaryKeyword),
  };
  return product;
}

const allProducts = [];

// 1. Enrich existing hand-authored flagship products
for (const p of EXISTING_PRODUCTS) {
  const sub = SUBCATEGORIES.find((s) => s.slug === p.subCategorySlug);
  const kw = keywordsManifest[p.subCategorySlug];
  allProducts.push(enrichExisting(p, sub, kw));
}

// 2. Generate a product per processed image
const subcategoriesOut = [];
for (const sub of SUBCATEGORIES) {
  const images = imageManifest[sub.slug] || [];
  const kw = keywordsManifest[sub.slug];
  images.forEach((imgEntry, idx) => {
    allProducts.push(buildGeneratedProduct(sub, imgEntry, idx, kw));
  });

  const heroImage = images[0]?.webPath || heroManifest[Object.keys(heroManifest)[0]] || '/images/brands/macallan.jpg';
  const productCount = images.length + EXISTING_PRODUCTS.filter((p) => p.subCategorySlug === sub.slug).length;

  subcategoriesOut.push({
    slug: sub.slug,
    name: sub.name,
    category: sub.category,
    description: `Shop ${sub.name} at Doctors of Whisky — ${kw.primaryKeyword} specialists with ${productCount} hand-selected bottles, Sydney vault storage, and insured Australia-wide delivery.`,
    heroImage,
    primaryKeyword: kw.primaryKeyword,
    secondaryKeywords: kw.secondaryKeywords,
    faqs: faqsFor(kw.faqSeeds, {
      name: sub.name, price: sub.priceTier[0], abv: '', age: undefined, subcategoryName: sub.name,
      freeShippingThreshold: SHOP_RULES.freeShippingThreshold, shippingFee: SHOP_RULES.shippingFee,
    }),
  });
}

// Write lib/data/products.ts
const productsHeader = `import { Product } from '@/lib/types';\n\nexport const PRODUCTS: Product[] = `;
const productsFooter = `;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getProductsBySubCategory(subCategorySlug: string): Product[] {
  return PRODUCTS.filter(p => p.subCategorySlug === subCategorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS
    .filter(p => p.id !== product.id && (p.subCategorySlug === product.subCategorySlug || p.brand === product.brand))
    .slice(0, limit);
}
`;

fs.writeFileSync(
  path.join(process.cwd(), 'lib', 'data', 'products.ts'),
  productsHeader + JSON.stringify(allProducts, null, 2) + productsFooter
);

// Write lib/data/subcategories.ts
const subcatHeader = `import { Subcategory } from '@/lib/types';\n\nexport const SUBCATEGORIES: Subcategory[] = `;
const subcatFooter = `;

export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
  return SUBCATEGORIES.find(s => s.slug === slug);
}

export function getSubcategoriesByCategory(category: string): Subcategory[] {
  return SUBCATEGORIES.filter(s => s.category === category);
}
`;

fs.writeFileSync(
  path.join(process.cwd(), 'lib', 'data', 'subcategories.ts'),
  subcatHeader + JSON.stringify(subcategoriesOut, null, 2) + subcatFooter
);

console.log(`Wrote ${allProducts.length} products across ${subcategoriesOut.length} subcategories.`);
for (const sub of subcategoriesOut) {
  const count = allProducts.filter((p) => p.subCategorySlug === sub.slug).length;
  console.log(`  ${sub.slug} (${sub.category}): ${count} products`);
}
