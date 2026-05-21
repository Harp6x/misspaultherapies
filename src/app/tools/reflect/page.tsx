import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuidedReflection } from "@/components/tools/GuidedReflection";

export const metadata = buildMetadata({
  title: "Guided Reflection — Therapeutic Writing Prompts for Self-Discovery",
  description:
    "Free guided reflection tool with therapeutic writing prompts for anxiety, self-worth, relationships, grief, growth, and stress. By a clinical psychologist. No login required.",
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
          Free Guided Writing
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Guided Reflection
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Three therapeutic prompts that meet you where you are. Choose a theme,
          write freely, and receive a personalised reflection. Everything stays
          on your device.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          5–10 minutes &middot; No login required &middot; 100% private
        </p>
      </div>

      <GuidedReflection />
    </div>
  );
}
