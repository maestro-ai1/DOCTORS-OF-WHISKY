import { aud, dispatchedEmail, paymentDetailsEmail, paymentReceivedEmail, paymentWhatsappMessage, siteOrigin } from '@/lib/mail/templates';
import { payPageUrl } from '@/lib/orders/link-token';
import type { OrderRecord, OrderStatus, SendKind } from '@/lib/orders/types';

export interface ComposeInput {
  paymentDetails?: unknown;
  tracking?: unknown;
}

export interface Composed {
  subject: string;
  html: string;
  text: string;
  /** The order status this message moves the order to once it has been sent. */
  nextStatus: OrderStatus;
  /** A short human summary stored on the order's history. */
  summary: string;
  /** The same message as plain text, for sending over WhatsApp instead of email. */
  whatsappText: string;
}

const first = (o: OrderRecord) => o.customer.fullName.split(' ')[0];

// Newlines and tabs are fine in pasted payment details; other control characters are not.
const BAD_CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

/** Builds exactly the email that "Send" will deliver, so the preview and the real message can never differ. */
export function composeCustomerEmail(order: OrderRecord, kind: SendKind, input: ComposeInput): { ok: true; value: Composed } | { ok: false; error: string } {
  if (kind === 'payment_details') {
    const details = typeof input.paymentDetails === 'string' ? input.paymentDetails.replace(/\r\n/g, '\n').trim() : '';
    if (details.length < 5) return { ok: false, error: 'Paste the payment details first (PayID, bank account, wallet address…).' };
    if (details.length > 2000) return { ok: false, error: 'Payment details are too long (2,000 characters maximum).' };
    if (BAD_CONTROL.test(details)) return { ok: false, error: 'The payment details contain invalid characters.' };
    const payUrl = payPageUrl(order.ref, siteOrigin());
    const m = paymentDetailsEmail(order, details, payUrl);
    return { ok: true, value: { ...m, nextStatus: 'awaiting_payment', summary: details, whatsappText: paymentWhatsappMessage(order, details, payUrl) } };
  }
  if (kind === 'payment_received') {
    const m = paymentReceivedEmail(order);
    return { ok: true, value: { ...m, nextStatus: 'paid', summary: 'Payment received', whatsappText: `Hi ${first(order)}, we have received your payment of ${aud(order.totals.total)} for order ${order.ref}. Your order is confirmed. A tracking number will be provided. Refund or re-ship within 7 days.` } };
  }
  if (kind === 'dispatched') {
    const tracking = typeof input.tracking === 'string' ? input.tracking.replace(/\s+/g, ' ').trim() : '';
    if (tracking.length < 3) return { ok: false, error: 'Enter the tracking number.' };
    if (tracking.length > 60 || !/^[A-Za-z0-9][A-Za-z0-9 ./_-]*$/.test(tracking)) return { ok: false, error: 'The tracking number can only contain letters, numbers, spaces and - . / _' };
    const m = dispatchedEmail(order, tracking);
    return { ok: true, value: { ...m, nextStatus: 'dispatched', summary: `Tracking: ${tracking}`, whatsappText: `Hi ${first(order)}, your order ${order.ref} has been dispatched. Tracking number: ${tracking}. A signature and photo ID (18+) are required on delivery. Refund or re-ship within 7 days.` } };
  }
  return { ok: false, error: 'Unknown message type.' };
}

