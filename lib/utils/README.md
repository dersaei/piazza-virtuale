# Utility Functions

## HTML Sanitization

### Overview

HTML sanitization from Directus CMS is now handled by the `SafeHtml` Client Component to prevent XSS (Cross-Site Scripting) attacks.

**Location:** `components/shared/SafeHtml.tsx`

**Why Client Component?**
- DOMPurify (via isomorphic-dompurify) uses JSDOM which calls `new Date()` internally
- Next.js 16 + Turbopack doesn't allow `new Date()` during static generation in Server Components
- Since Directus content is static (doesn't change per request), client-side sanitization is optimal

### Usage

Import the `SafeHtml` component in your Server Components:

```tsx
import SafeHtml from '@/components/shared/SafeHtml';
```

#### Full Mode (for article content)

Use `mode="full"` for rich content from Directus WYSIWYG editor:

```tsx
<SafeHtml
  html={article.content}
  className={styles.articleContent}
  mode="full"
/>
```

**Allowed in full mode:**
- Text formatting: `<p>`, `<br>`, `<strong>`, `<em>`, `<u>`, `<s>`, `<span>`, `<div>`
- Headings: `<h1>` - `<h6>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Links: `<a>` (with `href`, `target`, `rel`)
- Code: `<code>`, `<pre>`, `<blockquote>`
- Media: `<img>`, `<figure>`, `<figcaption>`
- Tables: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- Other: `<hr>`

#### Basic Mode (for titles/names)

Use `mode="basic"` for short text fields with minimal formatting:

```tsx
<SafeHtml
  html={producerName}
  as="h2"
  className={styles.producerName}
  mode="basic"
/>
```

**Allowed in basic mode:**
- `<strong>`, `<em>`, `<u>`, `<br>`, `<span>`

#### Props

- `html` (required): Raw HTML string from Directus
- `className` (optional): CSS class for the wrapper element
- `as` (optional): HTML tag for wrapper - `div`, `span`, `h1`-`h6`, `p` (default: `div`)
- `mode` (optional): `'full'` or `'basic'` (default: `'full'`)

### Security Features

Both functions provide protection against:
- ✅ XSS attacks via `<script>` tags
- ✅ Event handlers (`onclick`, `onerror`, etc.)
- ✅ JavaScript URLs (`javascript:`)
- ✅ Unsafe attributes
- ✅ Base64 data URIs (blocked by default)

### When to Use

**Always use sanitization when:**
1. Rendering HTML from Directus CMS WYSIWYG fields
2. Displaying user-generated content (even from trusted admins)
3. Using `dangerouslySetInnerHTML`

**Even though:**
- Content comes from Directus CMS (controlled environment)
- Only admins can edit the content
- You trust the content source

**Why?**
- Defense in depth security principle
- Protection against compromised admin accounts
- Prevention of accidental XSS via copy-paste
- Compliance with security best practices

### Dependencies

- `isomorphic-dompurify`: Industry-standard HTML sanitizer
  - Works in both browser and Node.js
  - Actively maintained (updated November 2025)
  - Based on DOMPurify (most trusted XSS sanitizer)
  - Used as Client Component to avoid Next.js build issues

### Configuration

To modify allowed tags/attributes, edit the `getSanitizeConfig()` function in:
- `components/shared/SafeHtml.tsx`

Always test changes thoroughly to ensure:
1. Security is not compromised
2. Content displays correctly
3. Directus WYSIWYG output is compatible

### Migration from Server-side Sanitization

If you previously used server-side sanitization functions:

**Before (Server Component - causes build errors):**
```tsx
import { sanitizeHtml } from '@/lib/utils/sanitize';
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
```

**After (Client Component - works perfectly):**
```tsx
import SafeHtml from '@/components/shared/SafeHtml';
<SafeHtml html={content} mode="full" />
```
