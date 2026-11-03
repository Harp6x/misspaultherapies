import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

const content = JSON.stringify(
  {
    name: "therapy-services-finder",
    version: "1.0.0",
    description: "Query available clinical therapy modalities, fees, and RCI credentials for Aishani Paul.",
    endpoint: "https://mspaultherapies.in/llms-full.txt",
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

