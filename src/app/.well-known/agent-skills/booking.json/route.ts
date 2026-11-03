import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

const content = JSON.stringify(
  {
    name: "booking-assistant",
    version: "1.0.0",
    description: "Guide clients to free 15-minute discovery call booking on Cal.com.",
    endpoint: "https://mspaultherapies.in/book",
  },
  null,
  2
);

export async function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
