// lib/constants/categories.ts

export interface CategoryInfo {
  id: string;
  label: string;
  slug: string;
  title: string;
  href: string;
  parent?: string;
  subcategories?: string[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  // Main category: Bevande with subcategories
  bevande: {
    id: "bevande",
    label: "Bevande",
    slug: "bevande",
    title: "Produttori di Bevande",
    href: "/bevande",
    subcategories: [
      "bevande-birre",
      "bevande-vini",
      "bevande-distillati",
      "bevande-caffe",
      "bevande-succhi",
    ],
  },
  "bevande-birre": {
    id: "bevande-birre",
    label: "Birre",
    slug: "bevande-birre",
    title: "Birrifici Artigianali",
    href: "/bevande/birre",
    parent: "bevande",
  },
  "bevande-vini": {
    id: "bevande-vini",
    label: "Vini",
    slug: "bevande-vini",
    title: "Produttori di Vino",
    href: "/bevande/vini",
    parent: "bevande",
  },
  "bevande-distillati": {
    id: "bevande-distillati",
    label: "Distillati e liquori",
    slug: "bevande-distillati",
    title: "Distillerie",
    href: "/bevande/distillati",
    parent: "bevande",
  },
  "bevande-caffe": {
    id: "bevande-caffe",
    label: "Caffè e Tè",
    slug: "bevande-caffe",
    title: "Torrefazioni",
    href: "/bevande/caffe",
    parent: "bevande",
  },
  "bevande-succhi": {
    id: "bevande-succhi",
    label: "Succhi e Infusi",
    slug: "bevande-succhi",
    title: "Produttori di Succhi e Infusi",
    href: "/bevande/succhi",
    parent: "bevande",
  },

  // Main category: Condimenti with subcategories
  condimenti: {
    id: "condimenti",
    label: "Condimenti",
    slug: "condimenti",
    title: "Produttori di Condimenti",
    href: "/condimenti",
    subcategories: ["condimenti-pesto", "condimenti-aceto", "condimenti-altre"],
  },
  "condimenti-pesto": {
    id: "condimenti-pesto",
    label: "Pesto",
    slug: "condimenti-pesto",
    title: "Produttori di Pesto",
    href: "/condimenti/pesto",
    parent: "condimenti",
  },
  "condimenti-aceto": {
    id: "condimenti-aceto",
    label: "Aceto",
    slug: "condimenti-aceto",
    title: "Produttori di Aceto",
    href: "/condimenti/aceto",
    parent: "condimenti",
  },
  "condimenti-altre": {
    id: "condimenti-altre",
    label: "Altre",
    slug: "condimenti-altre",
    title: "Altri Condimenti",
    href: "/condimenti/altre",
    parent: "condimenti",
  },

  // Main standalone categories
  conserve: {
    id: "conserve",
    label: "Conserve",
    slug: "conserve",
    title: "Conserve",
    href: "/conserve",
  },
  pomodori: {
    id: "pomodori",
    label: "Pomodori",
    slug: "pomodori",
    title: "Produttori di Pomodori",
    href: "/pomodori",
  },
  miele: {
    id: "miele",
    label: "Miele",
    slug: "miele",
    title: "Produttori di Miele",
    href: "/miele",
  },
  legumi: {
    id: "legumi",
    label: "Legumi e Cereali",
    slug: "legumi",
    title: "Produttori di Legumi e Cereali",
    href: "/legumi",
  },
  caseificio: {
    id: "caseificio",
    label: "Caseificio",
    slug: "caseificio",
    title: "Caseifici",
    href: "/caseificio",
  },
  dolci: {
    id: "dolci",
    label: "Dolci",
    slug: "dolci",
    title: "Produttori di Dolci",
    href: "/dolci",
  },
  olii: {
    id: "olii",
    label: "Olii",
    slug: "olii",
    title: "Produttori di Olio",
    href: "/olii",
  },
  pane: {
    id: "pane",
    label: "Pane",
    slug: "pane",
    title: "Panifici",
    href: "/pane",
  },
  riso: {
    id: "riso",
    label: "Riso",
    slug: "riso",
    title: "Produttori di Riso",
    href: "/riso",
  },
  pasta: {
    id: "pasta",
    label: "Pasta",
    slug: "pasta",
    title: "Pastifici",
    href: "/pasta",
  },
  farina: {
    id: "farina",
    label: "Farina",
    slug: "farina",
    title: "Mulini",
    href: "/farina",
  },
  pescare: {
    id: "pescare",
    label: "Pescare",
    slug: "pescare",
    title: "Produttori Ittici",
    href: "/pescare",
  },
  salumi: {
    id: "salumi",
    label: "Salumi",
    slug: "salumi",
    title: "Produttori di Salumi",
    href: "/salumi",
  },
  "frutta-secca": {
    id: "frutta-secca",
    label: "Frutta Secca",
    slug: "frutta-secca",
    title: "Produttori di Frutta Secca",
    href: "/frutta-secca",
  },
};

export type CategorySlug = keyof typeof CATEGORIES;

// Helper to get only main categories (no parent)
export const MAIN_CATEGORY_LIST = Object.values(CATEGORIES).filter(
  (cat) => !cat.parent
);

// Helper to get category array for iteration
export const CATEGORY_LIST = Object.values(CATEGORIES);

// Helper to check if a slug is valid
export function isValidCategory(slug: string): slug is CategorySlug {
  return slug in CATEGORIES;
}

// Helper to get category by slug
export function getCategoryBySlug(slug: string): CategoryInfo | null {
  if (isValidCategory(slug)) {
    return CATEGORIES[slug];
  }
  return null;
}

// Helper to get subcategories
export function getSubcategories(parentSlug: string): CategoryInfo[] {
  const parent = getCategoryBySlug(parentSlug);
  if (!parent?.subcategories) return [];

  return parent.subcategories
    .map((slug) => getCategoryBySlug(slug))
    .filter((cat): cat is CategoryInfo => cat !== null);
}
