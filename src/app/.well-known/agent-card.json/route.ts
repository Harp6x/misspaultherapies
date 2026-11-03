import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const agentCard = {
    $schema: "https://agent2agent.info/schemas/v1/agent-card.json",
    id: "urn:a2a:mspaultherapies.in",
    name: `${siteConfig.name} Clinical Agent`,
    description: `A2A interface for ${siteConfig.name}, private clinical psychology practice of ${siteConfig.author} (M.Phil, RCI Reg. No. ${siteConfig.rciNumber}). Provides clinical discovery, modality matching, and consultation scheduling for adults, couples, teens, families, and NRIs globally.`,
    version: "1.0.0",
    url: base,
    documentation: `${base}/llms-full.txt`,
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      website: base,
    },
    capabilities: {
      streaming: false,
      humanInTheLoop: true,
    },
    skills: [
      {
        id: "therapy-services-discovery",
        name: "Therapy Services & Modality Matching",
        description:
          "Find clinical therapy services (Individual, Couples, Adolescent, Family, NRI therapy, and Psychological Assessments), fees, and modalities (CBT, DBT, ACT, EFT).",
        tags: [
          "mental-health",
          "therapy",
          "clinical-psychology",
          "couples-counselling",
          "anxiety",
          "depression",
          "nri-therapy",
          "india",
        ],
        examples: [
          "Find an RCI licensed clinical psychologist for anxiety in India",
          "Can I begin relationship therapy if my partner refuses to attend?",
          "How much does individual online therapy cost?",
          "Culturally sensitive therapist for Indian living in London or USA",
        ],
        inputModes: ["text/plain", "application/json"],
        outputModes: ["text/plain", "application/json"],
      },
      {
        id: "schedule-discovery-call",
        name: "Free 15-Minute Discovery Call Booking",
        description:
          "Provides the direct Cal.com scheduling link to book a free 15-minute consultation with Aishani Paul.",
        tags: ["booking", "consultation", "discovery-call", "appointment"],
        examples: [
          "Book a free 15-minute therapy discovery call with Aishani Paul",
          "How do I schedule an intake session?",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/plain"],
      },
      {
        id: "mental-health-self-assessments",
        name: "Interactive Clinical Assessments",
        description:
          "Direct clients to free evidence-based screening tools including burnout assessment quiz, emotional check-in, and relationship pattern reflections.",
        tags: ["assessment", "quiz", "burnout", "check-in", "self-help"],
        examples: [
          "Take the free burnout assessment quiz",
          "Emotional check-in tool",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/plain"],
      },
    ],
  };

  return new NextResponse(JSON.stringify(agentCard, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
