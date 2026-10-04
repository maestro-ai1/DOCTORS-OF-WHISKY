/** 'crypto-usdt' is kept for orders saved before USDT was split into TRC20 and ERC20. */
export type PaymentMethodId = 'payid' | 'bank-transfer' | 'crypto-btc' | 'crypto-usdt-trc20' | 'crypto-usdt-erc20' | 'crypto-usdt';

export interface OrderLine {
  slug: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  cryptoDiscount: number;
  shipping: number;
  total: number;
}

/** new -> awaiting_payment (payment details sent) -> paid -> dispatched. Status moves automatically when staff send each email. */
export type OrderStatus = 'new' | 'awaiting_payment' | 'paid' | 'dispatched' | 'completed' | 'cancelled';
export const ORDER_STATUSES: OrderStatus[] = ['new', 'awaiting_payment', 'paid', 'dispatched', 'completed', 'cancelled'];

/** What staff can send to the customer from the portal. */
export type SendKind = 'payment_details' | 'payment_received' | 'dispatched';
export const SEND_KINDS: SendKind[] = ['payment_details', 'payment_received', 'dispatched'];

/** A message sent to the customer from the portal (kept as an audit trail on the order). */
export interface OrderReply {
  id: string;
  at: string;
  by: string;
  kind?: SendKind | 'message';
  subject: string;
  message: string;
  delivered: boolean;
  error?: string;
}

/** A payment screenshot the customer uploaded (the file itself is emailed to the shop; only metadata is stored). */
export interface PaymentProof {
  id: string;
  at: string;
  fileName: string;
  contentType: string;
  bytes: number;
  note?: string;
  emailed: boolean;
}

export interface OrderRecord {
  ref: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    notes?: string;
  };
  lines: OrderLine[];
  totals: OrderTotals;
  paymentMethod: PaymentMethodId;
  paymentMethodName: string;
  /** The payment details the staff pasted for this order (shown in the invoice email and on the customer's payment page). */
  paymentDetails?: string;
  trackingNumber?: string;
  emails: { sales: 'sent' | 'failed' | 'skipped'; customer: 'sent' | 'failed' | 'skipped' };
  replies: OrderReply[];
  proofs?: PaymentProof[];
}

export interface PublicOrderSummary {
  ref: string;
  createdAt: string;
  lines: OrderLine[];
  totals: OrderTotals;
  paymentMethod: PaymentMethodId;
  paymentMethodName: string;
}
