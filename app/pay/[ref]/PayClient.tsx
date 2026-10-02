'use client';

import React, { useRef, useState } from 'react';
import { CheckCircle2, ImagePlus, Loader2, MessageCircle, UploadCloud } from 'lucide-react';

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = 'image/*,application/pdf';

/** Shrinks large screenshots and photos in the browser so they upload quickly and stay under the 4 MB server limit. */
async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 900 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

export function PayClient({ refCode, token, whatsappUrl }: { refCode: string; token: string; whatsappUrl: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fallback, setFallback] = useState(whatsappUrl);

  const choose = async (picked: File | undefined) => {
    setState('idle');
    setMessage('');
    if (preview) URL.revokeObjectURL(preview);
    if (!picked) {
      setFile(null);
      setPreview(null);
      return;
    }
    const ready = await shrinkImage(picked);
    if (ready.size > MAX_BYTES) {
      setFile(null);
      setPreview(null);
      setState('error');
      setMessage('That file is over 4 MB. Please choose a smaller screenshot, or send it on WhatsApp.');
      return;
    }
    setFile(ready);
    setPreview(ready.type.startsWith('image/') ? URL.createObjectURL(ready) : null);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setState('sending');
    setMessage('');
    try {
      const body = new FormData();
      body.set('t', token);
      body.set('file', file);
      const res = await fetch(`/api/pay/${refCode}/proof/`, { method: 'POST', body });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string; error?: string; whatsappUrl?: string };
      if (res.ok && data.success) {
        setState('done');
        setMessage(data.message || 'Thank you. We have received your screenshot.');
        return;
      }
      if (data.whatsappUrl) setFallback(data.whatsappUrl);
      setState('error');
      setMessage(data.error || 'We could not send your screenshot. Please try again or use WhatsApp.');
    } catch {
      setState('error');
      setMessage('Network error. Your screenshot was not sent. Please try again or use WhatsApp.');
    }
  };

  if (state === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-emerald-700 bg-emerald-950/60 p-5 text-center space-y-2">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" aria-hidden="true" />
        <p className="font-bold text-emerald-100">Screenshot received</p>
        <p className="text-sm text-emerald-200">We will email you once your payment is confirmed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <form onSubmit={send} className="rounded-2xl bg-neutral-900 border border-neutral-700 p-4 space-y-3">
        <p className="text-sm text-neutral-300">Paid? Upload your payment screenshot.</p>

        <input ref={input} id="proof" type="file" accept={ACCEPT} className="sr-only" onChange={(e) => void choose(e.target.files?.[0])} />
        <label htmlFor="proof" className="flex flex-col items-center justify-center gap-1.5 w-full min-h-[8.5rem] px-4 text-center rounded-2xl border-2 border-dashed border-amber-700/70 bg-neutral-950 text-neutral-200 cursor-pointer hover:border-amber-500">
          {file ? <ImagePlus className="w-7 h-7 text-amber-400" aria-hidden="true" /> : <UploadCloud className="w-7 h-7 text-amber-400" aria-hidden="true" />}
          <span className="text-sm font-semibold">{file ? 'Tap to choose a different file' : 'Tap to choose a screenshot'}</span>
          <span className="text-xs text-amber-700">JPG, PNG, WebP, HEIC or PDF, up to 4MB</span>
        </label>

        {file && (
          <div className="flex items-center gap-3 rounded-xl bg-neutral-950 border border-neutral-800 p-2">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not a remote image
              <img src={preview} alt="Preview of your payment screenshot" className="w-16 h-16 object-cover rounded-lg" />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-neutral-800 flex items-center justify-center text-xs text-neutral-400">PDF</div>
            )}
            <div className="min-w-0 text-xs text-neutral-300">
              <p className="truncate font-semibold">{file.name}</p>
              <p className="text-neutral-400">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
        )}

        {state === 'error' && <p role="alert" className="text-xs rounded-lg border border-red-800 bg-red-950/50 text-red-200 px-3 py-2">{message}</p>}

        <button type="submit" disabled={!file || state === 'sending'} className="w-full min-h-[3rem] rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2">
          {state === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</> : 'Send screenshot'}
        </button>
      </form>

      <a href={fallback} target="_blank" rel="noopener noreferrer" className="w-full min-h-[2.75rem] rounded-xl border border-emerald-700 text-emerald-300 hover:bg-emerald-950 font-semibold text-sm flex items-center justify-center gap-2">
        <MessageCircle className="w-4 h-4" aria-hidden="true" /> Or send it on WhatsApp
      </a>
    </div>
  );
}
