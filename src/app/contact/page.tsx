import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata, contactPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";

export const metadata = buildMetadata({
  title: "Contact Us - Get in Touch",
  description:
    "Reach out to Aishani Paul for therapy inquiries, session booking, collaborations, or general questions. Online therapy across India and for NRIs abroad.",
  path: "/contact",
});

export default async function ContactPage() {
  const config = await getSiteConfig();
  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: config.email,
      href: `mailto:${config.email}`,
      description: "For inquiries and appointment requests",
    },
    {
      icon: Phone,
      label: "Phone",
      value: config.phone,
      href: `tel:${config.phone.replace(/\s/g, "")}`,
      description: "Call during working hours",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Send a message",
      href: `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`,
      description: "Quick responses, usually within a few hours",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: config.workingHours,
      href: null,
      description: "Response within 24–48 hours outside working hours",
    },
  ];
  return (
    <>
      <SEOJsonLd data={contactPageJsonLd()} />
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

        {/* Header */}
        <div className="mt-4 text-center">
          <h1 className="text-brown font-serif text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            Whether you have a question about therapy, want to book a session, or simply need
            someone to talk to — I&apos;m here to help. Reach out through any of the channels below
            or fill in the contact form.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const IconComp = card.icon;
            const inner = (
              <div className="border-border bg-cream hover:border-sage/40 flex h-full flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-colors">
                <div className="bg-sage/10 text-sage flex h-12 w-12 items-center justify-center rounded-xl">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="text-brown font-serif text-lg font-semibold">{card.label}</h3>
                <p className="text-sage-dark text-sm font-medium">{card.value}</p>
                <p className="text-muted-foreground text-xs">{card.description}</p>
              </div>
            );

            if (card.href) {
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {inner}
                </a>
              );
            }

            return <div key={card.label}>{inner}</div>;
          })}
        </div>

        {/* Form section */}
        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="text-brown text-center font-serif text-3xl font-bold">Send a Message</h2>
          <p className="text-muted-foreground mt-3 text-center">
            Fill in the form below and I&apos;ll get back to you within 24–48 hours. All information
            shared is kept strictly confidential.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
