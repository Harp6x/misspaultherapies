import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      name: siteConfig.name,
      practitioner: siteConfig.author,
      rciNumber: siteConfig.rciNumber,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}

