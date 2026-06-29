import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, IndianRupee } from "lucide-react";
import { getAllWorkshops, getWorkshopBySlug } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PortableTextBody } from "@/components/PortableTextBody";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";

export const revalidate = false;

export async function generateStaticParams() {
  const workshops = await getAllWorkshops();
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = await getWorkshopBySlug(slug);
  if (!workshop) return {};
  return buildMetadata({
    title: workshop.seo?.metaTitle ?? workshop.title,
    description: workshop.seo?.metaDescription ?? workshop.description,
    path: `/workshops/${workshop.slug}`,
    ogImage: workshop.seo?.ogImageUrl ?? workshop.coverImage?.asset?.url,
    noIndex: workshop.seo?.noIndex,
  });
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [workshop, config] = await Promise.all([getWorkshopBySlug(slug), getSiteConfig()]);
  if (!config.pageVisibility.workshops || !workshop) notFound();

  const canRegister = workshop.registrationUrl && !["completed", "sold-out"].includes(workshop.status);
  const workshopJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: workshop.title,
    description: workshop.description,
    startDate: workshop.date,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: workshop.status === "completed" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
    url: `${config.url}/workshops/${workshop.slug}`,
    image: workshop.coverImage?.asset?.url,
    organizer: { "@type": "Organization", name: config.name, url: config.url },
  };

  return (
    <>
      <SEOJsonLd data={workshopJsonLd} />
      <SEOJsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Workshops", href: "/workshops" }, { name: workshop.title, href: `/workshops/${workshop.slug}` }])} />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Workshops", href: "/workshops" }, { name: workshop.title, href: `/workshops/${workshop.slug}` }]} />
        <Link href="/workshops" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-sage hover:text-sage-dark"><ArrowLeft className="h-4 w-4" />All Workshops</Link>
        {workshop.coverImage?.asset?.url && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={workshop.coverImage.asset.url} alt={workshop.coverImage.alt ?? workshop.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" priority />
          </div>
        )}
        <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold capitalize text-sage-dark">{workshop.status.replaceAll("-", " ")}</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-brown sm:text-5xl">{workshop.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{workshop.description}</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-brown-light">
          {workshop.date && <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-sage" />{new Date(workshop.date).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</span>}
          {workshop.duration && <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-sage" />{workshop.duration}</span>}
          {workshop.fee && <span className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-sage" />{workshop.fee}</span>}
        </div>
        {workshop.body?.length ? <div className="mt-10"><PortableTextBody value={workshop.body} /></div> : null}
        {canRegister && (
          <a href={workshop.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white hover:bg-sage-dark">Register Now<ArrowRight className="h-4 w-4" /></a>
        )}
      </article>
      <CTASection />
    </>
  );
}
