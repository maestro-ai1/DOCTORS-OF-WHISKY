'use client';

import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import React, { useState } from 'react';
import { CONTACT, SITE } from '@/lib/config';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Allocation Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(''); // honeypot: real visitors never see or fill this

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setFieldErrors(data.fieldErrors || {});
        setErrorMsg(data.error || `We could not send your message. Please call or WhatsApp ${CONTACT.phone}.`);
      }
    } catch {
      setErrorMsg(`Network error. Please try again, or call or WhatsApp ${CONTACT.phone}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-neutral-900">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sydney Private Concierge Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            Contact Doctors of Whisky
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Inquire about rare bottle sourcing, private cellar viewings in Sydney, wholesale allocations, or payment verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Channels & Location Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-6">
              <h2 className="text-lg font-serif font-bold text-neutral-100 pb-3 border-b border-neutral-800">
                Direct Collector Channels
              </h2>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">
                      WhatsApp Direct Concierge
                    </span>
                    <a
                      href={`https://wa.me/${CONTACT.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-bold text-sm"
                    >
                      {CONTACT.phone}
                    </a>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      Fastest response for bottle holds &amp; allocation questions
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">
                      Official Sales &amp; Inquiries
                    </span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-neutral-200 hover:text-amber-300 font-medium"
                    >
                      <ObfuscatedEmail email={CONTACT.email} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">
                      Sydney Cellars &amp; Headquarters
                    </span>
                    <span className="text-neutral-200 font-medium">
                      {CONTACT.address}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mt-0.5">
                      (Private viewings strictly by prior appointment)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">
                      Concierge Operating Hours
                    </span>
                    <span className="text-neutral-200 font-medium">
                      {CONTACT.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 space-y-1.5">
              <p><strong className="text-neutral-300">ABN:</strong> {CONTACT.abn}</p>
              <p><strong className="text-neutral-300">NSW Liquor Licence:</strong> {CONTACT.liquorLicence}</p>
              <p className="text-[11px] text-neutral-400 pt-1">
                Under the NSW Liquor Act 2007, it is an offence to supply liquor to persons under 18.
              </p>
            </div>
          </div>

          {/* Right: Interactive Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-serif font-bold text-neutral-100 mb-2">
                    Send a Message to the Sommelier Desk
                  </h2>

                  {errorMsg && (
                    <div role="alert" className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                      {errorMsg}
                      {Object.values(fieldErrors).length > 0 && (
                        <ul className="list-disc pl-4 mt-1">
                          {Object.values(fieldErrors).map((m) => <li key={m}>{m}</li>)}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="David Chen"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="david@example.com.au"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400">Mobile Phone (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0420 128 746"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400">Inquiry Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none"
                      >
                        <option value="General Allocation Inquiry">General Allocation Inquiry</option>
                        <option value="Sourcing Specific Rare Vintage">Sourcing Specific Rare Vintage</option>
                        <option value="Sydney Vault Private Viewing">Sydney Vault Private Viewing</option>
                        <option value="Corporate / Wholesale Order">Corporate / Wholesale Order</option>
                        <option value="Payment / Crypto Verification">Payment / Crypto Verification</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400">Your Message / Bottle Requirements *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include bottle names, specific vintage years, or delivery deadlines..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>Leave this field empty
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Concierge Inquiry'}</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-700/60 mx-auto flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-neutral-100">
                    Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Thank you. A Doctors of Whisky sommelier will review your request and reply via email or phone within 2 hours during operating hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Allocation Inquiry',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
