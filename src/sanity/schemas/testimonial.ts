import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Client Name / Initials",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "context",
      title: "Context (e.g. Individual therapy client, 6 months)",
      type: "string",
    }),
    defineField({
      name: "approved",
      title: "Approved for display?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "context", approved: "approved" },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? "" : "[Hidden] "}${title}`,
        subtitle,
      };
    },
  },
});
