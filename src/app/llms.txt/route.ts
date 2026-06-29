import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

const content = `# Ms Paul Therapies

> Online therapy and counselling by Aishani Paul, RCI-licensed clinical psychologist (License A118537), M.Phil Clinical Psychology. Based in Delhi. Serving all of India and NRIs globally.

Ms Paul Therapies is a professional psychotherapy practice founded by Aishani Paul. Every session is conducted one-on-one via secure video conferencing. The practice operates entirely online, making evidence-based mental health support accessible from any city in India or anywhere in the world.

## Who

Aishani Paul is an RCI-registered (Rehabilitation Council of India) clinical psychologist with an M.Phil in Clinical Psychology. She is licensed to practise psychotherapy and psychological assessment in India (RCI License: A118537). She offers therapy in English, Hindi, and Bengali.

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

- **Individual Therapy** — One-on-one sessions for adults dealing with anxiety, depression, trauma, grief, and life challenges. Fee: ₹1,500 per session.
- **Couples Therapy** — Sessions for couples navigating communication, trust, intimacy, and conflict. Fee: ₹3,500 per session.
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

Ms Paul Therapies also offers self-paced digital mental health products:
- Online courses (anxiety, burnout, boundaries, attachment, emotional regulation)
- Bundles and toolkits
- Free resources (worksheets, guides, quizzes)

## Contact & Booking

- **Website**: https://mspaultherapies.in
- **Book a free 15-minute discovery call**: https://mspaultherapies.in/book
- **Email**: mspaultherapies@gmail.com
- **WhatsApp**: +91 91233 11295
- **Instagram**: https://www.instagram.com/mspaultherapies
- **YouTube**: https://www.youtube.com/@mspaultherapies

## Additional Resources

- [About Aishani Paul](https://mspaultherapies.in/about)
- [All Services](https://mspaultherapies.in/services)
- [FAQ](https://mspaultherapies.in/faq)
- [Blog](https://mspaultherapies.in/blog)
- [Digital Products](https://mspaultherapies.in/products)
- [Extended machine-readable summary](https://mspaultherapies.in/llms-full.txt)
`;

export function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
