"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, RotateCcw, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  themes,
  getPromptsForTheme,
  getReflectionSummary,
  type ReflectionTheme,
} from "@/lib/tools/reflection-data";
import { EmailCapture } from "./EmailCapture";

export function GuidedReflection() {
  const [selectedTheme, setSelectedTheme] = useState<ReflectionTheme | null>(null);
  const [promptIndex, setPromptIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", ""]);
  const [currentText, setCurrentText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const prompts = selectedTheme ? getPromptsForTheme(selectedTheme.id) : [];
  const currentPrompt = prompts[promptIndex];
  const isLastPrompt = promptIndex === prompts.length - 1;

  function selectTheme(theme: ReflectionTheme) {
    setSelectedTheme(theme);
    setPromptIndex(0);
    setResponses(["", "", ""]);
    setCurrentText("");
    setShowResult(false);
    setShowEmail(false);
  }

  function submitResponse() {
    const updated = [...responses];
    updated[promptIndex] = currentText;
    setResponses(updated);

    if (isLastPrompt) {
      setShowResult(true);
    } else {
      setPromptIndex(promptIndex + 1);
      setCurrentText("");
    }
  }

  function reset() {
    setSelectedTheme(null);
    setPromptIndex(0);
    setResponses(["", "", ""]);
    setCurrentText("");
    setShowResult(false);
    setShowEmail(false);
  }

  function handleShare() {
    if (!selectedTheme) return;
    const summary = getReflectionSummary(selectedTheme.id, responses);
    const text = `I just did a guided reflection on ${selectedTheme.label.toLowerCase()}. "${summary.headline}"\n\nTry it → mspaultherapies.com/tools/reflect`;
    if (navigator.share) {
      navigator.share({ title: "Guided Reflection", text, url: "https://mspaultherapies.com/tools/reflect" });
    } else {
      navigator.clipboard.writeText(text);
    }
  }

  // ── Theme selection ──
  if (!selectedTheme) {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
          What would you like to reflect on?
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Choose what feels most relevant right now. There are no wrong answers.
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all hover:scale-[1.02]",
                "border-border bg-white hover:border-sage/30",
              )}
            >
              <span className="text-3xl">{theme.emoji}</span>
              <span className="text-sm font-semibold text-brown">{theme.label}</span>
              <span className="text-xs text-muted-foreground text-center">
                {theme.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Result screen ──
  if (showResult && selectedTheme) {
    const summary = getReflectionSummary(selectedTheme.id, responses);
    return (
      <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">{selectedTheme.emoji}</span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-brown">
              {summary.headline}
            </h2>
          </div>
          <p className="text-brown-light leading-relaxed">{summary.body}</p>

          {/* Responses review */}
          <div className="mt-6 space-y-4">
            {prompts.map((p, i) => (
              <div key={i} className="rounded-xl bg-cream p-4">
                <p className="text-xs font-semibold text-sage-dark uppercase tracking-wide mb-1">
                  Reflection {i + 1}
                </p>
                <p className="text-xs text-muted-foreground mb-2 italic">{p.prompt}</p>
                <p className="text-sm text-brown-light leading-relaxed whitespace-pre-wrap">
                  {responses[i] || "(skipped)"}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reflect on something else
            </button>
          </div>
        </div>

        {/* Email capture */}
        {!showEmail ? (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowEmail(true)}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
            >
              Get weekly reflection prompts in your inbox
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <EmailCapture
              source="guided-reflection"
              resultTier={selectedTheme.id}
              headline="Get weekly reflection prompts"
              description="A new therapeutic writing prompt every week — delivered gently to your inbox."
              buttonText="Send me prompts"
            />
          </div>
        )}

        {/* Therapy CTA */}
        <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
          <p className="font-serif text-base font-semibold text-brown">
            Want to go deeper with a therapist?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Reflection opens doors. Therapy helps you walk through them.
          </p>
          <a
            href="/book"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
          >
            Book a free discovery call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  // ── Prompt screen ──
  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 hover:text-brown transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Change theme
          </button>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", selectedTheme.color)}>
            {selectedTheme.emoji} {selectedTheme.label}
          </span>
        </div>
        <div className="flex gap-2">
          {prompts.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                i <= promptIndex ? "bg-sage" : "bg-beige",
              )}
            />
          ))}
        </div>
      </div>

      {/* Prompt */}
      {currentPrompt && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={`${selectedTheme.id}-${promptIndex}`}>
          <p className="text-xs font-semibold text-sage uppercase tracking-wider mb-3">
            Reflection {promptIndex + 1} of {prompts.length}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown leading-snug">
            {currentPrompt.prompt}
          </h2>

          {/* Writing area */}
          <div className="mt-6 relative">
            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder="Write freely. No one will see this unless you choose to share it..."
              rows={6}
              className="w-full rounded-2xl border border-border bg-cream p-4 text-sm text-brown leading-relaxed placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 resize-none transition-colors"
            />
            <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">
              {currentText.length > 0 ? `${currentText.length} characters` : ""}
            </span>
          </div>

          {/* Follow-up (shown after typing) */}
          {currentText.length > 30 && (
            <div className="mt-4 rounded-xl bg-sage/5 border border-sage/10 p-4 animate-in fade-in duration-500">
              <p className="text-sm text-brown-light leading-relaxed italic">
                {currentPrompt.followUp}
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="mt-6 flex items-center justify-between">
            {promptIndex > 0 ? (
              <button
                onClick={() => {
                  const updated = [...responses];
                  updated[promptIndex] = currentText;
                  setResponses(updated);
                  setCurrentText(responses[promptIndex - 1] || "");
                  setPromptIndex(promptIndex - 1);
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brown transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={submitResponse}
              disabled={currentText.length < 5}
              className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
            >
              {isLastPrompt ? "See my reflection" : "Continue"}
              {isLastPrompt ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
