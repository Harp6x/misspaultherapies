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

// Portable Text helpers
const para = (text) => [
  {
    _type: "block",
    _key: slugify(text).slice(0, 12) || "intro",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s0", text, marks: [] }],
  },
];

const paras = (...texts) =>
  texts.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "s0", text, marks: [] }],
  }));

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
      "Anxiety doesn't have to run your life. This self-paced course breaks down the science of anxiety in plain language, then gives you a hands-on toolkit of evidence-based techniques — from CBT thought records to somatic grounding exercises — that you can use the moment anxiety spikes. Built for busy Indians who need real skills, not just theory. By the end, you'll have a personalised coping plan you can actually use, again and again.",
    body: paras(
      "Anxiety doesn't have to run your life. This self-paced course breaks down the science of anxiety in plain language, then gives you a hands-on toolkit of evidence-based techniques — from CBT thought records to somatic grounding exercises — that you can use the moment anxiety spikes.",
      "Each of the 12 bite-sized lessons is built for real life: short enough to finish on a lunch break, practical enough to apply the same evening. No jargon, no fluff — just the skills that actually work, explained by an RCI-licensed clinical psychologist.",
      "By the end of this course, you'll know exactly what's driving your anxiety, have a set of grounding and breathing tools you can use anywhere, and leave with a personalised coping plan you can reach for whenever you need it."
    ),
    highlights: [
      "12 bite-sized lessons",
      "CBT thought-record tools",
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
      "You don't need a silent retreat or hour-long sit-downs to benefit from mindfulness. This course strips away the spiritual fluff and gives you short, practical techniques designed for Indian life — commutes, family dinners, high-stress workdays, and everything in between. Each lesson takes under 10 minutes and every practice is immediately usable. No prior experience needed, no special equipment required.",
    body: paras(
      "You don't need a silent retreat or hour-long sit-downs to benefit from mindfulness. This course strips away the spiritual fluff and gives you short, practical techniques designed for Indian life — commutes, family dinners, high-stress workdays, and everything in between.",
      "Each of the 12 lessons is under 10 minutes. You'll learn to use mindfulness during a traffic jam, before a difficult conversation, after a stressful meeting, and even in the middle of a family argument. These aren't abstract practices — they're moment-to-moment tools.",
      "By the end, mindfulness will feel like a natural part of your day, not an obligation. Ideal for beginners and for anyone who has 'tried meditation but it didn't work'."
    ),
    highlights: [
      "Short guided practices (under 10 min each)",
      "Mindful habits for work & home",
      "Designed for busy Indian lives",
      "No prior experience needed",
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
      "Burnout isn't just tiredness — it's your nervous system sending an SOS. This course helps you identify where you are on the burnout spectrum, understand the psychological drivers behind it, and build a recovery plan that sticks. You'll learn boundary-setting for the Indian workplace, sustainable energy management strategies, and how to rebuild without quitting everything. Designed for working professionals, students, and caregivers.",
    body: paras(
      "Burnout isn't just tiredness — it's your nervous system sending an SOS. This course helps you identify where you are on the burnout spectrum, understand what's driving it, and build a recovery plan that actually sticks.",
      "You'll learn boundary-setting techniques specific to the Indian workplace — including how to manage the pressure of being 'always available', navigating unsympathetic managers, and the cultural pressure to sacrifice rest for productivity.",
      "The course includes a burnout self-assessment tool, evidence-based recovery strategies, and a step-by-step plan to rebuild your energy sustainably — without quitting your job or going off-grid. Suitable for working professionals, students under pressure, and caregivers."
    ),
    highlights: [
      "Burnout self-assessment tool",
      "Recovery & rest strategies",
      "Boundary-setting for Indian workplaces",
      "Energy management framework",
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
      "Setting limits in Indian families is complicated — love, duty, guilt, and expectation are all tangled together. This course was built specifically for the Indian context: enmeshed families, in-law dynamics, societal pressure, and the deep conditioning that makes 'no' feel like betrayal. You'll learn to recognise where your limits are being crossed, communicate them clearly and compassionately, and hold them without destroying relationships. Real scripts and role-play examples included.",
    body: paras(
      "Setting limits in Indian families is complicated — love, duty, guilt, and expectation are all tangled together. Saying 'no' can feel like a rejection of everything you've been taught about family, loyalty, and respect.",
      "This course was built specifically for the Indian context. It covers enmeshed family dynamics, in-law relationships, societal pressure to conform, and the deep conditioning that makes self-advocacy feel like betrayal. You'll learn how to recognise where your limits are being crossed, name what you're feeling without shame, and communicate boundaries in a way that is clear, compassionate, and culturally sensitive.",
      "Includes scripts for real conversations — with parents, partners, in-laws, colleagues — and practical role-play examples from Indian family settings. You'll leave knowing how to hold your limits without cutting people off."
    ),
    highlights: [
      "Scripts for tough Indian family conversations",
      "Guilt & obligation, unpacked",
      "In-law & joint family dynamics",
      "Compassionate limit-setting",
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
      "When emotions feel overwhelming, it's not a character flaw — it's a skill gap. This course teaches the DBT-informed framework for understanding why intense emotions happen, how to name and track them accurately, and how to use proven distress tolerance techniques in the heat of the moment. Whether you're dealing with anger, grief, anxiety spikes, or emotional shutdown, you'll leave with practical tools that work under real pressure.",
    body: paras(
      "When emotions feel overwhelming, it's not a character flaw — it's a skill gap. Emotional regulation is something everyone can learn, and this course teaches you how.",
      "Drawing on Dialectical Behaviour Therapy (DBT), you'll learn a clear framework for understanding where intense emotions come from, how to name them accurately (which itself reduces their intensity), and how to use distress tolerance skills to ride out a crisis without making things worse.",
      "Practical, evidence-based, and immediately usable — this course is suitable for adults, teens, and anyone who has ever felt hijacked by their own emotions. Particularly helpful for anger, grief, anxiety spikes, and emotional shutdown."
    ),
    highlights: [
      "DBT-informed emotion framework",
      "Emotion-mapping tools",
      "Distress tolerance skills",
      "Works for anger, grief, anxiety & shutdown",
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
      "Your earliest relationships shaped how you connect with everyone — partners, friends, family, even colleagues. This in-depth course walks you through all four attachment styles, helps you identify your own patterns, and gives you a clear roadmap toward earned security. With guided exercises and real relationship examples rooted in Indian culture, you'll understand not just why you do what you do in relationships — but how to begin changing it.",
    body: paras(
      "Your earliest relationships shaped how you connect with everyone — partners, friends, family, even colleagues. Attachment theory explains why you cling or withdraw, why certain people trigger you, and why relationships feel so hard sometimes even when they shouldn't.",
      "This course walks you through all four attachment styles (secure, anxious, avoidant, and disorganised), helps you identify your own pattern with clarity, and then gives you a concrete roadmap toward earned security — the ability to feel safe and connected in relationships regardless of your early experiences.",
      "Each lesson includes guided reflection exercises and real examples drawn from Indian relationship contexts — joint families, arranged marriages, parent-child dynamics, and workplace relationships. Suitable for individuals and couples exploring their patterns together."
    ),
    highlights: [
      "All 4 attachment styles explained clearly",
      "Identify your own pattern",
      "Roadmap to earned security",
      "Indian relationship context throughout",
      "Suitable for individuals & couples",
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
      "Low self-worth often has deep roots — comparison, conditional love, academic pressure, or years of being told you weren't enough. This course takes a compassion-based approach to rebuilding your sense of self from the inside out. You'll work through the inner critic's origins, challenge self-defeating beliefs with CBT tools, and build a relationship with yourself that isn't contingent on achievement or approval. Particularly relevant for those navigating Indian family expectations and constant social comparison.",
    body: paras(
      "Low self-worth often has deep roots — comparison culture, conditional love, academic pressure, or years of being told you weren't quite enough. It shows up as people-pleasing, perfectionism, difficulty saying no, and a persistent sense that you're behind everyone else.",
      "This course takes a compassion-based approach to rebuilding your sense of self from the inside out. You'll explore where your inner critic came from, learn to challenge self-defeating beliefs using CBT tools, and develop self-compassion practices that are grounded in research — not toxic positivity.",
      "Particularly relevant for those navigating Indian family expectations, academic or career comparison, or the aftermath of emotionally difficult relationships. This course doesn't ask you to fake confidence — it helps you build the real thing."
    ),
    highlights: [
      "Inner-critic origins & work",
      "CBT-based belief-challenging tools",
      "Self-compassion practices (research-backed)",
      "Value-based living framework",
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
      "Indian families are close-knit by design — but that closeness can sometimes tip into enmeshment, role confusion, and unspoken rules nobody questions. This course unpacks the psychological patterns unique to Indian households: joint family dynamics, intergenerational trauma, parental expectations, gender roles, and the difference between healthy closeness and harmful dependency. You'll learn to identify these patterns and begin building healthier dynamics — without cutting off or causing chaos.",
    body: paras(
      "Indian families are close-knit by design — but that closeness can sometimes tip into enmeshment, role confusion, and unspoken rules that nobody questions. You may love your family deeply and still find that the dynamic is costing you your mental health.",
      "This course unpacks the psychological patterns unique to Indian households: joint family structures, intergenerational trauma, the weight of parental sacrifice, gender role expectations, and the way childhood roles follow us into adulthood. It explores the difference between healthy closeness and harmful dependency — and how to tell them apart in your own family.",
      "Designed for adults navigating difficult family systems, parents who want to break generational cycles, and anyone who has ever felt consumed by family obligation. You'll leave with clarity, language, and practical tools to begin shifting these dynamics with care."
    ),
    highlights: [
      "Enmeshment vs healthy closeness",
      "Intergenerational trauma patterns",
      "Joint family & gender role dynamics",
      "Breaking generational cycles",
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
      "Toxic relationships rarely announce themselves — they creep in slowly through gaslighting, control, emotional unavailability, or chronic criticism. This course helps you identify the specific patterns at play, understand why you stayed, and begin the psychological work of detaching, healing, and rebuilding self-trust. Whether the relationship was romantic, familial, or a friendship, the tools here apply. Includes sections on narcissistic dynamics, trauma bonding, and rebuilding after emotional abuse.",
    body: paras(
      "Toxic relationships rarely announce themselves — they creep in slowly through gaslighting, constant criticism, emotional unavailability, or subtle control. By the time you realise what's happening, you may already feel confused, isolated, or dependent.",
      "This course helps you identify the specific patterns at play in your relationship (or past relationships), understand the psychological mechanisms that keep people stuck — including trauma bonding and self-blame — and begin the real work of detaching, grieving, and rebuilding.",
      "Whether the relationship was romantic, familial, or a close friendship, the tools in this course apply. Sections cover narcissistic dynamics, emotional abuse recovery, rebuilding self-trust after betrayal, and moving forward without bitterness. Suitable for those currently in difficult relationships and those healing from past ones."
    ),
    highlights: [
      "Identify toxic patterns clearly",
      "Trauma bonding explained",
      "Narcissistic dynamics module",
      "Detach & rebuild self-trust",
      "Applies to romantic, family & friendships",
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
      "CBT and DBT are two of the most evidence-backed therapies in the world — this course distils the most practical skills from both into one comprehensive toolkit. You'll learn to identify and reframe distorted thinking patterns, regulate overwhelming emotions, tolerate distress without making things worse, and build a personalised mental health maintenance routine. Ideal for anyone who wants clinical-grade tools in a self-paced, accessible format.",
    body: paras(
      "CBT (Cognitive Behavioural Therapy) and DBT (Dialectical Behaviour Therapy) are two of the most rigorously researched therapeutic approaches in modern psychology. This course distils the most practical, immediately usable skills from both into one comprehensive self-paced toolkit.",
      "You'll learn how to identify cognitive distortions and use thought records to challenge them (CBT), how to regulate overwhelming emotions and tolerate distress without making things worse (DBT), and how to build interpersonal effectiveness skills that improve your relationships and communication.",
      "By the end, you'll have a full clinical toolkit — not a watered-down self-help version — that you can use for anxiety, low mood, overwhelm, or as a mental health maintenance system. Ideal for people who want to understand the 'why' behind the skills, not just the 'what'."
    ),
    highlights: [
      "CBT thought-record & reframing techniques",
      "DBT distress tolerance & emotion regulation",
      "Interpersonal effectiveness skills",
      "Relapse-prevention & maintenance plan",
      "Clinical-grade, self-paced",
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
    short:
      "The ideal starting point if you're new to working on your mental health. Combines the Anxiety Toolkit (12 lessons of evidence-based coping skills) with Mindfulness for Real Life (practical mindfulness for busy Indians). Two complementary courses that work brilliantly together — tackle your anxiety while building the daily mindfulness habits that keep it in check. Save 30% versus buying separately.",
    body: paras(
      "The ideal starting point if you're new to working on your mental health. This bundle pairs two beginner-friendly courses that complement each other perfectly.",
      "The Anxiety Toolkit (₹499) gives you 12 lessons of CBT-based coping skills for when anxiety hits. Mindfulness for Real Life (₹499) teaches you the daily habits that prevent anxiety from building in the first place. Together, they cover both crisis response and long-term prevention.",
      "Save 30% versus buying separately. Lifetime access to both courses."
    ),
    highlights: ["Anxiety Toolkit + Mindfulness for Real Life", "2 courses", "Save 30%", "Lifetime access"],
  },
  {
    title: "Self-Worth Bundle",
    price: "₹1,799",
    originalPrice: "₹2,298",
    priceUSD: "$25",
    topics: ["boundaries", "self-worth"],
    audience: ["individuals"],
    short:
      "Low self-worth and poor boundaries tend to go hand in hand — this bundle addresses both. Boundaries for Indians gives you the tools to protect your limits in family and social settings, while Self-Worth Rebuilding helps you understand and heal the deeper sense of not-enoughness that makes it hard to hold those limits in the first place. A powerful combination for anyone who gives too much and asks for too little. Save 22%.",
    body: paras(
      "Low self-worth and poor boundaries tend to go hand in hand. When you don't feel like you deserve to have your needs met, you don't enforce limits. When you don't enforce limits, your self-worth erodes further. This bundle breaks that cycle.",
      "Boundaries for Indians (₹799) gives you culturally-sensitive tools to set and communicate limits with family, in-laws, and society. Self-Worth Rebuilding (₹1,499) helps you heal the deeper belief that you're not enough — so that holding those limits feels possible, not terrifying.",
      "A powerful combination for anyone who gives too much, says yes when they mean no, and struggles to put themselves first. Save 22% versus buying separately."
    ),
    highlights: ["Boundaries for Indians + Self-Worth Rebuilding", "2 courses", "Save 22%", "Lifetime access"],
  },
  {
    title: "Relationships Bundle",
    price: "₹2,499",
    originalPrice: "₹3,498",
    priceUSD: "$35",
    topics: ["attachment", "relationships"],
    audience: ["individuals", "couples"],
    short:
      "Two of the most transformative courses in the library, bundled together. Attachment Styles helps you understand the relational patterns you bring to every connection, while Healing Toxic Relationships guides you through identifying harmful dynamics and recovering from them. Together, they give you both the insight into why your relationships look the way they do — and the tools to change them. Save 29%.",
    body: paras(
      "Two of the most transformative courses in the library, designed to be taken together.",
      "Attachment Styles (₹1,999) helps you understand the relational blueprint you carry from your earliest experiences — why you get anxious when a partner is distant, why you pull away when someone gets close, and how to move toward secure connection. Healing Toxic Relationships (₹1,499) helps you identify harmful patterns in your current or past relationships and do the real work of healing.",
      "Together, these courses give you both the self-understanding and the practical tools to build the kind of relationships you actually want. Suitable for individuals and couples. Save 29%."
    ),
    highlights: ["Attachment Styles + Healing Toxic Relationships", "2 courses", "Save 29%", "Suitable for couples", "Lifetime access"],
  },
  {
    title: "Emotional Skills Bundle",
    price: "₹2,199",
    originalPrice: "₹2,998",
    priceUSD: "$30",
    topics: ["emotional-regulation"],
    audience: ["individuals"],
    short:
      "If you've ever felt hijacked by your own emotions — or completely numb and disconnected from them — this bundle is for you. Emotional Regulation teaches you the DBT framework for understanding and managing intense feelings, while the CBT+DBT Toolkit gives you a broader clinical toolkit for anxiety, low mood, and overwhelm. Together, they form a comprehensive emotional intelligence curriculum grounded in evidence-based therapy. Save 27%.",
    body: paras(
      "If you've ever felt completely hijacked by your emotions — or conversely, numb and disconnected from them — this bundle addresses both sides of the spectrum.",
      "Emotional Regulation (₹999) teaches you the foundational DBT framework: how to understand where intense feelings come from, name them accurately, and use distress tolerance skills to ride out a crisis. The CBT+DBT Toolkit (₹1,999) builds on this with a comprehensive set of clinical skills for anxiety, low mood, and long-term emotional maintenance.",
      "Together, they form a complete emotional intelligence curriculum rooted in evidence-based therapy. This is the bundle to buy if emotional management is your primary goal. Save 27%."
    ),
    highlights: ["Emotional Regulation + CBT+DBT Toolkit", "2 courses", "Save 27%", "Full emotional skills curriculum", "Lifetime access"],
  },
  {
    title: "Indian Context Bundle",
    price: "₹1,999",
    originalPrice: "₹2,798",
    priceUSD: "$29",
    topics: ["boundaries", "parenting-family"],
    audience: ["families", "individuals"],
    short:
      "Both courses in this bundle are built specifically for the Indian experience — no adapting Western frameworks to our context. Boundaries for Indians tackles limit-setting within family and social structures, while Indian Family Dynamics digs into enmeshment, intergenerational patterns, and joint family roles. If your mental health challenges have a distinctly Indian flavour, this bundle speaks your language. Save 29%.",
    body: paras(
      "Both courses in this bundle are built from the ground up for the Indian experience — no adapting Western therapy frameworks to a context they weren't designed for.",
      "Boundaries for Indians (₹799) gives you culturally-grounded tools for setting limits with family, in-laws, and society — with scripts for real conversations. Indian Family Dynamics (₹1,999) unpacks the psychological patterns unique to Indian households: enmeshment, intergenerational trauma, joint family roles, and parental expectations.",
      "If your mental health challenges have a distinctly Indian flavour, this bundle speaks your language. Save 29% versus buying separately."
    ),
    highlights: ["Boundaries for Indians + Indian Family Dynamics", "2 courses", "Save 29%", "Built for Indian context", "Lifetime access"],
  },
  {
    title: "Complete Toolkit",
    price: "₹6,999",
    originalPrice: "₹11,887",
    priceUSD: "$99",
    topics: ["general-wellness"],
    audience: ["individuals"],
    featured: true,
    short:
      "Everything in the Ms Paul Therapies digital library in one bundle. All 10 self-paced courses covering anxiety, burnout, mindfulness, boundaries, emotional regulation, attachment, self-worth, Indian family dynamics, toxic relationships, and CBT+DBT skills. Built by an RCI-licensed clinical psychologist, rooted in Indian lived experience. Whether you're starting your mental health journey or going deeper, this is the most comprehensive self-help resource available. Lifetime access. Save 41%.",
    body: paras(
      "Everything in the Ms Paul Therapies digital library in a single bundle — all 10 self-paced courses, lifetime access, and a saving of 41% versus buying individually.",
      "The Complete Toolkit covers: Anxiety Toolkit · Mindfulness for Real Life · Burnout to Balance · Boundaries for Indians · Emotional Regulation · Attachment Styles · Self-Worth Rebuilding · Indian Family Dynamics · Healing Toxic Relationships · CBT+DBT Toolkit.",
      "Each course is built by Aishani Paul, an RCI-licensed clinical psychologist (License A118537), and rooted in the Indian lived experience. Whether you're beginning your mental health journey or going deep on a specific area, this is the most comprehensive self-help resource available at this price point. No subscription, no expiry — yours for life."
    ),
    highlights: ["All 10 courses included", "Save 41% (₹4,888 off)", "Best value in the library", "Built by RCI-licensed psychologist", "Lifetime access — no expiry"],
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
    short:
      "When anxiety hits, you don't have time to read a book. This compact 5-page kit gives you immediate, practical techniques to calm your nervous system right now — grounding exercises, breathing scripts, and a quick thought-interruption technique. Print it, save it to your phone, or keep it at your desk. Free, and yours to use anytime.",
    highlights: ["Immediate grounding techniques", "Breathing scripts", "Thought-interruption tool", "Printable · 5 pages · Free"],
  },
  {
    title: "Attachment Style Quiz",
    type: "quiz",
    format: "Interactive quiz",
    topics: ["attachment", "relationships"],
    audience: ["individuals", "couples"],
    short:
      "Not sure whether you're anxious, avoidant, secure, or disorganised in relationships? This 3-minute quiz helps you identify your attachment style and gives you a personalised result explaining what it means — how it shapes your connections, why you respond the way you do, and what to work on next. Free to take, and worth sharing with a partner.",
    highlights: ["Takes 3 minutes", "Personalised result with explanation", "All 4 styles covered", "Free"],
  },
  {
    title: "Burnout Assessment",
    type: "quiz",
    format: "Interactive quiz",
    topics: ["stress-burnout"],
    audience: ["individuals", "corporate"],
    short:
      "Tired all the time, but not sure if it's burnout or just life? This quick assessment maps where you fall on the burnout spectrum — from early warning signs to full depletion — and gives you a clear picture of which areas need the most attention first. Takes 3 minutes. Instant, honest result.",
    highlights: ["Takes 3 minutes", "Instant result", "Burnout spectrum mapping", "Free"],
    actionUrl: "/tools/burnout-quiz",
  },
  {
    title: "Boundary Checklist",
    type: "toolkit",
    format: "PDF · 3 pages",
    topics: ["boundaries"],
    audience: ["individuals", "families"],
    short:
      "A 3-page self-audit to identify exactly where your limits are being crossed — across family, workplace, relationships, and your relationship with yourself. Work through each section to spot the patterns, then use the reflection prompts to start thinking about what needs to change. Free, printable, and designed with Indian contexts in mind.",
    highlights: ["Self-audit across 4 life areas", "Reflection prompts included", "Indian context", "Printable · Free"],
  },
  {
    title: "Self-Worth Cards",
    type: "toolkit",
    format: "Printable PDF · 30 cards",
    topics: ["self-worth"],
    audience: ["individuals"],
    short:
      "30 printable affirmation and reflection cards designed to interrupt the inner critic and gently rebuild your sense of self. Each card pairs a compassion-based affirmation with a short reflection question — making them tools for actual inner work, not empty positivity. Print them, cut them out, and use one a day.",
    highlights: ["30 cards", "Affirmation + reflection on each", "Designed for real inner work", "Printable · Free"],
  },
  {
    title: "ROI of Employee Mental Health",
    type: "toolkit",
    format: "PDF (for employers)",
    topics: ["stress-burnout", "general-wellness"],
    audience: ["corporate"],
    short:
      "A free, data-backed guide for HR managers, team leads, and business owners on why investing in employee mental health isn't a nice-to-have — it's a business imperative. Covers the real cost of untreated mental health at work, the ROI of wellbeing programmes, and practical steps your organisation can take today. Share it with your leadership team.",
    highlights: ["Data-backed business case", "Cost & ROI analysis", "Practical action steps", "For HR & leaders · Free"],
  },
  {
    title: "30-Day Journaling Challenge",
    type: "mini-course",
    format: "PDF + email drip",
    topics: ["self-care", "general-wellness"],
    audience: ["individuals"],
    short:
      "A structured journaling challenge designed by a clinical psychologist — one prompt per day for 30 days, building self-awareness, emotional processing, and resilience over time. Each prompt is delivered to your inbox. No journaling experience needed, no right or wrong answers, no pressure. Just 10 minutes a day for a month.",
    highlights: ["30 psychologist-designed prompts", "Delivered daily to your inbox", "No experience needed", "Free"],
  },
  {
    title: "Sleep Hygiene Checklist",
    type: "toolkit",
    format: "PDF · 1 page",
    topics: ["sleep", "self-care"],
    audience: ["individuals"],
    short:
      "Poor sleep is both a symptom and a driver of anxiety, low mood, and burnout. This one-page checklist covers the evidence-based habits that genuinely improve sleep quality — structured around the science of sleep hygiene. Quick to read, easy to implement, and free to download. A small change that can make a bigger difference than you'd expect.",
    highlights: ["Evidence-based sleep habits", "1-page quick reference", "Printable · Free"],
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
    short:
      "Everything you wish someone had told you before your first therapy session — written honestly, without stigma, for the Indian context. What to expect, how to find the right therapist, what 'progress' actually looks like, and how to talk to your family about it. Coming soon.",
    highlights: ["What to expect from therapy", "How to choose a therapist", "Talking to family about it", "Coming soon"],
  },
  {
    title: "The Indian Parents' Survival Guide",
    type: "ebook",
    format: "eBook",
    topics: ["parenting-family"],
    audience: ["parents", "families"],
    short:
      "A practical guide to raising emotionally intelligent children in Indian households — balancing tradition with modern parenting psychology. Covers emotion coaching, the academic pressure trap, building healthy independence, and how to repair ruptures with your kids. Coming soon.",
    highlights: ["Emotion coaching tools", "Academic pressure", "Healthy independence", "Coming soon"],
  },
  {
    title: "5-Day Anxiety Reset",
    type: "mini-course",
    format: "5-day mini-course",
    topics: ["anxiety"],
    audience: ["individuals"],
    short:
      "A short, guided mini-course to interrupt the anxiety spiral over 5 focused days. Each day delivers one targeted lesson and one daily practice that builds on the last. Designed to fit into a busy schedule — under 15 minutes per day. Coming soon.",
    highlights: ["5 focused lessons", "Daily practice", "Under 15 min/day", "Coming soon"],
  },
  {
    title: "5-Day Self-Compassion Challenge",
    type: "mini-course",
    format: "5-day mini-course",
    topics: ["self-worth", "self-care"],
    audience: ["individuals"],
    short:
      "Five days of small, research-backed practices to help you treat yourself with the same kindness you'd offer a close friend. Designed for people who find self-compassion harder than self-criticism. Coming soon.",
    highlights: ["5 short lessons", "Research-backed practices", "Daily practice", "Coming soon"],
  },
  {
    title: "7-Day Mindfulness Basics",
    type: "mini-course",
    format: "7-day mini-course",
    topics: ["mindfulness"],
    audience: ["individuals"],
    short:
      "A gentle, low-pressure week-long introduction to mindfulness — structured for people who've tried and given up before. One lesson per day, one short practice, and a gradual build that actually sticks. Coming soon.",
    highlights: ["7 short lessons", "Beginner-friendly", "Daily practice", "Coming soon"],
  },
  {
    title: "21-Day Confidence Challenge",
    type: "mini-course",
    format: "21-day mini-course",
    topics: ["self-worth"],
    audience: ["individuals"],
    short:
      "Three weeks of daily micro-actions designed to build real, lasting confidence from the inside out — not through affirmations, but through evidence-based behaviour change. Includes a progress tracker and daily reflection. Coming soon.",
    highlights: ["21 daily micro-actions", "Behaviour-based (not just affirmations)", "Progress tracker", "Coming soon"],
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
      "Interactive, evidence-based mental health workshops for corporate teams — covering stress, burnout, boundaries, emotional resilience, and psychological safety at work. Delivered by an RCI-licensed clinical psychologist with corporate experience. Sessions are tailored to your organisation's specific needs and culture, not off-the-shelf content. Available as one-off workshops, half-day trainings, or quarterly retainer programmes. Enquire for a custom proposal.",
    body: paras(
      "Interactive, evidence-based mental health workshops for corporate teams — covering stress, burnout, boundary-setting, emotional resilience, and psychological safety in the workplace.",
      "Each workshop is designed and delivered by Aishani Paul, an RCI-licensed clinical psychologist with experience working with corporate clients across India. Sessions are tailored to your organisation's specific culture, industry, and needs — not generic content that could apply to any company.",
      "Available formats: 90-minute focused sessions, half-day trainings, and quarterly retainer programmes for ongoing culture change. All sessions include handouts, follow-up resources, and a post-session summary for managers. Suitable for teams of 10–50 people. Enquire for a custom proposal and pricing."
    ),
    highlights: [
      "Tailored to your team & culture",
      "Delivered by RCI-licensed psychologist",
      "Up to 50 employees per session",
      "Handouts + follow-up resources included",
      "90-min, half-day & retainer options",
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
    body: d.body ?? para(d.short),
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
