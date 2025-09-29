// lib/directus.js - Updated for domain-based deployment
import { createDirectus, rest } from '@directus/sdk';

// Configuration for different environments
const getDirectusUrl = () => {
  // Check if we're running in production
  if (process.env.NODE_ENV === 'production') {
    // In production, we need to consider where the request is coming from

    // If this code runs on the server (SSR/API routes), use internal connection
    if (typeof window === 'undefined') {
      return 'http://localhost:8055'; // Server-side: direct local connection
    }

    // If this code runs in the browser, use the public subdomain
    return 'https://cms.piazzavirtuale.it'; // Client-side: public subdomain
  }

  // Development environment - use direct IP access
  return 'http://185.238.72.187:8055';
};

const directus = createDirectus(getDirectusUrl()).with(rest());

export default directus;
