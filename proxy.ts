// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host');

  // Redirect www to non-www
  if (hostname?.startsWith('www.')) {
    const nonWwwUrl = new URL(request.url);
    nonWwwUrl.hostname = hostname.replace('www.', '');
    return NextResponse.redirect(nonWwwUrl, 301);
  }

  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logos (logo files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logos|android-chrome-).*)',
  ],
};
