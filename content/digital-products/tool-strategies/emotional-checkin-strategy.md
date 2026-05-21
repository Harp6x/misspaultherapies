# Emotional Check-In Tool — Product Strategy

## Product Concept
A free, 5-step guided emotional awareness tool at `/tools/check-in`. Users explore their current mood, intensity, body sensations, thought patterns, and core needs — then receive a personalized, clinically-informed reflection. No login required. 100% private (all client-side).

## Target Emotional Pain Point
"I don't know how I feel." — Emotional numbness, alexithymia, overwhelm, or the habit of pushing feelings down. Also targets people who intellectualize emotions but don't feel them somatically.

## User Journey
1. **Discovery** → Social media post ("Most people don't actually know how they feel. Try this.") or Google search ("emotional check-in tool" / "how am I feeling right now")
2. **Landing** → `/tools/check-in` — calming headline, zero friction (no signup)
3. **Engagement** → 5 guided steps with soft animations, progress bar (2 min)
4. **Result** → Personalized reflection card: headline, body text, suggestion, snapshot summary
5. **Share/Save** → Share button (Web Share API / clipboard), retake option
6. **Convert** → "Get weekly check-in reminders" (email capture → Kit tag: emotional-checkin)
7. **Upsell** → "Want to explore these feelings with someone?" → Book discovery call

## Landing Page Copy
- **Headline:** How Are You *Really* Feeling?
- **Subhead:** Take 2 minutes to pause and check in with yourself. No judgment. No account required. Just honest self-awareness.
- **Badge:** Free Interactive Tool
- **CTA:** Start your check-in

## UI/UX Structure
- Full-width single-column layout, max-w-2xl
- One step visible at a time with slide-in animation
- Progress bar at top (Step X of 5, percentage)
- Mood grid: 3×4 cards with emoji + label, colored on selection
- Intensity: range slider with labels
- Body scan / Thoughts / Needs: multi-select button grids
- Result: card with emoji, headline, body, suggestion box, 2×2 snapshot summary
- Back/Continue navigation, disabled state when no selection

## Social Media Integration Ideas
- **Instagram carousel:** "5 things to check in with yourself about today" → swipe to tool link
- **Reels:** "I asked myself how I'm really feeling. Here's what happened." — screen recording walkthrough
- **Twitter/X:** "This free tool helped me understand my emotions better than 3 years of journaling" + link
- **Pinterest:** Infographic version of the mood grid → link to tool
- **Shareable result card:** Users can share their reflection headline (not raw data)

## Email Funnel Ideas
- **Tag:** emotional-checkin
- **Welcome email:** "Your first check-in — what it means" (expand on the reflection)
- **Day 3:** "Here's what happens when you check in daily for a week"
- **Day 7:** "Your emotions have patterns. Here's how to spot them."
- **Day 14:** "When self-awareness isn't enough — when to consider therapy"
- **Day 21:** Invite to book discovery call
- **Weekly:** "Your weekly check-in reminder" (simple CTA back to tool)

## Monetization Potential
- **Free tier:** Full tool, unlimited use (primary lead generation engine)
- **Email-gated:** Weekly check-in reminder emails with therapeutic insights
- **Paid upsell:** "90-Day Emotional Awareness Journal" (₹299 on Gumroad)
- **Therapy funnel:** High-intensity results → discovery call CTA
- **Corporate/B2B:** Licensed version for workplace wellness programs

## SEO Opportunities
- **Primary:** "emotional check-in tool", "how am I feeling right now", "mood check-in"
- **Long-tail:** "free emotional awareness tool", "guided mood check-in online", "feelings check-in worksheet"
- **Blog support:** "Why Emotional Check-Ins Matter More Than Positive Thinking"
- **Schema:** InteractiveTool, FAQ structured data
- **Internal links:** From /blog posts about emotions, /resources, /services

## Downloadable Assets
- Printable mood tracking worksheet (PDF companion)
- Emotion wheel reference card
- Body sensation map illustration
- Weekly check-in log template

## Engagement Hooks
- **Instant gratification:** Personalized reflection in under 2 minutes
- **Emotional resonance:** Copy that makes users feel "seen" (no toxic positivity)
- **Social proof:** Future: "12,847 people have checked in this month"
- **Habit loop:** Weekly email reminders drive repeat visits
- **Share mechanic:** Result headline is intriguing but not oversharing

## Psychological Retention Mechanics
- **Self-determination theory:** Autonomy (choose your mood), competence (understand your feelings), relatedness (connect via sharing)
- **Zeigarnik effect:** Progress bar creates completion motivation
- **Peak-end rule:** The reflection/suggestion is the emotional peak — carefully crafted to feel validating
- **Variable reward:** Different reflections per mood keep it fresh on repeat visits
- **Identity reinforcement:** "You showed up for yourself today" — reinforces self-care identity
