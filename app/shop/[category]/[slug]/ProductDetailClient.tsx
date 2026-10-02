'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { CONTACT, SHOP_RULES } from '@/lib/config';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import {
  ShoppingBag,
  Phone,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  Plus,
  Minus,
  Coins,
  Warehouse,
  ChevronRight,
  CheckCircle,
  Share2,
  HelpCircle,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const cryptoPrice = product.price * 0.88; // 12% discount
  const isFreeShipEligible = product.price * quantity >= SHOP_RULES.freeShippingThreshold;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hi Doctors of Whisky, I would like to order/reserve:
*${product.name}* (Qty: ${quantity})
Price: $${(product.price * quantity).toLocaleString()} AUD
SKU: ${product.sku}
Link: https://doctorsofwhisky.com.au/shop/${product.category}/${product.slug}

Please confirm bottle condition, vault availability, and payment dispatch instructions.`;

    window.open(
      `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/shop" className="hover:text-amber-300 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-amber-300 transition-colors uppercase"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-200 font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Gallery & Vault Badges (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image (4:3 canvas) */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-neutral-800 shadow-2xl">
              <Image
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={`${product.name} ${product.size} ${product.style || product.subCategory} bottle - ${product.primaryKeyword}`}
                fill
                priority
                className="object-contain object-center p-8"
                referrerPolicy="no-referrer"
              />

              {/* Rarity Badge Overlay */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/90 border border-amber-600/70 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Share & Wishlist Buttons */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 hover:text-amber-300 backdrop-blur-md border border-neutral-800 transition-colors"
                  aria-label="Copy bottle link"
                >
                  {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md border border-neutral-800 transition-colors ${
                    isFavorite
                      ? 'bg-amber-600 text-neutral-950 border-amber-500'
                      : 'bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 hover:text-amber-300'
                  }`}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Show photo ${idx + 1} of ${product.name}`}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 bg-white transition-all ${
                      selectedImgIdx === idx
                        ? 'border-amber-500 scale-98 shadow-md'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} photo ${idx + 1} - ${product.secondaryKeywords[idx % Math.max(1, product.secondaryKeywords.length)] ?? product.primaryKeyword}`} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Sydney Vault Provenance Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-serif font-bold text-neutral-100">
                    Sydney Vault Provenance &amp; Seal Guarantee
                  </p>
                  <p className="text-xs text-neutral-400">
                    Inspected and certified by Doctors of Whisky Sommeliers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <Warehouse className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cellar: 14°C / 65% Humidity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Insured Shockproof Transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-500 font-bold uppercase tracking-widest">
                  {product.brand}
                </span>
                <span className="font-mono text-neutral-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.vintage && (
                <span className="inline-block text-xs font-semibold text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
                  Edition: {product.vintage}
                </span>
              )}
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-xs">
              {product.country && (
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Origin</span>
                  <span className="text-neutral-200 font-medium">{product.country}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Region / Style</span>
                <span className="text-neutral-200 font-medium">{product.region || product.style || product.subCategory}</span>
              </div>
              {(product.age || product.country) && (
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Age / Vintage</span>
                  <span className="text-amber-400 font-medium">{product.age || 'Special Release'}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block font-semibold">{product.abv ? 'ABV & Size' : 'Size'}</span>
                <span className="text-neutral-200 font-medium">{[product.abv, product.size].filter(Boolean).join(' • ')}</span>
              </div>
            </div>

            {/* Price Box with 12% Crypto Discount Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-amber-950/30 border border-amber-800/50 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                    Vault Reserve Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
                      ${product.price.toLocaleString()} <span className="text-sm font-sans text-neutral-400 font-normal">AUD</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-neutral-400">
                        ${product.originalPrice.toLocaleString()} AUD
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-lg">
                    <Coins className="w-3.5 h-3.5" />
                    <span>Crypto: ${cryptoPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD</span>
                  </span>
                  <span className="text-[11px] text-emerald-500/80 block mt-1 font-mono">
                    Save ${(product.price * 0.12).toFixed(2)} AUD instantly
                  </span>
                </div>
              </div>

              {/* Free Courier shipping tag */}
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  {isFreeShipEligible ? (
                    <strong className="text-emerald-400">Eligible for FREE Express Australia-Wide Courier</strong>
                  ) : (
                    <span>Add $75 Flat Courier or reach $1,500 AUD for Free Courier</span>
                  )}
                </span>
                <span className="text-emerald-400 font-bold">
                  {product.stock > 0 ? 'In Stock (Sydney Vault)' : 'Allocation Reserved'}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Main Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-700 rounded-xl bg-neutral-900 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-neutral-400 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-neutral-100">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 text-neutral-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-950/60 flex items-center justify-center gap-2.5 transition-all transform active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Vault Cart (${(product.price * quantity).toLocaleString()} AUD)</span>
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Order or Inquire Directly on WhatsApp (+61420128746)</span>
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2">
              <h2 className="font-serif font-bold text-lg text-neutral-100">
                {product.primaryKeyword.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}: {product.name} bottle details
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {product.description}
              </p>
              {product.longDescription?.map((para, i) => (
                <p key={i} className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </div>

            {/* Sommelier Tasting Notes */}
            {product.tastingNotes && (
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-3 text-xs sm:text-sm">
                <h3 className="font-serif font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Master Sommelier Tasting Notes</span>
                </h3>
                <div className="space-y-2 pt-1">
                  <p>
                    <strong className="text-amber-300 uppercase tracking-wider text-xs block">Nose</strong>
                    <span className="text-neutral-300 font-light">{product.tastingNotes.nose}</span>
                  </p>
                  <p>
                    <strong className="text-amber-300 uppercase tracking-wider text-xs block">Palate</strong>
                    <span className="text-neutral-300 font-light">{product.tastingNotes.palate}</span>
                  </p>
                  <p>
                    <strong className="text-amber-300 uppercase tracking-wider text-xs block">Finish</strong>
                    <span className="text-neutral-300 font-light">{product.tastingNotes.finish}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="pt-12 border-t border-neutral-900 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                Common Questions
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Frequently asked questions about {product.name}</span>
              </h2>
            </div>

            <div className="space-y-3">
              {product.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/90 open:border-amber-700/50 p-5 transition-colors"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base font-serif font-bold text-neutral-100 group-open:text-amber-300">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 text-neutral-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Related Allocations Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-neutral-900 space-y-8">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                You May Also Consider
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-100">
                Related Collector Allocations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="h-full">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
