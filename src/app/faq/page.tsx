import { getAllFaqs, faqCategories, getSiteConfig } from "@/lib/data";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";

export const revalidate = false;

export const metadata = buildMetadata({
  title: "Therapy FAQ - Sessions, Fees, Confidentiality & How to Get Started",
  description:
    "Answers to common questions about online therapy with Aishani Paul - how sessions work, fees, confidentiality, insurance, and how to book your first appointment.",
  path: "/faq",
});

export default async function FAQPage() {
  const [faqs, config] = await Promise.all([getAllFaqs(), getSiteConfig()]);
  const configuredCategories = config.options.faqCategories.length
    ? config.options.faqCategories
    : faqCategories.filter((category) => category.id !== "all").map((category) => category.label);
  const categoryKey = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const categoryLabels = new Map(configuredCategories.map((label) => [categoryKey(label), label]));
  for (const faq of faqs) {
    const key = categoryKey(faq.category);
    if (!categoryLabels.has(key)) categoryLabels.set(key, faq.category);
  }

  return (
    <>
      <SEOJsonLd data={faqPageJsonLd(faqs)} />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

        <h1 className="text-brown text-center font-serif text-4xl font-bold sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-4 text-center">
          Everything you need to know before getting started.
        </p>

        {/* Group by category */}
        {Array.from(categoryLabels.entries()).map(([id, label]) => {
          const filtered = faqs.filter((f) => categoryKey(f.category) === id);
          if (filtered.length === 0) return null;
          return (
            <section key={id} className="mt-10">
              <h2 className="text-brown mb-4 font-serif text-xl font-semibold">{label}</h2>
              <FAQAccordion faqs={filtered} />
            </section>
          );
        })}
      </div>

      <CTASection
        headline="Still Have Questions?"
        description="Reach out via email or book a free 15-minute discovery call - I'm happy to answer anything."
      />
    </>
  );
}
