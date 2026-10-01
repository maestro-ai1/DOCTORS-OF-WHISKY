'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, LogOut, MessageCircle, Paperclip, RefreshCw, Send } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/config';
import type { OrderRecord, OrderStatus, SendKind } from '@/lib/orders/types';

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const when = (iso: string) => new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

const STATUS: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: 'Send payment details', cls: 'bg-amber-500 text-neutral-950' },
  awaiting_payment: { label: 'Awaiting payment', cls: 'bg-sky-500/20 text-sky-200 border border-sky-600/60' },
  paid: { label: 'Paid: add tracking', cls: 'bg-emerald-500/20 text-emerald-200 border border-emerald-600/60' },
  dispatched: { label: 'Dispatched', cls: 'bg-neutral-700 text-neutral-200' },
  completed: { label: 'Completed', cls: 'bg-neutral-700 text-neutral-200' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-900/50 text-red-200' },
};

/** The one thing that is useful to do next for each order. */
const nextStep = (s: OrderStatus): SendKind => (s === 'new' ? 'payment_details' : s === 'awaiting_payment' ? 'payment_received' : 'dispatched');

const ACTION: Record<SendKind, string> = {
  payment_details: 'Send payment details',
  payment_received: 'Payment received',
  dispatched: 'Send tracking',
};

export function AdminPortal() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [meta, setMeta] = useState({ storage: 'persistent', mail: true });
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/orders', { cache: 'no-store' });
        if (res.status === 401) {
          window.location.reload();
          return;
        }
        const data = (await res.json()) as { orders?: OrderRecord[]; storage?: string; mail?: boolean; error?: string };
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || 'Could not load orders');
        setOrders(data.orders || []);
        setMeta({ storage: data.storage || 'persistent', mail: data.mail !== false });
        setError('');
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load orders');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const current = useMemo(() => orders.find((o) => o.ref === selected) || null, [orders, selected]);
  const replaceOrder = (o: OrderRecord) => setOrders((list) => list.map((x) => (x.ref === o.ref ? o : x)));

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    window.location.reload();
  };

  return (
    <main className="max-w-2xl mx-auto px-3 py-4 space-y-3">
      <header className="flex items-center justify-between gap-2">
        <h1 className="font-serif font-bold text-xl text-neutral-100">{current ? current.ref : 'Orders'}</h1>
        <div className="flex gap-2">
          {current ? (
            <button onClick={() => setSelected(null)} className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm flex items-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Orders</button>
          ) : (
            <>
              <button onClick={() => { setLoading(true); setReloadKey((k) => k + 1); }} aria-label="Refresh" className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-600"><RefreshCw className="w-4 h-4" /></button>
              <button onClick={() => void signOut()} aria-label="Sign out" className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-700"><LogOut className="w-4 h-4" /></button>
            </>
          )}
        </div>
      </header>

      {meta.storage !== 'persistent' && <p className="text-xs rounded-lg border border-amber-700/60 bg-amber-950/50 text-amber-200 px-3 py-2">Order storage is not connected, so orders here may disappear. New orders are still emailed to you.</p>}
      {!meta.mail && <p className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">Email is not set up, so messages cannot be sent.</p>}
      {error && <p role="alert" className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">{error}</p>}

      {current ? (
        <OrderPanel key={current.ref} order={current} onChange={replaceOrder} />
      ) : (
        <ul className="space-y-2" aria-label="Orders">
          {loading && <li className="text-sm text-neutral-500 p-4">Loading…</li>}
          {!loading && orders.length === 0 && <li className="text-sm text-neutral-500 p-4 border border-dashed border-neutral-800 rounded-2xl">No orders yet.</li>}
          {orders.map((o) => (
            <li key={o.ref}>
              <button onClick={() => setSelected(o.ref)} className="w-full text-left p-3 rounded-2xl border bg-neutral-900/70 border-neutral-800 hover:border-amber-600">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-amber-400">{o.ref}</span>
                  <span className="font-mono font-semibold text-neutral-100">{aud(o.totals.total)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-1.5 text-[11px]">
                  <span className="text-sm text-neutral-300 truncate">{o.customer.fullName}</span>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full font-semibold ${STATUS[o.status].cls}`}>{STATUS[o.status].label}</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">{when(o.createdAt)}{o.proofs?.length ? <span className="ml-2 text-emerald-300"><Paperclip className="w-3 h-3 inline" /> screenshot sent</span> : null}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function OrderPanel({ order, onChange }: { order: OrderRecord; onChange: (o: OrderRecord) => void }) {
  const [kind, setKind] = useState<SendKind>(nextStep(order.status));
  const [details, setDetails] = useState(order.paymentDetails || '');
  const [tracking, setTracking] = useState(order.trackingNumber || '');
  const [preview, setPreview] = useState<{ subject?: string; html?: string; problem?: string; whatsappUrl?: string }>({});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const seq = useRef(0);

  // The server renders the exact email that "Send" will deliver.
  useEffect(() => {
    const mine = ++seq.current;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/orders/${order.ref}/preview`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, paymentDetails: details, tracking }) });
        const data = (await res.json()) as { ok?: boolean; subject?: string; html?: string; problem?: string; error?: string; whatsappUrl?: string };
        if (mine !== seq.current) return;
        setPreview(data.ok ? { subject: data.subject, html: data.html, whatsappUrl: data.whatsappUrl } : { problem: data.problem || data.error || 'Could not build the preview.' });
      } catch {
        if (mine === seq.current) setPreview({ problem: 'Could not build the preview. Check your connection.' });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [order.ref, kind, details, tracking]);

  const body = () => JSON.stringify({ kind, paymentDetails: details, tracking });
  const headers = { 'Content-Type': 'application/json' };

  const send = async () => {
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/orders/${order.ref}/send`, { method: 'POST', headers, body: body() });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; order?: OrderRecord; dryRun?: boolean };
      if (data.order) onChange(data.order);
      if (res.ok) {
        setNotice({ ok: true, text: data.dryRun ? 'Test mode: nothing was actually sent.' : 'Sent.' });
        if (data.order) setKind(nextStep(data.order.status));
      } else setNotice({ ok: false, text: data.error || 'Could not send.' });
    } catch {
      setNotice({ ok: false, text: 'Network error. Nothing was sent.' });
    } finally {
      setSending(false);
    }
  };

  const recordWhatsapp = () => {
    // Fire-and-forget so the browser can open WhatsApp immediately; the order moves along in the background.
    void fetch(`/api/admin/orders/${order.ref}/send`, { method: 'POST', headers, body: JSON.stringify({ kind, paymentDetails: details, tracking, channel: 'whatsapp' }) })
      .then((r) => r.json())
      .then((d: { order?: OrderRecord }) => {
        if (d.order) {
          onChange(d.order);
          setKind(nextStep(d.order.status));
        }
      })
      .catch(() => undefined);
  };

  const saved = PAYMENT_METHODS.find((m) => m.id === order.paymentMethod);
  const done = order.status === 'dispatched' || order.status === 'completed' || order.status === 'cancelled';
  const canSend = !sending && !preview.problem && Boolean(preview.html);
  const phone = order.customer.phone;

  return (
    <article className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-neutral-100">{order.customer.fullName}</p>
          <p className="text-xs text-neutral-400 break-all">
            <a href={`tel:${phone}`} className="underline">{phone}</a> · <a href={`mailto:${order.customer.email}`} className="underline">{order.customer.email}</a>
          </p>
          <p className="text-xs text-neutral-500 mt-1">{order.lines.map((l) => `${l.quantity} × ${l.name}`).join(', ')}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif font-bold text-2xl text-neutral-100">{aud(order.totals.total)}</p>
          <p className="text-[11px] text-neutral-500">{order.paymentMethodName}</p>
        </div>
      </div>

      <p className={`text-xs inline-block px-2.5 py-1 rounded-full font-semibold ${STATUS[order.status].cls}`}>{STATUS[order.status].label}</p>
      {order.proofs && order.proofs.length > 0 && (
        <p className="text-xs text-emerald-300 flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" />Customer sent a payment screenshot. It is in your sales inbox.</p>
      )}

      {done ? (
        <p className="text-sm text-neutral-400">Nothing more to do for this order.{order.trackingNumber ? ` Tracking: ${order.trackingNumber}` : ''}</p>
      ) : (
        <>
          {kind === 'payment_details' && (
            <div className="space-y-1.5">
              <label htmlFor="details" className="text-sm text-neutral-200 font-semibold">Paste the payment details for {order.paymentMethodName}</label>
              <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={5} maxLength={2000}
                placeholder={'PayID: …\nor BSB / account number / name\nor wallet address'}
                className="w-full px-3 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm font-mono text-neutral-100 focus:border-amber-500 focus:outline-none" />
              {saved && details !== saved.details && (
                <button type="button" onClick={() => setDetails(saved.details)} className="text-xs text-amber-400 underline">Use the saved {order.paymentMethodName} details</button>
              )}
            </div>
          )}
          {kind === 'payment_received' && <p className="text-sm text-neutral-300">Press the button once the money has arrived. The customer is told the order is confirmed.</p>}
          {kind === 'dispatched' && (
            <div className="space-y-1.5">
              <label htmlFor="tracking" className="text-sm text-neutral-200 font-semibold">Tracking number</label>
              <input id="tracking" value={tracking} onChange={(e) => setTracking(e.target.value)} maxLength={60} placeholder="e.g. 3ABC123456789"
                className="w-full px-3 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm font-mono text-neutral-100 focus:border-amber-500 focus:outline-none" />
            </div>
          )}

          {notice && <p role="status" className={`text-sm rounded-xl px-3 py-2.5 border flex items-center gap-2 ${notice.ok ? 'border-emerald-700 bg-emerald-950/50 text-emerald-200' : 'border-red-800 bg-red-950/50 text-red-200'}`}>{notice.ok && <Check className="w-4 h-4" />}{notice.text}</p>}

          <button onClick={() => void send()} disabled={!canSend} className="w-full min-h-[3.25rem] rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold text-base flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> {sending ? 'Sending…' : `${ACTION[kind]} by email`}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
            {preview.whatsappUrl ? (
              <a href={preview.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={recordWhatsapp} className="flex items-center gap-1.5 text-emerald-300 underline min-h-[2rem]"><MessageCircle className="w-3.5 h-3.5" />Send by WhatsApp instead</a>
            ) : <span />}
            {order.status === 'awaiting_payment' && kind !== 'payment_details' && (
              <button type="button" onClick={() => setKind('payment_details')} className="underline min-h-[2rem]">Edit and resend details</button>
            )}
            {kind === 'payment_details' && order.status !== 'new' && (
              <button type="button" onClick={() => setKind(nextStep(order.status))} className="underline min-h-[2rem]">Back</button>
            )}
          </div>

          <details className="text-xs text-neutral-400">
            <summary className="cursor-pointer min-h-[2rem] flex items-center">Preview email</summary>
            {preview.problem ? (
              <p className="rounded-xl border border-dashed border-neutral-700 p-3 mt-1">{preview.problem}</p>
            ) : preview.html ? (
              <div className="rounded-xl overflow-hidden border border-neutral-700 bg-white mt-1">
                <p className="text-xs bg-neutral-100 text-neutral-700 px-3 py-2 border-b border-neutral-200"><strong>Subject:</strong> {preview.subject}</p>
                <iframe title="Email preview" sandbox="" srcDoc={preview.html} className="w-full h-[26rem] bg-white" />
              </div>
            ) : (
              <p className="p-3">Building preview…</p>
            )}
          </details>
        </>
      )}
    </article>
  );
}
