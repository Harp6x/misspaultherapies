# Ms Paul Therapies — How Everything Works

> Written for the founder. Plain English, no jargon.

---

## The Big Picture

Your website (`mspaultherapies.in`) is built with these pieces:

1. **Next.js** — The engine that builds your web pages. It takes your content and turns it into fast, SEO-friendly HTML pages.
2. **Sanity CMS** — Your content dashboard at `/studio`. This is where you manage blog posts, services, testimonials, products, and everything else.
3. **Vercel** — The server that hosts your website. Every time code is pushed to GitHub, Vercel automatically rebuilds and publishes the site.
4. **Tailwind CSS** — The styling system. Your sage green + cream + terracotta color palette is defined here.

### How data flows

```
You edit content in Sanity Studio
    → Sanity stores it in the cloud
    → Next.js fetches it every 60 seconds
    → Vercel serves the updated page to visitors
```

If Sanity is ever down or empty, the website **falls back to built-in content** — your blog posts, services, and FAQ all have backup copies baked into the code. The site never shows blank pages.

---

## What You Can Edit (Without Code)

Everything below is managed through **Sanity Studio** at `mspaultherapies.in/studio`:

| What | Where in Studio | What It Controls |
|---|---|---|
| **Site Config** | Site Config (singleton) | Practice name, contact info, fees, WhatsApp number, payment info, newsletter |
| **About Page** | About Page (singleton) | Your bio, photo, credentials, therapeutic approach, values |
| **Services** | Service (list) | Each therapy type — title, description, who it's for, fee |
| **Blog Posts** | Blog Post (list) | Articles with rich text, categories, publish date |
| **FAQs** | FAQ (list) | Questions and answers, organized by category |
| **Testimonials** | Testimonial (list) | Client quotes (toggle `approved` to show/hide) |
| **Products** | Product (list) | Digital products — courses, eBooks, toolkits |
| **Workshops** | Workshop (list) | Events with date, fee, registration link, status |
| **Gallery** | Gallery Item (list) | Instagram reels, YouTube videos, images |
| **Resources** | Resource (list) | Free therapy resources |
| **Locations** | Location (list) | City-specific SEO landing pages |

### Quick Guide: Publishing

1. Open the document in Studio
2. Edit the fields you want to change
3. Click **Publish** (top right)
4. Wait ~60 seconds → your change is live on the website

### Visibility Toggles

Some content has an on/off switch:
- **Blog Posts:** Set `published` to true/false
- **Testimonials:** Set `approved` to true/false
- **Workshops:** Set `published` to true/false, plus `status` (upcoming, open, sold-out, completed)
- **Products:** Set `published` to true/false

---

## What's Hardcoded (Needs Code to Change)

These parts live in the code, NOT in Sanity:

| What | Where in Code | Notes |
|---|---|---|
| Homepage pain points | `src/app/page.tsx` | "Overwhelmed by anxiety", "Struggling in relationships", etc. |
| Homepage "How it Works" | `src/app/page.tsx` | 3-step process (Book → Begin → Grow) |
| Trust badges | `src/app/page.tsx` | "RCI Licensed", "100% Online", "India & Abroad" |
| Emergency resources | `src/app/emergency-resources/page.tsx` | Crisis helpline numbers |
| Self-help tools | `src/app/tools/*/page.tsx` | Burnout quiz, journal, reflection exercises |
| Privacy policy | `src/app/privacy-policy/page.tsx` | Legal text |
| Terms & consent | `src/app/terms-consent-cancellation/page.tsx` | Legal text |
| First session guide | `src/app/guide/page.tsx` | "What to Expect" guide |

To change these, either ask your developer or edit the `.tsx` files directly.

---

## How External Services Connect

### Booking (Cal.com)
- **Discovery Call:** `cal.com/mspaultherapies/discovery-call`
- **Session Booking:** `cal.com/mspaultherapies/sessionbooking`
- These are linked from buttons across the site. To change the link, update `site-config.ts` or the Sanity Site Config.

### Intake Form (Google Forms)
- Embedded on the `/book` page
- Link: `forms.gle/7jRaX8H9ftoG34726`

### Newsletter (Kit / ConvertKit)
- Configured in Site Config (Sanity or `site-config.ts`)
- Modes: `inline` (form on page), `modal` (popup), `slide-in`, `sticky-bar`, `off`
- Current UID: `1d5b37459d`

### WhatsApp
- Floating green button on every page
- Number: `+91 91233 11295` (configurable in Site Config)

### Payment
- UPI ID: `paulaishani@oksbi`
- Razorpay: optional (set URL in Sanity to enable)

---

## SEO: What's Already Set Up

Your site is heavily optimized for search engines:

1. **Structured Data (JSON-LD):** Every page tells Google exactly what it is — your practice is marked as a `MedicalBusiness`, each service as a `ProfessionalService`, blog posts as `BlogPosting`, etc.

2. **Sitemap:** Auto-generated at `/sitemap.xml` — includes all pages, blog posts, services, products, and location pages.

3. **AI Crawler Access:** 15+ AI crawlers (ChatGPT, Claude, Perplexity, etc.) are explicitly allowed to index your site. Plus `/llms.txt` files for LLM discovery.

4. **Location SEO:** City-specific pages (`/locations/mumbai`, `/locations/delhi`, etc.) target "therapist in {city}" searches.

5. **Meta Tags:** Every page has title, description, Open Graph, and Twitter cards configured.

---

## How to Add New Things

### A new page to the website
This requires code changes. Your developer will:
1. Create a new folder in `src/app/{page-name}/`
2. Add a `page.tsx` file with content
3. Add SEO metadata
4. Update sitemap if needed
5. Push to GitHub → Vercel deploys automatically

### A new service type
1. Go to Sanity Studio → **+ Create** → **Service**
2. Fill in all fields (title, slug, description, icon, fee, etc.)
3. Publish → it appears on `/services` and gets its own detail page at `/services/{slug}`

### A new blog category
Categories are text fields on blog posts — just type a new category name when creating a post. The filter on `/blog` will automatically include it.

### A new city landing page
1. Go to Sanity Studio → **+ Create** → **Location**
2. Set the city name, slug, title, and SEO description
3. Publish → creates a new page at `/locations/{slug}`

---

## Glossary

| Term | Meaning |
|---|---|
| **ISR** | Incremental Static Regeneration — pages are cached and rebuilt every 60 seconds |
| **CMS** | Content Management System (Sanity Studio) |
| **Slug** | The URL-friendly version of a title (e.g., "anxiety-therapy" for "Anxiety Therapy") |
| **JSON-LD** | Structured data that helps Google understand your content |
| **GROQ** | Sanity's query language (like a search filter for your content) |
| **Portable Text** | Sanity's rich text format (supports bold, links, headers, etc.) |
| **Singleton** | A document type that only has one instance (e.g., Site Config, About Page) |
| **Fallback** | Backup content used when Sanity is unavailable |
