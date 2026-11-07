import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

// Search discovery & AI crawlers that index public pages for search and client recommendations
const ALLOWED_CRAWLERS = [
  "Googlebot", // Google Search
  "Bingbot", // Bing and Microsoft Copilot
  "OAI-SearchBot", // OpenAI ChatGPT Search discovery
  "ChatGPT-User", // ChatGPT user-triggered on-demand browsing
  "GPTBot", // OpenAI foundation crawler (Powers ChatGPT knowledge & direct recommendations)
  "PerplexityBot", // Perplexity AI Search
  "ClaudeBot", // Anthropic Claude
  "Claude-User", // Claude user-initiated fetch
  "Applebot", // Apple Intelligence and Siri Search
  "CCBot", // Common Crawl (Universal AI index)
];

// Aggressive scraping crawlers that don't provide discovery value
const DISALLOWED_CRAWLERS = [
  "Bytespider", // ByteDance scraping
  "cohere-ai", // Cohere scraping
  "Diffbot", // Diffbot scraping
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();
  const protectedPaths = ["/studio", "/studio/", "/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/health"],
        disallow: protectedPaths,
      },
      // Search discovery & AI crawlers: full access to public content
      ...ALLOWED_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/api/health"],
        disallow: protectedPaths,
      })),
      // Disallowed scrapers
      ...DISALLOWED_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
