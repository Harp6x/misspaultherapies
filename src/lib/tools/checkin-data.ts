export interface MoodOption {
  label: string;
  emoji: string;
  value: string;
  color: string;
}

export interface BodyArea {
  label: string;
  id: string;
}

export interface NeedOption {
  label: string;
  id: string;
  description: string;
}

export const moodOptions: MoodOption[] = [
  { label: "Calm", emoji: "😌", value: "calm", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "Happy", emoji: "😊", value: "happy", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "Anxious", emoji: "😰", value: "anxious", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { label: "Sad", emoji: "😢", value: "sad", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Angry", emoji: "😤", value: "angry", color: "bg-red-100 text-red-700 border-red-200" },
  { label: "Numb", emoji: "😶", value: "numb", color: "bg-gray-100 text-gray-600 border-gray-200" },
  { label: "Overwhelmed", emoji: "🤯", value: "overwhelmed", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Lonely", emoji: "🥺", value: "lonely", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { label: "Hopeful", emoji: "🌱", value: "hopeful", color: "bg-lime-100 text-lime-700 border-lime-200" },
  { label: "Exhausted", emoji: "😩", value: "exhausted", color: "bg-stone-100 text-stone-700 border-stone-200" },
  { label: "Grateful", emoji: "🙏", value: "grateful", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { label: "Unsure", emoji: "🤔", value: "unsure", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
];

export const bodyAreas: BodyArea[] = [
  { label: "Head / temples", id: "head" },
  { label: "Jaw / teeth clenching", id: "jaw" },
  { label: "Throat / tightness", id: "throat" },
  { label: "Chest / heart racing", id: "chest" },
  { label: "Stomach / nausea", id: "stomach" },
  { label: "Shoulders / neck", id: "shoulders" },
  { label: "Hands / trembling", id: "hands" },
  { label: "Back / lower back", id: "back" },
  { label: "Legs / restlessness", id: "legs" },
  { label: "Nowhere specific", id: "none" },
];

export const thoughtPatterns = [
  { label: "Racing thoughts", id: "racing", description: "Thoughts moving too fast to catch" },
  { label: "Repetitive worry", id: "worry", description: "Same concern playing on repeat" },
  { label: "Self-criticism", id: "self-critic", description: "Harsh inner voice about yourself" },
  { label: "Catastrophising", id: "catastrophise", description: "Expecting the worst outcome" },
  { label: "Brain fog", id: "fog", description: "Hard to think clearly or focus" },
  { label: "Intrusive thoughts", id: "intrusive", description: "Unwanted thoughts popping in" },
  { label: "Comparisons", id: "comparison", description: "Measuring yourself against others" },
  { label: "Relatively clear", id: "clear", description: "Thoughts feel manageable right now" },
];

export const needOptions: NeedOption[] = [
  { label: "Rest", id: "rest", description: "Permission to pause and do nothing" },
  { label: "Connection", id: "connection", description: "To talk to someone who understands" },
  { label: "Space", id: "space", description: "Time alone to process and breathe" },
  { label: "Validation", id: "validation", description: "To hear 'your feelings make sense'" },
  { label: "Movement", id: "movement", description: "Physical release — walk, stretch, shake it off" },
  { label: "Structure", id: "structure", description: "A plan or next small step" },
  { label: "Comfort", id: "comfort", description: "Something warm, soft, or soothing" },
  { label: "Expression", id: "expression", description: "To write, cry, create, or let it out" },
];

export interface CheckInResult {
  mood: string;
  intensity: number;
  bodyAreas: string[];
  thoughts: string[];
  needs: string[];
  timestamp: string;
}

export function getReflection(result: CheckInResult): {
  headline: string;
  body: string;
  suggestion: string;
} {
  const mood = result.mood;
  const intensity = result.intensity;

  const reflections: Record<string, { headline: string; body: string; suggestion: string }> = {
    calm: {
      headline: "You're in a steady place right now.",
      body: "Calm doesn't mean everything is perfect — it means your nervous system is regulated enough to handle what's here. That's worth noticing.",
      suggestion: "This is a good moment to anchor. Take 3 deep breaths and let your body remember this feeling. It's yours to come back to.",
    },
    happy: {
      headline: "There's lightness in you today.",
      body: "Joy isn't always loud. Sometimes it's a quiet moment of 'this is okay.' Let yourself feel it without questioning whether you deserve it. You do.",
      suggestion: "Name one specific thing contributing to this feeling. Gratitude solidifies good moments in memory.",
    },
    anxious: {
      headline: "Your nervous system is on high alert.",
      body: intensity > 6
        ? "When anxiety is this strong, your body is convinced something dangerous is happening — even if your rational mind knows better. That's not weakness. That's biology."
        : "A level of unease is present. Your mind might be scanning for threats or playing 'what if.' This is your brain trying to protect you, even when the danger isn't real.",
      suggestion: "Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste. It brings you back to now.",
    },
    sad: {
      headline: "Something heavy is sitting with you.",
      body: "Sadness often carries a message — about loss, unmet needs, or a gap between where you are and where you wish you were. It's valid to feel this, even if you can't name exactly why.",
      suggestion: "If tears come, let them. Crying isn't breaking down — it's your body processing. If you can, tell one person how you're feeling today.",
    },
    angry: {
      headline: "There's fire in you right now.",
      body: "Anger is one of the most misunderstood emotions. It usually signals that a boundary has been crossed, a need is unmet, or something feels deeply unfair. It deserves attention, not suppression.",
      suggestion: "Before reacting, try to locate the need underneath the anger. 'I'm angry because I need ___.' Movement can also help discharge the energy safely.",
    },
    numb: {
      headline: "You might be protecting yourself right now.",
      body: "Numbness isn't the absence of feeling — it's your nervous system's way of saying 'too much.' When emotions feel unsafe or overwhelming, the brain shuts them down. This is survival, not failure.",
      suggestion: "Gentle sensory input can help: hold ice, smell something strong, splash cold water on your face. Small signals that tell your body it's safe to feel again.",
    },
    overwhelmed: {
      headline: "There's too much happening at once.",
      body: "Overwhelm is the space between what's being asked of you and what you have capacity for right now. It doesn't mean you're incapable — it means the load is too heavy for one person.",
      suggestion: "Pause everything for 2 minutes. Breathe. Then ask: What is the ONE smallest thing I can do right now? Just one. The rest can wait.",
    },
    lonely: {
      headline: "You're craving connection.",
      body: "Loneliness isn't about being alone — it's about feeling unseen. You can be surrounded by people and still feel this. It means your heart is reaching out for something real.",
      suggestion: "Send a message to someone. It doesn't have to be deep — 'thinking of you' is enough. Or, consider booking a session. Sometimes, being truly heard is the medicine.",
    },
    hopeful: {
      headline: "Something is shifting inside you.",
      body: "Hope is quiet but powerful. It means part of you believes that change is possible — even if another part is still scared. Trust the hopeful part. It knows something.",
      suggestion: "Write down what you're hopeful about. When harder days come (and they will), this note will be your anchor.",
    },
    exhausted: {
      headline: "You've been running on empty.",
      body: "Exhaustion isn't just physical — it can be emotional, social, or mental. If you've been pushing through without rest, your body is sending a clear signal. Listen to it.",
      suggestion: "Rest is not earned. It's a right. Cancel one thing today if you can. Give yourself permission to be unproductive. That IS the productive thing right now.",
    },
    grateful: {
      headline: "You're noticing what's good.",
      body: "Gratitude doesn't erase pain — but it does expand your view. The fact that you can hold both difficulty and appreciation at the same time shows emotional depth and resilience.",
      suggestion: "Write down 3 specific things you're grateful for right now. Specificity makes gratitude stick. Not 'my family' but 'the way my friend checked in on me yesterday.'",
    },
    unsure: {
      headline: "It's okay not to know how you feel.",
      body: "Emotional clarity isn't always instant. Sometimes feelings are layered, contradictory, or just... hazy. That's completely normal. You don't need to have it figured out to be valid.",
      suggestion: "Try sitting quietly for 60 seconds and noticing what shows up in your body. Emotions often live there before they have names. Whatever you find is information, not a problem.",
    },
  };

  return (
    reflections[mood] || {
      headline: "You showed up for yourself today.",
      body: "The simple act of checking in with your emotional state is an act of self-care. Most people don't pause long enough to ask 'how am I really doing?' You did.",
      suggestion: "Save this check-in. Come back tomorrow. Over time, patterns emerge — and patterns are the doorway to change.",
    }
  );
}
