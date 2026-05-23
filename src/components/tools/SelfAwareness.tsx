"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Lock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  journeyDays,
  calculateDayResult,
  type AwarenessDay,
  type DayResult,
} from "@/lib/tools/self-awareness-data";
import { EmailCapture } from "./EmailCapture";

export function SelfAwareness() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState<AwarenessDay | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [dayResult, setDayResult] = useState<DayResult | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mpt-awareness-progress");
      if (saved) setCompletedDays(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (completedDays.length > 0) {
      localStorage.setItem("mpt-awareness-progress", JSON.stringify(completedDays));
    }
  }, [completedDays]);

  function startDay(day: AwarenessDay) {
    setActiveDay(day);
    setAnswers({});
    setDayResult(null);
  }

  function finishDay() {
    if (!activeDay) return;
    const result = calculateDayResult(activeDay, answers);
    setDayResult(result);
    if (!completedDays.includes(activeDay.day)) {
      setCompletedDays((prev) => [...prev, activeDay.day]);
    }
  }

  function resetJourney() {
    if (confirm("Reset all progress? Your results will be cleared.")) {
      setCompletedDays([]);
      setActiveDay(null);
      setAnswers({});
      setDayResult(null);
      localStorage.removeItem("mpt-awareness-progress");
    }
  }

  // ── Day result ──
  if (activeDay && dayResult) {
    const pct = Math.round((dayResult.score / dayResult.maxScore) * 100);
    const tierColor =
      pct <= 25 ? "text-emerald-700 bg-emerald-100" :
      pct <= 55 ? "text-amber-700 bg-amber-100" :
      "text-red-700 bg-red-100";

    return (
      <div className="mx-auto max-w-2xl animate-in fade-in duration-500">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">{activeDay.emoji}</span>
            <p className="mt-2 text-xs font-semibold text-sage uppercase tracking-wider">Day {activeDay.day} - {activeDay.theme}</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-brown">{dayResult.headline}</h2>
            <span className={cn("mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold", tierColor)}>
              {dayResult.label} - {dayResult.score}/{dayResult.maxScore}
            </span>
          </div>
          <p className="text-brown-light leading-relaxed">{dayResult.body}</p>

          {/* Insight */}
          <div className="mt-4 rounded-xl bg-sage/5 border border-sage/10 p-4">
            <p className="text-xs font-semibold text-sage-dark mb-1">Key insight</p>
            <p className="text-sm text-brown-light leading-relaxed italic">{dayResult.insight}</p>
          </div>

          {/* Actions */}
          <div className="mt-3 rounded-xl bg-cream p-4">
            <p className="text-xs font-semibold text-brown mb-2">What to do next</p>
            <ul className="text-xs text-brown-light space-y-1">
              {dayResult.actions.map((a, i) => <li key={i}>• {a}</li>)}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button onClick={() => { setActiveDay(null); setDayResult(null); }} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-brown-light hover:bg-cream transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to journey
            </button>
            {activeDay.day < 7 && completedDays.includes(activeDay.day) && (
              <button onClick={() => startDay(journeyDays[activeDay.day])} className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-xs font-semibold text-white hover:bg-sage-dark transition-colors">
                Start Day {activeDay.day + 1} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {completedDays.length >= 7 && !showEmail && (
          <div className="mt-6 text-center">
            <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors">
              Get the 30-day deep dive version
            </button>
          </div>
        )}
        {showEmail && (
          <div className="mt-6">
            <EmailCapture source="guided-reflection" resultTier="self-awareness-complete" headline="Get the 30-Day Self-Awareness Deep Dive" description="You completed the 7-day journey. The 30-day version goes deeper into each theme with advanced exercises." buttonText="Send me the deep dive" />
          </div>
        )}

        {pct > 40 && (
          <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
            <p className="font-serif text-base font-semibold text-brown">Want to explore this in therapy?</p>
            <p className="mt-1 text-sm text-muted-foreground">Self-awareness tools open the door. Therapy helps you walk through it.</p>
            <a href="/book" className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors">
              Book a free discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // ── Day questions ──
  if (activeDay) {
    const answered = Object.keys(answers).length;
    const total = activeDay.questions.length;

    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => setActiveDay(null)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brown transition-colors">
            <ArrowLeft className="h-4 w-4" /> Journey
          </button>
          <span className="text-xs font-semibold text-sage">Day {activeDay.day} of 7</span>
        </div>
        <div className="flex gap-1.5 mb-8">
          {journeyDays.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < activeDay.day ? "bg-sage" : i === activeDay.day - 1 ? "bg-sage/60" : "bg-beige")} />
          ))}
        </div>

        <div className="text-center mb-8">
          <span className="text-4xl">{activeDay.emoji}</span>
          <h2 className="mt-3 font-serif text-2xl font-bold text-brown">{activeDay.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">{activeDay.intro}</p>
        </div>

        <div className="space-y-6">
          {activeDay.questions.map((q, qi) => (
            <div key={q.id} className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs text-muted-foreground mb-1">Question {qi + 1} of {total}</p>
              <p className="text-sm font-medium text-brown mb-3">{q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers({ ...answers, [q.id]: opt.value })}
                    className={cn(
                      "w-full rounded-lg border px-4 py-3 text-left text-sm transition-all",
                      answers[q.id] === opt.value
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
            onClick={finishDay}
            disabled={answered < total}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            See Day {activeDay.day} results <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-xs text-muted-foreground">{answered}/{total} answered</p>
        </div>
      </div>
    );
  }

  // ── Journey overview ──
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{completedDays.length}/7 days completed</p>
        {completedDays.length > 0 && (
          <button onClick={resetJourney} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brown transition-colors">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>
      <div className="h-2 rounded-full bg-beige overflow-hidden mb-8">
        <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${(completedDays.length / 7) * 100}%` }} />
      </div>

      <div className="space-y-3">
        {journeyDays.map((day) => {
          const isCompleted = completedDays.includes(day.day);
          const isUnlocked = day.day === 1 || completedDays.includes(day.day - 1) || isCompleted;
          return (
            <button
              key={day.day}
              onClick={() => isUnlocked && startDay(day)}
              disabled={!isUnlocked}
              className={cn(
                "w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                isCompleted ? "border-sage/30 bg-sage/5" : isUnlocked ? "border-border bg-white hover:border-sage/30 hover:shadow-sm" : "border-border bg-white/50 opacity-60 cursor-not-allowed",
              )}
            >
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg", isCompleted ? "bg-sage/20" : "bg-cream")}>
                {isCompleted ? <Check className="h-5 w-5 text-sage" /> : isUnlocked ? <span>{day.emoji}</span> : <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Day {day.day} - {day.theme}</p>
                <p className="font-serif text-sm font-semibold text-brown">{day.title}</p>
                <p className="text-xs text-muted-foreground/70">3 questions</p>
              </div>
              {isUnlocked && !isCompleted && <ArrowRight className="h-4 w-4 text-sage shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
