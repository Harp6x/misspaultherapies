import { NextRequest, NextResponse } from "next/server";

const KIT_API_KEY = process.env.KIT_API_KEY ?? "";
const KIT_TAG_ID = "19665257"; // "mental-health-guide" tag

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!KIT_API_KEY) {
      console.error("KIT_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // 1. Create / find subscriber
    const subRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": KIT_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!subRes.ok) {
      const err = await subRes.text();
      console.error("Kit subscriber error:", err);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    const subData = await subRes.json();
    const subscriberId = subData.subscriber?.id;

    // 2. Tag subscriber with "mental-health-guide"
    if (subscriberId) {
      await fetch(`https://api.kit.com/v4/tags/${KIT_TAG_ID}/subscribers`, {
        method: "POST",
        headers: {
          "X-Kit-Api-Key": KIT_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
