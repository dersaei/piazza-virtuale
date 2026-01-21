// lib/data/index.ts
/**
 * Data Access Layer (DAL)
 *
 * This is the ONLY layer that should access the database (Directus).
 * All database operations MUST go through this layer.
 *
 * Benefits:
 * - Centralized data access logic
 * - Consistent authorization checks
 * - Safe DTOs (Data Transfer Objects)
 * - Easy to audit and maintain
 * - Prevents accidental exposure of sensitive data
 *
 * Usage:
 * import { getProducersByCategory, createStandardSubmission } from '@/lib/data'
 */

// Export all data access functions
export {
  getProducersByCategory,
  getProducersCountByCategory,
  getAllCategoryCounts,
  getAllRegionCounts,
  getTotalProducersCount,
  getRegionsWithFeaturedProducers,
  type ProducerDTO,
  type FeaturedProducerDTO,
  type RegionWithFeaturedDTO,
} from "./producers";

export {
  getMagazineCards,
  getAllPublishedArticles,
  getArticleBySlug,
  getPublishedArticlesCount,
  type MagazineCardDTO,
  type MagazineArticleDTO,
} from "./magazine";

export {
  createStandardSubmission,
  createPremiumInquiry,
  createContactMessage,
  type StandardSubmissionDTO,
  type PremiumInquiryDTO,
  type ContactMessageDTO,
} from "./submissions";

// DO NOT export directusClient - it should only be used within this layer
