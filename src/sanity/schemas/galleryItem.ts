import { defineType, defineField } from "sanity";

export const galleryItemSchema = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Instagram Reel", value: "instagram-reel" },
          { title: "Instagram Post", value: "instagram-post" },
          { title: "YouTube Video", value: "youtube-video" },
          { title: "Image", value: "image" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "URL (Instagram or YouTube)",
      type: "url",
      description: "Paste the full URL of the Instagram post/reel or YouTube video.",
    }),
    defineField({
      name: "image",
      title: "Image (for image type)",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage?",
      type: "boolean",
      initialValue: false,
      description: "If checked, this item will appear in the Media section on the homepage.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "image",
    },
  },
});
