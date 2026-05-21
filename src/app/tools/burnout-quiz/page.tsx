import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BurnoutQuiz } from "@/components/tools/BurnoutQuiz";

export const metadata = buildMetadata({
  title: "Burnout Assessment — Are You Burned Out or Just Tired?",
  description:
    "Take a free, evidence-based burnout assessment designed by a clinical psychologist. Get your exhaustion, cynicism, and efficacy scores with personalized recovery suggestions.",
  path: "/tools/burnout-quiz",
});

export default function BurnoutQuizPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Burnout Assessment", href: "/tools/burnout-quiz" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Free Assessment
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Am I Burned Out — or Just Tired?
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Answer 12 honest questions. Get your burnout score across three
          dimensions — exhaustion, cynicism, and efficacy — with personalised
          next steps.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Takes about 2 minutes &middot; No login required &middot; 100% private
        </p>
      </div>

      <BurnoutQuiz />
    </div>
  );
}
