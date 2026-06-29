export interface SiteBranding {
  name: string;
  tagline: string;
  description: string;
}

export interface SiteSeoConfig {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
}

export interface SiteTeamMember {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  socialLinks?: { label: string; url: string }[];
}

export interface SiteConfigOptions {
  blogCategories: string[];
  faqCategories: string[];
  productTypes: string[];
  productTopics: string[];
  productAudiences: string[];
  workshopStatuses: string[];
}

export interface PageVisibility {
  blog: boolean;
  products: boolean;
  workshops: boolean;
  gallery: boolean;
  resources: boolean;
}

export interface ResolvedSiteConfig extends SiteBranding {
  url: string;
  author: string;
  handle: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  rciNumber: string;
  qualifications: readonly string[];
  languages: readonly string[];
  socials: {
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  googleFormUrl: string;
  discoveryCallUrl: string;
  sessionBookingUrl: string;
  workingHours: string;
  upiId: string;
  upiNumber: string;
  razorpayUrl: string;
  upiQrCodeUrl: string;
  fees: {
    individual: string;
    couples: string;
    family: string;
    assessment: string;
    package: string;
  };
  slidingScale: string;
  sessionDuration: string;
  cancellationPolicy: string;
  newsletter: {
    formType: "inline" | "modal" | "slide-in" | "sticky-bar" | "off";
    uid: string;
    scriptUrl: string;
  };
  pageVisibility: PageVisibility;
  seo: SiteSeoConfig;
  team: SiteTeamMember[];
  options: SiteConfigOptions;
  heroSlides: { imageUrl: string; alt: string }[];
  howItWorksBgUrl?: string;
  ogImage: string;
  twitterHandle: string;
}

export interface HeaderProps {
  config: ResolvedSiteConfig;
  pageVisibility?: PageVisibility;
}

export interface FooterProps {
  config: ResolvedSiteConfig;
  pageVisibility?: PageVisibility;
}

export interface HeroSlideshowProps {
  slides: { imageUrl: string; alt: string }[];
  branding: SiteBranding;
}

export interface SiteConfigComponentProps {
  config: ResolvedSiteConfig;
}
