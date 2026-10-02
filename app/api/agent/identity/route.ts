import { SITE } from '@/lib/config';

const H = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };
const D = `https://${SITE.domain}`;

/** Agent identity: the catalogue is public, so agents are accepted anonymously and no credential is issued. */
export function POST() {
  return new Response(JSON.stringify({ identity_type: 'anonymous', access: 'public', credential: null, resources: `${D}/llms.txt`, documentation: `${D}/auth.md` }), { headers: H });
}
export const GET = POST;
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...H, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': '*' } });
}
