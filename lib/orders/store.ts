import { randomBytes } from 'node:crypto';
import type { OrderRecord, OrderReply, OrderStatus } from '@/lib/orders/types';

// Persistence: Upstash Redis / Vercel KV over its REST API (no SDK). Falls back to process memory for local development only,
// which does NOT survive serverless cold starts or share between instances; isPersistent() tells callers which one is active.

const REST_URL = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
const REST_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';

export const isPersistent = () => Boolean(REST_URL() && REST_TOKEN());

type Mem = { orders: Map<string, OrderRecord>; counters: Map<string, { n: number; exp: number }> };
const mem = (): Mem => {
  const g = globalThis as unknown as { __dowMem?: Mem };
  return (g.__dowMem ||= { orders: new Map(), counters: new Map() });
};

async function redis<T = unknown>(command: (string | number)[]): Promise<T> {
  const res = await fetch(REST_URL(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  const json = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || json.error) throw new Error(`Redis error: ${json.error || res.status}`);
  return json.result as T;
}

const key = (ref: string) => `dow:order:${ref}`;
const INDEX = 'dow:orders';

/** Unguessable, human-friendly reference, for example DOW-7K3QX9. Generated on the server only. */
export function newOrderRef(): string {
  const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // no 0/O/1/I/L
  const bytes = randomBytes(6);
  let out = '';
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `DOW-${out}`;
}

export async function saveOrder(order: OrderRecord): Promise<void> {
  if (isPersistent()) {
    await redis(['SET', key(order.ref), JSON.stringify(order)]);
    await redis(['ZADD', INDEX, Date.parse(order.createdAt), order.ref]);
  } else {
    mem().orders.set(order.ref, order);
  }
}

export async function getOrder(ref: string): Promise<OrderRecord | null> {
  if (!/^DOW-[A-Z0-9]{6}$/.test(ref)) return null;
  if (isPersistent()) {
    const raw = await redis<string | null>(['GET', key(ref)]);
    return raw ? (JSON.parse(raw) as OrderRecord) : null;
  }
  return mem().orders.get(ref) || null;
}

export async function listOrders(limit = 100): Promise<OrderRecord[]> {
  if (isPersistent()) {
    const refs = await redis<string[]>(['ZREVRANGE', INDEX, 0, limit - 1]);
    if (!refs.length) return [];
    const raws = await redis<(string | null)[]>(['MGET', ...refs.map(key)]);
    return raws.filter((r): r is string => !!r).map((r) => JSON.parse(r) as OrderRecord);
  }
  return [...mem().orders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function updateOrder(ref: string, mutate: (o: OrderRecord) => void): Promise<OrderRecord | null> {
  const order = await getOrder(ref);
  if (!order) return null;
  mutate(order);
  await saveOrder(order);
  return order;
}

export const setStatus = (ref: string, status: OrderStatus) => updateOrder(ref, (o) => void (o.status = status));
export const addReply = (ref: string, reply: OrderReply) => updateOrder(ref, (o) => void o.replies.push(reply));

/** Fixed-window rate limiter. Uses Redis when configured so it holds across serverless instances. */
export async function rateLimit(id: string, limit: number, windowSec: number): Promise<{ ok: boolean; retryAfter: number }> {
  try {
    if (isPersistent()) {
      const k = `dow:rl:${id}`;
      const n = await redis<number>(['INCR', k]);
      if (n === 1) await redis(['EXPIRE', k, windowSec]);
      return n > limit ? { ok: false, retryAfter: windowSec } : { ok: true, retryAfter: 0 };
    }
  } catch {
    /* fall through to the in-memory limiter rather than failing open silently */
  }
  const now = Date.now();
  const m = mem().counters;
  const cur = m.get(id);
  if (!cur || cur.exp < now) {
    m.set(id, { n: 1, exp: now + windowSec * 1000 });
    return { ok: true, retryAfter: 0 };
  }
  cur.n++;
  return cur.n > limit ? { ok: false, retryAfter: Math.ceil((cur.exp - now) / 1000) } : { ok: true, retryAfter: 0 };
}
