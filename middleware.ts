import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin/session';

// Keeps the staff portal out of search results and rejects unauthenticated admin API calls before they reach a route handler.
// (Each admin route also re-checks the session itself.)
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    if (!(await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value))) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = { matcher: ['/admin/:path*', '/admin', '/api/admin/:path*'] };
