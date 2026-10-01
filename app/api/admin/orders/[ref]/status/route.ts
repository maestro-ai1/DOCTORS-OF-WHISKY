import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { setStatus } from '@/lib/orders/store';
import { ORDER_STATUSES, type OrderStatus } from '@/lib/orders/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const { ref } = await params;
  const body = (await req.json().catch(() => ({}))) as { status?: string };
  if (!body.status || !ORDER_STATUSES.includes(body.status as OrderStatus)) return json({ error: 'Invalid status.' }, 422);
  const order = await setStatus(ref.toUpperCase(), body.status as OrderStatus);
  return order ? json({ order }) : json({ error: 'Order not found.' }, 404);
}
