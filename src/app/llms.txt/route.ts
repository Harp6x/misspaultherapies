import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/data";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const config = await getSiteConfig();
  const content = `# ${config.name}

> Online therapy and counselling by ${config.author}, RCI-licensed clinical psychologist (License ${config.rciNumber}), ${config.qualifications.join(", ")}. Serving all of India and NRIs globally.

${config.name} is a professional psychotherapy practice founded by ${config.author}. Every session is conducted one-on-one via secure video conferencing. The practice operates entirely online, making evidence-based mental health support accessible from any city in India or anywhere in the world.

## Who

${config.author} is an RCI-registered (Rehabilitation Council of India) clinical psychologist. She is licensed to practise psychotherapy and psychological assessment in India (RCI License: ${config.rciNumber}). She offers therapy in ${config.languages.join(", ")}.

She specialises in:
- Anxiety disorders (generalised anxiety, social anxiety, panic)
- Depression and low mood
- Relationship and couples issues
- Adolescent and teen mental health
- Family conflict and dynamics
- Trauma and PTSD
- Grief and bereavement
- Burnout and work stress
- Self-esteem and self-worth
- Attachment and intimacy issues
- Life transitions and adjustment
- NRI and diaspora mental health

Therapy approaches used: Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Acceptance and Commitment Therapy (ACT), Emotion-Focused Therapy (EFT), Attachment-based therapy, Mindfulness-based interventions.

## Services

- **Individual Therapy** — One-on-one sessions for adults dealing with anxiety, depression, trauma, grief, and life challenges. Fee: ${config.fees.individual}.
- **Couples Therapy** — Sessions for couples navigating communication, trust, intimacy, and conflict. Fee: ${config.fees.couples}.
- **Adolescent Therapy** — Therapy for teenagers (13–19) dealing with academic pressure, identity, social anxiety, and family conflict.
- **Family Therapy** — Sessions for families working through conflict, communication breakdowns, and generational issues.
- **Corporate Wellness Workshops** — Interactive mental health workshops for teams on stress, burnout, and resilience.

All services are delivered online via secure video call. Sessions are 45–50 minutes. Sliding scale fees available for students, homemakers, and those in financial need.

## Who She Works With

- Adults (18+) across India — any city, any state
- Teenagers and adolescents (13–19)
- Couples
- Families
- Working professionals and corporate employees
- NRIs in the US, UK, Canada, Australia, UAE, Singapore, and beyond
- Indians living in Tier-1, Tier-2, and Tier-3 cities

## Digital Products

${config.name} also offers self-paced digital mental health products:
- Online courses (anxiety, burnout, boundaries, attachment, emotional regulation)
- Bundles and toolkits
- Free resources (worksheets, guides, quizzes)

## Contact & Booking

- **Website**: ${config.url}
- **Book a free 15-minute discovery call**: ${config.discoveryCallUrl}
- **Email**: ${config.email}
- **WhatsApp**: ${config.phone}
- **Instagram**: ${config.socials.instagram}
- **YouTube**: ${config.socials.youtube}

## Additional Resources

- [About ${config.author}](${config.url}/about)
- [All Services](${config.url}/services)
- [FAQ](${config.url}/faq)
- [Blog](${config.url}/blog)
- [Digital Products](${config.url}/products)
- [Extended machine-readable summary](${config.url}/llms-full.txt)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
