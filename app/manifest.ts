// app/manifest.ts (wersja minimalna)
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piazza Virtuale - Catalogo E-Shop Produttori Italiani',
    short_name: 'Piazza Virtuale',
    description:
      'Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfbf7',
    theme_color: '#b6c0ba',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
