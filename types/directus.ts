// types/directus.ts
/**
 * Directus Collection Types
 *
 * These types represent your Directus collections schema.
 * Update these when you modify collections in Directus admin panel.
 */

/**
 * Producer Category
 */
export interface Category {
  id: string;
  slug: string;
  name: string;
  parent_category?: Category | string | null;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Producer
 */
export interface Producer {
  id: string;
  name: string;
  name_alt: string;
  category: Category | string;
  region: string;
  logo?: string | null;
  shop_url: string;
  is_featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Contact Message
 */
export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  submitted_at: string;
  date_created: string;
  date_updated?: string;
}

/**
 * SEO metadata (shared collection)
 */
export interface SeoItem {
  id: string;
  title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  no_index?: boolean | null;
  og_image?: string | null;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Magazine Category
 */
export interface MagazineCategory {
  id: string;
  name: string;
  display_name: string;
  color: string;
  status: 'published' | 'draft' | 'archived';
}

/**
 * Magazine Article
 */
export interface MagazineArticle {
  id: number;
  slug: string;
  title: string;
  magazine_category_id: MagazineCategory | string | null;
  content: string;
  seo?: SeoItem | string | null;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Magazine Card (for homepage)
 */
export interface MagazineCard {
  id: number;
  magazine_category_id: MagazineCategory | string | null;
  title: string;
  url: string;
  sort: number;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Directus Collections Schema
 * Use this type with Directus SDK for full type safety
 */
/**
 * Page (for static page SEO management)
 */
export interface PageItem {
  id: string;
  slug: string;
  seo?: SeoItem | string | null;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Premium Producer
 */
export interface PremiumProducer {
  id: string;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string | null;
  regioni: string;
  categorie: Category | number | null;
  nome: string;
  titolo: string;
  caratteristiche_del_negozio: Array<{ caratteristica: string }>;
  indirizzo_del_sito_web_del_negozio_online: string;
}

/**
 * Quick Submission (from modal in header)
 */
export interface QuickSubmission {
  id: string;
  company_name?: string | null;
  shop_url: string;
  status: 'pending' | 'reviewed';
  date_created: string;
}

/**
 * Premium Interest (from modal on come-funziona page)
 */
export interface PremiumInterest {
  id: string;
  full_name: string;
  email: string;
  status: 'pending' | 'reviewed';
  date_created: string;
}

/**
 * Condizioni generali del servizio Premium (singleton)
 */
export interface Condizioni {
  id: string;
  content?: string | null;
  text?: string | null;
  status: 'published' | 'draft' | 'archived';
  date_updated?: string | null;
}

export interface DirectusSchema {
  categories: Category[];
  producers: Producer[];
  contact_messages: ContactMessage[];
  quick_submissions: QuickSubmission[];
  premium_interests: PremiumInterest[];
  magazine_categories: MagazineCategory[];
  magazine_articles: MagazineArticle[];
  magazine_cards: MagazineCard[];
  seo: SeoItem[];
  pages: PageItem[];
  produttori_premium: PremiumProducer[];
  condizioni: Condizioni[];
}
