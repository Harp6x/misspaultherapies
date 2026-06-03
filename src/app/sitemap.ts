import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { getAllBlogPosts } from "@/lib/data";
import { getAllProductSlugs } from "@/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/workshops`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/emergency-resources`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-consent-cancellation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Fetch blog posts dynamically from Sanity (includes CMS-added posts)
  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Products from Sanity (CMS-managed)
  let productPages: MetadataRoute.Sitemap = [];
  try {
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
  ];
}
