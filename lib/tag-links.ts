import { PRODUCTS } from '@/lib/data/products';
import { SUBCATEGORIES } from '@/lib/data/subcategories';

export interface TagLink {
  label: string;
  href: string;
}

// Words that describe buying intent but not the thing being bought.
const MODIFIERS = new Set([
  'buy', 'online', 'price', 'prices', 'cost', 'cheap', 'cheapest', 'best', 'australia', 'australian', 'au', 'sale', 'order',
  'shop', 'delivery', 'bottle', 'bottles', 'deal', 'deals', 'the', 'of', 'a', 'in', 'for', 'and', 'to', 'near', 'me', 'where',
]);
const norm = (s: string) => s.toLowerCase().replace(/gray/g, 'grey').replace(/\bliter(s)?\b/g, 'litre$1').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const content = (s: string) => norm(s).split(' ').filter((t) => t && !MODIFIERS.has(t));

const productTokens = PRODUCTS.map((p) => ({ p, tokens: new Set(content(`${p.brand} ${p.name}`)) }));
const subTokens = SUBCATEGORIES.map((s) => ({ s, tokens: new Set([...content(s.name), ...content(s.primaryKeyword)]) }));

/** Best real page for a tag: an exact product, then the most overlapping collection, else the page's own fallback. */
function resolve(tag: string, fallback: string): string {
  const t = content(tag);
  if (t.length >= 2) {
    // Link to a product only when the tag names most of it (coverage >= 60%), preferring the closest match.
    let hit: { p: (typeof productTokens)[number]['p']; cov: number } | undefined;
    for (const { p, tokens } of productTokens) {
      if (!t.every((w) => tokens.has(w))) continue;
      const cov = t.length / tokens.size;
      if (cov >= 0.6 && (!hit || cov > hit.cov)) hit = { p, cov };
    }
    if (hit) return `/shop/${hit.p.category}/${hit.p.slug}/`;
  }
  let best: { href: string; score: number } | undefined;
  for (const { s, tokens } of subTokens) {
    const score = t.filter((w) => tokens.has(w)).length;
    if (score > 0 && (!best || score > best.score)) best = { href: `/shop/${s.category}/collection/${s.slug}/`, score };
  }
  return best ? best.href : fallback;
}

/**
 * Pick `limit` distinct, readable commercial tags (pool is already low-KD and ordered easiest-first) and link each one
 * to the most relevant real page. Near-duplicates ("gray goose 1l" / "grey goose 1 litre") and runs of the same
 * lead word are thinned so the list reads naturally rather than as keyword stuffing.
 */
export function buildTagLinks(pool: string[], fallback: string, selfPath: string, limit = 20, extras: string[] = [], lead: string[] = []): TagLink[] {
  const seen = new Set<string>();
  const out: TagLink[] = [];
  const add = (raw: string, counts?: Map<string, number>, cap = 5) => {
    const label = raw.toLowerCase().trim();
    const key = [...new Set(norm(label).split(' ').filter((t) => !['the', 'of', 'a', '1', 'l', 'litre', '1l', 'cost', 'price'].includes(t)))].sort().join(' ');
    if (!key || seen.has(key) || out.length >= limit) return;
    const head = norm(label).split(' ')[0];
    if (counts && (counts.get(head) || 0) >= cap) return;
    let href = resolve(label, fallback);
    if (href === selfPath) href = fallback; // a tag should never link to the page it is on
    seen.add(key);
    counts?.set(head, (counts.get(head) || 0) + 1);
    out.push({ label, href });
  };
  for (const raw of lead) add(raw); // pass 0: topic-specific phrases that must come first (blogs)
  const leadCount = new Map<string, number>();
  for (const raw of pool) add(raw, leadCount, 5); // pass 1: varied, easiest-to-rank first
  for (const raw of pool) add(raw, leadCount, 9); // pass 2: relax the lead-word cap
  for (const raw of pool) add(raw, leadCount, 99); // pass 3: no cap, so every supplied tag is shown
  for (const raw of extras) add(raw); // pass 4: natural transactional phrases for thin collections
  return out;
}

/**
 * Shows EVERY supplied keyword (only exact duplicates are dropped) and links each to the closest real page.
 * Used for the 15 secondary keywords and the 20 tags on a page, which must all be present.
 */
export function linkList(labels: string[], fallback: string, selfPath: string, limit = labels.length): TagLink[] {
  const seen = new Set<string>();
  const out: TagLink[] = [];
  for (const raw of labels) {
    const label = raw.toLowerCase().trim();
    if (!label || seen.has(label) || out.length >= limit) continue;
    seen.add(label);
    let href = resolve(label, fallback);
    if (href === selfPath) href = fallback;
    out.push({ label, href });
  }
  return out;
}

/** Transactional phrases built from a product's own name/brand/collection, used only to top up thin keyword pools. */
export function productTagTemplates(p: { name: string; brand: string; subCategory: string; size: string }): string[] {
  const short = p.name.toLowerCase().split(/\s+/).slice(0, 3).join(' '); // keep tags readable
  const brand = p.brand.toLowerCase();
  const sub = p.subCategory.toLowerCase();
  return [
    `buy ${short} online`, `${short} price australia`, `${short} for sale`, `order ${short} online`, `buy ${brand} online`,
    `${brand} price australia`, `buy ${sub} online`, `best ${sub} australia`, `${sub} for sale`, `cheap ${brand}`,
    `${brand} gift ideas`, `${sub} delivery australia`, `${sub} deals`, `where to buy ${brand}`, `shop ${sub}`,
    `${brand} online australia`, `${sub} gift ideas`, `premium ${sub}`, `${short} delivery`, `${brand} ${p.size.toLowerCase()}`,
  ];
}

export function collectionTagTemplates(subName: string): string[] {
  const s = subName.toLowerCase();
  return [`buy ${s} online`, `${s} for sale australia`, `best ${s} australia`, `${s} price`, `${s} gift ideas`, `cheap ${s}`, `order ${s} online`, `${s} delivery australia`, `${s} deals`, `shop ${s}`, `${s} online australia`, `premium ${s}`];
}
