import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function DiscoveryCallBanner() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to schedule a free 15-minute discovery call with Ms Paul Therapies."
  )}`;

  // Send "Schedule Now" straight to the Cal.com discovery call; fall back to
  // WhatsApp if the booking link is not configured.
  const hasDiscovery =
    siteConfig.discoveryCallUrl && !siteConfig.discoveryCallUrl.startsWith("[");
  const scheduleUrl = hasDiscovery ? siteConfig.discoveryCallUrl : waUrl;

  return (
    <section className="bg-gradient-to-r from-sage to-sage-dark py-1.5 sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 sm:gap-6 text-center">
          <div className="flex items-center gap-1.5 sm:gap-2 text-white">
            <Phone className="h-3.5 w-3.5 sm:h-5 sm:w-5 flex-shrink-0" />
            <p className="text-[11px] sm:text-base font-medium">
              <span className="font-bold">Free 15-min discovery call</span>
              <span className="hidden sm:inline"> - see if we&apos;re the right fit, no commitment needed</span>
            </p>
          </div>
          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-white px-3 py-1 sm:px-5 sm:py-2 text-[11px] sm:text-sm font-semibold text-sage-dark hover:bg-cream transition-colors flex-shrink-0"
          >
            Schedule Now
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
