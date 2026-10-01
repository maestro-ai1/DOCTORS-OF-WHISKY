'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || 'Sign in failed.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-neutral-900/70 border border-amber-800/50 rounded-2xl p-7 space-y-5" autoComplete="off">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400"><Lock className="w-5 h-5" /></div>
          <div>
            <h1 className="font-serif font-bold text-lg text-neutral-100">Staff sign in</h1>
            <p className="text-xs text-neutral-400">Doctors of Whisky order portal</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="passkey" className="text-xs text-neutral-400">Admin passkey</label>
          <input id="passkey" type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:border-amber-500 focus:outline-none" />
        </div>
        {error && <p role="alert" className="text-xs text-red-300 bg-red-950/60 border border-red-800 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={busy || !password} className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-neutral-950 font-bold text-sm">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
