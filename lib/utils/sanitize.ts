import DOMPurify from "isomorphic-dompurify";

/**
 * Usuwa wszystkie tagi HTML, zachowując tylko czystą treść
 */
export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Usuń wszystkie tagi
    KEEP_CONTENT: true, // Zachowaj treść
  }).trim();
}

/**
 * Pozwala na podstawowe tagi HTML (dla producer_name z <br>)
 */
export function sanitizeBasicHTML(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["br"], // Tylko <br>
    ALLOWED_ATTR: [], // Żadnych atrybutów
  }).trim();
}
