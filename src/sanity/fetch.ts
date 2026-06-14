import { client } from "./client";
import {
  aboutPageQuery,
  siteConfigQuery,
  allServicesQuery,
  serviceBySlugQuery,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  allBlogSlugsQuery,
  allFaqsQuery,
  allResourcesQuery,
  approvedTestimonialsQuery,
  allLocationsQuery,
  locationBySlugQuery,
  allLocationSlugsQuery,
  allGalleryItemsQuery,
  featuredGalleryItemsQuery,
  allWorkshopsQuery,
  workshopBySlugQuery,
  allProductsQuery,
  productBySlugQuery,
  allProductSlugsQuery,
} from "./queries";
import type {
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
} from "@/types";

// Re-export types for backward compatibility
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
} from "@/types";

// Revalidation: re-fetch from Sanity API every 60 seconds
const REVALIDATE = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sanityFetch<T = any>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE },
  });
}

// ── Site Config ──
export async function getSiteConfig(): Promise<SanitySiteConfig | null> {
  return sanityFetch<SanitySiteConfig | null>(siteConfigQuery);
}

// ── About Page ──
export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return sanityFetch<SanityAboutPage | null>(aboutPageQuery);
}

// ── Services ──
export async function getAllServices(): Promise<SanityService[]> {
  return sanityFetch<SanityService[]>(allServicesQuery);
}

export async function getServiceBySlug(
  slug: string
): Promise<SanityService | null> {
  return sanityFetch<SanityService | null>(serviceBySlugQuery, { slug });
}

// ── Blog Posts ──
export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return sanityFetch<SanityBlogPost[]>(allBlogPostsQuery);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<SanityBlogPost | null> {
  return sanityFetch<SanityBlogPost | null>(blogPostBySlugQuery, { slug });
}

export async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allBlogSlugsQuery);
}

// ── FAQs ──
export async function getAllFaqs(): Promise<SanityFAQ[]> {
  return sanityFetch<SanityFAQ[]>(allFaqsQuery);
}

// ── Resources ──
export async function getAllResources(): Promise<SanityResource[]> {
  return sanityFetch<SanityResource[]>(allResourcesQuery);
}

// ── Testimonials ──
export async function getApprovedTestimonials(): Promise<SanityTestimonial[]> {
  return sanityFetch<SanityTestimonial[]>(approvedTestimonialsQuery);
}

// ── Locations ──
export async function getAllLocations(): Promise<SanityLocation[]> {
  return sanityFetch<SanityLocation[]>(allLocationsQuery);
}

export async function getLocationBySlug(
  slug: string
): Promise<SanityLocation | null> {
  return sanityFetch<SanityLocation | null>(locationBySlugQuery, { slug });
}

export async function getAllLocationSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allLocationSlugsQuery);
}

// ── Gallery ──
export async function getAllGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(allGalleryItemsQuery);
}

export async function getFeaturedGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(featuredGalleryItemsQuery);
}

// ── Workshops ──
export async function getAllWorkshops(): Promise<SanityWorkshop[]> {
  return sanityFetch<SanityWorkshop[]>(allWorkshopsQuery);
}


// ── Products ──
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityFetch<SanityProduct[]>(allProductsQuery);
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityFetch<SanityProduct | null>(productBySlugQuery, { slug });
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allProductSlugsQuery);
}
export async function getWorkshopBySlug(slug: string): Promise<SanityWorkshop | null> {
  return sanityFetch<SanityWorkshop | null>(workshopBySlugQuery, { slug });
}
