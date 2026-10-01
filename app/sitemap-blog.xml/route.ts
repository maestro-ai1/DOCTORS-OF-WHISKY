import { blogEntries, urlset, xmlResponse } from '@/lib/sitemap';

export const dynamic = 'force-static';

export function GET() {
  return xmlResponse(urlset(blogEntries()));
}
