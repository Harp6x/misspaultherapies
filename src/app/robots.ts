import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const AI_CRAWLERS = [
  "GPTBot",           // OpenAI / ChatGPT
  "OAI-SearchBot",    // OpenAI search
  "ChatGPT-User",     // ChatGPT browsing
  "anthropic-ai",     // Anthropic
  "ClaudeBot",        // Claude
  "Claude-Web",       // Claude web
  "PerplexityBot",    // Perplexity
  "Applebot",         // Apple Intelligence / Siri
  "Meta-ExternalAgent", // Meta AI
  "Meta-ExternalFetcher",
  "Bytespider",       // ByteDance / TikTok AI
  "cohere-ai",        // Cohere
  "AI2Bot",           // Allen Institute for AI
  "DuckAssistBot",    // DuckDuckGo AI
  "YouBot",           // You.com
  "iaskspider",       // iAsk.ai
  "Diffbot",          // Diffbot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
      // Explicitly allow all AI crawlers to index the full site
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio", "/studio/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
