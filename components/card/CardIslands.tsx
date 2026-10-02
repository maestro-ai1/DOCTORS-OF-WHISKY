'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { CONTACT } from '@/lib/config';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Phone, Heart } from 'lucide-react';

/** Wishlist heart: the only part of the card image area that needs JavaScript. */
export function WishlistHeart({ productId }: { productId: string }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(productId);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
        isFavorite ? 'bg-amber-600 text-neutral-950' : 'bg-neutral-950/70 hover:bg-neutral-900 text-neutral-300 hover:text-amber-400'
      }`}
      aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className="w-4 h-4 fill-current" />
    </button>
  );
}

/** Add to cart and WhatsApp buttons. */
export function CardActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi Doctors of Whisky, I would like to order/reserve:
*${product.name}*
Price: $${product.price.toLocaleString()} AUD
SKU: ${product.sku}
Link: https://doctorsofwhisky.com.au/shop/${product.category}/${product.slug}

Please confirm vault availability and payment instructions.`;
    window.open(`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="grid grid-cols-2 gap-2 pt-2">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product, 1);
        }}
        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wide shadow-md transition-all active:scale-95"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to Cart</span>
      </button>
      <button
        type="button"
        onClick={handleWhatsAppOrder}
        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 font-semibold text-xs transition-colors"
        title="Order or Inquire directly on WhatsApp"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}
