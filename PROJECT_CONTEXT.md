# Ms Paul Therapies — Project Context

## Purpose
Professional online therapy practice for Aishani Paul — RCI-licensed clinical psychologist (License A118537). Lead generation + educational content platform. NOT a booking engine.

## Business Model
- Therapy sessions (per-session fee, booked via Cal.com)
- Digital products (workbooks, worksheets, guides)
- Workshops (occasional group sessions)
- Newsletter (Kit/ConvertKit)

## Current Status
**Active — live at mspaultherapies.in.** Full-featured site with services, blog (60+ posts), tools, products, FAQ, gallery, location SEO pages.

## Architecture
Next.js 16 (App Router) + Sanity v5 + Tailwind CSS v4. Dual-source data: Sanity-first with static file fallback. 10+ JSON-LD builders for SEO. Embedded Sanity Studio at `/studio`.

See `AGENTS.md` for full architecture details (299 lines).

## Dependencies
- **Runtime:** Next.js 16, React 19, Sanity v5, @portabletext/react, lucide-react, resend
- **CMS:** Sanity (project k0r3y2my, dataset production)
- **Forms:** Google Forms + Cal.com
- **Newsletter:** Kit (ConvertKit)
- **Infra:** Vercel (hosting), GitHub

## Technical Debt
- Homepage mostly hardcoded (pain points, how-it-works, trust badges)
- `src/content/blog.ts` is 40KB — large static fallback
- No write client — all Sanity mutations done via Studio UI

## Documentation Coverage
| Doc | Exists | Quality |
|---|---|---|
| CLAUDE.md | Yes | Good |
| AGENTS.md | Yes | Comprehensive (299 lines) |
| MASTER-RCA.md | Yes | Complete |
| docs/ARCHITECTURE.md | Yes | Good |
| docs/HANDBOOK.md | Yes | Good |
| docs/HOW-IT-WORKS.md | Yes | Good |
| docs/lessons/ | Yes | 3 lessons |
| PROJECT_CONTEXT.md | Yes (this file) | New |
