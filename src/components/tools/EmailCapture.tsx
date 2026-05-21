"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailCaptureProps {
  source: string;
  responses?: Record<string, unknown>;
  resultTier?: string;
  headline?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: () => void;
}

export function EmailCapture({
  source,
  responses,
  resultTier,
  headline = "Get your personalized insights",
  description = "Enter your email to receive a detailed breakdown and helpful resources.",
  buttonText = "Send me my results",
  className,
  onSuccess,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, responses, resultTier }),
      });

      if (res.ok) {
        setStatus("success");
        onSuccess?.();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-sage/30 bg-sage/5 p-6 text-center", className)}>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <Check className="h-6 w-6 text-sage-dark" />
        </div>
        <p className="font-serif text-lg font-semibold text-brown">Check your inbox</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your personalized resources are on the way.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-border bg-white p-6", className)}>
      <h3 className="font-serif text-lg font-semibold text-brown">{headline}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-border bg-cream pl-10 pr-4 py-2.5 text-sm text-brown placeholder:text-muted-foreground/60 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-60 transition-colors"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {buttonText}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600">Something went wrong. Please try again.</p>
      )}
      <p className="mt-3 text-xs text-muted-foreground/70">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
