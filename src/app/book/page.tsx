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
    `Hi, I've just submitted my intake form for ${config.name} and would like to book a session.`
  )}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Book a Session", href: "/book" }]} />

      <h1 className="text-brown font-serif text-4xl font-bold sm:text-5xl">Book a Session</h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        Taking the first step is often the hardest part - and I&apos;m here to make it as easy as
        possible.
      </p>

      {/* How to get started */}
      <section className="mt-12">
        <h2 className="text-brown font-serif text-2xl font-semibold">How to Get Started</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="border-border bg-cream rounded-2xl border p-6 text-center"
            >
              <div className="bg-sage/10 text-sage mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-brown font-serif text-lg font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Call CTA */}
      <section className="border-sage/30 bg-sage/5 mt-12 rounded-2xl border p-8 text-center">
        <h2 className="text-brown font-serif text-2xl font-semibold">
          Not sure yet? Start with a free call.
        </h2>
        <p className="text-muted-foreground mt-2">
          A 15-minute discovery call - no pressure, no commitment.
        </p>
        {hasDiscovery ? (
          <a
            href={discoveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sage hover:bg-sage-dark mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
          >
            <Phone className="h-4 w-4" />
            Book Discovery Call
          </a>
        ) : (
          <p className="text-muted-foreground mt-4 text-sm">
            Discovery call link coming soon. In the meantime, reach out at{" "}
            <a href={`mailto:${config.email}`} className="text-sage hover:text-sage-dark underline">
              {config.email}
            </a>
          </p>
        )}
      </section>

      {/* Payment - pay first to confirm the booking */}
      <section className="border-sage/40 bg-sage/5 mt-12 rounded-2xl border-2 p-8">
        <div className="flex items-center gap-2">
          <IndianRupee className="text-sage-dark h-6 w-6" />
          <h2 className="text-brown font-serif text-2xl font-semibold">
            Pay to confirm your session
          </h2>
        </div>
        <p className="text-muted-foreground mt-2">
          Payment confirms your booking. Please pay before completing the intake form and booking
          your slot below. Your fee depends on the service - see the full list further down this
          page.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Pay online + UPI details */}
          <div className="border-border rounded-xl border bg-white p-6">
            <h3 className="text-brown font-serif text-lg font-semibold">Pay online</h3>
            {hasRazorpay ? (
              <a
                href={config.razorpayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sage hover:bg-sage-dark mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Pay securely via Razorpay
              </a>
            ) : (
              <p className="text-muted-foreground mt-3 text-sm">
                Card / net-banking payments are coming soon. For now, please pay via UPI using the
                details here.
              </p>
            )}
            <div className="text-brown-light mt-5 space-y-2 text-sm">
              <p>
                <strong>UPI ID:</strong>{" "}
                <code className="bg-cream text-sage-dark border-border rounded border px-2 py-0.5">
                  {config.upiId}
                </code>
              </p>
              {config.upiNumber ? (
                <p>
                  <strong>UPI number:</strong>{" "}
                  <code className="bg-cream text-sage-dark border-border rounded border px-2 py-0.5">
                    {config.upiNumber}
                  </code>
                </p>
              ) : null}
            </div>
          </div>

          {/* Scan to pay - QR */}
          <div className="border-border rounded-xl border bg-white p-6">
            <div className="flex items-center gap-2">
              <QrCode className="text-sage h-5 w-5" />
              <h3 className="text-brown font-serif text-lg font-semibold">Scan to pay (UPI)</h3>
            </div>
            {hasQr ? (
              <div className="mt-4 flex justify-center">
                <Image
                  src={config.upiQrCodeUrl}
                  alt={`UPI QR code for ${config.name}`}
                  width={220}
                  height={220}
                  className="border-border rounded-lg border"
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm">
                QR code coming soon - please use the UPI ID or number to pay.
              </p>
            )}
          </div>
        </div>

        <div className="border-sage/30 text-brown-light mt-6 rounded-xl border bg-white p-5 text-sm">
          <strong className="text-brown">After paying:</strong> complete the intake form below, then
          book your slot on Cal.com or message me on WhatsApp with your payment screenshot so I can
          confirm your session.
        </div>
      </section>

      {/* Intake Form */}
      <section className="mt-12">
        <h2 className="text-brown font-serif text-2xl font-semibold">Intake Form</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          After payment, please complete this brief form before your first session.
        </p>
        <GoogleFormEmbed url={config.googleFormUrl} />
      </section>

      {/* After intake: what happens next */}
      <section className="border-sage/30 bg-sage/5 mt-8 rounded-2xl border p-8">
        <h2 className="text-brown font-serif text-2xl font-semibold">
          Submitted your intake form? Here&apos;s what happens next.
        </h2>
        <p className="text-muted-foreground mt-2">Choose whichever feels right for you:</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Option 1: book now */}
          <div className="border-border flex flex-col rounded-xl border bg-white p-6">
            <div className="bg-sage/10 text-sage mb-3 flex h-11 w-11 items-center justify-center rounded-xl">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <h3 className="text-brown font-serif text-lg font-semibold">Book your session now</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              Pick a time that suits you and we&apos;ll confirm your session straight away.
            </p>
            {hasSession ? (
              <a
                href={sessionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sage hover:bg-sage-dark mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                <CalendarCheck className="h-4 w-4" />
                Book on Cal.com
              </a>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm">
                Booking link coming soon - I&apos;ll be in touch after your form.
              </p>
            )}
          </div>

          {/* Option 2: wait to be contacted */}
          <div className="border-border flex flex-col rounded-xl border bg-white p-6">
            <div className="bg-terracotta/10 text-terracotta mb-3 flex h-11 w-11 items-center justify-center rounded-xl">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="text-brown font-serif text-lg font-semibold">Prefer to wait?</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              No problem. Once I receive your intake form, I&apos;ll personally reach out over email
              or WhatsApp to find a time together.
            </p>
            <a
              href={intakeWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-sage text-sage-dark hover:bg-sage/10 mt-4 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Message me instead
            </a>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="mt-12">
        <h2 className="text-brown font-serif text-2xl font-semibold">Session Fees</h2>
        <div className="border-border mt-6 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-cream border-b">
                <th className="text-brown px-6 py-3 text-left font-semibold">Service</th>
                <th className="text-brown px-6 py-3 text-left font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {Object.entries(config.fees).map(([key, value]) => (
                <tr key={key}>
                  <td className="text-brown-light px-6 py-3 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="text-brown-light px-6 py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Package highlight */}
        <div className="border-sage/30 bg-sage/5 mt-6 flex items-start gap-3 rounded-2xl border p-5">
          <CreditCard className="text-sage mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-brown font-semibold">Package Deal</p>
            <p className="text-brown-light text-sm">
              {config.fees.package} - a great option if you&apos;re committing to regular sessions.
            </p>
          </div>
        </div>

        {/* Sliding scale */}
        <div className="border-terracotta/30 bg-terracotta/5 mt-6 flex items-start gap-3 rounded-2xl border p-5">
          <Heart className="text-terracotta mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-brown font-semibold">Sliding Scale</p>
            <p className="text-brown-light text-sm">{config.slidingScale}</p>
          </div>
        </div>

        {/* Payment note - full options are in the payment section above */}
        <p className="text-muted-foreground mt-4 text-sm">
          Payment is required to confirm your session - see the payment options near the top of this
          page.
        </p>
      </section>

      {/* Cancellation Policy */}
      <section className="mt-12">
        <h2 className="text-brown font-serif text-2xl font-semibold">Cancellation Policy</h2>
        <p className="text-brown-light mt-3 leading-relaxed">{config.cancellationPolicy}</p>
      </section>

      {/* Emergency Disclaimer */}
      <section className="border-terracotta/30 bg-terracotta/5 mt-12 rounded-2xl border p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-terracotta mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h3 className="text-brown font-semibold">This is not an emergency service</h3>
            <p className="text-brown-light mt-1 text-sm leading-relaxed">
              If you or someone you know is in immediate danger, please call emergency services
              (112) or visit your nearest emergency room.{" "}
              <Link
                href="/emergency-resources"
                className="text-terracotta hover:text-terracotta-dark underline"
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
