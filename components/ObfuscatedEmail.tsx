import React from 'react';

/** Renders an email address with HTML entities so scrapers reading raw markup do not harvest it; browsers show it normally. */
export function ObfuscatedEmail({ email }: { email: string }) {
  const encoded = email.replace(/@/g, '&#64;').replace(/\./g, '&#46;');
  return <span dangerouslySetInnerHTML={{ __html: encoded }} />;
}
