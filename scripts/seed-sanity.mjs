/**
 * One-time seed script: pushes all existing static content to Sanity.
 *
 * Usage:
 *   1. Create a read+write API token in your Sanity dashboard
 *      → Manage → Settings → API → Tokens → Add API token (Editor)
 *   2. Run:
 *      SANITY_TOKEN=<your-token> node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";

const projectId = "k0r3y2my";
const dataset = "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "❌  Set SANITY_TOKEN env var first.\n" +
      "   → Create an Editor token at: https://www.sanity.io/manage/project/k0r3y2my/api#tokens\n" +
      "   Then run: SANITY_TOKEN=sk... node scripts/seed-sanity.mjs"
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

// ── Helpers ──
let opCount = 0;
async function createDoc(doc) {
  try {
    await client.createOrReplace(doc);
    opCount++;
    console.log(`  ✓ ${doc._type}: ${doc._id || doc.title || doc.question || doc.name}`);
  } catch (err) {
    console.error(`  ✗ ${doc._type}: ${err.message}`);
  }
}

// ── 1. Site Config (singleton) ──
console.log("\n📋 Seeding Site Config...");
await createDoc({
  _id: "siteConfig",
  _type: "siteConfig",
  name: "Ms Paul Therapies",
  tagline: "Compassionate Therapy for Meaningful Change",
  description:
    "Professional psychotherapy and counselling services by Aishani Paul. Offering individual, couples, adolescent, and family therapy — online across India and for NRIs abroad.",
  author: "Aishani Paul",
  handle: "mspaultherapies",
  email: "mspaultherapies@gmail.com",
  phone: "+91 91233 11295",
  whatsappNumber: "919123311295",
  whatsappMessage:
    "Hi, I'd like to enquire about therapy sessions with Ms Paul Therapies.",
  rciNumber: "A118537",
  qualifications: [
    "M.Phil in Clinical Psychology",
    "RCI Licensed Clinical Psychologist",
  ],
  languages: ["English", "Hindi", "Bengali"],
  instagram: "https://instagram.com/mspaultherapies",
  youtube: "https://youtube.com/@mspaultherapies",
  linkedin: "https://linkedin.com/in/mspaultherapies",
  googleFormUrl: "https://forms.gle/7jRaX8H9ftoG34726",
  upiId: "paulaishani@oksbi",
  feeIndividual: "₹1,500 per session",
  feeCouples: "₹3,500 per session",
  feeFamily: "₹3,500 – ₹5,000 per session",
  feeAssessment: "₹500 – ₹7,500 (varies by assessment)",
  feePackage: "₹3,899 for 4 individual sessions",
  slidingScale:
    "Sliding scale available for students, unemployed individuals, homemakers, and others in financial need. Please reach out to discuss.",
  sessionDuration: "45–50 minutes",
  cancellationPolicy:
    "Cancellations must be made at least 24 hours in advance. No-show fees are non-refundable if cancelled less than 24 hours before the session.",
});

// ── 1b. About Page (singleton) ──
console.log("\n📄 Seeding About Page...");
await createDoc({
  _id: "aboutPage",
  _type: "aboutPage",
  title: "About Aishani Paul",
  bioParagraph1:
    "I'm a licensed clinical psychologist with a deep commitment to making quality mental healthcare accessible, inclusive, and culturally attuned.",
  bioParagraph2:
    "With an M.Phil in Clinical Psychology and registration with the Rehabilitation Council of India (RCI No: A118537), I bring both academic rigour and heartfelt compassion to my practice.",
  bioParagraph3:
    "I work with individuals, couples, adolescents, and families — offering all sessions online so that geography is never a barrier to getting help. Whether you're in India or living abroad, my goal is to create a safe, non-judgmental space where real change can happen.",
  credentials: [
    { _key: "c1", icon: "Award", label: "M.Phil in Clinical Psychology" },
    { _key: "c2", icon: "Award", label: "RCI Licensed Clinical Psychologist" },
    { _key: "c3", icon: "Languages", label: "English, Hindi & Bengali" },
  ],
  approachIntro:
    "I use an integrative therapeutic approach, which means I don't follow a one-size-fits-all model. Instead, I draw from multiple evidence-based modalities to create a treatment plan that's uniquely suited to you.",
  values: [
    {
      _key: "v1",
      icon: "Heart",
      title: "Compassion First",
      description:
        "Every session is built on warmth, empathy, and genuine care. You deserve to feel safe and heard.",
    },
    {
      _key: "v2",
      icon: "BookOpen",
      title: "Evidence-Based",
      description:
        "I draw from proven therapeutic modalities — CBT, DBT, EFT, psychodynamic, and mindfulness — tailored to you.",
    },
    {
      _key: "v3",
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
    { _key: "s1", platform: "Instagram", url: "https://instagram.com/mspaultherapies", icon: "Camera" },
    { _key: "s2", platform: "YouTube", url: "https://youtube.com/@mspaultherapies", icon: "CirclePlay" },
    { _key: "s3", platform: "LinkedIn", url: "https://linkedin.com/in/mspaultherapies", icon: "Briefcase" },
  ],
});

// ── 2. Services ──
console.log("\n🩺 Seeding Services...");
const services = [
  {
    slug: "individual-therapy",
    title: "Individual Therapy",
    shortTitle: "Individual",
    description:
      "One-on-one therapy to help you navigate anxiety, depression, grief, trauma, self-esteem challenges, and life transitions. A safe, non-judgmental space to explore your thoughts and feelings.",
    icon: "User",
    highlights: [
      "Evidence-based approaches (CBT, DBT, psychodynamic)",
      "Personalised treatment plans",
      "Flexible scheduling — online sessions",
    ],
    idealFor: [
      "Anxiety & stress",
      "Depression & low mood",
      "Grief & loss",
      "Trauma & PTSD",
      "Self-esteem & identity",
      "Life transitions",
    ],
    approach:
      "Integrative and client-centred — combining cognitive-behavioural, psychodynamic, and mindfulness-based techniques tailored to your unique needs.",
    fee: "₹1,500 per session",
    order: 1,
  },
  {
    slug: "couples-therapy",
    title: "Couples Therapy",
    shortTitle: "Couples",
    description:
      "Strengthen your relationship through improved communication, conflict resolution, and deeper emotional connection. For married couples, partners, and those considering separation.",
    icon: "Heart",
    highlights: [
      "Emotionally Focused Therapy (EFT) informed",
      "Communication & conflict resolution skills",
      "Rebuilding trust & intimacy",
    ],
    idealFor: [
      "Communication breakdowns",
      "Trust issues & infidelity recovery",
      "Pre-marital counselling",
      "Intimacy concerns",
      "Considering separation",
    ],
    approach:
      "Drawing from Emotionally Focused Therapy and Gottman methods to help partners understand each other's emotional needs and build a more secure bond.",
    fee: "₹3,500 per session",
    order: 2,
  },
  {
    slug: "adolescent-therapy",
    title: "Adolescent Therapy",
    shortTitle: "Adolescent",
    description:
      "Supportive therapy for teenagers (ages 13–19) dealing with academic pressure, identity exploration, peer relationships, and emotional regulation.",
    icon: "GraduationCap",
    highlights: [
      "Age-appropriate, engaging therapeutic style",
      "Parent involvement as appropriate",
      "School & academic stress support",
    ],
    idealFor: [
      "Academic pressure & burnout",
      "Peer & social challenges",
      "Identity & self-discovery",
      "Anxiety & mood difficulties",
      "Family conflict",
    ],
    approach:
      "A warm, relatable therapeutic style that meets adolescents where they are — using creative, cognitive, and talk-based approaches.",
    fee: "₹1,500 per session",
    order: 3,
  },
  {
    slug: "family-therapy",
    title: "Family Therapy",
    shortTitle: "Family",
    description:
      "Improve family dynamics, resolve ongoing conflicts, and build healthier communication patterns. Ideal for families navigating transitions, loss, or relational strain.",
    icon: "Users",
    highlights: [
      "Systemic & structural family therapy approaches",
      "Multi-generational pattern exploration",
      "Conflict mediation & boundary setting",
    ],
    idealFor: [
      "Family conflict & communication issues",
      "Parenting challenges",
      "Blended family adjustment",
      "Grief within the family",
      "Supporting a family member's mental health",
    ],
    approach:
      "Systemic family therapy — exploring relationships, roles, and patterns to create lasting positive change for the whole family unit.",
    fee: "₹3,500 – ₹5,000 per session",
    order: 4,
  },
  {
    slug: "psychological-assessments",
    title: "Psychological Assessments",
    shortTitle: "Assessments",
    description:
      "Comprehensive psychological evaluations for diagnostic clarity, treatment planning, and personal insight. Includes cognitive, personality, and clinical assessments.",
    icon: "ClipboardCheck",
    highlights: [
      "Standardised, validated assessment tools",
      "Detailed written reports",
      "Follow-up consultation included",
    ],
    idealFor: [
      "Diagnostic clarity (ADHD, learning difficulties, etc.)",
      "Pre-therapy assessment",
      "Court or legal documentation",
      "Career & personality profiling",
    ],
    approach:
      "A thorough, multi-session evaluation process using internationally recognised psychometric tools, culminating in a detailed report and feedback session.",
    fee: "₹500 – ₹7,500 (varies by assessment)",
    order: 5,
  },
  {
    slug: "nri-abroad",
    title: "Therapy for NRIs & Indians Abroad",
    shortTitle: "NRI / Abroad",
    description:
      "Culturally sensitive online therapy for Non-Resident Indians and South Asians living abroad. Navigate the unique challenges of diaspora life, identity, and cross-cultural relationships.",
    icon: "Globe",
    highlights: [
      "Flexible scheduling across time zones",
      "Cultural context & bilingual sessions",
      "Expertise in diaspora-specific challenges",
    ],
    idealFor: [
      "Cultural identity & belonging",
      "Homesickness & adjustment",
      "Cross-cultural relationship issues",
      "Family pressure from back home",
      "Racism & discrimination",
    ],
    approach:
      "Culturally attuned therapy acknowledging the intersection of Indian identity, migration experiences, and the unique stressors of living abroad.",
    fee: "₹1,500 per session",
    order: 6,
  },
];

for (const [i, s] of services.entries()) {
  await createDoc({
    _id: `service-${s.slug}`,
    _type: "service",
    ...s,
    slug: { _type: "slug", current: s.slug },
  });
}

// ── 3. FAQs ──
console.log("\n❓ Seeding FAQs...");
const faqs = [
  { question: "How do I book my first session?", answer: "You can book a free 15-minute discovery call or fill out the intake form on our Book page. Once received, I'll reach out to schedule your first session at a mutually convenient time.", category: "getting-started", order: 1 },
  { question: "What happens in the first session?", answer: "The first session is an intake/assessment session where we get to know each other. I'll ask about your concerns, history, and goals for therapy. It's also a chance for you to ask questions and see if we're a good fit.", category: "getting-started", order: 2 },
  { question: "Do I need a referral to start therapy?", answer: "No referral is needed. You can reach out directly through the website, WhatsApp, or email to get started.", category: "getting-started", order: 3 },
  { question: "How do I know if therapy is right for me?", answer: "If you're experiencing emotional distress, relationship difficulties, or simply want to understand yourself better, therapy can help. The free discovery call is a great way to explore whether therapy is the right step for you.", category: "getting-started", order: 4 },
  { question: "What types of therapy do you offer?", answer: "I offer individual therapy, couples therapy, adolescent therapy, family therapy, and psychological assessments. All sessions are conducted online, making them accessible across India and internationally.", category: "general", order: 1 },
  { question: "What therapeutic approaches do you use?", answer: "I use an integrative approach, drawing from Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Emotionally Focused Therapy (EFT), psychodynamic therapy, and mindfulness-based techniques — tailored to each client's needs.", category: "general", order: 2 },
  { question: "Do you only offer online sessions?", answer: "Yes, all sessions are conducted online via secure video conferencing. This allows me to serve clients across India and abroad while maintaining flexibility and accessibility.", category: "general", order: 3 },
  { question: "What languages do you offer therapy in?", answer: "I offer therapy in English, Hindi, and Bengali. Sessions can be conducted in any of these languages or a mix, depending on your comfort.", category: "general", order: 4 },
  { question: "Can you prescribe medication?", answer: "No, as a clinical psychologist I do not prescribe medication. If medication may be beneficial, I can refer you to a trusted psychiatrist and we can coordinate care together.", category: "general", order: 5 },
  { question: "What is the difference between a psychologist and a psychiatrist?", answer: "A psychologist provides therapy (talk-based treatment) and psychological assessments. A psychiatrist is a medical doctor who can prescribe medication. Both work with mental health, but their approaches differ. I am a clinical psychologist.", category: "general", order: 6 },
  { question: "How long is each session?", answer: "Each session is approximately 50 minutes. Assessment sessions may be longer depending on the evaluation being conducted.", category: "sessions", order: 1 },
  { question: "How often will I need to attend therapy?", answer: "Most clients start with weekly sessions. As you progress, we may move to fortnightly or monthly sessions. The frequency is always a collaborative decision based on your needs and goals.", category: "sessions", order: 2 },
  { question: "How long does therapy typically last?", answer: "It varies by individual and concern. Some clients see meaningful change in 8–12 sessions, while others benefit from longer-term work. We'll regularly review progress and adjust as needed.", category: "sessions", order: 3 },
  { question: "What platform do you use for online sessions?", answer: "I use secure, encrypted video conferencing platforms. You'll receive a link before each session — all you need is a stable internet connection and a private space.", category: "sessions", order: 4 },
  { question: "Can I switch between individual and couples therapy?", answer: "This depends on the clinical situation. We can discuss this during our sessions to determine the best approach for your goals.", category: "sessions", order: 5 },
  { question: "How much do sessions cost?", answer: "Individual and adolescent therapy: ₹1,500 per session. Couples therapy: ₹3,500 per session. Family therapy: ₹3,500–₹5,000 per session. Psychological assessments: ₹500–₹7,500 depending on the assessment. Package: ₹3,899 for 4 individual sessions. Please visit the Book page for full details.", category: "fees", order: 1 },
  { question: "Do you offer a sliding scale or concessions?", answer: "Yes, I offer a sliding scale for students, unemployed individuals, homemakers, and others in financial need. Please reach out to discuss — I want to make sure cost is not a barrier to getting the support you deserve.", category: "fees", order: 2 },
  { question: "What is your cancellation policy?", answer: "Cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may be charged the full session fee. Emergencies are handled on a case-by-case basis.", category: "fees", order: 3 },
  { question: "Do you accept insurance?", answer: "I do not bill insurance directly. However, I can provide a receipt/invoice that you may submit to your insurance provider for reimbursement, depending on your policy.", category: "fees", order: 4 },
  { question: "Is therapy confidential?", answer: "Yes, everything discussed in therapy is strictly confidential. There are limited legal exceptions — if there is an imminent risk of harm to yourself or others, or in cases of child abuse — which I will explain during our first session.", category: "confidentiality", order: 1 },
  { question: "Will you share information with my family?", answer: "Not without your explicit written consent. In couples or family therapy, confidentiality agreements are established at the outset so everyone feels safe.", category: "confidentiality", order: 2 },
  { question: "How do you store my records?", answer: "All client records are stored securely in compliance with professional ethical guidelines. Session notes are kept confidential and are only accessible to me.", category: "confidentiality", order: 3 },
];

for (const [i, f] of faqs.entries()) {
  await createDoc({
    _id: `faq-${f.category}-${f.order}`,
    _type: "faq",
    ...f,
  });
}

// ── 4. Testimonials ──
console.log("\n💬 Seeding Testimonials...");
const testimonials = [
  {
    quote: "Therapy with Aishani helped me understand myself in ways I never thought possible. I finally feel like I have the tools to handle life's challenges.",
    name: "Client A",
    context: "Individual therapy — placeholder, shared with consent",
    approved: true,
    order: 1,
  },
  {
    quote: "We were on the verge of giving up on our relationship. The sessions gave us a new way to communicate and truly hear each other.",
    name: "Client B",
    context: "Couples therapy — placeholder, shared with consent",
    approved: true,
    order: 2,
  },
  {
    quote: "As an NRI, finding a therapist who understood my cultural background was a game changer. I felt seen and understood from the very first session.",
    name: "Client C",
    context: "NRI therapy — placeholder, shared with consent",
    approved: true,
    order: 3,
  },
];

for (const [i, t] of testimonials.entries()) {
  await createDoc({
    _id: `testimonial-${i + 1}`,
    _type: "testimonial",
    ...t,
  });
}

// ── 5. Locations ──
console.log("\n📍 Seeding Locations...");
const locations = [
  { slug: "india", name: "India", title: "Online Therapy in India", description: "Professional online therapy accessible across India", metaDescription: "Online therapy and counselling services across India by Aishani Paul — a licensed clinical psychologist offering individual, couples, and family therapy via secure video sessions.", features: ["Accessible from any city or town in India", "Secure video conferencing", "Flexible scheduling across time zones"], services: ["individual-therapy", "couples-therapy", "adolescent-therapy", "family-therapy", "psychological-assessments"] },
  { slug: "kolkata", name: "Kolkata", title: "Online Therapy for Kolkata", description: "Online psychotherapy and counselling for Kolkata residents", metaDescription: "Online therapy and counselling for Kolkata residents by Aishani Paul — licensed clinical psychologist. Individual, couples, and family therapy in English, Hindi, and Bengali.", features: ["Bengali-speaking therapist", "Sessions in Bengali, Hindi, or English", "No commute needed"], services: ["individual-therapy", "couples-therapy", "adolescent-therapy", "family-therapy"] },
  { slug: "west-bengal", name: "West Bengal", title: "Online Therapy in West Bengal", description: "Online psychotherapy accessible across West Bengal", metaDescription: "Online therapy for West Bengal residents — licensed clinical psychologist offering culturally sensitive counselling in Bengali, Hindi, and English.", features: ["Culturally attuned therapy", "Bengali-speaking therapist", "Accessible across all districts"], services: ["individual-therapy", "couples-therapy", "family-therapy"] },
  { slug: "delhi", name: "Delhi", title: "Online Therapy for Delhi NCR", description: "Online psychotherapy and counselling for Delhi NCR", metaDescription: "Online therapy for Delhi NCR residents by Aishani Paul — licensed clinical psychologist. Convenient, private sessions for anxiety, depression, relationships, and more.", features: ["Skip the traffic — therapy from home", "Covers Delhi, Gurgaon, Noida, NCR", "Flexible scheduling"], services: ["individual-therapy", "couples-therapy", "adolescent-therapy", "family-therapy"] },
  { slug: "mumbai", name: "Mumbai", title: "Online Therapy for Mumbai", description: "Online psychotherapy and counselling for Mumbai residents", metaDescription: "Online therapy for Mumbai residents — licensed clinical psychologist offering confidential sessions for anxiety, depression, couples issues, and more.", features: ["No commute — connect from anywhere in Mumbai", "Confidential video sessions", "Evening and weekend slots available"], services: ["individual-therapy", "couples-therapy", "adolescent-therapy", "family-therapy"] },
  { slug: "bangalore", name: "Bangalore", title: "Online Therapy for Bangalore", description: "Online psychotherapy and counselling for Bangalore residents", metaDescription: "Online therapy for Bangalore residents by Aishani Paul — licensed clinical psychologist. Professional support for tech professionals, students, couples, and families.", features: ["Support for tech burnout and work-life balance", "Convenient online sessions", "Flexible scheduling for professionals"], services: ["individual-therapy", "couples-therapy", "adolescent-therapy", "family-therapy"] },
];

for (const loc of locations) {
  await createDoc({
    _id: `location-${loc.slug}`,
    _type: "location",
    ...loc,
    slug: { _type: "slug", current: loc.slug },
  });
}

// ── 6. Resources ──
console.log("\n📚 Seeding Resources...");
const resources = [
  { title: "How to Prepare for Your First Session", tag: "Guide", icon: "CheckSquare", order: 1 },
  { title: "Therapy Goal-Setting Worksheet", tag: "Worksheet", icon: "FileText", order: 2 },
  { title: "Recommended Reading List", tag: "Reading List", icon: "BookOpen", order: 3 },
  { title: "Self-Care Audit Checklist", tag: "Checklist", icon: "CheckSquare", order: 4 },
  { title: "When to Seek Help — A Quick Guide", tag: "Guide", icon: "FileText", order: 5 },
  { title: "Understanding Therapy Modalities", tag: "Guide", icon: "BookOpen", order: 6 },
];

for (const [i, r] of resources.entries()) {
  // Resources with Portable Text body will need to be edited in the Studio
  // Seeding with title/tag/icon only; content is added via Studio's rich text editor
  await createDoc({
    _id: `resource-${i + 1}`,
    _type: "resource",
    ...r,
  });
}

// ── 7. Blog Posts ──
console.log("\n📝 Seeding Blog Posts...");

function htmlToBlocks(html) {
  // Simple HTML-to-Portable-Text converter for seeding
  const blocks = [];
  const lines = html.trim().split("\n");
  let currentList = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Headings
    const h2Match = trimmed.match(/^<h2>(.*?)<\/h2>$/);
    if (h2Match) {
      if (currentList) { blocks.push(currentList); currentList = null; }
      blocks.push({
        _type: "block", _key: `b${blocks.length}`,
        style: "h2",
        children: [{ _type: "span", _key: "s0", text: h2Match[1].replace(/<[^>]+>/g, ""), marks: [] }],
        markDefs: [],
      });
      continue;
    }
    const h3Match = trimmed.match(/^<h3>(.*?)<\/h3>$/);
    if (h3Match) {
      if (currentList) { blocks.push(currentList); currentList = null; }
      blocks.push({
        _type: "block", _key: `b${blocks.length}`,
        style: "h3",
        children: [{ _type: "span", _key: "s0", text: h3Match[1].replace(/<[^>]+>/g, ""), marks: [] }],
        markDefs: [],
      });
      continue;
    }

    // Blockquote
    const bqMatch = trimmed.match(/^<blockquote>(.*?)<\/blockquote>$/);
    if (bqMatch) {
      if (currentList) { blocks.push(currentList); currentList = null; }
      blocks.push({
        _type: "block", _key: `b${blocks.length}`,
        style: "blockquote",
        children: [{ _type: "span", _key: "s0", text: bqMatch[1].replace(/<[^>]+>/g, ""), marks: [] }],
        markDefs: [],
      });
      continue;
    }

    // List items
    const liMatch = trimmed.match(/^<li>(.*?)<\/li>$/);
    if (liMatch) {
      const text = liMatch[1].replace(/<strong>(.*?)<\/strong>/g, "$1").replace(/<em>(.*?)<\/em>/g, "$1").replace(/<[^>]+>/g, "");
      blocks.push({
        _type: "block", _key: `b${blocks.length}`,
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", _key: "s0", text, marks: [] }],
        markDefs: [],
      });
      continue;
    }

    // Skip list wrappers
    if (trimmed === "<ul>" || trimmed === "</ul>" || trimmed === "<ol>" || trimmed === "</ol>") continue;

    // Paragraphs
    const pMatch = trimmed.match(/^<p>(.*?)<\/p>$/s);
    if (pMatch) {
      if (currentList) { blocks.push(currentList); currentList = null; }
      const text = pMatch[1].replace(/<strong>(.*?)<\/strong>/g, "$1").replace(/<em>(.*?)<\/em>/g, "$1").replace(/<a [^>]+>(.*?)<\/a>/g, "$1").replace(/<[^>]+>/g, "");
      blocks.push({
        _type: "block", _key: `b${blocks.length}`,
        style: "normal",
        children: [{ _type: "span", _key: "s0", text, marks: [] }],
        markDefs: [],
      });
      continue;
    }
  }
  if (currentList) blocks.push(currentList);
  return blocks;
}

const blogPosts = [
  {
    slug: "what-to-expect-in-your-first-therapy-session",
    title: "What to Expect in Your First Therapy Session",
    description: "Feeling nervous about starting therapy? Here's a clear, reassuring guide to what happens in your first session and how to prepare.",
    category: "Therapy Basics",
    publishedAt: "2025-01-15",
    readingTime: "5 min read",
    published: true,
  },
  {
    slug: "understanding-anxiety-signs-and-coping-strategies",
    title: "Understanding Anxiety: Signs & Coping Strategies",
    description: "Learn to recognise anxiety symptoms and discover practical, evidence-based strategies to manage anxious thoughts and feelings.",
    category: "Mental Health",
    publishedAt: "2025-01-22",
    readingTime: "7 min read",
    published: true,
  },
  {
    slug: "how-to-communicate-better-in-your-relationship",
    title: "How to Communicate Better in Your Relationship",
    description: "Communication is the foundation of healthy relationships. Explore simple but powerful techniques to improve how you and your partner connect.",
    category: "Relationships",
    publishedAt: "2025-02-01",
    readingTime: "6 min read",
    published: true,
  },
  {
    slug: "breaking-the-stigma-mental-health-in-indian-culture",
    title: "Breaking the Stigma: Mental Health in Indian Culture",
    description: "Exploring the cultural barriers to seeking mental health support in India and why it's okay — and important — to ask for help.",
    category: "Cultural Perspectives",
    publishedAt: "2025-02-10",
    readingTime: "8 min read",
    published: true,
  },
  {
    slug: "self-care-is-not-selfish-building-a-sustainable-routine",
    title: "Self-Care Is Not Selfish: Building a Sustainable Routine",
    description: "Move beyond bubble baths and face masks. Learn what genuine self-care looks like and how to build a routine that actually works.",
    category: "Self-Care",
    publishedAt: "2025-02-20",
    readingTime: "5 min read",
    published: true,
  },
  {
    slug: "when-should-you-consider-couples-therapy",
    title: "When Should You Consider Couples Therapy?",
    description: "Couples therapy isn't just for crises. Here are the signs that you and your partner could benefit from professional support.",
    category: "Relationships",
    publishedAt: "2025-03-01",
    readingTime: "6 min read",
    published: true,
  },
  {
    slug: "managing-academic-pressure-a-guide-for-teenagers",
    title: "Managing Academic Pressure: A Guide for Teenagers",
    description: "Academic stress is real. Practical tips for teens (and their parents) to manage expectations, build resilience, and protect mental health.",
    category: "Mental Health",
    publishedAt: "2025-03-10",
    readingTime: "6 min read",
    published: true,
  },
  {
    slug: "therapy-for-nris-why-cultural-context-matters",
    title: "Therapy for NRIs: Why Cultural Context Matters",
    description: "Living abroad as an Indian comes with unique challenges. Here's why finding a culturally sensitive therapist can make all the difference.",
    category: "Cultural Perspectives",
    publishedAt: "2025-03-20",
    readingTime: "7 min read",
    published: true,
  },
  {
    slug: "the-difference-between-sadness-and-depression",
    title: "The Difference Between Sadness and Depression",
    description: "Everyone feels sad sometimes, but when does sadness become something more? Understanding the line between normal emotion and clinical depression.",
    category: "Mental Health",
    publishedAt: "2025-04-01",
    readingTime: "5 min read",
    published: true,
  },
  {
    slug: "how-to-support-a-loved-one-going-through-therapy",
    title: "How to Support a Loved One Going Through Therapy",
    description: "When someone you care about is in therapy, your support matters more than you think. Here's how to help without overstepping.",
    category: "Therapy Basics",
    publishedAt: "2025-04-10",
    readingTime: "5 min read",
    published: true,
  },
];

for (const post of blogPosts) {
  await createDoc({
    _id: `blog-${post.slug}`,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    description: post.description,
    category: post.category,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    published: post.published,
  });
}

console.log(`\n✅ Done! Seeded ${opCount} documents into Sanity (${projectId}/${dataset}).`);
console.log("→ Open the Studio at https://mspaultherapies.vercel.app/studio to review and edit content.");
console.log("→ Blog post bodies can be enriched in the Studio using the rich text editor.\n");
