"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Book a Session",
  "Therapy for NRIs",
  "Workshop Inquiry",
  "Collaboration/Media",
  "Feedback",
];

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-2xl border border-sage/30 bg-sage/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-sage" />
        <h3 className="mt-4 font-serif text-2xl font-bold text-brown">
          Message Sent!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. I&apos;ll get back to you within 24–48
          hours.
        </p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-sage px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage/10 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Email row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-brown mb-1.5"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brown placeholder:text-muted-foreground focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-brown mb-1.5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brown placeholder:text-muted-foreground focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Phone + Subject row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-brown mb-1.5"
          >
            Phone <span className="text-xs text-muted-foreground">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brown placeholder:text-muted-foreground focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-brown mb-1.5"
          >
            Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            defaultValue="General Inquiry"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brown focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors"
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-brown mb-1.5"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="How can I help you? Feel free to share as much or as little as you'd like."
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-brown placeholder:text-muted-foreground focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors resize-y"
        />
      </div>

      {/* Error */}
      {formState === "error" && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
