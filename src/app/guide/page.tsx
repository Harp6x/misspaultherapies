import { CheckCircle, AlertTriangle, Heart, Brain, Sun, Shield, ArrowRight } from "lucide-react";
import { PrintButton } from "@/components/PrintButton";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSiteConfig } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Free Mental Health Self-Check Guide",
  description:
    "A private emotional well-being checklist and 5 evidence-based coping strategies. Created by Aishani Paul, RCI-licensed clinical psychologist.",
  path: "/guide",
  noIndex: true,
});

const selfCheckQuestions = [
  {
    category: "Emotional Well-Being",
    icon: Heart,
    color: "text-rose-600 bg-rose-50",
    questions: [
      "I often feel sad, empty, or hopeless for no clear reason",
      "I get irritable or frustrated more easily than usual",
      "I feel overwhelmed by everyday tasks",
      "I have lost interest in activities I used to enjoy",
      "I feel anxious or worried most of the time",
    ],
  },
  {
    category: "Physical Signs",
    icon: Sun,
    color: "text-amber-600 bg-amber-50",
    questions: [
      "My sleep has changed significantly (too much or too little)",
      "I feel tired or low on energy most days",
      "I have frequent headaches, stomach issues, or unexplained pain",
      "My appetite has changed (eating too much or too little)",
      "I feel physically tense or on edge",
    ],
  },
  {
    category: "Social & Relationships",
    icon: Shield,
    color: "text-blue-600 bg-blue-50",
    questions: [
      "I have been withdrawing from friends or family",
      "I find it hard to ask for help or talk about how I feel",
      "I feel misunderstood by the people around me",
      "I have been avoiding social situations",
      "My relationships feel strained or distant",
    ],
  },
  {
    category: "Thought Patterns",
    icon: Brain,
    color: "text-purple-600 bg-purple-50",
    questions: [
      "I often think negatively about myself",
      "I find it hard to concentrate or make decisions",
      "I worry excessively about the future",
      "I replay past events and criticise myself",
      "I feel like things will never get better",
    ],
  },
];

const copingStrategies = [
  {
    number: "01",
    title: "The 5-4-3-2-1 Grounding Technique",
    description:
      "When anxiety strikes, engage your senses: notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This pulls your mind out of the anxiety spiral and into the present moment.",
    when: "Use when feeling overwhelmed, panicky, or disconnected",
  },
  {
    number: "02",
    title: "Structured Worry Time",
    description:
      'Set aside 15 minutes each day as your "worry window." Write down your worries during this time. Outside this window, gently remind yourself: "I\'ll think about this during my worry time." Research shows this reduces overall anxiety by containing it.',
    when: "Use when worries keep intruding throughout the day",
  },
  {
    number: "03",
    title: "Behavioural Activation",
    description:
      "When motivation is low, start with one small, meaningful action - a 5-minute walk, texting a friend, or making your bed. The key insight from CBT: action creates motivation, not the other way around. Start small, build up gradually.",
    when: "Use when feeling stuck, unmotivated, or depressed",
  },
  {
    number: "04",
    title: "Self-Compassion Break",
    description:
      'Place your hand on your heart and say: "This is a moment of suffering. Suffering is part of life. May I be kind to myself." Dr. Kristin Neff\'s research shows self-compassion activates the same neural pathways as receiving comfort from a friend.',
    when: "Use when self-criticism becomes harsh or relentless",
  },
  {
    number: "05",
    title: "The STOP Technique",
    description:
      "S - Stop what you're doing. T - Take a breath (slow, deep). O - Observe your thoughts and feelings without judgement. P - Proceed with awareness. This mindfulness-based technique creates a gap between trigger and reaction.",
    when: "Use when feeling reactive, angry, or emotionally flooded",
  },
];

export default async function GuidePage() {
  const siteConfig = await getSiteConfig();
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="from-sage/10 to-cream bg-gradient-to-b py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-sage/20 text-sage mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <Heart className="h-8 w-8" />
          </div>
          <p className="text-sage mb-3 text-sm font-medium tracking-wider uppercase">
            Free Resource by {siteConfig.name}
          </p>
          <h1 className="text-brown font-serif text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            Mental Health Self-Check Guide
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            A private, evidence-based checklist to help you understand your emotional well-being -
            plus 5 coping strategies you can start using today.
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            Created by <strong className="text-brown">{siteConfig.author}</strong>, M.Phil Clinical
            Psychology, RCI Licensed
          </p>
          <PrintButton />
        </div>
      </div>

      {/* Important Note */}
      <div className="mx-auto -mt-2 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div className="text-sm text-amber-800">
            <strong>Important:</strong> This is a self-awareness tool, not a clinical diagnosis. If
            you identify with many of these statements, it may be helpful to speak with a mental
            health professional. If you are in crisis, please visit our{" "}
            <Link href="/emergency-resources" className="font-medium underline">
              emergency resources page
            </Link>
            .
          </div>
        </div>
      </div>

      {/* Part 1: Self-Check */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-brown text-center font-serif text-2xl font-bold sm:text-3xl">
          Part 1: Emotional Well-Being Self-Check
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-center">
          Read each statement and honestly reflect on whether it applies to you over the{" "}
          <strong className="text-brown">past two weeks</strong>. There are no right or wrong
          answers.
        </p>

        <div className="mt-10 space-y-8">
          {selfCheckQuestions.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.category}
                className="border-border rounded-2xl border bg-white p-6 sm:p-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${section.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-brown font-serif text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {section.questions.map((q, i) => (
                    <div key={i} className="group flex items-start gap-3">
                      <div className="border-border group-hover:border-sage mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2 transition-colors print:border-gray-400" />
                      <p className="text-brown-light text-sm leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scoring Guide */}
        <div className="border-border mt-10 rounded-2xl border bg-white p-6 sm:p-8">
          <h3 className="text-brown mb-4 font-serif text-lg font-semibold">
            Understanding Your Results
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <div className="mt-1 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div>
                <strong className="text-brown">0-5 statements</strong>
                <span className="text-muted-foreground">
                  {" "}
                  - You seem to be managing well. Keep nurturing your mental health with healthy
                  habits.
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
              </div>
              <div>
                <strong className="text-brown">6-12 statements</strong>
                <span className="text-muted-foreground">
                  {" "}
                  - You may be experiencing moderate stress or emotional challenges. The coping
                  strategies below can help, and speaking to a therapist could provide deeper
                  support.
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-red-500" />
              </div>
              <div>
                <strong className="text-brown">13-20 statements</strong>
                <span className="text-muted-foreground">
                  {" "}
                  - Your emotional well-being may need attention. Please consider reaching out to a
                  mental health professional. You don&apos;t have to go through this alone.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Coping Strategies */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-brown text-center font-serif text-2xl font-bold sm:text-3xl">
            Part 2: 5 Evidence-Based Coping Strategies
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-center">
            These techniques come from Cognitive Behavioural Therapy (CBT), Mindfulness-Based Stress
            Reduction (MBSR), and self-compassion research. Start with the one that resonates most.
          </p>

          <div className="mt-10 space-y-6">
            {copingStrategies.map((strategy) => (
              <div
                key={strategy.number}
                className="border-border bg-cream rounded-2xl border p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sage/40 flex-shrink-0 font-mono text-2xl font-bold">
                    {strategy.number}
                  </span>
                  <div>
                    <h3 className="text-brown font-serif text-lg font-semibold">
                      {strategy.title}
                    </h3>
                    <p className="text-brown-light mt-2 text-sm leading-relaxed">
                      {strategy.description}
                    </p>
                    <p className="text-sage-dark bg-sage/10 mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium">
                      {strategy.when}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-12 sm:py-16 print:hidden">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="from-sage/10 to-sage/5 border-sage/20 rounded-3xl border bg-gradient-to-br p-8 sm:p-12">
            <CheckCircle className="text-sage mx-auto mb-4 h-10 w-10" />
            <h2 className="text-brown font-serif text-2xl font-bold">
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
              If this guide helped you recognise areas you&apos;d like to work on, a free 15-minute
              discovery call can help you understand how therapy could support your journey.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Book a Free Discovery Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="border-sage/30 text-sage-dark hover:bg-sage/5 inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-medium transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6 lg:px-8 print:hidden">
        <p className="text-muted-foreground text-xs">
          This guide is for informational purposes only and does not constitute medical advice.
          Always consult a qualified mental health professional for personalised guidance.
          <br />
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
