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
}

export const services: Service[] = [
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
      "Flexible scheduling - online sessions",
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
      "Integrative and client-centred - combining cognitive-behavioural, psychodynamic, and mindfulness-based techniques tailored to your unique needs.",
    fee: "₹1,500 per session",
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
  },
  {
    slug: "adolescent-therapy",
    title: "Adolescent Therapy",
    shortTitle: "Adolescent",
    description:
      "Supportive therapy for teenagers (ages 13-19) dealing with academic pressure, identity exploration, peer relationships, and emotional regulation.",
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
      "A warm, relatable therapeutic style that meets adolescents where they are - using creative, cognitive, and talk-based approaches.",
    fee: "₹1,500 per session",
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
      "Systemic family therapy - exploring relationships, roles, and patterns to create lasting positive change for the whole family unit.",
    fee: "₹3,500 - ₹5,000 per session",
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
    fee: "₹500 - ₹7,500 (varies by assessment)",
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
  },
];
