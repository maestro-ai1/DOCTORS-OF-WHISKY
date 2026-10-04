import React from 'react';
import Link from '@/components/PlainLink';
import { HOMEPAGE_FAQS, ALL_FAQS } from '@/lib/data/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqLd } from '@/lib/seo';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

// Server component: native <details> keeps every answer in the HTML (crawlable, matches the FAQPage JSON-LD).
export function HomeFaq() {
  return (
    <section className="py-16 sm:py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
      <JsonLd data={faqLd(HOMEPAGE_FAQS)} />
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer Concierge FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Buying Whisky Online: Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Quick answers on buying whisky and spirits online in Australia: delivery, the 12% crypto discount, minimum order and how single malt, Scotch and bourbon differ.
          </p>
        </div>

        <div className="space-y-4">
          {HOMEPAGE_FAQS.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40 open:border-amber-700/50 transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between p-5 text-left text-sm sm:text-base font-serif font-bold text-neutral-100 hover:text-amber-300 group-open:text-amber-300 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <span className="p-1.5 rounded-full bg-neutral-800 text-amber-400 shrink-0 group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </span>
              </summary>
              <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-neutral-800/60 bg-neutral-950/40">
                <p className="pt-4">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center pt-6 pb-2">
          <Link
            href="/faq/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-600 text-neutral-200 hover:text-amber-300 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>View all {ALL_FAQS.length} FAQs</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
