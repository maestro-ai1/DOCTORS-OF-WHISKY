import { PRODUCTS } from '@/lib/data/products';
import { PAYMENT_METHODS, SHOP_RULES } from '@/lib/config';
import type { OrderLine, OrderTotals, PaymentMethodId } from '@/lib/orders/types';
import type { RawOrderItem } from '@/lib/orders/validate';

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
const round2 = (n: number) => Math.round(n * 100) / 100;

export interface PricingResult {
  lines?: OrderLine[];
  totals?: OrderTotals;
  paymentMethod?: { id: PaymentMethodId; name: string };
  error?: string;
}

/** Authoritative price calculation. Client-supplied prices and totals are never trusted. */
export function priceOrder(items: RawOrderItem[], paymentMethodId: unknown): PricingResult {
  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethodId);
  if (!method) return { error: 'Please choose a valid payment method.' };

  const lines: OrderLine[] = [];
  for (const it of items) {
    const p = BY_SLUG.get(it.slug);
    if (!p) return { error: 'One of the items in your cart is no longer available. Please refresh the page and try again.' };
    if (!(p.price > 0)) return { error: `${p.name} is not available to order online. Please contact us.` };
    if (p.stock > 0 && it.quantity > p.stock) return { error: `Only ${p.stock} of ${p.name} can be ordered online. Please reduce the quantity or contact us.` };
    lines.push({ slug: p.slug, name: p.name, size: p.size, unitPrice: p.price, quantity: it.quantity, lineTotal: round2(p.price * it.quantity) });
  }

  const subtotal = round2(lines.reduce((s, l) => s + l.lineTotal, 0));
  if (subtotal < SHOP_RULES.minOrder) return { error: `The minimum order is $${SHOP_RULES.minOrder} AUD. Your cart is $${subtotal.toLocaleString()} AUD.` };

  const isCrypto = method.type === 'crypto';
  const cryptoDiscount = isCrypto ? round2((subtotal * SHOP_RULES.cryptoDiscountPercent) / 100) : 0;
  const shipping = subtotal >= SHOP_RULES.freeShippingThreshold ? 0 : SHOP_RULES.shippingFee;
  const total = round2(Math.max(0, subtotal - cryptoDiscount + shipping));

  return { lines, totals: { subtotal, cryptoDiscount, shipping, total }, paymentMethod: { id: method.id as PaymentMethodId, name: method.name } };
}
