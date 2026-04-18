'use client';

export const dynamic = 'force-dynamic';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem', fontFamily: 'sans-serif' }}>
          <h2>เกิดข้อผิดพลาด</h2>
          <button onClick={reset} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </body>
    </html>
  );
}
