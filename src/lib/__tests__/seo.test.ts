import { describe, it, expect } from "vitest";
import {
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
  localBusinessJsonLd,
  personJsonLd,
  serviceJsonLd,
  productJsonLd,
  faqPageJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "../seo";

describe("buildMetadata", () => {
  it("returns valid metadata object", () => {
    const meta = buildMetadata({
      title: "Test Page",
      description: "Test description",
      path: "/test",
    });

    expect(meta.title).toBe("Test Page");
    expect(meta.description).toBe("Test description");
    expect(meta.alternates?.canonical).toContain("/test");
    expect(meta.openGraph?.title).toBe("Test Page");
    expect(meta.twitter).toBeTruthy();
  });

  it("supports noIndex", () => {
    const meta = buildMetadata({
      title: "Hidden",
      description: "Hidden page",
      noIndex: true,
    });

    expect(meta.robots).toEqual({ index: false, follow: false });
  });
});

describe("JSON-LD builders", () => {
  it("organizationJsonLd has MedicalBusiness type", () => {
    const json = organizationJsonLd();
    expect(json["@type"]).toBe("MedicalBusiness");
    expect(json["@context"]).toBe("https://schema.org");
    expect(json.name).toBe("Ms Paul Therapies");
  });

  it("websiteJsonLd has WebSite type", () => {
    const json = websiteJsonLd();
    expect(json["@type"]).toBe("WebSite");
    expect(json.url).toContain("mspaultherapies.in");
  });

  it("localBusinessJsonLd has MedicalBusiness type", () => {
    const json = localBusinessJsonLd();
    expect(json["@type"]).toBe("MedicalBusiness");
    expect(json.medicalSpecialty).toBe("Psychiatric");
  });

  it("personJsonLd has Person type with credentials", () => {
    const json = personJsonLd();
    expect(json["@type"]).toBe("Person");
    expect(json.name).toBe("Aishani Paul");
    expect(json.hasCredential).toBeTruthy();
    expect(json.hasCredential.identifier).toBe("A118537");
  });

  it("serviceJsonLd builds valid service", () => {
    const json = serviceJsonLd({
      title: "Individual Therapy",
      description: "One-on-one sessions",
      slug: "individual-therapy",
      fee: "₹1,500",
    });
    expect(json["@type"]).toBe("ProfessionalService");
    expect(json.name).toBe("Individual Therapy");
    expect(json.offers).toBeTruthy();
  });

  it("productJsonLd handles free products", () => {
    const json = productJsonLd({
      title: "Free Guide",
      slug: "free-guide",
      priceType: "free",
    });
    expect(json["@type"]).toBe("Product");
    expect(json.offers?.price).toBe("0");
  });

  it("faqPageJsonLd builds FAQ schema", () => {
    const json = faqPageJsonLd([
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" },
    ]);
    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity).toHaveLength(2);
    expect(json.mainEntity[0]["@type"]).toBe("Question");
  });

  it("blogPostingJsonLd builds article schema", () => {
    const json = blogPostingJsonLd({
      title: "Test Post",
      description: "Test description",
      slug: "test-post",
      datePublished: "2024-01-01",
    });
    expect(json["@type"]).toBe("BlogPosting");
    expect(json.headline).toBe("Test Post");
    expect(json.url).toContain("/blog/test-post");
  });

  it("breadcrumbJsonLd builds breadcrumb list", () => {
    const json = breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
    ]);
    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(2);
    expect(json.itemListElement[0].position).toBe(1);
  });
});
