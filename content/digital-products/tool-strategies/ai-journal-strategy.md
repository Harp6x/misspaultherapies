# AI Journaling Tool — Product Strategy

## Product Concept
A free therapeutic journaling tool at `/tools/journal` with two tiers:
- **Free tier:** 22 curated therapeutic prompts across 5 categories with client-side follow-up reflections. Works offline. Entries stored in localStorage.
- **AI tier:** Same prompts + OpenAI-powered personalised reflections that read the user's actual writing and respond with empathy, psychological insight, and a follow-up question.

## Target Emotional Pain Point
"I want a safe space to process what I'm feeling." — People who journal but want more than a blank page. Therapy-curious individuals who want a taste of reflective conversation. Also targets users who can't afford therapy but need structured emotional processing.

## User Journey
1. **Discovery** → SEO ("AI therapy journal"), social ("This AI journaling tool actually gets me"), /tools hub
2. **Engage** → Select prompt category or shuffle → write freely in textarea
3. **Reflect** → Click "Get reflection" → receive AI or client-side reflection
4. **Build habit** → History saved locally → export as .txt → return daily
5. **Convert** → After 2+ entries, "Get daily journaling prompts" email CTA
6. **Upsell** → Email sequence → discovery call

## Architecture
- **Free tier:** Client-side only. 22 prompts with pre-written therapeutic follow-ups. localStorage for history.
- **AI tier:** `POST /api/journal-assist` → OpenAI `gpt-4o-mini` with therapeutic system prompt. Includes conversation history for context-aware responses.
- **Safety:** System prompt includes crisis detection → redirects to emergency resources. Max 300 tokens per response.

## Content: 22 Prompts × 5 Categories
- Emotional Awareness (5 prompts)
- Relationships (4 prompts)
- Self-Worth (4 prompts)
- Growth & Change (4 prompts)
- Stress & Burnout (4 prompts)

## Features
- Category filter pills
- Shuffle button for random prompts
- Character counter
- Journal history with timestamps (localStorage)
- Export to .txt
- Clear all data
- Privacy-first: entries never leave device unless AI reflection requested

## Email Funnel
- **Tag:** ai-journal
- **Sequence:** Daily morning prompt → weekly summary → "When journaling alone isn't enough" → discovery call

## Monetization
- Free: Full journaling tool (unlimited prompts + client-side reflections)
- AI tier: Free while in beta, potential ₹99/month for unlimited AI reflections
- Product: "Therapeutic Journaling Course" (₹499) — 30-day guided program
- B2B: Corporate wellness journaling program

## SEO
- **Primary:** "AI therapy journal", "AI journaling tool", "therapeutic journaling prompts"
- **Long-tail:** "free online journal with AI feedback", "mental health journaling app no download"

## Environment Variables
```
OPENAI_API_KEY=   # Required for AI reflections (optional — free tier works without it)
```
