import { NextRequest } from 'next/server';
import { json } from '@/lib/admin/guard';
import { SESSION_COOKIE, isSameOrigin, sessionCookieOptions } from '@/lib/admin/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json({ error: 'Cross-origin request blocked.' }, 403);
  const res = json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions(0), maxAge: 0 });
  return res;
}
