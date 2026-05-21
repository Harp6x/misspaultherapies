import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Flame,
  Brain,
  BookOpen,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";

export const metadata = buildMetadata({
  title: "Free Mental Health Tools — Interactive Self-Help by a Clinical Psychologist",
  description:
    "Free, evidence-based interactive mental health tools: emotional check-ins, burnout assessments, guided reflections, and journaling — by Aishani Paul, RCI-licensed clinical psychologist.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/check-in",
    icon: Heart,
    title: "Emotional Check-In",
    description:
      "A guided 2-minute check-in to explore how you're really feeling — mood, body, thoughts, and needs.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "I don't know how I feel",
  },
  {
    href: "/tools/burnout-quiz",
    icon: Flame,
    title: "Burnout Assessment",
    description:
      "12 honest questions to measure your exhaustion, cynicism, and efficacy — with a personalised recovery plan.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "Am I burned out or just tired?",
  },
  {
    href: "/tools/reflect",
    icon: Sparkles,
    title: "Guided Reflection",
    description:
      "Choose a theme, answer 5 questions, and get personalised feedback on anxiety, self-worth, relationships, grief, growth, or stress.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "I want to understand myself better",
  },
  {
    href: "/tools/journal",
    icon: BookOpen,
    title: "AI Journaling",
    description:
      "Write freely and receive gentle, therapeutic reflections. Free prompts + optional AI-powered insights.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "I want a safe space to process",
  },
  {
    href: "/tools/self-awareness",
    icon: Brain,
    title: "Self-Awareness Journey",
    description:
      "A 7-day scored journey: 3 questions per day across identity, values, patterns, triggers, strengths, shadow, and integration.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "I feel lost or stuck",
  },
  {
    href: "/tools/relationship-reflect",
    icon: MessageCircle,
    title: "Relationship Reflection",
    description:
      "A 3-part scored assessment for attachment style, relationship needs, and boundary health — with personalised guidance.",
    tag: "Live",
    tagColor: "bg-emerald-100 text-emerald-700",
    painPoint: "My relationships feel strained",
  },
];

export default function ToolsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Tools", href: "/tools" }]} />

        <div className="text-center">
          <p className="text-sm font-medium text-sage uppercase tracking-wider">
            Free &middot; No Login &middot; Clinically Informed
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
            Tools for When You Need a Moment
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Interactive self-help tools designed by a clinical psychologist.
            No account required. Everything stays on your device.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const isLive = tool.tag === "Live";
            const Wrapper = isLive ? Link : "div";
            return (
              <Wrapper
                key={tool.title}
                href={tool.href}
                className={`group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all ${
                  isLive
                    ? "hover:shadow-md hover:border-sage/30 cursor-pointer"
                    : "opacity-80"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tool.tagColor}`}
                  >
                    {tool.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-brown group-hover:text-sage-dark transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                <p className="mt-3 text-xs italic text-muted-foreground/70">
                  &ldquo;{tool.painPoint}&rdquo;
                </p>
                {isLive && (
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sage">
                    Try it free <ArrowRight className="h-3 w-3" />
                  </p>
                )}
              </Wrapper>
            );
          })}
        </div>

        {/* Why these tools */}
        <div className="mt-16 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
            Why These Tools?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Most mental health content online tells you <em>what</em> to do. These tools
            help you <em>actually do it</em> — through guided, interactive experiences
            grounded in evidence-based therapeutic frameworks like CBT, DBT, and
            emotion-focused approaches. They&apos;re not a replacement for therapy — but
            they&apos;re a powerful complement.
          </p>
        </div>
      </div>

      <CTASection
        headline="Need More Than Self-Help?"
        description="These tools are a starting point. If you're ready for deeper support, therapy can help you understand the patterns underneath."
        primaryLabel="Book a Free Discovery Call"
        secondaryLabel="Learn About My Approach"
        secondaryHref="/about"
      />
    </>
  );
}
