import { CONTACT, SHOP_RULES, SITE } from '@/lib/config';
import { exGst, gstIncluded } from '@/lib/orders/summary';
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

const deliveryHtml = (o: OrderRecord) =>
  `<p style="font-size:13px;line-height:1.55;margin:0 0 12px;color:#d4d4d4"><strong>Delivering to:</strong> ${esc(o.customer.fullName)}, ${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}<br><strong>Payment method:</strong> ${esc(o.paymentMethodName)}</p>`;

const firstName = (o: OrderRecord) => o.customer.fullName.split(' ')[0];

const button = (href: string, label: string, bg: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${bg === '#16a34a' ? '#ffffff' : '#0a0a0a'};text-decoration:none;padding:13px 18px;border-radius:10px;font-weight:bold;font-size:15px;margin:0 6px 8px 0">${esc(label)}</a>`;

const shell = (title: string, body: string) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"></head><body bgcolor="#000000" style="margin:0;background:#000000;font-family:Arial,Helvetica,sans-serif;color:#e5e5e5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#000000" style="background:#000000"><tr><td align="center" style="padding:14px 10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px">
<tr><td bgcolor="#0a0a0a" style="background:#0a0a0a;padding:16px 20px;border:1px solid #5c4214;border-bottom:3px solid #d4af37;border-radius:12px 12px 0 0"><span style="font:bold 19px Georgia,serif;color:#d4af37;letter-spacing:.6px">${esc(SITE.name)}</span><br><span style="font:11px Arial,sans-serif;color:#a3a3a3;letter-spacing:1px;text-transform:uppercase">Rare, collectable &amp; fine spirits</span></td></tr>
<tr><td bgcolor="#171717" style="background:#171717;padding:20px;border:1px solid #5c4214;border-top:0;border-radius:0 0 12px 12px">
<h1 style="font:bold 21px Georgia,serif;margin:0 0 12px;color:#d4af37">${esc(title)}</h1>${body}
<p style="font-size:11px;color:#8a8a8a;margin:18px 0 0;border-top:1px solid #333333;padding-top:10px;line-height:1.5">${esc(SITE.name)} · ${esc(CONTACT.email)} · ${esc(CONTACT.phone)}<br>Licence ${esc(CONTACT.liquorLicence)} · ABN ${esc(CONTACT.abn)} · 18+ only, photo ID on delivery</p>
</td></tr></table></td></tr></table></body></html>`;

const MONO = "Consolas,'Courier New',monospace";
const money = (n: number) => '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const refBox = (o: OrderRecord) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0a0a0a" style="margin:0 0 14px;background:#0a0a0a;border:1px solid #5c4214;border-radius:10px"><tr>
<td valign="top" style="padding:13px 16px"><div style="font:bold 10.5px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#a3a3a3">Order number</div><div style="font:bold 19px ${MONO};color:#f5f5f5;margin-top:3px">${esc(o.ref)}</div></td>
<td valign="top" align="right" style="padding:13px 16px"><div style="font:bold 10.5px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#a3a3a3">Amount due</div><div style="font:bold 22px ${MONO};color:#d4af37;margin-top:3px;white-space:nowrap">${esc(money(o.totals.total))} <span style="font-size:11px">AUD</span></div></td>
</tr></table>`;

const deliveryText = (o: OrderRecord) => (o.totals.shipping > 0 ? money(o.totals.shipping) : 'FREE');

/** Aligned order summary: items, then subtotal, crypto discount, delivery, total and the GST included in it. */
const itemsHtml = (o: OrderRecord) => {
  const t = o.totals;
  const cell = 'padding:7px 0;border-bottom:1px solid #333333;font-size:14px;';
  const items = o.lines
    .map(
      (l) => `<tr><td style="${cell}color:#f5f5f5">${l.quantity} &times; ${esc(l.name)}${l.quantity > 1 ? `<br><span style="font-size:12px;color:#8a8a8a">${esc(money(l.unitPrice))} each</span>` : ''}</td><td align="right" valign="top" style="${cell}font-family:${MONO};white-space:nowrap;padding-left:12px">${esc(money(l.lineTotal))}</td></tr>`,
    )
    .join('');
  const row = (label: string, value: string, extra = '') =>
    `<tr><td style="padding:5px 0;font-size:13px;color:#a3a3a3${extra}">${label}</td><td align="right" style="padding:5px 0 5px 12px;font-family:${MONO};font-size:13px;color:#a3a3a3;white-space:nowrap${extra}">${value}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 12px">
<tr><td colspan="2" style="padding:0 0 6px;font:bold 11px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#d4af37;border-bottom:2px solid #d4af37">Order summary</td></tr>
${items}
${row('Subtotal (incl. GST)', esc(money(t.subtotal)))}
${t.cryptoDiscount ? row(`Crypto discount (${SHOP_RULES.cryptoDiscountPercent}% off goods)`, '-' + esc(money(t.cryptoDiscount)), ';color:#4ade80') : ''}
${row(t.shipping > 0 ? 'Delivery (flat rate, Australia-wide)' : `Delivery (free over ${money(SHOP_RULES.freeShippingThreshold)})`, t.shipping > 0 ? esc(money(t.shipping)) : 'FREE')}
<tr><td style="padding:12px 0 4px;border-top:2px solid #d4af37;font:bold 15px Arial,sans-serif;color:#f5f5f5;text-transform:uppercase;letter-spacing:.4px">Total to pay</td><td align="right" style="padding:12px 0 4px 12px;border-top:2px solid #d4af37;font:bold 20px Consolas,'Courier New',monospace;color:#d4af37;white-space:nowrap">${esc(money(t.total))} <span style="font-size:11px">AUD</span></td></tr>
${row('Includes GST of', esc(money(gstIncluded(t))))}
</table>`;
};

const itemsText = (o: OrderRecord) => {
  const t = o.totals;
  return [
    ...o.lines.map((l) => `${l.quantity} x ${l.name}: ${money(l.lineTotal)}`),
    '',
    `Subtotal (incl. GST): ${money(t.subtotal)}`,
    ...(t.cryptoDiscount ? [`Crypto discount (${SHOP_RULES.cryptoDiscountPercent}% off goods): -${money(t.cryptoDiscount)}`] : []),
    `Delivery: ${deliveryText(o)}`,
    `TOTAL TO PAY: ${money(t.total)} AUD`,
    `Includes GST of ${money(gstIncluded(t))}`,
  ].join('\n');
};

// ---------------------------------------------------------------------------------------------------------------------------
// 1. Sent to the customer when they order: confirmation, awaiting payment (no payment details yet)
// ---------------------------------------------------------------------------------------------------------------------------
export const isCryptoOrder = (o: Pick<OrderRecord, 'paymentMethod'>) => o.paymentMethod.startsWith('crypto');

export function customerOrderEmail(o: OrderRecord, payUrl?: string | null) {
  if (isCryptoOrder(o) && payUrl) {
    const subject = `Order ${o.ref}: complete your crypto payment (${aud(o.totals.total)})`;
    const html = shell(
      'Complete your crypto payment',
      `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Hi ${esc(firstName(o))}, thank you. We have received your order.</p>
${refBox(o)}
${itemsHtml(o)}
${deliveryHtml(o)}
<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Open the secure payment page to choose Bitcoin or USDT, scan the QR code or copy the wallet address, then upload your payment screenshot.</p>
<p style="margin:0 0 6px">${button(payUrl, 'Pay with crypto', '#d4af37')}</p>
<p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:0">${esc(TERMS_LINE)}</p>`,
    );
    const text = `Order ${o.ref}: complete your crypto payment

Hi ${firstName(o)}, we have received your order ${o.ref}.

${itemsText(o)}

Pay with crypto (choose Bitcoin or USDT, then upload your screenshot):
${payUrl}

${TERMS_LINE}
${CONTACT.email} · ${CONTACT.phone}`;
    return { subject, html, text };
  }
  const subject = `Order ${o.ref} confirmed: awaiting payment`;
  const html = shell(
    'Order confirmed: awaiting payment',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 12px">Hi ${esc(firstName(o))}, thank you. We have received your order.</p>
${refBox(o)}
${itemsHtml(o)}
${deliveryHtml(o)}
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
    `<div style="background:#0a0a0a;color:#ffffff;border:1px solid #5c4214;border-radius:10px;padding:12px 14px;margin:0 0 10px">
<div style="font-size:12px;color:#a3a3a3">Amount to pay</div><div style="font:bold 24px Georgia,serif;color:#d4af37">${esc(aud(o.totals.total))}</div>
<div style="font-size:13px;margin-top:4px">Reference <strong style="font-family:Consolas,monospace;font-size:15px">${esc(o.ref)}</strong></div><div style="font-size:12px;color:#a3a3a3;margin-top:2px">Includes GST of ${esc(aud(gstIncluded(o.totals)))}</div></div>
${itemsHtml(o)}
<div style="background:#1f1a0e;border:1px solid #5c4214;border-radius:10px;padding:11px 14px;margin:0 0 12px;font-size:14px;line-height:1.55">
<strong>${esc(o.paymentMethodName)}</strong><br><span style="font-family:Consolas,monospace;word-break:break-all">${esc(details).replace(/\n/g, '<br>')}</span></div>
<p style="font-size:14px;line-height:1.5;margin:0 0 12px">Please pay within minutes and use <strong>${esc(o.ref)}</strong> as the payment reference. Then send us your payment screenshot:</p>
<p style="margin:0 0 6px">${payUrl ? button(payUrl, 'Upload screenshot', '#d4af37') : ''}${button(wa, 'WhatsApp', '#16a34a')}</p>
<p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:0">Or email it to <a href="mailto:${esc(CONTACT.email)}" style="color:#d4af37">${esc(CONTACT.email)}</a>. ${esc(TERMS_LINE)}</p>`,
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
${itemsHtml(o)}
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
    `<div style="background:#0a0a0a;color:#ffffff;border:1px solid #5c4214;border-radius:10px;padding:12px 14px;margin:0 0 10px"><div style="font-size:12px;color:#a3a3a3">Tracking number</div><div style="font:bold 19px Consolas,monospace;color:#d4af37;word-break:break-all">${esc(tracking)}</div></div>
<p style="font-size:14px;line-height:1.6;margin:0">Order ${esc(o.ref)} is with the courier. A signature and photo ID (18+) are required on delivery.</p>`,
  );
  const text = `Your order ${o.ref} has been dispatched\n\nTracking number: ${tracking}\n\nA signature and photo ID (18+) are required on delivery.`;
  return { subject, html, text };
}

// ---------------------------------------------------------------------------------------------------------------------------
// Shop notifications
// ---------------------------------------------------------------------------------------------------------------------------
/** Labelled detail rows (customer, contact, delivery...), aligned in two columns with thin gold-tinted dividers. */
const detailsTable = (title: string, rows: [string, string][]) => {
  const cell = 'padding:7px 0;border-bottom:1px solid #333333;font-size:13.5px;vertical-align:top;';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 14px">
<tr><td colspan="2" style="padding:0 0 6px;font:bold 11px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#d4af37;border-bottom:2px solid #d4af37">${esc(title)}</td></tr>
${rows.map(([k, v]) => `<tr><td style="${cell}color:#a3a3a3;width:34%">${esc(k)}</td><td style="${cell}color:#f5f5f5;font-weight:bold">${v}</td></tr>`).join('')}
</table>`;
};

const mailLink = (email: string) => `<a href="mailto:${esc(email)}" style="color:#d4af37;text-decoration:none">${esc(email)}</a>`;

const customerRows = (o: OrderRecord): [string, string][] => [
  ['Name', esc(o.customer.fullName)],
  ['Email', mailLink(o.customer.email)],
  ['Mobile', esc(o.customer.phone)],
  ['Delivery address', `${esc(o.customer.address)}<br>${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}`],
  ...(o.customer.notes ? ([['Delivery notes', esc(o.customer.notes)]] as [string, string][]) : []),
  ['Payment method', esc(o.paymentMethodName)],
];

export function salesNotificationEmail(o: OrderRecord) {
  const subject = `New order ${o.ref}: ${aud(o.totals.total)}: ${o.customer.fullName}`;
  const admin = `${siteOrigin()}/admin/`;
  const crypto = isCryptoOrder(o);
  const html = shell(
    'New order received',
    `${refBox(o)}
${detailsTable('Customer', customerRows(o))}
${itemsHtml(o)}
<p style="margin:0 0 6px">${button(admin, crypto ? 'Open admin' : 'Send payment details', '#d4af37')}</p>
${crypto ? '<p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:6px 0 0">Crypto order: the customer has been sent to the wallet page. You will get a separate email when they upload their payment screenshot.</p>' : ''}`,
  );
  const text = `NEW ORDER ${o.ref}

${o.customer.fullName}
${o.customer.email}
${o.customer.phone}
${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}${o.customer.notes ? `
Notes: ${o.customer.notes}` : ''}
Payment: ${o.paymentMethodName}

${itemsText(o)}

${crypto ? 'Open admin' : 'Send payment details'}: ${admin}`;
  return { subject, html, text };
}

export function proofReceivedEmail(o: OrderRecord, fileName: string, note?: string, network?: string) {
  const crypto = isCryptoOrder(o);
  const subject = `${crypto ? 'PAID (crypto): ' : 'Payment screenshot: '}${o.ref}: ${aud(o.totals.total)}: ${o.customer.fullName}`;
  const admin = `${siteOrigin()}/admin/`;
  const rows: [string, string][] = [
    ['Customer', esc(o.customer.fullName)],
    ['Email', mailLink(o.customer.email)],
    ['Mobile', esc(o.customer.phone)],
    ['Payment method', esc(o.paymentMethodName)],
    ...(network ? ([['Paid with', esc(network)]] as [string, string][]) : []),
    ['Amount due', esc(aud(o.totals.total))],
    ['Includes GST of', esc(aud(gstIncluded(o.totals)))],
    ['Screenshot', `${esc(fileName)} (attached)`],
    ...(note ? ([['Customer note', esc(note)]] as [string, string][]) : []),
  ];
  const html = shell(
    crypto ? 'Crypto payment screenshot received' : 'Payment screenshot received',
    `${refBox(o)}
${detailsTable('Payment details', rows)}
<p style="margin:0 0 6px">${button(admin, 'Open admin', '#d4af37')}</p>
${crypto ? '<p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:6px 0 0">Check the amount in your wallet, then press &quot;Payment received&quot; on the order to confirm to the customer.</p>' : ''}`,
  );
  const text = `PAYMENT SCREENSHOT: ${o.ref}
${o.customer.fullName} (${o.customer.email}, ${o.customer.phone}) says they have paid${crypto ? ' by crypto' : ''}${network ? ` (${network})` : ''}.
Amount due: ${aud(o.totals.total)} (includes GST of ${aud(gstIncluded(o.totals))})
Attached: ${fileName}${note ? `
Note: ${note}` : ''}

Admin: ${admin}`;
  return { subject, html, text };
}

/** Sent to the customer as soon as their crypto payment screenshot arrives. */
export function cryptoScreenshotCustomerEmail(o: OrderRecord) {
  const subject = `We received your crypto payment: order ${o.ref}`;
  const html = shell(
    'Crypto payment received',
    `<p style="font-size:14px;line-height:1.6;margin:0 0 10px">Thank you, ${esc(firstName(o))}. We have your payment screenshot for order <strong>${esc(o.ref)}</strong> (${esc(aud(o.totals.total))}).</p>
<p style="font-size:14px;line-height:1.6;margin:0 0 10px">We are matching it against our wallet now and will email you again the moment your payment is confirmed. After that your order goes straight to dispatch.</p>
<p style="font-size:12px;color:#a3a3a3;line-height:1.5;margin:0">${esc(TERMS_LINE)}</p>`,
  );
  const text = `Crypto payment received: order ${o.ref}

Thank you, ${firstName(o)}. We have your payment screenshot for order ${o.ref} (${aud(o.totals.total)}).
We are matching it against our wallet now and will email you again the moment your payment is confirmed.

${TERMS_LINE}`;
  return { subject, html, text };
}

export function contactEmail(c: { name: string; email: string; phone?: string; subject: string; message: string }) {
  const subject = `Website enquiry: ${c.subject}`;
  const html = shell(
    'New website enquiry',
    `${detailsTable('From', [['Name', esc(c.name)], ['Email', mailLink(c.email)], ...(c.phone ? ([['Mobile', esc(c.phone)]] as [string, string][]) : []), ['Subject', esc(c.subject)]])}
<div style="font:bold 11px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#d4af37;border-bottom:2px solid #d4af37;padding-bottom:6px;margin:0 0 8px">Message</div>
<p style="font-size:14px;line-height:1.7;margin:0 0 6px;color:#f5f5f5">${esc(c.message).replace(/\n/g, '<br>')}</p>`,
  );
  const text = `From: ${c.name} <${c.email}>${c.phone ? `\nPhone: ${c.phone}` : ''}\nSubject: ${c.subject}\n\n${c.message}`;
  return { subject, html, text };
}
