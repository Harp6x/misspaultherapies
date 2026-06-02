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
        Last updated: June 2026
      </p>

      <div className="mt-8 space-y-8 text-brown-light leading-relaxed">
        {/* Terms */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Terms of Service
          </h2>
          <p className="mt-3">
            By using this website and engaging with {siteConfig.name}, you
            agree to the following terms:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              Services are provided by {siteConfig.author}, a clinical
              psychologist registered with the Rehabilitation Council of India
              (Registration No. {siteConfig.rciNumber}).
            </li>
            <li>
              All sessions are conducted online via secure video conferencing.
            </li>
            <li>
              This is not an emergency or crisis service. If you are in crisis or
              at risk, use the helpline numbers below or call 112.
            </li>
            <li>
              Content on this website is for informational and educational
              purposes only and does not constitute medical advice or replace
              professional clinical consultation.
            </li>
            <li>
              These terms are governed by the laws of India, and any disputes are
              subject to the jurisdiction of the courts at the practitioner&apos;s
              place of practice.
            </li>
          </ul>
        </section>

        {/* Crisis resources */}
        <section className="rounded-2xl border border-sage/30 bg-sage/5 p-6">
          <h2 className="font-serif text-xl font-semibold text-brown">
            In Crisis? Immediate Help
          </h2>
          <p className="mt-3 text-sm">
            If you or someone else is in danger or experiencing a mental health
            emergency, please reach out right away:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm">
            <li>Emergency services: 112</li>
            <li>Tele-MANAS (Govt. of India mental health): 14416</li>
            <li>Vandrevala Foundation: 9999 666 555</li>
            <li>iCall (TISS): 9152987821</li>
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
              are accessible only to {siteConfig.author}.
            </li>
          </ul>
        </section>

        {/* Teletherapy Consent Addendum */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Teletherapy (Online Sessions) Consent
          </h2>
          <p className="mt-3">
            Because sessions are conducted online, you also acknowledge and agree
            that:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Technology:</strong> Sessions use a secure, encrypted video
              platform. Online communication carries inherent risks (for example,
              technical failures or connectivity issues) despite reasonable
              safeguards.
            </li>
            <li>
              <strong>If a call drops:</strong> If the connection is lost, we will
              attempt to reconnect on the same platform, and if that fails, by
              phone. Please keep your phone accessible during sessions.
            </li>
            <li>
              <strong>No recording:</strong> Sessions are not recorded by either
              party without the prior written consent of both.
            </li>
            <li>
              <strong>Your environment:</strong> You agree to attend from a
              private, quiet, and safe location and to confirm your physical
              location at the start of each session, so that help can be directed
              appropriately in an emergency.
            </li>
            <li>
              <strong>Emergency contact:</strong> You agree to provide an
              emergency contact and your current location at intake. Teletherapy
              may not be appropriate for acute crisis or high-risk situations,
              which may require in-person or local emergency care.
            </li>
          </ul>
        </section>

        {/* Data Consent */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            Data & Privacy Consent
          </h2>
          <p className="mt-3">
            By engaging our services you consent to the collection and processing
            of your personal and clinical data as described in our{" "}
            <Link
              href="/privacy-policy"
              className="text-sage underline hover:text-sage-dark"
            >
              Privacy Policy
            </Link>
            , in line with India&apos;s Digital Personal Data Protection Act,
            2023. You may withdraw this consent at any time, subject to clinical
            and legal record-keeping requirements.
          </p>
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
              case-by-case basis - please communicate as soon as possible.
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
          These terms are provided in good faith and reflect current practice.
          They are not legal advice; we recommend a qualified legal professional
          review them for your specific circumstances.
        </p>
      </div>
    </div>
  );
}
