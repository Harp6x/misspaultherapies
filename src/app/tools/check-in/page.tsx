import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmotionalCheckIn } from "@/components/tools/EmotionalCheckIn";

export const metadata = buildMetadata({
  title: "Emotional Check-In - How Are You Really Feeling?",
  description:
    "A free, guided emotional check-in tool by a clinical psychologist. Explore your mood, body sensations, thought patterns, and needs in 2 minutes. No login required.",
  path: "/tools/check-in",
});

export default function CheckInPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Emotional Check-In", href: "/tools/check-in" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Free Interactive Tool
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          How Are You <em>Really</em> Feeling?
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Take 2 minutes to pause and check in with yourself. No judgment.
          No account required. Just honest self-awareness.
        </p>
      </div>

      <EmotionalCheckIn />
    </div>
  );
}
