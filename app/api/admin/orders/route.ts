import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { isPersistent, listOrders } from '@/lib/orders/store';
import { isMailConfigured } from '@/lib/mail/transport';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  try {
    const orders = await listOrders(200);
    return json({ orders, storage: isPersistent() ? 'persistent' : 'memory', mail: isMailConfigured() });
  } catch (err) {
    console.error('[admin] list failed:', err instanceof Error ? err.message : err);
    return json({ error: 'Could not load orders.' }, 500);
  }
}
