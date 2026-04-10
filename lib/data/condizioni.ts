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
 * condizioni is a Directus singleton collection with one content field: `content` (Markdown).
 */
export async function getCondizioni(): Promise<CondizioniDTO | null> {
  try {
    console.log("[condizioni] Fetching from Directus...");

    const item = await directusClient.request(
      readSingleton("condizioni", {
        fields: ["content", "date_updated"],
      })
    );

    console.log("[condizioni] Raw response:", JSON.stringify(item));

    if (!item) {
      console.log("[condizioni] item is falsy, returning null");
      return null;
    }

    const data = item as { content: string; date_updated?: string | null };

    console.log("[condizioni] content length:", data.content?.length ?? 0);

    return {
      content: data.content ?? "",
      date_updated: data.date_updated ?? null,
    };
  } catch (error) {
    console.error("[condizioni] Error fetching:", error);
    return null;
  }
}
