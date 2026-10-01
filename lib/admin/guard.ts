import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, adminConfigured, isSameOrigin, verifySessionToken } from '@/lib/admin/session';

const noStore = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };

export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { ...noStore, ...extra } });

/** Returns an error response when the request is not an authenticated, same-origin admin request; otherwise null. */
export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  if (!adminConfigured()) return json({ error: 'Admin portal is not configured.' }, 503);
  if (!(await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value))) return json({ error: 'Not signed in.' }, 401);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (!isSameOrigin(req)) return json({ error: 'Cross-origin request blocked.' }, 403);
    if (!(req.headers.get('content-type') || '').includes('application/json')) return json({ error: 'Expected JSON.' }, 415);
  }
  return null;
}

export const clientIp = (req: NextRequest): string =>
  (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
