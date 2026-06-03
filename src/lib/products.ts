import type { SanityProduct } from "@/sanity/fetch";
import { siteConfig } from "@/lib/site-config";

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  course: "Course",
  "mini-course": "Mini-Course / Challenge",
  bundle: "Bundle",
  ebook: "eBook",
  toolkit: "Toolkit / Worksheet",
  quiz: "Quiz / Assessment",
  corporate: "Corporate",
};

export const TOPIC_LABELS: Record<string, string> = {
  anxiety: "Anxiety",
  depression: "Depression",
  "stress-burnout": "Stress & Burnout",
  relationships: "Relationships",
  "self-worth": "Self-Esteem & Self-Worth",
  boundaries: "Boundaries",
  "emotional-regulation": "Emotional Regulation",
  mindfulness: "Mindfulness",
  attachment: "Attachment",
  trauma: "Trauma",
  "parenting-family": "Parenting & Family",
  sleep: "Sleep",
  "self-care": "Self-Care",
  "general-wellness": "General Wellness",
};

export const AUDIENCE_LABELS: Record<string, string> = {
  individuals: "Individuals",
  couples: "Couples",
  families: "Families",
  teens: "Teens / Adolescents",
  parents: "Parents",
  corporate: "Corporate / Workplace",
  nris: "NRIs",
};

export const PRICE_TYPE_LABELS: Record<string, string> = {
  free: "Free",
  paid: "Paid",
  bundle: "Bundle",
  "coming-soon": "Coming Soon",
};

// Ordered lists for rendering filter groups
export const PRODUCT_TYPE_OPTIONS = Object.keys(PRODUCT_TYPE_LABELS);
export const TOPIC_OPTIONS = Object.keys(TOPIC_LABELS);
export const AUDIENCE_OPTIONS = Object.keys(AUDIENCE_LABELS);
export const PRICE_TYPE_OPTIONS = Object.keys(PRICE_TYPE_LABELS);

export interface ProductCta {
  label: string;
  href: string;
  external: boolean;
}

/**
 * Flexible per-product CTA:
 *  - actionUrl set + paid/bundle  → "Get instant access" (buy link)
 *  - actionUrl set + free         → "Download free" / "Take the quiz"
 *  - no actionUrl                 → "Enquire on WhatsApp"
 * A ctaLabel on the product always overrides the computed label.
 */
export function getProductCta(product: SanityProduct): ProductCta {
  const { actionUrl, priceType, productType, ctaLabel, title } = product;

  if (actionUrl) {
    let label = ctaLabel;
    if (!label) {
      if (priceType === "free") {
        label = productType === "quiz" ? "Take the quiz" : "Download free";
      } else if (priceType === "coming-soon") {
        label = "Join the waitlist";
      } else {
        label = "Get instant access";
      }
    }
    return { label, href: actionUrl, external: actionUrl.startsWith("http") };
  }

  // Fallback: WhatsApp enquiry
  const message = encodeURIComponent(
    `Hi Aishani, I'm interested in "${title}". Could you share how to get it?`
  );
  const number = siteConfig.whatsappNumber?.replace(/[^0-9]/g, "") ?? "";
  return {
    label: ctaLabel ?? (priceType === "coming-soon" ? "Notify me" : "Enquire on WhatsApp"),
    href: `https://wa.me/${number}?text=${message}`,
    external: true,
  };
}
