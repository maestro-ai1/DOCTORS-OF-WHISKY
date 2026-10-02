const H = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };

/** Event notifications (for example assertion revoked): acknowledged; no agent sessions are stored. */
export function POST() {
  return new Response(JSON.stringify({ accepted: true }), { status: 202, headers: H });
}
export const GET = () => new Response(JSON.stringify({ accepted: false, note: 'POST events to this endpoint.' }), { headers: H });
export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...H, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': '*' } });
}
