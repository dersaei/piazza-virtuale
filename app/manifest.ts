import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piazza Virtuale',
    short_name: 'PV',
    description:
      'Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfbf7',
    theme_color: '#b6c0ba',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
