import React from 'react';
import Link from '@/components/PlainLink';
import { CONTACT } from '@/lib/config';
import { Sparkles, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const MESSAGES = [
  {
    icon: Truck,
    text: 'FREE Australia-Wide Express Courier on orders over $1,500 AUD',
    href: '/shop',
  },
  {
    icon: Sparkles,
    text: 'Save 12% instantly at checkout when paying via Crypto (BTC & USDT)',
    href: '/shop',
  },
  {
    icon: ShieldCheck,
    text: 'Sydney Climate-Controlled Vault Storage · 100% Provenance Guaranteed',
    href: '/about',
  },
];

/** Server-rendered. The three messages take turns with a CSS animation (see .ann-item in globals.css), so there is no client JavaScript. */
export function AnnouncementBar() {
  return (
    <div className="bg-neutral-950 border-b border-amber-900/30 text-neutral-300 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Dispatch / Origin indicator (hidden on smallest screens) */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-amber-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sydney Vaults: Online &amp; Dispatching Daily</span>
        </div>

        {/* Center: rotating announcement with link (all messages stay in the HTML) */}
        <div className="flex-1 relative h-[18px] sm:h-5 overflow-hidden text-center">
          {MESSAGES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.text}
                href={m.href}
                className="ann-item absolute inset-0 inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium hover:text-amber-300 transition-colors whitespace-nowrap"
                style={{ animationDelay: `${i * 4.5}s`, opacity: i === 0 ? 1 : 0 }}
              >
                <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{m.text}</span>
                <ChevronRight className="w-3 h-3 text-amber-600 shrink-0 opacity-70" />
              </Link>
            );
          })}
        </div>

        {/* Right: Direct WhatsApp concierge */}
        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          <span className="text-neutral-400">Concierge WhatsApp:</span>
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
