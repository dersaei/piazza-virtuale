// lib/api/premium-producers.ts
import { cacheTag, cacheLife } from "next/cache";
import {
  getPremiumProducers as getPremiumProducersFromDAL,
  getPremiumProducersByCategory as getPremiumProducersByCategoryFromDAL,
  type PremiumProducerDTO,
} from "@/lib/data";

export type { PremiumProducerDTO };

export async function getPremiumProducers(): Promise<PremiumProducerDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("premium-producers");

  return getPremiumProducersFromDAL();
}

export async function getPremiumProducersByCategory(
  categorySlug: string
): Promise<PremiumProducerDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("premium-producers");
  cacheTag(`premium-producers-${categorySlug}`);

  return getPremiumProducersByCategoryFromDAL(categorySlug);
}
