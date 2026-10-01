import { CONTACT, PAYMENT_METHODS, SITE } from '@/lib/config';
import type { OrderRecord } from '@/lib/orders/types';

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AUD`;
const origin = () => process.env.APP_URL?.replace(/\/$/, '') || `https://${SITE.domain}`;

export function whatsappLink(text: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function orderWhatsappText(order: Pick<OrderRecord, 'ref' | 'lines' | 'totals' | 'paymentMethodName'>): string {
  const lines = order.lines.map((l) => `- ${l.quantity} x ${l.name}`).join('\n');
  return `Hi Doctors of Whisky, I have placed order ${order.ref}.\n${lines}\nTotal: ${aud(order.totals.total)} (${order.paymentMethodName}).\nPlease confirm payment details and the dispatch window.`;
}

const shell = (title: string, body: string) => `<!doctype html><html><body style="margin:0;background:#f5f1ea;font-family:Arial,Helvetica,sans-serif;color:#1c1917">
<div style="max-width:620px;margin:0 auto;padding:24px">
<div style="background:#111;color:#d4af37;padding:18px 24px;border-radius:12px 12px 0 0"><div style="font:bold 20px Georgia,serif">${esc(SITE.name)}</div><div style="font-size:12px;color:#a8a29e">${esc(SITE.tagline)}</div></div>
<div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e7e0d4">
<h1 style="font:bold 20px Georgia,serif;margin:0 0 16px">${esc(title)}</h1>${body}
<hr style="border:none;border-top:1px solid #e7e0d4;margin:24px 0 12px">
<p style="font-size:12px;color:#78716c;margin:0">${esc(SITE.name)} · ${esc(CONTACT.address)} · Liquor licence ${esc(CONTACT.liquorLicence)} · ABN ${esc(CONTACT.abn)}<br>
Questions? Reply to this email, call or WhatsApp ${esc(CONTACT.phone)}. Alcohol is sold only to people aged 18 or over; photo ID is required on delivery.</p>
</div></div></body></html>`;

const itemsTable = (o: OrderRecord) =>
  `<table style="width:100%;border-collapse:collapse;font-size:14px">${o.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid #f0ebe1">${l.quantity} &times; ${esc(l.name)} <span style="color:#78716c">(${esc(l.size)})</span></td><td style="padding:6px 0;border-bottom:1px solid #f0ebe1;text-align:right;white-space:nowrap">${esc(aud(l.lineTotal))}</td></tr>`,
    )
    .join('')}
<tr><td style="padding:6px 0;color:#57534e">Subtotal</td><td style="text-align:right">${esc(aud(o.totals.subtotal))}</td></tr>
${o.totals.cryptoDiscount ? `<tr><td style="padding:6px 0;color:#047857">Crypto discount</td><td style="text-align:right;color:#047857">-${esc(aud(o.totals.cryptoDiscount))}</td></tr>` : ''}
<tr><td style="padding:6px 0;color:#57534e">Express courier</td><td style="text-align:right">${o.totals.shipping ? esc(aud(o.totals.shipping)) : 'FREE'}</td></tr>
<tr><td style="padding:10px 0;font-weight:bold;font-size:16px">Total due</td><td style="text-align:right;font-weight:bold;font-size:16px">${esc(aud(o.totals.total))}</td></tr></table>`;

const itemsText = (o: OrderRecord) =>
  [
    ...o.lines.map((l) => `  ${l.quantity} x ${l.name} (${l.size})  ${aud(l.lineTotal)}`),
    `  Subtotal: ${aud(o.totals.subtotal)}`,
    o.totals.cryptoDiscount ? `  Crypto discount: -${aud(o.totals.cryptoDiscount)}` : '',
    `  Express courier: ${o.totals.shipping ? aud(o.totals.shipping) : 'FREE'}`,
    `  TOTAL DUE: ${aud(o.totals.total)}`,
  ]
    .filter(Boolean)
    .join('\n');

const paymentInstructions = (o: OrderRecord) => {
  const m = PAYMENT_METHODS.find((p) => p.id === o.paymentMethod);
  if (!m) return { html: '', text: '' };
  return {
    html: `<div style="background:#fbf6e9;border:1px solid #ecdca8;border-radius:8px;padding:14px;margin:16px 0;font-size:14px"><strong>How to pay: ${esc(m.name)}</strong><br><span style="font-family:Consolas,monospace;word-break:break-all">${esc(m.details)}</span><br><span style="color:#57534e">${esc(m.note)} Please include your order reference <strong>${esc(o.ref)}</strong> as the payment description.</span></div>`,
    text: `HOW TO PAY: ${m.name}\n  ${m.details}\n  ${m.note} Please include your order reference ${o.ref} as the payment description.`,
  };
};

export function customerConfirmationEmail(o: OrderRecord) {
  const pay = paymentInstructions(o);
  const wa = whatsappLink(orderWhatsappText(o));
  const first = o.customer.fullName.split(' ')[0];
  const subject = `Your Doctors of Whisky order ${o.ref}`;
  const html = shell(
    `Thank you, ${first}`,
    `<p style="font-size:14px;line-height:1.6">We have received your order <strong>${esc(o.ref)}</strong>. Our team will confirm your payment and arrange insured courier dispatch.</p>
${itemsTable(o)}${pay.html}
<p style="font-size:14px;margin:0 0 6px"><strong>Delivery to</strong><br>${esc(o.customer.fullName)}<br>${esc(o.customer.address)}<br>${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}</p>
<p style="margin:20px 0"><a href="${esc(wa)}" style="background:#16a34a;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:bold;font-size:14px">Confirm on WhatsApp</a></p>`,
  );
  const text = `Thank you, ${first}.\n\nWe have received your order ${o.ref}.\n\n${itemsText(o)}\n\n${pay.text}\n\nDelivery to: ${o.customer.fullName}, ${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}\n\nConfirm on WhatsApp: ${wa}\n\n${CONTACT.phone} · ${CONTACT.email}\nAlcohol is sold only to people aged 18 or over; photo ID is required on delivery.`;
  return { subject, html, text };
}

export function salesNotificationEmail(o: OrderRecord) {
  const subject = `New order ${o.ref} - ${aud(o.totals.total)} - ${o.customer.fullName}`;
  const admin = `${origin()}/admin/`;
  const html = shell(
    `New order ${o.ref}`,
    `<p style="font-size:14px;margin:0 0 12px">Payment method: <strong>${esc(o.paymentMethodName)}</strong></p>${itemsTable(o)}
<h2 style="font:bold 15px Georgia,serif;margin:20px 0 6px">Customer</h2>
<p style="font-size:14px;line-height:1.6;margin:0">${esc(o.customer.fullName)}<br><a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a><br>${esc(o.customer.phone)}<br>${esc(o.customer.address)}, ${esc(o.customer.city)} ${esc(o.customer.state)} ${esc(o.customer.postcode)}${o.customer.notes ? `<br><em>Courier notes: ${esc(o.customer.notes)}</em>` : ''}</p>
<p style="margin:20px 0"><a href="${esc(admin)}" style="background:#111;color:#d4af37;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:bold;font-size:14px">Open admin portal</a></p>
<p style="font-size:12px;color:#78716c">Replying to this email goes straight to the customer.</p>`,
  );
  const text = `NEW ORDER ${o.ref}\nPayment: ${o.paymentMethodName}\n\n${itemsText(o)}\n\nCUSTOMER\n  ${o.customer.fullName}\n  ${o.customer.email}\n  ${o.customer.phone}\n  ${o.customer.address}, ${o.customer.city} ${o.customer.state} ${o.customer.postcode}${o.customer.notes ? `\n  Courier notes: ${o.customer.notes}` : ''}\n\nAdmin portal: ${admin}\nReplying to this email goes straight to the customer.`;
  return { subject, html, text };
}

export function adminReplyEmail(o: OrderRecord, subjectLine: string, message: string) {
  const subject = subjectLine || `Re: Your Doctors of Whisky order ${o.ref}`;
  const body = esc(message).replace(/\n/g, '<br>');
  const html = shell(`Order ${o.ref}`, `<p style="font-size:14px;line-height:1.7">${body}</p>`);
  const text = `${message}\n\n-- \n${SITE.name} · ${CONTACT.phone} · ${CONTACT.email}\nOrder reference: ${o.ref}`;
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
