import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

  // React Compiler - automatic memoization for performance optimization
  // Note: This increases build time as it uses Babel
  reactCompiler: true,

  // Cache Components - explicit caching with "use cache" directive
  // Enables Partial Pre-Rendering (PPR) and granular cache control
  cacheComponents: true,

  images: {
    unoptimized: true, // Disable Image Optimization API for standalone mode
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
      {
        // Cache PWA manifest for 24 hours (instead of default max-age=0, must-revalidate)
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800",
          },
        ],
      },
      {
        // Cache static logo files for 1 year
        source: "/logos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache PWA icons (android-chrome) for 1 year
        source: "/android-chrome-:size.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
