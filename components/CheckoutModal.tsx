'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { PAYMENT_METHODS, CONTACT, SHOP_RULES } from '@/lib/config';
import { CopyField } from '@/components/CopyField';
import {
  X,
  ShieldCheck,
  CreditCard,
  Building,
  Coins,
  CheckCircle,
  Truck,
  Phone,
  Lock,
} from 'lucide-react';

export function CheckoutModal() {
  const router = useRouter();
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
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

  if (!isCheckoutOpen) return null;

  const currentPayment =
    PAYMENT_METHODS.find((p) => p.id === paymentMethod) || PAYMENT_METHODS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.postcode) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    if (!formData.ageConfirmed) {
      setErrorMsg('You must confirm you are 18 years or older as required by Australian liquor laws.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate Order ID
      const orderRef = `DOW-${Math.floor(100000 + Math.random() * 900000)}`;

      // Post order details to API
      const orderPayload = {
        orderRef,
        items,
        subtotal,
        shippingFee,
        cryptoDiscountAmount,
        finalTotal,
        paymentMethod: currentPayment.name,
        customer: formData,
        createdAt: new Date().toISOString(),
      };

      try {
        await fetch('/api/order/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
      } catch (err) {
        console.warn('Backend order recording non-critical fallback:', err);
      }

      // Store in session storage for thank-you page
      sessionStorage.setItem('dow_last_order', JSON.stringify(orderPayload));

      clearCart();
      closeCheckout();
      router.push(`/thank-you-order?ref=${orderRef}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred. Please try again or order directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-amber-800/60 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-neutral-100">
                Secure Australian Vault Checkout
              </h2>
              <p className="text-xs text-neutral-400">
                Encrypted &amp; Insured Transit · Sydney CBD Dispatch
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details (7 cols) */}
          <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            {/* 1. Customer & Shipping Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 pb-2 border-b border-neutral-800 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>1. Australian Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lachlan Murdoch"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sales@doctorsofwhisky.com.au"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Mobile Phone (18+ SMS alerts) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0420 128 746"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Level 14, 1 Bligh Street"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Suburb / City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Sydney"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
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
                  <label className="text-xs text-neutral-400">Postcode *</label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="2000"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Courier Delivery Notes / Gate Code (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Leave with building concierge if unattended"
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 pb-2 border-b border-neutral-800 flex items-center justify-between">
                <span>2. Select Payment Gateway</span>
                <span className="text-emerald-400 text-[10px] font-bold">
                  12% Off via BTC / USDT
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PAYMENT_METHODS.map((method) => {
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
                        <span className="font-serif font-bold text-xs">
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
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-snug">
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
                Direct Settlement Account Details (Click to Copy):
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

              {paymentMethod === 'crypto-btc' && (
                <div className="space-y-2">
                  <div className="text-[11px] text-emerald-400 font-bold">
                    ✓ 12% Instant Savings Applied: -${cryptoDiscountAmount.toFixed(2)} AUD
                  </div>
                  <CopyField
                    label="Bitcoin (BTC) Official Treasury Address"
                    value="bc1qdow9837xvhqlz82m4k70wje9x30198klpq79vd"
                  />
                </div>
              )}

              {paymentMethod === 'crypto-usdt' && (
                <div className="space-y-2">
                  <div className="text-[11px] text-emerald-400 font-bold">
                    ✓ 12% Instant Savings Applied: -${cryptoDiscountAmount.toFixed(2)} AUD
                  </div>
                  <CopyField
                    label="Tether (USDT - ERC20 / TRC20) Treasury Address"
                    value="0x8b30De7397b8F27B88C419eD9C83f789C065799A"
                  />
                </div>
              )}
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
                <span className="text-xs text-neutral-300 leading-tight">
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
                {isSubmitting ? 'Securing Allocation...' : 'Confirm Order & Generate Reference'}
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
