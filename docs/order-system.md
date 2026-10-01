# Order system and admin portal (internal, never publish)

## How it works
1. Customer submits the checkout form. The browser sends only product slugs, quantities, payment method id and the customer details to `POST /api/order/`.
2. The server validates everything (name, email, AU phone, street, suburb, state, postcode that matches the state, 18+ confirmation), then **recalculates all prices, the $300 minimum, shipping, crypto discount and stock limits from the catalogue**. Client-sent totals are ignored. The order reference (`DOW-XXXXXX`) is generated on the server.
3. The order is saved (Upstash Redis / Vercel KV), then two emails go out through the Zoho SMTP account: a structured notification to `sales@doctorsofwhisky.com.au` (Reply-To = the customer) and a confirmation with payment instructions to the customer.
4. An order counts as received only if it was stored **or** the shop notification was sent. If both fail the customer sees an error with a WhatsApp fallback and no "Thank you" page (previously failures were swallowed).
5. The confirmation page shows the server-priced order and a prefilled WhatsApp link (`https://wa.me/61420128746?text=...`).
6. Staff sign in at `/admin/`, view orders, change status and reply. Replies are sent from the same authenticated Zoho account and recorded on the order.

Also covered: contact form (`/api/contact/`) now emails the shop and reports real success or failure.

## Security design
- Admin passkey is verified against an **scrypt hash** (`ADMIN_PASSWORD_HASH`), never stored or compared in plain text; constant-time comparison.
- Session = HMAC-signed, HttpOnly, SameSite=Strict, Secure (production) cookie, 8 hour expiry. The signing key includes the password hash, so changing the passkey signs everyone out.
- Login: 5 attempts per 15 minutes per IP, plus a delay on failure. Admin writes require same-origin + JSON (CSRF defence in depth).
- `/admin` and `/api/admin/*` send `X-Robots-Tag: noindex`, are `Disallow`ed in robots.txt, and are not in any sitemap.
- All email content is HTML-escaped; header injection characters are rejected; bot honeypot on both forms; rate limits on order, contact and replies.
- Secrets live only in environment variables. `.env*` is git-ignored.

## One-time setup (needs you)
1. **Zoho mailbox.** Zoho Mail > My Account > Security > **App Passwords**: create one named "website" (works whether or not 2FA is on). Make sure SMTP access is enabled for `sales@doctorsofwhisky.com.au`. Use host `smtp.zoho.com.au` for an Australian data centre account, `smtp.zoho.com` otherwise.
2. **Rotate the password you pasted in chat.** Delete that Zoho password / app password and create a fresh one, then use the fresh one below. Anything posted in a chat or ticket should be treated as exposed.
3. **Choose a stronger admin passkey** than a single short word. Run `node scripts/hash-admin-password.mjs` (the passkey is typed hidden) and copy the two lines it prints.
4. **Storage.** Vercel dashboard > Storage > Marketplace > **Upstash Redis** (free tier) > connect to this project. It injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_*`), which the code reads automatically.
5. **Environment variables, the easy way:** run `powershell -ExecutionPolicy Bypass -File scripts\setup-vercel-env.ps1`. It asks for the Zoho app password and your admin passkey in hidden prompts and sets everything in Vercel (secrets marked sensitive). Or do it by hand:

   **Environment variables (manual)** (Production, and Preview if you test there):
   ```
   vercel env add ZOHO_SMTP_HOST production            # smtp.zoho.com.au
   vercel env add ZOHO_SMTP_PORT production            # 465
   vercel env add ZOHO_SMTP_USER production            # sales@doctorsofwhisky.com.au
   vercel env add ZOHO_SMTP_PASS production            # the NEW app password (paste when prompted; never commit it)
   vercel env add SALES_EMAIL production               # sales@doctorsofwhisky.com.au
   vercel env add MAIL_FROM_NAME production            # Doctors of Whisky
   vercel env add ADMIN_PASSWORD_HASH production       # value printed by the hash script
   vercel env add ADMIN_SESSION_SECRET production      # value printed by the hash script
   vercel env add APP_URL production                   # https://doctorsofwhisky.com.au
   vercel env pull .env.local                          # optional: copy them to a local, git-ignored file
   ```
6. **Redeploy**, then do a real test order and reply (see below).
7. **Deliverability.** In your DNS add SPF (`include:zoho.com.au`), DKIM and DMARC for `doctorsofwhisky.com.au` from Zoho Mail Admin so confirmations do not land in spam.

## Testing without sending real email
- `MAIL_DRY_RUN=1` builds messages and logs a one-line summary but never connects to Zoho.
- `scripts/test-orders.mjs` runs 60+ checks against a running server (validation, tamper-proof pricing, rate limits, auth, CSRF, replies).
- After setup, place one real order with your own email address and reply to it from `/admin/`.

## Changing the passkey later
Re-run the hash script, update `ADMIN_PASSWORD_HASH` (and optionally `ADMIN_SESSION_SECRET`) in Vercel and redeploy. All sessions are invalidated.

## Customer payment flow (current)
1. Customer orders: first email is 'Order confirmed: awaiting payment' (no payment details yet). You get a 'New order' email.
2. In /admin/ open the order, step 1 'Payment details': paste (or use Template), check the preview, press Send to customer (or send via WhatsApp). The customer gets an invoice email with the amount, the order number as payment reference, your details, the instructions and three buttons: I've Paid, Upload Confirmation / Confirm via WhatsApp / Reply to us.
3. The Upload button opens /pay/<order>/?t=<private token>: a private page where the customer sees the amount and details and uploads a screenshot (JPG, PNG, WebP, HEIC or PDF up to 4 MB). It arrives in sales@ as an email attachment and the order shows a screenshot badge.
4. Step 2 'Payment received' emails the customer that the order is confirmed. Step 3 'Dispatched' emails the tracking number. Status changes automatically.
Links use ADMIN_SESSION_SECRET (or ORDER_LINK_SECRET) to sign each customer's link: changing it invalidates links already sent.
