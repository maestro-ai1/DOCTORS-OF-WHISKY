import { NextRequest, NextResponse } from 'next/server';
import { clientIp } from '@/lib/admin/guard';
import { contactEmail } from '@/lib/mail/templates';
import { SALES_EMAIL, isMailConfigured, sendMail } from '@/lib/mail/transport';
import { rateLimit } from '@/lib/orders/store';
import { validateContact } from '@/lib/orders/validate';
import { CONTACT } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = { 'Cache-Control': 'no-store' };
const fail = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ success: false, error, ...extra }, { status, headers });

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') || '').includes('application/json')) return fail(415, 'Expected a JSON request.');
  const raw = await req.text();
  if (raw.length > 20_000) return fail(413, 'Request too large.');
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'Invalid request.');
  }

  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json({ success: true }, { status: 200, headers });

  const limit = await rateLimit(`contact:${clientIp(req)}`, Number(process.env.CONTACT_RATE_LIMIT) || 5, 15 * 60);
  if (!limit.ok) return fail(429, 'Too many messages. Please wait a few minutes or call us.');

  const contact = validateContact(body);
  if (!contact.value) return fail(422, 'Please check the highlighted details.', { fieldErrors: contact.errors });

  if (!isMailConfigured()) return fail(503, `We cannot take messages online right now. Please call or WhatsApp ${CONTACT.phone}.`);

  const m = contactEmail(contact.value);
  const res = await sendMail({ to: SALES_EMAIL(), subject: m.subject, html: m.html, text: m.text, replyTo: contact.value.email });
  if (!res.ok) return fail(502, `We could not send your message. Please call or WhatsApp ${CONTACT.phone}.`);
  return NextResponse.json({ success: true, message: 'Thank you. Your message has been sent and we will reply by email.' }, { status: 200, headers });
}
