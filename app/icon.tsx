import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          borderRadius: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3h12l-1.2 6.5a5 5 0 0 1-2.3 3.3L13 13.5V19h3v2H8v-2h3v-5.5l-1.5-.7a5 5 0 0 1-2.3-3.3L6 3z"
            fill="#D4AF37"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
