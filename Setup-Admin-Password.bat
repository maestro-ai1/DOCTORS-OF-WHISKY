@echo off
setlocal
cd /d "%~dp0"
title Doctors of Whisky - admin password setup
echo.
echo  =====================================================
echo   Doctors of Whisky - set up the admin password
echo  =====================================================
echo.
echo  Choose the password you will use to sign in at
echo  doctorsofwhisky.com.au/admin  (at least 8 characters).
echo  Avoid these symbols:  %% ! ^ ^& ^< ^>
echo.
set "ADMIN_PASSKEY="
set /p "ADMIN_PASSKEY=  Type your admin password, then press Enter: "
if "%ADMIN_PASSKEY%"=="" (
  echo.
  echo  Nothing was typed. Please double-click this file and try again.
  pause
  exit /b 1
)
echo.
node scripts\hash-admin-password.mjs
set "RESULT=%ERRORLEVEL%"
set "ADMIN_PASSKEY="
echo.
if not "%RESULT%"=="0" (
  echo  Something went wrong ^(see the message above^). Please tell Claude what it says.
  pause
  exit /b 1
)
echo  =====================================================
echo   DONE. The two settings are now COPIED to your clipboard.
echo.
echo   Next, in Vercel:
echo     1. Click the first box ^(Key^) on the form
echo     2. Press Ctrl+V
echo     3. Press Save, then Redeploy
echo.
echo   Your admin password is the one you just typed.
echo  =====================================================
echo.
pause
