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
    defineField({
      name: "body",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Registration Open", value: "open" },
          { title: "Sold Out", value: "sold-out" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "upcoming",
    }),
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
  ],
  orderings: [
    {
      title: "Date (upcoming first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `[${subtitle}]` : "",
      };
    },
  },
});
