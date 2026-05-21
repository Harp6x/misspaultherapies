export interface ReflectionTheme {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

export interface ReflectionPrompt {
  theme: string;
  stage: number;
  prompt: string;
  followUp: string;
}

export const themes: ReflectionTheme[] = [
  {
    id: "anxiety",
    label: "Anxiety & Worry",
    emoji: "🌊",
    description: "When your mind won't stop racing",
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
  {
    id: "self-worth",
    label: "Self-Worth",
    emoji: "🪞",
    description: "When you're doubting yourself",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "💬",
    description: "When connection feels hard",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    id: "grief",
    label: "Grief & Loss",
    emoji: "🕊️",
    description: "When you're carrying something heavy",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "growth",
    label: "Growth & Change",
    emoji: "🌱",
    description: "When you're in transition",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    id: "stress",
    label: "Stress & Overwhelm",
    emoji: "🔥",
    description: "When everything feels like too much",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
];

export const reflectionPrompts: ReflectionPrompt[] = [
  // ── Anxiety ──
  {
    theme: "anxiety",
    stage: 1,
    prompt: "What is the worry or fear that's loudest in your mind right now? Write it out as specifically as you can — not a vague feeling, but the actual thought.",
    followUp: "You've named it. That's already powerful. Anxiety thrives in the fog — the more specific you make it, the smaller it gets.",
  },
  {
    theme: "anxiety",
    stage: 2,
    prompt: "If this fear actually came true — what would you do? Not what you'd feel, but what would your first concrete step be?",
    followUp: "Most anxiety lives in the 'what if.' When you answer 'then what,' you remind your brain that you can cope. You've coped before.",
  },
  {
    theme: "anxiety",
    stage: 3,
    prompt: "What is one thing you know to be true right now — in this moment — that your anxiety is asking you to forget?",
    followUp: "Your anxiety tells one story. Reality tells another. Both exist, but you get to choose which one you act from.",
  },

  // ── Self-Worth ──
  {
    theme: "self-worth",
    stage: 1,
    prompt: "What is the critical thought about yourself that keeps showing up? Write it down exactly as your inner voice says it.",
    followUp: "Notice: that voice has a tone, a rhythm, maybe even a face. It's not truth — it's a pattern. And patterns can change.",
  },
  {
    theme: "self-worth",
    stage: 2,
    prompt: "If your closest friend told you they felt this way about themselves — what would you say to them? Write it as if you're speaking to them.",
    followUp: "The compassion you just showed your friend? You deserve that same voice. The gap between how you treat others and how you treat yourself is where the work lives.",
  },
  {
    theme: "self-worth",
    stage: 3,
    prompt: "Name one thing you did recently — however small — that took courage, effort, or care. Something you haven't given yourself credit for.",
    followUp: "Self-worth isn't built in grand gestures. It's built in the moments you notice the small things and say 'that mattered.'",
  },

  // ── Relationships ──
  {
    theme: "relationships",
    stage: 1,
    prompt: "Think of a relationship that's weighing on you right now. What's the feeling underneath the conflict or distance? Not the situation — the feeling.",
    followUp: "Relationships problems are rarely about the thing you're arguing about. They're about the unmet need underneath. You just found yours.",
  },
  {
    theme: "relationships",
    stage: 2,
    prompt: "What do you need from this person that you haven't been able to ask for? Write it as a simple, honest sentence: 'I need ___.'",
    followUp: "Needs aren't demands. They're invitations for connection. The fact that you can name yours means you're closer to being heard than you think.",
  },
  {
    theme: "relationships",
    stage: 3,
    prompt: "What is one small thing you could do this week — not to fix the relationship, but to take care of yourself within it?",
    followUp: "You can't control how someone responds. But you can always choose how you show up for yourself. That's not selfish — that's necessary.",
  },

  // ── Grief ──
  {
    theme: "grief",
    stage: 1,
    prompt: "What have you lost — or what are you afraid of losing? It doesn't have to be a person. It can be a version of yourself, a dream, a chapter.",
    followUp: "Grief isn't only about death. It's about any gap between what is and what you wished would be. All grief is valid.",
  },
  {
    theme: "grief",
    stage: 2,
    prompt: "What is one thing about what you've lost that you want to make sure you never forget? A moment, a feeling, a quality.",
    followUp: "Memory isn't just nostalgia — it's a form of love. The things you hold onto become part of who you are now.",
  },
  {
    theme: "grief",
    stage: 3,
    prompt: "If the person, thing, or version of yourself you're grieving could speak to you right now — what do you think they'd want you to know?",
    followUp: "Sometimes the most healing thing is to hear, in your own voice, the permission you need. You just gave it to yourself.",
  },

  // ── Growth ──
  {
    theme: "growth",
    stage: 1,
    prompt: "What feels like it's shifting or changing in your life right now — even if you can't fully name it yet?",
    followUp: "Growth often starts as discomfort. The fact that you feel something moving means something is working — even if it doesn't feel like it yet.",
  },
  {
    theme: "growth",
    stage: 2,
    prompt: "What would you need to let go of to make space for what's trying to emerge? A belief, a habit, a role, an expectation?",
    followUp: "Letting go isn't giving up. It's making room. And you're the only one who gets to decide what stays and what goes.",
  },
  {
    theme: "growth",
    stage: 3,
    prompt: "Imagine yourself one year from now, having navigated this transition well. What does that version of you want you to know today?",
    followUp: "That future version of you already exists in the choices you make now. You're closer than you think.",
  },

  // ── Stress ──
  {
    theme: "stress",
    stage: 1,
    prompt: "List everything that's on your plate right now — work, personal, emotional. Don't edit. Just dump it all out.",
    followUp: "When stress lives in your head, it feels infinite. On paper, it becomes finite. You just made the invisible visible.",
  },
  {
    theme: "stress",
    stage: 2,
    prompt: "Look at your list. Circle (or highlight) the ONE thing that would make the biggest difference if it were handled. Just one.",
    followUp: "You can't do everything. But you can always do one thing. Overwhelm dissolves when you find the first domino.",
  },
  {
    theme: "stress",
    stage: 3,
    prompt: "What is one thing on your list that you can let go of, delegate, or postpone — without the world ending?",
    followUp: "Saying no to one thing is saying yes to your capacity. Rest isn't earned. It's required. You've done enough today.",
  },
];

export function getPromptsForTheme(themeId: string): ReflectionPrompt[] {
  return reflectionPrompts
    .filter((p) => p.theme === themeId)
    .sort((a, b) => a.stage - b.stage);
}

export function getReflectionSummary(
  themeId: string,
  responses: string[],
): { headline: string; body: string } {
  const summaries: Record<string, { headline: string; body: string }> = {
    anxiety: {
      headline: "You faced the worry instead of running from it.",
      body: "Most people try to outrun anxiety. You just sat with it, named it, and found the ground underneath. That takes more courage than you think. Come back to these words when the noise gets loud again.",
    },
    "self-worth": {
      headline: "You practiced the hardest kind of kindness — towards yourself.",
      body: "The way you speak to yourself matters more than almost anything else. Today you interrupted the harsh voice, even briefly. That's not small. That's the beginning of change.",
    },
    relationships: {
      headline: "You got honest about what you need.",
      body: "Connection starts with clarity — about your own feelings and needs, not about fixing the other person. What you wrote here is the conversation you've been avoiding. Maybe it's time to have it.",
    },
    grief: {
      headline: "You honoured what you've lost.",
      body: "Grief doesn't have a timeline or a finish line. What you did here — sitting with it, remembering, listening — is not dwelling. It's loving. And that love doesn't have to go anywhere.",
    },
    growth: {
      headline: "You're making sense of the in-between.",
      body: "Transitions are uncomfortable because the old story has ended and the new one hasn't started yet. But you just wrote a few lines of that new chapter. Keep going.",
    },
    stress: {
      headline: "You took the weight out of your head and put it on paper.",
      body: "You can't solve overwhelm by thinking harder. You solve it by making the invisible visible, choosing one thing, and letting the rest wait. You just did all three.",
    },
  };

  return (
    summaries[themeId] || {
      headline: "You showed up for yourself.",
      body: "Reflection is a form of self-care that most people skip. The fact that you paused, wrote, and sat with your thoughts? That's not nothing. That's everything.",
    }
  );
}
