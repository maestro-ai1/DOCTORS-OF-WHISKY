import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { getOrder } from '@/lib/orders/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const { ref } = await params;
  const order = await getOrder(ref.toUpperCase());
  return order ? json({ order }) : json({ error: 'Order not found.' }, 404);
}
