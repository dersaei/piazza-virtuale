// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Piazza Virtuale - Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #f8f9fa 0%, #e9ecef 100%)',
          padding: '80px',
        }}
      >
        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#000',
              marginBottom: '30px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Piazza Virtuale
          </h1>

          <p
            style={{
              fontSize: '36px',
              color: '#495057',
              marginTop: 0,
              marginBottom: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande
          </p>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            display: 'flex',
            alignItems: 'center',
            color: '#868e96',
            fontSize: '24px',
          }}
        >
          Made in Italy 🇮🇹
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
