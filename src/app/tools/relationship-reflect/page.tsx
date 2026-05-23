import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelationshipReflect } from "@/components/tools/RelationshipReflect";

export const metadata = buildMetadata({
  title: "Relationship Patterns Assessment - Attachment, Needs & Boundaries",
  description:
    "Free relationship assessment: discover your attachment style, identify unmet needs, and audit your boundary health. Evidence-based, scored, and personalised. By a clinical psychologist.",
  path: "/tools/relationship-reflect",
});

export default function RelationshipReflectPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Relationship Patterns", href: "/tools/relationship-reflect" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Free Assessment
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Understand Your Relationship Patterns
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          A 3-part assessment covering your attachment style, unmet relationship
          needs, and boundary health - with scored, personalised results and
          actionable next steps.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          8-10 minutes &middot; 30 questions &middot; No login required &middot; 100% private
        </p>
      </div>

      <RelationshipReflect />
    </div>
  );
}
