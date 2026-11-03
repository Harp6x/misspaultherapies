import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const index = {
    $schema: "https://agentskills.io/schema/v0.2.0/index.json",
    skills: [
      {
        name: "therapy-services-finder",
        type: "action",
        description: "Find therapy modalities, RCI clinical psychologist credentials, and fees for individual, couples, adolescent, family, and NRI therapy.",
        url: `${base}/.well-known/agent-skills/therapy-services.json`,
        sha256: "36be45bc445d428ef9bac25781c3133527cb720470e3faf54ce033bac2b86261",
      },
      {
        name: "booking-assistant",
        type: "action",
        description: "Guide users to book a free 15-minute discovery call or intake session with Aishani Paul.",
        url: `${base}/.well-known/agent-skills/booking.json`,
        sha256: "f3c8c498259c0e76dc0730dd2996c1d26cabd5c1fda63dd276372ca62ab99c26",
      },
    ],
  };

  return new NextResponse(JSON.stringify(index, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

