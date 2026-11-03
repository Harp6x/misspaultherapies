import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const content = `# Agent Authentication & Interaction Policy: ${siteConfig.name}

## 1. Overview
${siteConfig.name} is the professional clinical psychology practice of ${siteConfig.author} (M.Phil in Clinical Psychology, RCI License ${siteConfig.rciNumber}).

This document outlines authentication policies and protocols for AI agents, crawlers, and automated assistants interacting with ${siteConfig.url}.

---

## 2. Public Access (No Authentication Required)
All educational, clinical discovery, and informational endpoints are completely public and require **no authentication, API keys, or registration tokens**:
- Practice Information & Credentials: \`${siteConfig.url}/llms.txt\`
- Comprehensive Clinical Reference & Fees: \`${siteConfig.url}/llms-full.txt\`
- API Catalog (RFC 9727): \`${siteConfig.url}/.well-known/api-catalog\`
- Agentic Resource Discovery: \`${siteConfig.url}/.well-known/ai-catalog.json\`
- MCP Server Card: \`${siteConfig.url}/.well-known/mcp/server-card.json\`
- Agent Skills Discovery: \`${siteConfig.url}/.well-known/agent-skills/index.json\`
- OpenAPI 3.1 Definition: \`${siteConfig.url}/.well-known/openapi.json\`
- Health Check: \`${siteConfig.url}/api/health\`

---

## 3. Human-in-the-Loop Consultation Booking
Therapy sessions involve confidential medical and mental health care. Automated agent booking directly into clinical calendars without client involvement is restricted:
- **Discovery Calls:** Agents should direct clients to the interactive scheduling calendar at \`${siteConfig.discoveryCallUrl}\` or \`${siteConfig.url}/book\`.
- **Client Inquiries:** Agents may guide users to submit inquiries via \`${siteConfig.url}/contact\` or email directly at \`${siteConfig.email}\`.

---

## 4. Agent Registration & Contact
If your AI service requires programmatic integration or bulk access for health research or institutional wellness partnerships:
- **Contact:** ${siteConfig.email}
- **Practitioner:** ${siteConfig.author}
- **Website:** ${siteConfig.url}
- **Protected Resource Identifier:** \`${siteConfig.url}\`
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

