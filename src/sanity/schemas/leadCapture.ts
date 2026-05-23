import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const leadCaptureSchema = defineType({
  name: "leadCapture",
  title: "Lead Capture",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Source Tool",
      type: "string",
      options: {
        list: [
          { title: "Emotional Check-In", value: "emotional-checkin" },
          { title: "Burnout Quiz", value: "burnout-quiz" },
          { title: "Guided Reflection", value: "guided-reflection" },
          { title: "AI Journal", value: "ai-journal" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Lead Magnet", value: "lead-magnet" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "resultTier",
      title: "Result Tier",
      type: "string",
      description: "E.g. low-risk, moderate, high, critical (from quizzes)",
    }),
    defineField({
      name: "responses",
      title: "Responses (JSON)",
      type: "text",
      rows: 6,
      description: "Stored as JSON string for flexibility",
    }),
    defineField({
      name: "capturedAt",
      title: "Captured At",
      type: "datetime",
    }),
    defineField({
      name: "kitSynced",
      title: "Synced to Kit?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "capturedAtDesc",
      by: [{ field: "capturedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "email", subtitle: "source", date: "capturedAt" },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "No email",
        subtitle: `${subtitle || "unknown"} - ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
