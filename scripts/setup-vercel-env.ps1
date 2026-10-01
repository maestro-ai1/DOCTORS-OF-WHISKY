# One-time Vercel environment setup for the order system and admin portal.
# Run from the project folder in PowerShell:   powershell -ExecutionPolicy Bypass -File scripts\setup-vercel-env.ps1
#
# Secrets (Zoho app password, admin passkey) are typed into HIDDEN prompts, piped straight to the Vercel CLI and marked
# "sensitive". They are never written to a file, never echoed, and never appear in code or git.
# Requires: Node.js (already installed) and a Vercel login (the script runs "vercel login" if needed).

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

function Read-Secret([string]$prompt) {
  $s = Read-Host -Prompt $prompt -AsSecureString
  $b = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($b) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($b) }
}

function Add-Env([string]$name, [string]$value, [bool]$sensitive = $false) {
  # --force replaces an existing value; the value is piped on stdin so it never appears in the process list
  $cliArgs = @('vercel', 'env', 'add', $name, 'production', '--force')
  if ($sensitive) { $cliArgs += '--sensitive' }
  $value | & npx @cliArgs | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Failed to set $name" }
  Write-Host "  set $name" -ForegroundColor Green
}

Write-Host "`n1/4  Vercel login and project link" -ForegroundColor Cyan
& npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) { & npx vercel login }
if (-not (Test-Path '.vercel\project.json')) { & npx vercel link --yes --project doctors-of-whisky }

Write-Host "`n2/4  Zoho mail (use a NEW app password, not your login password)" -ForegroundColor Cyan
Write-Host "     Zoho Mail > My Account > Security > App Passwords"
$zohoPass = Read-Secret 'Zoho app password'
if ($zohoPass.Length -lt 8) { throw 'That does not look like a Zoho app password.' }

Write-Host "`n3/4  Admin portal passkey (long passphrase recommended, at least 12 characters)" -ForegroundColor Cyan
$pk1 = Read-Secret 'Admin passkey'
$pk2 = Read-Secret 'Repeat admin passkey'
if ($pk1 -ne $pk2) { throw 'Passkeys do not match.' }
if ($pk1.Length -lt 8) { throw 'Passkey must be at least 8 characters.' }
$env:ADMIN_PASSKEY = $pk1
$hashOut = & node scripts/hash-admin-password.mjs
Remove-Item Env:\ADMIN_PASSKEY
$hash = ($hashOut | Where-Object { $_ -like 'ADMIN_PASSWORD_HASH=*' }) -replace '^ADMIN_PASSWORD_HASH=', ''
$secret = ($hashOut | Where-Object { $_ -like 'ADMIN_SESSION_SECRET=*' }) -replace '^ADMIN_SESSION_SECRET=', ''
if (-not $hash -or -not $secret) { throw 'Could not generate the admin hash.' }

Write-Host "`n4/4  Writing Vercel production environment variables" -ForegroundColor Cyan
Add-Env 'ZOHO_SMTP_HOST' 'smtp.zoho.com.au'
Add-Env 'ZOHO_SMTP_PORT' '465'
Add-Env 'ZOHO_SMTP_USER' 'sales@doctorsofwhisky.com.au'
Add-Env 'ZOHO_SMTP_PASS' $zohoPass $true
Add-Env 'SALES_EMAIL' 'sales@doctorsofwhisky.com.au'
Add-Env 'MAIL_FROM_NAME' 'Doctors of Whisky'
Add-Env 'APP_URL' 'https://doctorsofwhisky.com.au'
Add-Env 'ADMIN_PASSWORD_HASH' $hash $true
Add-Env 'ADMIN_SESSION_SECRET' $secret $true

$zohoPass = $null; $pk1 = $null; $pk2 = $null; $hash = $null; $secret = $null

Write-Host "`nDone. Remaining manual steps:" -ForegroundColor Yellow
Write-Host "  - Vercel dashboard > Storage > Marketplace > Upstash Redis > connect to doctors-of-whisky (so /admin can list orders)"
Write-Host "  - Push the code (or redeploy) so the new variables take effect"
Write-Host "  - Place one real test order with your own email, then reply to it from /admin/"
Write-Host "  - If your Zoho mailbox is in the global data centre, change ZOHO_SMTP_HOST to smtp.zoho.com"
