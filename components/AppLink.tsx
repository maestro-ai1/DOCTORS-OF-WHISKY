'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

type Props = React.ComponentProps<typeof NextLink>;

/**
 * next/link without viewport prefetching: pages with dozens of links (shop, collections, footer) no longer download
 * every linked page in the background. The page is prefetched when the visitor shows intent (hover, focus or touch).
 */
const AppLink = React.forwardRef<HTMLAnchorElement, Props>(function AppLink({ prefetch, onMouseEnter, onTouchStart, onFocus, ...props }, ref) {
  const router = useRouter();
  const href = typeof props.href === 'string' ? props.href : props.href.pathname || '';
  const warm = () => {
    if (prefetch !== false && href.startsWith('/')) router.prefetch(href);
  };
  return (
    <NextLink
      ref={ref}
      prefetch={false}
      onMouseEnter={(e) => {
        warm();
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      {...props}
    />
  );
});

export default AppLink;
