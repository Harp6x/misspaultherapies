import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelationshipReflect } from "@/components/tools/RelationshipReflect";

export const metadata = buildMetadata({
  title: "Relationship Reflection — Solo or Partner Guided Prompts",
  description:
    "Free relationship reflection tool with guided prompts for attachment, needs, boundaries, and repair. Solo or partner mode. By a clinical psychologist. No login required.",
  path: "/tools/relationship-reflect",
});

export default function RelationshipReflectPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "Relationship Reflection", href: "/tools/relationship-reflect" },
        ]}
      />

      <div className="text-center mb-12">
        <p className="text-sm font-medium text-sage uppercase tracking-wider">
          Solo or Partner Mode
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-brown">
          Relationship Reflection
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Guided prompts for attachment, unmet needs, boundaries, repair, and
          shared vision. Reflect alone or have a structured conversation with
          your partner.
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          15–20 minutes &middot; No login required &middot; 100% private
        </p>
      </div>

      <RelationshipReflect />
    </div>
  );
}
