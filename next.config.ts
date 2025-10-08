import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },
  async headers() {
    return [
      {
        // Cache static logo files for 1 year
        source: '/logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
