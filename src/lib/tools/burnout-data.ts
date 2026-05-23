export interface BurnoutQuestion {
  id: string;
  text: string;
  subscale: "exhaustion" | "cynicism" | "efficacy";
}

export const burnoutQuestions: BurnoutQuestion[] = [
  // Exhaustion (4 questions)
  { id: "e1", text: "I feel emotionally drained by my work.", subscale: "exhaustion" },
  { id: "e2", text: "I feel used up at the end of the day.", subscale: "exhaustion" },
  { id: "e3", text: "I feel fatigued when I get up in the morning and have to face another day.", subscale: "exhaustion" },
  { id: "e4", text: "Working all day is really a strain for me.", subscale: "exhaustion" },

  // Cynicism (4 questions)
  { id: "c1", text: "I have become less interested in my work.", subscale: "cynicism" },
  { id: "c2", text: "I have become less enthusiastic about my work.", subscale: "cynicism" },
  { id: "c3", text: "I doubt the significance of what I do.", subscale: "cynicism" },
  { id: "c4", text: "I've become more cynical about whether my work contributes anything.", subscale: "cynicism" },

  // Reduced efficacy (4 questions - reverse scored)
  { id: "f1", text: "I feel confident that I am effective at getting things done.", subscale: "efficacy" },
  { id: "f2", text: "I feel I am making an effective contribution.", subscale: "efficacy" },
  { id: "f3", text: "I feel good about accomplishing tasks at work.", subscale: "efficacy" },
  { id: "f4", text: "At my work, I feel I am good at what I do.", subscale: "efficacy" },
];

export const answerOptions = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "Always", value: 4 },
];

export interface BurnoutScores {
  exhaustion: number;
  cynicism: number;
  efficacy: number;
  total: number;
}

export type BurnoutTier = "low" | "moderate" | "high" | "critical";

export function calculateScores(answers: Record<string, number>): BurnoutScores {
  let exhaustion = 0;
  let cynicism = 0;
  let efficacy = 0;

  for (const q of burnoutQuestions) {
    const val = answers[q.id] ?? 0;
    if (q.subscale === "exhaustion") exhaustion += val;
    else if (q.subscale === "cynicism") cynicism += val;
    else if (q.subscale === "efficacy") efficacy += 4 - val; // reverse score
  }

  return {
    exhaustion,
    cynicism,
    efficacy,
    total: exhaustion + cynicism + efficacy,
  };
}

export function getTier(scores: BurnoutScores): BurnoutTier {
  const { total } = scores;
  if (total <= 12) return "low";
  if (total <= 24) return "moderate";
  if (total <= 36) return "high";
  return "critical";
}

export interface TierInfo {
  label: string;
  color: string;
  bgColor: string;
  headline: string;
  body: string;
  suggestions: string[];
}

export const tierInfo: Record<BurnoutTier, TierInfo> = {
  low: {
    label: "Low Risk",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    headline: "You're managing well right now.",
    body: "Your energy, motivation, and sense of effectiveness are in a healthy range. That doesn't mean you're immune - burnout can creep in gradually. The fact that you're checking in shows good self-awareness.",
    suggestions: [
      "Maintain your current boundaries and rest patterns",
      "Schedule proactive recovery time (don't wait until you're depleted)",
      "Check in with yourself monthly using this tool",
      "Notice early warning signs: sleep changes, irritability, dread on Sunday evenings",
    ],
  },
  moderate: {
    label: "Moderate Risk",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    headline: "You're showing early signs of burnout.",
    body: "This is the stage where most people ignore the signals. You might tell yourself 'it's just a busy week' or 'everyone feels like this.' But your scores suggest your capacity is starting to strain. This is the best time to intervene - before it gets worse.",
    suggestions: [
      "Audit your week: What are the top 3 energy drains? Can any be reduced or delegated?",
      "Protect one non-negotiable recovery activity this week (walk, hobby, sleep)",
      "Start saying no to one low-priority request this week",
      "Talk to someone - a friend, partner, or therapist - about how you're feeling",
      "Consider whether your workload is sustainable long-term",
    ],
  },
  high: {
    label: "High Risk",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    headline: "Burnout is significantly affecting you.",
    body: "This isn't 'just stress.' Your emotional exhaustion is high, your motivation is dropping, and you may be questioning whether what you do even matters. These are hallmark signs of burnout - and they deserve serious attention, not another productivity hack.",
    suggestions: [
      "This is not something to push through. Consider talking to a therapist",
      "Have an honest conversation with your manager or someone you trust about your workload",
      "Cancel or postpone everything non-essential this week",
      "Prioritise sleep above all else - it's the foundation of recovery",
      "Take a mental health day if possible. Not to 'catch up' - to truly rest",
      "Book a free discovery call to explore support options",
    ],
  },
  critical: {
    label: "Critical",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
    headline: "You may be in burnout right now.",
    body: "Your scores are in the critical range across multiple dimensions. You're likely running on fumes - emotionally exhausted, disconnected from your work, and doubting your own abilities. This is your body and mind telling you that something needs to change. Not eventually. Now.",
    suggestions: [
      "Please take this seriously. Burnout at this level can lead to depression, anxiety disorders, and physical health problems",
      "Talk to a mental health professional as soon as possible",
      "If possible, take extended time off - even a few days can begin the reset",
      "Tell someone you trust how you're really doing",
      "Stop optimising. Start resting. You've earned it",
      "Book a free discovery call - you don't have to do this alone",
    ],
  },
};

export function getSubscaleLabel(score: number, max: number): string {
  const pct = score / max;
  if (pct <= 0.25) return "Low";
  if (pct <= 0.5) return "Moderate";
  if (pct <= 0.75) return "High";
  return "Very High";
}
