import { PRODUCTS } from '@/lib/data/products';
import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { BRAND_PAGES } from '@/lib/data/brand-pages';
import { SHOP_RULES } from '@/lib/config';
import { titleCase } from '@/lib/seo';
import type { CuratedConfig, CuratedSection } from '@/lib/data/curated';
import type { Product } from '@/lib/types';

/**
 * Brand hub pages (/brands/<slug>/): one URL per stocked brand, owning the brand's head keyword.
 * All numbers, product names and sizes come from the catalogue; nothing is invented.
 */
const money = (n: number) => `$${n.toLocaleString('en-AU')}`;
const real = (p: Product) => !p.images[0].endsWith('.svg');
const rank = (a: Product, b: Product) =>
  (b.badge === 'BEST SELLER' ? 1 : 0) - (a.badge === 'BEST SELLER' ? 1 : 0) || Number(b.featured) - Number(a.featured) || a.price - b.price;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const joinList = (a: string[]) => (a.length <= 1 ? a.join('') : a.length === 2 ? a.join(' and ') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
const SHIP = `Insured delivery across Australia: a flat ${money(SHOP_RULES.shippingFee)} under ${money(SHOP_RULES.freeShippingThreshold)} and free express courier from ${money(SHOP_RULES.freeShippingThreshold)}. The minimum order is ${money(SHOP_RULES.minOrder)}. Buyers must be 18 or over.`;

function describe(list: Product[], max = 3) {
  return list.slice(0, max).map((p) => `${p.name} (${money(p.price)})`);
}

function build(bp: (typeof BRAND_PAGES)[number]): CuratedConfig | null {
  const list = PRODUCTS.filter((p) => p.brand === bp.brand && real(p)).sort(rank);
  if (list.length < 3) return null;
  const prices = list.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const cheapest = list.slice().sort((a, b) => a.price - b.price)[0];
  const priciest = list.slice().sort((a, b) => b.price - a.price)[0];
  const subSlugs = [...new Set(list.map((p) => p.subCategorySlug))];
  const subs = subSlugs.map((s) => SUBCATEGORIES.find((x) => x.slug === s)).filter(Boolean) as (typeof SUBCATEGORIES)[number][];
  const sizes = [...new Set(list.map((p) => p.size.replace(/\s*\(.*$/, '').trim()))].filter((x) => /^\d+(ml|L)$/i.test(x));
  const path = `/brands/${bp.slug}/`;
  const P = titleCase(bp.primary.kw);

  // title <= 60 characters, starts with the primary
  const titles = [`${P} | Buy ${bp.brand} Online Australia`, `${P} | Buy ${bp.brand} Online`, `${P} | Buy Online Australia`, P];
  const title = titles.find((t) => t.length <= 60) || P;
  // description 110-158 characters
  const top = list.slice(0, 2).map((p) => p.name);
  const mk = (withNames: boolean, tail: string) => `${P}: ${list.length} ${bp.brand} bottles${withNames ? `, including ${joinList(top)}` : ''}, ${min === max ? money(min) : `${money(min)} to ${money(max)}`} AUD.${tail}`;
  const description =
    [mk(true, ' Insured delivery Australia-wide, 18+ only.'), mk(true, ' Insured delivery, 18+.'), mk(false, ' Insured delivery Australia-wide, 18+ only.')].find((d) => d.length >= 110 && d.length <= 158) ||
    mk(false, ' Insured delivery Australia-wide, 18+ only. Pay by PayID or crypto.').slice(0, 158);

  // FAQs: one supporting keyword each, only when the shop really stocks what the keyword names (stock check)
  const nameBlob = norm(list.map((p) => `${p.name} ${p.size} ${p.age || ''}`).join(' '));
  const faqs: { question: string; answer: string }[] = [];
  for (const k of bp.secondary) {
    if (faqs.length >= 4) break;
    const w = k.kw.split(' ');
    const nums = w.filter((x) => /^\d+$/.test(x));
    const sizeKw = /\b(\d+ ?ml|1l|1 litre|700ml|1 liter)\b/.test(k.kw);
    if (/\b(price|cost|sale|buy)\b/.test(k.kw)) continue; // commerce phrases stay out of sentences
    if (nums.length && !nums.every((n) => nameBlob.split(' ').includes(n))) continue;
    const matches = list.filter((p) => {
      const b = norm(`${p.name} ${p.size} ${p.age || ''}`);
      return nums.every((n) => b.split(' ').includes(n));
    });
    if (nums.length) {
      faqs.push({ question: `Do you sell ${titleCase(k.kw)}?`, answer: `Yes. ${joinList(describe(matches, 3))} ${matches.length === 1 ? 'is' : 'are'} in stock at Doctors of Whisky. ${SHIP}` });
    } else if (sizeKw && sizes.length) {
      faqs.push({ question: `Do you sell ${titleCase(k.kw)}?`, answer: `${bp.brand} is available in ${joinList(sizes)} at Doctors of Whisky, from ${money(min)} AUD. ${SHIP}` });
    } else {
      faqs.push({ question: `Where can I buy ${k.kw} in Australia?`, answer: `Order ${bp.brand} from Doctors of Whisky, a Sydney bottle shop with ${list.length} ${bp.brand} bottles from ${money(min)} to ${money(max)} AUD. ${SHIP}` });
    }
  }
  const generic = [
    { question: `How much does ${bp.brand} cost in Australia?`, answer: `${bp.brand} at Doctors of Whisky ranges from ${money(min)} AUD (${cheapest.name}) to ${money(max)} AUD (${priciest.name}). Pay by PayID, bank transfer, Bitcoin or USDT, with ${SHOP_RULES.cryptoDiscountPercent}% off for crypto.` },
    { question: `Do you deliver ${bp.brand} across Australia?`, answer: `Yes. ${SHIP}` },
    { question: `Can you help me choose a ${bp.brand} bottle?`, answer: 'Yes. Message us on WhatsApp or use the contact form with your budget and taste and we will suggest a bottle.' },
    { question: 'Is there an age limit?', answer: 'Yes. Buyers must be 18 or over and delivery must be received by an adult.' },
  ];
  for (const g of generic) {
    if (faqs.length >= 5) break;
    if (!faqs.some((f) => f.question === g.question)) faqs.push(g);
  }

  // sections: one per collection when the brand spans several, otherwise one
  const sections: CuratedSection[] =
    subs.length > 1
      ? subs.map((s) => {
          const inSub = list.filter((p) => p.subCategorySlug === s.slug);
          return { id: s.slug, h2: `${bp.brand} in ${s.name}`, products: inSub.slice(0, 9), moreHref: `/shop/${s.category}/collection/${s.slug}/`, moreLabel: `All ${s.name}` } as CuratedSection;
        })
      : [{ id: 'bottles', h2: `${bp.brand} bottles`, note: `Every ${bp.brand} bottle we stock, with current prices.`, products: list.slice(0, 12), moreHref: subs[0] ? `/shop/${subs[0].category}/collection/${subs[0].slug}/` : undefined, moreLabel: subs[0] ? `See all ${subs[0].name}` : undefined }];

  return {
    slug: bp.slug,
    path,
    title,
    description,
    h1: `Buy ${bp.brand} Online in Australia`,
    intro: `Doctors of Whisky stocks ${list.length} ${bp.brand} bottles${sizes.length ? ` in ${joinList(sizes.slice(0, 3))}` : ''}, from ${money(min)} to ${money(max)} AUD. Pick a bottle, pay securely and we deliver it insured Australia-wide.`,
    primary: bp.primary.kw,
    secondary: bp.secondary.map((k) => k.kw),
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Brands', path: '/brands/' }, { name: bp.brand, path }],
    ctaLabel: subs[0] ? `Browse ${subs[0].name}` : 'Shop all bottles',
    ctaHref: subs[0] ? `/shop/${subs[0].category}/collection/${subs[0].slug}/` : '/shop/',
    guideTitle: `Choosing a ${bp.brand}`,
    guide: [
      `${bp.brand} here starts at ${money(min)} AUD (${cheapest.name}) and goes up to ${money(max)} AUD (${priciest.name}).`,
      sizes.length ? `Available sizes: ${joinList(sizes)}.` : `Open any bottle for size, strength and price.`,
      `Orders start at ${money(SHOP_RULES.minOrder)}, so combine ${bp.brand} with another bottle if needed.`,
    ],
    faqs,
    sections,
    related: [
      ...subs.map((s) => ({ label: s.name, href: `/shop/${s.category}/collection/${s.slug}/` })),
      { label: 'All brands', href: '/brands/' },
    ],
  };
}

export const BRAND_HUBS: CuratedConfig[] = BRAND_PAGES.map(build).filter(Boolean) as CuratedConfig[];
export const BRAND_HUB_BY_SLUG: Record<string, CuratedConfig> = Object.fromEntries(BRAND_HUBS.map((c) => [c.slug, c]));
const BY_BRAND = Object.fromEntries(BRAND_PAGES.map((b) => [b.brand, b.slug]));
/** Hub path for a catalogue brand name, when that brand has one. */
export function brandHubPath(brand: string): string | undefined {
  const slug = BY_BRAND[brand];
  return slug && BRAND_HUB_BY_SLUG[slug] ? `/brands/${slug}/` : undefined;
}
