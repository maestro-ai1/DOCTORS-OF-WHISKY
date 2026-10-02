const H = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };

/** Claim ceremony: nothing to claim because anonymous identities carry no account. */
export function POST() {
  return new Response(JSON.stringify({ claimed: false, reason: 'Anonymous access needs no claim. All catalogue resources are public.' }), { headers: H });
}
export const GET = POST;
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...H, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': '*' } });
}
