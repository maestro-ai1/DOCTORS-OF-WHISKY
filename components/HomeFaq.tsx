'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HOMEPAGE_FAQS } from '@/lib/data/faq';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer Concierge FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Essential information regarding Australia-wide express courier delivery, the 12% Crypto discount, and our Sydney vault order policies.
          </p>
        </div>

        {/* 3 Accordion Items */}
        <div className="space-y-4">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-serif font-bold text-neutral-100 hover:text-amber-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className={`p-1.5 rounded-full bg-neutral-800 text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-amber-950 text-amber-300' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-neutral-800/60 bg-neutral-950/40">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to Full FAQ */}
        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-amber-600 text-neutral-200 hover:text-amber-300 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>View All 8+ Collector FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
