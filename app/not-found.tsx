import React from 'react';
import Link from '@/components/PlainLink';
import { Wine, ArrowLeft, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allocation Not Found (404) | Doctors of Whisky Australia',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-neutral-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-700/60 mx-auto flex items-center justify-center text-amber-400">
          <Wine className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-bold">
            404 • Vault Registry Error
          </span>
          <h1 className="text-3xl font-serif font-bold text-neutral-100">
            Bottle Allocation Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            The bottle vintage or page you requested does not exist or has been relocated within our Sydney vault index.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Vault Catalog</span>
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Bottles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
