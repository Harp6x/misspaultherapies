import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { buildMetadata, buildArticleMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getAllServices, getAllBlogPosts } from "@/lib/data";

describe("Robots Policy Regression Tests", () => {
  it("generates deterministic crawler policies with explicit search vs training boundaries", async () => {
    const res = await robots();
    expect(res.rules).toBeDefined();
    expect(res.sitemap).toBe("https://mspaultherapies.in/sitemap.xml");
    expect(res.host).toBe("https://mspaultherapies.in");

    const rules = Array.isArray(res.rules) ? res.rules : [res.rules];

    // OAI-SearchBot must be allowed for ChatGPT Search discovery
    const oaiSearchRule = rules.find((r) => r.userAgent === "OAI-SearchBot");
    expect(oaiSearchRule).toBeDefined();
    expect(oaiSearchRule?.allow).toContain("/");
    expect(oaiSearchRule?.disallow).toEqual(expect.arrayContaining(["/studio", "/studio/", "/api/"]));

    // ChatGPT-User must be allowed for on-demand user visits
    const chatGptUserRule = rules.find((r) => r.userAgent === "ChatGPT-User");
    expect(chatGptUserRule).toBeDefined();
    expect(chatGptUserRule?.allow).toContain("/");

    // Googlebot and Bingbot must be explicitly permitted
    const googleRule = rules.find((r) => r.userAgent === "Googlebot");
    expect(googleRule?.allow).toContain("/");
    const bingRule = rules.find((r) => r.userAgent === "Bingbot");
    expect(bingRule?.allow).toContain("/");

    // Model training crawlers must be blocked per business opt-out policy
    const gptBotRule = rules.find((r) => r.userAgent === "GPTBot");
    expect(gptBotRule).toBeDefined();
    expect(gptBotRule?.disallow).toEqual(["/"]);

    const ccBotRule = rules.find((r) => r.userAgent === "CCBot");
    expect(ccBotRule).toBeDefined();
    expect(ccBotRule?.disallow).toEqual(["/"]);

    // Default rule protects sensitive administrative routes
    const defaultRule = rules.find((r) => r.userAgent === "*");
    expect(defaultRule).toBeDefined();
    expect(defaultRule?.allow).toContain("/");
    expect(defaultRule?.disallow).toEqual(expect.arrayContaining(["/studio", "/studio/", "/api/"]));
  });
});

describe("Metadata and Canonical Regression Tests", () => {
  it("buildMetadata generates clean canonical URL without experimental markdown alternates", () => {
    const meta = buildMetadata({
      title: "Individual Therapy",
      description: "One-on-one clinical therapy",
      path: "/services/individual-therapy",
    });

    expect(meta.alternates?.canonical).toBe("https://mspaultherapies.in/services/individual-therapy");
    // Ensure no accidental noindex
    expect(meta.robots).toBeUndefined();
  });

  it("buildArticleMetadata generates clean canonical URL for blog posts", () => {
    const meta = buildArticleMetadata({
      title: "Therapy Guide",
      description: "Clinical guide",
      slug: "first-session-guide",
      datePublished: "2024-01-01",
    });

    expect(meta.alternates?.canonical).toBe("https://mspaultherapies.in/blog/first-session-guide");
    expect((meta.openGraph as { type?: string })?.type).toBe("article");
  });
});

describe("Sitemap Integrity Regression Tests", () => {
  it("sitemap produces canonical HTTPS URLs for core routes and services", async () => {
    const urls = await sitemap();
    expect(urls.length).toBeGreaterThan(15);

    const locs = urls.map((u) => u.url);
    expect(locs).toContain("https://mspaultherapies.in");
    expect(locs).toContain("https://mspaultherapies.in/about");
    expect(locs).toContain("https://mspaultherapies.in/services");
    expect(locs).toContain("https://mspaultherapies.in/book");
    expect(locs).toContain("https://mspaultherapies.in/contact");
    expect(locs).toContain("https://mspaultherapies.in/services/individual-therapy");

    // All URLs must use canonical https://mspaultherapies.in
    for (const u of locs) {
      expect(u.startsWith("https://mspaultherapies.in")).toBe(true);
      expect(u).not.toContain("http://");
      expect(u).not.toContain("www.");
    }
  });
});

describe("Conversion Funnel & Credential Integrity", () => {
  it("preserves verified credentials, Cal.com booking, and WhatsApp configuration", () => {
    expect(siteConfig.rciNumber).toBe("A118537");
    expect(siteConfig.author).toBe("Aishani Paul");
    expect(siteConfig.whatsappNumber).toBe("919123311295");
    expect(siteConfig.discoveryCallUrl).toBe("https://cal.com/mspaultherapies/discovery-call");
    expect(siteConfig.sessionBookingUrl).toBe("https://cal.com/mspaultherapies/sessionbooking");
    expect(siteConfig.googleFormUrl).toContain("forms.gle");
  });

  it("serves published clinical services and static blog fallback without content loss", async () => {
    const services = await getAllServices();
    expect(services.length).toBeGreaterThan(0);
    const individual = services.find((s) => s.slug === "individual-therapy");
    expect(individual).toBeDefined();
    expect(individual?.title).toBeTruthy();

    const posts = await getAllBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
  });
});
