// lib/data/premium-producers.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

export interface PremiumProducerDTO {
  id: string;
  nome: string;
  regioni: string;
  categorie: {
    id: number;
    name: string;
    slug: string;
  };
  titolo: string;
  caratteristiche: string[];
  shop_url: string;
}

type RawPremiumProducer = {
  id: string;
  nome: string;
  regioni: string;
  categorie: { id: number; name: string; slug: string } | null;
  titolo: string;
  caratteristiche_del_negozio: Array<{ caratteristica: string }>;
  indirizzo_del_sito_web_del_negozio_online: string;
};

function toDTO(raw: RawPremiumProducer): PremiumProducerDTO | null {
  if (!raw.categorie) return null;

  return {
    id: raw.id,
    nome: raw.nome,
    regioni: raw.regioni,
    categorie: raw.categorie,
    titolo: raw.titolo,
    caratteristiche: raw.caratteristiche_del_negozio.map((c) => c.caratteristica),
    shop_url: raw.indirizzo_del_sito_web_del_negozio_online,
  };
}

/**
 * Fetch all published premium producers.
 */
export async function getPremiumProducers(): Promise<PremiumProducerDTO[]> {
  try {
    const raw = await directusClient.request(
      readItems("produttori_premium", {
        filter: { status: { _eq: "published" } },
        fields: [
          "id",
          "nome",
          "regioni",
          { categorie: ["id", "name", "slug"] },
          "titolo",
          "caratteristiche_del_negozio",
          "indirizzo_del_sito_web_del_negozio_online",
        ],
        limit: -1,
      })
    ) as unknown as RawPremiumProducer[];

    return raw.map(toDTO).filter((p): p is PremiumProducerDTO => p !== null);
  } catch (error) {
    console.error("Error fetching premium producers:", error);
    return [];
  }
}

/**
 * Fetch published premium producers filtered by category slug.
 */
export async function getPremiumProducersByCategory(
  categorySlug: string
): Promise<PremiumProducerDTO[]> {
  try {
    if (!categorySlug || typeof categorySlug !== "string") return [];

    const safeSlug = categorySlug.trim().toLowerCase();

    const raw = await directusClient.request(
      readItems("produttori_premium", {
        filter: {
          status: { _eq: "published" },
          categorie: { slug: { _eq: safeSlug } },
        },
        fields: [
          "id",
          "nome",
          "regioni",
          { categorie: ["id", "name", "slug"] },
          "titolo",
          "caratteristiche_del_negozio",
          "indirizzo_del_sito_web_del_negozio_online",
        ],
        limit: -1,
      })
    ) as unknown as RawPremiumProducer[];

    return raw.map(toDTO).filter((p): p is PremiumProducerDTO => p !== null);
  } catch (error) {
    console.error("Error fetching premium producers by category:", error);
    return [];
  }
}
