import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

// Search discovery crawlers that index public pages for search and user queries
const SEARCH_CRAWLERS = [
  "Googlebot", // Google Search
  "Bingbot", // Bing and Microsoft Copilot
  "OAI-SearchBot", // OpenAI ChatGPT Search discovery
  "ChatGPT-User", // ChatGPT user-triggered on-demand browsing
  "PerplexityBot", // Perplexity AI Search
  "Applebot", // Apple Intelligence and Siri Search
  "Claude-User", // Claude user-initiated fetch
];

// Model training crawlers explicitly opted out per policy
const TRAINING_OPT_OUT_CRAWLERS = [
  "GPTBot", // OpenAI model training
  "CCBot", // Common Crawl training corpus
  "Google-Extended", // Google Gemini training
  "Applebot-Extended", // Apple AI training
  "Bytespider", // ByteDance training
  "cohere-ai", // Cohere training
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
      // Search discovery crawlers: full access to public content
      ...SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/api/health"],
        disallow: protectedPaths,
      })),
      // Training crawlers: opt-out per business policy
      ...TRAINING_OPT_OUT_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
