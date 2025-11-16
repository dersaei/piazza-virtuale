/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * Middleware locals types
 * Dostępne w Astro.locals w każdym .astro file i API endpoint
 */
declare namespace App {
  interface Locals {
    /**
     * Request count dla rate limiting
     */
    requestCount?: number;

    /**
     * Client IP address
     */
    clientIp?: string;

    /**
     * Request ID dla trackingu
     */
    requestId?: string;
  }
}
