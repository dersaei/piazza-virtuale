// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import directus from '../../lib/directus';
import { createItem } from '@directus/sdk';

/**
 * POST /api/contact
 * Formularz kontaktowy - zapisuje wiadomość w Directus
 *
 * Protected by middleware:
 * - Rate limiting (5 req/min)
 * - CSRF protection
 * - Security headers
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();

    const { full_name, email, subject, message } = body;

    // Validate required fields
    if (!full_name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Tutti i campi sono obbligatori' }),
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
    if (full_name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Nome e cognome troppo lungo (max 200 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (subject.length > 300) {
      return new Response(
        JSON.stringify({ error: 'Oggetto troppo lungo (max 300 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Messaggio troppo lungo (max 5000 caratteri)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create contact message in Directus
    try {
      const contactMessage = await directus.request(
        createItem('contact_messages', {
          full_name: full_name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
          status: 'pending',
          submitted_at: new Date().toISOString(),
          ip_address: locals.clientIp || null,
        })
      );

      console.log(`✅ Contact message created: ${contactMessage.id} from ${locals.clientIp}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Messaggio inviato con successo',
          data: contactMessage,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Directus contact message error:', error);
      return new Response(
        JSON.stringify({ error: 'Errore durante il salvataggio del messaggio' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
