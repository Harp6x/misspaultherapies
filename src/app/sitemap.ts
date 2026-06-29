import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllLocations, getAllServices, getSiteConfig } from "@/lib/data";
import { getAllProductSlugs, getAllWorkshops } from "@/sanity/fetch";

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteConfig, services, blogPosts, locations, workshops] = await Promise.all([
    getSiteConfig(),
    getAllServices(),
    getAllBlogPosts(),
    getAllLocations(),
    getAllWorkshops(),
  ]);
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...(siteConfig.pageVisibility.products
      ? [
          {
            url: `${base}/products`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(siteConfig.pageVisibility.blog
      ? [
          {
            url: `${base}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...(siteConfig.pageVisibility.gallery
      ? [
          {
            url: `${base}/gallery`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...(siteConfig.pageVisibility.workshops
      ? [
          {
            url: `${base}/workshops`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...(siteConfig.pageVisibility.resources
      ? [
          {
            url: `${base}/resources`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/tools/check-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/tools/burnout-quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/tools/reflect`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/tools/journal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/tools/self-awareness`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/tools/relationship-reflect`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/emergency-resources`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms-consent-cancellation`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // LLM discovery files
    {
      url: `${base}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts include CMS-added posts and static fallback content.
  const blogPages: MetadataRoute.Sitemap = siteConfig.pageVisibility.blog
    ? blogPosts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: new Date(p.datePublished),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    : [];

  const workshopPages: MetadataRoute.Sitemap = siteConfig.pageVisibility.workshops
    ? workshops.map((workshop) => ({
        url: `${base}/workshops/${workshop.slug}`,
        lastModified: workshop.date ? new Date(workshop.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    : [];

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Products from Sanity (CMS-managed)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    if (!siteConfig.pageVisibility.products) throw new Error("Products page disabled");
    const productSlugs = await getAllProductSlugs();
    productPages = productSlugs.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Sanity unavailable at build - skip product pages
  }

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...locationPages,
    ...productPages,
    ...workshopPages,
  ];
}
