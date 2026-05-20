import { defineType, defineField } from "sanity";
import { PinIcon } from "@sanity/icons";

export const locationSchema = defineType({
  name: "location",
  title: "Location Page",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "Location Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Page Title (H1)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "features",
      title: "Key Features / Bullet Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "services",
      title: "Available Services (slugs)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
});
