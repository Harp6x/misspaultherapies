"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, RotateCcw, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  burnoutQuestions,
  answerOptions,
  calculateScores,
  getTier,
  tierInfo,
  getSubscaleLabel,
} from "@/lib/tools/burnout-data";
import { EmailCapture } from "./EmailCapture";

export function BurnoutQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const question = burnoutQuestions[currentQ];
  const isAnswered = question && answers[question.id] !== undefined;
  const allAnswered = burnoutQuestions.every((q) => answers[q.id] !== undefined);
  const progress = Object.keys(answers).length / burnoutQuestions.length;

  function selectAnswer(value: number) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQ < burnoutQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
      }
    }, 300);
  }

  function finish() {
    setShowResult(true);
  }

  function reset() {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setShowEmail(false);
  }

  async function handleShare() {
    const scores = calculateScores(answers);
    const tier = getTier(scores);
    const info = tierInfo[tier];
    const text = `I just took a burnout assessment. Result: ${info.label}.\n\nCheck yours → mspaultherapies.com/tools/burnout-quiz`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Burnout Assessment", text, url: "https://mspaultherapies.com/tools/burnout-quiz" });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch { /* user cancelled or share already in progress */ }
  }

  // ── Result screen ──
  if (showResult) {
    const scores = calculateScores(answers);
    const tier = getTier(scores);
    const info = tierInfo[tier];

    return (
      <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Main result card */}
        <div className={cn("rounded-2xl border-2 p-6 sm:p-8", info.bgColor)}>
          <div className="text-center">
            <span className={cn("inline-block rounded-full px-4 py-1 text-sm font-bold", info.color, info.bgColor)}>
              {info.label}
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-brown">
              {info.headline}
            </h2>
          </div>
          <p className="mt-4 text-brown-light leading-relaxed">{info.body}</p>

          {/* Subscale breakdown */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {([
              { label: "Exhaustion", score: scores.exhaustion, max: 16 },
              { label: "Cynicism", score: scores.cynicism, max: 16 },
              { label: "Reduced Efficacy", score: scores.efficacy, max: 16 },
            ] as const).map((s) => (
              <div key={s.label} className="rounded-xl bg-white/70 p-4 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {s.label}
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-brown">
                  {s.score}<span className="text-sm font-normal text-muted-foreground">/{s.max}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getSubscaleLabel(s.score, s.max)}
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-white overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sage transition-all duration-700"
                    style={{ width: `${(s.score / s.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-sage-dark uppercase tracking-wide mb-2">
              What to do next
            </p>
            <ul className="space-y-2">
              {info.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-brown-light leading-relaxed">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" /> Share result
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake quiz
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
              Get your Burnout Recovery Roadmap (free PDF)
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <EmailCapture
              source="burnout-quiz"
              responses={answers}
              resultTier={tier}
              headline="Get your free Burnout Recovery Roadmap"
              description="A personalized PDF with strategies based on your score — plus weekly burnout prevention tips."
              buttonText="Send me the roadmap"
            />
          </div>
        )}

        {/* Therapy CTA */}
        {(tier === "high" || tier === "critical") && (
          <div className="mt-6 rounded-2xl border border-terracotta/20 bg-terracotta/5 p-6 text-center">
            <AlertTriangle className="mx-auto h-6 w-6 text-terracotta mb-2" />
            <p className="font-serif text-base font-semibold text-brown">
              Your score suggests you could benefit from professional support.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Burnout doesn&apos;t resolve itself. A therapist can help you understand the patterns and build a sustainable path forward.
            </p>
            <a
              href="/book"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
            >
              Book a free discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          This assessment is for educational purposes and is not a clinical diagnosis.
          Inspired by the Maslach Burnout Inventory framework. If you&apos;re struggling,
          please consult a mental health professional.
        </p>
      </div>
    );
  }

  // ── Quiz screen ──
  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Question {currentQ + 1} of {burnoutQuestions.length}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-beige overflow-hidden">
          <div
            className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      {question && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={question.id}>
          <p className="text-xs font-medium text-sage uppercase tracking-wider mb-2">
            {question.subscale === "exhaustion"
              ? "Emotional Exhaustion"
              : question.subscale === "cynicism"
                ? "Cynicism & Detachment"
                : "Professional Efficacy"}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brown leading-snug">
            {question.text}
          </h2>
          <div className="mt-8 space-y-3">
            {answerOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectAnswer(opt.value)}
                className={cn(
                  "w-full rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all",
                  answers[question.id] === opt.value
                    ? "border-sage bg-sage/10 text-sage-dark"
                    : "border-border bg-white text-brown-light hover:border-sage/30",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brown disabled:opacity-0 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>

        {currentQ < burnoutQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            disabled={!isAnswered}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={!allAnswered}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            See my results <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="mt-6 flex justify-center gap-1.5">
        {burnoutQuestions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentQ(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              i === currentQ
                ? "bg-sage w-4"
                : answers[q.id] !== undefined
                  ? "bg-sage/40"
                  : "bg-beige-dark",
            )}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
