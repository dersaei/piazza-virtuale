// lib/constants/categories.ts

export interface CategoryInfo {
  id: string;
  label: string;
  slug: string;
  title: string;
  href: string;
}

export const CATEGORIES = {
  birre: {
    id: 'birre',
    label: 'Birre',
    slug: 'birre',
    title: 'Birrifici Artigianali',
    href: '/birre',
  },
  vini: {
    id: 'vini',
    label: 'Vini',
    slug: 'vini',
    title: 'Produttori di Vino',
    href: '/vini',
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
  distillati: {
    id: 'distillati',
    label: 'Distillati',
    slug: 'distillati',
    title: 'Distillerie',
    href: '/distillati',
  },
  dolci: {
    id: 'dolci',
    label: 'Dolci',
    slug: 'dolci',
    title: 'Produttori di Dolci',
    href: '/dolci',
  },
  caseificio: {
    id: 'caseificio',
    label: 'Caseificio',
    slug: 'caseificio',
    title: 'Caseifici',
    href: '/caseificio',
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
  caffe: {
    id: 'caffe',
    label: 'Caffè&Tè',
    slug: 'caffe',
    title: 'Torrefazioni',
    href: '/caffe',
  },
  bevande: {
    id: 'bevande',
    label: 'Bevande',
    slug: 'bevande',
    title: 'Bevande',
    href: '/bevande',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

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
