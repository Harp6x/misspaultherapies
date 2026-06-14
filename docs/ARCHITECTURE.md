# Ms Paul Therapies — Architecture

## System Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   Sanity CMS    │────▶│   Next.js App    │────▶│    Vercel      │
│  (k0r3y2my)     │     │  (App Router)    │     │  (Production)  │
│                 │     │                  │     │                │
│ 12 doc types    │     │ ISR: 60s cache   │     │ Auto-deploy    │
│ GROQ queries    │     │ Dual-source data │     │ from GitHub    │
│ Studio at       │     │ 26 pages         │     │                │
│ /studio         │     │ 24 components    │     │ CDN + Edge     │
└─────────────────┘     └──────────────────┘     └────────────────┘
                               │
                        ┌──────┴──────┐
                        │  Static     │
                        │  Fallback   │
                        │  content/   │
                        │  *.ts       │
                        └─────────────┘
```

---

## Dual-Source Data Layer

The unique aspect of this architecture is the **dual-source pattern** — every data type has both a Sanity source and a static TypeScript fallback.

### Flow

```
Page Component (app/*/page.tsx)
    │
    ▼
Unified Data Layer (lib/data.ts)
    │
    ├──▶ Try: Sanity Fetch (sanity/fetch.ts)
    │       │
    │       ├──▶ GROQ Query (sanity/queries.ts)
    │       │       │
    │       │       ▼
    │       │    Sanity Client (sanity/client.ts)
    │       │       │
    │       │       ▼
    │       │    Sanity API (k0r3y2my.api.sanity.io)
    │       │
    │       ▼
    │    Data returned? ──yes──▶ Use Sanity data
    │                   │
    │                   no
    │                   │
    ├──▶ Fallback: Static Content (content/*.ts)
    │       │
    │       ├── blog.ts (60+ posts)
    │       ├── services.ts (6 services)
    │       ├── faqs.ts (FAQ list)
    │       ├── locations.ts (city SEO pages)
    │       └── city-data.ts (city metadata)
    │
    ▼
Page renders with whichever source provided data
```

### Which Content Uses Dual-Source

| Content Type | Sanity Schema | Static Fallback | Notes |
|---|---|---|---|
| Site Config | `siteConfig` | `lib/site-config.ts` | Singleton, merged field-by-field |
| About Page | `aboutPage` | Inline in `lib/data.ts` | Singleton |
| Services | `service` | `content/services.ts` | Array replacement |
| Blog Posts | `blogPost` | `content/blog.ts` | Array replacement |
| FAQs | `faq` | `content/faqs.ts` | Array replacement |
| Testimonials | `testimonial` | Inline in `lib/data.ts` | 3 placeholder testimonials |
| Locations | `location` | `content/locations.ts` | **Merged** (Sanity overrides matching slugs) |
| Resources | `resource` | Empty array `[]` | No static fallback |
| Gallery | `galleryItem` | N/A | Sanity-only |
| Workshops | `workshop` | N/A | Sanity-only |
| Products | `product` | N/A | Sanity-only |
| Lead Captures | `leadCapture` | N/A | Sanity-only (write via Studio) |

### Location Merge Pattern (Special)

Locations use a unique **merge** strategy (not replacement):
```
Sanity locations → take priority
Static locations → fill in any slugs NOT already in Sanity
Result → union of both sets
```

This means you can add cities in Sanity without duplicating the static ones that already exist.

---

## Component Hierarchy

```
RootLayout (app/layout.tsx)
├── DiscoveryCallBanner          # Top bar — Cal.com link
├── Header                       # Nav with mobile menu
├── {page content}               # Route-specific
├── Footer                       # Links, social, legal
├── WhatsAppButton               # Floating chat
├── StickyBookBar                # Mobile sticky CTA
├── GlobalKitEmbed (conditional) # Newsletter overlay
├── Analytics                    # Vercel
└── SpeedInsights                # Vercel
```

### Homepage Component Assembly

```
Homepage (app/page.tsx)
├── SEOJsonLd (Organization + WebSite + LocalBusiness)
├── Hero Section (hardcoded)
│   ├── TrustBar (3 badges: RCI, Online, Global)
│   └── CTA buttons
├── Pain Points Grid (4 items, hardcoded)
├── ServiceCard × N (from Sanity/fallback)
├── How It Works Steps (3 items, hardcoded)
├── TestimonialCard × N (from Sanity/fallback)
├── MediaEmbed (featured gallery from Sanity)
├── Blog Preview (latest posts)
├── CTASection (bottom CTA)
└── NewsletterSection (Kit embed)
```

---

## Rendering Strategy

| Page | Strategy | Revalidation |
|---|---|---|
| Homepage | ISR | 60s |
| About | ISR | 60s |
| Services listing | ISR | 60s |
| Service detail | ISR + `generateStaticParams` | 60s |
| Blog listing | ISR | 60s |
| Blog detail | ISR + `generateStaticParams` | 60s |
| Products listing | ISR | 60s |
| Product detail | ISR + `generateStaticParams` | 60s |
| Location pages | ISR + `generateStaticParams` | 60s |
| FAQ | ISR | 60s |
| Gallery | ISR | 60s |
| Workshops | ISR | 60s |
| Tools/* | Static (client-only) | N/A |
| Book | Static | N/A |
| Legal pages | Static | N/A |

---

## SEO Pipeline

```
Page Component
    │
    ├── export metadata = buildMetadata({...})     # Standard pages
    │   or buildArticleMetadata({...})              # Blog posts
    │
    ├── <SEOJsonLd data={...JsonLd()} />           # Structured data
    │   ├── organizationJsonLd()                    # Root layout
    │   ├── websiteJsonLd()                         # Root layout
    │   ├── localBusinessJsonLd()                   # Homepage
    │   ├── personJsonLd()                          # About
    │   ├── profilePageJsonLd()                     # About
    │   ├── serviceJsonLd()                         # Service detail
    │   ├── productJsonLd()                         # Product detail
    │   ├── faqPageJsonLd()                         # FAQ page
    │   ├── blogPostingJsonLd()                     # Blog detail
    │   ├── breadcrumbJsonLd()                      # Multiple pages
    │   └── speakableJsonLd()                       # Key pages
    │
    ├── sitemap.ts                                  # Dynamic sitemap
    │   └── Static + blog + services + locations + products
    │
    └── robots.ts                                   # Robots with AI crawler allow-list
        └── 15+ AI crawlers explicitly allowed
```

---

## External Integrations

| Service | Purpose | Config Location |
|---|---|---|
| **Cal.com** | Discovery call + session booking | `site-config.ts` → `discoveryCallUrl`, `sessionBookingUrl` |
| **Google Forms** | Intake form | `site-config.ts` → `googleFormUrl` |
| **Kit (ConvertKit)** | Email newsletter | `site-config.ts` → `newsletter` object |
| **WhatsApp** | Direct chat | `site-config.ts` → `whatsappNumber` |
| **UPI** | Payment | `site-config.ts` → `upiId`, `upiNumber` |
| **Razorpay** | Payment (optional) | Sanity `siteConfig` → `razorpayUrl` |
| **Vercel Analytics** | Traffic analytics | Auto-configured |
| **Vercel Speed Insights** | Performance monitoring | Auto-configured |

---

## Security

### Headers (next.config.ts)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Access Control
- Sanity client is **read-only** (no write token in the app)
- `/studio` requires Sanity account authentication
- `/api/` blocked in robots.txt
- No user authentication — public site
- Domain redirect enforced in `vercel.json`

---

*For the full AI agent context, see `AGENTS.md`. For maintenance instructions, see `docs/HANDBOOK.md`.*
