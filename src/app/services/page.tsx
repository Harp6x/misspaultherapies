import { getAllServices } from "@/lib/data";
import { ServiceCard } from "@/components/ServiceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Online Therapy Services - Individual, Couples, Family Counselling India",
  description:
    "Explore therapy services by Aishani Paul: individual therapy, couples counselling, adolescent therapy, family therapy, psychological assessments & NRI support. 100% online across India.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />

        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
            Therapy Services
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every person and relationship is unique. I offer a range of
            specialised services - all delivered online for maximum
            accessibility.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <CTASection />
    </>
  );
}
