// Generates the values needed for the admin portal, so no password is ever stored in code or in plain text:
//   node scripts/hash-admin-password.mjs                 (prompts for the passkey, input hidden)
//   ADMIN_PASSKEY='your passkey' node scripts/hash-admin-password.mjs   (non-interactive)
// Prints ADMIN_PASSWORD_HASH (scrypt) and a fresh random ADMIN_SESSION_SECRET. Put both in Vercel env vars, never in git.
import { randomBytes, scrypt as scryptCb } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb);

async function readHidden(prompt) {
  if (!process.stdin.isTTY) throw new Error('No TTY: set ADMIN_PASSKEY in the environment instead.');
  process.stdout.write(prompt);
  return new Promise((resolve) => {
    let value = '';
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    const onData = (ch) => {
      for (const c of ch) {
        if (c === '\r' || c === '\n') {
          // Ignore a stray Enter (for example the one that launched this command): keep waiting until something is typed.
          if (!value) continue;
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.off('data', onData);
          process.stdout.write('\n');
          return resolve(value);
        }
        if (c === '\u0003') process.exit(1);
        if (c === '\u007f' || c === '\b') value = value.slice(0, -1);
        else value += c;
      }
    };
    process.stdin.on('data', onData);
  });
}

const passkey = process.env.ADMIN_PASSKEY || (await readHidden('Admin passkey: '));
if (passkey.length < 8) {
  console.error('Passkey must be at least 8 characters. A long passphrase (4+ random words) is strongly recommended.');
  process.exit(1);
}

const N = 16384, r = 8, p = 1;
const salt = randomBytes(16);
const key = await scrypt(passkey, salt, 64, { N, r, p });
const hash = `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${key.toString('base64')}`;

const sessionSecret = randomBytes(48).toString('base64url');
const lines = `ADMIN_PASSWORD_HASH=${hash}\nADMIN_SESSION_SECRET=${sessionSecret}`;

console.log('\n' + lines);
console.log('\nQuote the hash in .env files (it contains $ characters): ADMIN_PASSWORD_HASH="..."');
console.log('Changing the hash or the secret signs everyone out.');

// Copy both lines to the clipboard so they can be pasted straight into the Vercel "Add Environment Variable" form.
try {
  const { spawnSync } = await import('node:child_process');
  const cmd = process.platform === 'win32' ? ['clip'] : process.platform === 'darwin' ? ['pbcopy'] : ['xclip', '-selection', 'clipboard'];
  const r = spawnSync(cmd[0], cmd.slice(1), { input: lines, encoding: 'utf8' });
  if (r.status === 0) console.log('\nCopied both lines to your clipboard. Paste them into the Key box in Vercel (Ctrl+V).');
} catch {
  /* clipboard is a convenience only */
}
