// components/shared/SafeHtml.tsx
"use client";

import DOMPurify from "isomorphic-dompurify";

/**
 * Client Component for safely rendering HTML content from Directus CMS
 *
 * WHY CLIENT COMPONENT:
 * - DOMPurify uses JSDOM internally which calls new Date()
 * - Next.js 16 + Turbopack doesn't allow new Date() during static prerender
 * - Since Directus content is static (doesn't change per request),
 *   sanitizing in the browser is the optimal solution
 *
 * SECURITY:
 * - Protects against XSS attacks
 * - Removes <script> tags, event handlers, dangerous attributes
 * - Safe for rendering HTML from trusted CMS admins
 */

interface SafeHtmlProps {
  /**
   * Raw HTML string from Directus CMS WYSIWYG field
   */
  html: string;
  /**
   * CSS class name(s) to apply to the wrapper element
   */
  className?: string;
  /**
   * HTML tag to use as wrapper (default: 'div')
   */
  as?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  /**
   * Sanitization mode:
   * - 'full': Allow all WYSIWYG tags (articles, rich content)
   * - 'basic': Only basic inline formatting (titles, names)
   */
  mode?: "full" | "basic";
}

/**
 * SafeHtml - Client Component for sanitizing and rendering HTML
 *
 * @example Full mode (for article content)
 * ```tsx
 * <SafeHtml
 *   html={article.content}
 *   className={styles.articleContent}
 *   mode="full"
 * />
 * ```
 *
 * @example Basic mode (for titles/names)
 * ```tsx
 * <SafeHtml
 *   html={producerName}
 *   as="h2"
 *   className={styles.producerName}
 *   mode="basic"
 * />
 * ```
 */
export default function SafeHtml({
  html,
  className,
  as: Component = "div",
  mode = "full",
}: SafeHtmlProps) {
  // Sanitize with appropriate config based on mode
  const clean = DOMPurify.sanitize(html, getSanitizeConfig(mode));

  return <Component className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}

/**
 * DOMPurify configuration type
 */
interface SanitizeConfig {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  ADD_ATTR?: string[];
  ALLOW_DATA_ATTR?: boolean;
  RETURN_DOM?: boolean;
  RETURN_DOM_FRAGMENT?: boolean;
}

/**
 * Get DOMPurify configuration based on sanitization mode
 */
function getSanitizeConfig(mode: "full" | "basic"): SanitizeConfig {
  if (mode === "basic") {
    // Basic mode: Only inline formatting for titles/names
    return {
      ALLOWED_TAGS: ["strong", "em", "u", "br", "span"],
      ALLOWED_ATTR: ["class"],
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
    };
  }

  // Full mode: All WYSIWYG tags for article content
  return {
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
      "style",
    ],
    ADD_ATTR: ["target"],
    ALLOW_DATA_ATTR: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  };
}
