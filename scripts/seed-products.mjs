/**
 * Seed script: pushes the real product catalog to Sanity.
 * Source of truth: revenue-infrastructure/05-pricing-and-packaging.md
 *
 * Usage:
 *   1. Create a read+write (Editor) API token:
 *      https://www.sanity.io/manage/project/k0r3y2my/api#tokens
 *   2. Run:
 *      SANITY_TOKEN=sk... node scripts/seed-products.mjs
 *
 * Re-running is safe: documents use deterministic IDs (createOrReplace).
 * It will NOT touch any product you create manually in Studio (different IDs).
 *
 * Notes:
 *  - Paid courses/bundles have no live store link yet, so `actionUrl` is left
 *    blank → the site shows an "Enquire on WhatsApp" button. Paste real buy
 *    links in Sanity Studio when your store is ready.
 *  - eBooks & multi-day challenges are seeded as "coming-soon" (no fabricated
 *    prices) since they aren't priced in the pricing doc yet.
 */

import { createClient } from "@sanity/client";

const projectId = "k0r3y2my";
const dataset = "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "❌  Set SANITY_TOKEN env var first.\n" +
      "   → Create an Editor token at: https://www.sanity.io/manage/project/k0r3y2my/api#tokens\n" +
      "   Then run: SANITY_TOKEN=sk... node scripts/seed-products.mjs"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Portable Text helper (single intro paragraph)
const para = (text) => [
  {
    _type: "block",
    _key: slugify(text).slice(0, 12) || "intro",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s0", text, marks: [] }],
  },
];

// ── Courses (10) — paid, regular INR pricing ──
const courses = [
  {
    title: "Anxiety Toolkit",
    price: "₹499",
    priceUSD: "$9",
    format: "4 modules · 12 lessons",
    topics: ["anxiety", "stress-burnout"],
    audience: ["individuals"],
    short:
      "A practical, self-paced course to understand your anxiety and build a daily toolkit of evidence-based coping skills.",
    highlights: [
      "12 bite-sized video lessons",
      "Grounding & breathing techniques",
      "Worksheets you can reuse anytime",
      "Lifetime access",
    ],
  },
  {
    title: "Mindfulness for Real Life",
    price: "₹499",
    priceUSD: "$9",
    format: "4 modules · 12 lessons",
    topics: ["mindfulness", "stress-burnout"],
    audience: ["individuals"],
    short:
      "Simple mindfulness practices that fit into a busy Indian life — no incense or hour-long meditations required.",
    highlights: [
      "Short guided practices",
      "Mindful habits for work & home",
      "Practical, no-fluff approach",
      "Lifetime access",
    ],
  },
  {
    title: "Burnout to Balance",
    price: "₹999",
    priceUSD: "$15",
    format: "4 modules · 12 lessons",
    topics: ["stress-burnout", "self-care"],
    audience: ["individuals", "corporate"],
    short:
      "Recognise the signs of burnout and rebuild your energy with sustainable boundaries and recovery routines.",
    highlights: [
      "Burnout self-assessment",
      "Recovery & rest strategies",
      "Boundary-setting at work",
      "Lifetime access",
    ],
  },
  {
    title: "Boundaries for Indians",
    price: "₹799",
    priceUSD: "$12",
    format: "5 modules · 10 lessons",
    topics: ["boundaries", "relationships", "self-worth"],
    audience: ["individuals", "families"],
    short:
      "Set healthy boundaries with family, in-laws and society — without guilt — in a way that respects Indian context.",
    highlights: [
      "Scripts for tough conversations",
      "Guilt & obligation, unpacked",
      "Family & cultural dynamics",
      "Lifetime access",
    ],
  },
  {
    title: "Emotional Regulation",
    price: "₹999",
    priceUSD: "$15",
    format: "4 modules · 12 lessons",
    topics: ["emotional-regulation", "anxiety"],
    audience: ["individuals", "teens"],
    short:
      "Learn to name, understand and manage intense emotions so they no longer run the show.",
    highlights: [
      "Emotion-mapping tools",
      "Distress tolerance skills",
      "Practical DBT-informed techniques",
      "Lifetime access",
    ],
  },
  {
    title: "Attachment Styles",
    price: "₹1,999",
    priceUSD: "$29",
    format: "6 modules · 12 lessons",
    topics: ["attachment", "relationships"],
    audience: ["individuals", "couples"],
    short:
      "Understand your attachment style and how it shapes your relationships — and learn to move towards secure connection.",
    highlights: [
      "Identify your attachment pattern",
      "Heal anxious & avoidant cycles",
      "Build secure relationships",
      "Lifetime access",
    ],
  },
  {
    title: "Self-Worth Rebuilding",
    price: "₹1,499",
    priceUSD: "$22",
    format: "6 modules · 12 lessons",
    topics: ["self-worth", "depression"],
    audience: ["individuals"],
    short:
      "Rebuild self-esteem from the inside out and quiet the inner critic with compassion-based tools.",
    highlights: [
      "Inner-critic work",
      "Self-compassion practices",
      "Value-based living",
      "Lifetime access",
    ],
  },
  {
    title: "Indian Family Dynamics",
    price: "₹1,999",
    priceUSD: "$29",
    format: "5 modules · 10 lessons",
    topics: ["parenting-family", "relationships", "boundaries"],
    audience: ["families", "parents"],
    short:
      "Navigate enmeshment, expectations and intergenerational patterns unique to Indian families.",
    highlights: [
      "Enmeshment vs closeness",
      "Managing expectations",
      "Healthier family roles",
      "Lifetime access",
    ],
  },
  {
    title: "Healing Toxic Relationships",
    price: "₹1,499",
    priceUSD: "$22",
    format: "6 modules · 12 lessons",
    topics: ["relationships", "self-worth", "trauma"],
    audience: ["individuals", "couples"],
    short:
      "Recognise toxic patterns, protect your peace, and heal after difficult or harmful relationships.",
    highlights: [
      "Spot red flags & patterns",
      "Detach with clarity",
      "Rebuild trust in yourself",
      "Lifetime access",
    ],
  },
  {
    title: "CBT+DBT Toolkit",
    price: "₹1,999",
    priceUSD: "$29",
    format: "6 modules · 12 lessons",
    topics: ["emotional-regulation", "anxiety", "depression"],
    audience: ["individuals"],
    short:
      "A combined toolkit of the most practical CBT and DBT skills for anxiety, low mood and overwhelm.",
    highlights: [
      "Thought-record techniques",
      "DBT distress tolerance",
      "Relapse-prevention tools",
      "Lifetime access",
    ],
  },
];

// ── Bundles (6) ──
const bundles = [
  {
    title: "Starter Bundle",
    price: "₹699",
    originalPrice: "₹998",
    priceUSD: "$10",
    topics: ["anxiety", "mindfulness"],
    audience: ["individuals"],
    short: "Anxiety Toolkit + Mindfulness for Real Life. The perfect first step.",
    highlights: ["2 courses", "Save 30%", "Lifetime access"],
  },
  {
    title: "Self-Worth Bundle",
    price: "₹1,799",
    originalPrice: "₹2,298",
    priceUSD: "$25",
    topics: ["boundaries", "self-worth"],
    audience: ["individuals"],
    short: "Boundaries for Indians + Self-Worth Rebuilding. Reclaim your confidence.",
    highlights: ["2 courses", "Save 22%", "Lifetime access"],
  },
  {
    title: "Relationships Bundle",
    price: "₹2,499",
    originalPrice: "₹3,498",
    priceUSD: "$35",
    topics: ["attachment", "relationships"],
    audience: ["individuals", "couples"],
    short: "Attachment Styles + Healing Toxic Relationships. Build secure connection.",
    highlights: ["2 courses", "Save 29%", "Lifetime access"],
  },
  {
    title: "Emotional Skills Bundle",
    price: "₹2,199",
    originalPrice: "₹2,998",
    priceUSD: "$30",
    topics: ["emotional-regulation"],
    audience: ["individuals"],
    short: "Emotional Regulation + CBT/DBT Toolkit. Master your inner world.",
    highlights: ["2 courses", "Save 27%", "Lifetime access"],
  },
  {
    title: "Indian Context Bundle",
    price: "₹1,999",
    originalPrice: "₹2,798",
    priceUSD: "$29",
    topics: ["boundaries", "parenting-family"],
    audience: ["families", "individuals"],
    short: "Boundaries for Indians + Indian Family Dynamics. For our culture, our families.",
    highlights: ["2 courses", "Save 29%", "Lifetime access"],
  },
  {
    title: "Complete Toolkit",
    price: "₹6,999",
    originalPrice: "₹11,887",
    priceUSD: "$99",
    topics: ["general-wellness"],
    audience: ["individuals"],
    featured: true,
    short: "All 10 courses in one. The complete mental-health library — save 41%.",
    highlights: ["All 10 courses", "Save 41%", "Best value", "Lifetime access"],
  },
];

// ── Free lead magnets (8) ──
const freebies = [
  {
    title: "Anxiety First-Aid Kit",
    type: "toolkit",
    format: "PDF · 5 pages",
    topics: ["anxiety"],
    audience: ["individuals"],
    short: "A free 5-page emergency kit of techniques to calm anxiety in the moment.",
    highlights: ["Grounding exercises", "Breathing scripts", "Printable"],
  },
  {
    title: "Attachment Style Quiz",
    type: "quiz",
    format: "Interactive quiz",
    topics: ["attachment", "relationships"],
    audience: ["individuals", "couples"],
    short: "Discover your attachment style and what it means for your relationships.",
    highlights: ["Takes 3 minutes", "Personalised result", "Free"],
  },
  {
    title: "Burnout Assessment",
    type: "quiz",
    format: "Interactive quiz",
    topics: ["stress-burnout"],
    audience: ["individuals", "corporate"],
    short: "A quick check-in to see where you are on the burnout spectrum.",
    highlights: ["Takes 3 minutes", "Instant result", "Free"],
    actionUrl: "/tools/burnout-quiz",
  },
  {
    title: "Boundary Checklist",
    type: "toolkit",
    format: "PDF · 3 pages",
    topics: ["boundaries"],
    audience: ["individuals", "families"],
    short: "A free checklist to spot where your boundaries need strengthening.",
    highlights: ["Quick self-audit", "Printable", "Free"],
  },
  {
    title: "Self-Worth Cards",
    type: "toolkit",
    format: "Printable PDF · 30 cards",
    topics: ["self-worth"],
    audience: ["individuals"],
    short: "30 printable affirmation & reflection cards to rebuild self-worth.",
    highlights: ["30 cards", "Printable", "Free"],
  },
  {
    title: "ROI of Employee Mental Health",
    type: "toolkit",
    format: "PDF (for employers)",
    topics: ["stress-burnout", "general-wellness"],
    audience: ["corporate"],
    short: "A free guide for HR & leaders on the business case for workplace wellbeing.",
    highlights: ["Data-backed", "For decision-makers", "Free"],
  },
  {
    title: "30-Day Journaling Challenge",
    type: "mini-course",
    format: "PDF + email drip",
    topics: ["self-care", "general-wellness"],
    audience: ["individuals"],
    short: "A free 30-day prompt-a-day journaling challenge delivered to your inbox.",
    highlights: ["30 daily prompts", "Email drip", "Free"],
  },
  {
    title: "Sleep Hygiene Checklist",
    type: "toolkit",
    format: "PDF · 1 page",
    topics: ["sleep", "self-care"],
    audience: ["individuals"],
    short: "A one-page checklist for building habits that actually help you sleep.",
    highlights: ["Quick win", "Printable", "Free"],
  },
];

// ── eBooks & challenges (coming soon — not yet priced) ──
const comingSoon = [
  {
    title: "The Indian Guide to Starting Therapy",
    type: "ebook",
    format: "eBook",
    topics: ["general-wellness"],
    audience: ["individuals", "nris"],
    short: "An honest, stigma-busting guide to what therapy is really like in India.",
    highlights: ["What to expect", "How to choose a therapist", "Coming soon"],
  },
  {
    title: "The Indian Parents' Survival Guide",
    type: "ebook",
    format: "eBook",
    topics: ["parenting-family"],
    audience: ["parents", "families"],
    short: "A practical guide to raising emotionally healthy kids in Indian households.",
    highlights: ["Emotion coaching", "Modern parenting", "Coming soon"],
  },
  {
    title: "5-Day Anxiety Reset",
    type: "mini-course",
    format: "5-day mini-course",
    topics: ["anxiety"],
    audience: ["individuals"],
    short: "A short, guided 5-day reset to interrupt the anxiety spiral.",
    highlights: ["5 short lessons", "Daily practice", "Coming soon"],
  },
  {
    title: "5-Day Self-Compassion Challenge",
    type: "mini-course",
    format: "5-day mini-course",
    topics: ["self-worth", "self-care"],
    audience: ["individuals"],
    short: "Five days of small practices to be kinder to yourself.",
    highlights: ["5 short lessons", "Daily practice", "Coming soon"],
  },
  {
    title: "7-Day Mindfulness Basics",
    type: "mini-course",
    format: "7-day mini-course",
    topics: ["mindfulness"],
    audience: ["individuals"],
    short: "A gentle week-long introduction to mindfulness you'll actually keep up.",
    highlights: ["7 short lessons", "Daily practice", "Coming soon"],
  },
  {
    title: "21-Day Confidence Challenge",
    type: "mini-course",
    format: "21-day mini-course",
    topics: ["self-worth"],
    audience: ["individuals"],
    short: "Three weeks of daily micro-actions to build lasting confidence.",
    highlights: ["21 daily actions", "Progress tracker", "Coming soon"],
  },
];

// ── Corporate ──
const corporate = [
  {
    title: "Corporate Wellness Workshops",
    type: "corporate",
    format: "90 min – half day",
    topics: ["stress-burnout", "general-wellness"],
    audience: ["corporate"],
    price: "From ₹15,000",
    short:
      "Interactive mental-health workshops for teams — stress, burnout, boundaries and resilience. Enquire for a custom proposal.",
    highlights: [
      "Tailored to your team",
      "Up to 50 employees / session",
      "Handouts + follow-up resources",
      "Half-day & retainer options",
    ],
  },
];

// ── Build docs ──
const docs = [];
let order = 0;

const pushDoc = (d) => {
  const slug = slugify(d.title);
  docs.push({
    _id: `product-${slug}`,
    _type: "product",
    title: d.title,
    slug: { _type: "slug", current: slug },
    shortDescription: d.short,
    productType: d.productType,
    priceType: d.priceType,
    ...(d.price ? { price: d.price } : {}),
    ...(d.originalPrice ? { originalPrice: d.originalPrice } : {}),
    ...(d.priceUSD ? { priceUSD: d.priceUSD } : {}),
    topics: d.topics ?? [],
    audience: d.audience ?? [],
    ...(d.format ? { format: d.format } : {}),
    highlights: d.highlights ?? [],
    body: para(d.short),
    ...(d.actionUrl ? { actionUrl: d.actionUrl } : {}),
    ...(d.featured ? { featured: true } : {}),
    published: true,
    order: order++,
  });
};

courses.forEach((c) =>
  pushDoc({ ...c, productType: "course", priceType: "paid" })
);
bundles.forEach((b) =>
  pushDoc({ ...b, productType: "bundle", priceType: "bundle" })
);
freebies.forEach((f) =>
  pushDoc({ ...f, productType: f.type, priceType: "free", price: "Free" })
);
comingSoon.forEach((c) =>
  pushDoc({ ...c, productType: c.type, priceType: "coming-soon" })
);
corporate.forEach((c) =>
  pushDoc({ ...c, productType: c.type, priceType: "paid" })
);

// ── Write ──
console.log(`\n🛍️  Seeding ${docs.length} products...`);
let ok = 0;
for (const doc of docs) {
  try {
    await client.createOrReplace(doc);
    ok++;
    console.log(`  ✓ ${doc.title}`);
  } catch (err) {
    console.error(`  ✗ ${doc.title}: ${err.message}`);
  }
}
console.log(`\n✅  Done. ${ok}/${docs.length} products seeded.\n`);
