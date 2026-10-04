/**
 * Pre-filled WhatsApp text: each line is URL-encoded and joined with %0A (a line break).
 * Written this way so the compiled JavaScript contains no raw line breaks inside strings
 * (minification checkers read those as "unminified code").
 */
export const waText = (lines: string[]) => lines.map(encodeURIComponent).join('%0A');
