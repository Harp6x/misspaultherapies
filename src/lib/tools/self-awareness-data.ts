// ── Scored Self-Awareness Journey ──

export interface AwarenessQuestion {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}

export interface DayTier {
  max: number;
  label: string;
  headline: string;
  body: string;
  insight: string;
  actions: string[];
}

export interface AwarenessDay {
  day: number;
  theme: string;
  emoji: string;
  title: string;
  intro: string;
  questions: AwarenessQuestion[];
  tiers: DayTier[];
}

export interface DayResult {
  day: number;
  score: number;
  maxScore: number;
  label: string;
  headline: string;
  body: string;
  insight: string;
  actions: string[];
}

export const journeyDays: AwarenessDay[] = [
  {
    day: 1, theme: "Identity", emoji: "🪞", title: "Who Am I — Really?",
    intro: "How well do you know the person underneath the roles you play? This isn't about labels — it's about honest self-recognition.",
    questions: [
      { id: "id1", text: "How often do you act in ways that feel authentically 'you' (vs. performing for others)?", options: [{ label: "Almost always — I'm comfortable being myself", value: 0 }, { label: "Most of the time, with some exceptions", value: 1 }, { label: "I often perform or mask around others", value: 2 }, { label: "I don't really know who I am outside my roles", value: 3 }] },
      { id: "id2", text: "Can you describe yourself without referencing your job, relationships, or roles?", options: [{ label: "Yes — I have a clear sense of who I am", value: 0 }, { label: "Somewhat — it takes effort", value: 1 }, { label: "I struggle with this", value: 2 }, { label: "I honestly don't know who I am", value: 3 }] },
      { id: "id3", text: "When alone with no distractions, how do you feel?", options: [{ label: "Comfortable and at ease", value: 0 }, { label: "Okay but a bit restless", value: 1 }, { label: "Uncomfortable — I avoid it", value: 2 }, { label: "Deeply uncomfortable or empty", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Grounded", headline: "You have a strong sense of self.", body: "You know who you are beyond your roles. You can be alone with yourself comfortably. This is a real strength — most people never reach this clarity.", insight: "Your identity doesn't depend on external validation. Protect this self-knowledge.", actions: ["Keep investing in activities that reflect your core values", "Share your authentic self more openly — it deepens trust", "Notice when external pressure starts to erode your sense of self"] },
      { max: 5, label: "Exploring", headline: "You're somewhere between performing and being.", body: "You have a sense of who you are, but it's inconsistent — sometimes you're authentic, sometimes you're playing a part. This is normal, especially during transitions.", insight: "The gap between who you are and who you perform as is where your growth edge lives.", actions: ["Spend 10 minutes daily doing something that's purely for you — not for anyone else", "Ask yourself: 'Is this what I want, or what I think I should want?'", "Journaling helps separate your voice from others' expectations"] },
      { max: 9, label: "Lost", headline: "Your sense of self needs attention.", body: "You may have spent so long meeting others' expectations that you've lost connection with who you actually are. This isn't failure — it's a common consequence of people-pleasing, trauma, or rigid upbringings. It's also very fixable.", insight: "You haven't lost yourself. You just buried yourself under layers of expectation. The work now is excavation.", actions: ["Therapy can be transformative here — especially schema therapy or psychodynamic work", "Start small: notice one preference per day that's genuinely yours", "Reduce time with people who require you to perform, and increase time with those who let you be"] },
    ],
  },
  {
    day: 2, theme: "Values", emoji: "🧭", title: "What Actually Matters to Me?",
    intro: "Values aren't aspirational slogans. They're the principles that already drive your choices — even when you don't notice.",
    questions: [
      { id: "vl1", text: "How aligned are your daily actions with what you say matters most to you?", options: [{ label: "Very aligned — I live by my values", value: 0 }, { label: "Mostly, but I compromise sometimes", value: 1 }, { label: "There's a significant gap", value: 2 }, { label: "I'm not even sure what my values are", value: 3 }] },
      { id: "vl2", text: "When making big decisions, how much do your personal values guide you?", options: [{ label: "They're central to every major choice", value: 0 }, { label: "They influence me but aren't always decisive", value: 1 }, { label: "I usually decide based on practicality or others' opinions", value: 2 }, { label: "I don't know what my values are, so they can't guide me", value: 3 }] },
      { id: "vl3", text: "How often do you feel like you're living someone else's version of a good life?", options: [{ label: "Rarely — my life reflects my own vision", value: 0 }, { label: "Sometimes — certain areas feel 'inherited'", value: 1 }, { label: "Often — I'm following a script I didn't write", value: 2 }, { label: "Most of the time — I don't know what I actually want", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Aligned", headline: "Your values and actions are in sync.", body: "You know what matters to you and you're living accordingly. That doesn't mean life is easy, but your compass is calibrated.", insight: "Values alignment is the foundation of psychological wellbeing. You've built a solid one.", actions: ["Revisit your values annually — they evolve as you grow", "When a decision feels hard, come back to: 'What matters most here?'", "Help others clarify their values — teaching deepens your own clarity"] },
      { max: 5, label: "Misaligned", headline: "There's a gap between what you value and how you live.", body: "You have some sense of what matters, but life pressures, habits, or fear are pulling you away from it. This gap creates a quiet background stress that erodes satisfaction over time.", insight: "The tension you feel isn't random — it's the friction between who you are and how you're living.", actions: ["Write down your top 3 values. Then audit your last week: how much time served those values?", "Identify one change you could make this week to close the gap", "Saying no to what doesn't align is how you say yes to what does", "Consider values-based therapy (ACT) if the gap feels persistent"] },
      { max: 9, label: "Disconnected", headline: "You may be living a life designed by someone else.", body: "Your values are unclear or completely overridden by external expectations. This isn't unusual — many people inherit their 'should's from family, culture, or trauma. But it does create a pervasive sense of emptiness or inauthenticity.", insight: "You're not lost — you're just following someone else's map. It's time to draw your own.", actions: ["Therapy is highly recommended — ACT (Acceptance and Commitment Therapy) specialises in this", "Start with: 'If no one would judge me, what would I do differently?'", "Pay attention to envy — what you're jealous of often reveals hidden values", "Give yourself permission to want what you actually want, not what you 'should' want"] },
    ],
  },
  {
    day: 3, theme: "Patterns", emoji: "🔄", title: "The Loops I Keep Running",
    intro: "Patterns are the invisible scripts running in the background of your life. Some protect you. Some hold you back. Today we make them visible.",
    questions: [
      { id: "pt1", text: "Do you notice yourself repeating the same dynamics in relationships or work?", options: [{ label: "Rarely — I learn and adjust", value: 0 }, { label: "Sometimes — certain loops keep recurring", value: 1 }, { label: "Often — I keep ending up in the same situations", value: 2 }, { label: "Constantly — it feels inescapable", value: 3 }] },
      { id: "pt2", text: "When stressed, can you choose how to respond rather than reacting automatically?", options: [{ label: "Yes — I usually pause before reacting", value: 0 }, { label: "Sometimes, but I still get hijacked", value: 1 }, { label: "Rarely — I react on autopilot", value: 2 }, { label: "Never — my reactions control me", value: 3 }] },
      { id: "pt3", text: "Are you aware of the stories you tell yourself about why things go wrong?", options: [{ label: "Yes — and I can challenge them", value: 0 }, { label: "I notice them but they still affect me", value: 1 }, { label: "I believe them without questioning", value: 2 }, { label: "I don't realise I'm telling stories — it just feels like truth", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Self-aware", headline: "You see your patterns — and you're breaking them.", body: "You have strong metacognition: the ability to observe your own thinking and behaviour. This lets you catch loops before they take over. Keep building on this.", insight: "Awareness without action still leaves patterns running. You're doing both — that's rare.", actions: ["Track your progress: when you catch a pattern, write down what you did differently", "Share your insights with someone you trust — accountability strengthens change", "Celebrate pattern-breaks, even small ones"] },
      { max: 5, label: "Aware but stuck", headline: "You see the loops — but you're still running them.", body: "You have partial awareness of your patterns, but awareness alone hasn't broken them. This is incredibly common. Patterns are wired into your nervous system, not just your thoughts. Breaking them requires more than willpower.", insight: "Knowing the pattern isn't enough. You need new experiences and new responses, not just new understanding.", actions: ["Choose ONE pattern to work on. Focus creates change; scattershot doesn't", "When the loop starts, try a 'pattern interrupt': do something physically different (walk, stretch, change rooms)", "A therapist can help you trace patterns to their origin — which is where lasting change happens", "Self-compassion is essential: you learned these patterns for survival. They're not character flaws"] },
      { max: 9, label: "On autopilot", headline: "Your patterns are running the show.", body: "You're mostly operating on automatic — reacting rather than responding, repeating rather than choosing. This isn't your fault. These patterns were likely installed in childhood or during difficult experiences. But they're costing you.", insight: "You're not broken. You're running old software that no longer matches your current life.", actions: ["Professional support is strongly recommended — CBT, schema therapy, or psychodynamic therapy", "Start a 'trigger journal': when a pattern fires, write down the trigger, the reaction, and what you wish you'd done instead", "Regulate your nervous system first: breathwork, grounding, and sleep help you access the pause between stimulus and response", "Progress isn't perfection — it's noticing the loop 1% earlier each time"] },
    ],
  },
  {
    day: 4, theme: "Triggers", emoji: "⚡", title: "What Sets Me Off — and Why",
    intro: "Triggers aren't weaknesses. They're your nervous system's alarm system — often calibrated to old threats, not current ones.",
    questions: [
      { id: "tr1", text: "How often do you have emotional reactions that feel disproportionate to the situation?", options: [{ label: "Rarely", value: 0 }, { label: "Sometimes — usually when I'm already stressed", value: 1 }, { label: "Often — small things set me off", value: 2 }, { label: "Frequently — I feel emotionally volatile", value: 3 }] },
      { id: "tr2", text: "Can you usually identify what triggered a strong emotional reaction?", options: [{ label: "Yes — I can trace it back clearly", value: 0 }, { label: "Sometimes, after the fact", value: 1 }, { label: "Rarely — the reaction just hits me", value: 2 }, { label: "No — I don't understand my own reactions", value: 3 }] },
      { id: "tr3", text: "When triggered, how quickly can you return to baseline?", options: [{ label: "Fairly quickly — minutes to an hour", value: 0 }, { label: "It takes a while but I recover the same day", value: 1 }, { label: "It can ruin my day or longer", value: 2 }, { label: "Triggers can affect me for days or weeks", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Regulated", headline: "Your emotional regulation is strong.", body: "You understand your triggers, recover quickly, and don't let reactions hijack your day. This level of emotional intelligence is a major asset in relationships, work, and self-care.", insight: "Regulation isn't about not feeling — it's about feeling without being controlled by it. You're doing this well.", actions: ["Continue to build your emotional vocabulary — it sharpens self-awareness", "When something does trigger you, get curious rather than critical", "Your regulation skills can help others — consider being the calm presence when someone else is activated"] },
      { max: 5, label: "Reactive", headline: "Your triggers are louder than they need to be.", body: "You're getting triggered more often or more intensely than the situations warrant. This usually means old wounds are being reactivated by present-day experiences. You can see it happening — but you can't always stop it.", insight: "Your reactions aren't 'too much'. They're proportional — just to something in the past, not the present.", actions: ["Learn to name the trigger in the moment: 'This reminds me of...'", "Grounding techniques (5-4-3-2-1, cold water, deep breathing) can shorten the emotional hijack", "Therapy helps you process the old wounds so current triggers lose their charge", "Track your top 3 triggers this week — awareness creates choice"] },
      { max: 9, label: "Overwhelmed", headline: "Your nervous system is stuck in high alert.", body: "You're being triggered frequently, intensely, and with slow recovery. This suggests your nervous system is dysregulated — possibly from ongoing stress, trauma, or a lack of emotional safety. Living like this is exhausting and unsustainable.", insight: "This isn't a character flaw. This is your body trying to protect you with an alarm system that won't switch off.", actions: ["Trauma-informed therapy is essential at this level — EMDR, somatic experiencing, or IFS", "Prioritise nervous system regulation: daily breathwork, cold exposure, bilateral movement (walking, tapping)", "Reduce exposure to people, situations, and media that keep your system activated", "You deserve to feel safe. That's not a luxury — it's a foundation for everything else"] },
    ],
  },
  {
    day: 5, theme: "Strengths", emoji: "💪", title: "What I Don't Give Myself Credit For",
    intro: "Most people can list their flaws in seconds but freeze when asked about strengths. Today we flip that lens.",
    questions: [
      { id: "st1", text: "Can you easily name 3 genuine strengths you bring to relationships or work?", options: [{ label: "Yes — I know what I'm good at", value: 0 }, { label: "I can name some, but I downplay them", value: 1 }, { label: "I struggle to think of any", value: 2 }, { label: "I genuinely believe I have no real strengths", value: 3 }] },
      { id: "st2", text: "When you achieve something, how do you respond internally?", options: [{ label: "I feel proud and acknowledge it", value: 0 }, { label: "I notice it but move on quickly", value: 1 }, { label: "I attribute it to luck or circumstance", value: 2 }, { label: "I immediately focus on what I did wrong", value: 3 }] },
      { id: "st3", text: "Do you recognise the difficult things you've survived as evidence of strength?", options: [{ label: "Yes — I'm aware of my resilience", value: 0 }, { label: "Sometimes, but I don't dwell on it", value: 1 }, { label: "Not really — I minimise what I've been through", value: 2 }, { label: "No — I think I just got lucky or haven't really faced anything hard", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Confident", headline: "You see yourself clearly — including the good.", body: "You can name your strengths without arrogance and acknowledge your resilience without dismissing it. This balanced self-view is psychologically healthy and relatively rare.", insight: "Knowing your strengths isn't ego. It's the foundation for using them intentionally.", actions: ["Use your strengths more deliberately — in work, relationships, and personal growth", "Help others see their strengths — your clarity can be a gift to people around you", "Watch for the moments when even your confidence wavers — that's useful information"] },
      { max: 5, label: "Deflecting", headline: "You know your strengths but won't own them.", body: "You have strengths — probably significant ones — but you've been trained (by family, culture, or experience) to minimise them. Deflecting compliments, attributing success to luck, and focusing on flaws are signs of conditional self-worth.", insight: "Your strengths don't need to be earned or validated by others. They exist whether you claim them or not.", actions: ["Keep a 'strength log': write down one thing you did well each day for 2 weeks", "When someone compliments you, practise saying 'Thank you' — nothing more", "Notice the inner voice that minimises — whose voice is it really?", "Therapy focused on self-compassion (CFT) can transform how you relate to your own worth"] },
      { max: 9, label: "Invisible", headline: "You can't see what's good about you — but it's there.", body: "Your strengths are invisible to you. This isn't because they don't exist — it's because your internal filter only shows you what's wrong. This is often the result of critical environments, trauma, or prolonged self-neglect.", insight: "You don't lack strengths. You lack the lens to see them. That lens can be rebuilt.", actions: ["Ask 3 people you trust: 'What do you see as my strengths?' Write down what they say", "Therapy can help you rebuild a realistic self-image — the one that includes your strengths", "Stop comparing your weaknesses to others' highlights. It's rigged arithmetic", "You survived everything that tried to break you. That is strength — even if it doesn't feel like it"] },
    ],
  },
  {
    day: 6, theme: "Shadow", emoji: "🌑", title: "The Parts I Don't Want to Look At",
    intro: "Your 'shadow' is everything you reject, suppress, or deny about yourself. Exploring it isn't about becoming those things — it's about understanding them so they stop controlling you.",
    questions: [
      { id: "sh1", text: "How comfortable are you acknowledging your own flaws and difficult emotions?", options: [{ label: "Very — I can sit with discomfort honestly", value: 0 }, { label: "Somewhat — I try but it's hard", value: 1 }, { label: "Not very — I avoid looking at the hard stuff", value: 2 }, { label: "Not at all — I suppress or deny anything negative", value: 3 }] },
      { id: "sh2", text: "Do you notice yourself judging others for traits you might also carry?", options: [{ label: "Yes — I recognise projection when it happens", value: 0 }, { label: "Sometimes — I can see it in hindsight", value: 1 }, { label: "Rarely — I usually see the fault as purely theirs", value: 2 }, { label: "No — I'm genuinely different from the people who annoy me", value: 3 }] },
      { id: "sh3", text: "Is there guilt or shame from your past that you haven't fully processed?", options: [{ label: "Very little — I've worked through most of it", value: 0 }, { label: "Some — certain things still linger", value: 1 }, { label: "A lot — I carry heavy guilt or shame", value: 2 }, { label: "It's overwhelming — I can't face it", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Integrated", headline: "You've made peace with your darker parts.", body: "You can acknowledge your flaws, sit with uncomfortable truths, and recognise projection. This is shadow integration — it doesn't mean you're perfect, it means you're honest.", insight: "Integration isn't about eliminating the shadow. It's about knowing it so well that it can't surprise you.", actions: ["Continue to check in with your shadow, especially during stress", "Use your comfort with darkness to help others feel safe exploring theirs", "Remember: the shadow evolves. New chapters bring new material to integrate"] },
      { max: 5, label: "Aware but avoidant", headline: "You know the shadow is there — but you're not looking at it.", body: "You sense there's unprocessed material beneath the surface — guilt, shame, traits you don't like — but you're avoiding direct contact with it. This is understandable. Shadow work is uncomfortable. But avoidance gives it more power.", insight: "What you avoid doesn't go away. It shows up sideways — in projection, in overreaction, in self-sabotage.", actions: ["Pick one thing you've been avoiding about yourself. Write it down. Just that step matters", "Notice when you judge someone harshly — ask: 'Is this something I'm afraid of in myself?'", "Therapy is a safe container for shadow exploration — you don't have to do this alone", "Self-compassion is the antidote to shame. You can be flawed AND worthy"] },
      { max: 9, label: "Suppressed", headline: "There's a lot under the surface — and it's affecting you.", body: "You're carrying significant unprocessed shame, guilt, or self-rejection. The shadow isn't just present — it's actively influencing your behaviour, relationships, and self-image. This level of suppression is exhausting.", insight: "Suppression is a survival strategy, not a character flaw. But what protected you once is now weighing you down.", actions: ["Therapy is essential — specifically trauma-informed, psychodynamic, or IFS (Internal Family Systems)", "You don't have to process everything at once. Start with what feels safest", "If shame is dominant, compassion-focused therapy (CFT) can fundamentally shift how you relate to yourself", "Remember: the things you're most ashamed of are usually the things that most need compassion, not punishment"] },
    ],
  },
  {
    day: 7, theme: "Integration", emoji: "✨", title: "Bringing It All Together",
    intro: "You've explored identity, values, patterns, triggers, strengths, and shadow. Today we look at the full picture — and what comes next.",
    questions: [
      { id: "in1", text: "After this week, how clear do you feel about who you are and what you need?", options: [{ label: "Much clearer than before", value: 0 }, { label: "Somewhat clearer — still processing", value: 1 }, { label: "Not much clearer — it's all still foggy", value: 2 }, { label: "More confused than when I started", value: 3 }] },
      { id: "in2", text: "Do you feel motivated to make changes based on what you've discovered?", options: [{ label: "Yes — I have specific things I want to change", value: 0 }, { label: "Somewhat — I see what needs to change but I'm unsure how", value: 1 }, { label: "Not really — it feels overwhelming", value: 2 }, { label: "No — I feel stuck or hopeless", value: 3 }] },
      { id: "in3", text: "How do you feel about yourself right now, having gone through this journey?", options: [{ label: "More compassionate and accepting", value: 0 }, { label: "Mixed — some pride, some discomfort", value: 1 }, { label: "Mostly uncomfortable — I saw things I didn't like", value: 2 }, { label: "Worse — I feel more critical of myself", value: 3 }] },
    ],
    tiers: [
      { max: 2, label: "Ready", headline: "You're integrating beautifully.", body: "You've gained clarity, compassion, and motivation from this journey. You're not just more self-aware — you're ready to act on what you've learned. This is exactly where growth begins.", insight: "Self-awareness without action is just interesting. Self-awareness with action changes everything.", actions: ["Choose one insight from this week and turn it into a concrete change this month", "Write a letter to yourself summarising what you've learned — read it in 30 days", "Consider therapy to deepen and sustain this work", "Celebrate what you just did. Most people never look at themselves this honestly"] },
      { max: 5, label: "Processing", headline: "You're in the thick of it — and that's okay.", body: "Self-awareness can be uncomfortable. If you're feeling mixed or uncertain, that's not failure — it's the natural response to seeing yourself honestly. What you need now is time, compassion, and possibly support.", insight: "Growth is rarely a straight line. The discomfort you feel is the growing edge. Don't rush past it.", actions: ["Give yourself time to digest what you've discovered — there's no deadline", "Talk to someone about what came up: a therapist, a trusted friend, or a journal", "Focus on one area that feels most actionable, and let the rest settle", "Return to this journey in a month — you'll be surprised how much has shifted"] },
      { max: 9, label: "Struggling", headline: "This journey brought up a lot — and you need support.", body: "If you're feeling worse, more confused, or more self-critical after this journey, that's a sign there's deeper material that needs professional help to process. This isn't a failure of the journey — it's the journey showing you where the real work lives.", insight: "Feeling worse after self-reflection usually means you've touched something important that needs a trained guide to navigate.", actions: ["Please consider therapy — this is exactly what it's designed for", "You are not 'too broken' to benefit from help. In fact, the discomfort means help would be especially valuable", "Be gentle with yourself. You just did 7 days of inner work. That takes courage", "If you're experiencing distress, self-harm urges, or hopelessness, please reach out to a crisis service"] },
    ],
  },
];

export function calculateDayResult(day: AwarenessDay, answers: Record<string, number>): DayResult {
  let score = 0;
  for (const q of day.questions) {
    score += answers[q.id] ?? 0;
  }
  const maxScore = day.questions.length * 3;
  const tier = day.tiers.find((t) => score <= t.max) || day.tiers[day.tiers.length - 1];
  return { day: day.day, score, maxScore, label: tier.label, headline: tier.headline, body: tier.body, insight: tier.insight, actions: tier.actions };
}

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
