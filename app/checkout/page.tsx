'use client';

import Link from 'next/link';
import { CheckoutForm } from '@/components/CheckoutForm';
import { useCart } from '@/lib/context/CartContext';

export default function CheckoutPage() {
  const { items, cartReady } = useCart();
  if (!cartReady) return <div className="min-h-[60vh]" aria-busy="true" />;
  // The cart is read from localStorage after the page loads, so an empty cart is only shown once there is nothing to check out.
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif font-bold text-2xl text-neutral-100">Your cart is empty</h1>
        <p className="text-neutral-400">Add a bottle to your cart, then come back to check out.</p>
        <Link href="/shop/" className="inline-block px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold">Browse the shop</Link>
      </div>
    );
  }
  return <CheckoutForm />;
}
