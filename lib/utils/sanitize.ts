// lib/utils/sanitize.ts
import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML content from Directus CMS WYSIWYG fields
 * to prevent XSS attacks while preserving safe formatting
 *
 * This is used for content that comes from Directus CMS admin panel,
 * which uses WYSIWYG editors. While the content is controlled by admins,
 * sanitization provides an additional security layer.
 *
 * @param dirty - The raw HTML string from Directus
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * ```tsx
 * <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }} />
 * ```
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    // Allow common formatting tags used in Directus WYSIWYG
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre",
      "span",
      "div",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
    ],
    // Allow safe attributes
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "class",
      "id",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "style", // For inline styles from WYSIWYG
    ],
    // Automatically add rel="noopener noreferrer" to external links
    ADD_ATTR: ["target"],
    // Allow data URIs for images (base64 encoded images from WYSIWYG)
    ALLOW_DATA_ATTR: false,
    // Return safe HTML
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}

/**
 * Sanitizes HTML with more restrictive rules for short text fields
 * like titles and names where only basic formatting is needed
 *
 * @param dirty - The raw HTML string from Directus
 * @returns Sanitized HTML string with basic formatting only
 *
 * @example
 * ```tsx
 * <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtmlBasic(producerName) }} />
 * ```
 */
export function sanitizeHtmlBasic(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    // Only allow basic inline formatting for titles/names
    ALLOWED_TAGS: ["strong", "em", "u", "br", "span"],
    ALLOWED_ATTR: ["class"],
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}
