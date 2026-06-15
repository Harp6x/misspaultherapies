import { defineType, defineField } from "sanity";

export const workshopSchema = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "date",
      title: "Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 2 hours)",
      type: "string",
    }),
    defineField({
      name: "fee",
      title: "Fee",
      type: "string",
      description: "e.g. ₹999 or Free",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration Link",
      type: "url",
    }),
    defineField({ name: "body", title: "Full Description", type: "portableText" }),
    defineField({ name: "status", title: "Status", type: "string", description: "Statuses are managed in Site Configuration → Dropdown Options", initialValue: "upcoming" }),
    defineField({
      name: "published",
      title: "Published?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Date (upcoming first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage", published: "published" },
    prepare({ title, subtitle, published }) {
      return {
        title: `${published === false ? "[Draft] " : ""}${title}`,
        subtitle: subtitle ? `[${subtitle}]` : "",
      };
    },
  },
});
