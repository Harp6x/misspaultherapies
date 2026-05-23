"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, RotateCcw, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  themes,
  themeConfigs,
  calculateThemeResult,
  type ReflectionTheme,
  type ThemeTierResult,
} from "@/lib/tools/reflection-data";
import { EmailCapture } from "./EmailCapture";

export function GuidedReflection() {
  const [selectedTheme, setSelectedTheme] = useState<ReflectionTheme | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<(ThemeTierResult & { score: number; maxScore: number }) | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const config = selectedTheme ? themeConfigs[selectedTheme.id] : null;
  const questions = config?.questions ?? [];
  const currentQ = questions[questionIndex];

  function selectTheme(theme: ReflectionTheme) {
    setSelectedTheme(theme);
    setQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowEmail(false);
  }

  function selectAnswer(questionId: string, value: number) {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (questionIndex < questions.length - 1) {
      setTimeout(() => setQuestionIndex(questionIndex + 1), 200);
    }
  }

  function finish() {
    if (!selectedTheme) return;
    setResult(calculateThemeResult(selectedTheme.id, answers));
  }

  function reset() {
    setSelectedTheme(null);
    setQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowEmail(false);
  }

  async function handleShare() {
    if (!selectedTheme || !result) return;
    const text = `My ${selectedTheme.label.toLowerCase()} assessment: "${result.headline}"\n\nTake it → mspaultherapies.com/tools/reflect`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${selectedTheme.label} Reflection`, text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch { /* user cancelled or share already in progress */ }
  }

  // ── Theme selection ──
  if (!selectedTheme) {
    return (
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
          What would you like to reflect on?
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Choose what feels most relevant right now. 5 questions, personalised results.
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
              <span className="text-xs text-muted-foreground text-center">{theme.description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Result screen ──
  if (result && selectedTheme) {
    const pct = Math.round((result.score / result.maxScore) * 100);
    const severityColor =
      pct <= 25 ? "text-emerald-700 bg-emerald-100" :
      pct <= 50 ? "text-amber-700 bg-amber-100" :
      pct <= 75 ? "text-orange-700 bg-orange-100" :
      "text-red-700 bg-red-100";

    return (
      <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">{selectedTheme.emoji}</span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-brown">{result.headline}</h2>
            <span className={cn("mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold capitalize", severityColor)}>
              {result.tier} - {result.score}/{result.maxScore}
            </span>
          </div>
          <p className="text-brown-light leading-relaxed">{result.body}</p>

          {/* Score bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Severity</span>
              <span className="font-medium text-brown">{pct}%</span>
            </div>
            <div className="h-3 rounded-full bg-beige overflow-hidden">
              <div className="h-full rounded-full bg-sage transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-5 rounded-lg bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-2">What&apos;s working for you</p>
            <ul className="text-xs text-emerald-800 space-y-1">
              {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-3 rounded-lg bg-sage/5 border border-sage/10 p-4">
            <p className="text-xs font-semibold text-sage-dark mb-2">Recommended next steps</p>
            <ul className="text-xs text-brown-light space-y-1">
              {result.actions.map((a, i) => <li key={i}>• {a}</li>)}
            </ul>
          </div>

          {/* Warning */}
          {result.warning && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-100 p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 leading-relaxed">{result.warning}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
              <Share2 className="h-3.5 w-3.5" /> Share result
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
              <RotateCcw className="h-3.5 w-3.5" /> Try another theme
            </button>
          </div>
        </div>

        {/* Email */}
        {!showEmail ? (
          <div className="mt-6 text-center">
            <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors">
              Get weekly mental health check-ins
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <EmailCapture source="guided-reflection" resultTier={`${selectedTheme.id}-${result.tier}`} headline="Get weekly mental health insights" description="A short, therapeutic check-in every week - grounded, honest, and useful." buttonText="Send me check-ins" />
          </div>
        )}

        {/* Therapy CTA */}
        {pct > 40 && (
          <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
            <p className="font-serif text-base font-semibold text-brown">Want to work on this with a therapist?</p>
            <p className="mt-1 text-sm text-muted-foreground">Self-awareness is the first step. Therapy is how you make lasting change.</p>
            <a href="/book" className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors">
              Book a free discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          This is a self-reflection tool, not a clinical assessment. If you&apos;re struggling, please consult a mental health professional.
        </p>
      </div>
    );
  }

  // ── Question screen ──
  if (!currentQ) return null;
  const answered = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <button onClick={reset} className="inline-flex items-center gap-1 hover:text-brown transition-colors">
          <ArrowLeft className="h-3 w-3" /> Change theme
        </button>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", selectedTheme.color)}>
          {selectedTheme.emoji} {selectedTheme.label}
        </span>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", i <= questionIndex ? "bg-sage" : "bg-beige")} />
        ))}
      </div>

      {/* Question */}
      <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={currentQ.id}>
        <p className="text-xs font-semibold text-sage uppercase tracking-wider mb-3">
          Question {questionIndex + 1} of {questions.length}
        </p>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown leading-snug mb-6">
          {currentQ.text}
        </h2>
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oi) => (
            <button
              key={oi}
              onClick={() => selectAnswer(currentQ.id, opt.value)}
              className={cn(
                "w-full rounded-xl border px-5 py-3.5 text-left text-sm transition-all",
                answers[currentQ.id] === opt.value
                  ? "border-sage bg-sage/10 text-brown font-medium"
                  : "border-border bg-white text-brown-light hover:border-sage/30",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {questionIndex > 0 ? (
          <button onClick={() => setQuestionIndex(questionIndex - 1)} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brown transition-all">
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
        ) : <div />}
        {answered >= questions.length && (
          <button onClick={finish} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors">
            See my results <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">{answered}/{questions.length} answered</p>
    </div>
  );
}
