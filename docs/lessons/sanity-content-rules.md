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
If Sanity has no data for a content type, the app falls back to `src/content/*.ts`. This means:
- Blog posts fall back to 60+ static posts in `content/blog.ts`
- Services fall back to static definitions in `content/services.ts`
- FAQs fall back to static questions in `content/faqs.ts`

The static files are the safety net — they ensure the site is never empty.
