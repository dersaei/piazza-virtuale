// lib/sanitize.ts
import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML to prevent XSS attacks
 * Only allows safe tags like <br>, <strong>, <em>
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["br", "strong", "em", "b", "i"],
    ALLOWED_ATTR: [],
  });
}
