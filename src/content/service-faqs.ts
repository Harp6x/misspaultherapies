import type { FAQ } from "@/types";

export const serviceFaqs: Record<string, FAQ[]> = {
  "individual-therapy": [
    {
      question: "What happens during our first individual therapy session?",
      answer:
        "The initial session is an intake and collaborative assessment. We discuss the challenges that brought you to therapy, your personal background, relational history, and what you hope to achieve. We also explore which evidence-based approach (CBT, DBT, ACT, or psychodynamic) fits your personality and goals best.",
      category: "individual-therapy",
    },
    {
      question: "How many sessions will I need before I see progress?",
      answer:
        "While every person's journey is unique, most clients begin noticing meaningful emotional shifts, greater self-awareness, and improved coping mechanisms within 6 to 10 weekly sessions. We periodically review your progress together to adjust our pace and focus.",
      category: "individual-therapy",
    },
    {
      question: "Can therapy help if I'm not in crisis and just feel 'stuck' or anxious?",
      answer:
        "Yes, absolutely. You don't need a formal diagnosis or a life crisis to benefit from therapy. Many clients work on self-esteem, chronic worry, perfectionism, boundary-setting, career transitions, and emotional clarity before stress turns into severe depression or burnout.",
      category: "individual-therapy",
    },
    {
      question: "What is the difference between consulting an RCI Clinical Psychologist and a life coach?",
      answer:
        "As an RCI-licensed Clinical Psychologist with an M.Phil in Clinical Psychology, I have undergone intensive hospital-based clinical psychiatric training, diagnostics, and supervised psychotherapy. Life coaches and unlicensed counselors lack statutory clinical licensing and are not ethically or legally trained to handle mental health conditions.",
      category: "individual-therapy",
    },
    {
      question: "Is what I share in our sessions completely confidential?",
      answer:
        "Yes. Everything discussed in individual therapy is strictly confidential under clinical ethics guidelines. Your information and session notes are never shared with family members, employers, or third parties without your explicit written consent.",
      category: "individual-therapy",
    },
  ],

  "couples-therapy": [
    {
      question: "Can I start relationship therapy alone if my partner is hesitant or refuses to come?",
      answer:
        "Yes, absolutely. A significant number of relationship journeys start as individual therapy for relationship clarity. You can work with me one-on-one to untangle communication patterns, emotional triggers, and boundaries. If your partner later feels open to joining, we can transition to joint sessions—or continue focusing on your own emotional growth.",
      category: "couples-therapy",
    },
    {
      question: "Will the therapist take sides or tell us whether we should separate?",
      answer:
        "Never. A therapist's role is not to be a judge or referee, but to serve the health of the relationship and both individuals. I do not assign blame. My role is to help you both understand the underlying emotional cycles and unmet needs so you can decide your path forward with mutual respect.",
      category: "couples-therapy",
    },
    {
      question: "How does online couples therapy work if we are in different locations or busy?",
      answer:
        "Online sessions are highly flexible. You and your partner can join from the same room using one screen, or from two completely separate locations (ideal for long-distance relationships or different work schedules) via our secure, encrypted video link.",
      category: "couples-therapy",
    },
    {
      question: "What if our arguments keep repeating over and over without resolution?",
      answer:
        "Repetitive arguments almost always point to unaddressed emotional patterns (such as the pursue-withdraw dynamic) rather than the surface topic (money, chores, in-laws). We use Emotionally Focused Therapy (EFT) to identify the emotional distress underneath and practice constructive de-escalation tools.",
      category: "couples-therapy",
    },
    {
      question: "How long are couples sessions, and how much does it cost?",
      answer:
        "Couples therapy sessions are 50 minutes long and cost ₹3,500 per session. Sessions are typically held weekly or fortnightly depending on your scheduling needs.",
      category: "couples-therapy",
    },
  ],

  "adolescent-therapy": [
    {
      question: "How are parents involved in adolescent therapy sessions?",
      answer:
        "Therapy begins with an initial parent-teen consultation to understand family context. However, for therapy to be effective, teens need a safe, confidential space where they can be vulnerable without fear of judgment. While I keep parents informed of overarching themes and safety concerns, private session details remain confidential.",
      category: "adolescent-therapy",
    },
    {
      question: "How do you address academic pressure and exam anxiety in Indian students?",
      answer:
        "Academic stress, parental expectations, and fear of failure are pervasive among Indian teens. We use CBT and distress tolerance strategies to deconstruct perfectionism, manage panic during exams, establish healthy study-rest rhythms, and separate self-worth from grades.",
      category: "adolescent-therapy",
    },
    {
      question: "What if my teenager is reluctant or defensive about seeing a therapist?",
      answer:
        "It is very common for teens to feel defensive, often fearing therapy means they are 'broken' or that the therapist will side with parents. I use a warm, relatable, non-authoritarian style that meets adolescents where they are, giving them autonomy over their own therapeutic space.",
      category: "adolescent-therapy",
    },
    {
      question: "Can therapy help with teen social anxiety, self-esteem, and peer conflict?",
      answer:
        "Yes. Adolescence is a crucial phase of identity formation. We address social comparison, social media distress, bullying, peer pressure, emotional dysregulation, and body image concerns to help teens build lasting internal confidence.",
      category: "adolescent-therapy",
    },
  ],

  "family-therapy": [
    {
      question: "How does family therapy work when everyone has different perspectives and grievances?",
      answer:
        "Family therapy treats the family as an interconnected emotional system. Rather than blaming one individual, we explore communication breakdowns, unhelpful alliances, generational friction, and unresolved wounds. Every family member gets an equitable, mediated space to speak and be heard.",
      category: "family-therapy",
    },
    {
      question: "Can family therapy help with in-law friction and joint family boundaries?",
      answer:
        "Yes. Navigating joint family living, in-law expectations, and parental enmeshment is one of the most frequent reasons families seek therapy in India. We help establish 'connected boundaries'—protecting marital privacy and emotional autonomy while maintaining respect and connection across generations.",
      category: "family-therapy",
    },
    {
      question: "Who needs to attend the family therapy sessions?",
      answer:
        "Attendance depends on the specific dynamic being addressed. Sessions can include parents and adult children, siblings, or in-laws. We discuss who should be present during our initial intake and can adapt attendee groupings across sessions as needed.",
      category: "family-therapy",
    },
    {
      question: "What if one family member refuses to participate?",
      answer:
        "We can still make meaningful progress. Family systems theory shows that when even one or two family members change how they communicate, react, and hold boundaries, the entire family dynamic shifts.",
      category: "family-therapy",
    },
  ],

  "psychological-assessments": [
    {
      question: "What types of standardized psychological assessments do you conduct?",
      answer:
        "As an RCI-registered Clinical Psychologist, I am licensed to administer standardized psychometric assessments for Adult ADHD, Clinical Depression, Anxiety Disorders, Personality profiles, Cognitive Functioning, and diagnostic clarifications.",
      category: "psychological-assessments",
    },
    {
      question: "How does an online psychological assessment work?",
      answer:
        "The assessment process includes a detailed clinical intake interview, administration of standardized psychometric questionnaires and clinical rating scales via secure digital platforms, followed by an in-depth feedback session where we discuss findings and recommendations.",
      category: "psychological-assessments",
    },
    {
      question: "Will I receive an official psychological report?",
      answer:
        "Yes. Following the evaluation, you will receive a comprehensive, formal clinical report detailing assessment scores, clinical impressions, diagnostic formulations, and personalized recommendations for therapy or psychiatric care.",
      category: "psychological-assessments",
    },
    {
      question: "What is the fee for a psychological assessment?",
      answer:
        "Assessment fees range from ₹500 to ₹7,500 depending on the complexity, battery of tests administered, and whether a formal diagnostic report is required. Exact fees are discussed transparently upfront.",
      category: "psychological-assessments",
    },
  ],

  "nri-abroad": [
    {
      question: "How do you accommodate international time zones for NRIs?",
      answer:
        "A significant portion of my practice consists of NRIs and the Indian diaspora living in the US (EST/PST), UK (GMT), Canada, UAE (GST), Singapore, and Australia. Sessions are specifically scheduled across early mornings, evenings, and weekend slots to fit your local time zone seamlessly.",
      category: "nri-abroad",
    },
    {
      question: "Why choose an Indian clinical psychologist over a local therapist abroad?",
      answer:
        "Many NRIs report hitting cultural roadblocks with Western therapists when trying to explain arranged marriage matchmaking, joint family obligations, filial guilt, or immigration loneliness. Working with an RCI-licensed clinician from India eliminates the cultural explanation tax—I already understand the collectivist context and cultural nuances of your family system.",
      category: "nri-abroad",
    },
    {
      question: "How do payments work for clients outside India?",
      answer:
        "International payments can be made easily using major international credit/debit cards, Razorpay, or direct bank transfer. Fees are transparently quoted, with session receipts provided for international health spending accounts where applicable.",
      category: "nri-abroad",
    },
    {
      question: "Can NRIs book couples therapy if partners have different cultural backgrounds?",
      answer:
        "Yes. Cross-cultural marriages and intercultural partnerships often face unique communication styles, family pressures, and differing expectations around parenting and finances. We offer specialized guidance for intercultural couples navigating these dual realities.",
      category: "nri-abroad",
    },
  ],
};

export function getServiceFaqs(slug: string): FAQ[] {
  return serviceFaqs[slug] ?? [];
}
