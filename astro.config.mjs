import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /**
   * Eksperymentalna Fonts API
   * Automatycznie pobiera, cachuje i optymalizuje fonty dla lepszej performance
   * Fonty są serwowane z własnego serwera zamiast z Google CDN (lepsza prywatność)
   */
  experimental: {
    fonts: [
      {
        // Lora - czcionka serif dla treści artykułów
        name: "Lora",
        cssVariable: "--font-serif",
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"], // Polski wymaga latin-ext
        fallbacks: ["Georgia", "serif"],
        display: "swap",
      },
      {
        // Source Sans 3 - czcionka sans-serif dla UI
        name: "Source Sans 3",
        cssVariable: "--font-sans",
        provider: fontProviders.google(),
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["Arial", "sans-serif"],
        display: "swap",
      },
      {
        // Outfit - alternatywa dla Futura, dla nagłówków
        name: "Outfit",
        cssVariable: "--font-futura",
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["Helvetica", "Arial", "sans-serif"],
        display: "swap",
      },
      {
        // Cormorant Garamond - alternatywa dla Didot, dla specjalnych nagłówków
        name: "Cormorant Garamond",
        cssVariable: "--font-didot",
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
        fallbacks: ["Garamond", "serif"],
        display: "swap",
      }
    ]
  },

  // Pozostała konfiguracja Astro
  output: 'static', // lub 'server' / 'hybrid' jeśli potrzebujesz SSR
});
