import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from 'node:crypto';

// Password hashing with scrypt (memory-hard). Stored format: scrypt$N$r$p$saltBase64$hashBase64
// Node runtime only (do not import from the Edge middleware).

const KEYLEN = 64;
const DEFAULTS = { N: 16384, r: 8, p: 1 };

const scrypt = (pw: string, salt: Buffer, keylen: number, opts: ScryptOptions): Promise<Buffer> =>
  new Promise((resolve, reject) => scryptCb(pw, salt, keylen, opts, (err, key) => (err ? reject(err) : resolve(key))));

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, KEYLEN, DEFAULTS);
  return `scrypt$${DEFAULTS.N}$${DEFAULTS.r}$${DEFAULTS.p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltB64, hashB64] = parts;
  try {
    const expected = Buffer.from(hashB64, 'base64');
    const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, { N: Number(n), r: Number(r), p: Number(p) });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
