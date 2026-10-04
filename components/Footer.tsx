import React from 'react';
import Link from '@/components/PlainLink';
import { SITE, CONTACT } from '@/lib/config';
import { Wine, ShieldCheck } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Shipping Information', href: '/shipping' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

const PAYMENT_CHIPS = [
  { label: 'PayID', crypto: false },
  { label: 'Osko / EFT', crypto: false },
  { label: 'Bitcoin', crypto: true },
  { label: 'USDT', crypto: true },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-amber-900/40 pt-8 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Brand, licence and contact */}
          <div className="md:col-span-5 space-y-2.5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-950 via-neutral-900 to-amber-900 border border-amber-600/50 flex items-center justify-center text-amber-400">
                <Wine className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">{SITE.name}</span>
                <span className="text-[9px] uppercase tracking-widest text-amber-500/90 font-medium">Australia&apos;s Fine Spirits &amp; Rare Malts</span>
              </div>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Rare single malts, Japanese whisky and collectible spirits, sommelier-inspected and stored in climate-regulated Sydney cellars.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono">
              ABN {CONTACT.abn} · Liquor Licence {CONTACT.liquorLicence}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-4 space-y-1">
            <h2 className="text-xs uppercase font-bold tracking-widest text-amber-400 pb-1.5 border-b border-neutral-900">Information &amp; Policies</h2>
            <div className="grid grid-cols-2 gap-x-4 text-xs">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="inline-block text-neutral-400 hover:text-amber-300 transition-colors py-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="md:col-span-3 space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-amber-400 pb-1.5 border-b border-neutral-900">We accept</h2>
            <ul className="flex flex-wrap gap-1.5">
              {PAYMENT_CHIPS.map((p) => (
                <li
                  key={p.label}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border ${
                    p.crypto ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400' : 'bg-neutral-900 border-neutral-800 text-amber-400'
                  }`}
                >
                  {p.label}
                  {p.crypto && <span className="ml-1 text-[9px] font-semibold text-emerald-400/90">12% off</span>}
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full transit insurance on every Australian parcel</span>
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} {SITE.name} Pty Ltd. All rights reserved. Sydney, NSW, Australia.</p>
          <p className="text-[10px]">{SITE.domain} · AUD ($) · Min order $300 AUD</p>
        </div>
      </div>
    </footer>
  );
}
