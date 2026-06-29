import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { getAboutPage, getSiteConfig } from "@/lib/data";
import { buildMetadata, personJsonLd, profilePageJsonLd, speakableJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";
import { SocialIcon } from "@/components/SocialIcon";
import { urlFor } from "@/sanity/image";

export const revalidate = false;

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
  const [about, config] = await Promise.all([getAboutPage(), getSiteConfig()]);

  const photoUrl = about.photo
    ? urlFor(about.photo).width(600).height(750).fit("crop").url()
    : null;

  return (
    <>
      <SEOJsonLd data={personJsonLd(config)} />
      <SEOJsonLd data={profilePageJsonLd(config)} />
      <SEOJsonLd data={speakableJsonLd(["h1", ".about-bio", ".about-credentials"])} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

        {/* Intro: Photo left, Bio right */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-5">
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
          <div className={photoUrl ? "lg:col-span-3" : "mx-auto max-w-3xl lg:col-span-5"}>
            <h1 className="text-brown font-serif text-4xl font-bold sm:text-5xl">{about.title}</h1>
            <p className="text-brown-light mt-6 text-lg leading-relaxed">{about.bioParagraph1}</p>
            <p className="text-brown-light mt-4 leading-relaxed">{about.bioParagraph2}</p>
            <p className="text-brown-light mt-4 leading-relaxed">{about.bioParagraph3}</p>

            {/* Credentials */}
            <div className="mt-8 flex flex-wrap gap-3">
              {about.credentials.map((c) => (
                <div
                  key={c.label}
                  className="bg-sage/10 text-sage-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
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
                  className="bg-brown hover:bg-brown/90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors"
                >
                  <Icon name="FileText" className="h-4 w-4" />
                  View Resume
                </a>
                <a
                  href={`${about.resumeUrl}?dl=Aishani_Paul_Resume.pdf`}
                  className="border-brown text-brown hover:bg-brown/5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
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
          <h2 className="text-brown text-center font-serif text-3xl font-bold">My Approach</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center leading-relaxed">
            {about.approachIntro}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {about.values.map((v) => (
              <div
                key={v.title}
                className="border-border bg-cream rounded-2xl border p-6 text-center"
              >
                <div className="bg-sage/10 text-sage mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-brown font-serif text-lg font-semibold">{v.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {config.team.length > 0 && (
          <section className="mt-20">
            <h2 className="text-brown text-center font-serif text-3xl font-bold">Our Team</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {config.team.map((member) => (
                <article
                  key={member.name}
                  className="border-border overflow-hidden rounded-2xl border bg-white shadow-sm"
                >
                  {member.photoUrl && (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-brown font-serif text-xl font-semibold">{member.name}</h3>
                    <p className="text-sage text-sm font-medium">{member.role}</p>
                    {member.bio && (
                      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    {member.socialLinks?.length ? (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {member.socialLinks.map((social) => (
                          <a
                            key={social.url}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage hover:text-sage-dark text-sm font-medium"
                          >
                            {social.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        <section className="mt-20 text-center">
          <h2 className="text-brown font-serif text-3xl font-bold">Languages</h2>
          <p className="text-muted-foreground mt-4">
            {about.languagesText.replace("{languages}", config.languages.join(", "))}
          </p>
        </section>

        {/* Get in Touch */}
        <section className="mt-20">
          <h2 className="text-brown text-center font-serif text-3xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center leading-relaxed">
            Have a question or ready to start your journey? Reach out directly or fill in the
            contact form — I typically respond within 24–48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${config.email}`}
              className="bg-sage/10 text-sage-dark hover:bg-sage/20 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sage/10 text-sage-dark hover:bg-sage/20 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Contact Form
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Connect */}
        <section className="mt-20">
          <h2 className="text-brown text-center font-serif text-3xl font-bold">
            {about.connectHeading}
          </h2>
          <p className="text-muted-foreground mt-4 text-center">{about.connectText}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {about.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sage/10 text-sage-dark hover:bg-sage/20 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
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
