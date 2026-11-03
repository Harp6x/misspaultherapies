import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const metadata = {
    resource: base,
    authorization_servers: [base],
    scopes_supported: ["public:read", "public:inquiry"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${base}/auth.md`,
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
