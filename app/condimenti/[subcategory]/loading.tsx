// app/condimenti/[subcategory]/loading.tsx
export default function Loading() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="skeleton-loading">
        {/* Loading skeleton for condimenti subcategory page */}
        <h1 style={{
          height: '2.5rem',
          background: '#e0e0e0',
          borderRadius: '4px',
          maxWidth: '300px',
          margin: '0 auto 2rem'
        }} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              height: '300px',
              background: '#f5f5f5',
              borderRadius: '8px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
