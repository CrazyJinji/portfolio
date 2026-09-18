import { ImageResponse } from 'next/og';

// נוצרת בזמן build ומוגשת כתמונה סטטית
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Leon Krasnik - Practical Electronic Engineer & RF Engineer';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#60a5fa',
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>

        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, lineHeight: 1.1 }}>
          Leon Krasnik
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.2,
            marginTop: 18,
            color: '#93c5fd',
          }}
        >
          Practical Electronic Engineer &amp; RF Systems
        </div>

        <div style={{ display: 'flex', marginTop: 48, gap: 16, fontSize: 26, color: '#94a3b8' }}>
          <span>RF &amp; Satellite</span>
          <span>·</span>
          <span>System Design</span>
          <span>·</span>
          <span>TypeScript / Python</span>
        </div>
      </div>
    ),
    size
  );
}
