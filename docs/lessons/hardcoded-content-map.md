# Lesson: Hardcoded Content Map

## Rule
Not all content is in Sanity. Some content lives directly in source code files.

## Hardcoded Content (requires code changes to edit)

| Content | File | Notes |
|---|---|---|
| Homepage hero text | `src/app/page.tsx` | Title, subtitle, CTA buttons |
| Pain points (4 items) | `src/app/page.tsx` | Icon + title + description |
| "How It Works" steps | `src/app/page.tsx` | 3-step process |
| Trust badges | `src/app/page.tsx` | RCI Licensed, 100% Online, India & Abroad |
| Emergency resources | `src/app/emergency-resources/page.tsx` | Crisis helplines |
| Privacy policy | `src/app/privacy-policy/page.tsx` | Legal text |
| Terms & consent | `src/app/terms-consent-cancellation/page.tsx` | Legal text |
| First session guide | `src/app/guide/page.tsx` | Full guide content |
| Self-help tools | `src/app/tools/*/page.tsx` | Quiz, journal, check-in content |
| Blog categories | `src/content/blog.ts` | `blogCategories` array |
| FAQ categories | `src/content/faqs.ts` | `faqCategories` array |
| Product type labels | `src/lib/products.ts` | Type, topic, audience labels |
| SEO keywords | `src/app/layout.tsx` | Root metadata keywords array |

## Static Fallback Content (code-based, overridden by Sanity when available)

| Content | File |
|---|---|
| Site config | `src/lib/site-config.ts` |
| About page | Inline in `src/lib/data.ts` |
| Services | `src/content/services.ts` |
| Blog posts (60+) | `src/content/blog.ts` |
| FAQs | `src/content/faqs.ts` |
| Locations | `src/content/locations.ts` |
| City SEO data | `src/content/city-data.ts` |
| Testimonials (3) | Inline in `src/lib/data.ts` |
