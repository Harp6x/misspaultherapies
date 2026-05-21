import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Video,
  Globe,
  Heart,
  Brain,
  Lightbulb,
  MessageCircle,
  CalendarCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { siteConfig } from "@/lib/site-config";
import { getAllServices, getAllBlogPosts, getTestimonials } from "@/lib/data";
import { getFeaturedGalleryItems } from "@/sanity/fetch";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { MediaEmbed } from "@/components/MediaEmbed";
import { CTASection } from "@/components/CTASection";
import { TrustBar } from "@/components/TrustBar";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { buildMetadata, organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Online Therapy & Counselling in India — Ms Paul Therapies",
  description:
    "Book online therapy with Aishani Paul, RCI-licensed clinical psychologist. Individual, couples, adolescent & family therapy across India and for NRIs abroad. Free 15-min discovery call.",
  path: "",
});

const trustBadges = [
  { icon: Shield, label: "RCI Licensed" },
  { icon: Video, label: "100% Online" },
  { icon: Globe, label: "India & Abroad" },
];

const painPoints = [
  {
    icon: Brain,
    title: "Overwhelmed by anxiety or stress",
    description:
      "Racing thoughts, constant worry, or a feeling of dread that won't go away.",
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
    description:
      "Grief, trauma, or experiences you haven't had a safe space to process.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Book a Discovery Call",
    description:
      "A free 15-minute call to discuss your needs and see if we're the right fit.",
  },
  {
    step: 2,
    title: "Begin Your Journey",
    description:
      "Schedule your first session online — from anywhere in India or abroad.",
  },
  {
    step: 3,
    title: "Grow at Your Pace",
    description:
      "Work together in a safe, supportive space toward meaningful, lasting change.",
  },
];

export default async function Home() {
  const [services, blogPosts, testimonials, featuredMedia] = await Promise.all([
    getAllServices(),
    getAllBlogPosts(),
    getTestimonials(),
    getFeaturedGalleryItems().catch(() => []),
  ]);
  return (
    <>
      <SEOJsonLd data={organizationJsonLd()} />
      <SEOJsonLd data={websiteJsonLd()} />
      <SEOJsonLd data={localBusinessJsonLd()} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brown">
              Compassionate Therapy for{" "}
              <span className="text-sage">Meaningful Change</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brown-light leading-relaxed">
              Professional online psychotherapy and counselling — for
              individuals, couples, adolescents, and families across India and
              abroad.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
              >
                Book a Session
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 px-6 py-3 text-sm font-semibold text-sage-dark hover:bg-sage/5 transition-colors"
              >
                Learn About My Approach
              </Link>
            </div>
            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <badge.icon className="h-4 w-4 text-sage" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Pain Points ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              You May Be Here Because...
            </h2>
            <p className="mt-3 text-muted-foreground">
              Whatever brought you here, you don&apos;t have to face it alone.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-border bg-cream p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-brown">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown text-center">
              Hi, I&apos;m Aishani Paul
            </h2>
            <p className="mt-4 text-brown-light leading-relaxed text-center">
              I&apos;m a{" "}
              {siteConfig.qualifications.join(", ").toLowerCase()} with a
              passion for helping people navigate life&apos;s challenges with
              greater clarity and compassion.
            </p>
            <p className="mt-3 text-brown-light leading-relaxed text-center">
              I believe therapy should be a warm, non-judgmental space where
              you feel truly heard. My integrative approach combines
              evidence-based techniques with cultural sensitivity — because
              your background and experiences matter.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
              >
                Read more about me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              How I Can Help
            </h2>
            <p className="mt-3 text-muted-foreground">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How Therapy Works ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Getting started is simple — and you&apos;re in control every step
              of the way.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white font-serif text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-brown">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              What Clients Say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Placeholder testimonials — real testimonials will be added with
              client consent.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
              Resources & Insights
            </h2>
            <p className="mt-3 text-muted-foreground">
              Articles on mental health, relationships, and well-being.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage">
                  {post.category}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-brown group-hover:text-sage-dark transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <p className="mt-3 text-xs text-sage font-medium">
                  {post.readingTime} &middot; Read article &rarr;
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
            >
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Media ── */}
      {featuredMedia.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
                Latest Reels &amp; Videos
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tips, insights, and conversations on mental health.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredMedia.slice(0, 6).map((item) => (
                <div key={item._id} className="rounded-2xl border border-border bg-cream overflow-hidden">
                  {item.url && <div className="p-4"><MediaEmbed type={item.type} url={item.url} /></div>}
                  <div className="px-4 pb-4">
                    <h3 className="font-serif text-base font-semibold text-brown">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
              >
                View full gallery <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Connect ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown">
            Follow @mspaultherapies
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Mental health tips, insights, and behind-the-scenes of my practice.
            Connect with me on your favourite platform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-sage bg-sage/5 px-6 py-3 text-sm font-semibold text-sage-dark hover:bg-sage hover:text-white transition-colors"
            >
              <SocialIcon name="instagram" className="h-5 w-5" />
              Instagram
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-sage bg-sage/5 px-6 py-3 text-sm font-semibold text-sage-dark hover:bg-sage hover:text-white transition-colors"
            >
              <SocialIcon name="youtube" className="h-5 w-5" />
              YouTube
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border-2 border-sage bg-sage/5 px-6 py-3 text-sm font-semibold text-sage-dark hover:bg-sage hover:text-white transition-colors"
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
