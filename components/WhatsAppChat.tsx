import React from 'react';
import { CONTACT, SITE } from '@/lib/config';

/**
 * Floating WhatsApp live chat, bottom right on every page.
 * Server-rendered with no JavaScript: the button opens a chat panel (native <details>), and the message box is a plain
 * form that opens wa.me with the typed text, so visitors continue the conversation in WhatsApp.
 */
export function WhatsAppChat() {
  return (
    <div className="fixed bottom-5 right-4 sm:right-5 z-40">
      <details className="group">
        <summary
          aria-label="Chat with us on WhatsApp"
          className="list-none [&::-webkit-details-marker]:hidden flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/60 ring-2 ring-neutral-950 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.34-1.66a11.88 11.88 0 0 0 5.71 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.43-8.45z" />
          </svg>
        </summary>

        <div className="absolute bottom-[4.5rem] right-0 w-[min(92vw,340px)] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/80">
          <div className="flex items-center gap-3 bg-emerald-800 px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">{SITE.name}</p>
              <p className="text-[11px] text-emerald-100">Live chat on WhatsApp · replies within minutes</p>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-200">
              Hello! Ask us about a bottle, price, availability or delivery and we will reply on WhatsApp.
            </p>

            <form action={`https://wa.me/${CONTACT.whatsappNumber}`} method="get" target="_blank" className="space-y-2">
              <textarea
                name="text"
                required
                rows={3}
                aria-label="Your message"
                placeholder="Type your message…"
                defaultValue="Hi Doctors of Whisky, I would like to ask about a bottle."
                className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 placeholder-neutral-400 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
              >
                Start chat on WhatsApp
              </button>
            </form>
            <p className="text-center text-[11px] text-neutral-400">Opens WhatsApp · {CONTACT.phone}</p>
          </div>
        </div>
      </details>
    </div>
  );
}
