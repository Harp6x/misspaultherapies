import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SelfAwareness } from "@/components/tools/SelfAwareness";

export const metadata = buildMetadata({
  title: "7-Day Self-Awareness Journey — Scored Assessments for Inner Clarity",
  description:
    "A free 7-day self-awareness journey with scored assessments: identity, values, patterns, triggers, strengths, shadow, and integration. Personalised results each day. By a clinical psychologist.",
  path: "/tools/self-awareness",
});

export default function SelfAwarenessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Self-Awareness Journey", href: "/tools/self-awareness" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          7-Day Scored Journey
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Know Yourself More Honestly
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Seven days, seven themes. Answer 3 questions per day and get
          personalised insights on identity, values, patterns, triggers,
          strengths, shadow, and integration. Progress saved locally.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          2–3 min per day &middot; 3 questions each &middot; Unlock days sequentially &middot; 100% private
        </p>
      </div>

      <SelfAwareness />
    </div>
  );
}
