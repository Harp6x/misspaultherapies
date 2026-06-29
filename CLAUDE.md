# Ms Paul Therapies — Claude Context

**Stack:** Next.js 16.2.6 (App Router) · TypeScript · React 19 · Sanity v5 · Tailwind CSS v4

**Read `AGENTS.md` first** — full codebase context: architecture, Sanity schema map (12 types), dual-source data pattern, SEO setup, color tokens, known gotchas.

**What this site is:** Professional online presence for Aishani Paul, RCI-licensed clinical psychologist. Lead generation + educational content platform. NOT a booking engine — uses Cal.com for scheduling.

## Quick Rules
- Font: Inter (sans) + Playfair Display (serif headings)
- Caching: no timed ISR. Public pages update only through the Sanity publish webhook or a new Vercel deployment.
- Data: import from `@/lib/data` (unified layer), NOT from `@/sanity/fetch` directly
- No dark mode — fixed warm cream/sage/terracotta palette
- No write client — Sanity is read-only. Forms go through Google Forms + Cal.com
- Homepage is mostly hardcoded — pain points, how-it-works, trust badges are arrays in `page.tsx`
- Static fallback content lives in `src/content/*.ts` (blog.ts is 40KB with 60+ posts)
- Tests: `npm test` (Vitest) · Type check: `npm run typecheck` · Format: `npm run format`
- **Read `docs/lessons/` before every session** — contains rules about what NOT to do

## Key Locations
- Site config: `src/lib/site-config.ts` (overridable via Sanity `siteConfig` singleton)
- SEO + JSON-LD: `src/lib/seo.ts` (10 builders: organization, person, service, product, FAQ, blog, breadcrumb, etc.)
- Data layer: `src/lib/data.ts` → wraps `src/sanity/fetch.ts` with `src/content/*.ts` fallbacks
- Schemas: `src/sanity/schemas/` (12 document types)
- Queries: `src/sanity/queries.ts` (all GROQ queries)

## Docs Index
- `AGENTS.md` — Full AI agent context (detailed)
- `MASTER-RCA.md` — Complete technical + marketing documentation
- `docs/ARCHITECTURE.md` — System architecture and data flow
- `docs/HANDBOOK.md` — Human-readable maintenance guide
- `docs/HOW-IT-WORKS.md` — Complete site explainer for the founder
