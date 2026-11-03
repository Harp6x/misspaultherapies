import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const catalog = {
    linkset: [
      {
        anchor: `${base}/api`,
        "service-desc": [
          {
            href: `${base}/.well-known/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${base}/llms-full.txt`,
            type: "text/plain",
          },
        ],
        status: [
          {
            href: `${base}/api/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
