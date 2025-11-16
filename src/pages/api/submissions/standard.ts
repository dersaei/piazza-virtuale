// src/pages/api/submissions/standard.ts
import type { APIRoute } from 'astro';
import directus from '../../../lib/directus';
import { createItem, uploadFiles } from '@directus/sdk';

// ID folderu "logo" z Directus File Library
const LOGO_FOLDER_ID = '6117a847-6c58-489e-8b9e-61991620ad24';

/**
 * POST /api/submissions/standard
 * Standard submission form - producer z logo upload
 *
 * Protected by middleware:
 * - Rate limiting (5 req/min)
 * - CSRF protection
 * - Security headers
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();

    const producerName = formData.get('producer_name') as string;
    const shopUrl = formData.get('shop_url') as string;
    const categoriesJson = formData.get('categories') as string;
    const region = formData.get('region') as string;
    const logoFile = formData.get('logo') as File | null;

    // Validate required fields
    if (!producerName || !shopUrl || !categoriesJson || !region) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse and validate categories
    let categories: string[];
    try {
      categories = JSON.parse(categoriesJson);
      if (!Array.isArray(categories) || categories.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Seleziona almeno una categoria' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    } catch {
      return new Response(
        JSON.stringify({ error: 'Formato categorie non valido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate and upload logo if provided
    let logoId: string | null = null;
    if (logoFile && logoFile.size > 0) {
      // 1. Check MIME type
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/svg+xml',
        'image/webp',
      ];

      if (!allowedTypes.includes(logoFile.type)) {
        return new Response(
          JSON.stringify({
            error: 'Formato file non supportato. Usa PNG, JPG, SVG o WebP.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // 2. Check file size (1MB)
      const maxSize = 1 * 1024 * 1024;
      if (logoFile.size > maxSize) {
        return new Response(
          JSON.stringify({ error: 'File troppo grande. Dimensione massima: 1MB' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // 3. Check file extension
      const fileName = logoFile.name.toLowerCase();
      if (!fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
        return new Response(
          JSON.stringify({ error: 'Estensione file non valida' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Upload to Directus with folder
      try {
        const logoFormData = new FormData();

        // ✅ KRYTYCZNE! Folder MUSI być PRZED plikiem!
        logoFormData.append('folder', LOGO_FOLDER_ID);
        logoFormData.append('file', logoFile);

        const uploadedFiles = await directus.request(uploadFiles(logoFormData));

        // Extract ID from response
        if (uploadedFiles?.data?.id) {
          logoId = uploadedFiles.data.id;
        } else if (uploadedFiles?.id) {
          logoId = uploadedFiles.id;
        }

        console.log(`✅ Logo uploaded: ${logoId} from ${locals.clientIp}`);
      } catch (error) {
        console.error('Logo upload error:', error);
        return new Response(
          JSON.stringify({ error: 'Errore durante il caricamento del logo' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Create submission in Directus
    try {
      const submission = await directus.request(
        createItem('standard_submissions', {
          producer_name: producerName,
          shop_url: shopUrl,
          categories: categories,
          region: region,
          logo: logoId,
          submission_status: 'pending',
          submitted_at: new Date().toISOString(),
          ip_address: locals.clientIp || null,
        })
      );

      console.log(`✅ Standard submission created: ${submission.id} from ${locals.clientIp}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Richiesta inviata con successo',
          data: submission,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Directus submission error:', error);
      return new Response(
        JSON.stringify({ error: 'Errore durante il salvataggio della richiesta' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
