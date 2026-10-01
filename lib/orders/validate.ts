// Strict, dependency-free validation for the order and contact forms. Runs on the server (authoritative) and in the browser (fast feedback).

export const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] as const;
export type AuState = (typeof AU_STATES)[number];

export interface OrderCustomerInput {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  notes?: string;
  ageConfirmed: boolean;
}

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
// Header-injection characters must never reach an email header.
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

/** Postcode ranges per state/territory (Australia Post). */
const POSTCODE_RANGES: Record<AuState, [number, number][]> = {
  NSW: [[1000, 1999], [2000, 2599], [2619, 2899], [2921, 2999]],
  ACT: [[200, 299], [2600, 2618], [2900, 2920]],
  VIC: [[3000, 3999], [8000, 8999]],
  QLD: [[4000, 4999], [9000, 9999]],
  SA: [[5000, 5999]],
  WA: [[6000, 6797], [6800, 6999]],
  TAS: [[7000, 7999]],
  NT: [[800, 999]],
};

export function postcodeMatchesState(postcode: string, state: string): boolean {
  const n = Number(postcode);
  const ranges = POSTCODE_RANGES[state as AuState];
  if (!ranges || !Number.isInteger(n)) return false;
  return ranges.some(([lo, hi]) => n >= lo && n <= hi);
}

/** Normalise an Australian phone number to +61 international format, or return null if it is not valid. */
export function normaliseAuPhone(raw: string): string | null {
  const digits = raw.replace(/[\s().-]/g, '');
  let national: string;
  if (/^\+61\d{9}$/.test(digits)) national = digits.slice(3);
  else if (/^61\d{9}$/.test(digits)) national = digits.slice(2);
  else if (/^0\d{9}$/.test(digits)) national = digits.slice(1);
  else return null;
  // Mobile 4xx, or a landline / service number starting 2, 3, 7, 8.
  if (!/^[2378]\d{8}$/.test(national) && !/^4\d{8}$/.test(national)) return null;
  return `+61${national}`;
}

// Real-world personal names only: letters (any language), marks, spaces, apostrophes, hyphens, full stops and commas.
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} '’.,-]*$/u;

export const clean = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '';

export function validateCustomer(input: unknown): { value?: OrderCustomerInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;

  const fullName = clean(src.fullName, 100);
  const email = clean(src.email, 254).toLowerCase();
  const phoneRaw = clean(src.phone, 30);
  const address = clean(src.address, 150);
  const city = clean(src.city, 60);
  const state = clean(src.state, 3).toUpperCase();
  const postcode = clean(src.postcode, 4);
  const notes = clean(src.notes, 300);

  if (fullName.length < 2 || !/\p{L}/u.test(fullName)) errors.fullName = 'Please enter your full name.';
  else if (!NAME_RE.test(fullName)) errors.fullName = 'Your name can only contain letters, spaces, apostrophes, hyphens and full stops.';

  if (!EMAIL_RE.test(email) || CONTROL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  const phone = normaliseAuPhone(phoneRaw);
  if (!phone) errors.phone = 'Please enter a valid Australian phone number, for example 0420 128 746.';

  if (address.length < 5 || !/\d/.test(address)) errors.address = 'Please enter your street address, including the street number.';
  if (city.length < 2 || !/\p{L}/u.test(city)) errors.city = 'Please enter your suburb or city.';

  if (!(AU_STATES as readonly string[]).includes(state)) errors.state = 'Please choose a valid state or territory.';
  if (!/^\d{4}$/.test(postcode)) errors.postcode = 'Please enter a 4-digit Australian postcode.';
  else if (!errors.state && !postcodeMatchesState(postcode, state)) errors.postcode = `Postcode ${postcode} does not match ${state}. Please check your state and postcode.`;

  if (src.ageConfirmed !== true) errors.ageConfirmed = 'You must confirm you are 18 years or older to order alcohol in Australia.';

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    value: { fullName, email, phone: phone as string, address, city, state, postcode, notes, ageConfirmed: true },
  };
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function validateContact(input: unknown): { value?: ContactInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const name = clean(src.name, 100);
  const email = clean(src.email, 254).toLowerCase();
  const phoneRaw = clean(src.phone, 30);
  const subject = clean(src.subject, 120) || 'Website enquiry';
  const message = typeof src.message === 'string' ? src.message.replace(/\r\n/g, '\n').trim().slice(0, 4000) : '';

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (!NAME_RE.test(name)) errors.name = 'Your name can only contain letters, spaces, apostrophes, hyphens and full stops.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  const phone = phoneRaw ? normaliseAuPhone(phoneRaw) : '';
  if (phoneRaw && !phone) errors.phone = 'Please enter a valid Australian phone number or leave it blank.';
  if (message.length < 10) errors.message = 'Please write a message of at least 10 characters.';
  if (CONTROL_RE.test(name) || CONTROL_RE.test(subject)) errors.name = 'Your details contain invalid characters.';

  if (Object.keys(errors).length) return { errors };
  return { errors, value: { name, email, phone: phone || undefined, subject, message } };
}

export interface RawOrderItem {
  slug: string;
  quantity: number;
}

export function validateItems(input: unknown): { value?: RawOrderItem[]; error?: string } {
  if (!Array.isArray(input) || input.length === 0) return { error: 'Your cart is empty.' };
  if (input.length > 40) return { error: 'Too many different items in one order. Please contact us to arrange a larger order.' };
  const merged = new Map<string, number>();
  for (const it of input) {
    const slug = clean((it as { slug?: unknown })?.slug, 160);
    const q = Number((it as { quantity?: unknown })?.quantity);
    if (!slug || !Number.isInteger(q) || q < 1 || q > 99) return { error: 'One of the items in your cart has an invalid quantity.' };
    merged.set(slug, (merged.get(slug) || 0) + q);
  }
  return { value: [...merged.entries()].map(([slug, quantity]) => ({ slug, quantity })) };
}
