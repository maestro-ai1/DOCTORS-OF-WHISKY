export type PaymentMethodId = 'payid' | 'bank-transfer' | 'crypto-btc' | 'crypto-usdt';

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

export type OrderStatus = 'new' | 'awaiting_payment' | 'paid' | 'dispatched' | 'completed' | 'cancelled';
export const ORDER_STATUSES: OrderStatus[] = ['new', 'awaiting_payment', 'paid', 'dispatched', 'completed', 'cancelled'];

export interface OrderReply {
  id: string;
  at: string;
  by: string;
  subject: string;
  message: string;
  delivered: boolean;
  error?: string;
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
  emails: { sales: 'sent' | 'failed' | 'skipped'; customer: 'sent' | 'failed' | 'skipped' };
  replies: OrderReply[];
}

export interface PublicOrderSummary {
  ref: string;
  createdAt: string;
  lines: OrderLine[];
  totals: OrderTotals;
  paymentMethod: PaymentMethodId;
  paymentMethodName: string;
}
