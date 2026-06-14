# Lesson: Never Break Existing Functionality

## Rule
Always verify that existing pages and features still work after making changes.

## Checklist (run after every change)
```bash
npm run typecheck   # TypeScript passes
npm run lint        # ESLint passes
npm test            # All tests pass
npm run build       # Production build succeeds
```

## Why
- The site has 26 pages, many with shared components
- A change to `lib/data.ts` affects almost every page
- A change to `lib/seo.ts` affects every page's metadata
- A change to a Sanity schema requires matching query + fetch + data layer updates
