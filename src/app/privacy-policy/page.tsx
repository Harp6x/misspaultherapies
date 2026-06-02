import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. How we collect, use, and protect your information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <h1 className="font-serif text-4xl font-bold text-brown">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: June 2026
      </p>

      <div className="mt-8 prose prose-brown max-w-none space-y-6 text-brown-light leading-relaxed">
        <section>
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the practice
            of {siteConfig.author}, an RCI-licensed clinical psychologist
            (Registration No. {siteConfig.rciNumber}). This policy explains how we
            collect, use, store, and protect your personal data when you use this
            website or engage our services. We act as the Data Fiduciary for your
            personal data under India&apos;s Digital Personal Data Protection Act,
            2023 (the &ldquo;DPDP Act&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>
              <strong>Contact details:</strong> name, email, and phone number you
              provide via forms, email, WhatsApp, or booking.
            </li>
            <li>
              <strong>Intake and clinical information:</strong> details you share
              in intake forms and during sessions, and the clinical notes we
              maintain about your care.
            </li>
            <li>
              <strong>Booking information:</strong> appointment details collected
              through our scheduling tool.
            </li>
            <li>
              <strong>Payment information:</strong> processed by third-party
              payment providers; we do not store your card or bank details.
            </li>
            <li>
              <strong>Website usage data:</strong> cookies and analytics data
              about how you use the site (see Section 6).
            </li>
          </ul>
          <p className="text-sm">
            Mental-health information is sensitive personal data and is treated
            with the highest level of care and confidentiality.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            2. How We Use Your Information and Lawful Basis
          </h2>
          <p>We use your information, on the basis of your consent, to:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Provide therapy and related clinical services</li>
            <li>Schedule, confirm, and manage appointments</li>
            <li>Communicate with you about your care and enquiries</li>
            <li>Send resources or newsletters you have opted in to receive</li>
            <li>Meet legal, regulatory, and clinical record-keeping obligations</li>
          </ul>
          <p>
            We will never sell or rent your personal information. We do not use
            your clinical information for marketing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            3. Confidentiality and Its Limits
          </h2>
          <p>
            All therapeutic communications are strictly confidential, in line
            with RCI professional and ethical guidelines. We may disclose
            information only where required by law or to prevent serious harm,
            specifically: imminent risk of harm to yourself or others, suspected
            abuse or risk to a minor or vulnerable person, or a valid court order
            or legal requirement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            4. Service Providers (Data Processors)
          </h2>
          <p>
            We use trusted third-party services to operate the practice. They
            process data only on our instructions and under their own privacy
            terms:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Scheduling and video sessions (booking and teletherapy platform)</li>
            <li>Email delivery and newsletter management</li>
            <li>Website hosting, content management, and analytics</li>
            <li>Payment processing (UPI / payment gateway)</li>
          </ul>
          <p className="text-sm">
            Some providers may process data on servers outside India. We take
            reasonable steps to ensure your data is handled securely.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            5. Data Security
          </h2>
          <p>
            We take reasonable technical and organisational measures to protect
            your personal information, including access-controlled and encrypted
            storage of clinical records, secure communication channels, and
            password-protected systems. In the event of a personal data breach,
            we will take prompt action and notify affected individuals and
            authorities as required under the DPDP Act.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            6. Cookies and Analytics
          </h2>
          <p>
            This website may use cookies and analytics tools (such as Google
            Analytics) to understand how visitors use the site. No personally
            identifiable clinical information is collected through these tools.
            You can disable cookies in your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            7. Data Retention
          </h2>
          <p>
            We retain clinical records for the period required by professional
            best practice and applicable law, after which they are securely
            deleted. Enquiry and marketing data is kept only as long as needed for
            the purpose it was collected, or until you withdraw consent.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            8. Your Rights Under the DPDP Act
          </h2>
          <p>As a Data Principal, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or updating of inaccurate data</li>
            <li>Request erasure of your data, subject to legal and clinical retention requirements</li>
            <li>Withdraw consent for data processing at any time</li>
            <li>Nominate another individual to exercise your rights in case of death or incapacity</li>
            <li>Raise a grievance and seek redressal (see Section 10)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            9. Children and Adolescents
          </h2>
          <p>
            Where services are provided to a minor (under 18), we obtain
            verifiable consent from a parent or legal guardian before collecting
            or processing the minor&apos;s personal data, in line with the DPDP
            Act.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            10. Grievance and Contact
          </h2>
          <p>
            For any questions, requests, or grievances about your personal data,
            contact our Grievance point of contact, {siteConfig.author}, at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sage underline hover:text-sage-dark"
            >
              {siteConfig.email}
            </a>
            . We aim to respond to all requests within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            11. Updates to This Policy
          </h2>
          <p>
            We may update this policy from time to time. The &ldquo;last
            updated&rdquo; date above reflects the most recent revision.
          </p>
        </section>

        <p className="text-xs text-muted-foreground italic">
          This policy is provided in good faith and reflects current practice. It
          is not legal advice; we recommend a qualified legal professional review
          it for your specific circumstances.
        </p>
      </div>
    </div>
  );
}
