// lib/data/condizioni.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

export interface CondizioniDTO {
  content: string;
  date_updated: string | null;
}

/**
 * Get the condizioni generali del servizio content
 *
 * Reads the first published item from the condizioni collection.
 */
export async function getCondizioni(): Promise<CondizioniDTO | null> {
  try {
    const items = await directusClient.request(
      readItems("condizioni", {
        fields: ["text", "date_updated"],
        filter: { status: { _eq: "published" } },
        limit: 1,
      })
    );

    console.log("[condizioni] items count:", items.length);
    console.log("[condizioni] first item:", JSON.stringify(items[0])?.slice(0, 200));

    if (!items || items.length === 0) {
      return null;
    }

    const item = items[0] as unknown as { text: string; date_updated?: string | null };

    return {
      content: item.text ?? "",
      date_updated: item.date_updated ?? null,
    };
  } catch (error) {
    console.error("[condizioni] Error fetching:", error);
    return null;
  }
}
