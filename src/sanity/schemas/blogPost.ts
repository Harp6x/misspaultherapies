import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
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
      title: "Short Description (for cards/SEO)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Mental Health", value: "Mental Health" },
          { title: "Relationships", value: "Relationships" },
          { title: "Therapy Basics", value: "Therapy Basics" },
          { title: "Self-Care", value: "Self-Care" },
          { title: "Cultural Perspectives", value: "Cultural Perspectives" },
        ],
      },
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
      name: "youtubeUrl",
      title: "YouTube Video URL (optional)",
      type: "url",
      description: "Paste a YouTube video URL to embed in the post.",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Post/Reel URL (optional)",
      type: "url",
      description: "Paste an Instagram post or reel URL to embed in the post.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) =>
                      r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (e.g. 5 min read)",
      type: "string",
    }),
    defineField({
      name: "published",
      title: "Published?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Publish Date (newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      published: "published",
    },
    prepare({ title, subtitle, published }) {
      return {
        title: `${published ? "" : "[Draft] "}${title}`,
        subtitle,
      };
    },
  },
});
