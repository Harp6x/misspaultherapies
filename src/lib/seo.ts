import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/* ------------------------------------------------------------------ */
/*  Metadata helper                                                    */
/* ------------------------------------------------------------------ */

interface PageSEO {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
  noIndex = false,
}: PageSEO): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/* ------------------------------------------------------------------ */
/*  Article metadata helper (for blog posts)                            */
/* ------------------------------------------------------------------ */

interface ArticleSEO {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  category?: string;
  image?: string;
}

export function buildArticleMetadata({
  title,
  description,
  slug,
  datePublished,
  category,
  image,
}: ArticleSEO): Metadata {
  const url = `${siteConfig.url}/blog/${slug}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: datePublished,
      authors: [siteConfig.author],
      section: category,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: "Clinical Psychologist & Psychotherapist",
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.socials).filter(
      (v) => !v.startsWith("[")
    ),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone.startsWith("[") ? undefined : siteConfig.phone,
    medicalSpecialty: "Psychiatric",
    priceRange: "₹₹",
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
    availableLanguage: siteConfig.languages.map((l) => ({
      "@type": "Language",
      name: l,
    })),
    sameAs: Object.values(siteConfig.socials).filter((v) => !v.startsWith("[")),
    founder: personJsonLd(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Therapy Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Individual Therapy", description: "One-on-one online therapy for anxiety, depression, grief, trauma, and life transitions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Couples Therapy", description: "Online couples counselling for communication, trust, and intimacy issues" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adolescent Therapy", description: "Online therapy for teenagers dealing with academic pressure, identity, and emotional challenges" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Therapy", description: "Online family counselling for conflict resolution and improved communication" } },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-IN", "en"],
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
  fee?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${service.slug}`,
    image: `${siteConfig.url}/opengraph-image`,
    provider: {
      "@type": "Person",
      name: siteConfig.author,
      jobTitle: "Clinical Psychologist & Psychotherapist",
      url: siteConfig.url,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    availableLanguage: siteConfig.languages.map((l) => ({
      "@type": "Language",
      name: l,
    })),
    serviceType: "Mental Health Counselling",
    isPartOf: {
      "@type": "MedicalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(service.fee && {
      offers: {
        "@type": "Offer",
        price: service.fee,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function productJsonLd(product: {
  title: string;
  description?: string;
  slug: string;
  price?: string;
  priceType?: string;
  image?: string;
}) {
  const numericPrice = product.price
    ? product.price.replace(/[^0-9.]/g, "")
    : undefined;
  const isFree = product.priceType === "free";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `${siteConfig.url}/products/${product.slug}`,
    image: product.image ?? `${siteConfig.url}/opengraph-image`,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...((numericPrice || isFree) && {
      offers: {
        "@type": "Offer",
        price: isFree ? "0" : numericPrice,
        priceCurrency: "INR",
        availability:
          product.priceType === "coming-soon"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
        url: `${siteConfig.url}/products/${product.slug}`,
      },
    }),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  category?: string;
  datePublished: string;
  dateModified?: string;
  readingTime?: string;
  wordCount?: number;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: personJsonLd(),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    image: post.image ?? `${siteConfig.url}/opengraph-image`,
    ...(post.category && { articleSection: post.category }),
    ...(post.wordCount && { wordCount: post.wordCount }),
    inLanguage: "en",
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.name} Blog`,
      url: `${siteConfig.url}/blog`,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone.startsWith("[") ? undefined : siteConfig.phone,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/icon.svg`,
    medicalSpecialty: "Psychiatric",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Bank Transfer",
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Singapore" },
    ],
    availableLanguage: siteConfig.languages.map((l) => ({
      "@type": "Language",
      name: l,
    })),
    sameAs: Object.values(siteConfig.socials).filter(
      (v) => !v.startsWith("[")
    ),
    founder: personJsonLd(),
    knowsAbout: [
      "Cognitive Behavioural Therapy",
      "Dialectical Behaviour Therapy",
      "Acceptance and Commitment Therapy",
      "Emotion-Focused Therapy",
      "Couples Therapy",
      "Anxiety Treatment",
      "Depression Treatment",
      "Trauma Therapy",
    ],
  };
}
