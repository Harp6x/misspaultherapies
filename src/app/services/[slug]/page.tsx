import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Clock, CreditCard } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getAllServices, getServiceBySlug, getSiteConfig } from "@/lib/data";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";

export const revalidate = false;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo?.metaTitle || `${service.title} - Online ${service.title} in India`,
    description: service.seo?.metaDescription || service.description,
    path: `/services/${service.slug}`,
    ogImage: service.seo?.ogImageUrl,
    noIndex: service.seo?.noIndex,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, config] = await Promise.all([getServiceBySlug(slug), getSiteConfig()]);
  if (!service) notFound();

  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? LucideIcons.Sparkles;

  return (
    <>
      <SEOJsonLd
        data={serviceJsonLd({
          title: service.title,
          description: service.description,
          slug: service.slug,
          fee: service.fee,
        })}
      />
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Services", href: "/services" },
            { name: service.title, href: `/services/${service.slug}` },
          ]}
        />

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="bg-sage/10 text-sage flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
            <IconComponent className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
              {service.title}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Ideal for */}
          <div className="border-border bg-cream rounded-2xl border p-6">
            <h2 className="text-brown mb-4 font-serif text-xl font-semibold">Ideal For</h2>
            <ul className="space-y-2">
              {service.idealFor.map((item) => (
                <li key={item} className="text-brown-light flex items-start gap-2 text-sm">
                  <Check className="text-sage mt-0.5 h-4 w-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="border-border bg-cream rounded-2xl border p-6">
            <h2 className="text-brown mb-4 font-serif text-xl font-semibold">What to Expect</h2>
            <ul className="space-y-2">
              {service.highlights.map((item) => (
                <li key={item} className="text-brown-light flex items-start gap-2 text-sm">
                  <Check className="text-sage mt-0.5 h-4 w-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Approach */}
        <section className="mt-12">
          <h2 className="text-brown font-serif text-2xl font-semibold">My Approach</h2>
          <p className="text-brown-light mt-3 leading-relaxed">{service.approach}</p>
        </section>

        {/* Practical info */}
        <section className="border-border mt-12 rounded-2xl border bg-white p-6">
          <h2 className="text-brown mb-4 font-serif text-xl font-semibold">
            Practical Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="text-brown-light flex items-center gap-3 text-sm">
              <Clock className="text-sage h-5 w-5" />
              <span>
                <strong>Duration:</strong> {config.sessionDuration}
              </span>
            </div>
            <div className="text-brown-light flex items-center gap-3 text-sm">
              <CreditCard className="text-sage h-5 w-5" />
              <span>
                <strong>Fee:</strong> {service.fee}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">{config.slidingScale}</p>
        </section>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/book"
            className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
          >
            Book This Service
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
}
