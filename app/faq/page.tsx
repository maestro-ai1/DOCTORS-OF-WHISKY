import React from 'react';
import Link from 'next/link';
import { ALL_FAQS } from '@/lib/data/faq';
import { HelpCircle, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Whisky FAQ | Delivery, Payment & Buying Questions',
  description:
    'Answers on buying whisky online in Australia: delivery times, payment options, the 12% crypto discount, $300 minimum order, authenticity checks and returns.',
  path: '/faq/',
  keywords: ['buy whisky online australia faq', 'whisky delivery australia', 'how to buy whisky online', 'is it safe to buy whisky online'],
});

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-neutral-900">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Collector Concierge Knowledgebase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Detailed guidance on our Sydney vault policies, delivery transit, payment verification, and bottle provenance.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-6">
          {ALL_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3 hover:border-amber-700/40 transition-colors"
            >
              <h2 className="text-base sm:text-lg font-serif font-bold text-neutral-100 flex items-start gap-2.5">
                <span className="text-amber-500 font-mono text-sm shrink-0">0{idx + 1}.</span>
                <span>{faq.question}</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-900/40 text-center space-y-4">
          <h3 className="text-xl font-serif font-bold text-neutral-100">
            Have a Specific Ingestion or Sourcing Inquiry?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Our private sommelier concierge is available Monday to Saturday (9:00 AM – 7:00 PM AEST) for tailored requests and allocation reserves.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Direct Hotline (+61420128746)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs"
            >
              <span>Submit Web Inquiry Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
