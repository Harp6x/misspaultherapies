"use client";

import { useState, useRef, useEffect } from "react";
import {
  Shuffle,
  Send,
  Sparkles,
  BookOpen,
  Loader2,
  Download,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getRandomPrompt,
  categories,
  getPromptsByCategory,
  type JournalPrompt,
} from "@/lib/tools/journal-prompts";
import { EmailCapture } from "./EmailCapture";

interface JournalEntry {
  prompt: JournalPrompt;
  text: string;
  aiReflection?: string;
  clientReflection: string;
  timestamp: string;
}

export function AIJournal() {
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt>(() => getRandomPrompt());
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [usedPromptIds, setUsedPromptIds] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mpt-journal-entries");
      if (saved) setEntries(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("mpt-journal-entries", JSON.stringify(entries));
    }
  }, [entries]);

  function newPrompt() {
    const prompt = selectedCategory
      ? getPromptsByCategory(selectedCategory).filter((p) => !usedPromptIds.includes(p.id))[0] || getRandomPrompt(usedPromptIds)
      : getRandomPrompt(usedPromptIds);
    setCurrentPrompt(prompt);
    setUsedPromptIds((prev) => [...prev, prompt.id]);
    setEntryText("");
    setAiError("");
  }

  async function submitEntry() {
    if (entryText.length < 20) return;

    const entry: JournalEntry = {
      prompt: currentPrompt,
      text: entryText,
      clientReflection: currentPrompt.followUp,
      timestamp: new Date().toISOString(),
    };

    // Try AI reflection
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/journal-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entry: entryText,
          history: entries.slice(-3).flatMap((e) => [
            { role: "user", content: e.text },
            { role: "assistant", content: e.aiReflection || e.clientReflection },
          ]),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        entry.aiReflection = data.reflection;
      }
    } catch {
      // AI unavailable — use client-side reflection
    }
    setAiLoading(false);

    setEntries((prev) => [entry, ...prev]);
    setEntryText("");
  }

  function exportJournal() {
    const text = entries
      .map(
        (e) =>
          `--- ${new Date(e.timestamp).toLocaleDateString()} ---\nPrompt: ${e.prompt.prompt}\n\n${e.text}\n\nReflection: ${e.aiReflection || e.clientReflection}\n`,
      )
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `journal-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearHistory() {
    if (confirm("This will permanently delete all journal entries from this device. Continue?")) {
      setEntries([]);
      localStorage.removeItem("mpt-journal-entries");
    }
  }

  const latestEntry = entries[0];

  return (
    <div className="mx-auto max-w-2xl">
      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { setSelectedCategory(null); newPrompt(); }}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            !selectedCategory
              ? "bg-sage text-white"
              : "bg-cream text-brown-light hover:bg-beige",
          )}
        >
          All themes
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const prompt = getPromptsByCategory(cat)[0] || getRandomPrompt();
              setCurrentPrompt(prompt);
              setEntryText("");
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selectedCategory === cat
                ? "bg-sage text-white"
                : "bg-cream text-brown-light hover:bg-beige",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Current prompt */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-sage uppercase tracking-wider mb-1">
              {currentPrompt.category}
            </p>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-brown leading-snug">
              {currentPrompt.prompt}
            </h2>
          </div>
          <button
            onClick={newPrompt}
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-cream transition-colors"
            title="New prompt"
          >
            <Shuffle className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Writing area */}
        <textarea
          ref={textareaRef}
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write freely. This stays on your device unless you choose to share it..."
          rows={8}
          className="w-full rounded-xl border border-border bg-cream p-4 text-sm text-brown leading-relaxed placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 resize-none transition-colors"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground/60">
            {entryText.length > 0 ? `${entryText.length} characters` : "Start writing to unlock your reflection"}
          </span>
          <button
            onClick={submitEntry}
            disabled={entryText.length < 20 || aiLoading}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark disabled:opacity-40 transition-colors"
          >
            {aiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {aiLoading ? "Reflecting..." : "Get reflection"}
          </button>
        </div>

        {aiError && (
          <p className="mt-2 text-xs text-muted-foreground">{aiError}</p>
        )}
      </div>

      {/* Latest reflection */}
      {latestEntry && (
        <div className="mt-6 rounded-2xl border border-sage/20 bg-sage/5 p-6 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-3">
            {latestEntry.aiReflection ? (
              <Sparkles className="h-4 w-4 text-sage" />
            ) : (
              <BookOpen className="h-4 w-4 text-sage" />
            )}
            <p className="text-xs font-semibold text-sage-dark uppercase tracking-wider">
              {latestEntry.aiReflection ? "AI Reflection" : "Therapeutic Reflection"}
            </p>
          </div>
          <p className="text-sm text-brown-light leading-relaxed whitespace-pre-wrap">
            {latestEntry.aiReflection || latestEntry.clientReflection}
          </p>
          {!latestEntry.aiReflection && (
            <p className="mt-3 text-xs text-muted-foreground/60 italic">
              AI-powered reflections available when configured. This is a clinically-informed prompt response.
            </p>
          )}
        </div>
      )}

      {/* Email capture */}
      {entries.length >= 2 && !showEmail && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowEmail(true)}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
          >
            Get daily journaling prompts in your inbox
          </button>
        </div>
      )}
      {showEmail && (
        <div className="mt-6">
          <EmailCapture
            source="ai-journal"
            headline="Daily journaling prompts"
            description="A new therapeutic writing prompt every morning — crafted to help you reflect, process, and grow."
            buttonText="Start my daily prompts"
          />
        </div>
      )}

      {/* Journal history */}
      {entries.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-brown hover:bg-cream transition-colors"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-sage" />
              Journal History ({entries.length} {entries.length === 1 ? "entry" : "entries"})
            </span>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showHistory && "rotate-180")} />
          </button>

          {showHistory && (
            <div className="mt-3 space-y-3 animate-in fade-in duration-300">
              <div className="flex gap-2 justify-end">
                <button
                  onClick={exportJournal}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-brown-light hover:bg-cream transition-colors"
                >
                  <Download className="h-3 w-3" /> Export
                </button>
                <button
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Clear all
                </button>
              </div>
              {entries.map((entry, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-xs font-medium text-sage">{entry.prompt.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic mb-1">{entry.prompt.prompt}</p>
                  <p className="text-sm text-brown-light leading-relaxed whitespace-pre-wrap line-clamp-4">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Privacy note */}
      <p className="mt-6 text-center text-xs text-muted-foreground/60">
        Your journal entries are stored only on this device. Nothing is sent to any server
        unless you click &quot;Get reflection&quot; (AI mode only). You can export or delete
        your entries at any time.
      </p>
    </div>
  );
}
