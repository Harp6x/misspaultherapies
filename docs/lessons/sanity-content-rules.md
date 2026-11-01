# Lesson: Sanity Content Rules

## Rule
Distinguish between **content gaps** (empty/missing Sanity data) and **code bugs**.

## Key Facts
- Sanity client is **read-only** — the app cannot write to Sanity
- Content changes happen in Sanity Studio at `/studio`
- Publishing calls the Sanity revalidation webhook; affected pages refresh on their next request

## Common Mistakes
- Seeing an empty section and assuming it's a code bug → check Sanity first
- Seeing a 404 on a product/blog post → check if `published: true` in Sanity
- Testimonials not showing → check if `approved: true` in Sanity

## The Dual-Source Pattern
If Sanity has no data for a content type, the app falls back to `src/content/*.ts`.
When Sanity is seeded, `lib/data.ts` uses Sanity as the primary authority, and merges in any additional static items from `src/content/*.ts` whose slugs are not in Sanity. This ensures:
- Blog posts in Sanity remain authoritative, while new articles added in code are immediately live.
- FAQs in Sanity are preserved, while new question clusters added in code appear seamlessly.
- Deletion or override in Sanity automatically takes precedence over static fallbacks.
