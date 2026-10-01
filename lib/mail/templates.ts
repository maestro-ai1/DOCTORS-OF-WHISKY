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

/** Sent from the "Confirm via WhatsApp" button in the payment email and on the payment page. */
export function paymentWhatsappText(order: Pick<OrderRecord, 'ref' | 'totals'>): string {
  return `Hi Doctors of Whisky, I have paid order ${order.ref} (${aud(order.totals.total)}). Here is my payment screenshot.`;
}

const button = (href: string, label: string, bg: string, fg = '#ffffff') =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${fg};text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:bold;font-size:15px;margin:4px 6px 4px 0">${esc(label)}</a>`;

const shell = (title: string, body: string) => `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5f1ea;font-family:Arial,Helvetica,sans-serif;color:#1c1917">
<div style="max-width:560px;margin:0 auto;padding:14px">
<div style="background:#111;color:#d4af37;padding:14px 20px;border-radius:12px 12px 0 0"><div style="font:bold 18px Georgia,serif">${esc(SITE.name)}</div></div>
<div style="background:#fff;padding:20px;border-radius:0 0 12px 12px;border:1px solid #e7e0d4">
<h1 style="font:bold 19px Georgia,serif;margin:0 0 14px">${esc(title)}</h1>${body}
<p style="font-size:12px;color:#78716c;margin:22px 0 0;border-top:1px solid #e7e0d4;padding-top:12px">${esc(SITE.name)} · ${esc(CONTACT.address)} · Liquor licence ${esc(CONTACT.liquorLicence)} · ABN ${esc(CONTACT.abn)}<br>Questions? Reply to this email or WhatsApp ${esc(CONTACT.phone)}. Alcohol is sold only to people aged 18 or over; a signature and photo ID are required on delivery.</p>
</div></div></body></html>`;

const itemsHtml = (o: OrderRecord) =>
  `<table style="width:100%;border-collapse:collapse;font-size:14px">${o.lines
    .map(
      (l) =>
        `<tr><td style="padding:5px 0;border-bottom:1px solid #f0ebe1">${l.quantity} &times; ${esc(l.name)}</td><td style="padding:5px 0;border-bottom:1px solid #f0ebe1;text-align:right;white-space:nowrap">${esc(aud(l.lineTotal))}</td></tr>`,
    )
    .join('')}
${o.totals.cryptoDiscount ? `<tr><td style="padding:5px 0;color:#047857">Crypto discount</td><td style="text-align:right;color:#047857">-${esc(aud(o.totals.cryptoDiscount))}</td></tr>` : ''}
<tr><td style="padding:5px 0;color:#57534e">Express courier</td><td style="text-align:right">${o.totals.shipping ? esc(aud(o.totals.shipping)) : 'FREE'}</td></tr>
<tr><td style="padding:9px 0 0;font-weight:bold;font-size:16px">Total</td><td style="text-align:right;font-weight:bold;font-size:16px;padding-top:9px">${esc(aud(o.totals.total))}</td></tr></table>`;

const itemsText = (o: OrderRecord) =>
  [
    ...o.lines.map((l) => `  ${l.quantity} x ${l.name}  ${aud(l.lineTotal)}`),
    o.totals.cryptoDiscount ? `  Crypto discount: -${aud(o.totals.cryptoDiscount)}` : '',
    `  Express courier: ${o.totals.shipping ? aud(o.totals.shipping) : 'FREE'}`,
    `  TOTAL: ${aud(o.totals.total)}`,
  ]
    .filter(Boolean)
    .join('\n');

const firstName = (o: OrderRecord) => o.customer.fullName.split(' ')[0];

/** The terms printed on the payment email and the payment page. Kept in one place so both always match. */
export const BEFORE_SHIPPING_TERMS = [
  'Your order is confirmed once payment is received.',
  'Use your order number as the payment reference.',
  'A tracking number will be provided.',
  'Refund or re-ship within 7 days.',
];

export const PAYMENT_STEPS = [
  'Pay the exact amount using the details above.',
  'Use your order number as the payment reference.',
  'Payment should be made within minutes.',
  'Send a screenshot of your payment (upload it, or send it by email or WhatsApp) so we can confirm and dispatch.',
];

// ---------------------------------------------------------------------------------------------------------------------------
// 1. Sent to the customer the moment they order: confirmation, awaiting payment (no payment details yet)
// ---------------------------------------------------------------------------------------------------------------------------
export function customerOrderEmail(o: OrderRecord) {
  const subject = `Order ${o.ref} confirmed: awaiting payment`;
  const wa = whatsappLink(orderWhatsappText(o));
  const html = shell(
    `Order confirmed: awaiting payment`,
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Thank you, ${esc(firstName(o))}. We have received your order <strong>${esc(o.ref)}</strong>.</p>
${itemsHtml(o)}
<p style="font-size:14px;line-height:1.6;margin:14px 0 0"><strong>Payment method:</strong> ${esc(o.paymentMethodName)}<br><strong>Next:</strong> we will email your payment details shortly. Your order is held while we wait for payment.</p>
<p style="font-size:13px;color:#57534e;margin:12px 0 0">Delivering to ${esc(o.customer.fullName)}, ${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}</p>
<p style="margin:16px 0 0">${button(wa, 'Message us on WhatsApp', '#16a34a')}</p>`,
  );
  const text = `Order ${o.ref} confirmed: awaiting payment\n\nThank you, ${firstName(o)}. We have received your order ${o.ref}.\n\n${itemsText(o)}\n\nPayment method: ${o.paymentMethodName}\nNext: we will email your payment details shortly.\n\nDelivering to ${o.customer.fullName}, ${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}\n\nWhatsApp: ${wa}\n${CONTACT.phone} · ${CONTACT.email}`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 2. Sent by staff: payment details invoice with Upload and WhatsApp buttons
// ---------------------------------------------------------------------------------------------------------------------------
/** Plain-text message staff can send over WhatsApp instead of (or as well as) the email. */
export function paymentWhatsappMessage(o: OrderRecord, details: string, payUrl: string | null): string {
  return [
    `Hi ${firstName(o)}, thank you for your order ${o.ref} with Doctors of Whisky.`,
    '',
    `Amount due: ${aud(o.totals.total)}`,
    `Payment method: ${o.paymentMethodName}`,
    details,
    '',
    `Please use ${o.ref} as the payment reference. Payment should be made within minutes.`,
    `Once paid, send your payment screenshot here${payUrl ? ` or upload it: ${payUrl}` : ''}`,
    '',
    'Your order is confirmed once payment is received. A tracking number will be provided. Refund or re-ship within 7 days.',
  ].join('\n');
}

export function paymentDetailsEmail(o: OrderRecord, details: string, payUrl: string | null) {
  const subject = `Payment details for order ${o.ref}: ${aud(o.totals.total)}`;
  const wa = whatsappLink(paymentWhatsappText(o));
  const reply = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Order ${o.ref}`)}`;
  const detailsHtml = esc(details).replace(/\n/g, '<br>');
  const stacked = (href: string, label: string, bg: string) =>
    `<a href="${esc(href)}" style="display:block;background:${bg};color:#ffffff;text-decoration:none;text-align:center;padding:15px 16px;border-radius:10px;font-weight:bold;font-size:16px;margin:0 0 10px">${esc(label)} &rarr;</a>`;
  const html = shell(
    'Payment details',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Hi ${esc(firstName(o))}, here are the payment details for order <strong>${esc(o.ref)}</strong>.</p>
<div style="background:#111;color:#fff;border-radius:10px;padding:14px 16px;margin:0 0 12px">
<div style="font-size:12px;color:#a8a29e">Amount to pay</div><div style="font:bold 26px Georgia,serif;color:#d4af37">${esc(aud(o.totals.total))}</div>
<div style="font-size:13px;margin-top:6px">Reference: <strong style="font-family:Consolas,monospace;font-size:15px">${esc(o.ref)}</strong></div></div>
<div style="background:#fbf6e9;border:1px solid #ecdca8;border-radius:10px;padding:12px 14px;margin:0 0 14px;font-size:14px;line-height:1.55">
<strong>${esc(o.paymentMethodName)}</strong><br><span style="font-family:Consolas,monospace;word-break:break-all">${detailsHtml}</span></div>
<ol style="font-size:14px;line-height:1.6;padding-left:20px;margin:0 0 14px">${PAYMENT_STEPS.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
<div style="font-size:14px;color:#1c1917;background:#f7f4ee;border-radius:10px;padding:12px 14px;margin:0 0 14px"><strong>Before your order ships</strong>
${BEFORE_SHIPPING_TERMS.map((s) => `<div style="margin-top:6px;line-height:1.5"><span style="color:#16a34a;font-weight:bold">&#10003;</span> ${esc(s)}</div>`).join('')}</div>
<p style="font-size:14px;line-height:1.6;margin:0 0 14px">Once paid, send your payment screenshot to confirm dispatch:<br>&#9993; <a href="mailto:${esc(CONTACT.email)}" style="color:#1d4ed8">${esc(CONTACT.email)}</a><br>WhatsApp <a href="${esc(wa)}" style="color:#15803d">${esc(CONTACT.phone)}</a></p>
${payUrl ? stacked(payUrl, "I've Paid — Upload Confirmation", '#0b84c6') : ''}${stacked(wa, 'Confirm via WhatsApp', '#16a34a')}${stacked(reply, 'Reply to us', '#1f2a44')}
<div style="font-size:13px;color:#57534e;margin-top:6px"><strong>Your order</strong>${itemsHtml(o)}</div>`,
  );
  const text = `PAYMENT DETAILS: order ${o.ref}\n\nAMOUNT TO PAY: ${aud(o.totals.total)}\nREFERENCE: ${o.ref}\n\n${o.paymentMethodName}\n${details}\n\nHOW TO PAY\n${PAYMENT_STEPS.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nBEFORE YOUR ORDER SHIPS\n${BEFORE_SHIPPING_TERMS.map((s) => `- ${s}`).join('\n')}\n\nOnce paid, send your payment screenshot to confirm dispatch:\nEmail: ${CONTACT.email}\nWhatsApp: ${CONTACT.phone}\n\n${payUrl ? `I've Paid, Upload Confirmation: ${payUrl}\n` : ''}Confirm via WhatsApp: ${wa}\nReply to us: ${CONTACT.email}\n\nYOUR ORDER\n${itemsText(o)}`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 3. Sent by staff when payment arrives
// ---------------------------------------------------------------------------------------------------------------------------
export function paymentReceivedEmail(o: OrderRecord) {
  const subject = `Payment received: order ${o.ref} confirmed`;
  const wa = whatsappLink(`Hi Doctors of Whisky, a question about my order ${o.ref}.`);
  const html = shell(
    'Payment received',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Thank you, ${esc(firstName(o))}. We have received your payment of <strong>${esc(aud(o.totals.total))}</strong> and order <strong>${esc(o.ref)}</strong> is now <strong>confirmed</strong>.</p>
<ul style="font-size:14px;line-height:1.6;padding-left:20px;margin:0 0 14px"><li>We are preparing your order for insured courier dispatch.</li><li>A tracking number will be provided.</li><li>Refund or re-ship within 7 days.</li></ul>
${itemsHtml(o)}
<p style="margin:16px 0 0">${button(wa, 'Message us on WhatsApp', '#16a34a')}</p>`,
  );
  const text = `Payment received: order ${o.ref} confirmed\n\nThank you, ${firstName(o)}. We have received your payment of ${aud(o.totals.total)} and order ${o.ref} is now confirmed.\n- We are preparing your order for insured courier dispatch.\n- A tracking number will be provided.\n- Refund or re-ship within 7 days.\n\n${itemsText(o)}\n\nWhatsApp: ${wa}`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// 4. Sent by staff when the order ships, with the tracking number
// ---------------------------------------------------------------------------------------------------------------------------
export function dispatchedEmail(o: OrderRecord, tracking: string) {
  const subject = `Your order ${o.ref} has been dispatched`;
  const wa = whatsappLink(`Hi Doctors of Whisky, a question about my delivery for order ${o.ref}.`);
  const html = shell(
    'Your order is on its way',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Hi ${esc(firstName(o))}, order <strong>${esc(o.ref)}</strong> has been dispatched by insured courier.</p>
<div style="background:#111;color:#fff;border-radius:10px;padding:14px 16px;margin:0 0 12px"><div style="font-size:12px;color:#a8a29e">Tracking number</div><div style="font:bold 20px Consolas,monospace;color:#d4af37;word-break:break-all">${esc(tracking)}</div></div>
<p style="font-size:14px;line-height:1.6;margin:0 0 12px">A signature and photo ID (18+) are required on delivery. Refund or re-ship within 7 days.</p>
<p style="font-size:13px;color:#57534e;margin:0 0 12px">Delivering to ${esc(o.customer.fullName)}, ${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}</p>
<p style="margin:14px 0 0">${button(wa, 'Message us on WhatsApp', '#16a34a')}</p>`,
  );
  const text = `Your order ${o.ref} has been dispatched\n\nTracking number: ${tracking}\n\nA signature and photo ID (18+) are required on delivery. Refund or re-ship within 7 days.\n\nDelivering to ${o.customer.fullName}, ${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}\n\nWhatsApp: ${wa}`;
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
    `<p style="font-size:14px;margin:0 0 10px">Payment method: <strong>${esc(o.paymentMethodName)}</strong>. <strong>Next: send the customer their payment details.</strong></p>${itemsHtml(o)}
<p style="font-size:14px;line-height:1.6;margin:14px 0 0"><strong>${esc(o.customer.fullName)}</strong><br><a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a> · ${esc(o.customer.phone)}<br>${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}${o.customer.notes ? `<br><em>Courier notes: ${esc(o.customer.notes)}</em>` : ''}</p>
<p style="margin:16px 0 0">${button(admin, 'Open admin portal', '#111111', '#d4af37')}</p>`,
  );
  const text = `NEW ORDER ${o.ref}\nPayment: ${o.paymentMethodName}\nNext: send the customer their payment details.\n\n${itemsText(o)}\n\n${o.customer.fullName}\n${o.customer.email} · ${o.customer.phone}\n${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}${o.customer.notes ? `\nCourier notes: ${o.customer.notes}` : ''}\n\nAdmin portal: ${admin}`;
  return { subject, html, text };
}

export function proofReceivedEmail(o: OrderRecord, fileName: string, note?: string) {
  const subject = `Payment proof received: ${o.ref}: ${aud(o.totals.total)}: ${o.customer.fullName}`;
  const admin = `${siteOrigin()}/admin/`;
  const html = shell(
    `Payment proof received`,
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px"><strong>${esc(o.customer.fullName)}</strong> uploaded a payment screenshot for order <strong>${esc(o.ref)}</strong> (${esc(aud(o.totals.total))}, ${esc(o.paymentMethodName)}). It is attached to this email as <em>${esc(fileName)}</em>.</p>
${note ? `<p style="font-size:14px;background:#f7f4ee;border-radius:8px;padding:10px 12px;margin:0 0 10px">Customer note: ${esc(note)}</p>` : ''}
<p style="font-size:13px;color:#57534e;margin:0 0 6px">${esc(o.customer.email)} · ${esc(o.customer.phone)}</p>
<p style="margin:14px 0 0">${button(admin, 'Open admin portal', '#111111', '#d4af37')}</p>`,
  );
  const text = `PAYMENT PROOF RECEIVED: ${o.ref}\n${o.customer.fullName} uploaded a payment screenshot (${aud(o.totals.total)}, ${o.paymentMethodName}). Attached: ${fileName}${note ? `\nCustomer note: ${note}` : ''}\n${o.customer.email} · ${o.customer.phone}\n\nAdmin portal: ${admin}`;
  return { subject, html, text };
}

export function contactEmail(c: { name: string; email: string; phone?: string; subject: string; message: string }) {
  const subject = `Website enquiry: ${c.subject}`;
  const html = shell(
    'New website enquiry',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px"><strong>${esc(c.name)}</strong> &lt;<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>&gt;${c.phone ? `<br>${esc(c.phone)}` : ''}</p><p style="font-size:14px;line-height:1.7">${esc(c.message).replace(/\n/g, '<br>')}</p><p style="font-size:12px;color:#78716c">Replying to this email goes straight to the customer.</p>`,
  );
  const text = `From: ${c.name} <${c.email}>${c.phone ? `\nPhone: ${c.phone}` : ''}\nSubject: ${c.subject}\n\n${c.message}`;
  return { subject, html, text };
}
