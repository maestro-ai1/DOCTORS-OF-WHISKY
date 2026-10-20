'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, TriangleAlert } from 'lucide-react';
import { CRYPTO_WALLETS } from '@/lib/config';
import { PayClient } from './PayClient';

function Qr({ value, label }: { value: string; label: string }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let live = true;
    QRCode.toDataURL(value, { width: 480, margin: 2, errorCorrectionLevel: 'M' })
      .then((u) => live && setSrc(u))
      .catch(() => live && setSrc(''));
    return () => {
      live = false;
    };
  }, [value]);
  return (
    <div className="mx-auto grid h-56 w-56 place-items-center rounded-2xl bg-white p-2">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- generated data URL, not a remote image
        <img src={src} alt={`QR code for the ${label} wallet address`} width={224} height={224} className="h-full w-full" />
      ) : (
        <span className="text-xs text-neutral-500">Loading QR…</span>
      )}
    </div>
  );
}

export function CryptoPay({ refCode, token, whatsappUrl, amount }: { refCode: string; token: string; whatsappUrl: string; amount: string }) {
  const [pick, setPick] = useState(0);
  const [copied, setCopied] = useState(false);
  const w = CRYPTO_WALLETS[pick];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(w.address);
    } catch {
      /* the address box below is selectable as a fallback */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-neutral-900 border border-amber-800/50 p-4 space-y-4" aria-label="Crypto payment">
        <h2 className="font-serif font-bold text-lg text-amber-400">1. Choose how you want to pay</h2>
        <div role="tablist" aria-label="Crypto payment options" className="grid grid-cols-3 gap-2">
          {CRYPTO_WALLETS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={pick === i}
              onClick={() => { setPick(i); setCopied(false); }}
              className={`rounded-xl border-2 px-2 py-2.5 text-center transition ${pick === i ? 'border-amber-400 bg-amber-950/70 text-amber-200' : 'border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-amber-700'}`}
            >
              <span className="block font-bold text-sm">{x.label}</span>
              <span className="block text-[11px] leading-tight text-neutral-400">{x.id === 'btc' ? 'Bitcoin' : x.id === 'usdt-trc20' ? 'TRC20' : 'ERC20'}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="space-y-3">
          <Qr value={w.uri} label={`${w.label} ${w.network}`} />
          <p className="text-center text-sm font-semibold text-neutral-200">Scan with your wallet app, or copy the address</p>
          <div>
            <label htmlFor="wallet-address" className="block text-xs font-bold uppercase tracking-wider text-amber-400">{w.label} address · {w.network}</label>
            <textarea
              id="wallet-address"
              readOnly
              rows={3}
              value={w.address}
              onFocus={(e) => e.currentTarget.select()}
              onClick={(e) => e.currentTarget.select()}
              className="mt-1.5 w-full resize-none break-all rounded-xl border-2 border-amber-500 bg-neutral-950 p-3 text-center font-mono text-[15px] font-bold text-amber-300"
            />
          </div>
          <button type="button" onClick={copy} className={`w-full min-h-[3.25rem] rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${copied ? 'bg-emerald-600 text-white' : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'}`} aria-label={`Copy ${w.label} ${w.network} address`}>
            {copied ? <><Check className="w-4 h-4" aria-hidden="true" /> Address copied</> : <><Copy className="w-4 h-4" aria-hidden="true" /> Copy address</>}
          </button>
          <p className="flex gap-2 rounded-xl bg-amber-950/60 border border-amber-800/60 p-3 text-xs font-semibold text-amber-200 leading-relaxed">
            <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>Send only {w.short} on the {w.network}. Funds sent on a different network cannot be recovered. Send the equivalent of {amount} at today&apos;s rate, and add the network fee on top so the full amount arrives.</span>
          </p>
        </div>
      </section>

      <h2 className="font-serif font-bold text-lg text-amber-400 pt-1">2. Upload your payment screenshot</h2>
      <PayClient refCode={refCode} token={token} whatsappUrl={whatsappUrl} network={w.id} />
    </div>
  );
}
