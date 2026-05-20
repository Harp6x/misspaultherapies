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
} from "./queries";

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
export interface SanitySiteConfig {
  name: string;
  tagline: string;
  description: string;
  author: string;
  handle: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  rciNumber: string;
  qualifications: string[];
  languages: string[];
  instagram: string;
  youtube: string;
  linkedin: string;
  googleFormUrl: string;
  upiId: string;
  feeIndividual: string;
  feeCouples: string;
  feeFamily: string;
  feeAssessment: string;
  feePackage: string;
  slidingScale: string;
  sessionDuration: string;
  cancellationPolicy: string;
}

export async function getSiteConfig(): Promise<SanitySiteConfig | null> {
  return sanityFetch<SanitySiteConfig | null>(siteConfigQuery);
}

// ── About Page ──
export interface SanityAboutPage {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  credentials: { icon: string; label: string }[];
  approachIntro: string;
  values: { icon: string; title: string; description: string }[];
  languagesText: string;
  connectHeading: string;
  connectText: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return sanityFetch<SanityAboutPage | null>(aboutPageQuery);
}

// ── Services ──
export interface SanityService {
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  icon: string;
  highlights: string[];
  idealFor: string[];
  approach: string;
  fee: string;
  order: number;
}

export async function getAllServices(): Promise<SanityService[]> {
  return sanityFetch<SanityService[]>(allServicesQuery);
}

export async function getServiceBySlug(
  slug: string
): Promise<SanityService | null> {
  return sanityFetch<SanityService | null>(serviceBySlugQuery, { slug });
}

// ── Blog Posts ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SanityBlogPost {
  title: string;
  slug: string;
  description: string;
  category: string;
  datePublished: string;
  readingTime: string;
  published: boolean;
  // Portable Text blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

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
export interface SanityFAQ {
  question: string;
  answer: string;
  category: string;
  order: number;
}

export async function getAllFaqs(): Promise<SanityFAQ[]> {
  return sanityFetch<SanityFAQ[]>(allFaqsQuery);
}

// ── Resources ──
export interface SanityResource {
  title: string;
  tag: string;
  icon: string;
  // Portable Text blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  order: number;
}

export async function getAllResources(): Promise<SanityResource[]> {
  return sanityFetch<SanityResource[]>(allResourcesQuery);
}

// ── Testimonials ──
export interface SanityTestimonial {
  quote: string;
  name: string;
  context: string;
  order: number;
}

export async function getApprovedTestimonials(): Promise<SanityTestimonial[]> {
  return sanityFetch<SanityTestimonial[]>(approvedTestimonialsQuery);
}

// ── Locations ──
export interface SanityLocation {
  name: string;
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  features: string[];
  services: string[];
}

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
export interface SanityGalleryItem {
  _id: string;
  title: string;
  type: "instagram-reel" | "instagram-post" | "youtube-video" | "image";
  url?: string;
  image?: { asset: { _id: string; url: string }; alt?: string };
  description?: string;
  featured: boolean;
  order: number;
}

export async function getAllGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(allGalleryItemsQuery);
}

export async function getFeaturedGalleryItems(): Promise<SanityGalleryItem[]> {
  return sanityFetch<SanityGalleryItem[]>(featuredGalleryItemsQuery);
}

// ── Workshops ──
export interface SanityWorkshop {
  title: string;
  slug: string;
  description: string;
  date?: string;
  duration?: string;
  fee?: string;
  registrationUrl?: string;
  status: "upcoming" | "open" | "sold-out" | "completed";
  coverImage?: { asset: { _id: string; url: string }; alt?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  order?: number;
}

export async function getAllWorkshops(): Promise<SanityWorkshop[]> {
  return sanityFetch<SanityWorkshop[]>(allWorkshopsQuery);
}

export async function getWorkshopBySlug(slug: string): Promise<SanityWorkshop | null> {
  return sanityFetch<SanityWorkshop | null>(workshopBySlugQuery, { slug });
}
