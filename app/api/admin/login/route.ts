import { NextRequest } from 'next/server';
import { clientIp, json } from '@/lib/admin/guard';
import { verifyPassword } from '@/lib/admin/password';
import { SESSION_COOKIE, adminConfigured, createSessionToken, isSameOrigin, sessionCookieOptions } from '@/lib/admin/session';
import { rateLimit } from '@/lib/orders/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  if (!adminConfigured()) return json({ error: 'Admin portal is not configured.' }, 503);
  if (!isSameOrigin(req)) return json({ error: 'Cross-origin request blocked.' }, 403);

  // Brute-force protection: 5 attempts per 15 minutes per IP
  const limit = await rateLimit(`admin-login:${clientIp(req)}`, 5, 15 * 60);
  if (!limit.ok) return json({ error: 'Too many attempts. Try again in a few minutes.' }, 429, { 'Retry-After': String(limit.retryAfter) });

  let password = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const ok = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
  if (!ok) {
    await sleep(500);
    return json({ error: 'Incorrect passkey.' }, 401);
  }

  const res = json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions());
  return res;
}
