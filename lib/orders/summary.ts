import type { OrderTotals } from '@/lib/orders/types';

/** Australian GST rate. Every price on the site already includes it, so it is shown inside the total, never added on top. */
export const GST_RATE = 0.1;

/** GST contained in the total the customer pays (total ÷ 11, whole cents). Total already includes delivery and any crypto discount. */
export const gstIncluded = (t: Pick<OrderTotals, 'total'>): number => Math.round((t.total / (1 + GST_RATE)) * GST_RATE * 100) / 100;

/** Total before GST (ex-GST amount). */
export const exGst = (t: Pick<OrderTotals, 'total'>): number => Math.round((t.total - gstIncluded(t)) * 100) / 100;
