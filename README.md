# Ms Paul Therapies

Professional therapy website for **Aishani Paul** — RCI-licensed clinical psychologist offering online therapy across India and for NRIs abroad.

**Live:** [mspaultherapies.in](https://mspaultherapies.in)

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.6 (App Router), TypeScript, React 19 |
| CMS | Sanity v5.25.1 (embedded at `/studio`) |
| Styling | Tailwind CSS v4 (sage/cream/terracotta palette) |
| Icons | Lucide React |
| Fonts | Inter (body) + Playfair Display (headings) |
| Hosting | Vercel (auto-deploy from GitHub) |

## Setup

```bash
npm install
cp .env.example .env.local   # Add Sanity project ID
npm run dev                   # → http://localhost:3000
```

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k0r3y2my
NEXT_PUBLIC_SANITY_DATASET=production
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm test` | Vitest |

## Project Structure

```
src/
├── app/          # 26 pages (App Router)
├── components/   # 24 components
├── content/      # Static fallback data (blog, services, FAQs, locations)
├── lib/          # Data layer, SEO, site config, utilities
├── sanity/       # Client, queries, fetch functions, 12 schemas
└── types/        # Centralized TypeScript interfaces
```

## Documentation

| File | Purpose |
|---|---|
| `AGENTS.md` | Full AI agent context |
| `CLAUDE.md` | Claude-specific quick context |
| `MASTER-RCA.md` | Complete technical + marketing documentation |
| `docs/ARCHITECTURE.md` | System architecture and data flow |
| `docs/HANDBOOK.md` | Maintenance guide (common tasks) |
| `docs/HOW-IT-WORKS.md` | Founder-friendly site explainer |
| `docs/lessons/` | Hard-learned rules about what NOT to do |

## Key Architecture

**Dual-source data:** Pages fetch from Sanity first; if unavailable, fall back to static `content/*.ts` files. The unified layer lives in `src/lib/data.ts`.

**SEO:** 10+ JSON-LD builders, dynamic sitemap, AI crawler allow-list (15+ bots), `/llms.txt` for LLM discovery.

**ISR:** All pages revalidate every 60 seconds.
