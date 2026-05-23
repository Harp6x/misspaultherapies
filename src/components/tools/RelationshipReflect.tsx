"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  attachmentQuestions,
  calculateAttachment,
  needQuestions,
  needAnswerOptions,
  calculateNeeds,
  boundaryQuestions,
  boundaryAnswerOptions,
  calculateBoundaries,
  type AttachmentResult,
  type NeedsResult,
  type BoundaryResult,
} from "@/lib/tools/relationship-data";
import { EmailCapture } from "./EmailCapture";

type Phase = "attachment" | "needs" | "boundaries" | "results";

const phaseLabels: Record<Phase, { label: string; emoji: string }> = {
  attachment: { label: "Attachment Style", emoji: "🔗" },
  needs: { label: "Unmet Needs", emoji: "💬" },
  boundaries: { label: "Boundary Health", emoji: "🛡️" },
  results: { label: "Your Results", emoji: "📊" },
};

export function RelationshipReflect() {
  const [phase, setPhase] = useState<Phase>("attachment");
  const [attachAnswers, setAttachAnswers] = useState<Record<string, number>>({});
  const [needAnswers, setNeedAnswers] = useState<Record<string, number>>({});
  const [boundaryAnswers, setBoundaryAnswers] = useState<Record<string, number>>({});
  const [attachResult, setAttachResult] = useState<AttachmentResult | null>(null);
  const [needsResult, setNeedsResult] = useState<NeedsResult | null>(null);
  const [boundaryResult, setBoundaryResult] = useState<BoundaryResult | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const phases: Phase[] = ["attachment", "needs", "boundaries", "results"];
  const phaseIndex = phases.indexOf(phase);

  function reset() {
    setPhase("attachment");
    setAttachAnswers({});
    setNeedAnswers({});
    setBoundaryAnswers({});
    setAttachResult(null);
    setNeedsResult(null);
    setBoundaryResult(null);
    setShowEmail(false);
  }

  async function handleShare() {
    if (!attachResult) return;
    const text = `My relationship pattern: ${attachResult.label}. "${attachResult.headline}"\n\nTake the assessment → mspaultherapies.com/tools/relationship-reflect`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Relationship Reflection", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch { /* user cancelled or share already in progress */ }
  }

  // ── Phase 1: Attachment Quiz ──
  if (phase === "attachment") {
    const answered = Object.keys(attachAnswers).length;
    return (
      <div className="mx-auto max-w-2xl">
        <PhaseProgress phases={phases} current={phaseIndex} />
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-sage uppercase tracking-wider">Part 1 of 3 - Attachment Style</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-brown">How Do You Attach?</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Select the response that feels most true for you - not what you think you should say.
          </p>
        </div>
        <div className="space-y-6">
          {attachmentQuestions.map((q, qi) => (
            <div key={q.id} className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs text-muted-foreground mb-1">Question {qi + 1} of {attachmentQuestions.length}</p>
              <p className="text-sm font-medium text-brown mb-3">{q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAttachAnswers({ ...attachAnswers, [q.id]: oi })}
                    className={cn(
                      "w-full rounded-lg border px-4 py-3 text-left text-sm transition-all",
                      attachAnswers[q.id] === oi
                        ? "border-sage bg-sage/10 text-brown font-medium"
                        : "border-border bg-white text-brown-light hover:border-sage/30",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => { setAttachResult(calculateAttachment(attachAnswers)); setPhase("needs"); }}
            disabled={answered < attachmentQuestions.length}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            Next: Unmet Needs <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-xs text-muted-foreground">{answered}/{attachmentQuestions.length} answered</p>
        </div>
      </div>
    );
  }

  // ── Phase 2: Needs Likert ──
  if (phase === "needs") {
    const answered = Object.keys(needAnswers).length;
    return (
      <div className="mx-auto max-w-2xl">
        <PhaseProgress phases={phases} current={phaseIndex} />
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setPhase("attachment")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brown">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-sage uppercase tracking-wider">Part 2 of 3 - Unmet Needs</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-brown">What&apos;s Missing in Your Relationships?</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Rate how much each statement resonates with you right now.
          </p>
        </div>
        <div className="space-y-4">
          {needQuestions.map((q, qi) => (
            <div key={q.id} className="rounded-xl border border-border bg-white p-4">
              <p className="text-sm font-medium text-brown mb-3">{qi + 1}. {q.text}</p>
              <div className="flex flex-wrap gap-2">
                {needAnswerOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setNeedAnswers({ ...needAnswers, [q.id]: opt.value })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      needAnswers[q.id] === opt.value
                        ? "border-sage bg-sage text-white"
                        : "border-border text-brown-light hover:border-sage/30",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => { setNeedsResult(calculateNeeds(needAnswers)); setPhase("boundaries"); }}
            disabled={answered < needQuestions.length}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            Next: Boundary Health <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-xs text-muted-foreground">{answered}/{needQuestions.length} answered</p>
        </div>
      </div>
    );
  }

  // ── Phase 3: Boundaries ──
  if (phase === "boundaries") {
    const answered = Object.keys(boundaryAnswers).length;
    return (
      <div className="mx-auto max-w-2xl">
        <PhaseProgress phases={phases} current={phaseIndex} />
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setPhase("needs")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brown">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-sage uppercase tracking-wider">Part 3 of 3 - Boundary Health</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-brown">How Strong Are Your Boundaries?</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            How often do these apply to you?
          </p>
        </div>
        <div className="space-y-4">
          {boundaryQuestions.map((q, qi) => (
            <div key={q.id} className="rounded-xl border border-border bg-white p-4">
              <p className="text-sm font-medium text-brown mb-3">{qi + 1}. {q.text}</p>
              <div className="flex flex-wrap gap-2">
                {boundaryAnswerOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBoundaryAnswers({ ...boundaryAnswers, [q.id]: opt.value })}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      boundaryAnswers[q.id] === opt.value
                        ? "border-sage bg-sage text-white"
                        : "border-border text-brown-light hover:border-sage/30",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => { setBoundaryResult(calculateBoundaries(boundaryAnswers)); setPhase("results"); }}
            disabled={answered < boundaryQuestions.length}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            See my results <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-xs text-muted-foreground">{answered}/{boundaryQuestions.length} answered</p>
        </div>
      </div>
    );
  }

  // ── Results ──
  if (!attachResult || !needsResult || !boundaryResult) return null;

  const tierColors: Record<string, string> = {
    secure: "text-emerald-700 bg-emerald-100",
    anxious: "text-amber-700 bg-amber-100",
    avoidant: "text-blue-700 bg-blue-100",
    disorganized: "text-red-700 bg-red-100",
    healthy: "text-emerald-700 bg-emerald-100",
    soft: "text-amber-700 bg-amber-100",
    porous: "text-orange-700 bg-orange-100",
    critical: "text-red-700 bg-red-100",
  };

  return (
    <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PhaseProgress phases={phases} current={phaseIndex} />

      {/* Attachment Result */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🔗</span>
          <h3 className="font-serif text-lg font-bold text-brown">Your Attachment Style</h3>
        </div>
        <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold mb-3", tierColors[attachResult.primary])}>
          {attachResult.label}
        </span>
        <h4 className="font-serif text-base font-semibold text-brown">{attachResult.headline}</h4>
        <p className="mt-2 text-sm text-brown-light leading-relaxed">{attachResult.body}</p>

        {/* Score bars */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["secure", "anxious", "avoidant", "disorganized"] as const).map((style) => {
            const max = attachmentQuestions.length * 3;
            const pct = Math.round((attachResult.scores[style] / max) * 100);
            return (
              <div key={style}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground capitalize">{style}</span>
                  <span className="font-medium text-brown">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-beige overflow-hidden">
                  <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Strengths</p>
            <ul className="text-xs text-emerald-800 space-y-1">
              {attachResult.strengths.map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
          <div className="rounded-lg bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">Challenges</p>
            <ul className="text-xs text-amber-800 space-y-1">
              {attachResult.challenges.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-sage/5 border border-sage/10 p-3">
          <p className="text-xs font-semibold text-sage-dark mb-1">What to do next</p>
          <ul className="text-xs text-brown-light space-y-1">
            {attachResult.tips.map((t, i) => <li key={i}>• {t}</li>)}
          </ul>
        </div>
      </div>

      {/* Needs Result */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💬</span>
          <h3 className="font-serif text-lg font-bold text-brown">Your Top Unmet Needs</h3>
        </div>
        <div className="space-y-4">
          {needsResult.topNeeds.map(({ need, score, info }, i) => (
            <div key={need} className={cn("rounded-xl p-4", i === 0 ? "bg-rose-50 border border-rose-100" : "bg-cream")}>
              <div className="flex items-center gap-2 mb-1">
                <span>{info.emoji}</span>
                <span className="text-sm font-semibold text-brown">{info.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{score}/8</span>
              </div>
              <p className="text-xs text-brown-light leading-relaxed mb-2">{info.description}</p>
              <ul className="text-xs text-brown-light space-y-0.5">
                {info.tips.map((t, ti) => <li key={ti}>• {t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Boundary Result */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🛡️</span>
          <h3 className="font-serif text-lg font-bold text-brown">Boundary Health</h3>
        </div>
        <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold mb-3", tierColors[boundaryResult.tier])}>
          {boundaryResult.label}
        </span>
        <h4 className="font-serif text-base font-semibold text-brown">{boundaryResult.headline}</h4>
        <p className="mt-2 text-sm text-brown-light leading-relaxed">{boundaryResult.body}</p>
        {boundaryResult.weakestAreas.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Weakest areas:</p>
            <div className="flex flex-wrap gap-2">
              {boundaryResult.weakestAreas.map(({ area, label }) => (
                <span key={area} className="rounded-full bg-orange-100 text-orange-700 px-2.5 py-1 text-xs font-medium">{label}</span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-3 rounded-lg bg-sage/5 border border-sage/10 p-3">
          <p className="text-xs font-semibold text-sage-dark mb-1">What to do next</p>
          <ul className="text-xs text-brown-light space-y-1">
            {boundaryResult.tips.map((t, i) => <li key={i}>• {t}</li>)}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
          <Share2 className="h-3.5 w-3.5" /> Share results
        </button>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
          <RotateCcw className="h-3.5 w-3.5" /> Retake assessment
        </button>
      </div>

      {/* Email */}
      {!showEmail ? (
        <div className="text-center mb-6">
          <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors">
            Get the Relationship Patterns Workbook (free)
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <EmailCapture source="guided-reflection" resultTier={`attachment-${attachResult.primary}`} headline="Get the free Relationship Patterns Workbook" description="A printable PDF with your full results breakdown, exercises for your attachment style, and boundary-building worksheets." buttonText="Send me the workbook" />
        </div>
      )}

      {/* Therapy CTA */}
      {(attachResult.primary !== "secure" || boundaryResult.tier === "porous" || boundaryResult.tier === "critical") && (
        <div className="rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
          <p className="font-serif text-base font-semibold text-brown">
            Want to change these patterns?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Understanding your relationship patterns is the first step. Therapy helps you rewrite them - safely, at your own pace.
          </p>
          <a href="/book" className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors">
            Book a free discovery call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground/60">
        This assessment is for self-awareness purposes and is not a clinical diagnosis. Based on attachment theory (Bowlby/Ainsworth) and clinical boundary frameworks. If you&apos;re struggling, please consult a mental health professional.
      </p>
    </div>
  );
}

function PhaseProgress({ phases, current }: { phases: string[]; current: number }) {
  return (
    <div className="flex gap-2 mb-8">
      {phases.map((p, i) => (
        <div key={p} className="flex-1">
          <div className={cn("h-1.5 rounded-full transition-all duration-500", i <= current ? "bg-sage" : "bg-beige")} />
          <p className={cn("text-center text-[10px] mt-1 font-medium", i <= current ? "text-sage-dark" : "text-muted-foreground/50")}>
            {phaseLabels[p as Phase].emoji} {phaseLabels[p as Phase].label}
          </p>
        </div>
      ))}
    </div>
  );
}
