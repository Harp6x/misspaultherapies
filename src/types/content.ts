/**
 * TypeScript interfaces for static fallback content in content/*.ts
 */

// ── Services ──
export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { asset?: { _id: string; url: string } };
  noIndex?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // Lucide icon name
  highlights: string[];
  idealFor: string[];
  approach: string;
  fee: string;
  seo?: SanitySEO | null;
}

// ── Blog Posts ──
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  readingTime: string;
  published: boolean;
  body?: string;
  seo?: SanitySEO | null;
}

// ── FAQs ──
export interface FAQ {
  question: string;
  answer: string;
  category: "general" | "sessions" | "fees" | "confidentiality" | "getting-started";
}

// ── Locations ──
export interface Location {
  slug: string;
  city: string;
  region?: string;
  title: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  content: string;
}

// ── About Page (unified shape used by pages) ──
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
