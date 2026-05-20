import Link from "next/link";
import {
  FileText,
  CheckSquare,
  BookOpen,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";

export const metadata = buildMetadata({
  title: "Resources — Guides, Checklists & Crisis Links",
  description:
    "Free mental health resources including therapy preparation guides, self-care checklists, and crisis helpline numbers.",
  path: "/resources",
});

const resources = [
  {
    icon: CheckSquare,
    title: "How to Prepare for Your First Session",
    tag: "Guide",
    content: `<ul>
<li><strong>Find a private, quiet space</strong> where you won't be interrupted for 50 minutes. Use headphones if needed.</li>
<li><strong>Test your tech</strong> — check your internet, camera, and microphone 5 minutes before.</li>
<li><strong>Fill out the intake form</strong> on the <a href="/book" style="text-decoration:underline">Book page</a> before your session.</li>
<li><strong>Jot down your thoughts</strong> — what brought you to therapy, what you'd like to work on, any questions for me.</li>
<li><strong>Have water nearby</strong> and give yourself 10 minutes of buffer time afterwards to decompress.</li>
<li><strong>Remember:</strong> there's no right or wrong way to start. Just show up as you are.</li>
</ul>`,
  },
  {
    icon: FileText,
    title: "Therapy Goal-Setting Worksheet",
    tag: "Worksheet",
    content: `<p>Use these prompts to reflect before or between sessions:</p>
<ol>
<li><strong>What brought me to therapy?</strong> Write 2–3 sentences about your main concern.</li>
<li><strong>How is this affecting my daily life?</strong> (Work, relationships, sleep, mood, energy.)</li>
<li><strong>What does "feeling better" look like for me?</strong> Be specific — e.g. "I want to sleep through the night" rather than "I want to be happy."</li>
<li><strong>What have I already tried?</strong> List coping strategies that have or haven't worked.</li>
<li><strong>What am I hoping to gain from therapy?</strong> Skills, insight, relief, a safe space — all are valid.</li>
<li><strong>On a scale of 1–10, where am I right now?</strong> Track this monthly to see progress.</li>
</ol>
<p><em>Bring this to your first session or share it with your therapist anytime.</em></p>`,
  },
  {
    icon: BookOpen,
    title: "Recommended Reading List",
    tag: "Reading List",
    content: `<h3>Anxiety & Stress</h3>
<ul>
<li><strong>The Anxiety & Phobia Workbook</strong> — Edmund Bourne</li>
<li><strong>Dare: The New Way to End Anxiety</strong> — Barry McDonagh</li>
</ul>
<h3>Depression</h3>
<ul>
<li><strong>Feeling Good: The New Mood Therapy</strong> — David Burns</li>
<li><strong>Lost Connections</strong> — Johann Hari</li>
</ul>
<h3>Relationships</h3>
<ul>
<li><strong>Hold Me Tight</strong> — Sue Johnson</li>
<li><strong>The Seven Principles for Making Marriage Work</strong> — John Gottman</li>
<li><strong>Attached</strong> — Amir Levine & Rachel Heller</li>
</ul>
<h3>Self-Esteem & Boundaries</h3>
<ul>
<li><strong>Set Boundaries, Find Peace</strong> — Nedra Glover Tawwab</li>
<li><strong>The Gifts of Imperfection</strong> — Brene Brown</li>
</ul>
<h3>Trauma</h3>
<ul>
<li><strong>The Body Keeps the Score</strong> — Bessel van der Kolk</li>
<li><strong>What Happened to You?</strong> — Bruce Perry & Oprah Winfrey</li>
</ul>
<h3>Mindfulness</h3>
<ul>
<li><strong>Wherever You Go, There You Are</strong> — Jon Kabat-Zinn</li>
<li><strong>The Miracle of Mindfulness</strong> — Thich Nhat Hanh</li>
</ul>`,
  },
  {
    icon: CheckSquare,
    title: "Self-Care Audit Checklist",
    tag: "Checklist",
    content: `<p>Rate yourself 1–5 on each area (1 = neglected, 5 = thriving):</p>
<h3>Physical</h3>
<ul>
<li>I get 7–9 hours of sleep most nights</li>
<li>I move my body regularly (walking, yoga, exercise)</li>
<li>I eat nourishing meals and stay hydrated</li>
<li>I attend medical/dental check-ups when needed</li>
</ul>
<h3>Emotional</h3>
<ul>
<li>I allow myself to feel without judgement</li>
<li>I have at least one person I can talk to openly</li>
<li>I take breaks when I'm overwhelmed</li>
<li>I journal, create, or express my feelings in some way</li>
</ul>
<h3>Social</h3>
<ul>
<li>I spend time with people who energise me</li>
<li>I say no when I need to, without excessive guilt</li>
<li>I ask for help when I need it</li>
<li>I limit time with people or environments that drain me</li>
</ul>
<h3>Mental</h3>
<ul>
<li>I take breaks from screens and social media</li>
<li>I do something I enjoy that isn't work-related</li>
<li>I practise mindfulness, meditation, or deep breathing</li>
<li>I set realistic expectations for myself</li>
</ul>
<p><strong>Score below 12?</strong> You might be running on empty. Consider which area needs the most attention this week.</p>`,
  },
  {
    icon: FileText,
    title: "When to Seek Help — A Quick Guide",
    tag: "Guide",
    content: `<p>It can be hard to know when to reach out. Consider seeking professional support if:</p>
<ul>
<li>You've been feeling low, anxious, or emotionally numb for <strong>more than two weeks</strong></li>
<li>Your sleep, appetite, or energy levels have significantly changed</li>
<li>You're withdrawing from friends, family, or activities you used to enjoy</li>
<li>You're relying on alcohol, substances, or other unhealthy coping mechanisms more than usual</li>
<li>You're having difficulty functioning at work, school, or in relationships</li>
<li>You feel stuck in the same patterns despite trying to change on your own</li>
<li>You've experienced a major life event — loss, breakup, move, job change — and are struggling to adjust</li>
<li>You're having thoughts of self-harm or suicide (if so, please visit our <a href="/emergency-resources" style="text-decoration:underline">Emergency Resources</a> page immediately)</li>
</ul>
<p><strong>You don't need to be in crisis to benefit from therapy.</strong> If something feels "off," that's reason enough to explore support.</p>`,
  },
  {
    icon: BookOpen,
    title: "Understanding Therapy Modalities",
    tag: "Guide",
    content: `<p>Not all therapy is the same. Here's a brief overview of the approaches I use:</p>
<h3>Cognitive Behavioural Therapy (CBT)</h3>
<p>Focuses on identifying and changing unhelpful thought patterns and behaviours. Effective for anxiety, depression, OCD, and phobias. Structured and goal-oriented.</p>
<h3>Dialectical Behaviour Therapy (DBT)</h3>
<p>Builds skills in mindfulness, emotion regulation, distress tolerance, and interpersonal effectiveness. Helpful for intense emotions, self-harm, and borderline personality traits.</p>
<h3>Emotionally Focused Therapy (EFT)</h3>
<p>Primarily used in couples therapy. Focuses on emotional responses and attachment bonds to improve connection and reduce conflict.</p>
<h3>Psychodynamic Therapy</h3>
<p>Explores how past experiences, unconscious patterns, and early relationships shape your current behaviour and feelings. Helpful for deeper self-understanding.</p>
<h3>Mindfulness-Based Approaches</h3>
<p>Incorporates present-moment awareness, acceptance, and non-judgement. Often combined with CBT (as MBCT) for relapse prevention in depression and anxiety management.</p>
<p><em>I use an integrative approach — drawing from multiple modalities based on what works best for you. We'll discuss this together in your sessions.</em></p>`,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Resources", href: "/resources" }]} />

        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
            Resources
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Free guides, checklists, and recommended reading to support your
            mental health journey.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {resources.map((r) => (
            <details
              key={r.title}
              className="group rounded-2xl border border-border bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer items-center gap-4 px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage">
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block rounded-full bg-terracotta/10 px-2 py-0.5 text-xs font-medium text-terracotta mb-1">
                    {r.tag}
                  </span>
                  <h2 className="font-serif text-base font-semibold text-brown group-hover:text-sage-dark transition-colors">
                    {r.title}
                  </h2>
                </div>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div
                className="px-6 pb-6 text-sm text-brown-light leading-relaxed
                  [&_h3]:font-serif [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-brown [&_h3]:mt-5 [&_h3]:mb-2
                  [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3
                  [&_li]:text-sm [&_strong]:text-brown [&_em]:text-muted-foreground
                  [&_a]:text-sage [&_a]:underline [&_a]:hover:text-sage-dark"
                dangerouslySetInnerHTML={{ __html: r.content }}
              />
            </details>
          ))}
        </div>

        {/* Crisis link */}
        <div className="mt-12 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-6 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-terracotta mb-3" />
          <h2 className="font-serif text-xl font-semibold text-brown">
            In Crisis?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If you or someone you know needs immediate help, please visit our{" "}
            <Link
              href="/emergency-resources"
              className="text-terracotta underline hover:text-terracotta-dark font-medium"
            >
              Emergency Resources
            </Link>{" "}
            page.
          </p>
        </div>
      </div>

      <CTASection />
    </>
  );
}
