import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const serverCard = {
    $schema: "https://modelcontextprotocol.io/schemas/server-card/v1.json",
    serverInfo: {
      name: "mspaultherapies",
      title: "Ms Paul Therapies Clinical MCP",
      version: "1.0.0",
      description: `Model Context Protocol server for ${siteConfig.name} - RCI-licensed clinical psychology practice by ${siteConfig.author}. Allows AI agents to query therapy services, clinical approaches, fee structures, and discovery call booking paths.`,
      homepage: base,
      author: siteConfig.author,
    },
    transport: {
      type: "sse",
      endpoint: `${base}/api/mcp/sse`,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
  };

  return new NextResponse(JSON.stringify(serverCard, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
