"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { usePathname } from "next/navigation";

export function StickyBookBar() {
  const pathname = usePathname();

  // Hide on studio, book page, and privacy/terms pages
  if (
    pathname?.startsWith("/studio") ||
    pathname === "/book" ||
    pathname?.startsWith("/terms") ||
    pathname?.startsWith("/privacy")
  ) {
    return null;
  }

  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to book a free 15-minute discovery call with Ms Paul Therapies."
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.08)] px-4 py-3">
      <div className="flex gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Session
        </Link>
      </div>
    </div>
  );
}
