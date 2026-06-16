import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";

export const metadata = buildMetadata({
  title: "Contact Us - Get in Touch with Ms Paul Therapies",
  description:
    "Reach out to Aishani Paul for therapy inquiries, session booking, collaborations, or general questions. Online therapy across India and for NRIs abroad.",
  path: "/contact",
});

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "For inquiries and appointment requests",
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    description: "Call during working hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Send a message",
    href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
    description: "Quick responses, usually within a few hours",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat, 10 AM – 7 PM IST",
    href: null,
    description: "Response within 24–48 hours outside working hours",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

        {/* Header */}
        <div className="text-center mt-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
            Contact Us
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Whether you have a question about therapy, want to book a session,
            or simply need someone to talk to — I&apos;m here to help. Reach out
            through any of the channels below or fill in the contact form.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const IconComp = card.icon;
            const inner = (
              <div className="rounded-2xl border border-border bg-cream p-6 text-center h-full flex flex-col items-center gap-3 transition-colors hover:border-sage/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-brown">
                  {card.label}
                </h3>
                <p className="text-sm font-medium text-sage-dark">
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
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
        <div className="mt-20 mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-brown text-center">
            Send a Message
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Fill in the form below and I&apos;ll get back to you within 24–48
            hours. All information shared is kept strictly confidential.
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
