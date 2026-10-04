'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/components/AppLink';
import { useRouter } from 'next/navigation';
import { SITE, CONTACT } from '@/lib/config';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { MegaMenu } from '@/components/MegaMenu';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Wine,
  Phone,
  Sparkles,
} from 'lucide-react';

export function Header({ announcement }: { announcement?: React.ReactNode }) {
  const router = useRouter();
  const { totalItemCount, openCart } = useCart();
  const { wishlist } = useWishlist();

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>('whisky');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-amber-900/30 transition-shadow duration-200 shadow-lg shadow-black/40">
      {/* Announcement Bar */}
      {announcement}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-950 via-neutral-900 to-amber-900 border border-amber-600/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400/80 transition-all shadow-md">
              <Wine className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 group-hover:text-amber-200 transition-colors">
                {SITE.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-500/90 font-medium">
                Fine Spirits &amp; Rare Malts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Simple Shop Link */}
            <Link
              href="/shop"
              className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/60 transition-colors rounded-md"
            >
              Shop
            </Link>

            {MAIN_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setActiveMegaCategory(cat.id)}
              >
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md ${
                    activeMegaCategory === cat.id
                      ? 'text-amber-300 bg-neutral-900'
                      : 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/60'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, WhatsApp, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop?wishlist=true"
              className="relative p-2.5 rounded-lg text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 transition-colors hidden sm:flex items-center"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-600 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Direct WhatsApp Quick Contact Button */}
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
                'Hi Doctors of Whisky, I would like to inquire about bottle availability in your Sydney vault.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition-colors"
              title="Order or Inquire via WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">WhatsApp Order</span>
            </a>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-amber-950/40"
              aria-label={`Open Cart (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 text-xs font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MegaMenu Dropdown for Desktop */}
      <MegaMenu
        activeCategory={activeMegaCategory}
        onClose={() => setActiveMegaCategory(null)}
      />

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="bg-neutral-900 border-b border-amber-900/40 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rare whiskies, brands (Macallan, Nikka, GlenDronach), vintage, tequila, cognac..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100 placeholder-neutral-400 text-sm focus:outline-none focus:border-amber-500"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-sm transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 z-50 bg-neutral-950/98 backdrop-blur-xl border-t border-neutral-800 overflow-y-auto p-4 pb-20 space-y-4">
          {/* Simple Shop Direct Link */}
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-amber-300 bg-neutral-900 border border-amber-800/50 hover:bg-neutral-800 transition-colors"
          >
            Shop
          </Link>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold px-2">
              Browse Categories
            </span>
            {MAIN_CATEGORIES.map((cat) => {
              const isExpanded = expandedMobileCat === cat.id;
              return (
                <div
                  key={cat.id}
                  className="border border-neutral-800/80 rounded-xl overflow-hidden bg-neutral-900/40"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMobileCat(isExpanded ? null : cat.id)
                    }
                    className="w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold text-neutral-100 hover:text-amber-300"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-500 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-neutral-800/60 bg-neutral-950/60 space-y-4">
                      {cat.subGroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1.5 pt-2">
                          <p className="text-[11px] uppercase tracking-wider font-bold text-amber-400/90">
                            {group.title}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {group.items.map((item, iIdx) => (
                              <Link
                                key={iIdx}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xs text-neutral-400 hover:text-amber-200 py-1"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-900">
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Direct WhatsApp Concierge (+61420128746)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
