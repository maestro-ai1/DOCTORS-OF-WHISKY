import React from 'react';
import { ld } from '@/lib/seo';

/** Renders one or more JSON-LD blocks (server component; output is escaped for inline <script>). */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(d) }} />
      ))}
    </>
  );
}
