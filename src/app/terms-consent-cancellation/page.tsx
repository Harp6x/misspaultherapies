import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Terms, Consent & Cancellation Policy",
  description:
    "Terms of service, informed consent, and cancellation policy for therapy sessions with Aishani Paul.",
  path: "/terms-consent-cancellation",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          {
            name: "Terms, Consent & Cancellation",
            href: "/terms-consent-cancellation",
          },
        ]}
      />

      <h1 className="font-serif text-4xl font-bold text-brown">
        Terms, Consent & Cancellation Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: January 2025
      </p>

      <div className="mt-8 space-y-8 text-brown-light leading-relaxed">
        {/* Terms */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Terms of Service
          </h2>
          <p className="mt-3">
            By using this website and engaging with Ms Paul Therapies, you
            agree to the following terms:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              Services are provided by a licensed clinical psychologist
              registered with the Rehabilitation Council of India.
            </li>
            <li>
              All sessions are conducted online via secure video conferencing.
            </li>
            <li>
              This website does not constitute medical advice. For medical
              emergencies, call 112 or visit your nearest emergency room.
            </li>
            <li>
              Content on this website is for informational purposes and does not
              replace professional clinical consultation.
            </li>
          </ul>
        </section>

        {/* Informed Consent */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Informed Consent
          </h2>
          <p className="mt-3">
            Before beginning therapy, you will be asked to provide informed
            consent. This includes understanding:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Nature of therapy:</strong> Therapy involves open
              discussion of your concerns in a confidential setting. It may
              bring up uncomfortable emotions, which is a normal part of the
              process.
            </li>
            <li>
              <strong>Confidentiality:</strong> Everything discussed is
              confidential, with exceptions as required by law (imminent risk of
              harm, child abuse).
            </li>
            <li>
              <strong>Your rights:</strong> You have the right to ask questions,
              refuse any intervention, and terminate therapy at any time.
            </li>
            <li>
              <strong>Limitations:</strong> Therapy cannot guarantee specific
              outcomes. Progress depends on many factors including your
              engagement and circumstances.
            </li>
            <li>
              <strong>Records:</strong> Session notes are maintained securely and
              are accessible only to Aishani Paul.
            </li>
          </ul>
        </section>

        {/* Cancellation */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Cancellation & No-Show Policy
          </h2>
          <p className="mt-3">{siteConfig.cancellationPolicy}</p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Rescheduling:</strong> Sessions can be rescheduled with at
              least 24 hours&apos; notice, subject to availability.
            </li>
            <li>
              <strong>Late arrivals:</strong> If you arrive late, the session
              will still end at the scheduled time. The full fee applies.
            </li>
            <li>
              <strong>Emergencies:</strong> Genuine emergencies are handled on a
              case-by-case basis — please communicate as soon as possible.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Questions?
          </h2>
          <p className="mt-3">
            If you have questions about these terms, please contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sage underline hover:text-sage-dark"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <p className="text-xs text-muted-foreground italic">
          This is a placeholder document. Please have it reviewed by a legal
          professional before launching.
        </p>
      </div>
    </div>
  );
}
