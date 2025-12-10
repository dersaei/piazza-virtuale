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
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Standard Submission (form submission from users)
 */
export interface StandardSubmission {
  id: string;
  producer_name: string;
  shop_url: string;
  categories: string[];
  region: string;
  logo?: string | null;
  submission_status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  date_created: string;
  date_updated?: string;
}

/**
 * Premium Inquiry
 */
export interface PremiumInquiry {
  id: string;
  producer_name: string;
  contact_name: string;
  email: string;
  message?: string | null;
  status: 'pending' | 'contacted' | 'completed';
  submitted_at: string;
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
 * Magazine Article
 */
export interface MagazineArticle {
  id: number;
  slug: string;
  title: string;
  category: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  date_created: string;
  date_updated?: string;
}

/**
 * Magazine Card (for homepage)
 */
export interface MagazineCard {
  id: number;
  category: string;
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
export interface DirectusSchema {
  categories: Category[];
  producers: Producer[];
  standard_submissions: StandardSubmission[];
  premium_inquiries: PremiumInquiry[];
  contact_messages: ContactMessage[];
  magazine_articles: MagazineArticle[];
  magazine_cards: MagazineCard[];
}
