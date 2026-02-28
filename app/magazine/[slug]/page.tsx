// app/magazine/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/ArticlePage.module.css';
import { getAllArticles, getArticleBySlug } from '@/lib/api/magazine';

// Note: Revalidation handled by Cache Components with "use cache" directive in lib/api/magazine.ts

function cleanHtmlText(html: string): string {
  if (!html) return '';
  let text = html.replace(/<[^>]*>?/gm, ' ');
  const entities: { [key: string]: string } = {
    '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&apos;': "'",
    '&lt;': '<', '&gt;': '>', '&egrave;': 'è', '&eacute;': 'é',
    '&agrave;': 'à', '&igrave;': 'ì', '&ograve;': 'ò', '&ugrave;': 'ù',
    '&Egrave;': 'È', '&Agrave;': 'À', '&Igrave;': 'Ì', '&Ograve;': 'Ò',
    '&Ugrave;': 'Ù', '&rsquo;': "'", '&lsquo;': "'", '&ldquo;': '"',
    '&rdquo;': '"', '&ndash;': '-', '&mdash;': '—', '&Eacute;': 'É',
  };
  text = text.replace(/&[a-zA-Z0-9#]+;/g, match => entities[match] || '');
  return text.replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Articolo non trovato',
      description: 'L\'articolo richiesto non è stato trovato nel nostro magazine.',
    };
  }

  const plainTitle = cleanHtmlText(article.title);

  // SEO title: Directus field > article title
  const seoTitle = article.seo?.title
    ? cleanHtmlText(article.seo.title)
    : plainTitle;

  // SEO description: Directus field > auto-extracted from content
  let seoDescription: string;
  if (article.seo?.meta_description) {
    seoDescription = article.seo.meta_description;
  } else {
    seoDescription = cleanHtmlText(article.content);
    if (seoDescription.length > 160) {
      seoDescription = seoDescription.substring(0, 157).trim() + '...';
    }
  }

  // Canonical URL: Directus field > default
  const canonicalUrl = article.seo?.canonical_url
    ?? `https://piazzavirtuale.it/magazine/${slug}`;

  // OG image: path from public/og-images/ > generated opengraph image
  const ogImageUrl = article.seo?.og_image
    ?? `https://piazzavirtuale.it/magazine/${slug}/opengraph-image`;

  return {
    title: seoTitle,
    description: seoDescription,
    robots: article.seo?.no_index ? { index: false, follow: true } : undefined,
    keywords: [
      article.category.name,
      'magazine',
      'produttori italiani',
      'cibo italiano',
      'bevande italiane',
      'made in italy',
    ],
    authors: [{ name: 'Piazza Virtuale' }],
    openGraph: {
      type: 'article',
      locale: 'it_IT',
      url: `https://piazzavirtuale.it/magazine/${slug}`,
      siteName: 'Piazza Virtuale',
      title: `${seoTitle} | Magazine - Piazza Virtuale`,
      description: seoDescription,
      publishedTime: article.date_created,
      modifiedTime: article.date_updated || article.date_created,
      authors: ['Piazza Virtuale'],
      section: article.category.display_name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seoTitle} | Magazine - Piazza Virtuale`,
      description: seoDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  // Next.js requires at least one entry when using Cache Components
  // If no articles (e.g., Directus unavailable during build), return placeholder
  if (articles.length === 0) {
    console.warn('No articles found - using placeholder for static generation');
    return [{ slug: 'placeholder' }];
  }

  return articles.map(article => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.articlePage}>
      <article
        className={styles.articleCard}
        style={
          {
            '--category-color': article.category.color,
          } as React.CSSProperties
        }
      >
        <Link href='/magazine' className={styles.backLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 10.903167075297461 5.97998046875'
            className={styles.backArrow}
          >
            <defs>
              <style>{`.uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42 { stroke-width: 0px; }`}</style>
            </defs>
            <g>
              <g>
                <path
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  d='m0,2.989990234375L5.345744680849748,0l-1.642589812583537,2.46002197265625h7.20001220703125v.52996826171875H0Z'
                />
                <path
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  d='m0,2.989990234375l5.345744680849748,2.989990234375-1.642589812583537-2.46002197265625h7.20001220703125v-.52996826171875H0Z'
                />
                <polygon
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  points='.765847817816393 3.262022593142319 10.723294626330244 3.262022593142319 10.723294626330244 2.607767273993886 .049733925455257 2.989990234375 .765847817816393 3.262022593142319'
                />
              </g>
            </g>
          </svg>
        </Link>
        <header className={styles.articleHeader}>
          <span className={styles.category}>{article.category.display_name}</span>
          <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
          <time className={styles.date}>
            {new Date(article.date_created).toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}
