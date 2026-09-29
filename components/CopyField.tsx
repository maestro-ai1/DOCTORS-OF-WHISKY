'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyFieldProps {
  label: string;
  value: string;
  className?: string;
  mono?: boolean;
}

export function CopyField({ label, value, className = '', mono = true }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={`group relative flex items-center justify-between gap-3 p-3 bg-neutral-900/90 border border-amber-900/40 hover:border-amber-500/60 rounded-lg cursor-pointer transition-all duration-200 ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Copy ${label}: ${value}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="flex flex-col min-w-0 pr-2">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400/90">
          {label}
        </span>
        <span
          className={`text-xs text-neutral-200 truncate ${
            mono ? 'font-mono tracking-tight' : 'font-sans'
          }`}
          title={value}
        >
          {value}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded bg-amber-950/60 group-hover:bg-amber-800/60 text-amber-300 text-xs font-medium border border-amber-800/50 transition-colors">
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="text-[11px]">Copy</span>
          </>
        )}
      </div>
    </div>
  );
}
