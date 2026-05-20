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
        Last updated: January 2025
      </p>

      <div className="mt-8 prose prose-brown max-w-none space-y-6 text-brown-light leading-relaxed">
        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            1. Information We Collect
          </h2>
          <p>
            When you use this website or engage with our therapy services, we may
            collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Name and contact details (email, phone number)</li>
            <li>Information provided via intake forms</li>
            <li>Session notes (stored securely and confidentially)</li>
            <li>
              Website usage data (if analytics are enabled via cookies — see
              below)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            2. How We Use Your Information
          </h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Provide therapy and related services</li>
            <li>Schedule and manage appointments</li>
            <li>Communicate with you about your care</li>
            <li>Improve our website and services</li>
          </ul>
          <p>
            We will never sell, rent, or share your personal information with
            third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            3. Confidentiality
          </h2>
          <p>
            All therapeutic communications are strictly confidential, in line
            with professional ethical guidelines. Exceptions apply only where
            required by law — such as imminent risk of harm to yourself or
            others, or suspected child abuse.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            4. Cookies & Analytics
          </h2>
          <p>
            This website may use cookies and analytics tools (e.g. Google
            Analytics) to understand how visitors use the site. No personally
            identifiable therapy information is collected through these tools.
            You can disable cookies in your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            5. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your personal information,
            including secure storage of records, encrypted communication
            channels, and password-protected systems.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            6. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brown">
            7. Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at{" "}
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
          This is a placeholder privacy policy. Please have it reviewed by a
          legal professional before launching.
        </p>
      </div>
    </div>
  );
}
