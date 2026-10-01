import { randomUUID } from 'node:crypto';
import { NextRequest } from 'next/server';
import { json, requireAdmin } from '@/lib/admin/guard';
import { adminReplyEmail } from '@/lib/mail/templates';
import { SALES_EMAIL, sendMail } from '@/lib/mail/transport';
import { addReply, getOrder, rateLimit } from '@/lib/orders/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\r\n]/;

/** Staff reply: sent to the customer from the authenticated Zoho account (sales@doctorsofwhisky.com.au) and recorded on the order. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const limit = await rateLimit('admin-reply', 60, 60 * 60);
  if (!limit.ok) return json({ error: 'Reply limit reached. Please try again later.' }, 429);

  const { ref } = await params;
  const order = await getOrder(ref.toUpperCase());
  if (!order) return json({ error: 'Order not found.' }, 404);

  const body = (await req.json().catch(() => ({}))) as { subject?: unknown; message?: unknown };
  const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 150) : '';
  const message = typeof body.message === 'string' ? body.message.replace(/\r\n/g, '\n').trim() : '';
  if (NO_CONTROL.test(subject)) return json({ error: 'The subject contains invalid characters.' }, 422);
  if (message.length < 2) return json({ error: 'Please write a message.' }, 422);
  if (message.length > 5000) return json({ error: 'Message is too long (5,000 characters maximum).' }, 422);

  const mail = adminReplyEmail(order, subject, message);
  const result = await sendMail({ to: order.customer.email, subject: mail.subject, html: mail.html, text: mail.text, replyTo: SALES_EMAIL() });

  const updated = await addReply(order.ref, {
    id: randomUUID(),
    at: new Date().toISOString(),
    by: SALES_EMAIL(),
    subject: mail.subject,
    message,
    delivered: result.ok,
    error: result.ok ? undefined : result.error,
  });
  if (!result.ok) return json({ error: `The reply could not be sent: ${result.error}`, order: updated }, 502);
  return json({ ok: true, dryRun: Boolean(result.dryRun), order: updated });
}
