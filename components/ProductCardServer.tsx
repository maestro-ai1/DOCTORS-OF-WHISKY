import React from 'react';
import Image from 'next/image';
import Link from '@/components/AppLink';
import { Product } from '@/lib/types';
import { productAlt } from '@/lib/alt';
import { Sparkles } from 'lucide-react';
import { CardActions, WishlistHeart } from '@/components/card/CardIslands';

interface Props {
  product: Product;
  /** keyword used in the image alt instead of the product's own primary (collection pages pass the collection keyword) */
  altKeyword?: string;
  /** first cards on a page: load the image eagerly (it is usually the LCP element) */
  priority?: boolean;
}

/**
 * Same card as ProductCard, rendered on the server. Only the wishlist heart and the add-to-cart / WhatsApp buttons are client
 * components, so a collection page with dozens of bottles hydrates a few small islands instead of every card.
 */
/** Only what the cart, checkout and WhatsApp message use, so each card ships a few hundred bytes of data, not the whole product. */
const cartFields = (p: Product) =>
  ({ id: p.id, name: p.name, slug: p.slug, category: p.category, sku: p.sku, price: p.price, size: p.size, brand: p.brand, images: p.images.slice(0, 1) }) as Product;

export function ProductCardServer({ product, altKeyword, priority }: Props) {
  const cryptoPrice = product.price * 0.88; // 12% discount
  const href = `/shop/${product.category}/${product.slug}`;
  return (
    <div className="group relative flex flex-col h-full bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-700/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/70">
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
        <Link href={href} className="block w-full h-full">
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

        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <WishlistHeart productId={product.id} />
        </div>

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

      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-amber-500/90">{product.brand}</span>
          <span className="text-[11px] text-neutral-400">{product.size}</span>
        </div>

        <Link href={href} className="block group-hover:text-amber-300 transition-colors">
          <h3 className="font-serif font-bold text-base text-neutral-100 leading-snug line-clamp-2">{product.name}</h3>
        </Link>

        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed flex-1">{product.description}</p>

        <div className="pt-2 border-t border-neutral-800/80">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">Vault Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-serif font-bold text-neutral-100">
                  ${product.price.toLocaleString()} <span className="text-xs font-sans text-neutral-400">AUD</span>
                </span>
                {product.originalPrice && <span className="text-xs line-through text-neutral-400">${product.originalPrice.toLocaleString()}</span>}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                Crypto: ${cryptoPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} AUD
              </span>
              <span className="text-[10px] text-emerald-500/80 font-mono">(12% Off)</span>
            </div>
          </div>
        </div>

        <CardActions product={cartFields(product)} />
      </div>
    </div>
  );
}
