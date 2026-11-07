import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

// Explicit priority search engines and AI discovery crawlers
const ALLOWED_CRAWLERS = [
  "Googlebot", // Google Search
  "Bingbot", // Bing & Microsoft Copilot
  "OAI-SearchBot", // OpenAI ChatGPT Search discovery (Top priority for client acquisition)
  "ChatGPT-User", // ChatGPT user-triggered real-time browsing
  "GPTBot", // OpenAI foundation crawler (Powers ChatGPT knowledge & direct recommendations)
  "PerplexityBot", // Perplexity AI Search
  "ClaudeBot", // Anthropic Claude
  "Claude-Web", // Claude web search
  "Claude-User", // Claude user-initiated fetch
  "Applebot", // Apple Intelligence & Siri search
  "Applebot-Extended", // Apple AI
  "Meta-ExternalAgent", // Meta AI
  "Meta-ExternalFetcher",
  "Bytespider", // ByteDance search / AI
  "CCBot", // Common Crawl (Universal AI index)
  "cohere-ai", // Cohere
  "AI2Bot", // Allen Institute
  "DuckAssistBot", // DuckDuckGo AI Search
  "YouBot", // You.com AI Search
  "iaskspider", // iAsk.ai
  "Diffbot", // Diffbot Knowledge Graph
  "Google-Extended", // Google Gemini search & training
  "Amazonbot", // Amazon Alexa / Rufus
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();
  const disallowList = ["/studio", "/studio/", "/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/health"],
        disallow: disallowList,
      },
      // Explicitly declare permissions for all major search engines & AI discovery agents
      ...ALLOWED_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/api/health"],
        disallow: disallowList,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
