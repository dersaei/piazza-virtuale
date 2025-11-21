// app/magazine/[slug]/loading.tsx
export default function Loading() {
  return (
    <article style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div className="skeleton-loading">
        {/* Loading skeleton for magazine article */}
        <div style={{
          height: '400px',
          background: '#e0e0e0',
          borderRadius: '8px',
          marginBottom: '2rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <h1 style={{
          height: '3rem',
          background: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '1rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          height: '1.5rem',
          background: '#f0f0f0',
          borderRadius: '4px',
          maxWidth: '200px',
          marginBottom: '2rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            height: '1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '0.75rem',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </article>
  );
}
