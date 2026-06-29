import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import type { FooterProps, PageVisibility } from "@/types";

const HIDDEN_HREF_MAP: Record<string, keyof PageVisibility> = {
  "/products": "products",
  "/blog": "blog",
  "/resources": "resources",
  "/gallery": "gallery",
  "/workshops": "workshops",
};

const footerLinks = {
  services: [
    { href: "/services/individual-therapy", label: "Individual Therapy" },
    { href: "/services/couples-therapy", label: "Couples Therapy" },
    { href: "/services/adolescent-therapy", label: "Adolescent Therapy" },
    { href: "/services/family-therapy", label: "Family Therapy" },
    { href: "/services/psychological-assessments", label: "Assessments" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/products", label: "Products" },
    { href: "/resources", label: "Resources" },
    { href: "/book", label: "Book a Session" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-consent-cancellation", label: "Terms & Consent" },
    { href: "/emergency-resources", label: "Emergency Resources" },
  ],
};

export function Footer({ config, pageVisibility }: FooterProps) {
  const vis: PageVisibility = pageVisibility ?? {
    blog: true,
    products: true,
    workshops: true,
    gallery: true,
    resources: true,
  };
  const siteName = config.name;
  const tagline = config.tagline;
  const year = new Date().getFullYear();
  const visibleCompanyLinks = footerLinks.company.filter(
    (link) => !(link.href in HIDDEN_HREF_MAP) || vis[HIDDEN_HREF_MAP[link.href]]
  );

  return (
    <footer className="bg-brown text-cream" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-cream font-serif text-lg font-bold">
              {siteName}
            </Link>
            <p className="text-beige text-sm leading-relaxed">{tagline}</p>
            <div className="text-beige-dark space-y-1 text-xs">
              {config.qualifications.map((q) => (
                <p key={q}>{q}</p>
              ))}
              <p>RCI Reg. No: {config.rciNumber}</p>
            </div>
            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {config.socials.instagram && !config.socials.instagram.startsWith("[") && (
                <a
                  href={config.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-beige transition-colors hover:text-white"
                >
                  <SocialIcon name="instagram" className="h-5 w-5" />
                </a>
              )}
              {config.socials.youtube && !config.socials.youtube.startsWith("[") && (
                <a
                  href={config.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-beige transition-colors hover:text-white"
                >
                  <SocialIcon name="youtube" className="h-5 w-5" />
                </a>
              )}
              {config.socials.linkedin && !config.socials.linkedin.startsWith("[") && (
                <a
                  href={config.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-beige transition-colors hover:text-white"
                >
                  <SocialIcon name="linkedin" className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${config.email}`}
                aria-label="Email"
                className="text-beige transition-colors hover:text-white"
              >
                <SocialIcon name="email" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-cream mb-3 text-sm font-semibold">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-cream mb-3 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2">
              {visibleCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-cream mb-3 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency disclaimer */}
        <div className="border-brown-light mt-10 border-t pt-6">
          <p className="text-beige-dark text-center text-xs leading-relaxed">
            <strong>Important:</strong> If you or someone you know is in immediate danger, please
            call emergency services (112) or visit your nearest emergency room.{" "}
            <Link href="/emergency-resources" className="underline hover:text-white">
              View emergency resources
            </Link>
            .
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-beige-dark text-xs">
            &copy; {year} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
