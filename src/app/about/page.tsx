import Image from "next/image";
import { Award } from "lucide-react";
import { urlFor } from "@/sanity/image";
import * as LucideIcons from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getAboutPage } from "@/lib/data";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";
import { SocialIcon } from "@/components/SocialIcon";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "About Aishani Paul — Licensed Clinical Psychologist | Online Therapy India",
  description:
    "Meet Aishani Paul (M.Phil Clinical Psychology, RCI Licensed) — compassionate, culturally sensitive online therapy for individuals, couples & families across India and NRIs abroad.",
  path: "/about",
});

function Icon({ name, className }: { name: string; className?: string }) {
  const Comp =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    LucideIcons.Sparkles;
  return <Comp className={className} />;
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <SEOJsonLd data={personJsonLd()} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
              {about.title}
            </h1>
            <p className="mt-6 text-lg text-brown-light leading-relaxed">
              {about.bioParagraph1}
            </p>
            <p className="mt-4 text-brown-light leading-relaxed">
              {about.bioParagraph2}
            </p>
            <p className="mt-4 text-brown-light leading-relaxed">
              {about.bioParagraph3}
            </p>

            {/* Credentials */}
            <div className="mt-8 flex flex-wrap gap-3">
              {about.credentials.map((c) => (
                <div
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-2 text-sm text-sage-dark"
                >
                  <Icon name={c.icon} className="h-4 w-4" />
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-sage/10 overflow-hidden flex items-center justify-center aspect-[3/4]">
            {about.photo?.asset ? (
              <Image
                src={urlFor(about.photo).width(500).height(667).fit("crop").url()}
                alt={about.photo.alt ?? `${siteConfig.author} — Clinical Psychologist & Psychotherapist`}
                width={500}
                height={667}
                className="rounded-2xl object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="text-center p-8">
                <Award className="h-16 w-16 text-sage mx-auto mb-4" />
                <p className="font-serif text-xl font-semibold text-brown">{siteConfig.author}</p>
                <p className="text-sm text-muted-foreground mt-2">Clinical Psychologist &amp; Psychotherapist</p>
              </div>
            )}
          </div>
        </div>

        {/* My Approach */}
        <section className="mt-20">
          <h2 className="font-serif text-3xl font-bold text-brown text-center">
            My Approach
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-center text-muted-foreground leading-relaxed">
            {about.approachIntro}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {about.values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-cream p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-brown">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="mt-20 text-center">
          <h2 className="font-serif text-3xl font-bold text-brown">
            Languages
          </h2>
          <p className="mt-4 text-muted-foreground">
            {about.languagesText.replace("{languages}", siteConfig.languages.join(", "))}
          </p>
        </section>

        {/* Connect */}
        <section className="mt-20">
          <h2 className="font-serif text-3xl font-bold text-brown text-center">
            {about.connectHeading}
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            {about.connectText}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {about.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-sage/10 px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage/20 transition-colors"
              >
                <SocialIcon name={link.platform} className="h-5 w-5" />
                {link.platform}
              </a>
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </>
  );
}
