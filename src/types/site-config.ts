import type { SanityHeroSlide } from "./sanity";

export interface SiteBranding {
  name: string;
  tagline: string;
  description: string;
}

export interface PageVisibility {
  blog: boolean;
  products: boolean;
  workshops: boolean;
  gallery: boolean;
  resources: boolean;
}

export interface HeaderProps {
  branding?: SiteBranding;
  pageVisibility?: PageVisibility;
}

export interface FooterProps {
  branding?: SiteBranding;
  pageVisibility?: PageVisibility;
}

export interface HeroSlideshowProps {
  slides: SanityHeroSlide[];
  branding: SiteBranding;
}
