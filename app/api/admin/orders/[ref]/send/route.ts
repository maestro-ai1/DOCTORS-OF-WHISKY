import { randomUUID } from 'node:crypto';
import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { SALES_EMAIL, sendMail } from '@/lib/mail/transport';
import { composeCustomerEmail } from '@/lib/orders/compose';
import { getOrder, rateLimit, updateOrder } from '@/lib/orders/store';
import { SEND_KINDS, type SendKind } from '@/lib/orders/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Staff sends one of three messages to the customer from sales@: payment details, payment received, or dispatched + tracking. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const limit = await rateLimit('admin-send', 120, 60 * 60);
  if (!limit.ok) return json({ error: 'Send limit reached. Please try again later.' }, 429);

  const { ref } = await params;
  const order = await getOrder(ref.toUpperCase());
  if (!order) return json({ error: 'Order not found.' }, 404);

  const body = (await req.json().catch(() => ({}))) as { kind?: string; paymentDetails?: unknown; tracking?: unknown; channel?: string };
  if (!body.kind || !SEND_KINDS.includes(body.kind as SendKind)) return json({ error: 'Unknown message type.' }, 422);
  const kind = body.kind as SendKind;

  const composed = composeCustomerEmail(order, kind, body);
  if (!composed.ok) return json({ error: composed.error }, 422);
  const { subject, html, text, nextStatus, summary } = composed.value;

  // Channel "whatsapp": staff open WhatsApp themselves; here we only record it and move the order along. No email is sent.
  const viaWhatsapp = body.channel === 'whatsapp';
  const result = viaWhatsapp ? { ok: true as const, dryRun: false, error: undefined } : await sendMail({ to: order.customer.email, subject, html, text, replyTo: SALES_EMAIL() });

  const updated = await updateOrder(order.ref, (o) => {
    o.replies.push({ id: randomUUID(), at: new Date().toISOString(), by: SALES_EMAIL(), kind, subject: viaWhatsapp ? `WhatsApp: ${subject}` : subject, message: summary, delivered: result.ok, error: result.ok ? undefined : result.error });
    // Only a delivered message changes the order: a failed send leaves it exactly as it was.
    if (result.ok) {
      o.status = nextStatus;
      if (kind === 'payment_details') o.paymentDetails = typeof body.paymentDetails === 'string' ? body.paymentDetails.replace(/\r\n/g, '\n').trim() : o.paymentDetails;
      if (kind === 'dispatched') o.trackingNumber = typeof body.tracking === 'string' ? body.tracking.replace(/\s+/g, ' ').trim() : o.trackingNumber;
    }
  });

  if (!result.ok) return json({ error: `The email could not be sent: ${result.error}`, order: updated }, 502);
  return json({ ok: true, dryRun: Boolean(result.dryRun), order: updated });
}
