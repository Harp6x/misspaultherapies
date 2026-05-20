# Miss Paul Therapies

Professional therapy website for Miss Paul — a licensed clinical psychologist offering online psychotherapy and counselling across India and abroad.

## Stack

- **Next.js 16** (App Router, TypeScript, static generation)
- **Tailwind CSS v4** (custom cream/sage/terracotta palette)
- **Lucide React** (icons)
- **Google Fonts** — Playfair Display (headings) + Inter (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/
│   ├── blog/[slug]/
│   ├── book/
│   ├── emergency-resources/
│   ├── faq/
│   ├── locations/[slug]/   # 6 SEO location pages
│   ├── privacy-policy/
│   ├── resources/
│   ├── services/[slug]/    # 6 service detail pages
│   ├── terms-consent-cancellation/
│   ├── layout.tsx          # Root layout (Header, Footer, WhatsApp)
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts
│   └── not-found.tsx
├── components/             # Shared UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── CTASection.tsx
│   ├── ServiceCard.tsx
│   ├── FAQAccordion.tsx
│   ├── TestimonialCard.tsx
│   ├── GoogleFormEmbed.tsx
│   ├── Breadcrumbs.tsx
│   └── SEOJsonLd.tsx
├── content/                # CMS-ready data files
│   ├── services.ts
│   ├── faqs.ts
│   ├── blog.ts
│   └── locations.ts
└── lib/
    ├── site-config.ts      # Central config (name, email, fees, etc.)
    ├── seo.ts              # Metadata & JSON-LD helpers
    └── utils.ts            # cn() utility
```

## How to Update Content

All editable content lives in two places:

1. **`src/lib/site-config.ts`** — Contact details, credentials, fees, social links, WhatsApp number, Google Form URL. Replace `[TO ADD]` placeholders before launch.

2. **`src/content/`** — Services, FAQs, blog posts, location pages. Edit these files to add/modify content without touching page components.

## Pre-Launch Checklist

- [ ] Replace `[TO ADD]` values in `site-config.ts` (phone, RCI number, WhatsApp, socials, form URLs)
- [ ] Add professional photos to `public/` and replace placeholder divs
- [ ] Add real OG image at `public/og-image.jpg` (1200x630)
- [ ] Add favicon at `src/app/favicon.ico`
- [ ] Review and customise privacy policy and terms (get legal review)
- [ ] Replace placeholder testimonials with real ones (with consent)
- [ ] Write and publish blog articles (set `published: true` in `blog.ts`)
- [ ] Set `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_META_PIXEL_ID` env vars for analytics
- [ ] Update `url` in `site-config.ts` to production domain
- [ ] Run `npm run build` to verify all pages generate successfully
- [ ] Test on mobile, tablet, and desktop

## Deployment

Static export is compatible with Vercel, Netlify, Cloudflare Pages, or any static host:

```bash
npm run build     # generates .next/ with static pages
npm start         # local production server
```

Deploy to Vercel:

```bash
npx vercel
```

## Routes (37 pages)

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About & credentials |
| `/services` | Services overview |
| `/services/[slug]` | 6 service detail pages |
| `/book` | Booking flow, fees, cancellation |
| `/faq` | 22 FAQs with accordion + JSON-LD |
| `/blog` | Blog index with category chips |
| `/blog/[slug]` | 10 blog post stubs |
| `/resources` | Guides & checklists |
| `/emergency-resources` | Crisis helplines |
| `/locations/[slug]` | 6 SEO location pages |
| `/privacy-policy` | Privacy policy |
| `/terms-consent-cancellation` | Terms & consent |
