import { createHmac, timingSafeEqual } from 'node:crypto';

// Customer payment page links look like /pay/DOW-XXXXXX/?t=<token>. The token is an HMAC of the order reference, so only people who
// received the email (or WhatsApp message) can open the page or upload a screenshot. Node runtime only.

const secret = (): string | null => {
  const s = process.env.ORDER_LINK_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  return process.env.NODE_ENV === 'production' ? null : 'dev-only-order-link-secret-not-for-production-use';
};

export function linkTokenFor(ref: string): string | null {
  const key = secret();
  if (!key) return null;
  return createHmac('sha256', key).update(`pay:${ref}`).digest('base64url').slice(0, 32);
}

export function verifyLinkToken(ref: string, token: string | null | undefined): boolean {
  const expected = linkTokenFor(ref);
  if (!expected || !token || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function payPageUrl(ref: string, origin: string): string | null {
  const t = linkTokenFor(ref);
  return t ? `${origin.replace(/\/$/, '')}/pay/${ref}/?t=${t}` : null;
}
