import type { Metadata } from 'next';
import React from 'react';

// Staff-only area: never indexed, never cached.
export const metadata: Metadata = {
  title: 'Admin | Doctors of Whisky',
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-neutral-950 text-neutral-200">{children}</div>;
}
