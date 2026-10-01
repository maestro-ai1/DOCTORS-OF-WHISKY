'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, LogOut, Mail, MessageCircle, Paperclip, Phone, RefreshCw, Send } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/config';
import type { OrderRecord, OrderStatus, SendKind } from '@/lib/orders/types';

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const when = (iso: string) => new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

const STATUS: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: 'New: send payment details', cls: 'bg-amber-500 text-neutral-950' },
  awaiting_payment: { label: 'Awaiting payment', cls: 'bg-sky-500/20 text-sky-200 border border-sky-600/60' },
  paid: { label: 'Paid', cls: 'bg-emerald-500/20 text-emerald-200 border border-emerald-600/60' },
  dispatched: { label: 'Dispatched', cls: 'bg-neutral-700 text-neutral-200' },
  completed: { label: 'Completed', cls: 'bg-neutral-700 text-neutral-200' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-900/50 text-red-200' },
};

const STEPS: { kind: SendKind; label: string; short: string }[] = [
  { kind: 'payment_details', label: '1. Payment details', short: 'Payment details' },
  { kind: 'payment_received', label: '2. Payment received', short: 'Payment received' },
  { kind: 'dispatched', label: '3. Dispatched', short: 'Dispatched' },
];

const FILTERS: { id: string; label: string; match: (s: OrderStatus) => boolean }[] = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'new', label: 'New', match: (s) => s === 'new' },
  { id: 'awaiting', label: 'Awaiting payment', match: (s) => s === 'awaiting_payment' },
  { id: 'paid', label: 'Paid', match: (s) => s === 'paid' },
  { id: 'shipped', label: 'Shipped', match: (s) => s === 'dispatched' || s === 'completed' },
];

const nextStep = (s: OrderStatus): SendKind => (s === 'new' ? 'payment_details' : s === 'awaiting_payment' ? 'payment_received' : 'dispatched');

export function AdminPortal() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [meta, setMeta] = useState({ storage: 'persistent', mail: true });
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
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

  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f.id, orders.filter((o) => f.match(o.status)).length])), [orders]);
  const shown = useMemo(() => orders.filter((o) => (FILTERS.find((f) => f.id === filter) || FILTERS[0]).match(o.status)), [orders, filter]);
  const current = orders.find((o) => o.ref === selected) || null;
  const replaceOrder = (o: OrderRecord) => setOrders((list) => list.map((x) => (x.ref === o.ref ? o : x)));

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    window.location.reload();
  };

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 space-y-3">
      <header className="flex items-center justify-between gap-2">
        <h1 className="font-serif font-bold text-xl text-neutral-100">Orders</h1>
        <div className="flex gap-2">
          <button onClick={() => { setLoading(true); setReloadKey((k) => k + 1); }} aria-label="Refresh" className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-600"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={() => void signOut()} aria-label="Sign out" className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-700"><LogOut className="w-4 h-4" /></button>
        </div>
      </header>

      {meta.storage !== 'persistent' && <p className="text-xs rounded-lg border border-amber-700/60 bg-amber-950/50 text-amber-200 px-3 py-2">Order storage is not connected, so orders here may disappear. New orders are still emailed to you.</p>}
      {!meta.mail && <p className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">Email is not set up, so messages cannot be sent.</p>}
      {error && <p role="alert" className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">{error}</p>}

      <div className="grid lg:grid-cols-5 gap-4">
        <section className={`lg:col-span-2 space-y-3 ${current ? 'hidden lg:block' : ''}`} aria-label="Order list">
          <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Filter orders">
            {FILTERS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
                className={`shrink-0 px-3 py-2 rounded-full text-xs font-semibold border ${filter === f.id ? 'bg-amber-500 text-neutral-950 border-amber-500' : 'bg-neutral-900 text-neutral-300 border-neutral-800'}`}>
                {f.label} <span className="opacity-70">{counts[f.id]}</span>
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {loading && <li className="text-sm text-neutral-500 p-4">Loading…</li>}
            {!loading && shown.length === 0 && <li className="text-sm text-neutral-500 p-4 border border-dashed border-neutral-800 rounded-2xl">No orders here.</li>}
            {shown.map((o) => (
              <li key={o.ref}>
                <button onClick={() => setSelected(o.ref)} className={`w-full text-left p-3.5 rounded-2xl border transition-colors ${selected === o.ref ? 'bg-amber-950/60 border-amber-600' : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-600'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-amber-400">{o.ref}</span>
                    <span className="font-mono font-semibold text-neutral-100">{aud(o.totals.total)}</span>
                  </div>
                  <p className="text-sm text-neutral-200 mt-0.5 truncate">{o.customer.fullName}</p>
                  <div className="flex items-center justify-between gap-2 mt-2 text-[11px]">
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${STATUS[o.status].cls}`}>{STATUS[o.status].label}</span>
                    <span className="flex items-center gap-2 text-neutral-500">
                      {o.proofs?.length ? <span className="flex items-center gap-1 text-emerald-300"><Paperclip className="w-3 h-3" />screenshot</span> : null}
                      {when(o.createdAt)}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={`lg:col-span-3 ${current ? '' : 'hidden lg:block'}`} aria-label="Order details">
          {current ? (
            <OrderPanel key={current.ref} order={current} onChange={replaceOrder} onBack={() => setSelected(null)} />
          ) : (
            <p className="text-sm text-neutral-500 p-6 border border-dashed border-neutral-800 rounded-2xl">Tap an order to see it and send the customer their payment details.</p>
          )}
        </section>
      </div>
    </main>
  );
}

function OrderPanel({ order, onChange, onBack }: { order: OrderRecord; onChange: (o: OrderRecord) => void; onBack: () => void }) {
  const [kind, setKind] = useState<SendKind>(nextStep(order.status));
  const [details, setDetails] = useState(order.paymentDetails || '');
  const [tracking, setTracking] = useState(order.trackingNumber || '');
  const [preview, setPreview] = useState<{ subject?: string; html?: string; problem?: string; whatsappText?: string; whatsappUrl?: string }>({});
  const [mode, setMode] = useState<'template' | 'paste'>(order.paymentDetails ? 'paste' : 'template');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const seq = useRef(0);

  // Live preview: the server renders the exact email that "Send" will deliver.
  useEffect(() => {
    const mine = ++seq.current;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/orders/${order.ref}/preview`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, paymentDetails: details, tracking }) });
        const data = (await res.json()) as { ok?: boolean; subject?: string; html?: string; problem?: string; error?: string; whatsappText?: string; whatsappUrl?: string };
        if (mine !== seq.current) return;
        setPreview(data.ok ? { subject: data.subject, html: data.html, whatsappText: data.whatsappText, whatsappUrl: data.whatsappUrl } : { problem: data.problem || data.error || 'Could not build the preview.' });
      } catch {
        if (mine === seq.current) setPreview({ problem: 'Could not build the preview. Check your connection.' });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [order.ref, kind, details, tracking]);

  const send = async () => {
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch(`/api/admin/orders/${order.ref}/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, paymentDetails: details, tracking }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; order?: OrderRecord; dryRun?: boolean };
      if (data.order) onChange(data.order);
      if (res.ok) {
        setNotice({ ok: true, text: data.dryRun ? 'Test mode: nothing was actually sent.' : `Sent to ${order.customer.email}.` });
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
    void fetch(`/api/admin/orders/${order.ref}/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, paymentDetails: details, tracking, channel: 'whatsapp' }) })
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
  const first = order.customer.fullName.split(' ')[0];
  const wa = `https://wa.me/${order.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${first}, it's Doctors of Whisky about your order ${order.ref}.`)}`;
  const canSend = !sending && !preview.problem && Boolean(preview.html);

  return (
    <article className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <button onClick={onBack} className="lg:hidden flex items-center gap-1.5 text-sm text-neutral-300 min-h-[2.5rem]"><ArrowLeft className="w-4 h-4" /> All orders</button>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-mono font-bold text-xl text-amber-400">{order.ref}</h2>
          <p className="text-xs text-neutral-500">{when(order.createdAt)} · {order.paymentMethodName}</p>
        </div>
        <div className="text-right">
          <p className="font-serif font-bold text-2xl text-neutral-100">{aud(order.totals.total)}</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS[order.status].cls}`}>{STATUS[order.status].label}</span>
        </div>
      </div>

      <div className="rounded-xl bg-neutral-950/70 border border-neutral-800 p-3 text-sm space-y-2">
        <p className="font-semibold text-neutral-100">{order.customer.fullName}</p>
        <div className="flex flex-wrap gap-2">
          <a href={`tel:${order.customer.phone}`} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{order.customer.phone}</a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg bg-emerald-900/50 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</a>
          <a href={`mailto:${order.customer.email}`} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs flex items-center gap-1.5 break-all"><Mail className="w-3.5 h-3.5 shrink-0" />{order.customer.email}</a>
        </div>
        <ul className="text-xs text-neutral-400 pt-1">{order.lines.map((l) => <li key={l.slug}>{l.quantity} × {l.name}</li>)}</ul>
        {order.proofs && order.proofs.length > 0 && (
          <p className="text-xs text-emerald-300 flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" />Customer sent a payment screenshot ({when(order.proofs[order.proofs.length - 1].at)}). Check your sales email inbox.</p>
        )}
      </div>

      <div role="tablist" aria-label="What to send" className="grid grid-cols-3 gap-1.5">
        {STEPS.map((s) => (
          <button key={s.kind} role="tab" aria-selected={kind === s.kind} onClick={() => { setKind(s.kind); setNotice(null); }}
            className={`min-h-[3rem] px-2 rounded-xl text-xs sm:text-sm font-semibold border ${kind === s.kind ? 'bg-amber-500 text-neutral-950 border-amber-500' : 'bg-neutral-900 text-neutral-300 border-neutral-700'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {kind === 'payment_details' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="details" className="text-sm text-neutral-200 font-semibold">Payment details ({order.paymentMethodName})</label>
            <div role="group" aria-label="Fill mode" className="inline-flex rounded-lg overflow-hidden border border-neutral-700 text-[11px] font-bold uppercase tracking-wide">
              <button type="button" onClick={() => { setMode('template'); if (saved) setDetails(saved.details); }} aria-pressed={mode === 'template'} className={`px-3 py-2 ${mode === 'template' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'}`}>Template</button>
              <button type="button" onClick={() => { setMode('paste'); if (saved && details === saved.details) setDetails(''); }} aria-pressed={mode === 'paste'} className={`px-3 py-2 ${mode === 'paste' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-950 text-neutral-400'}`}>Paste</button>
            </div>
          </div>
          <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={6} maxLength={2000}
            placeholder={'PayID: payments@doctorsofwhisky.com.au\nor BSB / Account number / Account name\nor wallet address'}
            className="w-full px-3 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm font-mono text-neutral-100 focus:border-amber-500 focus:outline-none" />
        </div>
      )}
      {kind === 'dispatched' && (
        <div className="space-y-2">
          <label htmlFor="tracking" className="text-sm text-neutral-200 font-semibold">Tracking number</label>
          <input id="tracking" value={tracking} onChange={(e) => setTracking(e.target.value)} maxLength={60} placeholder="e.g. 3ABC123456789"
            className="w-full px-3 py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-sm font-mono text-neutral-100 focus:border-amber-500 focus:outline-none" />
        </div>
      )}
      {kind === 'payment_received' && <p className="text-sm text-neutral-300">This tells the customer their payment arrived and the order is confirmed.</p>}

      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500">Preview: what {first} will receive</h3>
        {preview.problem ? (
          <p className="text-sm text-neutral-400 rounded-xl border border-dashed border-neutral-700 p-4">{preview.problem}</p>
        ) : preview.html ? (
          <div className="rounded-xl overflow-hidden border border-neutral-700 bg-white">
            <p className="text-xs bg-neutral-100 text-neutral-700 px-3 py-2 border-b border-neutral-200"><strong>To:</strong> {order.customer.email}<br /><strong>Subject:</strong> {preview.subject}</p>
            <iframe title="Email preview" sandbox="" srcDoc={preview.html} className="w-full h-[28rem] bg-white" />
          </div>
        ) : (
          <p className="text-sm text-neutral-500 p-4">Building preview…</p>
        )}
      </div>

      {notice && <p role="status" className={`text-sm rounded-xl px-3 py-2.5 border flex items-center gap-2 ${notice.ok ? 'border-emerald-700 bg-emerald-950/50 text-emerald-200' : 'border-red-800 bg-red-950/50 text-red-200'}`}>{notice.ok && <Check className="w-4 h-4" />}{notice.text}</p>}

      <button onClick={() => void send()} disabled={!canSend} className="w-full min-h-[3.25rem] rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold text-base flex items-center justify-center gap-2">
        <Send className="w-4 h-4" /> {sending ? 'Sending…' : 'Send to customer'}
      </button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-neutral-600" aria-hidden="true"><span className="flex-1 border-t border-neutral-800" />or send via WhatsApp<span className="flex-1 border-t border-neutral-800" /></div>

      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500">WhatsApp message preview</h3>
        {preview.whatsappText ? (
          <p className="whitespace-pre-wrap text-sm rounded-2xl rounded-tl-sm bg-emerald-950/60 border border-emerald-800 text-emerald-50 p-3.5 max-h-72 overflow-y-auto">{preview.whatsappText}</p>
        ) : (
          <p className="text-sm text-neutral-500 rounded-xl border border-dashed border-neutral-800 p-3.5">{preview.problem || 'Building preview…'}</p>
        )}
        {preview.whatsappUrl && (
          <a href={preview.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={recordWhatsapp}
            className="w-full min-h-[3.25rem] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> Send via WhatsApp to {order.customer.phone}
          </a>
        )}
      </div>

      {order.replies.length > 0 && (
        <ul className="text-xs text-neutral-400 space-y-1 border-t border-neutral-800 pt-3">
          {order.replies.map((r) => (
            <li key={r.id} className="flex justify-between gap-2"><span>{r.delivered ? '✓' : '✗ not delivered:'} {STEPS.find((s) => s.kind === r.kind)?.short || 'Message'}</span><span className="text-neutral-500 shrink-0">{when(r.at)}</span></li>
          ))}
        </ul>
      )}
    </article>
  );
}
