import Link from "next/link";
import {
  Phone,
  FileText,
  Clock,
  CreditCard,
  Heart,
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GoogleFormEmbed } from "@/components/GoogleFormEmbed";

export const metadata = buildMetadata({
  title: "Book a Session",
  description:
    "Book a therapy session or free discovery call with Aishani Paul. View fees, cancellation policy, and start your journey to better mental health.",
  path: "/book",
});

const steps = [
  {
    icon: Phone,
    title: "1. Free Discovery Call",
    description:
      "Book a free 15-minute call so we can discuss your needs and see if we're a good fit.",
  },
  {
    icon: FileText,
    title: "2. Intake Form",
    description:
      "Complete a brief intake form with background information to help me prepare for our first session.",
  },
  {
    icon: Clock,
    title: "3. First Session",
    description:
      "Your first session (50 minutes) is an assessment where we explore your concerns and create a plan together.",
  },
];

export default function BookPage() {
  const discoveryUrl = siteConfig.discoveryCallUrl;
  const hasDiscovery = discoveryUrl && !discoveryUrl.startsWith("[");

  const sessionUrl = siteConfig.sessionBookingUrl;
  const hasSession = sessionUrl && !sessionUrl.startsWith("[");

  const intakeWaUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I've just submitted my intake form for Ms Paul Therapies and would like to book a session."
  )}`;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ name: "Book a Session", href: "/book" }]} />

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
        Book a Session
      </h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Taking the first step is often the hardest part - and I&apos;m here to
        make it as easy as possible.
      </p>

      {/* How to get started */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          How to Get Started
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-cream p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brown">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Call CTA */}
      <section className="mt-12 rounded-2xl border border-sage/30 bg-sage/5 p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Not sure yet? Start with a free call.
        </h2>
        <p className="mt-2 text-muted-foreground">
          A 15-minute discovery call - no pressure, no commitment.
        </p>
        {hasDiscovery ? (
          <a
            href={discoveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            Book Discovery Call
          </a>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Discovery call link coming soon. In the meantime, reach out at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sage underline hover:text-sage-dark"
            >
              {siteConfig.email}
            </a>
          </p>
        )}
      </section>

      {/* Intake Form */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Intake Form
        </h2>
        <p className="mt-2 text-muted-foreground mb-6">
          Please fill out this brief form before your first session.
        </p>
        <GoogleFormEmbed />
      </section>

      {/* After intake: what happens next */}
      <section className="mt-8 rounded-2xl border border-sage/30 bg-sage/5 p-8">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Submitted your intake form? Here&apos;s what happens next.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Choose whichever feels right for you:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Option 1: book now */}
          <div className="rounded-xl border border-border bg-white p-6 flex flex-col">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-brown">
              Book your session now
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              Pick a time that suits you and we&apos;ll confirm your session
              straight away.
            </p>
            {hasSession ? (
              <a
                href={sessionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
              >
                <CalendarCheck className="h-4 w-4" />
                Book on Cal.com
              </a>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Booking link coming soon - I&apos;ll be in touch after your form.
              </p>
            )}
          </div>

          {/* Option 2: wait to be contacted */}
          <div className="rounded-xl border border-border bg-white p-6 flex flex-col">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-brown">
              Prefer to wait?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
              No problem. Once I receive your intake form, I&apos;ll personally
              reach out over email or WhatsApp to find a time together.
            </p>
            <a
              href={intakeWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-sage px-5 py-2.5 text-sm font-semibold text-sage-dark hover:bg-sage/10 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Message me instead
            </a>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Session Fees
        </h2>
        <div className="mt-6 rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cream">
                <th className="px-6 py-3 text-left font-semibold text-brown">
                  Service
                </th>
                <th className="px-6 py-3 text-left font-semibold text-brown">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.entries(siteConfig.fees).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-3 text-brown-light capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-6 py-3 text-brown-light">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Package highlight */}
        <div className="mt-6 rounded-2xl border border-sage/30 bg-sage/5 p-5 flex items-start gap-3">
          <CreditCard className="h-5 w-5 mt-0.5 shrink-0 text-sage" />
          <div>
            <p className="font-semibold text-brown">Package Deal</p>
            <p className="text-sm text-brown-light">
              {siteConfig.fees.package} - a great option if you&apos;re
              committing to regular sessions.
            </p>
          </div>
        </div>

        {/* Sliding scale */}
        <div className="mt-6 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5 flex items-start gap-3">
          <Heart className="h-5 w-5 mt-0.5 shrink-0 text-terracotta" />
          <div>
            <p className="font-semibold text-brown">Sliding Scale</p>
            <p className="text-sm text-brown-light">
              {siteConfig.slidingScale}
            </p>
          </div>
        </div>

        {/* Payment info */}
        <div className="mt-4 rounded-2xl border border-border bg-cream p-5">
          <h3 className="font-semibold text-brown mb-2">Payment</h3>
          <p className="text-sm text-brown-light">
            Payment is due at the time of the session via UPI.
          </p>
          <p className="mt-2 text-sm text-brown-light">
            <strong>UPI ID:</strong>{" "}
            <code className="bg-white px-2 py-0.5 rounded text-sage-dark border border-border">
              {siteConfig.upiId}
            </code>
          </p>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Cancellation Policy
        </h2>
        <p className="mt-3 text-brown-light leading-relaxed">
          {siteConfig.cancellationPolicy}
        </p>
      </section>

      {/* Emergency Disclaimer */}
      <section className="mt-12 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-terracotta" />
          <div>
            <h3 className="font-semibold text-brown">
              This is not an emergency service
            </h3>
            <p className="mt-1 text-sm text-brown-light leading-relaxed">
              If you or someone you know is in immediate danger, please call
              emergency services (112) or visit your nearest emergency room.{" "}
              <Link
                href="/emergency-resources"
                className="text-terracotta underline hover:text-terracotta-dark"
              >
                View emergency resources
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
