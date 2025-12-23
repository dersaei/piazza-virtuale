// app/magazine/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/api/magazine';

// Image metadata
export const alt = 'Articolo Magazine - Piazza Virtuale';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    // Fallback image if article not found
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
          }}
        >
          <p style={{ fontSize: 48, color: '#495057' }}>Articolo non trovato</p>
        </div>
      ),
      { ...size }
    );
  }

  // Clean HTML tags from title
  const plainTitle = article.title.replace(/<[^>]*>/g, '');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #f8f9fa 0%, #e9ecef 100%)',
          padding: '60px 80px',
        }}
      >
        {/* Header with category and brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#495057',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {article.category.display_name}
          </span>

          <span
            style={{
              fontSize: '24px',
              color: '#868e96',
            }}
          >
            Piazza Virtuale Magazine
          </span>
        </div>

        {/* Article title */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: plainTitle.length > 80 ? '48px' : '56px',
              fontWeight: 'bold',
              color: '#000',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '100%',
            }}
          >
            {plainTitle}
          </h1>
        </div>

        {/* Footer with date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              color: '#868e96',
            }}
          >
            {new Date(article.date_created).toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
