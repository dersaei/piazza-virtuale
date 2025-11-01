// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for cache revalidation
 *
 * Usage from Directus webhook:
 * POST /api/revalidate
 *
 * Body (JSON):
 * {
 *   "secret": "your-secret-token",
 *   "tags": ["producers", "producers-pasta", "magazine-articles"]
 * }
 *
 * Or revalidate specific resource:
 * {
 *   "secret": "your-secret-token",
 *   "collection": "producers",
 *   "categorySlug": "pasta"  // optional, for category-specific revalidation
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tags, collection, categorySlug } = body;

    // Verify secret token (set this in your .env.local)
    const revalidateSecret = process.env.REVALIDATE_SECRET_TOKEN;

    if (!revalidateSecret) {
      console.error('REVALIDATE_SECRET_TOKEN not configured');
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      );
    }

    if (secret !== revalidateSecret) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Revalidate by tags (custom tags array)
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag, 'max');
        console.log(`✅ Revalidated tag: ${tag}`);
      }

      return NextResponse.json({
        revalidated: true,
        tags,
        timestamp: new Date().toISOString(),
      });
    }

    // Revalidate by collection type
    if (collection === 'producers') {
      const tagsToRevalidate = ['producers'];

      // If categorySlug provided, also revalidate that specific category
      if (categorySlug) {
        tagsToRevalidate.push(`producers-${categorySlug}`);
      }

      for (const tag of tagsToRevalidate) {
        revalidateTag(tag, 'max');
        console.log(`✅ Revalidated tag: ${tag}`);
      }

      return NextResponse.json({
        revalidated: true,
        collection: 'producers',
        tags: tagsToRevalidate,
        timestamp: new Date().toISOString(),
      });
    }

    if (collection === 'magazine_articles') {
      revalidateTag('magazine-articles', 'max');
      console.log('✅ Revalidated tag: magazine-articles');

      return NextResponse.json({
        revalidated: true,
        collection: 'magazine_articles',
        tags: ['magazine-articles'],
        timestamp: new Date().toISOString(),
      });
    }

    if (collection === 'magazine_cards') {
      revalidateTag('magazine-cards', 'max');
      console.log('✅ Revalidated tag: magazine-cards');

      return NextResponse.json({
        revalidated: true,
        collection: 'magazine_cards',
        tags: ['magazine-cards'],
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'Invalid request: missing tags or collection' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in revalidation endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/revalidate',
    method: 'POST',
    description: 'Cache revalidation endpoint for Directus webhooks',
  });
}
