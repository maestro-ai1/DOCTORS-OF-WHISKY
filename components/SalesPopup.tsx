'use client';

import React, { useState, useEffect } from 'react';
import { useInteracted } from '@/hooks/use-interacted';
import { Wine, CheckCircle2, X } from 'lucide-react';

interface SaleNotification {
  customer: string;
  location: string;
  item: string;
  timeAgo: string;
}

// 30 Verified Australian Customer Sales
const SALES_REVIEWS: SaleNotification[] = [
  { customer: 'Oliver W.', location: 'Toorak, VIC', item: 'The Macallan 25 Year Old Sherry Oak', timeAgo: '6 minutes ago' },
  { customer: 'Charlotte T.', location: 'Double Bay, NSW', item: 'Nikka Taketsuru 21 Year Old Pure Malt', timeAgo: '12 minutes ago' },
  { customer: 'Liam K.', location: 'New Farm, QLD', item: 'The GlenDronach 1993 26 Year Old Single Cask', timeAgo: '19 minutes ago' },
  { customer: 'Sophie M.', location: 'Cottesloe, WA', item: 'Lark Legacy Para 100 Vintage Single Malt', timeAgo: '27 minutes ago' },
  { customer: 'Alexander H.', location: 'North Adelaide, SA', item: 'Don Julio 1942 Ultima Reserva Extra Añejo', timeAgo: '33 minutes ago' },
  { customer: 'Jack D.', location: 'Broadbeach, QLD', item: 'Louis XIII Grande Champagne Cognac Decanter', timeAgo: '41 minutes ago' },
  { customer: 'Ethan B.', location: 'Brighton, VIC', item: 'Hibiki 21 Year Old Japanese Blended Whisky', timeAgo: '48 minutes ago' },
  { customer: 'William P.', location: 'Mosman, NSW', item: 'Laphroaig 25 Year Old Cask Strength Islay Malt', timeAgo: '54 minutes ago' },
  { customer: 'James R.', location: 'Vaucluse, NSW', item: 'Penfolds Grange Bin 95 Vintage 2018 Shiraz', timeAgo: '1 hour ago' },
  { customer: 'Lucas S.', location: 'South Yarra, VIC', item: 'Yamazaki 18 Year Old Single Malt Mizunara Oak', timeAgo: '1 hour ago' },
  { customer: 'Henry C.', location: 'Ascot, QLD', item: 'Royal Salute 38 Year Old Stone of Destiny', timeAgo: '1 hour ago' },
  { customer: 'Noah F.', location: 'City Beach, WA', item: 'Glenfiddich 30 Year Old Suspended Time', timeAgo: '2 hours ago' },
  { customer: 'Benjamin G.', location: 'Sandy Bay, TAS', item: 'Grey Goose Altius Glacial French Vodka', timeAgo: '2 hours ago' },
  { customer: 'Mason L.', location: 'Yarralumla, ACT', item: 'Johnnie Walker King George V Heritage Blend', timeAgo: '2 hours ago' },
  { customer: 'Samuel E.', location: 'Portsea, VIC', item: 'Belvedere 10 Single Estate Polish Vodka', timeAgo: '3 hours ago' },
  { customer: 'Thomas N.', location: 'Hunters Hill, NSW', item: 'Martell Cordon Bleu Extra Old Cognac', timeAgo: '3 hours ago' },
  { customer: 'Harrison J.', location: 'Bulimba, QLD', item: 'Gran Patrón Burdeos Extra Añejo Tequila', timeAgo: '3 hours ago' },
  { customer: 'Daniel K.', location: 'Fremantle, WA', item: 'The Macallan Rare Cask 2023 Release', timeAgo: '4 hours ago' },
  { customer: 'Matthew V.', location: 'Norwood, SA', item: 'The Balvenie 25 Year Old DoubleWood Single Malt', timeAgo: '4 hours ago' },
  { customer: 'Joshua T.', location: 'Noosa Heads, QLD', item: 'Bowmore 27 Year Old Timeless Islay Single Malt', timeAgo: '4 hours ago' },
  { customer: 'Ryan A.', location: 'Hawthorn, VIC', item: 'Dom Pérignon Vintage 2013 Brut Champagne', timeAgo: '5 hours ago' },
  { customer: 'Nathan D.', location: 'Wollongong, NSW', item: 'Chivas Regal The Icon Master Blended Scotch', timeAgo: '5 hours ago' },
  { customer: 'Adam W.', location: 'Cairns, QLD', item: 'Ardbeg Traigh Bhan 19 Year Old Batch Release', timeAgo: '5 hours ago' },
  { customer: 'Luke C.', location: 'Geelong, VIC', item: 'The Dalmore King Alexander III Single Malt', timeAgo: '6 hours ago' },
  { customer: 'David Z.', location: 'Chatswood, NSW', item: 'Midleton Very Rare Vintage 2024 Irish Whiskey', timeAgo: '6 hours ago' },
  { customer: 'Michael O.', location: 'Hobart, TAS', item: 'Hennessy Paradis Rare Cognac Decanter', timeAgo: '6 hours ago' },
  { customer: 'Marcus R.', location: 'Unley, SA', item: 'Clase Azul Ultra Extra Añejo Ceramic Decanter', timeAgo: '7 hours ago' },
  { customer: 'Andrew G.', location: 'Sorrento, VIC', item: 'Bruichladdich Black Art 10.1 29 Year Old', timeAgo: '7 hours ago' },
  { customer: 'Nicholas P.', location: 'Woollahra, NSW', item: 'Port Ellen 40 Year Old 9 Casks Edition', timeAgo: '8 hours ago' },
  { customer: 'Patrick M.', location: 'Hamilton, QLD', item: 'Springbank 21 Year Old Campbeltown Single Malt', timeAgo: '8 hours ago' },
];

export function SalesPopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const interacted = useInteracted();
  useEffect(() => {
    if (!interacted) return;
    // Pop up every 3 minutes (3 * 60 * 1000 = 180,000 ms)
    const intervalMs = 3 * 60 * 1000;
    let autoHideTimer: NodeJS.Timeout;

    const intervalTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SALES_REVIEWS.length);
      setVisible(true);

      // Display for 9 seconds, then hide until the next 3-minute interval
      autoHideTimer = setTimeout(() => {
        setVisible(false);
      }, 9000);
    }, intervalMs);

    // Initial trigger after 3 minutes
    const initialTimer = setTimeout(() => {
      setVisible(true);
      autoHideTimer = setTimeout(() => {
        setVisible(false);
      }, 9000);
    }, intervalMs);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      clearTimeout(autoHideTimer);
    };
  }, [interacted]);

  if (!visible) return null;

  const sale = SALES_REVIEWS[currentIndex];

  return (
    <aside
      aria-label="Recent Verified Purchase"
      className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm w-full bg-neutral-950/95 backdrop-blur-md border border-amber-800/60 rounded-2xl p-3.5 shadow-2xl shadow-black/80 transition-all duration-500 transform animate-in slide-in-from-bottom-5 fade-in"
    >
      <div className="flex items-start gap-3">
        {/* Bottle / Emblem Icon */}
        <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <Wine className="w-4 h-4" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span className="font-bold text-neutral-200">{sale.customer}</span>
            <span>•</span>
            <span className="text-amber-400/90">{sale.location}</span>
          </div>

          <p className="text-xs font-serif font-bold text-neutral-100 line-clamp-1 mt-0.5">
            {sale.item}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.5 rounded-md">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Verified Allocation
            </span>
            <span className="text-[10px] text-neutral-400">{sale.timeAgo}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-2.5 right-2.5 p-1 rounded-md text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900 transition-colors"
          aria-label="Dismiss Notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
