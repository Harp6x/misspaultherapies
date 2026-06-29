import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Brain, Lightbulb, MessageCircle } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import {
  getAllServices,
  getAllBlogPosts,
  getTestimonials,
  getSiteConfig,
  getAboutPage,
} from "@/lib/data";
import { getFeaturedGalleryItems } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { MediaEmbed } from "@/components/MediaEmbed";
import { CTASection } from "@/components/CTASection";
import { TrustBar } from "@/components/TrustBar";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { buildMetadata, organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const revalidate = false;

export const metadata = buildMetadata({
  title: "Online Therapy & Counselling in India",
  description:
    "Book online therapy with Aishani Paul, RCI-licensed clinical psychologist. Individual, couples, adolescent & family therapy across India and for NRIs abroad. Free 15-min discovery call.",
  path: "",
});

const painPoints = [
  {
    icon: Brain,
    title: "Overwhelmed by anxiety or stress",
    description: "Racing thoughts, constant worry, or a feeling of dread that won't go away.",
  },
  {
    icon: Heart,
    title: "Struggling in your relationships",
    description:
      "Communication breakdowns, trust issues, or feeling disconnected from people you love.",
  },
  {
    icon: Lightbulb,
    title: "Feeling lost or stuck in life",
    description:
      "Major transitions, identity questions, or a sense that something needs to change.",
  },
  {
    icon: MessageCircle,
    title: "Carrying pain you can't talk about",
    description: "Grief, trauma, or experiences you haven't had a safe space to process.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Book a Discovery Call",
    description: "A free 15-minute call to discuss your needs and see if we're the right fit.",
  },
  {
    step: 2,
    title: "Begin Your Journey",
    description: "Schedule your first session online - from anywhere in India or abroad.",
  },
  {
    step: 3,
    title: "Grow at Your Pace",
    description: "Work together in a safe, supportive space toward meaningful, lasting change.",
  },
];

export default async function Home() {
  const [services, blogPosts, testimonials, featuredMedia, config, aboutPage] = await Promise.all([
    getAllServices(),
    getAllBlogPosts(),
    getTestimonials(),
    getFeaturedGalleryItems().catch(() => []),
    getSiteConfig(),
    getAboutPage(),
  ]);

  const heroSlides = config.heroSlides.filter((s) => s.imageUrl);
  const branding = {
    name: config.name,
    tagline: config.tagline,
    description: config.description,
  };
  const howItWorksBgUrl = config.howItWorksBgUrl ?? null;
  const therapistPhotoUrl = aboutPage?.photo
    ? urlFor(aboutPage.photo).width(600).height(750).fit("crop").url()
    : null;

  return (
    <>
      <SEOJsonLd data={organizationJsonLd(config)} />
      <SEOJsonLd data={websiteJsonLd(config)} />
      <SEOJsonLd data={localBusinessJsonLd(config)} />

      {/* ── Hero ── */}
      {heroSlides.length > 0 ? (
        <HeroSlideshow slides={heroSlides} branding={branding} />
      ) : (
        <section className="from-cream to-cream-dark relative overflow-hidden bg-gradient-to-b">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-brown font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {branding.tagline}
              </h1>
              <p className="text-brown-light mt-6 text-lg leading-relaxed sm:text-xl">
                {branding.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/book"
                  className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="border-sage/30 text-sage-dark hover:bg-sage/5 inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors"
                >
                  Learn About My Approach
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Trust Bar ── */}
      <TrustBar rciNumber={config.rciNumber} />

      {/* ── Pain Points ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
              You May Be Here Because...
            </h2>
            <p className="text-muted-foreground mt-3">
              Whatever brought you here, you don&apos;t have to face it alone.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="border-border bg-cream rounded-2xl border p-6 text-center"
              >
                <div className="bg-sage/10 text-sage mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="text-brown font-serif text-lg font-semibold">{point.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Therapist ── */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
            {/* Photo */}
            {therapistPhotoUrl && (
              <div className="flex justify-center lg:col-span-2 lg:justify-start">
                <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={therapistPhotoUrl}
                    alt={`${config.author}, Clinical Psychologist`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                  />
                </div>
              </div>
            )}
            {/* Text */}
            <div
              className={
                therapistPhotoUrl ? "lg:col-span-3" : "mx-auto max-w-3xl text-center lg:col-span-5"
              }
            >
              <p className="text-sage mb-3 font-sans text-sm tracking-[0.3em] uppercase">
                About Your Therapist
              </p>
              <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
                Hi, I&apos;m {config.author}
              </h2>
              <p className="text-brown-light mt-4 leading-relaxed">
                {aboutPage?.bioParagraph1 ||
                  `I\'m a ${config.qualifications.join(", ").toLowerCase()} with a passion for helping people navigate life\'s challenges with greater clarity and compassion.`}
              </p>
              {aboutPage?.bioParagraph2 && (
                <p className="text-brown-light mt-3 leading-relaxed">{aboutPage.bioParagraph2}</p>
              )}
              {/* Credentials */}
              {aboutPage?.credentials && aboutPage.credentials.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {aboutPage.credentials.slice(0, 4).map((c: { icon: string; label: string }) => (
                    <span
                      key={c.label}
                      className="bg-sage/10 text-sage-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <Link
                  href="/about"
                  className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  Read more about me <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">How I Can Help</h2>
            <p className="text-muted-foreground mt-3">
              Specialised therapy services tailored to your needs.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How Therapy Works ── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {howItWorksBgUrl ? (
          <>
            <Image
              src={howItWorksBgUrl}
              alt=""
              fill
              aria-hidden
              className="object-cover opacity-15"
              sizes="100vw"
            />
            <div className="bg-cream/80 absolute inset-0" />
          </>
        ) : (
          <div className="bg-cream absolute inset-0" />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-muted-foreground mt-3">
              Getting started is simple — and you&apos;re in control every step of the way.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-sage mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full font-serif text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-brown font-serif text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
                What Clients Say
              </h2>
              <p className="text-muted-foreground mt-3 text-sm">Shared with client consent.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Blog Preview ── */}
      {config.pageVisibility.blog && blogPosts.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
                Resources & Insights
              </h2>
              <p className="text-muted-foreground mt-3">
                Articles on mental health, relationships, and well-being.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-border rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="bg-sage/10 text-sage inline-block rounded-full px-3 py-1 text-xs font-medium">
                    {post.category}
                  </span>
                  <h3 className="text-brown group-hover:text-sage-dark mt-3 font-serif text-lg font-semibold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <p className="text-sage mt-3 text-xs font-medium">
                    {post.readingTime} &middot; Read article &rarr;
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Media ── */}
      {config.pageVisibility.gallery && featuredMedia.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
                Latest Reels &amp; Videos
              </h2>
              <p className="text-muted-foreground mt-3">
                Tips, insights, and conversations on mental health.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredMedia.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="border-border bg-cream overflow-hidden rounded-2xl border"
                >
                  {item.url && (
                    <div className="p-4">
                      <MediaEmbed type={item.type} url={item.url} />
                    </div>
                  )}
                  <div className="px-4 pb-4">
                    <h3 className="text-brown font-serif text-base font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/gallery"
                className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                View full gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Connect ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-brown font-serif text-3xl font-bold sm:text-4xl">
            Follow {config.handle}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Mental health tips, insights, and behind-the-scenes of my practice. Connect with me on
            your favourite platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={config.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-sage bg-sage/5 text-sage-dark hover:bg-sage flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors hover:text-white"
            >
              <SocialIcon name="instagram" className="h-5 w-5" />
              Instagram
            </a>
            <a
              href={config.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="border-sage bg-sage/5 text-sage-dark hover:bg-sage flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors hover:text-white"
            >
              <SocialIcon name="youtube" className="h-5 w-5" />
              YouTube
            </a>
            <a
              href={config.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-sage bg-sage/5 text-sage-dark hover:bg-sage flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors hover:text-white"
            >
              <SocialIcon name="linkedin" className="h-5 w-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTASection />
    </>
  );
}
