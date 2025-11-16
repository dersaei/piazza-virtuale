# CSS dla Astro - Piazza Virtuale

Struktura stylów CSS dla projektu Piazza Virtuale w Astro.

## Struktura plików

```
src/styles/
├── reset.css       # Reset CSS - normalizacja stylów przeglądarki
├── definevars.css  # Definicje wszystkich zmiennych CSS
├── globals.css     # Globalne style (scrollbar, selection, layout)
└── README.md       # Ten plik
```

## Jak używać CSS w Astro

### 1. Globalne style w layoutcie

Importuj globalne style w głównym layoutcie (`src/layouts/Layout.astro`):

```astro
---
import '../styles/reset.css';
import '../styles/definevars.css';
import '../styles/globals.css';
---
```

**Kolejność jest ważna:**
1. `reset.css` - resetuje style przeglądarki
2. `definevars.css` - definiuje zmienne CSS
3. `globals.css` - stosuje globalne style używające zmiennych

### 2. CSS Modules (dla komponentów)

CSS Modules działają identycznie jak w Next.js:

```astro
---
// src/components/HomePage.astro
import styles from '../styles/HomePage.module.css';
---

<div class={styles.container}>
  <h1 class={styles.title}>Witaj!</h1>
</div>
```

### 3. Scoped Styles (wbudowane w Astro)

Możesz pisać CSS bezpośrednio w komponencie - będzie automatycznie scoped:

```astro
<div class="container">
  Zawartość
</div>

<style>
  .container {
    /* Ten CSS jest automatycznie scoped do tego komponentu */
    padding: var(--space-lg);
  }
</style>
```

### 4. Global styles w komponencie

Jeśli potrzebujesz globalnych stylów w komponencie, użyj `is:global`:

```astro
<style is:global>
  body {
    /* To będzie globalne */
    background: var(--content-bg);
  }
</style>
```

## Zmienne CSS (CSS Custom Properties)

Wszystkie zmienne są zdefiniowane w `definevars.css`. Możesz ich używać w dowolnym pliku CSS:

### Kolory
```css
var(--vertical-header-bg)
var(--horizontal-header-bg)
var(--content-bg)
var(--refined-bg-primary)
var(--refined-accent-gold)
/* ... i wiele innych */
```

### Odstępy
```css
var(--space-xs)   /* 0.25rem */
var(--space-sm)   /* 0.5rem */
var(--space-md)   /* 1rem */
var(--space-lg)   /* 1.75rem */
var(--space-xl)   /* 2.5rem */
```

### Typografia
```css
var(--font-serif)   /* Lora */
var(--font-sans)    /* Source Sans 3 */
var(--font-futura)  /* Outfit */
var(--font-didot)   /* Cormorant Garamond */
```

### Przykład użycia zmiennych

```css
.my-component {
  background-color: var(--content-bg);
  padding: var(--space-lg);
  font-family: var(--font-sans);
  color: var(--refined-text-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
  transition: all var(--transition-base);
}
```

## Różnice między Next.js a Astro

### Next.js (stare podejście)
```jsx
// pages/_app.js
import '../styles/reset.css'
import '../styles/globals.css'
```

### Astro (nowe podejście)
```astro
---
// src/layouts/Layout.astro
import '../styles/reset.css';
import '../styles/definevars.css';
import '../styles/globals.css';
---
```

## Fonty

### Next.js używał next/font:
```js
import { Lora } from 'next/font/google'
const lora = Lora({ subsets: ['latin'] })
```

### W Astro używamy Google Fonts bezpośrednio:
```html
<!-- W <head> layoutu -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Lora..." rel="stylesheet" />
```

Następnie definiujemy zmienne w globalnym CSS:
```css
:root {
  --font-serif: 'Lora', serif;
}
```

## Migracja CSS Modules

Pliki `.module.css` działają bez zmian! Po prostu zmień importy:

### Przed (Next.js):
```jsx
import styles from '../styles/HomePage.module.css'
```

### Po (Astro):
```astro
import styles from '../styles/HomePage.module.css';
```

## Responsive Design

Wszystkie media queries z Next.js działają bez zmian:

```css
@media (max-width: 768px) {
  /* Style dla tabletów */
}

@media (max-width: 600px) {
  /* Style dla mobile */
}
```

## Best Practices

1. **Używaj zmiennych CSS** zamiast hardcodowanych wartości
2. **Scoped styles** dla komponentów specyficznych stylów
3. **CSS Modules** dla większych komponentów wymagających modularności
4. **Globalne style** tylko dla rzeczywiście globalnych rzeczy (reset, variables, body)
5. **Mobile-first** - pisz style dla mobile, potem dodawaj media queries dla większych ekranów

## Kolejne kroki w migracji

Po przygotowaniu CSS, następne kroki to:

1. ✅ Migracja CSS (zakończona)
2. 🔄 Migracja komponentów React → Astro
3. 🔄 Migracja routingu (pages → src/pages)
4. 🔄 Migracja API routes (jeśli są)
5. 🔄 Konfiguracja buildu (astro.config.mjs)
6. 🔄 Testowanie i optymalizacja
