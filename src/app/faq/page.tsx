import { getAllFaqs, faqCategories } from "@/lib/data";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Therapy FAQ — Sessions, Fees, Confidentiality & How to Get Started",
  description:
    "Answers to common questions about online therapy with Aishani Paul — how sessions work, fees, confidentiality, insurance, and how to book your first appointment.",
  path: "/faq",
});

export default async function FAQPage() {
  const faqs = await getAllFaqs();

  return (
    <>
      <SEOJsonLd data={faqPageJsonLd(faqs)} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown text-center">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          Everything you need to know before getting started.
        </p>

        {/* Group by category */}
        {faqCategories
          .filter((c) => c.id !== "all")
          .map((cat) => {
            const filtered = faqs.filter((f) => f.category === cat.id);
            if (filtered.length === 0) return null;
            return (
              <section key={cat.id} className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-brown mb-4">
                  {cat.label}
                </h2>
                <FAQAccordion faqs={filtered} />
              </section>
            );
          })}
      </div>

      <CTASection
        headline="Still Have Questions?"
        description="Reach out via email or book a free 15-minute discovery call — I'm happy to answer anything."
      />
    </>
  );
}
