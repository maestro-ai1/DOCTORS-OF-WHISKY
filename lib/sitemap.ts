import { PRODUCTS } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { BLOG_POSTS } from '@/lib/data/blog';
import { BASE_URL, CONTENT_UPDATED } from '@/lib/seo';

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
      return `<url><loc>${esc(BASE_URL + e.path)}</loc><lastmod>${e.lastmod || CONTENT_UPDATED}</lastmod>${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `<priority>${e.priority.toFixed(1)}</priority>` : ''}${imgs}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ''}>\n${items}\n</urlset>\n`;
}

export function sitemapIndex(children: { path: string; lastmod?: string }[]): string {
  const items = children.map((c) => `<sitemap><loc>${esc(BASE_URL + c.path)}</loc><lastmod>${c.lastmod || CONTENT_UPDATED}</lastmod></sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const xmlResponse = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });

export const pagesEntries = (): SitemapEntry[] => [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/shop/', changefreq: 'daily', priority: 0.9 },
  { path: '/blog/', changefreq: 'weekly', priority: 0.7 },
  { path: '/faq/', changefreq: 'weekly', priority: 0.8 },
  { path: '/about/', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact/', changefreq: 'monthly', priority: 0.6 },
  { path: '/shipping/', changefreq: 'monthly', priority: 0.5 },
  { path: '/refund-policy/', changefreq: 'monthly', priority: 0.4 },
  { path: '/terms/', changefreq: 'yearly', priority: 0.3 },
  { path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
];

export const collectionEntries = (): SitemapEntry[] => [
  ...MAIN_CATEGORIES.map((c) => ({ path: `/shop/${c.slug}/`, changefreq: 'weekly', priority: 0.85 })),
  ...SUBCATEGORIES.map((s) => ({ path: `/shop/${s.category}/collection/${s.slug}/`, changefreq: 'weekly', priority: 0.85 })),
];

export const productEntries = (): SitemapEntry[] =>
  PRODUCTS.map((p) => ({
    path: `/shop/${p.category}/${p.slug}/`,
    changefreq: 'weekly',
    priority: 0.8,
    images: p.images.slice(0, 3).map((i) => ({ url: i.startsWith('http') ? i : BASE_URL + i, title: p.name })),
  }));

export const blogEntries = (): SitemapEntry[] =>
  BLOG_POSTS.map((b) => ({ path: `/blog/${b.slug}/`, lastmod: /^\d{4}-\d{2}-\d{2}/.test(b.date) ? b.date.slice(0, 10) : CONTENT_UPDATED, changefreq: 'monthly', priority: 0.65 }));
