import { NextRequest, NextResponse } from 'next/server';
import { CONTACT } from '@/lib/config';
import { clientIp } from '@/lib/admin/guard';
import { customerConfirmationEmail, orderWhatsappText, salesNotificationEmail, whatsappLink } from '@/lib/mail/templates';
import { SALES_EMAIL, isMailConfigured, sendMail } from '@/lib/mail/transport';
import { priceOrder } from '@/lib/orders/pricing';
import { getOrder, isPersistent, newOrderRef, rateLimit, saveOrder } from '@/lib/orders/store';
import type { OrderRecord, PublicOrderSummary } from '@/lib/orders/types';
import { validateCustomer, validateItems } from '@/lib/orders/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = { 'Cache-Control': 'no-store' };
const fail = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ success: false, error, ...extra }, { status, headers });

const fallbackWhatsapp = () => whatsappLink('Hi Doctors of Whisky, I tried to place an order on your website but it did not go through. Can you help me complete it?');

export async function POST(req: NextRequest) {
  // 1. Basic request hygiene
  if (!(req.headers.get('content-type') || '').includes('application/json')) return fail(415, 'Expected a JSON request.');
  const raw = await req.text();
  if (raw.length > 60_000) return fail(413, 'Request too large.');
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'Invalid request.');
  }

  // 2. Bot trap: real customers never fill the hidden field. Pretend success so bots learn nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json({ success: true, orderRef: 'DOW-000000' }, { status: 200, headers });

  // 3. Rate limit per IP
  const limit = await rateLimit(`order:${clientIp(req)}`, Number(process.env.ORDER_RATE_LIMIT) || 6, 15 * 60);
  if (!limit.ok) return fail(429, 'Too many order attempts. Please wait a few minutes or order on WhatsApp.', { whatsappUrl: fallbackWhatsapp() });

  // 4. Validate everything on the server; never trust client prices, totals or references
  const customer = validateCustomer(body.customer);
  if (!customer.value) return fail(422, 'Please check the highlighted details.', { fieldErrors: customer.errors });
  const items = validateItems(body.items);
  if (!items.value) return fail(422, items.error || 'Invalid cart.');
  const priced = priceOrder(items.value, body.paymentMethodId);
  if (!priced.lines || !priced.totals || !priced.paymentMethod) return fail(422, priced.error || 'Could not price your order.');

  // 5. Refuse the order if we could neither record it nor tell the shop about it
  if (!isMailConfigured() && !isPersistent()) {
    console.error('[order] rejected: neither email nor storage is configured');
    return fail(503, 'Online ordering is temporarily unavailable. Please order on WhatsApp and we will look after you.', { whatsappUrl: fallbackWhatsapp() });
  }

  // 6. Build the record on the server
  let ref = newOrderRef();
  if (isPersistent()) {
    try {
      for (let i = 0; i < 4 && (await getOrder(ref)); i++) ref = newOrderRef();
    } catch {
      /* collision check is best effort; the reference space is ~1 billion */
    }
  }
  const order: OrderRecord = {
    ref,
    createdAt: new Date().toISOString(),
    status: 'new',
    customer: {
      fullName: customer.value.fullName,
      email: customer.value.email,
      phone: customer.value.phone,
      address: customer.value.address,
      city: customer.value.city,
      state: customer.value.state,
      postcode: customer.value.postcode,
      notes: customer.value.notes || undefined,
    },
    lines: priced.lines,
    totals: priced.totals,
    paymentMethod: priced.paymentMethod.id,
    paymentMethodName: priced.paymentMethod.name,
    emails: { sales: 'skipped', customer: 'skipped' },
    replies: [],
  };

  // 7. Persist first, so a mail outage can never lose an order
  let stored = false;
  try {
    await saveOrder(order);
    stored = true;
  } catch (err) {
    console.error('[order] storage failed:', err instanceof Error ? err.message : err);
  }

  // 8. Email the shop and the customer in parallel
  const [salesRes, customerRes] = await Promise.all([
    (async () => {
      const m = salesNotificationEmail(order);
      return sendMail({ to: SALES_EMAIL(), subject: m.subject, html: m.html, text: m.text, replyTo: order.customer.email });
    })(),
    (async () => {
      const m = customerConfirmationEmail(order);
      return sendMail({ to: order.customer.email, subject: m.subject, html: m.html, text: m.text, replyTo: SALES_EMAIL() });
    })(),
  ]);
  order.emails = { sales: salesRes.ok ? 'sent' : 'failed', customer: customerRes.ok ? 'sent' : 'failed' };
  if (stored) {
    try {
      await saveOrder(order);
    } catch {
      /* status flags are informational */
    }
  }

  // 9. The order counts as received only if the shop can see it
  if (!stored && !salesRes.ok) {
    console.error('[order] LOST: not stored and sales email failed', ref);
    return fail(503, 'We could not record your order just now. Please order on WhatsApp so nothing is lost.', { whatsappUrl: fallbackWhatsapp() });
  }

  const summary: PublicOrderSummary = {
    ref: order.ref,
    createdAt: order.createdAt,
    lines: order.lines,
    totals: order.totals,
    paymentMethod: order.paymentMethod,
    paymentMethodName: order.paymentMethodName,
  };
  return NextResponse.json(
    {
      success: true,
      orderRef: order.ref,
      order: summary,
      confirmationEmail: customerRes.ok ? 'sent' : 'failed',
      whatsappUrl: whatsappLink(orderWhatsappText(order)),
      contact: { phone: CONTACT.phone, email: CONTACT.email },
    },
    { status: 200, headers },
  );
}
