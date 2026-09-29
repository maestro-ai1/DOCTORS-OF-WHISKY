'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/lib/config';
import { Sparkles, Truck, ShieldCheck, ChevronRight } from 'lucide-react';

const MESSAGES = [
  {
    icon: Truck,
    text: 'FREE Australia-Wide Express Courier on orders over $1,500 AUD',
    highlight: '$1,500 AUD',
    href: '/shop',
  },
  {
    icon: Sparkles,
    text: 'Save 12% instantly at checkout when paying via Crypto (BTC & USDT)',
    highlight: '12% Instant Savings',
    href: '/shop',
  },
  {
    icon: ShieldCheck,
    text: 'Sydney Climate-Controlled Vault Storage · 100% Provenance Guaranteed',
    highlight: 'Sydney Vaults',
    href: '/about',
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeMsg = MESSAGES[currentIndex];
  const IconComponent = activeMsg.icon;

  return (
    <div className="bg-neutral-950 border-b border-amber-900/30 text-neutral-300 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Dispatch / Origin indicator (hidden on smallest screens) */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-amber-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sydney Vaults: Online &amp; Dispatching Daily</span>
        </div>

        {/* Center: Rotating announcement with link */}
        <div className="flex-1 flex items-center justify-center text-center">
          <Link
            href={activeMsg.href}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium hover:text-amber-300 transition-colors"
          >
            <IconComponent className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{activeMsg.text}</span>
            <ChevronRight className="w-3 h-3 text-amber-600 shrink-0 opacity-70" />
          </Link>
        </div>

        {/* Right: Direct WhatsApp concierge */}
        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          <span className="text-neutral-500">Concierge WhatsApp:</span>
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
