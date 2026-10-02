/** Small, dependency-free HTML -> Markdown converter used for `Accept: text/markdown` content negotiation (agent-readable pages). */

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '-', mdash: '-', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', hellip: '...' };
const decode = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

export function htmlToMarkdown(html: string, origin: string, url: string = origin): { title: string; description: string; markdown: string } {
  const title = decode(strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '')).trim();
  const description = decode((html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [])[1] || '').trim();
  let body = (html.match(/<main[\s\S]*?<\/main>/i) || html.match(/<body[\s\S]*?<\/body>/i) || [html])[0];
  body = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|noscript|template|iframe|form|button|select|textarea|input)[\s\S]*?<\/\1>/gi, '')
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_m, alt) => (alt ? ` ${alt} ` : ''))
    .replace(/<a\b[^>]*href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => {
      const t = decode(strip(text)).replace(/\s+/g, ' ').trim();
      if (!t) return '';
      const url = href.startsWith('http') ? href : href.startsWith('/') ? origin + href : href;
      return `[${t}](${url})`;
    })
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, n, t) => `\n\n${'#'.repeat(Number(n))} ${decode(strip(t)).replace(/\s+/g, ' ').trim()}\n\n`)
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<\/(p|div|section|article|ul|ol|table|tr|details|summary|figure|nav|header|footer|aside)>/gi, '\n')
    .replace(/<(br|hr)[^>]*>/gi, '\n')
    .replace(/<\/(td|th)>/gi, ' | ');
  let text = decode(strip(body))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  const markdown = `---\ntitle: ${title}\ndescription: ${description}\nsource: ${url}\n---\n\n${text}\n`;
  return { title, description, markdown };
}
