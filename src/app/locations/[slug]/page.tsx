import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Video, Shield, Globe } from "lucide-react";
import { getAllLocations, getLocationBySlug } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { SEOJsonLd } from "@/components/SEOJsonLd";

export const revalidate = false;

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return {};
  return buildMetadata({
    title: loc.title,
    description: loc.metaDescription,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locations = await getAllLocations();
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.name,
    url: `${siteConfig.url}/locations/${loc.slug}`,
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

  const features = [
    { icon: Video, label: "100% Online - No Travel Required" },
    { icon: Shield, label: "RCI Licensed Clinical Psychologist" },
    { icon: Globe, label: "English, Hindi & Bengali" },
    { icon: MapPin, label: `Serving ${loc.city}${loc.region ? `, ${loc.region}` : ""}` },
  ];

  return (
    <>
      <SEOJsonLd data={localBusinessJsonLd} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Locations", href: "/locations/india" },
            { name: loc.city, href: `/locations/${loc.slug}` },
          ]}
        />

        <div className="flex items-center gap-2 text-sage mb-4">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium">Online Only</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
          {loc.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {loc.description}
        </p>

        {/* Content */}
        <div className="mt-8 text-brown-light leading-relaxed">
          <p>{loc.content}</p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-cream px-5 py-3"
            >
              <f.icon className="h-5 w-5 text-sage shrink-0" />
              <span className="text-sm text-brown">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Services available */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-brown">
            Services Available in {loc.city}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Individual Therapy",
              "Couples Therapy",
              "Adolescent Therapy",
              "Family Therapy",
              "Psychological Assessments",
            ].map((s) => (
              <li key={s}>
                <Link
                  href={`/services/${s.toLowerCase().replace(/ /g, "-")}`}
                  className="flex items-center gap-2 text-sm text-sage hover:text-sage-dark transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Clarification */}
        <section className="mt-12 rounded-2xl border border-border bg-cream p-6">
          <h2 className="font-serif text-xl font-semibold text-brown">
            Important Note
          </h2>
          <p className="mt-2 text-sm text-brown-light leading-relaxed">
            Ms Paul Therapies operates as an{" "}
            <strong>online-only practice</strong>. There is no physical clinic
            location in {loc.city}. All sessions are conducted via secure video
            conferencing, allowing you to access therapy from the privacy and
            comfort of your own space.
          </p>
        </section>

        {/* Other locations */}
        <section className="mt-12">
          <h2 className="font-serif text-xl font-semibold text-brown">
            Also Serving
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {locations
              .filter((l) => l.slug !== loc.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="rounded-full bg-sage/10 px-4 py-1.5 text-sm text-sage-dark hover:bg-sage/20 transition-colors"
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
