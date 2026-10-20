import { PRODUCTS } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { BLOG_POSTS } from '@/lib/data/blog';
import { BASE_URL, CONTENT_UPDATED } from '@/lib/seo';
import { SHOP_PAGE_COUNT, SHOP_PAGE_SIZE } from '@/lib/shop-pages';

/** Pages whose keyword mapping, copy or menu changed on this date (products keep CONTENT_UPDATED: their data did not change). */
const SITE_UPDATED = '2026-10-11';
/** Blog posts whose primary keyword and H1 were re-targeted on SITE_UPDATED. */
const BLOG_RETARGETED = new Set(['guide-to-australian-craft-cider', 'best-mixers-for-home-bar', 'how-to-choose-red-wine', 'white-wine-styles-explained', 'tequila-aging-guide-blanco-reposado-anejo', 'don-julio-vs-patron-tequila-compared', 'why-japanese-whisky-became-a-global-obsession', 'grey-goose-vs-belvedere-vodka-compared', 'cabernet-sauvignon-merlot-grenache-red-wine-grapes']);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  images?: { url: string; title?: string }[];
}

export function urlset(entries: SitemapEntry[]): string {
  const hasImages = entries.some((e) => e.images?.length);
  const items = entries
    .map((e) => {
      const imgs = (e.images || [])
        .map((i) => `<image:image><image:loc>${esc(i.url)}</image:loc>${i.title ? `<image:title>${esc(i.title)}</image:title>` : ''}</image:image>`)
        .join('');
      const loc = esc(BASE_URL + e.path);
      // hreflang alternates mirror the <link rel="alternate"> tags in each page's head (en-AU + x-default).
      const alt = `<xhtml:link rel="alternate" hreflang="en-AU" href="${loc}"/><xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`;
      return `<url><loc>${loc}</loc><lastmod>${e.lastmod || CONTENT_UPDATED}</lastmod>${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `<priority>${e.priority.toFixed(1)}</priority>` : ''}${alt}${imgs}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"${hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ''}>\n${items}\n</urlset>\n`;
}

export function sitemapIndex(children: { path: string; lastmod?: string }[]): string {
  const items = children.map((c) => `<sitemap><loc>${esc(BASE_URL + c.path)}</loc><lastmod>${c.lastmod || CONTENT_UPDATED}</lastmod></sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const xmlResponse = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });

export const pagesEntries = (): SitemapEntry[] => [
  { path: '/', changefreq: 'daily', priority: 1.0, lastmod: SITE_UPDATED },
  { path: '/shop/', changefreq: 'daily', priority: 0.9, lastmod: SITE_UPDATED },
  { path: '/gifts/whisky/', changefreq: 'weekly', priority: 0.8, lastmod: SITE_UPDATED },
  { path: '/gifts/gin/', changefreq: 'weekly', priority: 0.8, lastmod: SITE_UPDATED },
  { path: '/collections/tequila/', changefreq: 'weekly', priority: 0.85, lastmod: SITE_UPDATED },
  { path: '/collections/smirnoff/', changefreq: 'weekly', priority: 0.8, lastmod: SITE_UPDATED },
  { path: '/collections/absolut/', changefreq: 'weekly', priority: 0.8, lastmod: SITE_UPDATED },
  { path: '/blog/', changefreq: 'weekly', priority: 0.7 },
  { path: '/faq/', changefreq: 'weekly', priority: 0.8 },
  { path: '/about/', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact/', changefreq: 'monthly', priority: 0.6 },
  { path: '/shipping/', changefreq: 'monthly', priority: 0.5 },
  { path: '/refund-policy/', changefreq: 'monthly', priority: 0.4 },
  { path: '/terms/', changefreq: 'yearly', priority: 0.3 },
  { path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
  // numbered shop and blog index pages
  ...Array.from({ length: SHOP_PAGE_COUNT - 1 }, (_, i) => ({ path: `/shop/page/${i + 2}/`, changefreq: 'daily', priority: 0.6 })),
  ...pageNumbers(BLOG_POSTS.length - 1, 9).map((n) => ({ path: `/blog/page/${n}/`, changefreq: 'weekly', priority: 0.5 })),
];

/** Numbered pages 2, 3, ... of a list of `total` items shown `size` per page. */
function pageNumbers(total: number, size: number) {
  return Array.from({ length: Math.max(0, Math.ceil(total / size) - 1) }, (_, i) => i + 2);
}

/** Small sitemap of the money pages, so Google sees what to crawl first. */
export const priorityEntries = (): SitemapEntry[] =>
  [
    '/', '/shop/', '/shop/whisky/', '/shop/spirit/', '/shop/beer-premix-wine/',
    '/shop/beer-premix-wine/collection/champagne/', '/shop/beer-premix-wine/collection/sparkling/', '/shop/beer-premix-wine/collection/prosecco/',
    '/shop/beer-premix-wine/collection/lager/', '/shop/beer-premix-wine/collection/imported-beer/',
    '/shop/whisky/collection/scotch-whisky/', '/shop/whisky/collection/japanese-whisky/', '/shop/whisky/collection/bourbon/',
    '/gifts/whisky/', '/gifts/gin/', '/collections/tequila/', '/collections/smirnoff/', '/collections/absolut/', '/faq/',
  ].map((path) => ({ path, changefreq: 'daily', priority: 1.0, lastmod: SITE_UPDATED }));

export const collectionEntries = (): SitemapEntry[] => [
  ...MAIN_CATEGORIES.map((c) => ({ path: `/shop/${c.slug}/`, changefreq: 'weekly', priority: 0.85, lastmod: SITE_UPDATED })),
  ...SUBCATEGORIES.map((s) => ({ path: `/shop/${s.category}/collection/${s.slug}/`, changefreq: 'weekly', priority: 0.85, lastmod: SITE_UPDATED })),
  // pages 2+ of the larger collections
  ...SUBCATEGORIES.flatMap((s) =>
    pageNumbers(PRODUCTS.filter((p) => p.subCategorySlug === s.slug).length, SHOP_PAGE_SIZE).map((n) => ({ path: `/shop/${s.category}/collection/${s.slug}/page/${n}/`, changefreq: 'weekly', priority: 0.5 })),
  ),
];

export const productEntries = (): SitemapEntry[] =>
  PRODUCTS.map((p) => ({
    path: `/shop/${p.category}/${p.slug}/`,
    changefreq: 'weekly',
    priority: 0.8,
    images: p.images.filter((i) => !i.endsWith('.svg')).slice(0, 3).map((i) => ({ url: i.startsWith('http') ? i : BASE_URL + i, title: p.name })),
  }));

export const blogEntries = (): SitemapEntry[] =>
  BLOG_POSTS.map((b) => ({
    path: `/blog/${b.slug}/`,
    lastmod: BLOG_RETARGETED.has(b.slug) ? SITE_UPDATED : /^\d{4}-\d{2}-\d{2}/.test(b.date) ? b.date.slice(0, 10) : CONTENT_UPDATED,
    changefreq: 'monthly',
    priority: 0.65,
  }));
