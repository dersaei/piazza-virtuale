// lib/utils/__tests__/sanitize.test.ts
import { sanitizeHtml, sanitizeHtmlBasic } from '../sanitize';

describe('sanitizeHtml', () => {
  it('should allow safe HTML tags', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    const result = sanitizeHtml(input);
    expect(result).toBe('<p>Hello <strong>World</strong></p>');
  });

  it('should remove script tags (XSS protection)', () => {
    const input = '<p>Hello</p><script>alert("XSS")</script>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<script>');
    expect(result).toBe('<p>Hello</p>');
  });

  it('should remove onclick handlers (XSS protection)', () => {
    const input = '<p onclick="alert(\'XSS\')">Click me</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('onclick');
    expect(result).toBe('<p>Click me</p>');
  });

  it('should allow images with safe attributes', () => {
    const input = '<img src="test.jpg" alt="Test" />';
    const result = sanitizeHtml(input);
    expect(result).toContain('<img');
    expect(result).toContain('src="test.jpg"');
    expect(result).toContain('alt="Test"');
  });

  it('should allow links with href', () => {
    const input = '<a href="https://example.com">Link</a>';
    const result = sanitizeHtml(input);
    expect(result).toContain('<a href="https://example.com"');
    expect(result).toContain('Link</a>');
  });

  it('should handle empty input', () => {
    const result = sanitizeHtml('');
    expect(result).toBe('');
  });
});

describe('sanitizeHtmlBasic', () => {
  it('should allow basic inline formatting', () => {
    const input = 'Hello <strong>World</strong>';
    const result = sanitizeHtmlBasic(input);
    expect(result).toBe('Hello <strong>World</strong>');
  });

  it('should remove block-level tags', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    const result = sanitizeHtmlBasic(input);
    expect(result).not.toContain('<p>');
    expect(result).toContain('<strong>');
  });

  it('should remove script tags (XSS protection)', () => {
    const input = 'Hello<script>alert("XSS")</script>';
    const result = sanitizeHtmlBasic(input);
    expect(result).not.toContain('<script>');
    expect(result).toBe('Hello');
  });

  it('should remove images', () => {
    const input = 'Hello <img src="test.jpg" /> World';
    const result = sanitizeHtmlBasic(input);
    expect(result).not.toContain('<img');
  });

  it('should remove links', () => {
    const input = 'Hello <a href="test.html">Link</a>';
    const result = sanitizeHtmlBasic(input);
    expect(result).not.toContain('<a');
    expect(result).toBe('Hello Link');
  });
});
