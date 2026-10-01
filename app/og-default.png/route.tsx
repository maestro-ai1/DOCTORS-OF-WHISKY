import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Default 1200x630 social preview card (used wherever a page has no product photo of its own).
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #111111 0%, #2a1608 100%)',
          color: '#f5f0e6',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 8, color: '#D4AF37', textTransform: 'uppercase' }}>Doctors of Whisky</div>
        <div style={{ display: 'flex', fontSize: 78, fontWeight: 700, marginTop: 28, lineHeight: 1.1 }}>Buy Rare Whisky &amp; Fine Spirits Online</div>
        <div style={{ display: 'flex', fontSize: 34, marginTop: 32, color: '#d9cdb4' }}>Single malt · Japanese whisky · Bourbon · Tequila · Cognac</div>
        <div style={{ display: 'flex', fontSize: 30, marginTop: 40, color: '#D4AF37' }}>Sydney vaults · Insured delivery across Australia · 18+</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
