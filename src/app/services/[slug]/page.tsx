import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Clock, CreditCard } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getAllServices, getServiceBySlug } from "@/lib/data";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} - Online ${service.title} in India`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? LucideIcons.Sparkles;

  return (
    <>
      <SEOJsonLd data={serviceJsonLd({ title: service.title, description: service.description, slug: service.slug, fee: service.fee })} />
      <SEOJsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.title, href: `/services/${service.slug}` }])} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${service.slug}` },
          ]}
        />

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
            <IconComponent className="h-7 w-7" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              {service.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Ideal for */}
          <div className="rounded-2xl border border-border bg-cream p-6">
            <h2 className="font-serif text-xl font-semibold text-brown mb-4">
              Ideal For
            </h2>
            <ul className="space-y-2">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brown-light">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-sage" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="rounded-2xl border border-border bg-cream p-6">
            <h2 className="font-serif text-xl font-semibold text-brown mb-4">
              What to Expect
            </h2>
            <ul className="space-y-2">
              {service.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brown-light">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-sage" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Approach */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-brown">
            My Approach
          </h2>
          <p className="mt-3 text-brown-light leading-relaxed">
            {service.approach}
          </p>
        </section>

        {/* Practical info */}
        <section className="mt-12 rounded-2xl border border-border bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-brown mb-4">
            Practical Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 text-sm text-brown-light">
              <Clock className="h-5 w-5 text-sage" />
              <span>
                <strong>Duration:</strong> {siteConfig.sessionDuration}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brown-light">
              <CreditCard className="h-5 w-5 text-sage" />
              <span>
                <strong>Fee:</strong> {service.fee}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {siteConfig.slidingScale}
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
          >
            Book This Service
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
}
