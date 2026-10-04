'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/components/AppLink';
import { useRouter } from 'next/navigation';
import { SITE } from '@/lib/config';

/** Shop drop-down: the four product categories. */
const SHOP_MENU = [
  { label: 'Whisky', href: '/shop/whisky' },
  { label: 'Spirit', href: '/shop/spirit' },
  { label: 'Beer / Wine / Premix', href: '/shop/beer-premix-wine' },
  { label: 'Others', href: '/shop/other' },
];

const NAV_LINKS = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms of Service', href: '/terms' },
];
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Wine,
} from 'lucide-react';

export function Header({ announcement }: { announcement?: React.ReactNode }) {
  const router = useRouter();
  const { totalItemCount, openCart } = useCart();
  const { wishlist } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

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
    <header className="sticky top-0 z-40 w-full bg-neutral-950 border-b border-amber-900/30 transition-shadow duration-200 shadow-lg shadow-black/40">
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

          {/* Desktop Navigation: Shop drop-down, FAQ, Terms of Service */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 xl:gap-2">
            <div className="relative group">
              <Link
                href="/shop"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-amber-400 group-focus-within:text-amber-400 hover:bg-neutral-900/60 transition-colors rounded-md"
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute left-0 top-full pt-2 z-50 w-60">
                <ul className="rounded-xl bg-neutral-950 border border-amber-900/40 shadow-2xl shadow-black/80 p-2">
                  {SHOP_MENU.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block px-3 py-2.5 rounded-lg text-sm text-neutral-200 hover:text-amber-300 hover:bg-neutral-900 transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 pt-1 border-t border-neutral-800">
                    <Link href="/shop" className="block px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-amber-400 hover:bg-neutral-900 transition-colors">
                      View all bottles
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/60 transition-colors rounded-md"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
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
        <div className="lg:hidden fixed inset-0 top-28 z-50 bg-neutral-950 border-t border-neutral-800 overflow-y-auto p-4 pb-20 space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold px-2">Shop</span>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-amber-300 bg-neutral-900 border border-amber-800/50 hover:bg-neutral-800 transition-colors"
            >
              All bottles
            </Link>
            {SHOP_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/40 text-sm font-semibold text-neutral-100 hover:text-amber-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/40 text-sm font-semibold text-neutral-100 hover:text-amber-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
