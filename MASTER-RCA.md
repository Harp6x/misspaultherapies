# Ms Paul Therapies — Master RCA (Root Cause Analysis & Complete Documentation)
### Full Technical, Content, and Marketing Documentation
### Last Updated: May 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Pages & Features](#3-pages--features)
4. [CMS (Sanity Studio)](#4-cms-sanity-studio)
5. [SEO Architecture](#5-seo-architecture)
6. [Email Marketing System](#6-email-marketing-system)
7. [Content Library](#7-content-library)
8. [Digital Products Content Bank](#8-digital-products-content-bank)
9. [Conversion Funnel](#9-conversion-funnel)
10. [Deployment & Infrastructure](#10-deployment--infrastructure)
11. [File Structure](#11-file-structure)
12. [Branding Guidelines](#12-branding-guidelines)
13. [Year-Long Marketing Calendar](#13-year-long-marketing-calendar)
14. [Maintenance & Operations](#14-maintenance--operations)
15. [Credentials & Access](#15-credentials--access)

---

## 1. Project Overview

### What
A complete digital presence for **Ms Paul Therapies** — a clinical psychology practice run by **Aishani Paul** (M.Phil Clinical Psychology, RCI Licensed). Includes a website, CMS, email marketing system, and a comprehensive content library of 60+ digital products.

### Who
- **Therapist:** Aishani Paul
- **Practice:** Ms Paul Therapies
- **Audience:** Indian adults (25–45) seeking mental health support — professionals, couples, parents, students
- **Geography:** Pan-India (online therapy) with local presence in Kolkata

### Why
- Establish professional online presence
- Generate leads through free resources
- Build email list for nurture marketing
- Provide valuable resources to clients
- Rank for mental health therapy searches in India

### URLs
- **Website:** https://mspaultherapies.in
- **Instagram:** @mspaultherapies
- **Email:** mspaultherapies@gmail.com
- **Booking:** https://mspaultherapies.in/book
- **CMS:** https://mspaultherapies.in/studio
- **Repository:** https://github.com/Harp6x/misspaultherapies

---

## 2. Technical Architecture

### Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js (App Router) | React-based SSR/SSG |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| CMS | Sanity Studio v3 | Headless content management |
| Email | Kit (ConvertKit) | Email list + automation |
| Hosting | Vercel | Auto-deploy from GitHub |
| Repo | GitHub (Harp6x/misspaultherapies) | Version control |
| Domain | mspaultherapies.in | Custom domain on Vercel |

### Key Dependencies
- `next` — App Router with Server Components
- `@sanity/client` + `next-sanity` — CMS integration
- `@portabletext/react` — Rich text rendering from Sanity
- `lucide-react` — Icons
- `react-icons` — Social media icons (Instagram, YouTube, LinkedIn)
- `next/og` — Dynamic OG image generation

### Environment Variables (Vercel)
```
NEXT_PUBLIC_SANITY_PROJECT_ID — Sanity project identifier
NEXT_PUBLIC_SANITY_DATASET — "production"
SANITY_API_TOKEN — Server-side Sanity read token
KIT_API_KEY — Kit (ConvertKit) API key for email subscriptions
KIT_FORM_ID — Kit form identifier
GOOGLE_SITE_VERIFICATION — Google Search Console verification
```

---

## 3. Pages & Features

### Static Pages

| Route | Purpose | Key Features |
|-------|---------|-------------|
| `/` | Homepage | Hero, services overview, testimonials, blog previews, media gallery, social links, lead magnet CTA |
| `/about` | About Aishani | Bio, photo (from Sanity), credentials, approach, social links |
| `/services` | Services listing | Cards linking to individual service pages |
| `/services/[slug]` | Individual service | Detail page per service (individual, couples, adolescent, family, assessments, workshops) |
| `/blog` | Blog index | Grid of posts from Sanity CMS |
| `/blog/[slug]` | Blog post | Portable Text rendering, author info, share CTAs, inline booking CTA |
| `/faq` | FAQ | Accordion with JSON-LD structured data |
| `/gallery` | Media gallery | YouTube/Instagram embeds from Sanity |
| `/workshops` | Upcoming workshops | Events listing |
| `/book` | Booking page | Google Form embed for session booking |
| `/resources` | Resources hub | Curated mental health links |
| `/emergency` | Emergency resources | Crisis helplines (India) |
| `/guide` | Free guide | Mental Health Self-Check Guide (lead magnet destination) |
| `/privacy-policy` | Legal | Privacy policy |
| `/terms` | Legal | Terms of service |
| `/consent` | Legal | Therapy consent form |
| `/sitemap.xml` | SEO | Dynamic sitemap including blog posts |
| `/robots.txt` | SEO | Crawl directives |

### Dynamic Features

| Feature | Implementation |
|---------|--------------|
| Blog | Sanity CMS → API → SSG + publish-triggered revalidation |
| Lead Magnet | Email form → `/api/subscribe` → Kit API → Tag subscriber |
| Sticky Book Bar | Persistent CTA at bottom of every page |
| Discovery Call Banner | Prominent banner for free 15-min call |
| WhatsApp Button | Floating chat widget |
| Print Guide | Client component for `window.print()` on guide page |
| Dynamic OG Image | `next/og` with branded canvas |

### Components

| Component | Path | Purpose |
|-----------|------|---------|
| `LeadMagnet.tsx` | `src/components/` | Email capture form with Kit integration |
| `PrintButton.tsx` | `src/components/` | Client-side print functionality |
| Sticky Book Bar | Layout-level | Persistent booking CTA |
| WhatsApp Widget | Layout-level | Floating chat button |

---

## 4. CMS (Sanity Studio)

### Access
- URL: `https://mspaultherapies.in/studio`
- Login: Sanity account credentials

### Content Types (Schemas)

| Schema | Fields | Used In |
|--------|--------|---------|
| `post` | title, slug, author, body (Portable Text), mainImage, categories, publishedAt | Blog |
| `service` | title, slug, description, icon, details | Services pages |
| `faq` | question, answer | FAQ page |
| `testimonial` | name, text, rating | Homepage |
| `galleryItem` | title, type (youtube/instagram), url, thumbnail | Gallery |
| `workshop` | title, date, description, link | Workshops |
| `siteConfig` | title, description, logo, social links | Global |
| `about` | bio, photo, credentials, approach | About page |

### Content Workflow
1. Aishani logs into `/studio`
2. Creates/edits content using the visual editor
3. Publishes → Sanity webhook invalidates the affected cached pages
4. No code deployment needed for content changes

### Seeded Content
- **16 blog posts** — SEO-optimized articles covering anxiety, depression, couples therapy, parenting, NRI mental health, etc.
- **6 services** — Individual, couples, adolescent, family, assessments, workshops
- **FAQs** — Common therapy questions
- **Testimonials** — Client reviews

---

## 5. SEO Architecture

### On-Page SEO

| Element | Implementation |
|---------|---------------|
| Root metadata | 16 therapy keywords, OG image, Twitter cards, theme-color |
| Per-page metadata | Keyword-rich titles + descriptions on every page |
| Blog metadata | `type: article`, publishedTime, section, authors |
| Dynamic OG image | Auto-generated via `next/og` with branded design |

### Structured Data (JSON-LD)

| Schema Type | Where |
|------------|-------|
| Organization | Root layout |
| WebSite + SearchAction | Root layout |
| ProfessionalService | Root layout |
| Person (Aishani Paul) | Root layout |
| FAQPage | FAQ page |
| BreadcrumbList | All pages |
| BlogPosting | Each blog post |

### Technical SEO

| Element | Status |
|---------|--------|
| `sitemap.xml` | Dynamic — includes all static pages + blog posts from Sanity |
| `robots.txt` | Blocks `/studio` and `/api` from crawlers |
| Security headers | X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| Mobile-responsive | Yes — Tailwind responsive utilities |
| Performance | Server-side rendering + static generation |

---

## 6. Email Marketing System

### Platform: Kit (ConvertKit)
- **Account:** mspaultherapies@gmail.com
- **Dashboard:** app.kit.com

### Technical Flow
```
User enters email on website
    ↓
Frontend POSTs to /api/subscribe
    ↓
API route calls Kit API:
  1. Creates/finds subscriber
  2. Tags with "mental-health-guide"
    ↓
User sees success → link to /guide page
    ↓
Kit triggers Welcome Email Sequence (7 emails over 14 days)
```

### API Route: `/api/subscribe`
- **Method:** POST
- **Body:** `{ email: string }`
- **Actions:** Create subscriber in Kit, apply tag
- **Auth:** KIT_API_KEY env var

### Email Sequences Available (in content bank)

| Sequence | Emails | Days | Trigger |
|----------|--------|------|---------|
| Welcome | 7 | 14 | New subscriber |
| Anxiety Deep-Dive | 5 | 10 | Clicked anxiety link |
| Self-Care Drip | 6 | 12 | Manual or post-welcome |
| Couples Communication | 5 | 10 | Clicked relationship link |

### Mini-Courses (email delivery)

| Course | Emails | Days |
|--------|--------|------|
| 5-Day Anxiety Reset | 5 | 5 |
| 5-Day Self-Compassion | 5 | 5 |
| 5-Day Mindfulness Basics | 5 | 5 |

### Tags Strategy
- `mental-health-guide` — Downloaded free guide
- `anxiety-interest` — Engaged with anxiety content
- `couples-interest` — Engaged with relationship content
- `self-care-sequence` — In self-care drip
- `anxiety-course` — Enrolled in anxiety mini-course
- `compassion-course` — Enrolled in self-compassion course
- `mindfulness-course` — Enrolled in mindfulness course

---

## 7. Content Library (Original 25 Resources)

**Location:** `content/`

### Guides (5) — `content/guides/`
| File | Title |
|------|-------|
| `01-anxiety-management-guide.md` | The Complete Anxiety Management Guide |
| `02-sleep-hygiene-guide.md` | Sleep Hygiene: Your Complete Reset Guide |
| `03-grief-and-loss-guide.md` | Understanding & Navigating Grief |
| `04-relationship-communication-guide.md` | Better Communication for Couples |
| `05-self-care-for-indian-professionals.md` | Self-Care for Indian Working Professionals |

### Workbooks (5) — `content/workbooks/`
| File | Title | Duration |
|------|-------|----------|
| `01-cognitive-restructuring-workbook.md` | CBT Cognitive Restructuring | 4 weeks |
| `02-emotional-regulation-workbook.md` | Emotional Regulation | 3 weeks |
| `03-self-esteem-workbook.md` | Building Self-Esteem | 4 weeks |
| `04-stress-management-workbook.md` | Stress Management | 2 weeks |
| `05-gratitude-journaling-workbook.md` | 30-Day Gratitude Journal | 30 days |

### Checklists (5) — `content/checklists/`
| File | Title |
|------|-------|
| `01-daily-mental-health-checklist.md` | Daily Mental Health Checklist |
| `02-therapy-readiness-checklist.md` | Am I Ready for Therapy? |
| `03-burnout-assessment-checklist.md` | Burnout Assessment |
| `04-healthy-boundaries-checklist.md` | Healthy Boundaries Checklist |
| `05-depression-self-screening.md` | Depression Self-Screening (PHQ-9 adapted) |

### Questionnaires (5) — `content/questionnaires/`
| File | Title |
|------|-------|
| `01-emotional-wellness-assessment.md` | Emotional Wellness Assessment (30Q) |
| `02-relationship-health-questionnaire.md` | Relationship Health Questionnaire |
| `03-work-life-balance-assessment.md` | Work-Life Balance Assessment |
| `04-parenting-stress-questionnaire.md` | Parenting Stress Questionnaire |
| `05-social-anxiety-assessment.md` | Social Anxiety Self-Assessment |

### Worksheets (5) — `content/worksheets/`
| File | Title |
|------|-------|
| `01-thought-record-worksheet.md` | CBT Thought Record |
| `02-values-clarification-worksheet.md` | Values Clarification |
| `03-anger-management-worksheet.md` | Anger Management |
| `04-mindfulness-exercises-worksheet.md` | 10 Mindfulness Exercises |
| `05-goal-setting-worksheet.md` | Therapeutic Goal Setting |

---

## 8. Digital Products Content Bank

**Location:** `content/digital-products/`

### Email Sequences (4) — `email-sequences/`
| File | Emails | Purpose |
|------|--------|---------|
| `01-welcome-sequence.md` | 7 over 14 days | Onboard new subscribers → discovery call |
| `02-anxiety-nurture-sequence.md` | 5 over 10 days | Deepen anxiety engagement → therapy CTA |
| `03-self-care-drip-sequence.md` | 6 over 12 days | Practical self-care → ongoing relationship |
| `04-couples-communication-sequence.md` | 5 over 10 days | Couples content → couples therapy CTA |

### Mini-Courses (3) — `mini-courses/`
| File | Duration | Topic |
|------|----------|-------|
| `01-5-day-anxiety-reset.md` | 5 days | Body, mind, behaviour approach to anxiety |
| `02-5-day-self-compassion.md` | 5 days | Inner critic → inner friend |
| `03-5-day-mindfulness-basics.md` | 5 days | Sceptic to practitioner |

### Challenge Programs (3) — `challenges/`
| File | Duration | Topic |
|------|----------|-------|
| `01-7-day-mental-health-challenge.md` | 7 days | One task per day (awareness → intention) |
| `02-14-day-journaling-challenge.md` | 14 days | Daily prompts (inward → forward) |
| `03-21-day-self-care-challenge.md` | 21 days | Body → mind → connection |

### Monthly Newsletters (12) — `monthly-newsletters/`
| Month | Theme |
|-------|-------|
| January | New Beginnings Without Pressure |
| February | Love Is a Skill (Relationships) |
| March | Women's Mental Health |
| April | Stress Awareness Month |
| May | Mental Health Awareness Month |
| June | Mid-Year Check-In |
| July | Monsoon & Mood |
| August | Independence & Boundaries |
| September | Back to Routine Without Burnout |
| October | World Mental Health Day |
| November | Festive Season Survival |
| December | Year-End Reflection |

### Social Media Content (3 files) — `social-media/`
| File | Content |
|------|---------|
| `01-52-week-content-calendar.md` | Full year: weekly themes, 3 post ideas each, by quarter |
| `02-instagram-carousel-scripts.md` | 20 ready-to-post carousels (slide-by-slide scripts) |
| `03-quote-posts-bank.md` | 100 branded quotes across 5 categories |

### Seasonal Kits (5) — `seasonal/`
| File | Use When |
|------|----------|
| `01-exam-stress-kit.md` | Board exam season (Feb–May) |
| `02-festive-season-mental-health.md` | Oct–Nov (Diwali/Navratri) |
| `03-new-year-reflection-kit.md` | Dec–Jan |
| `04-monsoon-mood-guide.md` | Jul–Sep |
| `05-back-to-school-parent-guide.md` | Jun & Sep (new terms) |

### Client Resources (3) — `client-resources/`
| File | Purpose |
|------|---------|
| `01-therapy-onboarding-pack.md` | Sent before first session |
| `02-between-sessions-toolkit.md` | Given after first session |
| `03-therapy-graduation-pack.md` | Given at therapy completion |

---

## 9. Conversion Funnel

### Visitor → Subscriber → Client Pipeline

```
AWARENESS (Top of Funnel)
│
├── Google Search (SEO → blog posts, service pages, location pages)
├── Instagram (@mspaultherapies → carousels, reels, quotes)
├── YouTube (embedded in gallery)
├── Referrals (word of mouth)
│
▼
INTEREST (Middle of Funnel)
│
├── Blog posts (16 SEO articles)
├── Free resources (25 guides/workbooks/checklists)
├── Mini-courses (3 × 5-day email courses)
├── Challenges (7/14/21-day programs)
│
▼
CAPTURE (Email Collection)
│
├── Lead magnet on homepage → /api/subscribe → Kit
├── Free guide download → email required
├── Mini-course signup → email required
│
▼
NURTURE (Email Sequences)
│
├── Welcome sequence (7 emails → discovery call CTA)
├── Topic-specific sequences (anxiety, self-care, couples)
├── Monthly newsletters (12 months of content)
│
▼
CONVERSION (Bottom of Funnel)
│
├── Free 15-min discovery call (mspaultherapies.in/book)
├── WhatsApp message
├── Direct email
│
▼
CLIENT
│
├── Therapy onboarding pack (sent before first session)
├── Between-sessions toolkit (given after first session)
├── Therapy graduation pack (given at completion)
│
▼
RETENTION / REFERRAL
│
├── Monthly newsletters keep connection
├── Seasonal content keeps engagement
├── Client shares resources with friends
└── Reviews/testimonials on website
```

### CTAs Across the Site

| Location | CTA | Destination |
|----------|-----|-------------|
| Every page (sticky bar) | "Book a Session" | /book |
| Homepage | "Free Discovery Call" | /book |
| Homepage | "Download Free Guide" | Lead magnet → /guide |
| Blog posts (inline) | "Book a Discovery Call" | /book |
| Blog posts (bottom) | CTA banner | /book |
| Footer | Social links | Instagram, YouTube, LinkedIn |
| Floating button | WhatsApp | WhatsApp chat |
| All content files | Header + Footer CTAs | mspaultherapies.in/book + @mspaultherapies |

---

## 10. Deployment & Infrastructure

### Hosting: Vercel
- **Auto-deploy:** Push to `main` branch → automatic deployment
- **Preview deployments:** Every PR gets a preview URL
- **Domain:** mspaultherapies.in (custom domain configured)
- **SSL:** Automatic via Vercel

### Git Workflow
```
Local development
    ↓
git add -A && git commit -m "description"
    ↓
git push origin main
    ↓
Vercel auto-deploys (< 60 seconds)
    ↓
Live at mspaultherapies.in
```

### Monitoring
- **Vercel Analytics:** Page views, performance
- **Google Search Console:** Search impressions, clicks, indexing
- **Kit Analytics:** Email open rates, click rates, subscriber growth

---

## 11. File Structure

```
miss-paul-therapies/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (metadata, structured data, headers)
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx       # Services listing
│   │   │   └── [slug]/page.tsx # Individual service
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog index
│   │   │   └── [slug]/page.tsx # Blog post
│   │   ├── faq/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── workshops/page.tsx
│   │   ├── book/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── emergency/page.tsx
│   │   ├── guide/page.tsx     # Lead magnet destination
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── consent/page.tsx
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   ├── robots.ts          # robots.txt
│   │   ├── api/
│   │   │   └── subscribe/route.ts  # Kit email API
│   │   └── studio/            # Sanity Studio
│   ├── components/
│   │   ├── LeadMagnet.tsx     # Email capture form
│   │   ├── PrintButton.tsx    # Print functionality
│   │   └── ...                # Other components
│   └── lib/
│       ├── sanity/            # Sanity client + queries
│       └── site-config.ts     # Site-wide config
├── content/
│   ├── README.md              # Content library index
│   ├── guides/                # 5 guides
│   ├── workbooks/             # 5 workbooks
│   ├── checklists/            # 5 checklists
│   ├── questionnaires/        # 5 questionnaires
│   ├── worksheets/            # 5 worksheets
│   └── digital-products/
│       ├── email-sequences/   # 4 email sequences (23 emails total)
│       ├── mini-courses/      # 3 mini-courses (15 emails total)
│       ├── challenges/        # 3 challenge programs
│       ├── monthly-newsletters/ # 12 monthly newsletters
│       ├── social-media/      # Calendar + carousels + quotes
│       ├── seasonal/          # 5 seasonal kits
│       └── client-resources/  # 3 client lifecycle resources
├── MASTER-RCA.md              # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 12. Branding Guidelines

### Identity
- **Practice Name:** Ms Paul Therapies
- **Therapist:** Aishani Paul, M.Phil Clinical Psychology, RCI Licensed
- **Instagram:** @mspaultherapies
- **Website:** mspaultherapies.in
- **Email:** mspaultherapies@gmail.com

### Voice & Tone
- **Warm but professional** — like a trusted friend who happens to be a psychologist
- **Evidence-based** — cite research, name techniques, use clinical frameworks
- **Culturally sensitive** — acknowledge Indian context (family dynamics, stigma, "log kya kahenge")
- **Permission-giving** — "You're allowed to rest" / "Your feelings are valid"
- **Non-judgmental** — never shaming, always compassionate
- **Direct** — no fluff, no corporate speak

### Content Branding (Every Resource)
- **Header:** @mspaultherapies Instagram tag + contact info
- **Footer:** Discovery call CTA + social links
- **Attribution:** "Created by Aishani Paul, M.Phil Clinical Psychology, RCI Licensed"
- **Copyright:** "© Ms Paul Therapies. All rights reserved. Share freely with credit."

### Social Media
- **Primary hashtag:** #mspaultherapies
- **Challenge hashtag:** #MsPaulChallenge @mspaultherapies
- **Self-care hashtag:** #MsPaulSelfCare @mspaultherapies

---

## 13. Year-Long Marketing Calendar

| Month | Newsletter Theme | Challenge/Course to Promote | Seasonal Kit | Key Date |
|-------|-----------------|---------------------------|-------------|----------|
| Jan | New Beginnings | 21-Day Self-Care Challenge | New Year Reflection Kit | New Year |
| Feb | Love & Relationships | Couples Communication Sequence | — | Valentine's Day |
| Mar | Women's Mental Health | Self-Compassion Course | Exam Stress Kit | International Women's Day (8th) |
| Apr | Stress Awareness | 7-Day Mental Health Challenge | Exam Stress Kit | Stress Awareness Month |
| May | Mental Health Awareness | Anxiety Reset Course | — | Mental Health Awareness Month |
| Jun | Mid-Year Check-In | 14-Day Journaling Challenge | — | — |
| Jul | Monsoon & Mood | Mindfulness Basics Course | Monsoon Mood Guide | — |
| Aug | Independence & Boundaries | Self-Care Drip Sequence | — | Independence Day (15th) |
| Sep | Back to Routine | Anxiety Nurture Sequence | Back-to-School Guide | — |
| Oct | World Mental Health Day | All courses promoted | — | WMHD (10th) |
| Nov | Festive Season Survival | Self-Compassion Course | Festive Season Kit | Diwali |
| Dec | Year-End Reflection | Gratitude Journal Workbook | New Year Reflection Kit | Christmas, New Year |

---

## 14. Maintenance & Operations

### Weekly
- [ ] Publish 1 blog post via Sanity Studio
- [ ] Post 3–5 times on Instagram (@mspaultherapies)
- [ ] Monitor Kit subscriber growth and email metrics
- [ ] Respond to website enquiries and WhatsApp messages

### Monthly
- [ ] Send monthly newsletter (content ready in `monthly-newsletters/`)
- [ ] Review Google Search Console for new keyword opportunities
- [ ] Check Vercel analytics for page performance
- [ ] Update any seasonal content as needed

### Quarterly
- [ ] Review conversion funnel metrics (visitors → subscribers → clients)
- [ ] Update blog content for SEO freshness
- [ ] A/B test email subject lines
- [ ] Review and refresh social media content calendar
- [ ] Evaluate and potentially create new lead magnets

### Annually
- [ ] Review and update all content for accuracy
- [ ] Refresh the 52-week content calendar
- [ ] Update seasonal kits with current year references
- [ ] Review website design and performance
- [ ] Set marketing goals for the next year

---

## 15. Credentials & Access

| Service | URL | Account |
|---------|-----|---------|
| GitHub | github.com/Harp6x/misspaultherapies | Harp6x |
| Vercel | vercel.com | Linked to GitHub |
| Sanity Studio | mspaultherapies.in/studio | Sanity account |
| Kit (ConvertKit) | app.kit.com | mspaultherapies@gmail.com |
| Google Search Console | search.google.com/search-console | Google account |
| Domain | mspaultherapies.in | Domain registrar |
| Instagram | @mspaultherapies | Instagram account |

### API Keys (stored in Vercel env vars — NEVER in code)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `KIT_API_KEY`
- `KIT_FORM_ID`

---

## Content Inventory Summary

| Category | Count |
|----------|-------|
| Website pages | 16+ |
| Blog posts (Sanity) | 16 |
| Guides | 5 |
| Workbooks | 5 |
| Checklists | 5 |
| Questionnaires | 5 |
| Worksheets | 5 |
| Email sequences | 4 (23 emails) |
| Mini-courses | 3 (15 emails) |
| Challenge programs | 3 |
| Monthly newsletters | 12 |
| Social media calendar | 52 weeks |
| Instagram carousels | 20 scripts |
| Quote posts | 100 |
| Seasonal kits | 5 |
| Client resources | 3 |
| **TOTAL CONTENT PIECES** | **~60+ files, 200+ individual content items** |

---

*This document is the single source of truth for the Ms Paul Therapies digital ecosystem.*
*Last updated: May 2026*
*Maintained by: Development Team*
