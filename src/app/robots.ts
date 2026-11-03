import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

const AI_CRAWLERS = [
  "GPTBot", // OpenAI / ChatGPT
  "OAI-SearchBot", // OpenAI search
  "ChatGPT-User", // ChatGPT browsing
  "anthropic-ai", // Anthropic
  "ClaudeBot", // Claude
  "Claude-Web", // Claude web
  "Claude-User", // Claude user search
  "PerplexityBot", // Perplexity
  "Applebot", // Apple Intelligence / Siri
  "Applebot-Extended", // Apple AI training
  "Meta-ExternalAgent", // Meta AI
  "Meta-ExternalFetcher",
  "Bytespider", // ByteDance / TikTok AI
  "CCBot", // Common Crawl
  "cohere-ai", // Cohere
  "AI2Bot", // Allen Institute for AI
  "DuckAssistBot", // DuckDuckGo AI
  "YouBot", // You.com
  "iaskspider", // iAsk.ai
  "Diffbot", // Diffbot
  "Google-Extended", // Google Gemini AI training & search
  "Amazonbot", // Amazon Alexa / Rufus AI
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/health"],
        disallow: ["/studio", "/studio/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/api/health"],
        disallow: ["/studio", "/studio/", "/api/"],
      },
      // Explicitly allow all AI crawlers to index the full site
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/api/health"],
        disallow: ["/studio", "/studio/", "/api/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
