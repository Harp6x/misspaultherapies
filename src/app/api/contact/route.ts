import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Book a Session",
  "Therapy for NRIs",
  "Workshop Inquiry",
  "Collaboration/Media",
  "Feedback",
] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    // ── Validation ──
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const chosenSubject =
      subject && SUBJECT_OPTIONS.includes(subject as (typeof SUBJECT_OPTIONS)[number])
        ? subject
        : "General Inquiry";

    // ── Send email via Resend ──
    const { error } = await resend.emails.send({
      from: "Ms Paul Therapies <hello@mspaultherapies.in>",
      to: "mspaultherapies@gmail.com",
      replyTo: email.trim(),
      subject: `[Contact Form] ${chosenSubject} — ${name.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5C4033;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #5C4033; border-bottom: 1px solid #eee;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #5C4033; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            ${phone?.trim() ? `<tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #5C4033; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone.trim()}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #5C4033; border-bottom: 1px solid #eee;">Subject</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${chosenSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f7f4; border-radius: 8px;">
            <h3 style="margin: 0 0 8px; color: #5C4033;">Message</h3>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
