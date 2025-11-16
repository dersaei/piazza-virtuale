# Astro - Wymagane zależności

Lista zależności potrzebnych do uruchomienia projektu Piazza Virtuale w Astro.

## 📦 package.json dla Astro

```json
{
  "name": "piazza-virtuale",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check"
  },
  "dependencies": {
    "@directus/sdk": "^20.1.1",
    "ackee-tracker": "^5.1.0",
    "astro": "^5.7.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@types/node": "^24.10.1",
    "typescript": "^5.9.3"
  }
}
```

## 🔧 Instalacja

### Krok 1: Instalacja Astro (minimalna wersja 5.7.0 dla Fonts API)

```bash
pnpm add astro@latest
```

### Krok 2: Instalacja narzędzi deweloperskich

```bash
pnpm add -D @astrojs/check typescript
```

### Krok 3: (Opcjonalnie) Dodatkowe integracje Astro

Jeśli będziesz używać React w niektórych komponentach (islands architecture):

```bash
pnpm add @astrojs/react react react-dom
pnpm add -D @types/react @types/react-dom
```

## 📋 Porównanie: Next.js vs Astro

| Zależność | Next.js | Astro | Notatki |
|-----------|---------|-------|---------|
| Framework | `next` | `astro` | Podstawowy framework |
| React | `react`, `react-dom` | Opcjonalne | W Astro tylko dla islands |
| TypeScript check | Wbudowane | `@astrojs/check` | Osobny pakiet |
| Dev server | `next dev` | `astro dev` | Różne komendy |
| Build | `next build` | `astro build` | Różne komendy |
| ESLint | `eslint-config-next` | Własna config | Next.js ma gotową |

## 🎯 Scripts w package.json

```json
{
  "scripts": {
    "dev": "astro dev",              // Development server (domyślnie http://localhost:4321)
    "build": "astro build",          // Production build → dist/
    "preview": "astro preview",      // Preview production build lokalnie
    "astro": "astro",                // Astro CLI
    "check": "astro check"           // Type checking dla .astro files
  }
}
```

## 🚀 Komendy Astro CLI

```bash
# Development
pnpm dev                    # Start dev server na http://localhost:4321

# Build
pnpm build                  # Build do dist/

# Preview
pnpm preview                # Preview production build

# Type checking
pnpm check                  # Sprawdź typy w plikach .astro

# Info
pnpm astro info             # Pokaż info o środowisku

# Add integration
pnpm astro add react        # Dodaj integrację React
pnpm astro add tailwind     # Dodaj Tailwind CSS
```

## 📝 Dodatkowe uwagi

### 1. `"type": "module"`

Astro wymaga ESM, więc package.json musi mieć:

```json
{
  "type": "module"
}
```

### 2. pnpm-specific

Jeśli używasz `pnpm`, może być potrzebna konfiguracja w `astro.config.mjs`:

```js
export default defineConfig({
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  }
});
```

To już jest w przygotowanym `astro.config.mjs` ✅

### 3. Directus SDK

`@directus/sdk` powinno działać bez zmian w Astro. Sprawdź czy API calls są w:
- Server-side code (frontmatter w .astro)
- API routes (`src/pages/api/*.ts`)
- Server endpoints (`src/pages/*.json.ts`)

### 4. Ackee Tracker

`ackee-tracker` może wymagać:
- Client-side script w layoutcie
- Conditional loading (tylko w production)

Przykład:
```astro
---
// src/layouts/Layout.astro
const isProd = import.meta.env.PROD;
---

{isProd && (
  <script>
    import * as ackeeTracker from 'ackee-tracker';
    ackeeTracker.create('https://ackee.example.com').record('...');
  </script>
)}
```

## 🔄 Migracja zależności

### Usuń (związane z Next.js):
```bash
pnpm remove next eslint-config-next babel-plugin-react-compiler
```

### Dodaj (związane z Astro):
```bash
pnpm add astro@latest
pnpm add -D @astrojs/check
```

### Zachowaj:
- `@directus/sdk` ✅
- `ackee-tracker` ✅ (może wymagać adaptacji)
- `typescript` ✅
- `@types/node` ✅

### Opcjonalnie (jeśli używasz React):
```bash
pnpm add @astrojs/react react react-dom
pnpm add -D @types/react @types/react-dom
```

Ale **NIE jest to wymagane!** W Astro możesz pisać wszystko jako komponenty `.astro`.

## 📊 Rozmiar bundle (porównanie)

### Next.js
- React runtime: ~140 KB (gzipped)
- Next.js runtime: ~80 KB
- **Razem: ~220 KB minimum**

### Astro (static)
- Żaden JS runtime (domyślnie)
- Tylko twój kod
- **0 KB jeśli nie używasz client-side JS**

### Astro (z islands)
- Tylko JS dla komponentów z `client:*` directive
- React ładowany tylko tam gdzie potrzebny
- **5-50 KB w zależności od użycia**

## 🎯 Następne kroki

Po zainstalowaniu zależności:

1. ✅ Zainstaluj `astro` i zależności
2. ✅ Sprawdź czy `astro.config.mjs` istnieje
3. ✅ Uruchom `pnpm dev`
4. 🔄 Zacznij migrować komponenty
5. 🔄 Przetestuj build: `pnpm build`

---

**Status:** 📝 Instrukcje gotowe
**Wersja Astro:** 5.7.0+
**Package manager:** pnpm
