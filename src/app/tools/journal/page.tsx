import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AIJournal } from "@/components/tools/AIJournal";

export const metadata = buildMetadata({
  title: "AI Journaling — Therapeutic Writing with Intelligent Reflections",
  description:
    "Free AI-powered journaling tool with therapeutic prompts. Write freely and receive gentle, clinically-informed reflections. Your entries stay on your device. By a clinical psychologist.",
  path: "/tools/journal",
});

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "AI Journaling", href: "/tools/journal" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Free Therapeutic Journaling
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Write Freely. Reflect Deeply.
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Therapeutic writing prompts with intelligent reflections. Free prompts
          work offline. AI-powered reflections available for deeper personalisation.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Your entries stay on this device &middot; Export anytime &middot; No account needed
        </p>
      </div>

      <AIJournal />
    </div>
  );
}
