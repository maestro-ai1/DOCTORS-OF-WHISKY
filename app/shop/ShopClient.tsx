'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { searchProducts } from '@/lib/search';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { useWishlist } from '@/lib/context/WishlistContext';
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  ArrowUpDown,
  Wine,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialCountry = searchParams.get('country') || 'all';
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialBadge = searchParams.get('badge') || 'all';
  const initialWishlist = searchParams.get('wishlist') === 'true';

  const [category, setCategory] = useState<string>(initialCategory);
  const [brand, setBrand] = useState<string>(initialBrand);
  const [country, setCountry] = useState<string>(initialCountry);
  const [badge, setBadge] = useState<string>(initialBadge);
  const [search, setSearch] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(initialWishlist);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { wishlist } = useWishlist();

  // Extract filter options dynamically
  const brands = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort(), []);
  const countries = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.country))).sort(), []);

  // Filtered Products
  const searchIds = useMemo(() => (search.trim() ? new Set(searchProducts(PRODUCTS, search).map((p) => p.id)) : null), [search]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist check
      if (showWishlistOnly && !wishlist.includes(product.id)) return false;

      // Category check
      if (category !== 'all' && product.category !== category) return false;

      // Brand check
      if (brand !== 'all' && product.brand !== brand) return false;

      // Country check
      if (country !== 'all' && product.country !== country) return false;

      // Badge check
      if (badge !== 'all' && product.badge !== badge) return false;

      // Price range check
      if (priceRange === 'under-500' && product.price >= 500) return false;
      if (priceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
      if (priceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
      if (priceRange === 'over-2500' && product.price <= 2500) return false;

      // Search text check
      if (search.trim()) {
        if (!searchIds || !searchIds.has(product.id)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [category, brand, country, badge, priceRange, search, searchIds, sortBy, showWishlistOnly, wishlist]);

  const resetFilters = () => {
    setCategory('all');
    setBrand('all');
    setCountry('all');
    setBadge('all');
    setPriceRange('all');
    setSearch('');
    setShowWishlistOnly(false);
  };

  const isFilterActive =
    category !== 'all' ||
    brand !== 'all' ||
    country !== 'all' ||
    badge !== 'all' ||
    priceRange !== 'all' ||
    search !== '' ||
    showWishlistOnly;

  return (
    <div className="min-h-screen bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-bold">
                Australia&apos;s Fine Spirits Catalog
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
              {showWishlistOnly ? 'Your Saved Vault Bottles' : 'Rare Spirits & Collectable Whiskies'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl font-light">
              Showing {filteredProducts.length} authenticated bottles stored in our Sydney climate vaults. Eligible for 12% Crypto discount &amp; free Australian transit over $1,500 AUD.
            </p>
          </div>

          {/* Quick Search & Sort Control */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by keyword..."
                className="pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-neutral-950">Curated / Featured</option>
                <option value="price-low" className="bg-neutral-950">Price: Low to High</option>
                <option value="price-high" className="bg-neutral-950">Price: High to Low</option>
                <option value="name" className="bg-neutral-950">Name: A to Z</option>
              </select>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/70 border border-amber-800/60 text-amber-300 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Sidebar (Desktop) */}
          <aside
            className={`lg:col-span-3 space-y-6 bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800/80 h-fit ${
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Refine Selection</span>
              </span>
              {isFilterActive && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-neutral-400 hover:text-amber-300 transition-colors"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* 1. Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-200 block uppercase tracking-wider">
                Category
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'whisky', label: 'Whisky (Single Malts & Blends)' },
                  { id: 'spirit', label: 'Spirits (Cognac, Tequila, Gin)' },
                  { id: 'beer-premix-wine', label: 'Beer, Premix & Wine' },
                  { id: 'other', label: 'Other & Specialty' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      category === item.id
                        ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/50'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Tier */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-200 block uppercase tracking-wider">
                Price (AUD)
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Price Tiers' },
                  { id: 'under-500', label: 'Under $500 AUD' },
                  { id: '500-1000', label: '$500 – $1,000 AUD' },
                  { id: '1000-2500', label: '$1,000 – $2,500 AUD' },
                  { id: 'over-2500', label: 'Over $2,500 (Vault Reserve)' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPriceRange(tier.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      priceRange === tier.id
                        ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/50'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Brand */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-200 block uppercase tracking-wider">
                Distillery / Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Brands ({brands.length})</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Country of Origin */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-200 block uppercase tracking-wider">
                Country of Origin
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Rarity Badges */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-200 block uppercase tracking-wider">
                Collector Badge
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Editions' },
                  { id: 'RARE VAULT', label: 'Rare Vault' },
                  { id: 'COLLECTOR RELEASE', label: 'Collector Release' },
                  { id: 'LIMITED EDITION', label: 'Limited Edition' },
                  { id: 'AUSTRALIAN ICON', label: 'Australian Icon' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBadge(b.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      badge === b.id
                        ? 'bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/50'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wishlist Toggle Button */}
            <div className="pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                  showWishlistOnly
                    ? 'bg-amber-600 text-neutral-950 border-amber-500'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                }`}
              >
                <span>Saved Wishlist Bottles</span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-950/40 text-[10px] font-bold">
                  {wishlist.length}
                </span>
              </button>
            </div>
          </aside>

          {/* Right Product Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 mx-auto flex items-center justify-center text-neutral-500">
                  <Wine className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-200">
                  No Bottles Found Matching Criteria
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Try adjusting your filters or search keywords. Our private concierge can also source specific allocations on request.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard
                      product={product}
                      onQuickView={(p) => setSelectedProduct(p)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 p-12 text-center text-neutral-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
