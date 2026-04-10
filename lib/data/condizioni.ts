// lib/data/condizioni.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readSingleton } from "@directus/sdk";

export interface CondizioniDTO {
  content: string;
  date_updated: string | null;
}

/**
 * Get the condizioni generali del servizio content
 *
 * condizioni is a Directus singleton collection.
 * Field: `content` (Markdown text).
 */
export async function getCondizioni(): Promise<CondizioniDTO | null> {
  try {
    const item = await directusClient.request(
      readSingleton("condizioni", {
        fields: ["content", "date_updated"],
      })
    );

    if (!item) {
      return null;
    }

    const data = item as unknown as { content: string; date_updated?: string | null };

    return {
      content: data.content ?? "",
      date_updated: data.date_updated ?? null,
    };
  } catch (error) {
    console.error("[condizioni] Error fetching:", error);
    return null;
  }
}
