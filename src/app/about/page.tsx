import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getAboutPage } from "@/lib/data";
import { buildMetadata, personJsonLd, profilePageJsonLd, speakableJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";
import { SocialIcon } from "@/components/SocialIcon";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "About Aishani Paul, Licensed Clinical Psychologist | Online Therapy India",
  description:
    "Meet Aishani Paul (M.Phil Clinical Psychology, RCI Licensed). Compassionate, culturally sensitive online therapy for individuals, couples & families across India and NRIs abroad.",
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

  const photoUrl = about.photo
    ? urlFor(about.photo).width(600).height(750).fit("crop").url()
    : null;

  return (
    <>
      <SEOJsonLd data={personJsonLd()} />
      <SEOJsonLd data={profilePageJsonLd()} />
      <SEOJsonLd data={speakableJsonLd(["h1", ".about-bio", ".about-credentials"])} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

        {/* Intro: Photo left, Bio right */}
        <div className="mt-8 grid gap-10 lg:grid-cols-5 items-start">
          {/* Photo */}
          {photoUrl && (
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={photoUrl}
                  alt={about.photo?.alt || "Aishani Paul, Clinical Psychologist"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className={photoUrl ? "lg:col-span-3" : "lg:col-span-5 max-w-3xl mx-auto"}>
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

            {/* Resume */}
            {about.resumeUrl && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-white hover:bg-brown/90 transition-colors"
                >
                  <Icon name="FileText" className="h-4 w-4" />
                  View Resume
                </a>
                <a
                  href={`${about.resumeUrl}?dl=Aishani_Paul_Resume.pdf`}
                  className="inline-flex items-center gap-2 rounded-full border border-brown px-5 py-2.5 text-sm font-medium text-brown hover:bg-brown/5 transition-colors"
                >
                  <Icon name="Download" className="h-4 w-4" />
                  Download Resume
                </a>
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

        {/* Get in Touch */}
        <section className="mt-20">
          <h2 className="font-serif text-3xl font-bold text-brown text-center">
            Get in Touch
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-center text-muted-foreground leading-relaxed">
            Have a question or ready to start your journey? Reach out directly or
            fill in the contact form — I typically respond within 24–48 hours.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage/20 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
            >
              Contact Form
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
