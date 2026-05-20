"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";

export function LeadMagnet() {
  useEffect(() => {
    // Load Kit.com embed script
    const existing = document.querySelector('script[data-uid="1d5b37459d"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://ms-paul-therapies.kit.com/1d5b37459d/index.js";
      script.async = true;
      script.dataset.uid = "1d5b37459d";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cream to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-border shadow-lg p-8 sm:p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 text-sage mb-6">
            <Download className="h-7 w-7" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
            Stay Connected — Mental Health Tips &amp; Insights
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join the Ms Paul Therapies newsletter for evidence-based mental
            health tips, self-care strategies, and insights — delivered to your
            inbox. No spam, ever.
          </p>

          {/* Kit.com embed renders here */}
          <div className="mt-8" data-uid="1d5b37459d" />

          <p className="mt-4 text-xs text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
