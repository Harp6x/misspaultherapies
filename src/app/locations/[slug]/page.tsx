import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Video, Shield, Globe } from "lucide-react";
import { getAllLocations, getLocationBySlug, getSiteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { SEOJsonLd } from "@/components/SEOJsonLd";

export const revalidate = false;

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return {};
  return buildMetadata({
    title: loc.title,
    description: loc.metaDescription,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [locations, loc, config] = await Promise.all([
    getAllLocations(),
    getLocationBySlug(slug),
    getSiteConfig(),
  ]);
  if (!loc) notFound();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: config.name,
    url: `${config.url}/locations/${loc.slug}`,
    description: loc.metaDescription,
    areaServed: {
      "@type": "Place",
      name: loc.city,
    },
    medicalSpecialty: "Psychiatric",
    availableService: {
      "@type": "MedicalTherapy",
      name: "Online Psychotherapy",
      description: "Professional online therapy sessions via video conferencing",
    },
  };

  const defaultFeatures = [
    { icon: Video, label: "100% Online - No Travel Required" },
    { icon: Shield, label: "RCI Licensed Clinical Psychologist" },
    { icon: Globe, label: "English, Hindi & Bengali" },
    { icon: MapPin, label: `Serving ${loc.city}${loc.region ? `, ${loc.region}` : ""}` },
  ];
  const features = loc.features?.length
    ? loc.features
    : defaultFeatures.map((feature) => feature.label);
  const services = loc.services?.length
    ? loc.services
    : [
        "Individual Therapy",
        "Couples Therapy",
        "Adolescent Therapy",
        "Family Therapy",
        "Psychological Assessments",
      ];

  return (
    <>
      <SEOJsonLd data={localBusinessJsonLd} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Locations", href: "/locations/india" },
            { name: loc.city, href: `/locations/${loc.slug}` },
          ]}
        />

        <div className="text-sage mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium">Online Only</span>
        </div>

        <h1 className="text-brown font-serif text-4xl font-bold sm:text-5xl">{loc.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{loc.description}</p>

        {/* Content */}
        <div className="text-brown-light mt-8 leading-relaxed">
          <p>{loc.content}</p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="border-border bg-cream flex items-center gap-3 rounded-xl border px-5 py-3"
            >
              <Check className="text-sage h-5 w-5 shrink-0" />
              <span className="text-brown text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Services available */}
        <section className="mt-12">
          <h2 className="text-brown font-serif text-2xl font-semibold">
            Services Available in {loc.city}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const slug = service
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const label = service.includes(" ")
                ? service
                : service.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
              return (
                <li key={service}>
                  <Link
                    href={`/services/${slug}`}
                    className="text-sage hover:text-sage-dark flex items-center gap-2 text-sm transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Clarification */}
        <section className="border-border bg-cream mt-12 rounded-2xl border p-6">
          <h2 className="text-brown font-serif text-xl font-semibold">Important Note</h2>
          <p className="text-brown-light mt-2 text-sm leading-relaxed">
            {config.name} operates as an <strong>online-only practice</strong>. There is no physical
            clinic location in {loc.city}. All sessions are conducted via secure video conferencing,
            allowing you to access therapy from the privacy and comfort of your own space.
          </p>
        </section>

        {/* Other locations */}
        <section className="mt-12">
          <h2 className="text-brown font-serif text-xl font-semibold">Also Serving</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {locations
              .filter((l) => l.slug !== loc.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="bg-sage/10 text-sage-dark hover:bg-sage/20 rounded-full px-4 py-1.5 text-sm transition-colors"
                >
                  {l.city}
                </Link>
              ))}
          </div>
        </section>
      </div>

      <CTASection />
    </>
  );
}
