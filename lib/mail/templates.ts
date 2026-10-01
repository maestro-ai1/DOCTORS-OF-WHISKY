import { CONTACT, SITE } from '@/lib/config';
import type { OrderRecord } from '@/lib/orders/types';

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD`;
export const siteOrigin = () => process.env.APP_URL?.replace(/\/$/, '') || `https://${SITE.domain}`;

export function whatsappLink(text: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Sent from the order confirmation page. */
export function orderWhatsappText(order: Pick<OrderRecord, 'ref' | 'lines' | 'totals' | 'paymentMethodName'>): string {
  const lines = order.lines.map((l) => `- ${l.quantity} x ${l.name}`).join('\n');
  return `Hi Doctors of Whisky, I have placed order ${order.ref}.\n${lines}\nTotal: ${aud(order.totals.total)} (${order.paymentMethodName}).\nPlease send me the payment details.`;
}

/** Sent from the "WhatsApp" button in the payment email and on the payment page. */
export function paymentWhatsappText(order: Pick<OrderRecord, 'ref' | 'totals'>): string {
  return `Hi Doctors of Whisky, I have paid order ${order.ref} (${aud(order.totals.total)}). Here is my payment screenshot.`;
}

/** The customer terms, in one short line. Used by the payment email and the payment page so they always match. */
export const TERMS_LINE = 'Your order is confirmed once payment is received. A tracking number will be provided. Refund or re-ship within 7 days.';

const firstName = (o: OrderRecord) => o.customer.fullName.split(' ')[0];

const button = (href: string, label: string, bg: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;padding:13px 18px;border-radius:10px;font-weight:bold;font-size:15px;margin:0 6px 8px 0">${esc(label)}</a>`;

const shell = (title: string, body: string) => `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5f1ea;font-family:Arial,Helvetica,sans-serif;color:#1c1917">
<div style="max-width:520px;margin:0 auto;padding:12px">
<div style="background:#111;color:#d4af37;padding:12px 18px;border-radius:12px 12px 0 0;font:bold 17px Georgia,serif">${esc(SITE.name)}</div>
<div style="background:#fff;padding:18px;border-radius:0 0 12px 12px;border:1px solid #e7e0d4">
<h1 style="font:bold 18px Georgia,serif;margin:0 0 12px">${esc(title)}</h1>${body}
<p style="font-size:11px;color:#78716c;margin:18px 0 0;border-top:1px solid #eee7da;padding-top:10px;line-height:1.5">${esc(SITE.name)} · ${esc(CONTACT.email)} · ${esc(CONTACT.phone)}<br>Licence ${esc(CONTACT.liquorLicence)} · ABN ${esc(CONTACT.abn)} · 18+ only, photo ID on delivery</p>
</div></div></body></html>`;

const itemsHtml = (o: OrderRecord) =>
  `<p style="font-size:14px;line-height:1.55;margin:0 0 10px">${o.lines.map((l) => `${l.quantity} &times; ${esc(l.name)}`).join('<br>')}<br><strong>Total ${esc(aud(o.totals.total))}</strong>${o.totals.cryptoDiscount ? ' (crypto discount applied)' : ''}</p>`;

const itemsText = (o: OrderRecord) => `${o.lines.map((l) => `${l.quantity} x ${l.name}`).join('\n')}\nTotal ${aud(o.totals.total)}`;

// ---------------------------------------------------------------------------------------------------------------------------
// 1. Sent to the customer when they order: confirmation, awaiting payment (no payment details yet)
// ---------------------------------------------------------------------------------------------------------------------------
export function customerOrderEmail(o: OrderRecord) {
  const subject = `Order ${o.ref} confirmed: awaiting payment`;
  const html = shell(
    'Order confirmed: awaiting payment',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px">Hi ${esc(firstName(o))}, we have received your order <strong>${esc(o.ref)}</strong>.</p>
${itemsHtml(o)}
<p style="font-size:14px;line-height:1.6;margin:0">Payment: ${esc(o.paymentMethodName)}. We will email your payment details shortly.</p>`,
  );
  const text = `Order ${o.ref} confirmed: awaiting payment\n\nHi ${firstName(o)}, we have received your order ${o.ref}.\n\n${itemsText(o)}\n\nPayment: ${o.paymentMethodName}. We will email your payment details shortly.\n\n${CONTACT.email} · ${CONTACT.phone}`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 2. Plain-text message staff can send over WhatsApp
// ---------------------------------------------------------------------------------------------------------------------------
export function paymentWhatsappMessage(o: OrderRecord, details: string, payUrl: string | null): string {
  return [
    `Hi ${firstName(o)}, order ${o.ref}: ${aud(o.totals.total)}`,
    `${o.paymentMethodName}`,
    details,
    '',
    `Please pay within minutes and use ${o.ref} as the payment reference.`,
    `Then send your screenshot here${payUrl ? ` or upload it: ${payUrl}` : ''}`,
  ].join('\n');
}

// ---------------------------------------------------------------------------------------------------------------------------
// 3. Sent by staff: payment details, short and clear
// ---------------------------------------------------------------------------------------------------------------------------
export function paymentDetailsEmail(o: OrderRecord, details: string, payUrl: string | null) {
  const subject = `Payment details for order ${o.ref}: ${aud(o.totals.total)}`;
  const wa = whatsappLink(paymentWhatsappText(o));
  const html = shell(
    'Payment details',
    `<div style="background:#111;color:#fff;border-radius:10px;padding:12px 14px;margin:0 0 10px">
<div style="font-size:12px;color:#a8a29e">Amount to pay</div><div style="font:bold 24px Georgia,serif;color:#d4af37">${esc(aud(o.totals.total))}</div>
<div style="font-size:13px;margin-top:4px">Reference <strong style="font-family:Consolas,monospace;font-size:15px">${esc(o.ref)}</strong></div></div>
<div style="background:#fbf6e9;border:1px solid #ecdca8;border-radius:10px;padding:11px 14px;margin:0 0 12px;font-size:14px;line-height:1.55">
<strong>${esc(o.paymentMethodName)}</strong><br><span style="font-family:Consolas,monospace;word-break:break-all">${esc(details).replace(/\n/g, '<br>')}</span></div>
<p style="font-size:14px;line-height:1.5;margin:0 0 12px">Please pay within minutes and use <strong>${esc(o.ref)}</strong> as the payment reference. Then send us your payment screenshot:</p>
<p style="margin:0 0 6px">${payUrl ? button(payUrl, 'Upload screenshot', '#0b84c6') : ''}${button(wa, 'WhatsApp', '#16a34a')}</p>
<p style="font-size:12px;color:#57534e;line-height:1.5;margin:0">Or email it to <a href="mailto:${esc(CONTACT.email)}" style="color:#1d4ed8">${esc(CONTACT.email)}</a>. ${esc(TERMS_LINE)}</p>`,
  );
  const text = `PAYMENT DETAILS: order ${o.ref}\n\nAMOUNT: ${aud(o.totals.total)}\nREFERENCE: ${o.ref}\n\n${o.paymentMethodName}\n${details}\n\nPlease pay within minutes and use ${o.ref} as the payment reference. Then send us your payment screenshot:\n${payUrl ? `Upload: ${payUrl}\n` : ''}WhatsApp: ${wa}\nEmail: ${CONTACT.email}\n\n${TERMS_LINE}`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 4. Payment received
// ---------------------------------------------------------------------------------------------------------------------------
export function paymentReceivedEmail(o: OrderRecord) {
  const subject = `Payment received: order ${o.ref} confirmed`;
  const html = shell(
    'Payment received',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px">Thank you, ${esc(firstName(o))}. We have received <strong>${esc(aud(o.totals.total))}</strong> and order <strong>${esc(o.ref)}</strong> is confirmed.</p>
<p style="font-size:14px;line-height:1.6;margin:0">We are preparing it for dispatch. A tracking number will be provided. Refund or re-ship within 7 days.</p>`,
  );
  const text = `Payment received: order ${o.ref} confirmed\n\nThank you, ${firstName(o)}. We have received ${aud(o.totals.total)} and order ${o.ref} is confirmed.\nWe are preparing it for dispatch. A tracking number will be provided. Refund or re-ship within 7 days.`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 5. Dispatched, with tracking number
// ---------------------------------------------------------------------------------------------------------------------------
export function dispatchedEmail(o: OrderRecord, tracking: string) {
  const subject = `Your order ${o.ref} has been dispatched`;
  const html = shell(
    'Your order is on its way',
    `<div style="background:#111;color:#fff;border-radius:10px;padding:12px 14px;margin:0 0 10px"><div style="font-size:12px;color:#a8a29e">Tracking number</div><div style="font:bold 19px Consolas,monospace;color:#d4af37;word-break:break-all">${esc(tracking)}</div></div>
<p style="font-size:14px;line-height:1.6;margin:0">Order ${esc(o.ref)} is with the courier. A signature and photo ID (18+) are required on delivery.</p>`,
  );
  const text = `Your order ${o.ref} has been dispatched\n\nTracking number: ${tracking}\n\nA signature and photo ID (18+) are required on delivery.`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// Shop notifications
// ---------------------------------------------------------------------------------------------------------------------------
export function salesNotificationEmail(o: OrderRecord) {
  const subject = `New order ${o.ref}: ${aud(o.totals.total)}: ${o.customer.fullName}`;
  const admin = `${siteOrigin()}/admin/`;
  const html = shell(
    `New order ${o.ref}`,
    `${itemsHtml(o)}
<p style="font-size:14px;line-height:1.6;margin:0 0 10px"><strong>${esc(o.customer.fullName)}</strong> · ${esc(o.paymentMethodName)}<br><a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a> · ${esc(o.customer.phone)}<br>${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}${o.customer.notes ? `<br><em>${esc(o.customer.notes)}</em>` : ''}</p>
<p style="margin:0">${button(admin, 'Send payment details', '#111111')}</p>`,
  );
  const text = `NEW ORDER ${o.ref}\n${itemsText(o)}\n\n${o.customer.fullName} · ${o.paymentMethodName}\n${o.customer.email} · ${o.customer.phone}\n${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}${o.customer.notes ? `\nNotes: ${o.customer.notes}` : ''}\n\nSend payment details: ${admin}`;
  return { subject, html, text };
}

export function proofReceivedEmail(o: OrderRecord, fileName: string, note?: string) {
  const subject = `Payment screenshot: ${o.ref}: ${aud(o.totals.total)}: ${o.customer.fullName}`;
  const admin = `${siteOrigin()}/admin/`;
  const html = shell(
    'Payment screenshot received',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px"><strong>${esc(o.customer.fullName)}</strong> sent a screenshot for order <strong>${esc(o.ref)}</strong> (${esc(aud(o.totals.total))}). It is attached: <em>${esc(fileName)}</em>.</p>
${note ? `<p style="font-size:14px;background:#f7f4ee;border-radius:8px;padding:9px 12px;margin:0 0 10px">${esc(note)}</p>` : ''}
<p style="margin:0">${button(admin, 'Open admin', '#111111')}</p>`,
  );
  const text = `PAYMENT SCREENSHOT: ${o.ref}\n${o.customer.fullName} sent a screenshot (${aud(o.totals.total)}). Attached: ${fileName}${note ? `\nNote: ${note}` : ''}\n\nAdmin: ${admin}`;
  return { subject, html, text };
}

export function contactEmail(c: { name: string; email: string; phone?: string; subject: string; message: string }) {
  const subject = `Website enquiry: ${c.subject}`;
  const html = shell(
    'New website enquiry',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px"><strong>${esc(c.name)}</strong> &lt;<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>&gt;${c.phone ? `<br>${esc(c.phone)}` : ''}</p><p style="font-size:14px;line-height:1.7;margin:0">${esc(c.message).replace(/\n/g, '<br>')}</p>`,
  );
  const text = `From: ${c.name} <${c.email}>${c.phone ? `\nPhone: ${c.phone}` : ''}\nSubject: ${c.subject}\n\n${c.message}`;
  return { subject, html, text };
}
