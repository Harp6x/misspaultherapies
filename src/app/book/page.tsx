import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  FileText,
  Clock,
  CreditCard,
  Heart,
  AlertTriangle,
  CalendarCheck,
  MessageCircle,
  IndianRupee,
  QrCode,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GoogleFormEmbed } from "@/components/GoogleFormEmbed";
import { getSiteConfig } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Book a Session",
  description:
    "Book a therapy session or free discovery call with Aishani Paul. View fees, cancellation policy, and start your journey to better mental health.",
  path: "/book",
});

const steps = [
  {
    icon: Phone,
    title: "1. Free Discovery Call (optional)",
    description:
      "Book a free 15-minute call so we can discuss your needs and see if we're a good fit.",
  },
  {
    icon: CreditCard,
    title: "2. Pay for Your Session",
    description:
      "Payment confirms your booking. Pay securely via UPI or Razorpay before your session.",
  },
  {
    icon: FileText,
    title: "3. Intake Form",
    description:
      "Complete a brief intake form with background information to help me prepare for our first session.",
  },
  {
    icon: Clock,
    title: "4. First Session",
    description:
      "Your 50-minute session takes place online via Google Meet, where we explore your concerns together.",
  },
];

export default async function BookPage() {
  const config = await getSiteConfig();

  const discoveryUrl = config.discoveryCallUrl;
  const hasDiscovery = discoveryUrl && !discoveryUrl.startsWith("[");

  const sessionUrl = config.sessionBookingUrl;
  const hasSession = sessionUrl && !sessionUrl.startsWith("[");

  const hasRazorpay = Boolean(config.razorpayUrl);
  const hasQr = Boolean(config.upiQrCodeUrl);

  const intakeWaUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
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
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              href={`mailto:${config.email}`}
              className="text-sage underline hover:text-sage-dark"
            >
              {config.email}
            </a>
          </p>
        )}
      </section>

      {/* Payment - pay first to confirm the booking */}
      <section className="mt-12 rounded-2xl border-2 border-sage/40 bg-sage/5 p-8">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-6 w-6 text-sage-dark" />
          <h2 className="font-serif text-2xl font-semibold text-brown">
            Pay to confirm your session
          </h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          Payment confirms your booking. Please pay before completing the intake
          form and booking your slot below. Your fee depends on the service -
          see the full list further down this page.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Pay online + UPI details */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h3 className="font-serif text-lg font-semibold text-brown">
              Pay online
            </h3>
            {hasRazorpay ? (
              <a
                href={config.razorpayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Pay securely via Razorpay
              </a>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Card / net-banking payments are coming soon. For now, please pay
                via UPI using the details here.
              </p>
            )}
            <div className="mt-5 space-y-2 text-sm text-brown-light">
              <p>
                <strong>UPI ID:</strong>{" "}
                <code className="bg-cream px-2 py-0.5 rounded text-sage-dark border border-border">
                  {config.upiId}
                </code>
              </p>
              {config.upiNumber ? (
                <p>
                  <strong>UPI number:</strong>{" "}
                  <code className="bg-cream px-2 py-0.5 rounded text-sage-dark border border-border">
                    {config.upiNumber}
                  </code>
                </p>
              ) : null}
            </div>
          </div>

          {/* Scan to pay - QR */}
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-sage" />
              <h3 className="font-serif text-lg font-semibold text-brown">
                Scan to pay (UPI)
              </h3>
            </div>
            {hasQr ? (
              <div className="mt-4 flex justify-center">
                <Image
                  src={config.upiQrCodeUrl}
                  alt="UPI QR code for Ms Paul Therapies"
                  width={220}
                  height={220}
                  className="rounded-lg border border-border"
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                QR code coming soon - please use the UPI ID or number to pay.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-sage/30 bg-white p-5 text-sm text-brown-light">
          <strong className="text-brown">After paying:</strong> complete the
          intake form below, then book your slot on Cal.com or message me on
          WhatsApp with your payment screenshot so I can confirm your session.
        </div>
      </section>

      {/* Intake Form */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Intake Form
        </h2>
        <p className="mt-2 text-muted-foreground mb-6">
          After payment, please complete this brief form before your first
          session.
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
              {Object.entries(config.fees).map(([key, value]) => (
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
              {config.fees.package} - a great option if you&apos;re
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
              {config.slidingScale}
            </p>
          </div>
        </div>

        {/* Payment note - full options are in the payment section above */}
        <p className="mt-4 text-sm text-muted-foreground">
          Payment is required to confirm your session - see the payment options
          near the top of this page.
        </p>
      </section>

      {/* Cancellation Policy */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-brown">
          Cancellation Policy
        </h2>
        <p className="mt-3 text-brown-light leading-relaxed">
          {config.cancellationPolicy}
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
