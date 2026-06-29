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
  getFeaturedTestimonials as getSanityFeaturedTestimonials,
  getAllLocations as getSanityLocations,
  getLocationBySlug as getSanityLocationBySlug,
} from "@/sanity/fetch";
import type {
  SanityResource,
  SanityTestimonial,
  Service,
  BlogPost,
  FAQ,
  Location,
  AboutPageData,
  ResolvedSiteConfig,
} from "@/types";

// Static fallbacks
import { siteConfig as staticSiteConfig } from "@/lib/site-config";
import { services as staticServices } from "@/content/services";
import { blogPosts as staticBlogPosts, blogCategories } from "@/content/blog";
import { faqs as staticFaqs, faqCategories } from "@/content/faqs";
import { locations as staticLocations } from "@/content/locations";

// Re-export categories (these don't live in Sanity)
export { blogCategories, faqCategories };

// ── Site Config ──
function staticResolvedConfig(): ResolvedSiteConfig {
  return {
    ...staticSiteConfig,
    qualifications: [...staticSiteConfig.qualifications],
    languages: [...staticSiteConfig.languages],
    fees: { ...staticSiteConfig.fees },
    socials: { ...staticSiteConfig.socials },
    newsletter: { ...staticSiteConfig.newsletter },
    pageVisibility: { ...staticSiteConfig.pageVisibility },
    discoveryCallUrl: staticSiteConfig.discoveryCallUrl,
    sessionBookingUrl: staticSiteConfig.sessionBookingUrl,
    workingHours: "Mon – Sat, 10 AM – 7 PM IST",
    upiQrCodeUrl: staticSiteConfig.upiQrCodeUrl,
    razorpayUrl: staticSiteConfig.razorpayUrl,
    seo: {},
    team: [],
    options: {
      blogCategories: [],
      faqCategories: [],
      productTypes: [],
      productTopics: [],
      productAudiences: [],
      workshopStatuses: [],
    },
    heroSlides: [],
  };
}

export async function getSiteConfig(): Promise<ResolvedSiteConfig> {
  const fallback = staticResolvedConfig();
  try {
    const cfg = await getSanitySiteConfig();
    if (cfg?.name) {
      // Map Sanity shape → siteConfig shape used by pages
      return {
        ...fallback,
        name: cfg.name,
        tagline: cfg.tagline ?? staticSiteConfig.tagline,
        description: cfg.description ?? staticSiteConfig.description,
        author: cfg.author ?? staticSiteConfig.author,
        handle: cfg.handle ?? staticSiteConfig.handle,
        twitterHandle: cfg.twitterHandle ?? staticSiteConfig.twitterHandle,
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
        discoveryCallUrl: cfg.discoveryCallUrl ?? staticSiteConfig.discoveryCallUrl,
        sessionBookingUrl: cfg.sessionBookingUrl ?? staticSiteConfig.sessionBookingUrl,
        workingHours: cfg.workingHours ?? fallback.workingHours,
        upiId: cfg.upiId ?? staticSiteConfig.upiId,
        upiNumber: cfg.upiNumber ?? staticSiteConfig.upiNumber,
        razorpayUrl: cfg.razorpayUrl ?? staticSiteConfig.razorpayUrl,
        upiQrCodeUrl: cfg.upiQrCodeUrl ?? staticSiteConfig.upiQrCodeUrl,
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
        newsletter: {
          formType: cfg.kitFormType ?? staticSiteConfig.newsletter.formType,
          uid: cfg.kitUid ?? staticSiteConfig.newsletter.uid,
          scriptUrl: cfg.kitScriptUrl ?? staticSiteConfig.newsletter.scriptUrl,
        },
        pageVisibility: {
          blog: cfg.enableBlogPage ?? true,
          products: cfg.enableProductsPage ?? true,
          workshops: cfg.enableWorkshopsPage ?? true,
          gallery: cfg.enableGalleryPage ?? true,
          resources: cfg.enableResourcesPage ?? true,
        },
        seo: cfg.seo ?? {},
        team: cfg.team ?? [],
        options: {
          blogCategories: cfg.blogCategories ?? [],
          faqCategories: cfg.faqCategories ?? [],
          productTypes: cfg.productTypes ?? [],
          productTopics: cfg.productTopics ?? [],
          productAudiences: cfg.productAudiences ?? [],
          workshopStatuses: cfg.workshopStatuses ?? [],
        },
        heroSlides: cfg.heroSlides ?? [],
        howItWorksBgUrl: cfg.howItWorksBgUrl,
      };
    }
  } catch {
    // Sanity not available - use static
  }
  return fallback;
}

// ── About Page ──
export type { AboutPageData } from "@/types";

const staticAboutPage: AboutPageData = {
  title: "About Aishani Paul",
  bioParagraph1:
    "I'm a licensed clinical psychologist with a deep commitment to making quality mental healthcare accessible, inclusive, and culturally attuned.",
  bioParagraph2: `With an M.Phil in Clinical Psychology and registration with the Rehabilitation Council of India (RCI No: ${staticSiteConfig.rciNumber}), I bring both academic rigour and heartfelt compassion to my practice.`,
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
    return sanity;
  } catch {}
  return staticServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const s = await getSanityServiceBySlug(slug);
    return s;
  } catch {}
  return staticServices.find((s) => s.slug === slug) ?? null;
}

export async function getServiceSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanityServices();
    return sanity.map((s) => s.slug);
  } catch {}
  return staticServices.map((s) => s.slug);
}

// ── Blog ──
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const sanity = await getSanityBlogPosts();
    return sanity.map((p) => ({
      ...p,
      // Portable Text body kept as-is for PortableTextBody component
      body: p.body,
    }));
  } catch {}
  return staticBlogPosts.filter((p) => p.published);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<(BlogPost & { sanityBody?: unknown }) | null> {
  try {
    const p = await getSanityBlogPostBySlug(slug);
    return p ? { ...p, sanityBody: p.body } : null;
  } catch {}
  return staticBlogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const sanity = await getSanityBlogSlugs();
    return sanity.map((s) => s.slug);
  } catch {}
  return staticBlogPosts.filter((p) => p.published).map((p) => p.slug);
}

// ── FAQs ──
export async function getAllFaqs(): Promise<FAQ[]> {
  try {
    const sanity = await getSanityFaqs();
    return sanity as unknown as FAQ[];
  } catch {}
  return staticFaqs;
}

// ── Resources ──
export async function getAllResources(): Promise<SanityResource[]> {
  try {
    const sanity = await getSanityResources();
    return sanity;
  } catch {}
  // No static fallback needed - the resources page has inline data
  return [];
}

// ── Testimonials ──
const staticTestimonials = [
  {
    quote:
      "Therapy with Aishani helped me understand myself in ways I never thought possible. I finally feel like I have the tools to handle life's challenges.",
    name: "Client A",
    context: "Individual therapy - placeholder, shared with consent",
    order: 1,
  },
  {
    quote:
      "We were on the verge of giving up on our relationship. The sessions gave us a new way to communicate and truly hear each other.",
    name: "Client B",
    context: "Couples therapy - placeholder, shared with consent",
    order: 2,
  },
  {
    quote:
      "As an NRI, finding a therapist who understood my cultural background was a game changer. I felt seen and understood from the very first session.",
    name: "Client C",
    context: "NRI therapy - placeholder, shared with consent",
    order: 3,
  },
];

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const featured = await getSanityFeaturedTestimonials();
    if (featured?.length) return featured;
    const sanity = await getSanityTestimonials();
    return sanity;
  } catch {}
  return staticTestimonials;
}

// ── Locations ──
export async function getAllLocations(): Promise<Location[]> {
  let sanityLocations: Location[] = [];
  try {
    const sanity = await getSanityLocations();
    sanityLocations = sanity.map((l) => ({
      slug: l.slug,
      city: l.name,
      title: l.title,
      description: l.description,
      metaDescription: l.metaDescription,
      keywords: [],
      content: l.description,
      features: l.features,
      services: l.services,
    }));
    return sanityLocations;
  } catch {}
  return staticLocations;
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const l = await getSanityLocationBySlug(slug);
    return l
      ? {
          slug: l.slug,
          city: l.name,
          title: l.title,
          description: l.description,
          metaDescription: l.metaDescription,
          keywords: [],
          content: l.description,
          features: l.features,
          services: l.services,
        }
      : null;
  } catch {}
  return staticLocations.find((l) => l.slug === slug) ?? null;
}

export async function getLocationSlugs(): Promise<string[]> {
  const all = await getAllLocations();
  return all.map((l) => l.slug);
}
