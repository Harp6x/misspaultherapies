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
  featuredTestimonialsQuery,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sanityFetch<T = any>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags },
  });
}

// ── Site Config ──
export async function getSiteConfig(): Promise<SanitySiteConfig | null> {
  return sanityFetch<SanitySiteConfig | null>(siteConfigQuery, {}, ["siteConfig"]);
}

// ── About Page ──
export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return sanityFetch<SanityAboutPage | null>(aboutPageQuery, {}, ["aboutPage"]);
}

// ── Services ──
export async function getAllServices(): Promise<SanityService[]> {
  return sanityFetch<SanityService[]>(allServicesQuery, {}, ["service"]);
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  return sanityFetch<SanityService | null>(serviceBySlugQuery, { slug }, ["service"]);
}

// ── Blog Posts ──
export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return sanityFetch<SanityBlogPost[]>(allBlogPostsQuery, {}, ["blogPost"]);
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return sanityFetch<SanityBlogPost | null>(blogPostBySlugQuery, { slug }, ["blogPost"]);
}

export async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allBlogSlugsQuery, {}, ["blogPost"]);
}

// ── FAQs ──
export async function getAllFaqs(): Promise<SanityFAQ[]> {
  return sanityFetch<SanityFAQ[]>(allFaqsQuery, {}, ["faq"]);
}

// ── Resources ──
export async function getAllResources(): Promise<SanityResource[]> {
  return sanityFetch<SanityResource[]>(allResourcesQuery, {}, ["resource"]);
}

// ── Testimonials ──
export async function getApprovedTestimonials(): Promise<SanityTestimonial[]> {
  return sanityFetch<SanityTestimonial[]>(approvedTestimonialsQuery, {}, ["testimonial"]);
}

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  return sanityFetch<SanityTestimonial[]>(featuredTestimonialsQuery, {}, ["testimonial"]);
}

// ── Locations ──
export async function getAllLocations(): Promise<SanityLocation[]> {
  return sanityFetch<SanityLocation[]>(allLocationsQuery, {}, ["location"]);
}

export async function getLocationBySlug(slug: string): Promise<SanityLocation | null> {
  return sanityFetch<SanityLocation | null>(locationBySlugQuery, { slug }, ["location"]);
}

export async function getAllLocationSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allLocationSlugsQuery, {}, ["location"]);
}

// ── Gallery ──
export async function getAllGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(allGalleryItemsQuery, {}, ["galleryItem"]);
}

export async function getFeaturedGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(featuredGalleryItemsQuery, {}, ["galleryItem"]);
}

// ── Workshops ──
export async function getAllWorkshops(): Promise<SanityWorkshop[]> {
  return sanityFetch<SanityWorkshop[]>(allWorkshopsQuery, {}, ["workshop"]);
}

// ── Products ──
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityFetch<SanityProduct[]>(allProductsQuery, {}, ["product"]);
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityFetch<SanityProduct | null>(productBySlugQuery, { slug }, ["product"]);
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allProductSlugsQuery, {}, ["product"]);
}
export async function getWorkshopBySlug(slug: string): Promise<SanityWorkshop | null> {
  return sanityFetch<SanityWorkshop | null>(workshopBySlugQuery, { slug }, ["workshop"]);
}
