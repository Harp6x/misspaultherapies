"use client";

import { useEffect } from "react";

/**
 * Loads the Kit (ConvertKit) script ONCE site-wide for non-inline form types
 * (modal / slide-in / sticky bar). Kit auto-triggers these based on the rules
 * configured in the Kit dashboard, so the script only needs to load once.
 */
export function GlobalKitEmbed({ uid, src }: { uid: string; src: string }) {
  useEffect(() => {
    if (!uid || !src) return;
    if (document.querySelector(`script[data-uid="${uid}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-uid", uid);
    script.src = src;
    document.body.appendChild(script);
  }, [uid, src]);

  return null;
}
