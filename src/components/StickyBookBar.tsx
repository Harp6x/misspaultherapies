"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import type { SiteConfigComponentProps } from "@/types";

export function StickyBookBar({ config }: SiteConfigComponentProps) {
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

  const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'd like to book a free 15-minute discovery call with ${config.name}.`
  )}`;

  return (
    <div className="border-border fixed right-0 bottom-0 left-0 z-40 border-t bg-white/95 px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden">
      <div className="flex gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href="/book"
          className="bg-sage flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Session
        </Link>
      </div>
    </div>
  );
}
