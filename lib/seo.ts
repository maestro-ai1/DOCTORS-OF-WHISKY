import type { Metadata } from 'next';
import { SITE, CONTACT, SHOP_RULES } from '@/lib/config';
import { SEO_KEYWORDS, SITE_TAGS } from '@/lib/data/seo-keywords';
import type { Product } from '@/lib/types';

export const BASE_URL = `https://${SITE.domain}`;
/** Bump when page content genuinely changes — used for sitemap <lastmod> and og:updated_time. */
export const CONTENT_UPDATED = '2026-10-01';

export const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/og-default.png`,
  width: 1200,
  height: 630,
  alt: 'Doctors of Whisky — buy rare whisky, single malt and fine spirits online in Australia',
};

export function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${BASE_URL}${p}`;
}

/** Trim to a sentence/word boundary so descriptions never end in "...". */
export function fitDescription(text: string, max = 158, min = 110): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  if (stop >= min) return cut.slice(0, stop + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s-]+$/, '') + '.';
}

/** Page title: keyword first, brand suffix only when it fits (<= 60 chars total). */
export function fitTitle(base: string, max = 60): string {
  const suffix = ` | ${SITE.name}`;
  const clean = base.replace(/\s*\|\s*Doctors of Whisky.*$/i, '').trim();
  if ((clean + suffix).length <= max) return clean + suffix;
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).trim();
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}

/**
 * One place that builds every page's metadata. In the App Router a page's openGraph/twitter REPLACE the
 * layout's, so images/url/siteName/locale are always set here (WebForge item 64).
 */
export function buildMetadata(input: PageMetaInput): Metadata {
  const title = fitTitle(input.title);
  const description = fitDescription(input.description);
  const url = absoluteUrl(input.path);
  const image = input.image
    ? { width: 1200, height: 630, ...input.image, url: input.image.url.startsWith('http') ? input.image.url : absoluteUrl(input.image.url) }
    : DEFAULT_OG_IMAGE;
  return {
    title: { absolute: title },
    description,
    keywords: input.keywords && input.keywords.length ? input.keywords : undefined,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_AU',
      type: input.type ?? 'website',
      images: [image],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

// ---------- hidden keyword tags (meta keywords + JSON-LD `keywords`, never rendered as visible text) ----------

// Competitor retailers, typos and non-English variants the keyword bank returns but we must not tag.
const TAG_BLOCKLIST = /\b(dan murphys?|bws|liquorland|first choice|woolworths|coles|aldi|barboun|costco|amazon|walmart|target|total wine|bevmo|ebay|kmart|big w|safeway|kroger|tesco|lcbo)\b/;
// Informational / non-purchase phrasing is not a commercial tag.
const TAG_INFO = /\b(percentage|percent|abv|proof|calories|carbs|alcohol content|how many|how much|what is|branding|logo|meaning|history|symbol|pronounce|recipes?|cocktails?|reviews?|reddit|largest|biggest|giant|huge|mini|miniature)\b/;

function isCleanTag(key: string): boolean {
  if (TAG_BLOCKLIST.test(key) || TAG_INFO.test(key)) return false;
  if (/(.)\1{2,}/.test(key)) return false; // "julioooo"
  if (/[^\x00-\x7f]/.test(key.normalize('NFD').replace(/[̀-ͯ]/g, ''))) return false;
  if (/\bbrands?$/.test(key)) return false; // "don julio brands"
  return key.split(/\s+/).length <= 7;
}

function dedupe(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of list) {
    const key = k.toLowerCase().trim();
    if (key && isCleanTag(key) && !seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  }
  return out;
}

export function subcategoryTags(slug: string, limit = 120): string[] {
  const set = SEO_KEYWORDS[slug];
  if (!set) return [];
  return dedupe([set.primary, ...set.secondary, ...set.tags]).slice(0, limit);
}

/** Product tags: brand/name-matched commercial keywords first, then the subcategory pool (volume >= 70). */
export function productTags(product: Product, limit = 60): string[] {
  const pool = subcategoryTags(product.subCategorySlug, 200);
  const brandTokens = product.brand.toLowerCase().replace(/^the /, '').split(/\s+/).filter((t) => t.length > 2);
  const nameTokens = product.name.toLowerCase().split(/\s+/).filter((t) => t.length > 3);
  const brandMatched = pool.filter((k) => brandTokens.some((t) => k.includes(t)));
  const nameMatched = pool.filter((k) => nameTokens.some((t) => k.includes(t)) && !brandMatched.includes(k));
  const rest = pool.filter((k) => !brandMatched.includes(k) && !nameMatched.includes(k));
  return dedupe([
    product.primaryKeyword,
    `${product.name.toLowerCase()}`,
    `buy ${product.name.toLowerCase()} online`,
    ...brandMatched,
    ...nameMatched,
    ...product.secondaryKeywords,
    ...rest,
  ]).slice(0, limit);
}

export function siteTags(limit = 150): string[] {
  return dedupe(SITE_TAGS).slice(0, limit);
}

// ---------- JSON-LD builders ----------

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function webPageLd(opts: { type?: string; name: string; description: string; path: string; breadcrumb?: { name: string; path: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'WebPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: 'en-AU',
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: `${BASE_URL}/` },
    publisher: { '@type': 'Organization', name: SITE.name, url: `${BASE_URL}/` },
  };
}

export function itemListLd(name: string, products: Product[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: absoluteUrl(path),
    numberOfItems: products.length,
    itemListElement: products.slice(0, 50).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/shop/${p.category}/${p.slug}/`),
      name: p.name,
    })),
  };
}

export function productLd(product: Product) {
  const url = absoluteUrl(`/shop/${product.category}/${product.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    url,
    image: product.images.map((i) => (i.startsWith('http') ? i : absoluteUrl(i))),
    description: product.description,
    sku: product.sku,
    mpn: product.sku,
    category: product.subCategory,
    keywords: productTags(product, 40).join(', '),
    brand: { '@type': 'Brand', name: product.brand },
    countryOfOrigin: product.country,
    ...(product.abv ? { additionalProperty: [{ '@type': 'PropertyValue', name: 'Alcohol by volume', value: product.abv }, { '@type': 'PropertyValue', name: 'Bottle size', value: product.size }] } : {}),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: SITE.currency.code,
      price: product.price,
      priceValidUntil: '2027-06-30',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE.name, url: `${BASE_URL}/` },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: product.price >= SHOP_RULES.freeShippingThreshold ? 0 : SHOP_RULES.shippingFee, currency: SITE.currency.code },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
      },
    },
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** JSON.stringify that is safe to inline in a <script> (no premature </script> or U+2028). */
export function ld(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029');
}

export const SHOP_CONTACT = { email: CONTACT.email, phone: CONTACT.phone };
