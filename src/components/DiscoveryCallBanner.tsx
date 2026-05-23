import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function DiscoveryCallBanner() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to schedule a free 15-minute discovery call with Ms Paul Therapies."
  )}`;

  return (
    <section className="bg-gradient-to-r from-sage to-sage-dark py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white">
            <Phone className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm sm:text-base font-medium">
              <span className="font-bold">Free 15-minute discovery call</span>
              <span className="hidden sm:inline"> - see if we&apos;re the right fit, no commitment needed</span>
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-sage-dark hover:bg-cream transition-colors flex-shrink-0"
          >
            Schedule Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
