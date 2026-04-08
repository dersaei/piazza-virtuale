// lib/data/premium-producers.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

export interface PremiumProducerFileDTO {
  id: string;
  width?: number | null;
  height?: number | null;
}

export interface PremiumProducerDTO {
  id: string;
  nome: string;
  regioni: string;
  categorie: {
    id: number;
    name: string;
    slug: string;
  };
  logo: PremiumProducerFileDTO | null;
  titolo: string;
  caratteristiche: string[];
  shop_url: string;
  galleria: PremiumProducerFileDTO[];
}

type RawPremiumProducer = {
  id: string;
  nome: string;
  regioni: string;
  categorie: { id: number; name: string; slug: string } | null;
  logo: { id: string; width?: number | null; height?: number | null } | null;
  titolo: string;
  caratteristiche_del_negozio: Array<{ caratteristica: string }>;
  indirizzo_del_sito_web_del_negozio_online: string;
  galleria: Array<{
    directus_files_id: { id: string; width?: number | null; height?: number | null } | null;
  }>;
};

function toDTO(raw: RawPremiumProducer): PremiumProducerDTO | null {
  if (!raw.categorie) return null;

  return {
    id: raw.id,
    nome: raw.nome,
    regioni: raw.regioni,
    categorie: raw.categorie,
    logo: raw.logo ? { id: raw.logo.id, width: raw.logo.width, height: raw.logo.height } : null,
    titolo: raw.titolo,
    caratteristiche: raw.caratteristiche_del_negozio.map((c) => c.caratteristica),
    shop_url: raw.indirizzo_del_sito_web_del_negozio_online,
    galleria: raw.galleria
      .filter((g) => g.directus_files_id !== null)
      .map((g) => ({
        id: g.directus_files_id!.id,
        width: g.directus_files_id!.width,
        height: g.directus_files_id!.height,
      })),
  };
}

/**
 * Fetch all published premium producers, sorted by sort field (ascending).
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
          { logo: ["id", "width", "height"] },
          "titolo",
          "caratteristiche_del_negozio",
          "indirizzo_del_sito_web_del_negozio_online",
          { galleria: [{ directus_files_id: ["id", "width", "height"] }] },
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
          { logo: ["id", "width", "height"] },
          "titolo",
          "caratteristiche_del_negozio",
          "indirizzo_del_sito_web_del_negozio_online",
          { galleria: [{ directus_files_id: ["id", "width", "height"] }] },
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
