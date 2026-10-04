'use client';

import React from 'react';
import Image from 'next/image';
import Link from '@/components/AppLink';
import { Product } from '@/lib/types';
import { productAlt } from '@/lib/alt';
import { CONTACT } from '@/lib/config';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Phone, Heart, Eye, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  /** keyword used in the image alt instead of the product's own primary (collection pages pass the collection keyword) */
  altKeyword?: string;
  /** first cards on a page: load the image eagerly (it is usually the LCP element) */
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, altKeyword, priority }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const cryptoPrice = product.price * 0.88; // 12% discount

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi Doctors of Whisky, I would like to order/reserve:
*${product.name}*
Price: $${product.price.toLocaleString()} AUD
SKU: ${product.sku}
Link: https://doctorsofwhisky.com.au/shop/${product.category}/${product.slug}

Please confirm vault availability and payment instructions.`;

    window.open(
      `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-700/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/70">
      {/* Top Image Container (4:3 ratio) */}
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
        <Link href={`/shop/${product.category}/${product.slug}`} className="block w-full h-full">
          <Image
            priority={priority}
            src={product.images[0]}
            alt={productAlt(product, altKeyword)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-600/60 text-amber-300 text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {product.badge}
            </span>
          )}
          {product.stock <= 2 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-950/90 border border-red-700/60 text-red-300 text-[10px] font-semibold">
              Only {product.stock} Left in Vault
            </span>
          )}
        </div>

        {/* Wishlist and Quick View Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite
                ? 'bg-amber-600 text-neutral-950'
                : 'bg-neutral-950/70 hover:bg-neutral-900 text-neutral-300 hover:text-amber-400'
            }`}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="p-2 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-neutral-300 hover:text-amber-400 backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100"
              aria-label="Quick View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Origin / Age Flag Pill */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 text-[10px] text-neutral-300 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-neutral-800">
          {product.country && <span>{product.country}</span>}
          {product.age && (
            <>
              {product.country && <span className="text-neutral-600">•</span>}
              <span className="text-amber-400 font-semibold">{product.age}</span>
            </>
          )}
          {product.abv && (
            <>
              {(product.country || product.age) && <span className="text-neutral-600">•</span>}
              <span>{product.abv}</span>
            </>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-amber-500/90">
            {product.brand}
          </span>
          <span className="text-[11px] text-neutral-400">{product.size}</span>
        </div>

        {/* Title */}
        <Link href={`/shop/${product.category}/${product.slug}`} className="block group-hover:text-amber-300 transition-colors">
          <h3 className="font-serif font-bold text-base text-neutral-100 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Short summary or tasting highlight */}
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price Box */}
        <div className="pt-2 border-t border-neutral-800/80">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                Vault Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-serif font-bold text-neutral-100">
                  ${product.price.toLocaleString()} <span className="text-xs font-sans text-neutral-400">AUD</span>
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-neutral-400">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                Crypto: ${cryptoPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
              </span>
              <span className="text-[10px] text-emerald-500/80 font-mono">
                (12% Off)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Buy via WhatsApp */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
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
      </div>
    </div>
  );
}
