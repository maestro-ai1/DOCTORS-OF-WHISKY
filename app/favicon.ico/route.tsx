import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// /favicon.ico (PNG-in-ICO) so crawlers and old browsers that ask for it directly get a 200, not a 404.
export async function GET() {
  const png = new Uint8Array(
    await new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M6 3h12l-1.2 6.5a5 5 0 0 1-2.3 3.3L13 13.5V19h3v2H8v-2h3v-5.5l-1.5-.7a5 5 0 0 1-2.3-3.3L6 3z" fill="#D4AF37" />
          </svg>
        </div>
      ),
      { width: 64, height: 64 }
    ).arrayBuffer()
  );
  const header = new Uint8Array(22);
  const view = new DataView(header.buffer);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, 1, true); // image count
  header[6] = 64; // width
  header[7] = 64; // height
  view.setUint16(10, 1, true); // colour planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, png.length, true); // image size
  view.setUint32(18, 22, true); // image offset
  const out = new Uint8Array(22 + png.length);
  out.set(header, 0);
  out.set(png, 22);
  return new Response(out, { headers: { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' } });
}
