import { Phone, ArrowRight } from "lucide-react";
import type { SiteConfigComponentProps } from "@/types";

export function DiscoveryCallBanner({ config }: SiteConfigComponentProps) {
  const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'd like to schedule a free 15-minute discovery call with ${config.name}.`
  )}`;

  // Send "Schedule Now" straight to the Cal.com discovery call; fall back to
  // WhatsApp if the booking link is not configured.
  const hasDiscovery = config.discoveryCallUrl && !config.discoveryCallUrl.startsWith("[");
  const scheduleUrl = hasDiscovery ? config.discoveryCallUrl : waUrl;

  return (
    <section className="from-sage to-sage-dark bg-gradient-to-r py-1.5 sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-center sm:gap-6">
          <div className="flex items-center gap-1.5 text-white sm:gap-2">
            <Phone className="h-3.5 w-3.5 flex-shrink-0 sm:h-5 sm:w-5" />
            <p className="text-[11px] font-medium sm:text-base">
              <span className="font-bold">Free 15-min discovery call</span>
              <span className="hidden sm:inline">
                {" "}
                - see if we&apos;re the right fit, no commitment needed
              </span>
            </p>
          </div>
          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage-dark hover:bg-cream inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold transition-colors sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
          >
            Schedule Now
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
