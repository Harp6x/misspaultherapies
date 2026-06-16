/**
 * TypeScript interfaces for all Sanity document types.
 * Mirrors the shapes returned by GROQ queries in sanity/queries.ts.
 */

// ── Hero Slide ──
export interface SanityHeroSlide {
  imageUrl: string;
  alt: string;
}

// ── Site Config (singleton) ──
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
  upiNumber?: string;
  razorpayUrl?: string;
  upiQrCodeUrl?: string;
  feeIndividual: string;
  feeCouples: string;
  feeFamily: string;
  feeAssessment: string;
  feePackage: string;
  slidingScale: string;
  sessionDuration: string;
  cancellationPolicy: string;
  kitFormType?: "inline" | "modal" | "slide-in" | "sticky-bar" | "off";
  kitUid?: string;
  kitScriptUrl?: string;
  enableBlogPage?: boolean;
  enableProductsPage?: boolean;
  enableWorkshopsPage?: boolean;
  enableGalleryPage?: boolean;
  enableResourcesPage?: boolean;
  heroSlides?: SanityHeroSlide[];
  howItWorksBgUrl?: string;
}

// ── About Page (singleton) ──
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
  resumeUrl?: string;
  socialLinks: { platform: string; url: string; icon: string }[];
}

// ── Services ──
export interface SanityService {
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  icon: string;
  imageUrl?: string;
  imageAlt?: string;
  highlights: string[];
  idealFor: string[];
  approach: string;
  fee: string;
  order: number;
}

// ── Blog Posts ──
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

// ── FAQs ──
export interface SanityFAQ {
  question: string;
  answer: string;
  category: string;
  order: number;
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

// ── Testimonials ──
export interface SanityTestimonial {
  quote: string;
  name: string;
  context: string;
  order: number;
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

// ── Products ──
export interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  productType:
    | "course"
    | "mini-course"
    | "bundle"
    | "ebook"
    | "toolkit"
    | "quiz"
    | "corporate";
  priceType: "free" | "paid" | "bundle" | "coming-soon";
  price?: string;
  originalPrice?: string;
  priceUSD?: string;
  topics?: string[];
  audience?: string[];
  format?: string;
  highlights?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  actionUrl?: string;
  ctaLabel?: string;
  featured?: boolean;
  order?: number;
  coverImage?: { asset: { _id: string; url: string }; alt?: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset?: { _id: string; url: string } };
    noIndex?: boolean;
  } | null;
}
