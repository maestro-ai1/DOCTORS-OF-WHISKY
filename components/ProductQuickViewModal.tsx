'use client';

import React, { useState } from 'react';
import { waText } from '@/lib/whatsapp';
import Image from 'next/image';
import Link from '@/components/AppLink';
import { Product } from '@/lib/types';
import { productAlt } from '@/lib/alt';
import { CONTACT } from '@/lib/config';
import { useCart } from '@/lib/context/CartContext';
import { X, ShoppingBag, Phone, ShieldCheck, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const cryptoPrice = product.price * 0.88;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const msg = waText([
      'Hi Doctors of Whisky, I would like to order:',
      `*${product.name}* (Qty: ${quantity})`,
      `Price: $${(product.price * quantity).toLocaleString()} AUD`,
      `SKU: ${product.sku}`,
      `Link: https://doctorsofwhisky.com.au/shop/${product.category}/${product.slug}`,
      '',
      'Please confirm availability and dispatch steps.',
    ]);

    window.open(
      `https://wa.me/${CONTACT.whatsappNumber}?text=${msg}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-amber-800/50 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Images */}
        <div className="md:w-1/2 p-6 bg-neutral-900/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white">
            <Image
              src={product.images[activeImgIdx] || product.images[0]}
              alt={productAlt(product)}
              fill
              className="object-contain object-center p-4"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/90 border border-amber-600/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Image Thumbnails if more than 1 */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show photo ${idx + 1} of ${product.name}`}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border bg-white ${
                    activeImgIdx === idx ? 'border-amber-500' : 'border-neutral-800 opacity-60'
                  }`}
                >
                  <Image src={img} alt={`${product.name} - photo ${idx + 1}`} fill className="object-contain p-0.5" />
                </button>
              ))}
            </div>
          )}

          {/* Provenance Pill */}
          <div className="mt-4 p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5 text-xs text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sydney Climate Vault Storage (14°C) · 100% Provenance Seal</span>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-500">
              {product.brand} • {product.category.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100">
              {product.name}
            </h2>
          </div>

          {/* Quick specs grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs">
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Country</span>
              <span className="text-neutral-200 font-medium">{product.country}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">ABV / Size</span>
              <span className="text-neutral-200 font-medium">{product.abv} / {product.size}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Age / Release</span>
              <span className="text-amber-400 font-medium">{product.age || 'Vintage'}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-400 leading-relaxed">
            {product.description}
          </p>

          {/* Tasting Notes */}
          {product.tastingNotes && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 space-y-2 text-xs">
              <h4 className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">
                Sommelier Tasting Notes
              </h4>
              <p><strong className="text-neutral-300">Nose:</strong> <span className="text-neutral-400">{product.tastingNotes.nose}</span></p>
              <p><strong className="text-neutral-300">Palate:</strong> <span className="text-neutral-400">{product.tastingNotes.palate}</span></p>
              <p><strong className="text-neutral-300">Finish:</strong> <span className="text-neutral-400">{product.tastingNotes.finish}</span></p>
            </div>
          )}

          {/* Price Box */}
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Price</span>
              <span className="text-2xl font-serif font-bold text-neutral-100">
                ${product.price.toLocaleString()} <span className="text-xs font-sans text-neutral-400">AUD</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400 block">
                Crypto: ${cryptoPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
              </span>
              <span className="text-[10px] text-emerald-500/80">Save 12% via BTC / USDT</span>
            </div>
          </div>

          {/* Quantity selector and Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-neutral-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-neutral-200">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-neutral-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (${(product.price * quantity).toLocaleString()} AUD)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="py-2.5 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Order via WhatsApp</span>
              </button>

              <Link
                href={`/shop/${product.category}/${product.slug}`}
                onClick={onClose}
                className="py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 text-center"
              >
                <span>Full Page Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
