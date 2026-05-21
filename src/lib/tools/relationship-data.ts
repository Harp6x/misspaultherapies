// ── Attachment Style Assessment ──

export interface AttachmentQuestion {
  id: string;
  text: string;
  options: { label: string; scores: Record<AttachmentStyle, number> }[];
}

export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "disorganized";

export const attachmentQuestions: AttachmentQuestion[] = [
  {
    id: "a1",
    text: "When someone you care about doesn't reply to your message for hours, you typically:",
    options: [
      { label: "Assume they're busy and carry on with your day", scores: { secure: 3, anxious: 0, avoidant: 1, disorganized: 0 } },
      { label: "Check your phone repeatedly and wonder what you did wrong", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Feel relieved to have some space", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 1 } },
      { label: "Swing between worrying and telling yourself you don't care", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a2",
    text: "In close relationships, you tend to feel:",
    options: [
      { label: "Comfortable with both closeness and independence", scores: { secure: 3, anxious: 0, avoidant: 0, disorganized: 0 } },
      { label: "Like you want more closeness than the other person", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Uncomfortable when things get too emotionally intense", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 1 } },
      { label: "Desperate for connection but terrified of it at the same time", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a3",
    text: "When a partner or close friend tries to comfort you when you're upset:",
    options: [
      { label: "You let them in and feel soothed by their presence", scores: { secure: 3, anxious: 1, avoidant: 0, disorganized: 0 } },
      { label: "You cling to them but still feel unsettled, needing constant reassurance", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "You pull away — you'd rather handle it alone", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 0 } },
      { label: "You sometimes want them close, sometimes push them away without knowing why", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a4",
    text: "After a disagreement with someone you love, you usually:",
    options: [
      { label: "Want to talk it through and resolve it together", scores: { secure: 3, anxious: 1, avoidant: 0, disorganized: 0 } },
      { label: "Replay the conversation endlessly and worry they'll leave", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Need significant time alone before you can engage", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 1 } },
      { label: "Feel confused — angry and wanting to reconnect at the same time", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a5",
    text: "When you think about being vulnerable with someone:",
    options: [
      { label: "It feels natural when trust has been built", scores: { secure: 3, anxious: 0, avoidant: 0, disorganized: 0 } },
      { label: "You open up quickly, sometimes too much too soon", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "It makes you uncomfortable — you prefer to keep things surface level", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 0 } },
      { label: "You want to but freeze up, or share and then regret it", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a6",
    text: "Your biggest relationship fear is:",
    options: [
      { label: "That's not something that dominates my thinking", scores: { secure: 3, anxious: 0, avoidant: 0, disorganized: 0 } },
      { label: "Being abandoned or not being enough", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Losing your independence or being trapped", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 1 } },
      { label: "Being hurt by someone you let in", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a7",
    text: "When a relationship ends, you typically:",
    options: [
      { label: "Grieve it, learn from it, and eventually move forward", scores: { secure: 3, anxious: 0, avoidant: 0, disorganized: 0 } },
      { label: "Obsess over what went wrong and struggle to let go", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Move on quickly — or at least appear to", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 1 } },
      { label: "Feel shattered but also relieved, and have trouble understanding your own reaction", scores: { secure: 0, anxious: 1, avoidant: 1, disorganized: 3 } },
    ],
  },
  {
    id: "a8",
    text: "In your childhood, when you were upset, your caregivers typically:",
    options: [
      { label: "Were emotionally available and helped you feel safe", scores: { secure: 3, anxious: 0, avoidant: 0, disorganized: 0 } },
      { label: "Were inconsistent — sometimes present, sometimes unavailable", scores: { secure: 0, anxious: 3, avoidant: 0, disorganized: 1 } },
      { label: "Expected you to handle it yourself or dismissed your feelings", scores: { secure: 0, anxious: 0, avoidant: 3, disorganized: 0 } },
      { label: "Were sometimes frightening or unpredictable themselves", scores: { secure: 0, anxious: 0, avoidant: 0, disorganized: 3 } },
    ],
  },
];

export interface AttachmentResult {
  primary: AttachmentStyle;
  scores: Record<AttachmentStyle, number>;
  label: string;
  headline: string;
  body: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
}

const attachmentResults: Record<AttachmentStyle, Omit<AttachmentResult, "primary" | "scores">> = {
  secure: {
    label: "Secure Attachment",
    headline: "You relate to others from a place of safety.",
    body: "Your responses suggest a secure attachment style. You're comfortable with emotional intimacy, can tolerate independence, and generally trust that relationships can withstand conflict. This doesn't mean you never struggle — it means your baseline is one of safety.",
    strengths: [
      "Comfortable with both closeness and autonomy",
      "Can communicate needs without excessive anxiety",
      "Able to repair after conflict",
      "Trust comes relatively naturally",
    ],
    challenges: [
      "May struggle to understand partners with insecure attachment",
      "Can sometimes minimise legitimate concerns",
      "May need to learn to hold space for others' anxiety without fixing it",
    ],
    tips: [
      "Your secure base is a gift — use it to hold space for others who struggle with closeness",
      "When a partner seems 'too needy' or 'too distant,' consider their attachment pattern before reacting",
      "Model the behaviour you want to see: consistent, calm, and emotionally available",
    ],
  },
  anxious: {
    label: "Anxious Attachment",
    headline: "You crave closeness — and worry it'll disappear.",
    body: "Your responses suggest an anxious (preoccupied) attachment style. You deeply value connection and are often highly attuned to your partner's emotions — sometimes more attuned to theirs than your own. The downside is a persistent worry about being enough, being loved, or being abandoned.",
    strengths: [
      "Deeply empathetic and emotionally intelligent",
      "Highly invested in relationships",
      "Willing to work on things when they go wrong",
      "Attuned to subtle emotional shifts in others",
    ],
    challenges: [
      "Reassurance-seeking can push people away",
      "Tendency to lose yourself in relationships",
      "Can interpret neutral signals as rejection",
      "Difficulty self-soothing when triggered",
    ],
    tips: [
      "Before texting again, pause and ask: 'Am I seeking connection or reassurance?'",
      "Build a self-regulation toolkit: journaling, grounding, movement",
      "Practice tolerating uncertainty — not every silence means something is wrong",
      "Therapy can help rewire the anxious patterns at their root",
    ],
  },
  avoidant: {
    label: "Avoidant Attachment",
    headline: "You protect yourself by keeping distance.",
    body: "Your responses suggest an avoidant (dismissive) attachment style. You value independence highly and tend to pull away when things feel emotionally intense. This isn't because you don't care — it's because closeness can feel unsafe based on early experiences where emotional needs were dismissed or unwelcome.",
    strengths: [
      "Self-reliant and emotionally resilient",
      "Can stay calm in high-pressure situations",
      "Strong sense of personal boundaries",
      "Won't lose yourself in a relationship",
    ],
    challenges: [
      "Partners often feel emotionally shut out",
      "Difficulty accessing and expressing vulnerable feelings",
      "May dismiss others' emotional needs as 'too much'",
      "Tendency to leave relationships before things get too real",
    ],
    tips: [
      "When you feel the urge to withdraw, name it: 'I'm pulling away because this feels intense'",
      "Practice small acts of vulnerability — sharing one feeling per day",
      "Your need for space is valid, but communicate it instead of disappearing",
      "Consider therapy to explore the roots of emotional distancing",
    ],
  },
  disorganized: {
    label: "Disorganised Attachment",
    headline: "You want closeness but it also terrifies you.",
    body: "Your responses suggest a disorganised (fearful-avoidant) attachment style. You deeply want connection but also associate it with pain or unpredictability. This creates an internal push-pull that can feel confusing and exhausting — craving someone's presence one moment and needing to escape the next.",
    strengths: [
      "Deeply self-aware once you understand this pattern",
      "Capable of profound emotional insight",
      "Often highly creative and introspective",
      "Strong desire for authentic connection",
    ],
    challenges: [
      "Relationships feel like an emotional rollercoaster",
      "Difficulty trusting even when someone is consistently safe",
      "May sabotage good relationships out of fear",
      "Intense emotional reactions that feel disproportionate",
    ],
    tips: [
      "This pattern usually stems from early experiences where caregivers were both a source of comfort and fear. It's not your fault.",
      "Therapy — especially trauma-informed approaches — can be transformative for this style",
      "Start noticing the push-pull: 'Right now I want to run. What am I afraid of?'",
      "Safe, consistent relationships (friends, partners, therapist) gradually rewire this pattern",
    ],
  },
};

export function calculateAttachment(answers: Record<string, number>): AttachmentResult {
  const totals: Record<AttachmentStyle, number> = { secure: 0, anxious: 0, avoidant: 0, disorganized: 0 };

  for (const q of attachmentQuestions) {
    const selectedIndex = answers[q.id];
    if (selectedIndex !== undefined && q.options[selectedIndex]) {
      const scores = q.options[selectedIndex].scores;
      totals.secure += scores.secure;
      totals.anxious += scores.anxious;
      totals.avoidant += scores.avoidant;
      totals.disorganized += scores.disorganized;
    }
  }

  const primary = (Object.entries(totals) as [AttachmentStyle, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  return {
    primary,
    scores: totals,
    ...attachmentResults[primary],
  };
}

// ── Relationship Needs Assessment ──

export interface NeedQuestion {
  id: string;
  text: string;
  need: RelationshipNeed;
}

export type RelationshipNeed = "safety" | "validation" | "autonomy" | "intimacy" | "respect" | "growth";

export const needQuestions: NeedQuestion[] = [
  { id: "n1", text: "I often feel like I have to walk on eggshells around the people I'm close to.", need: "safety" },
  { id: "n2", text: "I wish someone would tell me that my feelings are valid and make sense.", need: "validation" },
  { id: "n3", text: "I feel like I've lost parts of myself to please someone else.", need: "autonomy" },
  { id: "n4", text: "Physical and emotional closeness feels lacking in my relationships.", need: "intimacy" },
  { id: "n5", text: "I feel talked down to, dismissed, or not taken seriously.", need: "respect" },
  { id: "n6", text: "I feel stuck — like my relationships aren't growing or changing.", need: "growth" },
  { id: "n7", text: "I can't truly relax around the people closest to me.", need: "safety" },
  { id: "n8", text: "When I share how I feel, it gets minimised or ignored.", need: "validation" },
  { id: "n9", text: "I don't get enough time or space for myself.", need: "autonomy" },
  { id: "n10", text: "I feel emotionally distant from someone I want to feel close to.", need: "intimacy" },
  { id: "n11", text: "My opinions and decisions aren't valued or respected.", need: "respect" },
  { id: "n12", text: "We avoid difficult conversations instead of growing through them.", need: "growth" },
];

export const needAnswerOptions = [
  { label: "Strongly disagree", value: 0 },
  { label: "Disagree", value: 1 },
  { label: "Neutral", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly agree", value: 4 },
];

const needDescriptions: Record<RelationshipNeed, { label: string; emoji: string; description: string; tips: string[] }> = {
  safety: {
    label: "Emotional Safety",
    emoji: "🛡️",
    description: "You need to feel safe — physically and emotionally — to be yourself around the people you love. Right now, your nervous system is telling you it can't fully relax.",
    tips: [
      "Notice when your body tenses around someone — that's data",
      "You deserve relationships where honesty doesn't come with punishment",
      "If safety is consistently absent, that's a boundary issue — not a you problem",
    ],
  },
  validation: {
    label: "Validation & Being Heard",
    emoji: "👂",
    description: "You need to feel heard and understood — not fixed, not dismissed, not talked out of your feelings. When this need goes unmet, you may start doubting your own perception.",
    tips: [
      "Start with self-validation: 'My feelings make sense given what I've experienced'",
      "Tell people what you need: 'I don't need a solution — I need you to listen'",
      "If someone consistently invalidates you, consider whether that relationship serves you",
    ],
  },
  autonomy: {
    label: "Independence & Space",
    emoji: "🌿",
    description: "You need room to breathe — to have your own thoughts, hobbies, decisions, and identity outside of your relationships. Losing yourself in others leaves you depleted and resentful.",
    tips: [
      "Reclaim one activity that's just for you this week",
      "Practice saying: 'I need some time to myself — it's not about you'",
      "Healthy relationships make space for two whole people, not two halves",
    ],
  },
  intimacy: {
    label: "Closeness & Connection",
    emoji: "💞",
    description: "You're craving deeper connection — emotional, physical, or both. The distance you feel isn't just in your head. It's a real gap between where you are and where you want to be.",
    tips: [
      "Initiate one small moment of connection today: a hug, a question, eye contact",
      "Tell your person: 'I miss feeling close to you'",
      "Intimacy requires vulnerability — are you allowing yourself to be seen?",
    ],
  },
  respect: {
    label: "Respect & Equality",
    emoji: "⚖️",
    description: "You need to feel like an equal — that your voice, decisions, and boundaries carry weight. When respect is missing, resentment quietly builds until it explodes.",
    tips: [
      "Track moments when you feel dismissed — patterns reveal problems",
      "Practice assertive language: 'I disagree' instead of swallowing your opinion",
      "Respect isn't negotiable. If it's consistently absent, the relationship needs serious attention",
    ],
  },
  growth: {
    label: "Growth & Evolution",
    emoji: "🌱",
    description: "You need your relationships to grow — to face challenges, have honest conversations, and evolve together. Stagnation feels like slow suffocation.",
    tips: [
      "Bring up one thing you've been avoiding this week — gently but honestly",
      "Ask your person: 'How do you think we're doing? What could be better?'",
      "Growth requires discomfort. Avoiding it is comfortable but not sustainable",
    ],
  },
};

export interface NeedsResult {
  topNeeds: { need: RelationshipNeed; score: number; info: typeof needDescriptions[RelationshipNeed] }[];
  allScores: Record<RelationshipNeed, number>;
}

export function calculateNeeds(answers: Record<string, number>): NeedsResult {
  const totals: Record<RelationshipNeed, number> = { safety: 0, validation: 0, autonomy: 0, intimacy: 0, respect: 0, growth: 0 };

  for (const q of needQuestions) {
    totals[q.need] += answers[q.id] ?? 0;
  }

  const sorted = (Object.entries(totals) as [RelationshipNeed, number][])
    .sort((a, b) => b[1] - a[1]);

  return {
    topNeeds: sorted.slice(0, 3).map(([need, score]) => ({
      need,
      score,
      info: needDescriptions[need],
    })),
    allScores: totals,
  };
}

// ── Boundary Health Assessment ──

export interface BoundaryQuestion {
  id: string;
  text: string;
  category: BoundaryArea;
}

export type BoundaryArea = "emotional" | "time" | "physical" | "digital" | "conversational";

export const boundaryQuestions: BoundaryQuestion[] = [
  { id: "b1", text: "I say yes to things I want to say no to.", category: "emotional" },
  { id: "b2", text: "I take responsibility for other people's feelings.", category: "emotional" },
  { id: "b3", text: "Others regularly take up my time without asking.", category: "time" },
  { id: "b4", text: "I struggle to protect my personal time and energy.", category: "time" },
  { id: "b5", text: "My physical space or body isn't respected the way I'd like.", category: "physical" },
  { id: "b6", text: "I allow touches or closeness that make me uncomfortable.", category: "physical" },
  { id: "b7", text: "Someone checks my phone, messages, or social media without consent.", category: "digital" },
  { id: "b8", text: "I feel pressured to respond immediately to messages.", category: "digital" },
  { id: "b9", text: "People share my private information without asking.", category: "conversational" },
  { id: "b10", text: "I avoid saying what I really think to keep the peace.", category: "conversational" },
];

export const boundaryAnswerOptions = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "Always", value: 4 },
];

export type BoundaryTier = "healthy" | "soft" | "porous" | "critical";

export interface BoundaryResult {
  tier: BoundaryTier;
  total: number;
  areaScores: Record<BoundaryArea, number>;
  weakestAreas: { area: BoundaryArea; score: number; label: string }[];
  label: string;
  headline: string;
  body: string;
  tips: string[];
}

const boundaryAreaLabels: Record<BoundaryArea, string> = {
  emotional: "Emotional Boundaries",
  time: "Time & Energy Boundaries",
  physical: "Physical Boundaries",
  digital: "Digital Boundaries",
  conversational: "Conversational Boundaries",
};

const boundaryTierInfo: Record<BoundaryTier, { label: string; headline: string; body: string; tips: string[] }> = {
  healthy: {
    label: "Healthy Boundaries",
    headline: "Your boundaries are in good shape.",
    body: "You generally protect your energy, time, and emotional space. You can say no without excessive guilt, and you don't take on other people's emotions as your own. That doesn't mean it's always easy — but your default setting is one of self-respect.",
    tips: [
      "Keep checking in with yourself — boundaries need maintenance",
      "Help others learn to set boundaries by modelling yours",
      "Remember: boundaries aren't rigid walls. They can flex with context",
    ],
  },
  soft: {
    label: "Soft Boundaries",
    headline: "Your boundaries are there — but they bend easily.",
    body: "You know what you want and need, but you struggle to hold the line — especially with people you care about. Guilt, fear of conflict, or people-pleasing often overrides your instinct to protect yourself.",
    tips: [
      "Practice one small 'no' this week — start where the stakes are low",
      "Remind yourself: 'Saying no to this is saying yes to myself'",
      "Notice when guilt shows up after setting a boundary — guilt ≠ wrongdoing",
      "You don't need to justify every boundary. 'I can't' is a complete sentence",
    ],
  },
  porous: {
    label: "Porous Boundaries",
    headline: "Other people's needs are running your life.",
    body: "Your boundaries are significantly under-protected. You likely take on other people's emotions, over-commit, under-rest, and feel responsible for things that aren't yours to carry. This isn't generosity — it's a pattern that leaves you depleted and resentful.",
    tips: [
      "Start small: identify the ONE person or situation where your boundary is weakest",
      "Write down what you need but aren't getting — making it visible is step one",
      "Resentment is a boundary alarm. When you feel it, a limit has been crossed",
      "Therapy can help you understand why saying no feels so dangerous",
      "Your needs are not less important than everyone else's",
    ],
  },
  critical: {
    label: "Severely Compromised Boundaries",
    headline: "Your sense of self is being eroded.",
    body: "Your responses suggest a serious lack of boundaries across multiple areas of your life. This likely means you're carrying other people's problems, suppressing your own needs, and running on empty. This isn't something to push through — it's a signal that something fundamental needs to change.",
    tips: [
      "Please take this seriously. Chronic boundary erosion leads to burnout, depression, and relationship breakdown",
      "Talk to a therapist — boundary work is one of the most impactful things therapy can address",
      "Start with one non-negotiable: something you will protect no matter what, starting today",
      "You are allowed to put yourself first. That's not selfish — it's survival",
    ],
  },
};

export function calculateBoundaries(answers: Record<string, number>): BoundaryResult {
  const areaScores: Record<BoundaryArea, number> = { emotional: 0, time: 0, physical: 0, digital: 0, conversational: 0 };

  let total = 0;
  for (const q of boundaryQuestions) {
    const val = answers[q.id] ?? 0;
    areaScores[q.category] += val;
    total += val;
  }

  const tier: BoundaryTier =
    total <= 10 ? "healthy" : total <= 20 ? "soft" : total <= 30 ? "porous" : "critical";

  const weakestAreas = (Object.entries(areaScores) as [BoundaryArea, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([area, score]) => ({ area, score, label: boundaryAreaLabels[area] }));

  return {
    tier,
    total,
    areaScores,
    weakestAreas,
    ...boundaryTierInfo[tier],
  };
}

