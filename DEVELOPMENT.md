# Ms Paul Therapies — Development Guide

## Setup
```bash
git clone git@github.com:Harp6x/misspaultherapies.git
cd miss-paul-therapies
npm install
cp .env.example .env.local  # Add Sanity project ID
npm run dev                  # → http://localhost:3000
```

## Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k0r3y2my
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=...
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_META_PIXEL_ID=...
```

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run format` | Prettier format |
| `npm run format:check` | Prettier check |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report |

## Verify Before Committing
```bash
npm run typecheck  # tsc --noEmit
npm test           # Vitest
npm run build      # Production build
```

## Deploy
Push to `main` branch → Vercel auto-deploys to mspaultherapies.in.

## Key Development Notes
- **Data imports:** Always use `@/lib/data` (unified layer), NOT `@/sanity/fetch` directly
- **No dark mode:** Fixed warm cream/sage/terracotta palette
- **No write client:** Sanity is read-only from code. Use Studio UI for content changes.
- **Caching:** No timed ISR. Sanity publishes call `/api/revalidate`; deployments rebuild the site.
- **Static fallback:** `src/content/*.ts` files provide fallback content when Sanity is empty
