'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { LogOut, Mail, MessageCircle, RefreshCw, Search, Send } from 'lucide-react';
import { ORDER_STATUSES, type OrderRecord, type OrderStatus } from '@/lib/orders/types';

const aud = (n: number) => `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const when = (iso: string) => new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
const label = (s: string) => s.replace(/_/g, ' ');

const TEMPLATES: { name: string; body: (o: OrderRecord) => string }[] = [
  { name: 'Payment received', body: (o) => `Hi ${o.customer.fullName.split(' ')[0]},\n\nThank you. We have received your payment for order ${o.ref} and are preparing your bottles for insured courier dispatch. We will email your tracking details as soon as it ships.\n\nKind regards,\nDoctors of Whisky` },
  { name: 'Payment reminder', body: (o) => `Hi ${o.customer.fullName.split(' ')[0]},\n\nThank you for your order ${o.ref}. We have not yet seen your payment of ${aud(o.totals.total)} AUD via ${o.paymentMethodName}. Please include ${o.ref} as the payment description and reply once it is sent, and we will arrange dispatch.\n\nKind regards,\nDoctors of Whisky` },
  { name: 'Dispatched', body: (o) => `Hi ${o.customer.fullName.split(' ')[0]},\n\nYour order ${o.ref} has been dispatched by insured courier. Tracking: [add tracking number]. A signature and photo ID (18+) are required on delivery.\n\nKind regards,\nDoctors of Whisky` },
];

export function AdminPortal() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [meta, setMeta] = useState<{ storage: string; mail: boolean }>({ storage: 'persistent', mail: true });
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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
        if (!res.ok) throw new Error(data.error || 'Failed to load orders');
        setOrders(data.orders || []);
        setMeta({ storage: data.storage || 'persistent', mail: data.mail !== false });
        setError('');
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load orders');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const refresh = () => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => (statusFilter === 'all' || o.status === statusFilter) && (!q || `${o.ref} ${o.customer.fullName} ${o.customer.email} ${o.customer.phone}`.toLowerCase().includes(q)));
  }, [orders, query, statusFilter]);

  const current = orders.find((o) => o.ref === selected) || null;
  const replaceOrder = (o: OrderRecord) => setOrders((list) => list.map((x) => (x.ref === o.ref ? o : x)));

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    window.location.reload();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif font-bold text-xl text-neutral-100">Order portal</h1>
          <p className="text-xs text-neutral-400">{orders.length} order{orders.length === 1 ? '' : 's'} · replies send from sales@doctorsofwhisky.com.au</p>
        </div>
        <div className="flex gap-2">
          <button onClick={refresh} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs flex items-center gap-1.5 hover:border-amber-700"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
          <button onClick={() => void signOut()} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs flex items-center gap-1.5 hover:border-red-700"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
        </div>
      </header>

      {meta.storage !== 'persistent' && (
        <p className="text-xs rounded-lg border border-amber-700/60 bg-amber-950/50 text-amber-200 px-3 py-2">Order storage (Upstash Redis / Vercel KV) is not connected, so orders here are only held in memory and will disappear. New orders are still emailed to the shop.</p>
      )}
      {!meta.mail && <p className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">Email is not configured (ZOHO_SMTP_USER / ZOHO_SMTP_PASS), so confirmations and replies cannot be sent.</p>}
      {error && <p role="alert" className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">{error}</p>}

      <div className="grid lg:grid-cols-5 gap-4">
        <section className="lg:col-span-2 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ref, name, email, phone" aria-label="Search orders"
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs focus:border-amber-500 focus:outline-none" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className="px-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
              <option value="all">All</option>
              {ORDER_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select>
          </div>
          <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {loading && <li className="text-xs text-neutral-500 p-3">Loading…</li>}
            {!loading && filtered.length === 0 && <li className="text-xs text-neutral-500 p-3">No orders yet.</li>}
            {filtered.map((o) => (
              <li key={o.ref}>
                <button onClick={() => setSelected(o.ref)} className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${selected === o.ref ? 'bg-amber-950/60 border-amber-600' : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'}`}>
                  <div className="flex justify-between gap-2"><span className="font-mono font-bold text-amber-400">{o.ref}</span><span className="font-mono">{aud(o.totals.total)}</span></div>
                  <div className="text-neutral-300 mt-0.5 truncate">{o.customer.fullName} · {o.customer.city} {o.customer.state}</div>
                  <div className="flex justify-between mt-1 text-[11px] text-neutral-500"><span>{when(o.createdAt)}</span><span className="uppercase tracking-wide">{label(o.status)}{o.replies.length ? ` · ${o.replies.length} repl${o.replies.length === 1 ? 'y' : 'ies'}` : ''}</span></div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-3">
          {current ? <OrderDetail key={current.ref} order={current} onChange={replaceOrder} /> : <p className="text-sm text-neutral-500 p-6 border border-dashed border-neutral-800 rounded-2xl">Select an order to view details and reply to the customer.</p>}
        </section>
      </div>
    </main>
  );
}

function OrderDetail({ order, onChange }: { order: OrderRecord; onChange: (o: OrderRecord) => void }) {
  const [subject, setSubject] = useState(`Re: Your Doctors of Whisky order ${order.ref}`);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const post = async (path: string, body: unknown) => {
    const res = await fetch(`/api/admin/orders/${order.ref}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as { order?: OrderRecord; error?: string; dryRun?: boolean };
    return { res, data };
  };

  const changeStatus = async (status: OrderStatus) => {
    const { res, data } = await post('status', { status });
    if (res.ok && data.order) onChange(data.order);
    else setNotice({ ok: false, text: data.error || 'Could not update status.' });
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setNotice(null);
    try {
      const { res, data } = await post('reply', { subject, message });
      if (data.order) onChange(data.order);
      if (res.ok) {
        setMessage('');
        setNotice({ ok: true, text: data.dryRun ? 'Dry-run: message built but not sent (MAIL_DRY_RUN is on).' : `Reply sent to ${order.customer.email}.` });
      } else setNotice({ ok: false, text: data.error || 'Could not send the reply.' });
    } catch {
      setNotice({ ok: false, text: 'Network error. The reply was not sent.' });
    } finally {
      setSending(false);
    }
  };

  const wa = `https://wa.me/${order.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${order.customer.fullName.split(' ')[0]}, it's Doctors of Whisky about your order ${order.ref}.`)}`;

  return (
    <article className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-mono font-bold text-lg text-amber-400">{order.ref}</h2>
          <p className="text-xs text-neutral-500">{when(order.createdAt)} · {order.paymentMethodName}</p>
          <p className="text-[11px] text-neutral-500 mt-1">Emails: shop {order.emails.sales} · customer {order.emails.customer}</p>
        </div>
        <label className="text-xs text-neutral-400 flex items-center gap-2">Status
          <select value={order.status} onChange={(e) => void changeStatus(e.target.value as OrderStatus)} className="px-2 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-neutral-100">
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">Customer</h3>
          <p className="text-neutral-100 font-semibold">{order.customer.fullName}</p>
          <p><a className="text-amber-400 hover:underline" href={`mailto:${order.customer.email}`}>{order.customer.email}</a></p>
          <p><a className="text-amber-400 hover:underline" href={`tel:${order.customer.phone}`}>{order.customer.phone}</a> · <a className="text-emerald-400 hover:underline inline-flex items-center gap-1" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-3 h-3" />WhatsApp</a></p>
        </div>
        <div className="space-y-1">
          <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">Deliver to</h3>
          <p>{order.customer.address}<br />{order.customer.city} {order.customer.state} {order.customer.postcode}</p>
          {order.customer.notes && <p className="text-neutral-400 italic">Notes: {order.customer.notes}</p>}
        </div>
      </div>

      <div className="text-xs">
        <h3 className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Items</h3>
        <ul className="divide-y divide-neutral-800">
          {order.lines.map((l) => <li key={l.slug} className="py-1.5 flex justify-between gap-3"><span>{l.quantity} × {l.name} <span className="text-neutral-500">({l.size})</span></span><span className="font-mono shrink-0">{aud(l.lineTotal)}</span></li>)}
        </ul>
        <dl className="mt-2 space-y-0.5 font-mono">
          <div className="flex justify-between text-neutral-400"><dt>Subtotal</dt><dd>{aud(order.totals.subtotal)}</dd></div>
          {order.totals.cryptoDiscount > 0 && <div className="flex justify-between text-emerald-400"><dt>Crypto discount</dt><dd>-{aud(order.totals.cryptoDiscount)}</dd></div>}
          <div className="flex justify-between text-neutral-400"><dt>Courier</dt><dd>{order.totals.shipping ? aud(order.totals.shipping) : 'FREE'}</dd></div>
          <div className="flex justify-between text-neutral-100 font-bold text-sm pt-1"><dt>Total</dt><dd>{aud(order.totals.total)} AUD</dd></div>
        </dl>
      </div>

      {order.replies.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[11px] uppercase tracking-wider text-neutral-500">Replies sent</h3>
          {order.replies.map((r) => (
            <div key={r.id} className={`rounded-lg border p-3 text-xs ${r.delivered ? 'border-neutral-800 bg-neutral-950/60' : 'border-red-800 bg-red-950/40'}`}>
              <div className="flex justify-between text-[11px] text-neutral-500"><span>{r.subject}</span><span>{when(r.at)}{r.delivered ? '' : ' · NOT DELIVERED'}</span></div>
              <p className="whitespace-pre-wrap mt-1 text-neutral-300">{r.message}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={sendReply} className="space-y-2.5 border-t border-neutral-800 pt-4">
        <h3 className="text-[11px] uppercase tracking-wider text-neutral-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Reply to {order.customer.email}</h3>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATES.map((t) => <button key={t.name} type="button" onClick={() => setMessage(t.body(order))} className="px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-700 text-[11px] hover:border-amber-600">{t.name}</button>)}
        </div>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={150} aria-label="Subject" className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs focus:border-amber-500 focus:outline-none" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={7} maxLength={5000} required aria-label="Message" placeholder="Write your reply…" className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs focus:border-amber-500 focus:outline-none" />
        {notice && <p role="status" className={`text-xs rounded-lg px-3 py-2 border ${notice.ok ? 'border-emerald-800 bg-emerald-950/50 text-emerald-200' : 'border-red-800 bg-red-950/50 text-red-200'}`}>{notice.text}</p>}
        <button type="submit" disabled={sending || message.trim().length < 2} className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-neutral-950 font-bold text-xs inline-flex items-center gap-2"><Send className="w-3.5 h-3.5" />{sending ? 'Sending…' : 'Send reply'}</button>
      </form>
    </article>
  );
}
