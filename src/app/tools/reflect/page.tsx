import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuidedReflection } from "@/components/tools/GuidedReflection";

export const metadata = buildMetadata({
  title: "Guided Reflection - Personalised Mental Health Check-In",
  description:
    "Free mental health reflection tool: choose a theme (anxiety, self-worth, relationships, grief, growth, stress), answer 5 questions, and get personalised, clinically grounded feedback. No login required.",
  path: "/tools/reflect",
});

export default function ReflectPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Guided Reflection", href: "/tools/reflect" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Free Assessment
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Guided Reflection
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Choose what&apos;s on your mind, answer 5 honest questions, and receive
          a personalised reflection with strengths, next steps, and clinical
          guidance. Everything stays on your device.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          3-5 minutes &middot; 5 questions &middot; No login required &middot; 100% private
        </p>
      </div>

      <GuidedReflection />
    </div>
  );
}
