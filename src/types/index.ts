/**
 * Centralized type exports.
 * Import from "@/types" instead of individual files.
 */

// Sanity document types (CMS-fetched shapes)
export type {
  SanitySiteConfig,
  SanityAboutPage,
  SanityService,
  SanityBlogPost,
  SanityFAQ,
  SanityResource,
  SanityTestimonial,
  SanityLocation,
  SanityGalleryItem,
  SanityWorkshop,
  SanityProduct,
} from "./sanity";

// Static content types (fallback shapes)
export type {
  Service,
  BlogPost,
  FAQ,
  Location,
  AboutPageData,
} from "./content";
