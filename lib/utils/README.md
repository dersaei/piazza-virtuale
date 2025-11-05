# Utility Functions

## HTML Sanitization

### Overview

This directory contains utility functions for sanitizing HTML content from Directus CMS to prevent XSS (Cross-Site Scripting) attacks.

### Functions

#### `sanitizeHtml(dirty: string): string`

Sanitizes full HTML content from Directus CMS WYSIWYG editors with comprehensive tag support.

**Use for:**
- Full article content
- Rich text descriptions
- Magazine articles
- Any WYSIWYG content with images, links, tables, etc.

**Allowed tags:**
- Text formatting: `<p>`, `<br>`, `<strong>`, `<em>`, `<u>`, `<s>`, `<span>`, `<div>`
- Headings: `<h1>` - `<h6>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Links: `<a>` (with `href`, `target`, `rel`)
- Code: `<code>`, `<pre>`, `<blockquote>`
- Media: `<img>`, `<figure>`, `<figcaption>`
- Tables: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- Other: `<hr>`

**Example:**
```tsx
import { sanitizeHtml } from '@/lib/utils/sanitize';

<div
  className={styles.articleContent}
  dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
/>
```

#### `sanitizeHtmlBasic(dirty: string): string`

Sanitizes HTML with restrictive rules for short text fields like titles and names.

**Use for:**
- Titles
- Names
- Short descriptions
- Headlines
- Any text that should only have basic inline formatting

**Allowed tags:**
- `<strong>`, `<em>`, `<u>`, `<br>`, `<span>`

**Example:**
```tsx
import { sanitizeHtmlBasic } from '@/lib/utils/sanitize';

<h2
  className={styles.producerName}
  dangerouslySetInnerHTML={{ __html: sanitizeHtmlBasic(producerName) }}
/>
```

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

### Testing

Tests are available in `__tests__/sanitize.test.ts` and verify:
- Allowed tags are preserved
- Dangerous tags are removed
- Event handlers are stripped
- Links are safe
- Empty input is handled

Run tests with:
```bash
npm test -- sanitize.test.ts
```

### Dependencies

- `isomorphic-dompurify`: Isomorphic (works in Node.js and browser) HTML sanitizer
  - Based on DOMPurify (industry standard)
  - Works with React Server Components
  - Zero dependencies in production

### Configuration

To modify allowed tags/attributes, edit the configuration in:
- `lib/utils/sanitize.ts`

Always test changes thoroughly to ensure:
1. Security is not compromised
2. Content displays correctly
3. Directus WYSIWYG output is compatible
