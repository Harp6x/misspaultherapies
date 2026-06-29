# Sanity-triggered site updates

The public site has no time-based ISR timers. Cached content changes only when
Sanity sends the publish webhook or Vercel creates a new deployment.

## Vercel setup

Add a long random value to the Vercel project as:

```text
SANITY_REVALIDATE_SECRET
```

Apply it to Production and Preview, then redeploy once.

## Sanity webhook setup

In **sanity.io/manage → Ms Paul Therapies → API → Webhooks**, create a document
webhook with:

- URL: `https://mspaultherapies.in/api/revalidate`
- Dataset: `production`
- Trigger on: Create, Update, Delete
- HTTP method: POST
- Drafts and versions: disabled
- Header: `x-sanity-revalidate-secret` with the same secret stored in Vercel
- Filter:

```groq
coalesce(after()._type, before()._type) in [
  "siteConfig", "aboutPage", "service", "blogPost", "faq", "resource",
  "testimonial", "location", "galleryItem", "workshop", "product"
]
```

- Projection:

```groq
{
  "_type": coalesce(after()._type, before()._type),
  "slug": coalesce(after().slug, before().slug)
}
```

`leadCapture` is intentionally excluded because it does not change public site
content.

## Verification

Publish a harmless text change, then confirm the Sanity webhook attempt returns
`200` with `"revalidated": true`. Do not add numeric `revalidate` timers to
public pages or Sanity fetches.
