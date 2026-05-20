"use client";

import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/content/faqs";

interface Props {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: Props) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {faqs.map((faq, i) => (
        <details key={i} className="group">
          <summary className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-medium text-brown">
              {faq.question}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
