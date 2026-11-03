import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getSiteConfig,
  getServiceBySlug,
  getAllServices,
  getBlogPostBySlug,
  getAllBlogPosts,
  getAllFaqs,
} from "@/lib/data";

export const dynamic = "force-dynamic";

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<ul[^>]*>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ol[^>]*>/gi, "")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em>(.*?)<\/em>/gi, "*$1*")
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";
  const config = await getSiteConfig();

  let markdown = "";

  if (path === "/" || path === "") {
    const services = await getAllServices();
    markdown = `# ${config.name} - ${config.tagline}

> **Practitioner**: ${config.author} (M.Phil in Clinical Psychology)
> **License**: RCI (Rehabilitation Council of India) Reg. No. ${config.rciNumber}
> **Format**: 100% Online therapy sessions via secure video call across India and internationally.
> **Languages**: ${config.languages.join(", ")}

## Overview
${config.description}

## Clinical Services Offered
${services
  .map(
    (s) => `### [${s.title}](${config.url}/services/${s.slug})
${s.description}
- **Fee**: ${s.fee}
- **Duration**: ${s.duration}
- **Format**: Secure video call
`
  )
  .join("\n")}

## How It Works
1. **Free 15-Minute Discovery Call**: Connect on Cal.com (${config.discoveryCallUrl}) with no financial commitment.
2. **Clinical Intake & Assessment**: In-depth review of your needs, history, and therapy goals.
3. **Evidence-Based Therapy**: Collaborative sessions using CBT, DBT, ACT, EFT, and attachment-focused therapy.

## Booking & Contact
- **Book a Discovery Call**: [Schedule on Cal.com](${config.discoveryCallUrl})
- **WhatsApp**: [Message on WhatsApp](https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, "")})
- **Email**: [${config.email}](mailto:${config.email})
- **Full Reference**: [${config.url}/llms-full.txt](${config.url}/llms-full.txt)
`;
  } else if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "").replace(/\/$/, "");
    const service = await getServiceBySlug(slug);

    if (service) {
      markdown = `# ${service.title} - ${config.name}

> **Therapist**: ${config.author} (M.Phil, RCI Reg. No. ${config.rciNumber})
> **Fee**: ${service.fee} | **Duration**: ${service.duration}
> **Format**: Secure online video call

## Description
${service.description}

${
  service.highlights && service.highlights.length > 0
    ? `## Key Focus Areas
${service.highlights.map((h) => `- ${h}`).join("\n")}
`
    : ""
}
${
  service.idealFor && service.idealFor.length > 0
    ? `## Who This Is For
${service.idealFor.map((item) => `- ${item}`).join("\n")}
`
    : ""
}
${
  service.approach
    ? `## Therapeutic Approach
${service.approach}
`
    : ""
}
## Next Steps
- **Book a Free Discovery Call**: [Schedule Call](${config.discoveryCallUrl})
- **All Services**: [View Services](${config.url}/services)
`;
    }
  } else if (path === "/services") {
    const services = await getAllServices();
    markdown = `# Clinical Therapy Services - ${config.name}

${services
  .map(
    (s) => `## [${s.title}](${config.url}/services/${s.slug})
${s.description}
- **Fee**: ${s.fee}
- **Duration**: ${s.duration}
`
  )
  .join("\n")}

## Get Started
Book a free 15-minute discovery call at [${config.discoveryCallUrl}](${config.discoveryCallUrl}).
`;
  } else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "").replace(/\/$/, "");
    const post = await getBlogPostBySlug(slug);

    if (post) {
      const bodyMarkdown = typeof post.body === "string" ? htmlToMarkdown(post.body) : "";
      markdown = `# ${post.title}

> **Author**: ${config.author} (M.Phil, RCI License ${config.rciNumber})
> **Published**: ${post.datePublished} | **Reading Time**: ${post.readingTime}
> **Category**: ${post.category}

${post.description}

---

${bodyMarkdown}

---
*For therapy support or questions, book a free 15-minute discovery call at [${config.discoveryCallUrl}](${config.discoveryCallUrl}).*
`;
    }
  } else if (path === "/blog") {
    const posts = await getAllBlogPosts();
    markdown = `# Mental Health Blog & Insights - ${config.name}

Evidence-based clinical insights, relationship guidance, and mental health tools by ${config.author}.

${posts
  .slice(0, 15)
  .map(
    (p) => `### [${p.title}](${config.url}/blog/${p.slug})
*${p.category} · ${p.readingTime}*
${p.description}
`
  )
  .join("\n")}
`;
  } else if (path === "/faq") {
    const faqs = await getAllFaqs();
    markdown = `# Frequently Asked Questions - ${config.name}

${faqs
  .map(
    (f) => `### ${f.question}
${f.answer}
`
  )
  .join("\n")}
`;
  } else if (path === "/about") {
    markdown = `# About ${config.author} - ${config.name}

**Credentials**: ${config.qualifications.join(", ")}
**RCI Registration**: ${config.rciNumber}
**Languages Spoken**: ${config.languages.join(", ")}

## Clinical Approach
${config.author} is a licensed Clinical Psychologist offering integrative psychotherapy rooted in Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Emotion-Focused Therapy (EFT), Acceptance and Commitment Therapy (ACT), and attachment theory.

## Contact & Appointments
- Discovery Call: [${config.discoveryCallUrl}](${config.discoveryCallUrl})
- Email: [${config.email}](mailto:${config.email})
- Website: [${config.url}](${config.url})
`;
  } else if (path === "/contact") {
    markdown = `# Contact - ${config.name}

- **Email**: [${config.email}](mailto:${config.email})
- **WhatsApp**: [Message ${config.whatsappNumber}](https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, "")})
- **Booking**: [Free 15-Minute Discovery Call](${config.discoveryCallUrl})
- **Hours**: ${config.workingHours}
`;
  }

  // Fallback if specific route markdown wasn't constructed
  if (!markdown) {
    markdown = `# ${config.name}

${config.description}

- **Practitioner**: ${config.author} (RCI License ${config.rciNumber})
- **Full Reference**: [${config.url}/llms-full.txt](${config.url}/llms-full.txt)
- **Book Discovery Call**: [${config.discoveryCallUrl}](${config.discoveryCallUrl})
`;
  }

  const tokenCount = Math.ceil(markdown.trim().split(/\s+/).length * 1.3);

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": tokenCount.toString(),
      "Access-Control-Allow-Origin": "*",
      Vary: "Accept",
    },
  });
}

