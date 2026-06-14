# Ms Paul Therapies — Maintenance Handbook

## Common Tasks

### Add a New Blog Post
1. Open Sanity Studio → `https://mspaultherapies.in/studio`
2. Click **+ Create** → **Blog Post**
3. Fill: title, slug, description, category, body (rich text), readingTime
4. Set `published: true` and `publishedAt` date
5. Publish → live within 60 seconds (ISR)

### Add a New Service
1. Studio → **+ Create** → **Service**
2. Fill: title, slug, shortTitle, description, icon (Lucide name), highlights[], idealFor[], approach, fee
3. Set `order` for sort position
4. Publish

### Add a New Product
1. Studio → **+ Create** → **Product**
2. Fill: title, slug, productType, priceType, price, shortDescription, body, coverImage
3. Set `published: true`
4. Publish

### Add a New Workshop
1. Studio → **+ Create** → **Workshop**
2. Fill: title, slug, description, date, duration, fee, status, registrationUrl
3. Set `published: true`
4. Publish

### Add a Testimonial
1. Studio → **+ Create** → **Testimonial**
2. Fill: quote, name, context
3. Set `approved: true` to make visible
4. Publish

### Update Contact Info / Fees
1. Studio → **Site Config** (singleton)
2. Edit fields: email, phone, fees, WhatsApp number, etc.
3. Publish → all pages update within 60 seconds

### Update About Page
1. Studio → **About Page** (singleton)
2. Edit bio paragraphs, credentials, values, photo
3. Publish

### Add a Location Page
1. Studio → **+ Create** → **Location**
2. Fill: name (city), slug, title, description, metaDescription
3. Publish → creates `/locations/{slug}` page automatically

---

## Development

### Local Setup
```bash
git clone <repo-url>
cd miss-paul-therapies
npm install
cp .env.example .env.local  # Add Sanity project ID
npm run dev                  # http://localhost:3000
```

### Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier format |
| `npm test` | Run Vitest tests |

### Before Pushing Code
```bash
npm run typecheck && npm run lint && npm test && npm run build
```

---

## Deployment

- **Hosting:** Vercel (auto-deploy from GitHub `main` branch)
- **Domain:** mspaultherapies.in (with .com redirect)
- **CMS:** Sanity Studio embedded at `/studio`
- **ISR:** All pages revalidate every 60 seconds

### Environment Variables (Vercel Dashboard)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `k0r3y2my`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console
- `NEXT_PUBLIC_GA_ID` — Google Analytics
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel

---

## Troubleshooting

### Content not updating
- ISR cache is 60 seconds — wait and hard refresh
- Check Sanity Studio → is the document **Published** (not just Draft)?
- Check visibility toggles: `published`, `approved`, `status`

### Blog post not showing
- Verify `published: true` in Sanity
- Verify `publishedAt` date is set
- Check slug format (lowercase, hyphens only)

### Product page 404
- Verify `published: true` in Sanity
- Verify slug is set
- Wait for ISR revalidation (60s)

### Build fails
1. Run `npm run typecheck` — fix type errors first
2. Run `npm run lint` — fix lint errors
3. Check Sanity queries — ensure all referenced fields exist in schemas
