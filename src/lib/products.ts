import type { SanityProduct } from "@/sanity/fetch";

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

/* ------------------------------------------------------------------ */
/*  Product cover images                                               */
/* ------------------------------------------------------------------ */
// Free, license-friendly Unsplash photos (hot-linked & auto-optimised by
// next/image). A coverImage uploaded in Sanity always takes precedence; these
// are sensible, on-theme fallbacks chosen per topic / product type so every
// product has a relevant, calming image without manual uploads.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const TOPIC_IMAGES: Record<string, string> = {
  anxiety: unsplash("1507525428034-b723cf961d3e"), // calm turquoise beach
  depression: unsplash("1499209974431-9dddcece7f88"), // arms open at sunrise (hope)
  "stress-burnout": unsplash("1441974231531-c6227db76b6e"), // quiet forest
  relationships: unsplash("1516589178581-6cd7833ae3b2"), // hands forming a heart
  "self-worth": unsplash("1517677129300-07b130802f46"), // joyful, confident
  boundaries: unsplash("1518241353330-0f7941c2d9b5"), // lone tree, calm water
  "emotional-regulation": unsplash("1490730141103-6cac27aaab94"), // still reflection
  mindfulness: unsplash("1545205597-3d9d02c29597"), // yoga at sunset
  attachment: unsplash("1511895426328-dc8714191300"), // holding hands, connection
  trauma: unsplash("1518495973542-4542c06a5843"), // sunlight through a tree (healing)
  "parenting-family": unsplash("1511895426328-dc8714191300"), // family together
  sleep: unsplash("1520206183501-b80df61043c2"), // peaceful sleep
  "self-care": unsplash("1466692476868-aef1dfb1e735"), // green seedlings (growth)
  "general-wellness": unsplash("1506905925346-21bda4d32df4"), // mountain peak
};

const TYPE_IMAGES: Record<string, string> = {
  course: unsplash("1481627834876-b7833e8f5570"), // library shelves
  ebook: unsplash("1481627834876-b7833e8f5570"),
  "mini-course": unsplash("1499750310107-5fef28a66643"), // desk + journal
  toolkit: unsplash("1499750310107-5fef28a66643"),
  quiz: unsplash("1490730141103-6cac27aaab94"), // reflection
  bundle: unsplash("1506905925346-21bda4d32df4"), // mountain peak
  corporate: unsplash("1600880292203-757bb62b4baf"), // positive office teamwork
};

const GENERIC_IMAGE = unsplash("1470071459604-3b5ec3a7fe05"); // sunrise over green hills

export interface ProductImage {
  url: string;
  alt: string;
}

/**
 * Resolve a product's cover image. Priority:
 *  1. coverImage uploaded in Sanity
 *  2. corporate products → office image
 *  3. first matching topic
 *  4. product type fallback
 *  5. generic calming image
 */
export function getProductImage(product: SanityProduct): ProductImage {
  if (product.coverImage?.asset?.url) {
    return {
      url: product.coverImage.asset.url,
      alt: product.coverImage.alt ?? product.title,
    };
  }
  if (product.productType === "corporate") {
    return { url: TYPE_IMAGES.corporate, alt: product.title };
  }
  const topic = product.topics?.find((t) => TOPIC_IMAGES[t]);
  if (topic) return { url: TOPIC_IMAGES[topic], alt: product.title };
  if (product.productType && TYPE_IMAGES[product.productType]) {
    return { url: TYPE_IMAGES[product.productType], alt: product.title };
  }
  return { url: GENERIC_IMAGE, alt: product.title };
}

/**
 * Parse an Indian Rupee price string into paise (integer).
 * Returns null for ranges ("From ₹…"), unrecognised formats, or amounts < 100 paise.
 * Examples: "₹499" → 49900 | "₹1,999" → 199900
 */
export function parsePriceInPaise(price: string): number | null {
  if (!price || /from/i.test(price)) return null;
  const clean = price.replace(/[₹,\s]/g, "");
  const n = parseFloat(clean);
  if (isNaN(n) || n <= 0) return null;
  const paise = Math.round(n * 100);
  return paise >= 100 ? paise : null;
}

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
export function getProductCta(product: SanityProduct, whatsappNumber = ""): ProductCta {
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
  const number = whatsappNumber.replace(/[^0-9]/g, "");
  return {
    label: ctaLabel ?? (priceType === "coming-soon" ? "Notify me" : "Enquire on WhatsApp"),
    href: `https://wa.me/${number}?text=${message}`,
    external: true,
  };
}
