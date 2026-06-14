<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ms Paul Therapies — AI Agent Context File

> **Read this first** before making any code changes. This file gives you the full mental model of the codebase in a single pass.

---

## Identity

**Ms Paul Therapies** is the professional online presence for **Aishani Paul**, an RCI-licensed clinical psychologist (License A118537) with M.Phil in Clinical Psychology. The website serves as the primary lead generation + educational platform for her therapy practice.

**This is NOT a marketplace or booking engine.** Visitors discover services → read educational content → book a free discovery call → become clients.

**Core audience:** Indian adults (25–45) seeking mental health support — professionals, couples, parents, students. Also serves NRIs abroad.

**Therapist:** Aishani Paul
**Domain:** mspaultherapies.in
**Sanity Project ID:** k0r3y2my / Dataset: production
**Sanity Studio:** https://mspaultherapies.in/studio

---

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Framework | Next.js 16.2.6 (App Router) | TypeScript 5.x, React 19.2.4 |
| CMS | Sanity.io v5.25.1 | Embedded at `/studio`, GROQ queries |
| Styling | Tailwind CSS v4 | Sage/cream/terracotta palette |
| Icons | Lucide React + React Icons | |
| Rich Text | @portabletext/react | Blog posts, resources |
| Forms | Google Forms embed + Cal.com | No custom form handling |
| Newsletter | Kit (ConvertKit) | Embed script, configurable via Sanity |
| Analytics | Vercel Analytics + Speed Insights | |
| SEO | Built-in Next.js Metadata API | JSON-LD (10+ types), sitemap, robots |
| Fonts | Inter (sans), Playfair Display (serif headings) |
| Hosting | Vercel | Auto-deploy from GitHub |

---

## File Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — metadata, fonts, Header/Footer, WhatsApp, Kit
│   ├── page.tsx                  # Homepage — hero, pain points, services, testimonials, CTA
│   ├── globals.css               # Tailwind + CSS custom properties (sage/cream palette)
│   ├── sitemap.ts                # Dynamic sitemap (services, blog, locations, products)
│   ├── robots.ts                 # Robots.txt — allows AI crawlers, blocks /studio /api
│   ├── not-found.tsx             # Custom 404 page
│   ├── opengraph-image.tsx       # Default OG image (ImageResponse)
│   ├── about/page.tsx            # About Aishani — bio, credentials, approach, values
│   ├── blog/page.tsx             # Blog listing (category filter)
│   ├── blog/[slug]/page.tsx      # Blog detail — BlogPosting JSON-LD
│   ├── book/page.tsx             # Booking page — Cal.com + Google Form embeds
│   ├── emergency-resources/      # Crisis helpline numbers
│   ├── faq/page.tsx              # FAQ page — FAQPage JSON-LD
│   ├── gallery/page.tsx          # Media gallery (Instagram, YouTube, images from Sanity)
│   ├── guide/page.tsx            # First session guide
│   ├── locations/[slug]/page.tsx # City-specific SEO landing pages
│   ├── privacy-policy/           # Privacy policy
│   ├── products/page.tsx         # Digital products listing (Sanity)
│   ├── products/[slug]/page.tsx  # Product detail — Product JSON-LD
│   ├── resources/page.tsx        # Free therapy resources
│   ├── services/page.tsx         # All services listing
│   ├── services/[slug]/page.tsx  # Service detail — ProfessionalService JSON-LD
│   ├── studio/[[...tool]]/       # Sanity Studio
│   ├── terms-consent-cancellation/ # Legal pages
│   ├── tools/                    # Interactive self-help tools (client-only)
│   │   ├── burnout-quiz/         # Burnout assessment quiz
│   │   ├── check-in/             # Emotional check-in
│   │   ├── journal/              # Guided journaling
│   │   ├── reflect/              # Self-reflection prompts
│   │   ├── relationship-reflect/ # Relationship reflection
│   │   └── self-awareness/       # Self-awareness exercise
│   ├── workshops/page.tsx        # Workshops listing
│   ├── llms.txt/                 # LLM discovery file
│   └── llms-full.txt/            # Full LLM discovery file
├── components/
│   ├── BlogPostCTA.tsx           # CTA banner inside blog posts
│   ├── Breadcrumbs.tsx           # Breadcrumb navigation
│   ├── CTASection.tsx            # Reusable call-to-action section
│   ├── DiscoveryCallBanner.tsx   # Top banner promoting free discovery call
│   ├── FAQAccordion.tsx          # FAQ accordion component
│   ├── Footer.tsx                # Site footer
│   ├── GlobalKitEmbed.tsx        # Kit newsletter embed (global modal/slide-in)
│   ├── GoogleFormEmbed.tsx       # Google Form iframe embed
│   ├── Header.tsx                # Navigation header
│   ├── LeadMagnet.tsx            # Lead magnet download component
│   ├── MediaEmbed.tsx            # Instagram/YouTube embed component
│   ├── NewsletterEmbed.tsx       # Inline Kit newsletter form
│   ├── NewsletterSection.tsx     # Newsletter section wrapper
│   ├── PortableTextBody.tsx      # Portable Text renderer for Sanity content
│   ├── PrintButton.tsx           # Print page button
│   ├── ProductCard.tsx           # Product card for listings
│   ├── ProductFilters.tsx        # Product filtering UI
│   ├── SEOJsonLd.tsx             # JSON-LD script tag wrapper
│   ├── ServiceCard.tsx           # Service card for listings
│   ├── SocialIcon.tsx            # Social media icon component
│   ├── StickyBookBar.tsx         # Mobile sticky booking bar
│   ├── TestimonialCard.tsx       # Testimonial display card
│   ├── TrustBar.tsx              # Trust badges (RCI Licensed, 100% Online, etc.)
│   ├── WhatsAppButton.tsx        # Floating WhatsApp chat button
│   └── tools/                    # Tool-specific components
├── content/                      # STATIC fallback content (hardcoded)
│   ├── blog.ts                   # 60+ blog posts with full body text
│   ├── city-data.ts              # City-specific SEO data
│   ├── faqs.ts                   # FAQ questions and answers
│   ├── locations.ts              # Location pages data
│   └── services.ts               # Service definitions
├── lib/
│   ├── data.ts                   # UNIFIED DATA LAYER — Sanity-first, static fallback
│   ├── products.ts               # Product type/topic/audience label maps
│   ├── seo.ts                    # Metadata builder + 10 JSON-LD builders
│   ├── site-config.ts            # Central config (URLs, contact, fees, newsletter)
│   ├── tools/                    # Tool-specific utilities
│   └── utils.ts                  # cn() class merge utility
└── sanity/
    ├── client.ts                 # Sanity client (read-only, useCdn: false)
    ├── env.ts                    # Project ID, dataset, API version
    ├── fetch.ts                  # All Sanity fetch functions + TypeScript interfaces
    ├── image.ts                  # urlFor() image URL builder
    ├── queries.ts                # All GROQ queries
    └── schemas/                  # 12 Sanity document schemas
        ├── index.ts              # Schema registry
        ├── siteConfig.ts         # Singleton — site-wide config
        ├── aboutPage.ts          # Singleton — about page content
        ├── service.ts            # Therapy services
        ├── blogPost.ts           # Blog posts
        ├── faq.ts                # FAQs
        ├── resource.ts           # Free resources
        ├── testimonial.ts        # Client testimonials
        ├── location.ts           # City landing pages
        ├── galleryItem.ts        # Gallery media items
        ├── workshop.ts           # Workshops
        ├── leadCapture.ts        # Lead capture submissions
        └── product.ts            # Digital products
```

---

## Data Flow (Dual-Source Pattern)

This codebase uses a **dual-source data layer** — different from Before Maps:

```
Page component
  → calls function in lib/data.ts (UNIFIED LAYER)
    → tries Sanity fetch from sanity/fetch.ts
      → runs GROQ query via Sanity client
    → if Sanity returns data → use it
    → if Sanity fails/empty → fall back to static content/*.ts files
```

**Key files in the chain:**
1. `sanity/schemas/*.ts` — defines the data shape in Sanity Studio
2. `sanity/queries.ts` — GROQ queries to fetch data
3. `sanity/fetch.ts` — typed fetch functions + TypeScript interfaces
4. `lib/data.ts` — **the unified layer** that wraps Sanity with static fallbacks
5. `app/*/page.tsx` — page components that call `lib/data.ts` functions

**IMPORTANT:** Pages import from `lib/data.ts`, NOT from `sanity/fetch.ts` directly. The only exception is `getFeaturedGalleryItems()` and `getAllProducts/Slugs()` which are imported directly from `sanity/fetch.ts` in some pages.

---

## Sanity Schema Map (12 Document Types)

| Type | Singleton? | Key Fields |
|---|---|---|
| `siteConfig` | Yes | name, tagline, contact info, fees, newsletter config, payment |
| `aboutPage` | Yes | bio paragraphs, photo, credentials, values, social links |
| `service` | No | title, slug, description, icon, highlights, idealFor, approach, fee |
| `blogPost` | No | title, slug, body (portableText), category, publishedAt, readingTime |
| `faq` | No | question, answer, category, order |
| `resource` | No | title, tag, icon, content (portableText), order |
| `testimonial` | No | quote, name, context, approved (visibility toggle) |
| `location` | No | name, slug, title, description, metaDescription, features, services |
| `galleryItem` | No | title, type (reel/post/video/image), url, image, featured |
| `workshop` | No | title, slug, description, body, date, fee, status, published |
| `leadCapture` | No | email, name, source, notes |
| `product` | No | title, slug, productType, priceType, price, topics, audience, body |

### Visibility Toggles
- Blog Posts: `published` (boolean)
- Testimonials: `approved` (boolean)
- Workshops: `published` + `status` (upcoming/open/sold-out/completed)
- Products: `published` (boolean)

---

## SEO Architecture

### Metadata
- `buildMetadata()` in `lib/seo.ts` — standard page metadata builder
- `buildArticleMetadata()` — article-specific (blog posts)
- Root layout uses `title.template: "%s | Ms Paul Therapies"`
- `metadataBase` set to `https://mspaultherapies.in`

### Structured Data (JSON-LD) — 10 builders in `lib/seo.ts`
- `organizationJsonLd()` — MedicalBusiness schema
- `websiteJsonLd()` — WebSite with SearchAction
- `localBusinessJsonLd()` — MedicalBusiness with area served
- `personJsonLd()` — Person schema for Aishani
- `profilePageJsonLd()` — ProfilePage for /about
- `serviceJsonLd()` — ProfessionalService per service
- `productJsonLd()` — Product per digital product
- `faqPageJsonLd()` — FAQPage schema
- `blogPostingJsonLd()` — BlogPosting per blog post
- `breadcrumbJsonLd()` — BreadcrumbList
- `speakableJsonLd()` — Speakable specification

### Sitemap & Robots
- `sitemap.ts` — static pages + dynamic blog, services, locations, products
- `robots.ts` — allows all crawlers (including 15+ AI crawlers by name), blocks `/studio` and `/api`

### LLM Discovery
- `/llms.txt` and `/llms-full.txt` — structured files for LLM crawlers

---

## Color Tokens (Tailwind v4)

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FDF8F0` | Page background |
| `cream-dark` | `#F5EDE0` | Accent background |
| `sage` | `#87A878` | Primary (buttons, links, ring) |
| `sage-light` | `#A8C49A` | Hover states |
| `sage-dark` | `#6B8F5B` | Active states |
| `terracotta` | `#C4795A` | Secondary accent |
| `brown` | `#3E2723` | Text foreground |
| `brown-light` | `#5D4037` | Muted text |
| `beige` | `#EDE0D0` | Muted backgrounds |
| `beige-dark` | `#D4C4B0` | Borders |

---

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k0r3y2my
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_GA_ID=...
NEXT_PUBLIC_META_PIXEL_ID=...
```

---

## Known Gotchas

1. **Dual-source data:** Content lives in BOTH Sanity AND `src/content/*.ts` static files. Sanity takes priority; static is fallback. When adding content, add to Sanity Studio first — the static files are the safety net.

2. **Homepage is mostly hardcoded:** Pain points, "how it works" steps, and trust badges are arrays in `src/app/page.tsx`, not in Sanity. Services, testimonials, and gallery items come from Sanity via `lib/data.ts`.

3. **Blog content is massive:** `src/content/blog.ts` is 40KB with 60+ full blog posts as static fallback. This file is the fallback if Sanity has no blog posts.

4. **Tools pages are client-only:** The `/tools/*` pages (burnout quiz, journal, check-in, etc.) are interactive client components with no server data. They store state in localStorage.

5. **No write client:** `sanity/client.ts` is read-only (`useCdn: false`). There are no API routes that write to Sanity. Lead captures and form submissions go through Google Forms and Cal.com, not the app.

6. **Newsletter is Kit (ConvertKit):** Configured in `lib/site-config.ts` → overridable in Sanity `siteConfig`. Three modes: `inline` (in-page form), `modal`/`slide-in`/`sticky-bar` (global overlay via `GlobalKitEmbed`), `off`.

7. **Location pages are SEO pages:** `/locations/[slug]` pages exist purely for "therapist in {city}" SEO. Content comes from `content/locations.ts` and `content/city-data.ts` with Sanity override capability.

8. **WhatsApp button is always visible:** Floating bottom-right on all pages. Number configured in `site-config.ts`.

9. **Discovery call banner:** Top-of-page banner on every page, links to Cal.com. Rendered in root layout.

10. **Domain redirect:** `vercel.json` redirects `mspaultherapies.com` → `mspaultherapies.in` (permanent).

---

## Quick Rules

- ISR: `revalidate: 60` on most pages
- Import data from `@/lib/data` (unified layer), NOT from `@/sanity/fetch` directly
- Static fallback content lives in `src/content/*.ts`
- Site config lives in `src/lib/site-config.ts` (overridable via Sanity `siteConfig` singleton)
- All JSON-LD builders are in `src/lib/seo.ts`
- No dark mode — this site uses a fixed warm cream/sage palette
- Tests: `npm test` (Vitest) · Type check: `npm run typecheck` · Format: `npm run format`
- **Read `docs/lessons/` before every session** — contains rules about what NOT to do

## Docs Index

- `CLAUDE.md` — Claude-specific context (standalone)
- `AGENTS.md` — This file (full AI agent context)
- `MASTER-RCA.md` — Complete technical + marketing documentation
- `docs/ARCHITECTURE.md` — System architecture and data flow
- `docs/HANDBOOK.md` — Human-readable maintenance guide
- `docs/HOW-IT-WORKS.md` — Complete site explainer for the founder
