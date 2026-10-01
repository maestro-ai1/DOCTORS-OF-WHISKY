'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { SHOP_RULES, PAYMENT_METHODS, CONTACT } from '@/lib/config';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  AlertCircle,
  Truck,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Coins,
} from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    isMinOrderMet,
    minOrderShortfall,
    isFreeShipping,
    shippingFee,
    freeShippingProgress,
    freeShippingShortfall,
    paymentMethod,
    setPaymentMethod,
    isCryptoPayment,
    cryptoDiscountAmount,
    finalTotal,
    openCheckout,
    getWhatsAppOrderUrl,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-amber-900/40 text-neutral-100 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-neutral-100">
                  Your Vault Allocation
                </h3>
                <span className="text-[11px] text-neutral-400">
                  {items.length} {items.length === 1 ? 'bottle' : 'bottles'} selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                {isFreeShipping ? (
                  <strong className="text-emerald-400">FREE Australia-Wide Express Shipping Unlocked!</strong>
                ) : (
                  <span>Add <strong>${freeShippingShortfall.toLocaleString()} AUD</strong> for FREE Shipping</span>
                )}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                ${SHOP_RULES.freeShippingThreshold.toLocaleString()} AUD
              </span>
            </div>

            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Min Order Warning if under $300 */}
          {!isMinOrderMet && items.length > 0 && (
            <div className="p-3.5 bg-red-950/40 border-b border-red-900/50 flex items-start gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Minimum Order Requirement:</strong> Doctors of Whisky operates with a minimum order of <strong>${SHOP_RULES.minOrder} AUD</strong>. Please add <strong>${minOrderShortfall.toLocaleString()} AUD</strong> more to proceed with checkout.
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-neutral-400">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-neutral-200 text-base">
                    Your allocation cart is empty
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Explore our rare Speyside malts, Japanese pure malts, and collectible spirits in the vault.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Browse Vault Catalog
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex gap-3.5 items-center group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border border-neutral-800">
                    <Image
                      src={item.product.images[0]}
                      alt={`${item.product.name} ${item.product.size}`}
                      fill
                      className="object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-serif font-bold text-neutral-100 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-amber-500 font-mono">
                        ${item.product.price.toLocaleString()} AUD
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-700 rounded bg-neutral-950">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-[11px] font-bold text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Payment Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-4">
              {/* Payment Method Selector (with 12% Crypto Discount Highlight) */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 flex items-center justify-between">
                  <span>Payment Gateway</span>
                  <span className="text-emerald-400 text-[10px] font-bold">
                    12% Off via Crypto
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-2 rounded-lg text-left border transition-all ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200 font-semibold'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate text-[11px]">{method.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-neutral-900 pt-3">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-200">
                    ${subtotal.toLocaleString()} AUD
                  </span>
                </div>

                {isCryptoPayment && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      12% Crypto Discount
                    </span>
                    <span className="font-mono">
                      -${cryptoDiscountAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} AUD
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Australia Express Transit</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingFee} AUD`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-neutral-100 pt-2 border-t border-neutral-800">
                  <span>Estimated Total Due</span>
                  <span className="text-amber-400 font-mono">
                    ${finalTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} AUD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Secure Checkout Button */}
                <button
                  type="button"
                  onClick={openCheckout}
                  disabled={!isMinOrderMet}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isMinOrderMet
                      ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 shadow-amber-950/60 active:scale-98'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <span>Proceed to PayID / Bank / Crypto Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct WhatsApp Order Link */}
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Instant Order via WhatsApp (+61420128746)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
