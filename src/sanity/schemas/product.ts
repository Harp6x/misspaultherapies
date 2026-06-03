import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

const productTypes = [
  { title: "Course", value: "course" },
  { title: "Mini-Course / Challenge", value: "mini-course" },
  { title: "Bundle", value: "bundle" },
  { title: "eBook", value: "ebook" },
  { title: "Toolkit / Worksheet (PDF)", value: "toolkit" },
  { title: "Quiz / Assessment", value: "quiz" },
  { title: "Corporate", value: "corporate" },
];

const topics = [
  { title: "Anxiety", value: "anxiety" },
  { title: "Depression", value: "depression" },
  { title: "Stress & Burnout", value: "stress-burnout" },
  { title: "Relationships", value: "relationships" },
  { title: "Self-Esteem & Self-Worth", value: "self-worth" },
  { title: "Boundaries", value: "boundaries" },
  { title: "Emotional Regulation", value: "emotional-regulation" },
  { title: "Mindfulness", value: "mindfulness" },
  { title: "Attachment", value: "attachment" },
  { title: "Trauma", value: "trauma" },
  { title: "Parenting & Family", value: "parenting-family" },
  { title: "Sleep", value: "sleep" },
  { title: "Self-Care", value: "self-care" },
  { title: "General Wellness", value: "general-wellness" },
];

const audiences = [
  { title: "Individuals", value: "individuals" },
  { title: "Couples", value: "couples" },
  { title: "Families", value: "families" },
  { title: "Teens / Adolescents", value: "teens" },
  { title: "Parents", value: "parents" },
  { title: "Corporate / Workplace", value: "corporate" },
  { title: "NRIs", value: "nris" },
];

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
    defineField({
      name: "body",
      title: "Full Description (detail page)",
      type: "array",
      group: "main",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      group: "filters",
      options: { list: productTypes, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics / Issues",
      type: "array",
      group: "filters",
      of: [{ type: "string" }],
      options: { list: topics },
    }),
    defineField({
      name: "audience",
      title: "For Whom",
      type: "array",
      group: "filters",
      of: [{ type: "string" }],
      options: { list: audiences },
    }),
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
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "productType", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `[${subtitle}]` : "", media };
    },
  },
});
