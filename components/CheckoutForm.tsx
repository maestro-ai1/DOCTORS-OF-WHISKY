'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import Link from 'next/link';
import { CHECKOUT_PAYMENT_METHODS, PAYMENT_METHODS, CONTACT, SITE } from '@/lib/config';
import { CopyField } from '@/components/CopyField';
import { validateCustomer } from '@/lib/orders/validate';
import {
  ShieldCheck,
  CreditCard,
  Building,
  Coins,
  CheckCircle,
  Truck,
  Phone,
  Lock,
} from 'lucide-react';

// Gold, bold and large (16px stops iPhones zooming in) so the form reads clearly on the black theme.
const INPUT = 'w-full px-4 py-3 rounded-xl bg-neutral-900 border-2 border-amber-700/70 text-amber-300 font-bold text-base placeholder:text-neutral-500 placeholder:font-normal focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 aria-[invalid=true]:border-red-500';
const LABEL = 'block text-sm font-bold text-amber-400';

export function CheckoutForm() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    isCryptoPayment,
    cryptoDiscountAmount,
    finalTotal,
    paymentMethod,
    setPaymentMethod,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'NSW',
    postcode: '',
    notes: '',
    ageConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fallbackWhatsapp, setFallbackWhatsapp] = useState('');
  const [website, setWebsite] = useState(''); // honeypot: hidden from people, filled by bots

  const currentPayment =
    PAYMENT_METHODS.find((p) => p.id === paymentMethod) || PAYMENT_METHODS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});
    setFallbackWhatsapp('');

    // Same rules as the server, for instant feedback (the server is still the authority)
    const local = validateCustomer(formData);
    if (!local.value) {
      setFieldErrors(local.errors);
      setErrorMsg('Please check the details below.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only slugs and quantities are sent: prices and totals are recalculated on the server.
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })),
          paymentMethodId: currentPayment.id,
          customer: formData,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        orderRef?: string;
        order?: unknown;
        whatsappUrl?: string;
        confirmationEmail?: string;
        payPath?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok || !data.success || !data.orderRef) {
        setFieldErrors(data.fieldErrors || {});
        setErrorMsg(data.error || 'We could not place your order. Please try again or order on WhatsApp.');
        if (data.whatsappUrl) setFallbackWhatsapp(data.whatsappUrl);
        return;
      }

      // Server-confirmed order only: keep what the server priced, not what the browser computed
      sessionStorage.setItem(
        'dow_last_order',
        JSON.stringify({ orderRef: data.orderRef, order: data.order, whatsappUrl: data.whatsappUrl, confirmationEmail: data.confirmationEmail, customerEmail: formData.email }),
      );
      clearCart();
      // Crypto orders go straight to the private wallet page; PayID and bank transfer keep the existing thank-you page.
      if (isCryptoPayment && data.payPath) {
        // Full page load: the pay page is exempt from the age gate. Empty the saved cart first so it is not restored.
        try { localStorage.removeItem(SITE.cartKey); } catch { /* ignore */ }
        window.location.assign(data.payPath);
      }
      else router.push(`/thank-you-order?ref=${encodeURIComponent(data.orderRef)}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Your order has not been placed. Please try again or order on WhatsApp.');
      setFallbackWhatsapp(`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent('Hi Doctors of Whisky, I tried to place an order on your website but it did not go through. Can you help me complete it?')}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-100">Secure Checkout</h1>
              <p className="text-xs sm:text-sm text-neutral-400">Insured transit · Sydney dispatch</p>
            </div>
          </div>
          <Link href="/shop/" className="text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 shrink-0">Keep shopping</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details (7 cols) */}
          <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {errorMsg && (
              <div role="alert" className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm space-y-1.5">
                <p className="font-semibold">{errorMsg}</p>
                {Object.values(fieldErrors).length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5">
                    {Object.values(fieldErrors).map((m) => <li key={m}>{m}</li>)}
                  </ul>
                )}
                {fallbackWhatsapp && (
                  <a href={fallbackWhatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg bg-emerald-900/70 border border-emerald-700 text-emerald-200 font-semibold">
                    <Phone className="w-3.5 h-3.5" /> Order on WhatsApp instead
                  </a>
                )}
              </div>
            )}

            {/* 1. Customer & Shipping Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 pb-2 border-b border-neutral-800 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>1. Australian Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={LABEL}>Full Name *</label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lachlan Murdoch"
                    className={INPUT}
                  />
                </div>

                <div className="space-y-1">
                  <label className={LABEL}>Email Address *</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    aria-invalid={Boolean(fieldErrors.email)}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={INPUT}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={LABEL}>Mobile number *</label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel-national"
                    inputMode="tel"
                    maxLength={30}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0412 345 678"
                    className={INPUT}
                  />
                </div>

                <div className="space-y-1">
                  <label className={LABEL}>Street Address *</label>
                  <input
                    type="text"
                    required
                    autoComplete="address-line1"
                    maxLength={150}
                    aria-invalid={Boolean(fieldErrors.address)}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Level 14, 1 Bligh Street"
                    className={INPUT}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className={LABEL}>Suburb / City *</label>
                  <input
                    type="text"
                    required
                    autoComplete="address-level2"
                    maxLength={60}
                    aria-invalid={Boolean(fieldErrors.city)}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Sydney"
                    className={INPUT}
                  />
                </div>

                <div className="space-y-1">
                  <label className={LABEL}>State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={INPUT}
                  >
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={LABEL}>Postcode *</label>
                  <input
                    type="text"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    aria-invalid={Boolean(fieldErrors.postcode)}
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="2000"
                    className={INPUT}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={LABEL}>Courier Delivery Notes / Gate Code (Optional)</label>
                <input
                  type="text"
                  maxLength={300}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Leave with building concierge if unattended"
                  className={INPUT}
                />
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 pb-2 border-b border-neutral-800 flex items-center justify-between">
                <span>2. Choose how to pay</span>
                <span className="text-emerald-400 text-[11px] font-bold">
                  12% off with crypto
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CHECKOUT_PAYMENT_METHODS.map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-950/70 border-amber-500 text-amber-100 shadow-md'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm">
                          {method.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            method.type === 'crypto'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {method.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1.5 leading-snug">
                        {method.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct CopyField Details for Selected Method */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-amber-900/40 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                {currentPayment.type === 'crypto' ? 'Crypto payment' : 'Payment details (tap to copy)'}
              </span>

              {paymentMethod === 'payid' && (
                <CopyField
                  label="Official Doctors of Whisky PayID"
                  value="payments@doctorsofwhisky.com.au"
                />
              )}

              {paymentMethod === 'bank-transfer' && (
                <div className="space-y-2">
                  <CopyField label="BSB Number" value="082-057" />
                  <CopyField label="Account Number" value="9482-11049" />
                  <CopyField label="Account Name" value="Doctors of Whisky Pty Ltd" mono={false} />
                </div>
              )}

              {currentPayment.type === 'crypto' && (
                <div className="space-y-2">
                  <div className="text-[11px] text-emerald-400 font-bold">
                    ✓ 12% Instant Savings Applied: -${cryptoDiscountAmount.toFixed(2)} AUD
                  </div>
                  <p className="text-xs text-neutral-300">After you place the order you go straight to the crypto payment page: choose Bitcoin, USDT (TRC20) or USDT (ERC20), scan the QR code or copy the address, pay, then upload your screenshot.</p>
                </div>
              )}
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>

            {/* Mandatory Age Confirmation Checkbox */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.ageConfirmed}
                  onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-neutral-200 leading-snug">
                  I confirm that I am <strong>18 years of age or older</strong> and agree to show valid photo identification upon courier delivery (NSW Liquor Act 2007 / Victorian Liquor Control Reform Act 1998).
                </span>
              </label>
            </div>
          </form>

          {/* Right Column: Order Summary & Placement (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800/80">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-neutral-100 pb-2 border-b border-neutral-800">
                Order Summary ({items.length} {items.length === 1 ? 'bottle' : 'bottles'})
              </h3>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center text-xs text-neutral-300 py-1"
                  >
                    <span className="truncate pr-2">
                      {item.product.name} (×{item.quantity})
                    </span>
                    <span className="font-mono text-neutral-200 shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString()} AUD
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-200">
                    ${subtotal.toLocaleString()} AUD
                  </span>
                </div>

                {isCryptoPayment && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>12% Crypto Discount</span>
                    <span className="font-mono">
                      -${cryptoDiscountAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} AUD
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Australia Express Courier</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingFee} AUD`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-neutral-100 pt-3 border-t border-neutral-800">
                  <span>Total Due</span>
                  <span className="text-amber-400 font-mono">
                    ${finalTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} AUD
                  </span>
                </div>
                <p className="text-right text-neutral-400">
                  Includes GST of <span className="font-mono text-neutral-200">${(finalTotal / 11).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3">
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/60 transition-all active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Placing your order...' : isCryptoPayment ? 'Continue to crypto payment' : 'Confirm Order & Generate Reference'}
              </button>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sydney Vault Guaranteed · 100% Transit Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
