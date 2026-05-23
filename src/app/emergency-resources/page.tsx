import { Phone, AlertTriangle, ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = buildMetadata({
  title: "Emergency Resources",
  description:
    "Crisis helpline numbers and emergency mental health resources for India and international support.",
  path: "/emergency-resources",
});

const helplines = [
  {
    name: "iCall - TISS",
    number: "9152987821",
    hours: "Mon-Sat, 8am-10pm",
    description: "Professional counselling helpline by Tata Institute of Social Sciences.",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    hours: "24/7",
    description: "Free, 24/7 mental health support in multiple Indian languages.",
  },
  {
    name: "AASRA",
    number: "9820466726",
    hours: "24/7",
    description: "Crisis intervention centre for the suicidal and despairing.",
  },
  {
    name: "Snehi",
    number: "044-24640050",
    hours: "24/7",
    description: "Emotional support and suicide prevention helpline.",
  },
  {
    name: "National Emergency Number (India)",
    number: "112",
    hours: "24/7",
    description: "For immediate life-threatening emergencies.",
  },
  {
    name: "Childline India",
    number: "1098",
    hours: "24/7",
    description: "For children and adolescents in distress.",
  },
];

const internationalResources = [
  { name: "Crisis Text Line (US/UK/Canada)", contact: "Text HOME to 741741" },
  { name: "Samaritans (UK)", contact: "116 123" },
  { name: "Lifeline (Australia)", contact: "13 11 14" },
  { name: "988 Suicide & Crisis Lifeline (US)", contact: "Call or text 988" },
];

export default function EmergencyResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { name: "Emergency Resources", href: "/emergency-resources" },
        ]}
      />

      {/* Warning banner */}
      <div className="rounded-2xl border-2 border-terracotta bg-terracotta/10 p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 mt-0.5 shrink-0 text-terracotta" />
          <div>
            <h1 className="font-serif text-2xl font-bold text-brown">
              If You Are in Immediate Danger
            </h1>
            <p className="mt-2 text-brown-light leading-relaxed">
              Please call <strong>112</strong> (India emergency) or go to your
              nearest emergency room immediately. This website is not a crisis
              service and cannot provide immediate intervention.
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-serif text-2xl font-bold text-brown">
        India Helplines
      </h2>
      <p className="mt-2 text-muted-foreground mb-6">
        Free and confidential support from trained professionals.
      </p>

      <div className="space-y-4">
        {helplines.map((h) => (
          <div
            key={h.name}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-brown">{h.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {h.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {h.hours}
                </p>
              </div>
              <a
                href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
              >
                <Phone className="h-4 w-4" />
                {h.number}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* International */}
      <h2 className="font-serif text-2xl font-bold text-brown mt-12">
        International Resources
      </h2>
      <div className="mt-4 space-y-3">
        {internationalResources.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-xl border border-border bg-cream px-5 py-3"
          >
            <span className="text-sm text-brown">{r.name}</span>
            <span className="text-sm font-medium text-sage-dark">
              {r.contact}
            </span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-2xl border border-border bg-cream p-6 text-sm text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> The resources listed above are provided for
        informational purposes. Ms Paul Therapies is not affiliated with these
        organisations and cannot guarantee their availability. If in doubt, call
        112 or go to your nearest emergency room.
      </div>
    </div>
  );
}
