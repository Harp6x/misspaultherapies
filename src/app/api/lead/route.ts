import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const KIT_API_KEY = process.env.KIT_API_KEY ?? "";

const KIT_TAG_MAP: Record<string, string> = {
  "emotional-checkin": process.env.KIT_TAG_CHECKIN ?? "",
  "burnout-quiz": process.env.KIT_TAG_BURNOUT ?? "",
  "guided-reflection": process.env.KIT_TAG_REFLECTION ?? "",
  "ai-journal": process.env.KIT_TAG_JOURNAL ?? "",
  newsletter: process.env.KIT_TAG_NEWSLETTER ?? "19665257",
};

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN ?? "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source, responses, resultTier } = body as {
      email: string;
      source: string;
      responses?: Record<string, unknown>;
      resultTier?: string;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    const promises: Promise<unknown>[] = [];

    // 1. Save to Sanity (if write token is configured)
    if (process.env.SANITY_WRITE_TOKEN) {
      promises.push(
        writeClient.create({
          _type: "leadCapture",
          email,
          source: source || "unknown",
          responses: responses ? JSON.stringify(responses) : undefined,
          resultTier: resultTier || undefined,
          capturedAt: new Date().toISOString(),
          kitSynced: !!KIT_API_KEY,
        }),
      );
    }

    // 2. Subscribe + tag in Kit
    if (KIT_API_KEY) {
      const kitPromise = (async () => {
        const subRes = await fetch("https://api.kit.com/v4/subscribers", {
          method: "POST",
          headers: {
            "X-Kit-Api-Key": KIT_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email_address: email }),
        });

        if (!subRes.ok) return;

        const tagId = KIT_TAG_MAP[source] || KIT_TAG_MAP.newsletter;
        if (tagId) {
          await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
            method: "POST",
            headers: {
              "X-Kit-Api-Key": KIT_API_KEY,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email_address: email }),
          });
        }
      })();
      promises.push(kitPromise);
    }

    await Promise.allSettled(promises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
