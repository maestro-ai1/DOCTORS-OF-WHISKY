// Signed admin session cookie. Uses only Web Crypto so it runs in both the Edge middleware and Node route handlers.
// The signing key is derived from ADMIN_SESSION_SECRET *and* ADMIN_PASSWORD_HASH, so changing the admin password invalidates every session.

export const SESSION_COOKIE = 'dow_admin';
export const SESSION_MAX_AGE_SEC = 8 * 60 * 60; // 8 hours

const enc = new TextEncoder();

const b64url = (buf: ArrayBuffer | Uint8Array): string => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromB64url = (s: string): Uint8Array<ArrayBuffer> => {
  const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET || '').length >= 32);
}

async function hmacKey(): Promise<CryptoKey> {
  const material = `${process.env.ADMIN_SESSION_SECRET}:${process.env.ADMIN_PASSWORD_HASH}`;
  return crypto.subtle.importKey('raw', enc.encode(material), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSessionToken(now = Date.now()): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ iat: now, exp: now + SESSION_MAX_AGE_SEC * 1000 })));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(), enc.encode(payload));
  return `${payload}.${b64url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null, now = Date.now()): Promise<boolean> {
  if (!token || !adminConfigured()) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(), fromB64url(sig), enc.encode(payload));
    if (!ok) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as { exp?: number };
    return typeof exp === 'number' && exp > now;
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAgeSec = SESSION_MAX_AGE_SEC) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: maxAgeSec,
  };
}

/** Mutating admin requests must come from our own origin (defence in depth on top of SameSite=Strict). */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === (req.headers.get('x-forwarded-host') || req.headers.get('host'));
  } catch {
    return false;
  }
}
