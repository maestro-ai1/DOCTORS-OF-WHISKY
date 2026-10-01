import { sitemapIndex, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-static';

export function GET() {
  return xmlResponse(
    sitemapIndex([
      { path: '/sitemap-pages.xml' },
      { path: '/sitemap-collections.xml' },
      { path: '/sitemap-products.xml' },
      { path: '/sitemap-blog.xml' },
    ])
  );
}
