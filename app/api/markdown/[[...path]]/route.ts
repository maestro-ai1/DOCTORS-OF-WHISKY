import { SITE } from '@/lib/config';
import { NextRequest } from 'next/server';
import { htmlToMarkdown } from '@/lib/html-to-markdown';

export const dynamic = 'force-dynamic';

/**
 * Markdown content negotiation. next.config.ts rewrites any page request that sends `Accept: text/markdown` here;
 * the page's normal HTML is fetched and returned as Markdown, so AI agents get clean text with every link and heading.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const pathname = '/' + path.join('/') + (path.length ? '/' : '');
  const origin = new URL(req.url).origin;
  const res = await fetch(origin + pathname, { headers: { accept: 'text/html', 'user-agent': 'dow-markdown-negotiation' }, cache: 'no-store' });
  if (!res.ok) return new Response(`# Not found\n\nNo page at ${pathname}\n`, { status: res.status, headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } });
  const html = await res.text();
  const site = `https://${SITE.domain}`;
  const { markdown } = htmlToMarkdown(html.split(origin).join(site), site, site + pathname);
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      Vary: 'Accept',
      'X-Markdown-Tokens': String(Math.ceil(markdown.length / 4)),
      Link: `<${`https://${SITE.domain}` + pathname}>; rel="canonical"`,
    },
  });
}
