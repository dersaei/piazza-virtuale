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
  bevande: {
    id: 'bevande',
    label: 'Bevande',
    slug: 'bevande',
    title: 'Produttori di Bevande',
    href: '/bevande',
    subcategories: [
      'bevande-distillati',
      'bevande-birre',
      'bevande-vini',
      'bevande-succhi',
      'bevande-caffe',
    ],
  },

  // Beverage subcategories
  'bevande-birre': {
    id: 'bevande-birre',
    label: 'Birre',
    slug: 'bevande-birre',
    title: 'Birrifici Artigianali',
    href: '/bevande/birre',
    parent: 'bevande',
  },
  'bevande-vini': {
    id: 'bevande-vini',
    label: 'Vini',
    slug: 'bevande-vini',
    title: 'Produttori di Vino',
    href: '/bevande/vini',
    parent: 'bevande',
  },
  'bevande-caffe': {
    id: 'bevande-caffe',
    label: 'Caffè e Tè',
    slug: 'bevande-caffe',
    title: 'Torrefazioni',
    href: '/bevande/caffe',
    parent: 'bevande',
  },
  'bevande-distillati': {
    id: 'bevande-distillati',
    label: 'Distillati e liquori',
    slug: 'bevande-distillati',
    title: 'Distillerie',
    href: '/bevande/distillati',
    parent: 'bevande',
  },
  'bevande-succhi': {
    id: 'bevande-succhi',
    label: 'Succhi e Infusi',
    slug: 'bevande-succhi',
    title: 'Produttori di Succhi e Infusi',
    href: '/bevande/succhi',
    parent: 'bevande',
  },
  condimenti: {
    id: 'condimenti',
    label: 'Condimenti',
    slug: 'condimenti',
    title: 'Produttori di Condimenti',
    href: '/condimenti',
  },
  conserve: {
    id: 'conserve',
    label: 'Conserve',
    slug: 'conserve',
    title: 'Conserve',
    href: '/conserve',
  },
  miele: {
    id: 'miele',
    label: 'Miele',
    slug: 'miele',
    title: 'Produttori di Miele',
    href: '/miele',
  },
  legumi: {
    id: 'legumi',
    label: 'Legumi',
    slug: 'legumi',
    title: 'Produttori di Legumi',
    href: '/legumi',
  },
  caseificio: {
    id: 'caseificio',
    label: 'Caseificio',
    slug: 'caseificio',
    title: 'Caseifici',
    href: '/caseificio',
  },
  dolci: {
    id: 'dolci',
    label: 'Dolci',
    slug: 'dolci',
    title: 'Produttori di Dolci',
    href: '/dolci',
  },
  olii: {
    id: 'olii',
    label: 'Olii',
    slug: 'olii',
    title: 'Produttori di Olio',
    href: '/olii',
  },
  pane: {
    id: 'pane',
    label: 'Pane',
    slug: 'pane',
    title: 'Panifici',
    href: '/pane',
  },
  pasta: {
    id: 'pasta',
    label: 'Pasta',
    slug: 'pasta',
    title: 'Pastifici',
    href: '/pasta',
  },
  farina: {
    id: 'farina',
    label: 'Farina',
    slug: 'farina',
    title: 'Mulini',
    href: '/farina',
  },
  cereali: {
    id: 'cereali',
    label: 'Cereali',
    slug: 'cereali',
    title: 'Produttori di Cereali',
    href: '/cereali',
  },
  pescare: {
    id: 'pescare',
    label: 'Pescare',
    slug: 'pescare',
    title: 'Produttori Ittici',
    href: '/pescare',
  },
  salumi: {
    id: 'salumi',
    label: 'Salumi',
    slug: 'salumi',
    title: 'Produttori di Salumi',
    href: '/salumi',
  },
};

export type CategorySlug = keyof typeof CATEGORIES;

// Helper to get only main categories (no parent)
export const MAIN_CATEGORY_LIST = Object.values(CATEGORIES).filter(
  cat => !cat.parent
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
    .map(slug => getCategoryBySlug(slug))
    .filter((cat): cat is CategoryInfo => cat !== null);
}
