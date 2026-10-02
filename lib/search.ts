import type { Product } from '@/lib/types';

/** Lower-case words only; whiskey/whisky and gray/grey are the same word, and runs of 3+ repeated letters ("julioooo") collapse to one. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/whiskey/g, 'whisky')
    .replace(/gray/g, 'grey')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/(.)\1{2,}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** Shopping and question words that describe what a searcher wants to do, not the bottle itself ("order vodka online", "what is mezcal"). */
const FILLER = new Set(
  ('buy order online delivery delivered deliver shipping price prices cost cheap cheapest best top good australia australian au sale deals shop near me ' +
    'gift gifts set what whats is are how does do can a an the of for to and in with have has make made recipe recipes review reviews vs').split(' '),
);

const SIZE_OR_NUMBER = /^(\d+(\.\d+)?|ml|l|ltr|litre|litres|liter|liters|pack|packs|x|can|cans)$/;

/** Everything a shopper could type for a product: name, brand, collection, style, origin, copy and the product's keywords and tags. */
function haystack(p: Product): string {
  return (
    ' ' +
    norm(
      [
        p.name, p.brand, p.category, p.subCategory, p.subCategorySlug.replace(/-/g, ' '), p.style, p.country, p.region, p.age, p.size, p.description,
        p.primaryKeyword, ...p.secondaryKeywords, ...(p.tags ?? []),
        p.tastingNotes?.nose, p.tastingNotes?.palate, p.tastingNotes?.finish,
      ]
        .filter(Boolean)
        .join(' '),
    ) +
    ' '
  );
}

const cache = new WeakMap<Product, string>();
const hay = (p: Product) => {
  let h = cache.get(p);
  if (!h) { h = haystack(p); cache.set(p, h); }
  return h;
};

/** Whole-word match (so "don" does not match "London"), allowing a plural "s". */
const hasWord = (h: string, w: string) => h.includes(` ${w} `) || h.includes(` ${w}s `) || (w.length > 3 && w.endsWith('s') && h.includes(` ${w.slice(0, -1)} `));
const meaningful = (query: string) => norm(query).split(' ').filter((w) => w && !FILLER.has(w));
const matchesAll = (p: Product, words: string[]) => { const h = hay(p); return words.every((w) => hasWord(h, w)); };

/**
 * True when every meaningful word of the query appears in the product's text, so "veuve clicquot champagne", "glenfiddich 12" and
 * "order vodka online" find the right bottles. Filler words (order, online, gift set, what is ...) are ignored.
 */
export function productMatches(p: Product, query: string): boolean {
  const q = norm(query);
  if (!q) return true;
  if (hay(p).includes(` ${q} `)) return true;
  const words = meaningful(query);
  return !words.length || matchesAll(p, words);
}

/**
 * Products for a keyword. Tries the whole keyword first, then relaxes step by step so a long-tail keyword still lands on real bottles:
 * drop sizes and numbers ("grey goose 200ml" -> grey goose), then the leading words (the brand), then the last word (the category, e.g. vodka).
 */
export function searchProducts(all: Product[], query: string): Product[] {
  const strict = all.filter((p) => productMatches(p, query));
  if (strict.length && strict.length < all.length) return strict;
  const words = meaningful(query);
  if (!words.length) return all;
  const steps: string[][] = [];
  const noUnits = words.filter((w) => !SIZE_OR_NUMBER.test(w));
  if (noUnits.length && noUnits.length < words.length) steps.push(noUnits);
  const base = noUnits.length ? noUnits : words;
  if (base.length > 2) steps.push(base.slice(0, 2));
  if (base.length > 1) steps.push(base.slice(0, 1));
  const last = base[base.length - 1];
  if (base.length > 1 && last.length >= 4) steps.push([last]);
  for (const step of steps) {
    const hits = all.filter((p) => matchesAll(p, step));
    if (hits.length) return hits;
  }
  return strict;
}
