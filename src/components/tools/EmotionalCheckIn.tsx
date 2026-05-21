"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Share2, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  moodOptions,
  bodyAreas,
  thoughtPatterns,
  needOptions,
  getReflection,
  type CheckInResult,
} from "@/lib/tools/checkin-data";
import { EmailCapture } from "./EmailCapture";

const TOTAL_STEPS = 5;

export function EmotionalCheckIn() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [selectedBody, setSelectedBody] = useState<string[]>([]);
  const [selectedThoughts, setSelectedThoughts] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [showEmail, setShowEmail] = useState(false);

  const toggleItem = useCallback(
    (list: string[], setList: (v: string[]) => void, id: string) => {
      setList(list.includes(id) ? list.filter((i) => i !== id) : [...list, id]);
    },
    [],
  );

  const canProceed =
    (step === 0 && mood) ||
    step === 1 ||
    step === 2 ||
    step === 3 ||
    step === 4;

  const result: CheckInResult = {
    mood,
    intensity,
    bodyAreas: selectedBody,
    thoughts: selectedThoughts,
    needs: selectedNeeds,
    timestamp: new Date().toISOString(),
  };

  const reflection = getReflection(result);
  const moodData = moodOptions.find((m) => m.value === mood);

  async function handleShare() {
    const text = `I just checked in with my emotions. ${reflection.headline}\n\nTry it yourself → mspaultherapies.com/tools/check-in`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Emotional Check-In", text, url: "https://mspaultherapies.com/tools/check-in" });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch { /* user cancelled or share already in progress */ }
  }

  function reset() {
    setStep(0);
    setMood("");
    setIntensity(5);
    setSelectedBody([]);
    setSelectedThoughts([]);
    setSelectedNeeds([]);
    setShowEmail(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      {step < TOTAL_STEPS && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step + 1} of {TOTAL_STEPS}</span>
            <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-beige overflow-hidden">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 0: Mood */}
      {step === 0 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            How are you <em>really</em> feeling right now?
          </h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            Not how you should feel. Not how you were an hour ago. Right now.
          </p>
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {moodOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMood(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl border-2 p-4 transition-all hover:scale-[1.02]",
                  mood === opt.value
                    ? `${opt.color} border-current shadow-sm`
                    : "border-border bg-white hover:border-sage/30",
                )}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Intensity */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            How intense is this feeling?
          </h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            1 = barely there &nbsp;&middot;&nbsp; 10 = overwhelming
          </p>
          <div className="mt-10 px-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Barely there</span>
              <span>Overwhelming</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-beige accent-sage"
            />
            <div className="mt-4 text-center">
              <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-sage/10 font-serif text-2xl font-bold text-sage-dark">
                {intensity}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Body scan */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            Where do you feel it in your body?
          </h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            Emotions live in the body. Select all that apply.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {bodyAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleItem(selectedBody, setSelectedBody, area.id)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                  selectedBody.includes(area.id)
                    ? "border-sage bg-sage/10 text-sage-dark"
                    : "border-border bg-white text-brown-light hover:border-sage/30",
                )}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Thought patterns */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            What&apos;s happening in your mind?
          </h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            No judgment. Just notice.
          </p>
          <div className="mt-8 space-y-3">
            {thoughtPatterns.map((tp) => (
              <button
                key={tp.id}
                onClick={() => toggleItem(selectedThoughts, setSelectedThoughts, tp.id)}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-3 text-left transition-all",
                  selectedThoughts.includes(tp.id)
                    ? "border-sage bg-sage/10"
                    : "border-border bg-white hover:border-sage/30",
                )}
              >
                <span className="text-sm font-medium text-brown">{tp.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {tp.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Needs */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            What do you need most right now?
          </h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            There&apos;s no wrong answer. Trust your gut.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {needOptions.map((need) => (
              <button
                key={need.id}
                onClick={() => toggleItem(selectedNeeds, setSelectedNeeds, need.id)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-left transition-all",
                  selectedNeeds.includes(need.id)
                    ? "border-sage bg-sage/10"
                    : "border-border bg-white hover:border-sage/30",
                )}
              >
                <span className="text-sm font-medium text-brown">{need.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {need.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {step === TOTAL_STEPS && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Result card */}
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-4xl">{moodData?.emoji}</span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-brown">
                {reflection.headline}
              </h2>
            </div>
            <p className="text-brown-light leading-relaxed">{reflection.body}</p>
            <div className="mt-6 rounded-xl bg-cream p-4">
              <p className="text-xs font-semibold text-sage-dark uppercase tracking-wide mb-1">
                A gentle suggestion
              </p>
              <p className="text-sm text-brown-light leading-relaxed">
                {reflection.suggestion}
              </p>
            </div>

            {/* Snapshot summary */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-cream p-3">
                <span className="font-semibold text-brown">Feeling</span>
                <p className="text-muted-foreground mt-0.5 capitalize">{mood} ({intensity}/10)</p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <span className="font-semibold text-brown">Body</span>
                <p className="text-muted-foreground mt-0.5">
                  {selectedBody.length > 0
                    ? selectedBody.map((b) => bodyAreas.find((a) => a.id === b)?.label).join(", ")
                    : "No areas selected"}
                </p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <span className="font-semibold text-brown">Mind</span>
                <p className="text-muted-foreground mt-0.5">
                  {selectedThoughts.length > 0
                    ? selectedThoughts.map((t) => thoughtPatterns.find((p) => p.id === t)?.label).join(", ")
                    : "No patterns selected"}
                </p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <span className="font-semibold text-brown">Needs</span>
                <p className="text-muted-foreground mt-0.5">
                  {selectedNeeds.length > 0
                    ? selectedNeeds.map((n) => needOptions.find((o) => o.id === n)?.label).join(", ")
                    : "No needs selected"}
                </p>
              </div>
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
                <RotateCcw className="h-3.5 w-3.5" /> Check in again
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
                <Download className="h-4 w-4" />
                Get weekly check-in reminders
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <EmailCapture
                source="emotional-checkin"
                responses={{ ...result } as Record<string, unknown>}
                resultTier={`${mood}-${intensity > 6 ? "high" : intensity > 3 ? "mid" : "low"}`}
                headline="Get weekly emotional check-in reminders"
                description="A gentle nudge every week to pause and check in with yourself. Plus, tips based on your patterns."
                buttonText="Start my weekly check-ins"
              />
            </div>
          )}

          {/* Therapy CTA */}
          <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 text-center">
            <p className="font-serif text-base font-semibold text-brown">
              Want to explore these feelings with someone?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Therapy is a space to understand what your emotions are telling you — and what to do with them.
            </p>
            <a
              href="/book"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
            >
              Book a free discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < TOTAL_STEPS && (
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brown disabled:opacity-0 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            {step === TOTAL_STEPS - 1 ? "See my reflection" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
