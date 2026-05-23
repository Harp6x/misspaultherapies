/**
 * Unified data layer: tries Sanity first, falls back to static .ts files.
 * Once Sanity is seeded, the static fallbacks are never reached.
 */

import {
  getAboutPage as getSanityAboutPage,
  getSiteConfig as getSanitySiteConfig,
  getAllServices as getSanityServices,
  getServiceBySlug as getSanityServiceBySlug,
  getAllBlogPosts as getSanityBlogPosts,
  getBlogPostBySlug as getSanityBlogPostBySlug,
  getAllBlogSlugs as getSanityBlogSlugs,
  getAllFaqs as getSanityFaqs,
  getAllResources as getSanityResources,
  getApprovedTestimonials as getSanityTestimonials,
  getAllLocations as getSanityLocations,
  getLocationBySlug as getSanityLocationBySlug,
  getAllLocationSlugs as getSanityLocationSlugs,
} from "@/sanity/fetch";
import type {
  SanityAboutPage,
  SanitySiteConfig,
  SanityService,
  SanityBlogPost,
  SanityFAQ,
  SanityResource,
  SanityTestimonial,
  SanityLocation,
} from "@/sanity/fetch";

// Static fallbacks
import { siteConfig as staticSiteConfig } from "@/lib/site-config";
import { services as staticServices } from "@/content/services";
import type { Service } from "@/content/services";
import { blogPosts as staticBlogPosts, blogCategories } from "@/content/blog";
import type { BlogPost } from "@/content/blog";
import { faqs as staticFaqs, faqCategories } from "@/content/faqs";
import type { FAQ } from "@/content/faqs";
import { locations as staticLocations } from "@/content/locations";
import type { Location } from "@/content/locations";

// Re-export categories (these don't live in Sanity)
export { blogCategories, faqCategories };

// ── Site Config ──
export async function getSiteConfig() {
  try {
    const cfg = await getSanitySiteConfig();
    if (cfg?.name) {
      // Map Sanity shape → siteConfig shape used by pages
      return {
        ...staticSiteConfig,
        name: cfg.name,
        tagline: cfg.tagline ?? staticSiteConfig.tagline,
        description: cfg.description ?? staticSiteConfig.description,
        author: cfg.author ?? staticSiteConfig.author,
        handle: cfg.handle ?? staticSiteConfig.handle,
        email: cfg.email ?? staticSiteConfig.email,
        phone: cfg.phone ?? staticSiteConfig.phone,
        whatsappNumber: cfg.whatsappNumber ?? staticSiteConfig.whatsappNumber,
        whatsappMessage: cfg.whatsappMessage ?? staticSiteConfig.whatsappMessage,
        rciNumber: cfg.rciNumber ?? staticSiteConfig.rciNumber,
        qualifications: cfg.qualifications ?? staticSiteConfig.qualifications,
        languages: cfg.languages ?? staticSiteConfig.languages,
        socials: {
          instagram: cfg.instagram ?? staticSiteConfig.socials.instagram,
          youtube: cfg.youtube ?? staticSiteConfig.socials.youtube,
          linkedin: cfg.linkedin ?? staticSiteConfig.socials.linkedin,
        },
        googleFormUrl: cfg.googleFormUrl ?? staticSiteConfig.googleFormUrl,
        upiId: cfg.upiId ?? staticSiteConfig.upiId,
        fees: {
          individual: cfg.feeIndividual ?? staticSiteConfig.fees.individual,
          couples: cfg.feeCouples ?? staticSiteConfig.fees.couples,
          family: cfg.feeFamily ?? staticSiteConfig.fees.family,
          assessment: cfg.feeAssessment ?? staticSiteConfig.fees.assessment,
          package: cfg.feePackage ?? staticSiteConfig.fees.package,
        },
        slidingScale: cfg.slidingScale ?? staticSiteConfig.slidingScale,
        sessionDuration: cfg.sessionDuration ?? staticSiteConfig.sessionDuration,
        cancellationPolicy: cfg.cancellationPolicy ?? staticSiteConfig.cancellationPolicy,
      };
    }
  } catch {
    // Sanity not available - use static
  }
  return staticSiteConfig;
}

// ── About Page ──
export interface AboutPageData {
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
  resumeUrl?: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

const staticAboutPage: AboutPageData = {
  title: "About Aishani Paul",
  bioParagraph1:
    "I'm a licensed clinical psychologist with a deep commitment to making quality mental healthcare accessible, inclusive, and culturally attuned.",
  bioParagraph2:
    `With an M.Phil in Clinical Psychology and registration with the Rehabilitation Council of India (RCI No: ${staticSiteConfig.rciNumber}), I bring both academic rigour and heartfelt compassion to my practice.`,
  bioParagraph3:
    "I work with individuals, couples, adolescents, and families - offering all sessions online so that geography is never a barrier to getting help. Whether you're in India or living abroad, my goal is to create a safe, non-judgmental space where real change can happen.",
  credentials: [
    { icon: "Award", label: "M.Phil in Clinical Psychology" },
    { icon: "Award", label: "RCI Licensed Clinical Psychologist" },
    { icon: "Languages", label: "English, Hindi & Bengali" },
  ],
  approachIntro:
    "I use an integrative therapeutic approach, which means I don't follow a one-size-fits-all model. Instead, I draw from multiple evidence-based modalities to create a treatment plan that's uniquely suited to you.",
  values: [
    {
      icon: "Heart",
      title: "Compassion First",
      description:
        "Every session is built on warmth, empathy, and genuine care. You deserve to feel safe and heard.",
    },
    {
      icon: "BookOpen",
      title: "Evidence-Based",
      description:
        "I draw from proven therapeutic modalities - CBT, DBT, EFT, psychodynamic, and mindfulness - tailored to you.",
    },
    {
      icon: "Languages",
      title: "Culturally Sensitive",
      description:
        "Your cultural background shapes your experience. I honour that context in every conversation.",
    },
  ],
  languagesText:
    "I offer therapy in {languages}. Sessions can be conducted in any of these languages or a comfortable mix.",
  connectHeading: "Connect with Me",
  connectText:
    "Follow @mspaultherapies for mental health tips, insights, and behind-the-scenes of my practice.",
  socialLinks: [
    { platform: "Instagram", url: "https://www.instagram.com/mspaultherapies", icon: "Camera" },
    { platform: "YouTube", url: "https://www.youtube.com/@mspaultherapies", icon: "CirclePlay" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/mspaultherapies", icon: "Briefcase" },
  ],
};

export async function getAboutPage(): Promise<AboutPageData> {
  try {
    const sanity = await getSanityAboutPage();
    if (sanity) {
      // Merge Sanity fields with static defaults - empty Sanity fields fall back
      return {
        title: sanity.title || staticAboutPage.title,
        photo: sanity.photo ?? staticAboutPage.photo,
        bioParagraph1: sanity.bioParagraph1 || staticAboutPage.bioParagraph1,
        bioParagraph2: sanity.bioParagraph2 || staticAboutPage.bioParagraph2,
        bioParagraph3: sanity.bioParagraph3 || staticAboutPage.bioParagraph3,
        credentials: sanity.credentials?.length ? sanity.credentials : staticAboutPage.credentials,
        approachIntro: sanity.approachIntro || staticAboutPage.approachIntro,
        values: sanity.values?.length ? sanity.values : staticAboutPage.values,
        languagesText: sanity.languagesText || staticAboutPage.languagesText,
        connectHeading: sanity.connectHeading || staticAboutPage.connectHeading,
        connectText: sanity.connectText || staticAboutPage.connectText,
        resumeUrl: sanity.resumeUrl ?? undefined,
        socialLinks: sanity.socialLinks?.length ? sanity.socialLinks : staticAboutPage.socialLinks,
      };
    }
  } catch {}
  return staticAboutPage;
}

// ── Services ──
export async function getAllServices(): Promise<Service[]> {
  try {
    const sanity = await getSanityServices();
    if (sanity?.length) return sanity;
  } catch {}
  return staticServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const s = await getSanityServiceBySlug(slug);
    if (s) return s;
  } catch {}
  return staticServices.find((s) => s.slug === slug) ?? null;
}

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanityServices();
    if (sanity?.length) return sanity.map((s) => s.slug);
  } catch {}
  return staticServices.map((s) => s.slug);
}

// ── Blog ──
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const sanity = await getSanityBlogPosts();
    if (sanity?.length) {
      return sanity.map((p) => ({
        ...p,
        // Portable Text body kept as-is for PortableTextBody component
        body: p.body,
      }));
    }
  } catch {}
  return staticBlogPosts.filter((p) => p.published);
}

export async function getBlogPostBySlug(slug: string): Promise<(BlogPost & { sanityBody?: unknown }) | null> {
  try {
    const p = await getSanityBlogPostBySlug(slug);
    if (p) return { ...p, sanityBody: p.body };
  } catch {}
  return staticBlogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanityBlogSlugs();
    if (sanity?.length) return sanity.map((s) => s.slug);
  } catch {}
  return staticBlogPosts.filter((p) => p.published).map((p) => p.slug);
}

// ── FAQs ──
export async function getAllFaqs(): Promise<FAQ[]> {
  try {
    const sanity = await getSanityFaqs();
    if (sanity?.length) return sanity as unknown as FAQ[];
  } catch {}
  return staticFaqs;
}

// ── Resources ──
export async function getAllResources(): Promise<SanityResource[]> {
  try {
    const sanity = await getSanityResources();
    if (sanity?.length) return sanity;
  } catch {}
  // No static fallback needed - the resources page has inline data
  return [];
}

// ── Testimonials ──
const staticTestimonials = [
  {
    quote: "Therapy with Aishani helped me understand myself in ways I never thought possible. I finally feel like I have the tools to handle life's challenges.",
    name: "Client A",
    context: "Individual therapy - placeholder, shared with consent",
    order: 1,
  },
  {
    quote: "We were on the verge of giving up on our relationship. The sessions gave us a new way to communicate and truly hear each other.",
    name: "Client B",
    context: "Couples therapy - placeholder, shared with consent",
    order: 2,
  },
  {
    quote: "As an NRI, finding a therapist who understood my cultural background was a game changer. I felt seen and understood from the very first session.",
    name: "Client C",
    context: "NRI therapy - placeholder, shared with consent",
    order: 3,
  },
];

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const sanity = await getSanityTestimonials();
    if (sanity?.length) return sanity;
  } catch {}
  return staticTestimonials;
}

// ── Locations ──
export async function getAllLocations(): Promise<Location[]> {
  try {
    const sanity = await getSanityLocations();
    if (sanity?.length) {
      return sanity.map((l) => ({
        slug: l.slug,
        city: l.name,
        title: l.title,
        description: l.description,
        metaDescription: l.metaDescription,
        keywords: [],
        content: l.description,
      }));
    }
  } catch {}
  return staticLocations;
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const l = await getSanityLocationBySlug(slug);
    if (l) {
      return {
        slug: l.slug,
        city: l.name,
        title: l.title,
        description: l.description,
        metaDescription: l.metaDescription,
        keywords: [],
        content: l.description,
      };
    }
  } catch {}
  return staticLocations.find((l) => l.slug === slug) ?? null;
}

export async function getLocationSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanityLocationSlugs();
    if (sanity?.length) return sanity.map((s) => s.slug);
  } catch {}
  return staticLocations.map((l) => l.slug);
}
