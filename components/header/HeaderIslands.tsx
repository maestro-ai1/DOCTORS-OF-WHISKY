'use client';

import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';

/** The only two parts of the header that need JavaScript: they read the cart and wishlist. */
export function HeaderWishlistLink() {
  const { wishlist } = useWishlist();
  return (
    <a
      href="/shop/?wishlist=true"
      className="relative p-2.5 rounded-lg text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 transition-colors hidden sm:flex items-center"
      aria-label="View Wishlist"
    >
      <Heart className="w-5 h-5" />
      {wishlist.length > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-600 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
          {wishlist.length}
        </span>
      )}
    </a>
  );
}

export function HeaderCartButton() {
  const { totalItemCount, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-950/40"
      aria-label={`Open Cart (${totalItemCount} items)`}
    >
      <ShoppingBag className="w-4 h-4" />
      <span className="hidden sm:inline">Cart</span>
      {totalItemCount > 0 && (
        <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 text-xs font-bold flex items-center justify-center">{totalItemCount}</span>
      )}
    </button>
  );
}
