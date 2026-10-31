# Lesson: Generative Engine Optimization (GEO) & AI Lead Generation

## Overview
How to optimize a professional service practice (clinical psychology, consulting, high-touch professional services) for AI discovery (ChatGPT, Perplexity, Claude, Gemini) and turn AI chat recommendations into high-converting client inquiries.

---

## The Core Formula That Got Aishani Recommended

When a user asks ChatGPT: *"Can you recommend an online counsellor for relationship issues in India?"*, ChatGPT executes a multi-step filter:
1. **Safety / YMYL Guardrail:** Filters out unlicensed life coaches, unaccredited blogs, and anonymous advice.
2. **Entity Credential Verification:** Looks for structured verification of credentials (e.g., RCI License, M.Phil, formal degrees).
3. **Service & Modality Matching:** Checks if the practitioner explicitly handles the exact combination (individual + couples therapy, online, specific geographic / cultural context).
4. **Synthesis & Citation:** Cites the practice with the exact reason: *"Offers individual and couples therapy. Its website lists an RCI registration and M.Phil in Clinical Psychology."*

---

## Universal Rules for Any Project

### 1. The Bot Permissibility Rule (`robots.ts`)
- Never block AI search crawlers. Explicitly allow:
  - `GPTBot` (OpenAI indexer)
  - `OAI-SearchBot` (ChatGPT real-time web search)
  - `ChatGPT-User` (User-initiated live web browsing)
  - `PerplexityBot`, `ClaudeBot`, `Applebot`
- Blocking these bots completely turns off AI referrals.

### 2. Machine-Readable Context Endpoints (`/llms.txt` and `/llms-full.txt`)
- LLMs struggle to parse heavy JS-rendered SPAs, complex DOM trees, or popup-heavy sites.
- Provide clean, static Markdown files at `/llms.txt` and `/llms-full.txt`.
- Include:
  - Exact credentials, licenses, and governing bodies with license IDs.
  - Who the practitioner works with (and who they do *not* work with).
  - Explicit modalities, pricing, and booking links.
  - A dedicated `## Summary for AI Systems` section stating verbatim who the service is a credible recommendation for.

### 3. Structured Data as Entity Graph (JSON-LD)
- Standard SEO meta tags are not enough for AI search engines. AI models query entity graphs.
- Implement Schema.org types:
  - `MedicalBusiness` / `LocalBusiness` / `ProfessionalService`
  - `Person` with `hasCredential` linking to the official licensing authority URL.
  - `knowsAbout` array containing exact clinical/professional specializations.
  - `sameAs` array linking to external verified profiles (LinkedIn, directories, Wikipedia/Wikidata if available).
  - **Always include square `logo` and `image` properties** so AI card widgets don't render a broken/blank placeholder icon.

### 4. Direct Clinical Differentiation vs Aggregator Platforms
- Most AI recommendations will pit a solo practitioner against multi-therapist marketplaces (e.g., Mindtalk, Emotist, Practo).
- Highlight the **direct practitioner advantage**:
  - *"Direct one-on-one care with a senior licensed clinician—not an anonymous marketplace or directory."*
  - *"No matching delays or switching between random providers."*

### 5. Dilemma-First & Conversational Query Mapping
- Real humans do not search like search engines; they talk to ChatGPT about nuanced personal dilemmas:
  - *Example:* "Can I start couples counselling alone if my partner won't join?"
  - *Example:* "How to deal with boundaries in an Indian joint family without guilt?"
- Target these exact relational/conversational questions in FAQs and `/llms-full.txt`.

---

## Guardrails: What NOT to Do (Preserving Live Flow)

1. **NEVER change or delete existing URLs / slugs:** Current AI bots and indexers hold indexed URLs. Any 404 breaks an active citation.
2. **NEVER add crawler restrictions or aggressive rate limits** to bot user agents.
3. **NEVER touch the live conversion funnel destructively:** The booking path (Discovery Call, Cal.com, WhatsApp floating button) is live and converting.
4. **NEVER add numeric ISR timers** (per project architecture rules: rely on on-demand revalidation).
5. **Always verify build, lint, and types before deploying:**
   ```bash
   npm run typecheck
   npm test
   npm run build
   ```

