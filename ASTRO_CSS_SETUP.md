# Astro CSS Setup - Wariant A (Fonts API)

Dokumentacja struktury CSS dla projektu Piazza Virtuale w Astro z użyciem eksperymentalnej Fonts API.

## 📁 Struktura plików

```
piazza-virtuale/
├── astro.config.mjs          # Konfiguracja Astro + Fonts API
├── src/
│   ├── styles/
│   │   ├── reset.css         # Reset CSS
│   │   └── globals.css       # Zmienne CSS + globalne style
│   └── layouts/
│       └── Layout.astro      # Główny layout z komponentem <Font />
└── package.json
```

## 🎯 Kluczowe pliki

### 1. `astro.config.mjs`

Plik konfiguracyjny Astro z definicjami wszystkich fontów:

```js
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  experimental: {
    fonts: [
      {
        name: "Lora",
        cssVariable: "--font-serif",
        provider: fontProviders.google(),
        // ...
      },
      // ... inne fonty
    ]
  }
});
```

**Cechy:**
- ✅ Automatyczne pobieranie fontów z Google Fonts
- ✅ Cachowanie w `node_modules/.astro/fonts` (dev) i `_astro/fonts` (build)
- ✅ Serwowanie fontów z własnego serwera (lepsza prywatność niż Google CDN)
- ✅ Automatyczna optymalizacja fallback fontów
- ✅ Type-safe dzięki TypeScript

### 2. `src/layouts/Layout.astro`

Główny layout używający komponentu `<Font />`:

```astro
---
import '../styles/reset.css';
import '../styles/globals.css';
import { Font } from 'astro:assets';
---

<html lang="pl">
  <head>
    <!-- Preload najważniejszych fontów -->
    <Font cssVariable="--font-sans" preload />
    <Font cssVariable="--font-futura" preload />
    <Font cssVariable="--font-serif" />
    <Font cssVariable="--font-didot" />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  body {
    font-family: var(--font-sans);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-futura);
  }
</style>
```

**Użyte fonty:**
- `--font-sans`: Source Sans 3 (UI, body) - **preloaded** ⚡
- `--font-futura`: Outfit (nagłówki) - **preloaded** ⚡
- `--font-serif`: Lora (artykuły)
- `--font-didot`: Cormorant Garamond (specjalne nagłówki)

### 3. `src/styles/reset.css`

Standardowy reset CSS bez zmian z Next.js.

### 4. `src/styles/globals.css`

Wszystkie zmienne CSS i globalne style:

```css
:root {
  /* Kolory */
  --vertical-header-bg: #b6c0ba;
  --refined-accent-gold: #b8a281;

  /* Odstępy */
  --space-md: 1rem;
  --space-lg: 1.75rem;

  /* Zmienne fontów są definiowane automatycznie przez Fonts API */
  /* NIE trzeba definiować: */
  /* --font-serif: 'Lora', serif; */
}

/* Globalne style */
::selection { ... }
::-webkit-scrollbar { ... }
```

## 🚀 Jak używać

### Import CSS w komponencie Astro

```astro
---
// W komponencie .astro
import '../styles/SomeComponent.css';
---

<div>Content</div>
```

### CSS Modules (bez zmian z Next.js!)

```astro
---
import styles from '../styles/HomePage.module.css';
---

<div class={styles.container}>
  <h1 class={styles.title}>Hello</h1>
</div>
```

### Scoped styles (wbudowane w Astro)

```astro
<div class="container">Content</div>

<style>
  /* Ten CSS jest automatycznie scoped do tego komponentu */
  .container {
    padding: var(--space-lg);
  }
</style>
```

### Global styles w komponencie

```astro
<style is:global>
  body {
    background: var(--content-bg);
  }
</style>
```

## 📦 Instalacja i setup

### 1. Zainstaluj Astro i zależności

```bash
pnpm add astro@latest
pnpm add -D @astrojs/check typescript
```

### 2. Sprawdź wersję Astro

Fonts API wymaga **Astro 5.7.0+**

```bash
pnpm list astro
```

### 3. Zbuduj projekt

```bash
pnpm astro build
```

Fonty zostaną:
- Pobrane z Google Fonts
- Zoptymalizowane
- Zapisane w `_astro/fonts/`
- Cachowane dla przyszłych buildów

### 4. Uruchom dev server

```bash
pnpm astro dev
```

## 🎨 Dostępne zmienne CSS

### Kolory

```css
var(--vertical-header-bg)      /* #b6c0ba */
var(--horizontal-header-bg)    /* #f9f7f7 */
var(--content-bg)              /* #ffffff */
var(--refined-bg-primary)      /* #7a8471 */
var(--refined-accent-gold)     /* #b8a281 */
var(--refined-text-primary)    /* #2c2f2a */
```

### Odstępy

```css
var(--space-xs)   /* 0.25rem */
var(--space-sm)   /* 0.5rem */
var(--space-md)   /* 1rem */
var(--space-lg)   /* 1.75rem */
var(--space-xl)   /* 2.5rem */
```

### Fonty (automatycznie zdefiniowane przez Fonts API)

```css
var(--font-serif)   /* Lora */
var(--font-sans)    /* Source Sans 3 */
var(--font-futura)  /* Outfit */
var(--font-didot)   /* Cormorant Garamond */
```

## 🔧 Zaawansowana konfiguracja

### Preload konkretnych wariantów fontów

```astro
<Font
  cssVariable="--font-sans"
  preload={[
    { weight: '400', style: 'normal' },
    { weight: '700', style: 'normal' }
  ]}
/>
```

### Pobierz tylko wybrane warianty

W `astro.config.mjs`:

```js
{
  name: "Source Sans 3",
  cssVariable: "--font-sans",
  provider: fontProviders.google(),
  weights: [400, 600], // Tylko 400 i 600
  styles: ["normal"],  // Bez italic
  subsets: ["latin"],  // Tylko latin (bez latin-ext)
}
```

### Granularna kontrola (Astro 5.15.6+)

Pobierz różne kombinacje weight/style tego samego fontu:

```js
// Normal 500 i 600
{
  name: "Roboto",
  cssVariable: "--roboto",
  provider: fontProviders.google(),
  weights: [500, 600],
  styles: ["normal"]
},
// Italic tylko 500
{
  name: "Roboto",
  cssVariable: "--roboto",
  provider: fontProviders.google(),
  weights: [500],
  styles: ["italic"]
}
```

## 📊 Performance

### Przed (Google Fonts CDN)
- ❌ Dodatkowe DNS lookup do fonts.googleapis.com
- ❌ Dodatkowe połączenie HTTPS do fonts.gstatic.com
- ❌ Brak kontroli nad cachowaniem
- ❌ Wysyłanie danych użytkownika do Google

### Po (Fonts API)
- ✅ Fonty z własnego serwera (1 domena)
- ✅ Automatyczny preload najważniejszych fontów
- ✅ Cachowane w node_modules (dev) i _astro (build)
- ✅ Pełna kontrola nad cachowaniem (HTTP cache ~1 rok)
- ✅ Brak wysyłania danych do Google (prywatność)
- ✅ Automatycznie optymalizowane fallbacks

## 🧹 Cachowanie

### Development

Cache: `node_modules/.astro/fonts`

Czyszczenie:
```bash
rm -rf node_modules/.astro/fonts
```

### Production build

Output: `dist/_astro/fonts/`

Czyszczenie całego cache:
```bash
rm -rf .astro/fonts
```

## 🐛 Troubleshooting

### "Cannot find module 'astro:assets'"

Sprawdź wersję Astro:
```bash
pnpm list astro
```

Zaktualizuj do 5.7.0+:
```bash
pnpm update astro@latest
```

### Fonty się nie ładują

1. Sprawdź czy `experimental.fonts` jest w `astro.config.mjs`
2. Sprawdź czy komponenty `<Font />` są w `<head>`
3. Sprawdź cache: `rm -rf node_modules/.astro/fonts`
4. Przebuduj: `pnpm astro build`

### TypeScript errors

```bash
pnpm astro check
```

## 📚 Kolejne kroki w migracji

Po CSS, następne etapy:

1. ✅ **CSS & Fonty** - gotowe
2. 🔄 **Komponenty** - migracja React → Astro
3. 🔄 **Routing** - pages/ → src/pages/
4. 🔄 **API routes** - (jeśli używane)
5. 🔄 **Images** - next/image → astro:assets
6. 🔄 **Testowanie** - weryfikacja wszystkich stron

## 🔗 Przydatne linki

- [Astro Fonts API](https://docs.astro.build/en/reference/configuration-reference/#experimentalfonts)
- [Astro Styling](https://docs.astro.build/en/guides/styling/)
- [unifont (pod maską Fonts API)](https://github.com/unjs/unifont)

---

**Status:** ✅ Gotowe do użycia
**Wersja Astro:** 5.7.0+
**Package manager:** pnpm
