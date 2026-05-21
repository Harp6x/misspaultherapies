export interface AwarenessDay {
  day: number;
  theme: string;
  emoji: string;
  title: string;
  intro: string;
  prompts: string[];
  reflection: string;
}

export const journeyDays: AwarenessDay[] = [
  {
    day: 1,
    theme: "Identity",
    emoji: "🪞",
    title: "Who Am I — Really?",
    intro: "Today we start at the most fundamental question. Not who you were told to be, or who you perform as — but who you actually are when no one is watching.",
    prompts: [
      "Describe yourself in 5 words. Now cross out the ones other people taught you.",
      "What parts of yourself do you hide from the world? Why?",
      "If you woke up tomorrow with no obligations, roles, or expectations — who would you choose to be?",
    ],
    reflection: "Identity isn't fixed. It's a living, breathing thing that changes as you grow. The parts you hide often hold the most truth. Today, you met yourself a little more honestly.",
  },
  {
    day: 2,
    theme: "Values",
    emoji: "🧭",
    title: "What Actually Matters to Me?",
    intro: "Values aren't what you think you should care about. They're what you actually feel pulled toward — even when it's inconvenient.",
    prompts: [
      "When do you feel most alive and aligned? What are you doing? Who are you with?",
      "What makes you angry about the world? (Anger often points to values being violated.)",
      "If you had to give up everything except three things in your life — what would you keep?",
    ],
    reflection: "Your values aren't aspirational — they're already showing up in your choices, your frustrations, and your desires. You just made them visible.",
  },
  {
    day: 3,
    theme: "Patterns",
    emoji: "🔄",
    title: "The Loops I Keep Running",
    intro: "We all have patterns — in relationships, work, self-talk, and coping. Some serve us. Some don't. Today is about seeing them clearly.",
    prompts: [
      "What situation do you keep finding yourself in — again and again — in relationships, work, or life?",
      "When you're stressed, what's your automatic response? (Withdraw? People-please? Control? Numb?)",
      "What story do you keep telling yourself about why things don't work out?",
    ],
    reflection: "Patterns aren't destiny. They're software — installed early, running automatically. Seeing them is the first step to rewriting them. You just took that step.",
  },
  {
    day: 4,
    theme: "Triggers",
    emoji: "⚡",
    title: "What Sets Me Off — and Why",
    intro: "Triggers aren't random. They're connected to old wounds, unmet needs, and unprocessed experiences. Understanding them takes away their power.",
    prompts: [
      "What's a recent situation where your emotional reaction felt disproportionate to what happened? What was underneath it?",
      "Complete this sentence 5 times: 'I get most triggered when someone ___.'",
      "Think of a person who consistently triggers you. What need of yours do they leave unmet?",
    ],
    reflection: "Your triggers are information, not flaws. Each one is pointing to something that still needs attention — an old wound, a boundary, or a need you haven't voiced. Now you know where to look.",
  },
  {
    day: 5,
    theme: "Strengths",
    emoji: "💪",
    title: "What I'm Good At (That I Don't Give Myself Credit For)",
    intro: "Most people can list their flaws instantly but struggle to name their strengths. Today, we flip that.",
    prompts: [
      "What do people come to you for? What do they trust you with?",
      "What challenge have you survived that you haven't fully acknowledged?",
      "What's a skill, quality, or trait you have that you tend to minimise or dismiss?",
    ],
    reflection: "Strength isn't always loud. Sometimes it's the quiet persistence, the emotional labour, the showing up when it's hard. You just named what you usually overlook. Remember it.",
  },
  {
    day: 6,
    theme: "Shadow",
    emoji: "🌑",
    title: "The Parts I Don't Want to Look At",
    intro: "The 'shadow' is the part of yourself you reject, deny, or feel ashamed of. But it holds valuable information — and ignoring it gives it more power, not less.",
    prompts: [
      "What trait in others annoys you most? (Projection often reveals our own shadow.)",
      "What's something you've done that you feel guilty or ashamed about — that you've never fully processed?",
      "If your shadow self could speak freely, what would it say that you've been suppressing?",
    ],
    reflection: "Meeting your shadow isn't about becoming it. It's about understanding it so it stops running the show from backstage. What you just wrote took real courage. Most people never go here.",
  },
  {
    day: 7,
    theme: "Integration",
    emoji: "✨",
    title: "Bringing It All Together",
    intro: "You've spent 6 days exploring identity, values, patterns, triggers, strengths, and shadow. Today, you integrate it all into a clearer picture of who you are — and who you're becoming.",
    prompts: [
      "What surprised you most about what you discovered this week?",
      "What's one pattern or belief you're ready to start changing?",
      "Write a letter to yourself from the version of you who has done the inner work. What does that future self want you to know today?",
    ],
    reflection: "Self-awareness isn't a destination — it's a practice. What you did this week is something most people never do: you looked honestly at yourself, without flinching. That's the beginning of real change.",
  },
];

export function getDayProgress(): number[] {
  try {
    const saved = localStorage.getItem("mpt-awareness-progress");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveDayProgress(completedDays: number[]) {
  localStorage.setItem("mpt-awareness-progress", JSON.stringify(completedDays));
}
