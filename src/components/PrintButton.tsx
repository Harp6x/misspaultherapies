"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage/5 transition-colors print:hidden"
    >
      <Printer className="h-4 w-4" />
      Print / Save as PDF
    </button>
  );
}
