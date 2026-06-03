"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds the Kit (ConvertKit) INLINE newsletter form.
 * The Kit script injects its form into the container ref on mount.
 * `uid` and `src` come from Sanity Site Configuration (with static fallbacks).
 */
export function NewsletterEmbed({
  uid,
  src,
  className = "",
}: {
  uid: string;
  src: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !uid || !src || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-uid", uid);
    script.src = src;
    container.appendChild(script);
  }, [uid, src]);

  return (
    <div className={`mx-auto w-full max-w-2xl ${className}`}>
      <div ref={containerRef} className="kit-newsletter-embed" />
    </div>
  );
}
