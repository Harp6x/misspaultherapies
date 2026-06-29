# Lesson: Hardcoded Content Map

## Rule

All fields exposed in Sanity must be rendered from Sanity. Code owns layout, interaction, emergency/legal copy, and local fallback content only.

## Hardcoded Content (requires code changes to edit)

| Content                | File                                          | Notes                                                                                                   |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Homepage CTA labels    | `src/app/page.tsx`                            | Hero name, tagline, description, slides, and background are in Site Configuration                       |
| Pain points (4 items)  | `src/app/page.tsx`                            | Icon + title + description                                                                              |
| "How It Works" steps   | `src/app/page.tsx`                            | 3-step process                                                                                          |
| Trust badges           | `src/app/page.tsx`                            | RCI Licensed, 100% Online, India & Abroad                                                               |
| Emergency resources    | `src/app/emergency-resources/page.tsx`        | Crisis helplines                                                                                        |
| Privacy policy         | `src/app/privacy-policy/page.tsx`             | Legal text                                                                                              |
| Terms & consent        | `src/app/terms-consent-cancellation/page.tsx` | Legal text                                                                                              |
| First session guide    | `src/app/guide/page.tsx`                      | Full guide content                                                                                      |
| Self-help tools        | `src/app/tools/*/page.tsx`                    | Quiz, journal, check-in content                                                                         |
| Product display labels | `src/lib/products.ts`                         | Friendly labels for known values; available filters come from Site Configuration and published products |
| SEO keywords           | `src/app/layout.tsx`                          | Root metadata keywords array                                                                            |

## Static Fallback Content (used only when Sanity cannot be reached)

| Content          | File                        |
| ---------------- | --------------------------- |
| Site config      | `src/lib/site-config.ts`    |
| About page       | Inline in `src/lib/data.ts` |
| Services         | `src/content/services.ts`   |
| Blog posts (60+) | `src/content/blog.ts`       |
| FAQs             | `src/content/faqs.ts`       |
| Locations        | `src/content/locations.ts`  |
| City SEO data    | `src/content/city-data.ts`  |
| Testimonials (3) | Inline in `src/lib/data.ts` |

An intentionally empty Sanity collection stays empty. It must not resurrect the static fallback. This keeps Sanity authoritative after an editor deletes or unpublishes the final document.

## Sanity render coverage

- Site Configuration drives branding, contact and booking links, fees, payments, social links, newsletter settings, visibility toggles, SEO, team, hero media, backgrounds, and category/filter options.
- About, services, blog posts, FAQs, resources, testimonials, locations, gallery items, workshops, and products render every public field in their schema.
- Blog cover images and embeds, testimonial photos/ratings/anonymous state/related services, location features/services, product featured state, and workshop full descriptions/detail pages must remain wired.
- Every publish invalidates its data tag and all affected list, detail, homepage, sitemap, layout, or social-image paths via `/api/revalidate`.
