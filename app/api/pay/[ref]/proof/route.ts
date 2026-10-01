import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { clientIp } from '@/lib/admin/guard';
import { paymentWhatsappText, proofReceivedEmail, whatsappLink } from '@/lib/mail/templates';
import { SALES_EMAIL, isMailConfigured, sendMail } from '@/lib/mail/transport';
import { verifyLinkToken } from '@/lib/orders/link-token';
import { getOrder, rateLimit, updateOrder } from '@/lib/orders/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Vercel serverless functions accept request bodies up to 4.5 MB, so stay safely under it. The page shrinks photos before uploading.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_BODY_BYTES = MAX_FILE_BYTES + 200 * 1024;
const headers = { 'Cache-Control': 'no-store' };
const fail = (status: number, error: string, extra: Record<string, unknown> = {}) => NextResponse.json({ success: false, error, ...extra }, { status, headers });

/** Identify the file from its first bytes: a renamed .exe or .html is rejected whatever the browser claims. */
function sniff(b: Buffer): { ext: string; type: string } | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' };
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: 'png', type: 'image/png' };
  if (b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP') return { ext: 'webp', type: 'image/webp' };
  if (b.subarray(0, 5).toString('latin1') === '%PDF-') return { ext: 'pdf', type: 'application/pdf' };
  if (b.subarray(4, 8).toString('latin1') === 'ftyp' && /^(heic|heix|hevc|heim|heis|mif1|msf1)/.test(b.subarray(8, 12).toString('latin1'))) return { ext: 'heic', type: 'image/heic' };
  return null;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref: rawRef } = await params;
  const ref = rawRef.toUpperCase();

  const declared = Number(req.headers.get('content-length') || 0);
  if (declared > MAX_BODY_BYTES) return fail(413, 'That file is too large. Please send a screenshot under 4 MB, or use WhatsApp.');
  if (!(req.headers.get('content-type') || '').includes('multipart/form-data')) return fail(415, 'Unsupported upload.');

  const ip = clientIp(req);
  const limitIp = await rateLimit(`proof-ip:${ip}`, Number(process.env.PROOF_RATE_LIMIT) || 8, 15 * 60);
  if (!limitIp.ok) return fail(429, 'Too many uploads. Please wait a few minutes or send your screenshot on WhatsApp.');

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, 'We could not read that upload. Please try again.');
  }

  // Same generic answer for a bad ref and a bad token, so nobody can probe which orders exist.
  const token = String(form.get('t') || '');
  if (!/^DOW-[A-Z0-9]{6}$/.test(ref) || !verifyLinkToken(ref, token)) return fail(403, 'This link is not valid. Please use the link from your payment email, or WhatsApp us.');

  const limitOrder = await rateLimit(`proof-order:${ref}`, 15, 60 * 60);
  if (!limitOrder.ok) return fail(429, 'This order has had too many uploads. Please WhatsApp us your screenshot.');

  const order = await getOrder(ref);
  if (!order || order.status === 'cancelled') return fail(404, 'We could not find that order. Please WhatsApp us.');

  const file = form.get('file');
  if (!(file instanceof File)) return fail(422, 'Please choose your payment screenshot first.');
  if (file.size > MAX_FILE_BYTES) return fail(413, 'That file is too large. Please send a screenshot under 4 MB, or use WhatsApp.');
  const bytes = Buffer.from(await file.arrayBuffer());
  const kind = sniff(bytes);
  if (!kind) return fail(422, 'Please upload a screenshot or photo (JPG, PNG, WebP, HEIC) or a PDF.');

  const note = String(form.get('note') || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  const fileName = `payment-${ref}.${kind.ext}`;
  const waFallback = whatsappLink(paymentWhatsappText(order));

  if (!isMailConfigured()) return fail(503, 'We cannot take uploads right now. Please send your screenshot on WhatsApp.', { whatsappUrl: waFallback });

  const mail = proofReceivedEmail(order, fileName, note || undefined);
  const result = await sendMail({
    to: SALES_EMAIL(),
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: order.customer.email,
    attachments: [{ filename: fileName, content: bytes, contentType: kind.type }],
  });

  await updateOrder(ref, (o) => {
    (o.proofs ||= []).push({ id: randomUUID(), at: new Date().toISOString(), fileName, contentType: kind.type, bytes: bytes.length, note: note || undefined, emailed: result.ok });
  }).catch(() => null);

  if (!result.ok) return fail(502, 'We could not send your screenshot just now. Please send it on WhatsApp so nothing is lost.', { whatsappUrl: waFallback });
  return NextResponse.json({ success: true, message: 'Thank you. We have received your payment screenshot and will confirm your order shortly.' }, { status: 200, headers });
}
