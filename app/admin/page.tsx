import React from 'react';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, adminConfigured, verifySessionToken } from '@/lib/admin/session';
import { AdminLogin } from './AdminLogin';
import { AdminPortal } from './AdminPortal';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-3">
        <h1 className="text-xl font-serif font-bold text-neutral-100">Admin portal not configured</h1>
        <p className="text-sm text-neutral-400">Set ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET (32+ characters) in the environment, then redeploy.</p>
      </div>
    );
  }
  const authed = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  return authed ? <AdminPortal /> : <AdminLogin />;
}
