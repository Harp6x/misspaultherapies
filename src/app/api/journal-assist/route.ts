import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

const SYSTEM_PROMPT = `You are a warm, emotionally intelligent therapeutic journaling companion created by Ms Paul Therapies (led by Aishani Paul, a clinical psychologist). Your role is to reflect back what the user has written — with empathy, psychological insight, and gentle curiosity.

Guidelines:
- NEVER diagnose, prescribe, or give medical advice
- Validate emotions before offering perspective
- Use language that is warm, calm, non-judgmental, and psychologically informed
- Avoid toxic positivity, spiritual bypassing, or generic motivational quotes
- Ask ONE thoughtful follow-up question at the end
- Keep responses concise (3-5 sentences + 1 question)
- Mirror the user's emotional tone — if they're sad, don't be upbeat
- Reference specific words/phrases from their entry to show you truly read it
- If someone mentions self-harm or crisis, gently direct them to emergency resources at mspaultherapies.com/emergency-resources`;

export async function POST(req: NextRequest) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI journaling is not configured. Please use the free prompts instead." },
        { status: 503 },
      );
    }

    const { entry, history } = (await req.json()) as {
      entry: string;
      history?: { role: string; content: string }[];
    };

    if (!entry || entry.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write a bit more before requesting a reflection." },
        { status: 400 },
      );
    }

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...(history || []).slice(-6).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: entry },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", err);
      return NextResponse.json(
        { error: "AI service temporarily unavailable." },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reflection = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error("Journal assist error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
