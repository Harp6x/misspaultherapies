import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TagIcon,
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "filters", title: "Filters" },
    { name: "cta", title: "Price & CTA" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (shown on card)",
      type: "text",
      rows: 3,
      group: "main",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "main",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "format",
      title: "Format (e.g. '4 modules · 12 lessons', 'PDF · 5 pages')",
      type: "string",
      group: "main",
    }),
    defineField({
      name: "highlights",
      title: "What You Get (bullet points)",
      type: "array",
      of: [{ type: "string" }],
      group: "main",
    }),
    defineField({ name: "body", title: "Full Description (detail page)", type: "portableText", group: "main" }),
    defineField({ name: "productType", title: "Product Type", type: "string", group: "filters", description: "Product types are managed in Site Configuration → Dropdown Options", validation: (r) => r.required() }),
    defineField({ name: "topics", title: "Topics / Issues", type: "array", group: "filters", of: [{ type: "string" }], description: "Topics are managed in Site Configuration → Dropdown Options", options: { layout: "tags" } }),
    defineField({ name: "audience", title: "For Whom", type: "array", group: "filters", of: [{ type: "string" }], description: "Audiences are managed in Site Configuration → Dropdown Options", options: { layout: "tags" } }),
    defineField({
      name: "priceType",
      title: "Price Type",
      type: "string",
      group: "cta",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Paid", value: "paid" },
          { title: "Bundle", value: "bundle" },
          { title: "Coming Soon", value: "coming-soon" },
        ],
        layout: "radio",
      },
      initialValue: "paid",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (e.g. '₹499' or 'Free')",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (strikethrough, optional)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "priceUSD",
      title: "Price USD (optional)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "actionUrl",
      title: "Action URL (buy link, download, or quiz)",
      description:
        "Paid → payment/buy link. Free → download or quiz link. Leave blank to show 'Enquire on WhatsApp'.",
      type: "url",
      group: "cta",
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label Override (optional)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Published?",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "main",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "main" }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "productType", media: "coverImage", published: "published" },
    prepare({ title, subtitle, media, published }) {
      return { title: `${published === false ? "[Draft] " : ""}${title}`, subtitle: subtitle ? `[${subtitle}]` : "", media };
    },
  },
});
