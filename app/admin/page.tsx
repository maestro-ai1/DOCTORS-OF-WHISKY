import React from 'react';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, adminConfigured, verifySessionToken } from '@/lib/admin/session';
import { AdminLogin } from './AdminLogin';
import { AdminPortal } from './AdminPortal';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!adminConfigured()) {
    const missing = [
      !process.env.ADMIN_PASSWORD_HASH && 'ADMIN_PASSWORD_HASH',
      (process.env.ADMIN_SESSION_SECRET || '').length < 32 && 'ADMIN_SESSION_SECRET (at least 32 characters)',
    ].filter(Boolean) as string[];
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-3">
        <h1 className="text-xl font-serif font-bold text-neutral-100">Admin portal not configured</h1>
        <p className="text-sm text-neutral-400">
          Missing setting{missing.length === 1 ? '' : 's'}: <strong className="text-neutral-200">{missing.join(', ')}</strong>. Add {missing.length === 1 ? 'it' : 'them'} in Vercel
          (Settings, Environment Variables), then redeploy.
        </p>
      </div>
    );
  }
  const authed = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  return authed ? <AdminPortal /> : <AdminLogin />;
}
