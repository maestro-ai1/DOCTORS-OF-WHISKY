'use client';

import dynamic from 'next/dynamic';
import { useInteracted } from '@/hooks/use-interacted';

// The cart drawer, checkout modal and sales pop-up render nothing until they are needed, so their code loads only after the
// visitor's first interaction instead of competing with hydration on first load.
const CartDrawer = dynamic(() => import('@/components/CartDrawer').then((m) => m.CartDrawer), { ssr: false });
const CheckoutModal = dynamic(() => import('@/components/CheckoutModal').then((m) => m.CheckoutModal), { ssr: false });
const SalesPopup = dynamic(() => import('@/components/SalesPopup').then((m) => m.SalesPopup), { ssr: false });

export function LazyOverlays() {
  const interacted = useInteracted();
  if (!interacted) return null;
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
      <SalesPopup />
    </>
  );
}
