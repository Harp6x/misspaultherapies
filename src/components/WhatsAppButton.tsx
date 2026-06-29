"use client";

import { MessageCircle } from "lucide-react";
import type { SiteConfigComponentProps } from "@/types";

export function WhatsAppButton({ config }: SiteConfigComponentProps) {
  const number = config.whatsappNumber;

  // Graceful fallback: hide button when number isn't configured
  if (!number || number.startsWith("[")) {
    return null;
  }

  const url = `https://wa.me/${number}?text=${encodeURIComponent(config.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-6 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:scale-105 hover:bg-[#1DA851] active:scale-95 md:bottom-6"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
