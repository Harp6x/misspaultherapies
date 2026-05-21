export interface RelationshipMode {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface RelationshipSection {
  id: string;
  title: string;
  intro: string;
  prompts: { text: string; partnerText?: string }[];
  reflection: string;
}

export const modes: RelationshipMode[] = [
  { id: "solo", label: "Solo Reflection", emoji: "🪞", description: "Explore your relationship patterns alone" },
  { id: "partner", label: "With a Partner", emoji: "💬", description: "Guided conversation prompts for two" },
];

export const soloSections: RelationshipSection[] = [
  {
    id: "attachment",
    title: "Your Attachment Style",
    intro: "How you attach to people was shaped long before you chose it. Understanding your style isn't about labelling yourself — it's about seeing the pattern clearly so you can respond instead of react.",
    prompts: [
      { text: "When you feel disconnected from someone you love, what's your first instinct? (Pursue, withdraw, freeze, attack?)" },
      { text: "What's the story you tell yourself when someone doesn't respond to your message quickly?" },
      { text: "In past relationships, what made you feel most safe? What made you want to run?" },
    ],
    reflection: "Attachment patterns aren't permanent labels — they're starting points for understanding. What you just wrote reveals not weakness, but the strategies you learned to stay safe in relationships. Now you can choose different ones.",
  },
  {
    id: "needs",
    title: "Unmet Needs",
    intro: "Most relationship conflict isn't really about the dishes or the plans or the text that was never sent. It's about the need underneath that no one has named.",
    prompts: [
      { text: "Complete this sentence 5 times: 'In my relationships, I need more ___.'", },
      { text: "What need are you meeting for yourself that you wish someone else would meet for you?" },
      { text: "What's the most important thing you need from a partner that you find hardest to ask for?" },
    ],
    reflection: "Naming a need is the first step to having it met. The needs you wrote down aren't too much. They're human. The question now is: have you communicated them clearly?",
  },
  {
    id: "boundaries",
    title: "Boundaries & Resentment",
    intro: "Resentment is the tax you pay for boundaries you didn't set. It builds slowly, quietly — until it doesn't.",
    prompts: [
      { text: "Where in your current relationships do you feel resentful? What boundary is missing?" },
      { text: "What do you keep saying yes to that your body is screaming no about?" },
      { text: "If you could set one boundary this week — without guilt — what would it be?" },
    ],
    reflection: "Boundaries aren't walls. They're bridges with gates. You get to decide who crosses, and when. What you wrote here isn't selfish — it's self-preservation. And that's the foundation healthy relationships are built on.",
  },
];

export const partnerSections: RelationshipSection[] = [
  {
    id: "check-in",
    title: "Emotional Check-In",
    intro: "Before going deeper, start by meeting each other where you are right now. Take turns answering. Listen without fixing.",
    prompts: [
      { text: "How are you feeling about us right now — honestly?", partnerText: "Same question for you: How are you feeling about us right now?" },
      { text: "What's one thing I've done recently that made you feel loved or appreciated?", partnerText: "Your turn: What's one thing I've done recently that made you feel loved?" },
      { text: "Is there anything between us right now that you haven't said?", partnerText: "Same for you: Is there anything you've been holding back?" },
    ],
    reflection: "Checking in isn't just for when things are wrong. It's how you stay connected before the distance grows. What you just shared takes trust. Protect it.",
  },
  {
    id: "repair",
    title: "Repair & Understanding",
    intro: "Conflict isn't the problem — unrepaired conflict is. These prompts help you move from blame to understanding. Rules: no interrupting, no defending. Just listen.",
    prompts: [
      { text: "When we had that disagreement recently, what I felt underneath the anger/frustration was ___.", partnerText: "Your version: When we had that disagreement, what I felt underneath was ___." },
      { text: "What I needed from you in that moment was ___. I didn't say it because ___.", partnerText: "Your turn: What I needed from you was ___. I didn't say it because ___." },
      { text: "One thing I want you to know about how I experience our relationship right now:", partnerText: "And for you: One thing I want you to know about how I experience our relationship:" },
    ],
    reflection: "Repair isn't about agreeing. It's about understanding. If you both feel heard right now — even a little — that's more progress than most couples make in months of silence.",
  },
  {
    id: "future",
    title: "Shared Vision",
    intro: "The strongest couples aren't the ones without problems. They're the ones building something together. These prompts help you align on where you're headed.",
    prompts: [
      { text: "What does a great relationship look like to you? Describe a regular Tuesday in your ideal partnership.", partnerText: "Your ideal Tuesday: What does a great regular day look like in this relationship?" },
      { text: "What's one thing we could start doing this week that would bring us closer?", partnerText: "Your suggestion: What's one thing we could start doing this week?" },
      { text: "What do you want us to be able to say about our relationship one year from now?", partnerText: "Your vision: What do you want us to say about our relationship in a year?" },
    ],
    reflection: "Shared vision doesn't mean identical dreams. It means overlapping intentions. What you just created together is a compass. Come back to it when things get noisy.",
  },
];
