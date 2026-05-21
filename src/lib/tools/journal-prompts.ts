export interface JournalPrompt {
  id: string;
  category: string;
  prompt: string;
  followUp: string;
}

export const journalPrompts: JournalPrompt[] = [
  // Emotional awareness
  { id: "ea1", category: "Emotional Awareness", prompt: "What emotion are you carrying right now that you haven't fully acknowledged?", followUp: "Naming an emotion is the first step to processing it. What you just wrote? It matters more than you think." },
  { id: "ea2", category: "Emotional Awareness", prompt: "When did you last feel truly at peace? What was happening around you?", followUp: "Peace leaves clues. The details you just recalled are a map to what your nervous system needs." },
  { id: "ea3", category: "Emotional Awareness", prompt: "What are you pretending is fine that actually isn't?", followUp: "Honesty with yourself is the hardest kind of honesty. What you wrote here doesn't need to be shared — but it does need to be seen." },
  { id: "ea4", category: "Emotional Awareness", prompt: "Describe your inner world right now as if it were a weather report.", followUp: "Weather passes. So do emotional states. But tracking the patterns helps you prepare for the storms." },
  { id: "ea5", category: "Emotional Awareness", prompt: "What would you say to a younger version of yourself who felt exactly like this?", followUp: "The tenderness you just offered your younger self? You deserve that same care right now." },

  // Relationships
  { id: "r1", category: "Relationships", prompt: "Who in your life makes you feel safe enough to be imperfect?", followUp: "Safety in relationships isn't about never fighting. It's about knowing you can be messy and still be loved." },
  { id: "r2", category: "Relationships", prompt: "What conversation are you avoiding? What would you say if there were no consequences?", followUp: "The unsaid things take up more space than the said ones. Writing them here is practice for saying them out loud." },
  { id: "r3", category: "Relationships", prompt: "How do you typically react when someone you love disappoints you?", followUp: "Your reaction style was learned somewhere. Understanding it is the first step to choosing a different response." },
  { id: "r4", category: "Relationships", prompt: "What do you need from others that you find hard to ask for?", followUp: "Needs aren't weakness. They're the bridge between isolation and connection." },

  // Self-worth
  { id: "sw1", category: "Self-Worth", prompt: "What would change in your life if you truly believed you were enough?", followUp: "The gap between 'knowing' you're enough and 'feeling' it is where the deepest work happens." },
  { id: "sw2", category: "Self-Worth", prompt: "Write about something you did recently that took courage — even if no one noticed.", followUp: "Courage isn't always visible. The fact that you can name it means you're building a new narrative about yourself." },
  { id: "sw3", category: "Self-Worth", prompt: "Whose approval are you still waiting for? What would it mean to stop waiting?", followUp: "Waiting for external validation is exhausting. The approval you're seeking has to come from inside first." },
  { id: "sw4", category: "Self-Worth", prompt: "Write a permission slip to yourself. What do you give yourself permission to do, feel, or be?", followUp: "Read that back to yourself. Out loud if you can. Those words are yours now." },

  // Growth
  { id: "g1", category: "Growth & Change", prompt: "What is one belief about yourself that you're starting to outgrow?", followUp: "Outgrowing beliefs is uncomfortable because they used to protect you. Honouring them while letting them go is maturity." },
  { id: "g2", category: "Growth & Change", prompt: "What scares you most about the change you're going through?", followUp: "Fear and growth share the same doorway. What you wrote isn't weakness — it's awareness." },
  { id: "g3", category: "Growth & Change", prompt: "If you could design your ideal ordinary day one year from now, what would it look like?", followUp: "Clarity about the life you want is the first step to building it. Details matter — they become intentions." },
  { id: "g4", category: "Growth & Change", prompt: "What lesson keeps showing up in your life that you haven't fully learned yet?", followUp: "Recurring lessons aren't failure — they're invitations. Maybe this time, you're ready to accept." },

  // Stress & burnout
  { id: "sb1", category: "Stress & Burnout", prompt: "What is draining your energy the most right now? Be specific.", followUp: "Energy leaks need names. Now that you've identified it, the question becomes: what can you do about it?" },
  { id: "sb2", category: "Stress & Burnout", prompt: "When was the last time you rested without guilt? What would it take to do that again?", followUp: "If guilt follows your rest, it's not rest. Real rest is a decision to value yourself over productivity." },
  { id: "sb3", category: "Stress & Burnout", prompt: "What are you doing out of obligation that you'd stop if you could?", followUp: "Obligation without joy becomes resentment. Not everything deserves your yes." },
  { id: "sb4", category: "Stress & Burnout", prompt: "Write a letter to your exhaustion. What does it want you to know?", followUp: "Exhaustion is a messenger, not an enemy. What it just told you through your pen is worth listening to." },
];

export function getRandomPrompt(excludeIds: string[] = []): JournalPrompt {
  const available = journalPrompts.filter((p) => !excludeIds.includes(p.id));
  return available[Math.floor(Math.random() * available.length)] || journalPrompts[0];
}

export function getPromptsByCategory(category: string): JournalPrompt[] {
  return journalPrompts.filter((p) => p.category === category);
}

export const categories = [...new Set(journalPrompts.map((p) => p.category))];
