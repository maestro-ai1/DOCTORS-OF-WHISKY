import nodemailer, { type Transporter } from 'nodemailer';

// Zoho Mail SMTP. Credentials come from environment variables only (never hardcoded):
//   ZOHO_SMTP_HOST (default smtp.zoho.com.au) · ZOHO_SMTP_PORT (465 SSL or 587 STARTTLS) · ZOHO_SMTP_USER · ZOHO_SMTP_PASS
//   SALES_EMAIL (default = ZOHO_SMTP_USER) · MAIL_FROM_NAME · MAIL_DRY_RUN=1 (builds messages but never connects or sends)

export const MAIL_FROM_NAME = () => process.env.MAIL_FROM_NAME || 'Doctors of Whisky';
export const SALES_EMAIL = () => process.env.SALES_EMAIL || process.env.ZOHO_SMTP_USER || 'sales@doctorsofwhisky.com.au';
export const isDryRun = () => process.env.MAIL_DRY_RUN === '1';
export const isMailConfigured = () => isDryRun() || Boolean(process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS);

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  if (isDryRun()) {
    cached = nodemailer.createTransport({ jsonTransport: true });
    return cached;
  }
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  cached = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com.au',
    port,
    secure: port === 465, // 465 = implicit SSL, 587 = STARTTLS
    requireTLS: port !== 465,
    auth: { user: process.env.ZOHO_SMTP_USER, pass: process.env.ZOHO_SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: 'TLSv1.2' },
  });
  return cached;
}

export interface MailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

export interface MailResult {
  ok: boolean;
  error?: string;
  dryRun?: boolean;
}

/** Sends one message from the authenticated Zoho account. Never throws; failures are returned so callers can decide what to do. */
export async function sendMail(input: MailInput): Promise<MailResult> {
  if (!isMailConfigured()) return { ok: false, error: 'Email is not configured (ZOHO_SMTP_USER / ZOHO_SMTP_PASS missing).' };
  const from = `"${MAIL_FROM_NAME()}" <${process.env.ZOHO_SMTP_USER || SALES_EMAIL()}>`;
  try {
    const message = { from, to: input.to, subject: input.subject, text: input.text, html: input.html, replyTo: input.replyTo || SALES_EMAIL(), attachments: input.attachments };
    await transporter().sendMail(message);
    if (isDryRun()) console.log('[mail:dry-run]', JSON.stringify({ from: message.from, to: message.to, replyTo: message.replyTo, subject: message.subject, textBytes: message.text.length, htmlBytes: message.html.length, attachments: (input.attachments || []).map((a) => `${a.filename} (${a.content.length}B)`) }));
    return { ok: true, dryRun: isDryRun() };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[mail] send failed:', msg.replace(/pass(word)?=\S+/gi, 'pass=***'));
    return { ok: false, error: msg.slice(0, 200) };
  }
}
