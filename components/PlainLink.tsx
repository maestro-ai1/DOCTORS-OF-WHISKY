import React from 'react';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; prefetch?: boolean };

/** Same URL shape next/link produces with trailingSlash: true (internal paths get a trailing slash; query and hash are kept). */
function withSlash(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const m = href.match(/^([^?#]*)(.*)$/);
  const path = m ? m[1] : href;
  const rest = m ? m[2] : '';
  if (path.endsWith('/') || /\.[a-z0-9]+$/i.test(path.split('/').pop() || '')) return href;
  return `${path}/${rest}`;
}

/**
 * Link for server-rendered pages: a plain anchor, so it adds no client component to hydrate.
 * (Interactive client components keep AppLink / next/link for soft navigation.)
 */
export default function PlainLink({ href, prefetch: _prefetch, children, ...rest }: Props) {
  return (
    <a href={withSlash(href)} {...rest}>
      {children}
    </a>
  );
}
