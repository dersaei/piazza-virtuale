// src/pages/api/submissions/premium.ts
import type { APIRoute } from 'astro';
import directus from '../../../lib/directus';
import { createItem } from '@directus/sdk';

/**
 * POST /api/submissions/premium
 * Premium inquiry form - zaawansowane zgłoszenia
 *
 * Protected by middleware:
 * - Rate limiting (5 req/min)
 * - CSRF protection
 * - Security headers
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();

    const { producer_name, contact_name, email, message } = body;

    // Validate required fields
    if (!producer_name || !contact_name || !email) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Formato email non valido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate field lengths
    if (producer_name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Nome produttore troppo lungo (max 200 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (contact_name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Nome contatto troppo lungo (max 200 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (message && message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Messaggio troppo lungo (max 5000 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create premium inquiry in Directus
    try {
      const inquiry = await directus.request(
        createItem('premium_inquiries', {
          producer_name: producer_name.trim(),
          contact_name: contact_name.trim(),
          email: email.trim().toLowerCase(),
          message: message ? message.trim() : null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
          ip_address: locals.clientIp || null,
        })
      );

      console.log(`✅ Premium inquiry created: ${inquiry.id} from ${locals.clientIp}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Richiesta premium inviata con successo',
          data: inquiry,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Directus premium inquiry error:', error);
      return new Response(
        JSON.stringify({ error: 'Errore durante il salvataggio della richiesta' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Premium inquiry error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
        }
    );
  }
};
