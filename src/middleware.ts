// src/middleware.ts
import { defineMiddleware, sequence } from "astro:middleware";

/**
 * Rate Limiting - prosty in-memory store
 * W produkcji użyj Redis lub podobnego
 */
const requestStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(ip: string, path: string): string {
  return `${ip}:${path}`;
}

function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, value] of requestStore.entries()) {
    if (value.resetAt < now) {
      requestStore.delete(key);
    }
  }
}

// Cleanup co 5 minut
setInterval(cleanupOldEntries, 5 * 60 * 1000);

/**
 * Rate Limiting Middleware
 * Limit: 5 requestów per minutę na endpoint
 */
const rateLimitMiddleware = defineMiddleware(async (context, next) => {
  // Tylko dla API routes
  if (!context.url.pathname.startsWith('/api/')) {
    return next();
  }

  const ip = context.clientAddress || 'unknown';
  const path = context.url.pathname;
  const key = getRateLimitKey(ip, path);

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuta
  const maxRequests = 5;

  const record = requestStore.get(key);

  if (!record || record.resetAt < now) {
    // Nowy window
    requestStore.set(key, {
      count: 1,
      resetAt: now + windowMs
    });
  } else if (record.count >= maxRequests) {
    // Przekroczony limit
    console.warn(`⚠️ Rate limit exceeded for ${ip} on ${path}`);

    return new Response(
      JSON.stringify({
        error: 'Troppo molte richieste. Riprova tra un minuto.',
        retryAfter: Math.ceil((record.resetAt - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((record.resetAt - now) / 1000))
        }
      }
    );
  } else {
    // Zwiększ licznik
    record.count++;
  }

  // Zapisz info w locals
  context.locals.requestCount = record.count;
  context.locals.clientIp = ip;

  return next();
});

/**
 * CSRF Protection Middleware
 * Sprawdza origin header dla POST/PUT/DELETE
 */
const csrfProtectionMiddleware = defineMiddleware(async (context, next) => {
  // Tylko dla mutating methods na API
  if (!context.url.pathname.startsWith('/api/')) {
    return next();
  }

  const method = context.request.method;

  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    const origin = context.request.headers.get('origin');
    const host = context.request.headers.get('host');

    // W development akceptuj localhost
    const allowedOrigins = [
      `https://${host}`,
      `http://${host}`,
    ];

    // Development
    if (import.meta.env.DEV) {
      allowedOrigins.push('http://localhost:4321', 'http://localhost:3000');
    }

    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      console.warn(`⚠️ CSRF: Invalid origin ${origin} for ${host}`);

      return new Response(
        JSON.stringify({ error: 'Invalid request origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  return next();
});

/**
 * Security Headers Middleware
 */
const securityHeadersMiddleware = defineMiddleware(async (context, next) => {
  const response = await next();

  // Dodaj security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Dla API responses
  if (context.url.pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }

  return response;
});

/**
 * Request Logging Middleware
 */
const loggingMiddleware = defineMiddleware(async (context, next) => {
  const start = Date.now();
  const { pathname } = context.url;
  const method = context.request.method;

  // Tylko loguj API calls
  if (pathname.startsWith('/api/')) {
    console.log(`📥 ${method} ${pathname} from ${context.locals.clientIp || 'unknown'}`);
  }

  const response = await next();

  if (pathname.startsWith('/api/')) {
    const duration = Date.now() - start;
    console.log(`📤 ${method} ${pathname} → ${response.status} (${duration}ms)`);
  }

  return response;
});

/**
 * Combine all middleware in sequence
 */
export const onRequest = sequence(
  rateLimitMiddleware,
  csrfProtectionMiddleware,
  securityHeadersMiddleware,
  loggingMiddleware
);
