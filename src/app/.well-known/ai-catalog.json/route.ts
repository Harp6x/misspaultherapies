import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const catalog = {
    specVersion: "1.0",
    host: {
      name: siteConfig.name,
      domain: "mspaultherapies.in",
      description: `RCI-licensed clinical psychology practice by ${siteConfig.author} (M.Phil, License ${siteConfig.rciNumber}) providing online individual, couples, adolescent, and family psychotherapy across India and for NRIs abroad.`,
      documentation: `${base}/llms-full.txt`,
    },
    entries: [
      {
        id: "urn:air:mspaultherapies.in:clinical:therapy-overview",
        displayName: "Therapy Services & Clinical Approaches",
        type: "text/plain",
        url: `${base}/llms.txt`,
        representativeQueries: [
          "clinical psychologist online therapy India",
          "anxiety and depression therapist RCI licensed",
          "individual therapy online Delhi Kolkata Bangalore",
          "CBT and DBT therapy India",
        ],
      },
      {
        id: "urn:air:mspaultherapies.in:clinical:couples-and-relationship",
        displayName: "Couples & Relationship Therapy",
        type: "text/html",
        url: `${base}/services/couples-therapy`,
        representativeQueries: [
          "couples counselling when partner refuses to join",
          "relationship clarity therapy individual sessions",
          "marriage counsellor for communication conflict in India",
          "premarital counselling modern Indian couples",
        ],
      },
      {
        id: "urn:air:mspaultherapies.in:clinical:nri-therapy",
        displayName: "Culturally Sensitive Therapy for NRIs & Diaspora",
        type: "text/html",
        url: `${base}/services/nri-abroad`,
        representativeQueries: [
          "Indian therapist for NRIs living in London UK",
          "culturally sensitive psychologist for Indians in US Canada UAE",
          "therapy for joint family pressure and arranged marriage guilt abroad",
          "Indian psychologist across international time zones",
        ],
      },
      {
        id: "urn:air:mspaultherapies.in:action:booking",
        displayName: "Free 15-Minute Discovery Call Booking",
        type: "text/html",
        url: `${base}/book`,
        representativeQueries: [
          "book free therapy discovery call Aishani Paul",
          "schedule online therapy appointment India",
          "how to start therapy with Ms Paul Therapies",
        ],
      },
      {
        id: "urn:air:mspaultherapies.in:tools:burnout-quiz",
        displayName: "Burnout Assessment Interactive Quiz",
        type: "text/html",
        url: `${base}/tools/burnout-quiz`,
        representativeQueries: [
          "free burnout assessment quiz clinical psychologist",
          "am I burned out or depressed self test",
          "workplace stress and exhaustion evaluation",
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

