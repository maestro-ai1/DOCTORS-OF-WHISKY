import React from 'react';
import Link from '@/components/PlainLink';

/** Numbered, crawlable pagination (page 1 is the base path, then /page/2/, /page/3/ ...). */
export function Pager({ page, count, basePath, label }: { page: number; count: number; basePath: string; label: string }) {
  if (count <= 1) return null;
  const href = (n: number) => (n <= 1 ? basePath : `${basePath}page/${n}/`);
  const btn = 'px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-600 hover:text-amber-300';
  return (
    <nav aria-label={label} className="pt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className={btn}>
          ← Previous
        </Link>
      )}
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-label={`${label}: page ${n}`}
          aria-current={n === page ? 'page' : undefined}
          className={`min-w-[44px] text-center px-3 py-2.5 rounded-lg border ${
            n === page ? 'bg-amber-600 border-amber-500 text-neutral-950 font-bold' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-600 hover:text-amber-300'
          }`}
        >
          {n}
        </Link>
      ))}
      {page < count && (
        <Link href={href(page + 1)} rel="next" className={btn}>
          Next →
        </Link>
      )}
    </nav>
  );
}
