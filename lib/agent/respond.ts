const BASE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
};

export function respond(body: string, contentType: string): Response {
  return new Response(body, { headers: { ...BASE_HEADERS, 'Content-Type': contentType } });
}

export const jsonResponse = (obj: unknown, contentType = 'application/json; charset=utf-8') =>
  respond(JSON.stringify(obj, null, 2) + '\n', contentType);
