'use client';

import { useEffect, useState } from 'react';

/**
 * True after the visitor's first scroll, touch, key press or pointer move.
 * Carousels, rotating banners and pop-ups wait for this so the first paint stays still and the main thread is free while the page loads.
 */
export function useInteracted(): boolean {
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    if (interacted) return;
    const events = ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'] as const;
    const on = () => setInteracted(true);
    events.forEach((e) => window.addEventListener(e, on, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, on));
  }, [interacted]);
  return interacted;
}
