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
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({
      name: "approved",
      title: "Approved for display?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "featured", title: "Show on Homepage", type: "boolean", initialValue: false, description: "Feature this testimonial on the homepage" }),
    defineField({ name: "anonymous", title: "Anonymous", type: "boolean", initialValue: false, description: "Hide the client name on the website" }),
    defineField({ name: "relatedService", title: "Related Service", type: "reference", to: [{ type: "service" }], description: "Which service was this testimonial about?" }),
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
