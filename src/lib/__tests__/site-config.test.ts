import { describe, it, expect } from "vitest";
import { siteConfig } from "../site-config";

describe("siteConfig", () => {
  it("has required identity fields", () => {
    expect(siteConfig.name).toBe("Ms Paul Therapies");
    expect(siteConfig.author).toBe("Aishani Paul");
    expect(siteConfig.url).toBe("https://mspaultherapies.in");
  });

  it("has valid RCI number", () => {
    expect(siteConfig.rciNumber).toBe("A118537");
  });

  it("has contact information", () => {
    expect(siteConfig.email).toContain("@");
    expect(siteConfig.phone).toBeTruthy();
    expect(siteConfig.whatsappNumber).toBeTruthy();
  });

  it("has social links", () => {
    expect(siteConfig.socials.instagram).toContain("instagram.com");
    expect(siteConfig.socials.youtube).toContain("youtube.com");
    expect(siteConfig.socials.linkedin).toContain("linkedin.com");
  });

  it("has booking URLs", () => {
    expect(siteConfig.googleFormUrl).toContain("forms.gle");
    expect(siteConfig.discoveryCallUrl).toContain("cal.com");
    expect(siteConfig.sessionBookingUrl).toContain("cal.com");
  });

  it("has fee information", () => {
    expect(siteConfig.fees.individual).toBeTruthy();
    expect(siteConfig.fees.couples).toBeTruthy();
    expect(siteConfig.fees.family).toBeTruthy();
  });

  it("has valid newsletter config", () => {
    const validTypes = ["inline", "modal", "slide-in", "sticky-bar", "off"];
    expect(validTypes).toContain(siteConfig.newsletter.formType);
    expect(siteConfig.newsletter.uid).toBeTruthy();
    expect(siteConfig.newsletter.scriptUrl).toContain("kit.com");
  });

  it("has SEO fields", () => {
    expect(siteConfig.ogImage).toBeTruthy();
    expect(siteConfig.twitterHandle).toContain("@");
  });
});
