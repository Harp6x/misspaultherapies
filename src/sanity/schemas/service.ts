import { defineType, defineField } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true, description: "Toggle to show/hide this service" }),
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
      name: "shortTitle",
      title: "Short Title (for nav/cards)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Card Image (optional)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      description: "Optional photo shown at the top of the service card on the homepage.",
    }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name (e.g. User, Heart, Globe)",
      type: "string",
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "approach",
      title: "Therapeutic Approach",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fee",
      title: "Fee",
      type: "string",
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
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "fee", published: "published" },
    prepare({ title, subtitle, published }) {
      return { title: `${published === false ? "[Draft] " : ""}${title}`, subtitle };
    },
  },
});
