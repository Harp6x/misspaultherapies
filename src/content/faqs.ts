import type { FAQ } from "@/types";

export type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  // Getting started
  {
    question: "How do I book my first session?",
    answer:
      "You can book a free 15-minute discovery call or fill out the intake form on our Book page. Once received, I'll reach out to schedule your first session at a mutually convenient time.",
    category: "getting-started",
  },
  {
    question: "What happens in the first session?",
    answer:
      "The first session is an intake/assessment session where we get to know each other. I'll ask about your concerns, history, and goals for therapy. It's also a chance for you to ask questions and see if we're a good fit.",
    category: "getting-started",
  },
  {
    question: "Do I need a referral to start therapy?",
    answer:
      "No referral is needed. You can reach out directly through the website, WhatsApp, or email to get started.",
    category: "getting-started",
  },
  {
    question: "How do I know if therapy is right for me?",
    answer:
      "If you're experiencing emotional distress, relationship difficulties, or simply want to understand yourself better, therapy can help. The free discovery call is a great way to explore whether therapy is the right step for you.",
    category: "getting-started",
  },

  // General
  {
    question: "What types of therapy do you offer?",
    answer:
      "I offer individual therapy, couples therapy, adolescent therapy, family therapy, and psychological assessments. All sessions are conducted online, making them accessible across India and internationally.",
    category: "general",
  },
  {
    question: "What therapeutic approaches do you use?",
    answer:
      "I use an integrative approach, drawing from Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Emotionally Focused Therapy (EFT), psychodynamic therapy, and mindfulness-based techniques - tailored to each client's needs.",
    category: "general",
  },
  {
    question: "Do you only offer online sessions?",
    answer:
      "Yes, all sessions are conducted online via secure video conferencing. This allows me to serve clients across India and abroad while maintaining flexibility and accessibility.",
    category: "general",
  },
  {
    question: "What languages do you offer therapy in?",
    answer:
      "I offer therapy in English, Hindi, and Bengali. Sessions can be conducted in any of these languages or a mix, depending on your comfort.",
    category: "general",
  },
  {
    question: "Can you prescribe medication?",
    answer:
      "No, as a clinical psychologist I do not prescribe medication. If medication may be beneficial, I can refer you to a trusted psychiatrist and we can coordinate care together.",
    category: "general",
  },
  {
    question: "What is the difference between a psychologist and a psychiatrist?",
    answer:
      "A psychologist provides therapy (talk-based treatment) and psychological assessments. A psychiatrist is a medical doctor who can prescribe medication. Both work with mental health, but their approaches differ. I am a clinical psychologist.",
    category: "general",
  },

  // Sessions
  {
    question: "How long is each session?",
    answer:
      "Each session is approximately 50 minutes. Assessment sessions may be longer depending on the evaluation being conducted.",
    category: "sessions",
  },
  {
    question: "How often will I need to attend therapy?",
    answer:
      "Most clients start with weekly sessions. As you progress, we may move to fortnightly or monthly sessions. The frequency is always a collaborative decision based on your needs and goals.",
    category: "sessions",
  },
  {
    question: "How long does therapy typically last?",
    answer:
      "It varies by individual and concern. Some clients see meaningful change in 8-12 sessions, while others benefit from longer-term work. We'll regularly review progress and adjust as needed.",
    category: "sessions",
  },
  {
    question: "What platform do you use for online sessions?",
    answer:
      "I use secure, encrypted video conferencing platforms. You'll receive a link before each session - all you need is a stable internet connection and a private space.",
    category: "sessions",
  },
  {
    question: "Can I switch between individual and couples therapy?",
    answer:
      "This depends on the clinical situation. We can discuss this during our sessions to determine the best approach for your goals.",
    category: "sessions",
  },

  // Fees
  {
    question: "How much do sessions cost?",
    answer:
      "Individual and adolescent therapy: ₹1,500 per session. Couples therapy: ₹3,500 per session. Family therapy: ₹3,500-₹5,000 per session. Psychological assessments: ₹500-₹7,500 depending on the assessment. Package: ₹3,899 for 4 individual sessions. Please visit the Book page for full details.",
    category: "fees",
  },
  {
    question: "Do you offer a sliding scale or concessions?",
    answer:
      "Yes, I offer a sliding scale for students, unemployed individuals, homemakers, and others in financial need. Please reach out to discuss - I want to make sure cost is not a barrier to getting the support you deserve.",
    category: "fees",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations must be made at least 24 hours in advance. Late cancellations or no-shows may be charged the full session fee. Emergencies are handled on a case-by-case basis.",
    category: "fees",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "I do not bill insurance directly. However, I can provide a receipt/invoice that you may submit to your insurance provider for reimbursement, depending on your policy.",
    category: "fees",
  },

  // Confidentiality
  {
    question: "Is therapy confidential?",
    answer:
      "Yes, everything discussed in therapy is strictly confidential. There are limited legal exceptions - if there is an imminent risk of harm to yourself or others, or in cases of child abuse - which I will explain during our first session.",
    category: "confidentiality",
  },
  {
    question: "Will you share information with my family?",
    answer:
      "Not without your explicit written consent. In couples or family therapy, confidentiality agreements are established at the outset so everyone feels safe.",
    category: "confidentiality",
  },
  {
    question: "How do you store my records?",
    answer:
      "All client records are stored securely in compliance with professional ethical guidelines. Session notes are kept confidential and are only accessible to me.",
    category: "confidentiality",
  },
];

export const faqCategories = [
  { id: "all" as const, label: "All Questions" },
  { id: "getting-started" as const, label: "Getting Started" },
  { id: "general" as const, label: "General" },
  { id: "sessions" as const, label: "Sessions" },
  { id: "fees" as const, label: "Fees & Payment" },
  { id: "confidentiality" as const, label: "Confidentiality" },
];
