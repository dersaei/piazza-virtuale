# Migracja komponentów Next.js → Astro

Dokumentacja migracji strony głównej i headerów z Next.js do Astro.

## ✅ Zmigrowane komponenty

### 1. **VerticalHeader** (Lewy pasek nawigacyjny)

**Next.js:** `components/VerticalHeader.tsx`
**Astro:** `src/components/VerticalHeader.astro`

#### Kluczowe zmiany:

| Next.js | Astro | Wyjaśnienie |
|---------|-------|-------------|
| `'use client'` | ❌ Nie potrzebne | Komponent statyczny, bez client-side JS |
| `usePathname()` | `Astro.url.pathname` | Pathname dostępny server-side |
| `<Link>` z Next.js | `<a href>` | Zwykłe linki HTML |
| `<Image>` z Next.js | `<img>` | Zwykły tag img (lub Astro Image) |
| `import logo from '@/public'` | `src="/logo.png"` | Statyczne pliki z `/public` |

#### Struktura:

```astro
---
// Server-side code (frontmatter)
import styles from '../../styles/VerticalHeader.module.css';
const currentPath = Astro.url.pathname;
---

<!-- HTML template -->
<header class={styles.verticalHeader}>
  <!-- ... -->
</header>
```

**CSS Modules:** Działają **bez zmian**! ✅

---

### 2. **HorizontalHeader** (Górny pasek z kategoriami)

**Next.js:** `components/HorizontalHeader.tsx`
**Astro:** `src/components/HorizontalHeader.astro`

#### Kluczowe zmiany:

| Next.js | Astro | Wyjaśnienie |
|---------|-------|-------------|
| `'use client'` | `<script>` tag | Client-side JS w Astro |
| React hooks (`useState`, `useEffect`) | Vanilla JS | Prosty state management w JS |
| `usePathname()` | `Astro.url.pathname` + `window.location.pathname` | Server-side + client-side |
| Event handlers w JSX | `addEventListener()` | Vanilla JS event listeners |

#### Struktura:

```astro
---
// Server-side: początkowy stan
const currentPath = Astro.url.pathname;
const isOnBevandePage = currentPath.startsWith('/bevande');
---

<!-- HTML z początkowym stanem -->
<header>...</header>

<script>
  // Client-side: interaktywność
  document.addEventListener('DOMContentLoaded', () => {
    // Event listeners, state management
  });
</script>
```

**Hybrid rendering:** Server-side initial render + client-side interactivity

---

### 3. **HomePage** (Strona główna)

**Next.js:** `app/page.tsx`
**Astro:** `src/pages/index.astro`

#### Kluczowe zmiany:

| Next.js | Astro | Wyjaśnienie |
|---------|-------|-------------|
| `export const metadata` | Props w `<Layout>` | Metadata przez layout |
| `export default function` | `---` frontmatter + HTML | Astro component syntax |
| `<Image>` z Next.js | `<img>` | Zwykły img (lub `<Image>` z astro:assets) |
| Komponenty jako JSX | Komponenty jako Astro | Import i użycie identyczne |

#### File-based routing:

```
Next.js: app/page.tsx → /
Astro:   src/pages/index.astro → /
```

**Identyczna koncepcja!** ✅

---

## 📁 Struktura projektu

### Przed (Next.js):

```
piazza-virtuale/
├── app/
│   └── page.tsx              # Strona główna
├── components/
│   ├── VerticalHeader.tsx
│   └── HorizontalHeader.tsx
├── styles/
│   ├── VerticalHeader.module.css
│   ├── HorizontalHeader.module.css
│   └── HomePage.module.css
└── public/
    ├── logo-piazza-virtuale.png
    └── territorio-italiano.png
```

### Po (Astro):

```
piazza-virtuale/
├── src/
│   ├── pages/
│   │   └── index.astro       # Strona główna
│   ├── components/
│   │   ├── VerticalHeader.astro
│   │   └── HorizontalHeader.astro
│   ├── layouts/
│   │   └── Layout.astro      # Główny layout
│   └── styles/
│       ├── reset.css
│       └── globals.css
├── styles/                   # Stare CSS Modules (zachowane!)
│   ├── VerticalHeader.module.css
│   ├── HorizontalHeader.module.css
│   └── HomePage.module.css
└── public/
    ├── logo-piazza-virtuale.png
    └── territorio-italiano.png
```

**Uwaga:** CSS Modules zostały w katalogu `styles/` (nie `src/styles/`) dla kompatybilności.

---

## 🎯 Wzorce migracji

### 1. **Statyczny komponent (bez JS)**

**Next.js:**
```tsx
'use client';
import { usePathname } from 'next/navigation';

export default function MyComponent() {
  const pathname = usePathname();
  return <div>Current: {pathname}</div>;
}
```

**Astro:**
```astro
---
const pathname = Astro.url.pathname;
---
<div>Current: {pathname}</div>
```

### 2. **Interaktywny komponent (z JS)**

**Next.js:**
```tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Astro:**
```astro
<button id="counter">0</button>

<script>
  let count = 0;
  const btn = document.getElementById('counter');
  btn?.addEventListener('click', () => {
    count++;
    btn.textContent = count.toString();
  });
</script>
```

### 3. **CSS Modules**

**Identycznie w Next.js i Astro:**

```astro
---
import styles from '../styles/MyComponent.module.css';
---
<div class={styles.container}>
  <h1 class={styles.title}>Hello</h1>
</div>
```

**Bez żadnych zmian!** ✅

---

## 🔑 Kluczowe różnice

### Routing

| Aspekt | Next.js | Astro |
|--------|---------|-------|
| **Lokalizacja** | `app/page.tsx` | `src/pages/index.astro` |
| **Link** | `<Link href="/">` | `<a href="/">` |
| **Pathname** | `usePathname()` hook | `Astro.url.pathname` |
| **Dynamiczny** | `app/[slug]/page.tsx` | `src/pages/[slug].astro` |

### Client-side JS

| Next.js | Astro |
|---------|-------|
| `'use client'` directive | `<script>` tag |
| React hooks | Vanilla JS |
| Automatyczny bundling | Automatyczny bundling |
| Hydration | Brak (chyba że używasz React islands) |

### Images

| Next.js | Astro |
|---------|-------|
| `<Image src={img} />` | `<img src="/img.png">` |
| `import img from '@/public/img.png'` | `src="/img.png"` (z /public) |
| Automatyczna optymalizacja | Opcjonalna (`<Image>` z astro:assets) |

---

## 📦 Importy

### Next.js:
```tsx
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Component.module.css';
```

### Astro:
```astro
---
// Tylko CSS modules, reszta wbudowana
import styles from '../../styles/Component.module.css';

// Pathname z Astro.url
const pathname = Astro.url.pathname;
---
```

**Prostsze!** Mniej importów, więcej wbudowanych funkcji.

---

## ✨ Zalety migracji

### Performance

- ✅ **Zero JS by default** - statyczne komponenty nie wysyłają JS
- ✅ **Partial hydration** - JS tylko tam gdzie potrzebny
- ✅ **Szybsze ładowanie** - mniej bundle size

### Developer Experience

- ✅ **CSS Modules bez zmian** - kompatybilność 100%
- ✅ **Prostsze komponenty** - mniej boilerplate
- ✅ **Server-first** - domyślnie server-side rendering

### Przykład:

**VerticalHeader.tsx (Next.js):** ~50 linii + React runtime (~140 KB)
**VerticalHeader.astro (Astro):** ~50 linii + **0 KB JS** ✅

---

## 🧪 Testowanie

### Sprawdź czy działa:

```bash
# 1. Zainstaluj Astro
npm install astro@latest

# 2. Uruchom dev server
npm run dev
# lub
npx astro dev

# 3. Otwórz http://localhost:4321
```

### Co sprawdzić:

- ✅ Logo w VerticalHeader klikalne
- ✅ Nawigacja w VerticalHeader (aktywny link)
- ✅ Kategorie w HorizontalHeader
- ✅ Kliknięcie "Bevande" → pokazuje podkategorie
- ✅ Strzałka "wstecz" → wraca do głównych kategorii
- ✅ Hero section na stronie głównej
- ✅ Obrazy się ładują
- ✅ Style CSS działają

---

## 🐛 Możliwe problemy

### 1. **CSS Modules nie działają**

**Problem:** `class={styles.container}` nie działa

**Rozwiązanie:**
- Sprawdź czy importujesz z właściwej ścieżki
- Upewnij się że plik kończy się na `.module.css`

### 2. **Obrazy się nie ładują**

**Problem:** `<img src="/logo.png">` zwraca 404

**Rozwiązanie:**
- Sprawdź czy plik jest w `/public`
- Użyj ścieżki względem `/public` (bez `/public` w src)
- Przykład: `/public/logo.png` → `<img src="/logo.png">`

### 3. **Client-side JS nie działa**

**Problem:** Event listenery nie działają

**Rozwiązanie:**
- Sprawdź `<script>` tag w komponencie
- Użyj `document.addEventListener('DOMContentLoaded', ...)`
- Sprawdź console w DevTools

### 4. **Pathname nie aktualizuje się**

**Problem:** `Astro.url.pathname` zawsze zwraca to samo

**Wyjaśnienie:** To jest poprawne! `Astro.url` działa server-side.
Dla client-side użyj: `window.location.pathname`

---

## 📚 Następne kroki

Po stronie głównej i headerach, kolejne komponenty do migracji:

1. ✅ **HomePage** - zrobione
2. ✅ **VerticalHeader** - zrobione
3. ✅ **HorizontalHeader** - zrobione
4. 🔄 **Footer** - do zrobienia
5. 🔄 **Category pages** - do zrobienia
6. 🔄 **Magazine pages** - do zrobienia
7. 🔄 **Pozostałe statyczne strony** - do zrobienia

---

## 🔗 Przydatne linki

- [Astro Pages](https://docs.astro.build/en/basics/astro-pages/)
- [Astro Components](https://docs.astro.build/en/basics/astro-components/)
- [Client-side Scripts](https://docs.astro.build/en/guides/client-side-scripts/)
- [CSS Modules](https://docs.astro.build/en/guides/styling/#css-modules)
- [Astro vs React](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)

---

**Status:** ✅ Strona główna + headery gotowe!
**Następny krok:** Testowanie i migracja kolejnych stron
