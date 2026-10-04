'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/types';
import { SITE, CONTACT, SHOP_RULES, PAYMENT_METHODS } from '@/lib/config';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  isMinOrderMet: boolean;
  minOrderShortfall: number;
  isFreeShipping: boolean;
  shippingFee: number;
  freeShippingProgress: number;
  freeShippingShortfall: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  isCryptoPayment: boolean;
  cryptoDiscountAmount: number;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getWhatsAppOrderUrl: (customNotes?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(SITE.cartKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('payid');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isMinOrderMet = subtotal >= SHOP_RULES.minOrder || subtotal === 0;
  const minOrderShortfall = Math.max(0, SHOP_RULES.minOrder - subtotal);

  const isFreeShipping = subtotal >= SHOP_RULES.freeShippingThreshold;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : SHOP_RULES.shippingFee;
  const freeShippingProgress = Math.min(
    100,
    (subtotal / SHOP_RULES.freeShippingThreshold) * 100
  );
  const freeShippingShortfall = Math.max(
    0,
    SHOP_RULES.freeShippingThreshold - subtotal
  );

  const isCryptoPayment =
    paymentMethod.startsWith('crypto-');
  const cryptoDiscountAmount = isCryptoPayment
    ? (subtotal * SHOP_RULES.cryptoDiscountPercent) / 100
    : 0;

  const finalTotal = Math.max(0, subtotal - cryptoDiscountAmount + shippingFee);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const getWhatsAppOrderUrl = (customNotes?: string) => {
    const itemListText = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (Qty: ${item.quantity}) - $${(
            item.product.price * item.quantity
          ).toLocaleString()} AUD`
      )
      .join('\n');

    const paymentLabel =
      PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || paymentMethod;

    const discountText = isCryptoPayment
      ? `\n*12% Crypto Savings:* -$${cryptoDiscountAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} AUD`
      : '';

    const shippingText =
      shippingFee === 0
        ? 'FREE (Express Insured Courier over $1,500 AUD)'
        : `$${shippingFee} AUD (Flat-rate Courier)`;

    const message = `*NEW ORDER INQUIRY - DOCTORS OF WHISKY*
----------------------------------------
*Items Requested:*
${itemListText}
----------------------------------------
*Subtotal:* $${subtotal.toLocaleString()} AUD${discountText}
*Shipping:* ${shippingText}
*Total Due:* $${finalTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} AUD

*Preferred Payment Method:* ${paymentLabel}
${customNotes ? `*Customer Notes:* ${customNotes}\n` : ''}
*Delivery Location:* Australia
*Age Confirmation:* I confirm I am 18+ years of age.

Please confirm bottle availability, transit insurance, and provide payment dispatch instructions.`;

    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
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
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
