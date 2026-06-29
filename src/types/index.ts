/**
 * Centralized type exports.
 * Import from "@/types" instead of individual files.
 */

// Sanity document types (CMS-fetched shapes)
export type {
  SanityHeroSlide,
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
export type { SanitySEO, Service, BlogPost, FAQ, Location, AboutPageData } from "./content";

// Resolved public Site Configuration shapes used by components
export type {
  SiteBranding,
  PageVisibility,
  HeaderProps,
  FooterProps,
  HeroSlideshowProps,
  SiteSeoConfig,
  SiteTeamMember,
  SiteConfigOptions,
  ResolvedSiteConfig,
  SiteConfigComponentProps,
} from "./site-config";
