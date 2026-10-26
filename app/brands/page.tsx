import React from 'react';
import Link from '@/components/PlainLink';
import { ChevronRight } from 'lucide-react';
import { BRAND_HUBS } from '@/lib/data/brand-hubs';
import { buildMetadata, breadcrumbLd, webPageLd, ld } from '@/lib/seo';

const TITLE = 'Shop by Brand | Whisky, Spirits & Wine Brands Australia';
const DESC = 'Shop whisky, spirits, wine and beer by brand at Doctors of Whisky: Glenfiddich, Macallan, Jack Daniels, Jim Beam and more, with insured delivery Australia-wide.';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: '/brands/' });

export default function BrandsIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(webPageLd({ type: 'CollectionPage', name: TITLE, description: DESC, path: '/brands/' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Brands', path: '/brands/' }])) }} />
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3 pb-6 border-b border-neutral-900">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-200 font-medium">Brands</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">Shop by Brand</h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl font-light leading-relaxed">
            Pick a brand to see every bottle we stock, with prices, sizes and insured delivery across Australia. Prefer to browse by style? See the <Link href="/shop/" className="text-amber-400 underline underline-offset-2">full shop</Link>.
          </p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BRAND_HUBS.map((c) => (
            <li key={c.slug}>
              <Link href={c.path} className="block rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-amber-700/60 p-4 transition-colors">
                <span className="block font-serif font-bold text-neutral-100">{c.breadcrumb[2].name}</span>
                <span className="block text-xs text-neutral-400 mt-1">{c.sections.reduce((n, s) => n + s.products.length, 0)}+ bottles</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
