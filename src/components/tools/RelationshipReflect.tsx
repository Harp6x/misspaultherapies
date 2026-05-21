"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  modes,
  soloSections,
  partnerSections,
  type RelationshipSection,
} from "@/lib/tools/relationship-data";
import { EmailCapture } from "./EmailCapture";

export function RelationshipReflect() {
  const [mode, setMode] = useState<string | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", ""]);
  const [showResult, setShowResult] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const sections = mode === "partner" ? partnerSections : soloSections;
  const section: RelationshipSection | undefined = sections[sectionIndex];

  function selectMode(id: string) {
    setMode(id);
    setSectionIndex(0);
    setResponses(["", "", ""]);
    setShowResult(false);
    setShowEmail(false);
  }

  function completeSection() {
    setShowResult(true);
  }

  function nextSection() {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
      setResponses(["", "", ""]);
      setShowResult(false);
    }
  }

  function reset() {
    setMode(null);
    setSectionIndex(0);
    setResponses(["", "", ""]);
    setShowResult(false);
    setShowEmail(false);
  }

  // ── Mode selection ──
  if (!mode) {
    return (
      <div className="mx-auto max-w-lg">
        <h2 className="font-serif text-2xl font-bold text-brown text-center mb-2">
          How would you like to reflect?
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Choose solo for personal exploration, or partner mode for guided conversation.
        </p>
        <div className="grid gap-4">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => selectMode(m.id)}
              className="flex items-center gap-4 rounded-2xl border-2 border-border bg-white p-5 text-left transition-all hover:border-sage/30 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/10 text-2xl">
                {m.emoji}
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-brown">{m.label}</p>
                <p className="text-sm text-muted-foreground">{m.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-sage shrink-0 ml-auto" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Section result ──
  if (showResult && section) {
    const isLast = sectionIndex === sections.length - 1;
    return (
      <div className="mx-auto max-w-2xl animate-in fade-in duration-500">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-4">
            <Check className="mx-auto h-8 w-8 text-sage" />
            <h2 className="mt-2 font-serif text-xl font-bold text-brown">{section.title} — Complete</h2>
          </div>
          <div className="rounded-xl bg-cream p-4">
            <p className="text-sm text-brown-light leading-relaxed italic">{section.reflection}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {!isLast && (
              <button onClick={nextSection} className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors">
                Next: {sections[sectionIndex + 1]?.title} <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Start over
            </button>
          </div>
        </div>
        {isLast && !showEmail && (
          <div className="mt-6 text-center">
            <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors">
              Get the Relationship Reflection Workbook (free)
            </button>
          </div>
        )}
        {showEmail && (
          <div className="mt-6">
            <EmailCapture source="guided-reflection" resultTier={`relationship-${mode}`} headline="Get the free Relationship Reflection Workbook" description="A printable PDF with all prompts, plus 20 bonus questions for deeper exploration." buttonText="Send me the workbook" />
          </div>
        )}
        {isLast && (
          <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
            <p className="font-serif text-base font-semibold text-brown">
              {mode === "partner" ? "Want to go deeper together?" : "Want to explore these patterns in therapy?"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "partner"
                ? "Couples therapy creates a structured space to strengthen communication and repair disconnection."
                : "Understanding your relationship patterns is the first step. Therapy helps you change them."}
            </p>
            <a href="/book" className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors">
              Book a free discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // ── Active section ──
  if (!section) return null;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brown transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", mode === "partner" ? "bg-rose-100 text-rose-700" : "bg-violet-100 text-violet-700")}>
          {mode === "partner" ? <Users className="h-3 w-3" /> : <Heart className="h-3 w-3" />}
          {mode === "partner" ? "Partner Mode" : "Solo Mode"}
        </span>
      </div>

      {/* Section progress */}
      <div className="flex gap-2 mb-8">
        {sections.map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= sectionIndex ? "bg-sage" : "bg-beige")} />
        ))}
      </div>

      <div className="text-center mb-8">
        <p className="text-xs font-semibold text-sage uppercase tracking-wider">
          Section {sectionIndex + 1} of {sections.length}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-brown">{section.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">{section.intro}</p>
      </div>

      {/* Prompts */}
      <div className="space-y-5">
        {section.prompts.map((prompt, i) => (
          <div key={i} className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-semibold text-sage uppercase tracking-wider mb-1">
              {mode === "partner" ? "Person A" : `Prompt ${i + 1}`}
            </p>
            <p className="text-sm font-medium text-brown mb-3">{prompt.text}</p>
            {mode === "partner" && prompt.partnerText && (
              <>
                <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1 mt-4">Person B</p>
                <p className="text-sm font-medium text-brown mb-3">{prompt.partnerText}</p>
              </>
            )}
            <textarea
              value={responses[i]}
              onChange={(e) => { const u = [...responses]; u[i] = e.target.value; setResponses(u); }}
              placeholder={mode === "partner" ? "Write your thoughts or discuss together..." : "Write your thoughts here..."}
              rows={3}
              className="w-full rounded-lg border border-border bg-cream p-3 text-sm text-brown leading-relaxed placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 resize-none transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button onClick={completeSection} disabled={responses.every((r) => r.length < 5)} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors">
          Complete section <Check className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
