import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { composeCustomerEmail } from '@/lib/orders/compose';
import { getOrder, rateLimit } from '@/lib/orders/store';
import { SEND_KINDS, type SendKind } from '@/lib/orders/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Returns the exact email the customer would receive, without sending anything. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const limit = await rateLimit('admin-preview', 600, 60 * 60);
  if (!limit.ok) return json({ error: 'Too many previews. Try again shortly.' }, 429);

  const { ref } = await params;
  const order = await getOrder(ref.toUpperCase());
  if (!order) return json({ error: 'Order not found.' }, 404);

  const body = (await req.json().catch(() => ({}))) as { kind?: string; paymentDetails?: unknown; tracking?: unknown };
  if (!body.kind || !SEND_KINDS.includes(body.kind as SendKind)) return json({ error: 'Unknown message type.' }, 422);

  const composed = composeCustomerEmail(order, body.kind as SendKind, body);
  // An incomplete form is not an error while typing: show the problem next to an empty preview.
  if (!composed.ok) return json({ ok: false, problem: composed.error });
  const digits = order.customer.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${digits}?text=${encodeURIComponent(composed.value.whatsappText)}`;
  return json({ ok: true, subject: composed.value.subject, html: composed.value.html, to: order.customer.email, whatsappText: composed.value.whatsappText, whatsappUrl });
}
