import { SITE } from '@/lib/config';

export const dynamic = 'force-static';

// IndexNow ownership file: the response body must equal the key (Bing / Yandex / Seznam / Naver).
export function GET() {
  return new Response(SITE.indexNowKey, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
