// lib/api/condizioni.ts
import { cacheTag, cacheLife } from "next/cache";
import { getCondizioni as getCondizioniFromDAL, type CondizioniDTO } from "@/lib/data";

export type { CondizioniDTO };

export async function getCondizioni(): Promise<CondizioniDTO | null> {
  "use cache";
  cacheLife("days");
  cacheTag("condizioni");

  return getCondizioniFromDAL();
}
