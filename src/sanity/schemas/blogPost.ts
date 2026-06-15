import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "embeds", title: "Embeds" },
    { name: "meta", title: "Meta & SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "published", title: "Published?", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "description", title: "Short Description (for cards/SEO)", type: "text", rows: 3, group: "content" }),
    defineField({ name: "category", title: "Category", type: "string", group: "content", description: "Categories are managed in Site Configuration → Dropdown Options" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", group: "content", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }),
    defineField({ name: "body", title: "Body", type: "portableText", group: "content" }),
    defineField({ name: "youtubeUrl", title: "YouTube Video URL (optional)", type: "url", group: "embeds", description: "Paste a YouTube video URL to embed in the post." }),
    defineField({ name: "instagramUrl", title: "Instagram Post/Reel URL (optional)", type: "url", group: "embeds", description: "Paste an Instagram post or reel URL to embed in the post." }),
    defineField({ name: "publishedAt", title: "Published Date", type: "date", group: "meta" }),
    defineField({ name: "readingTime", title: "Reading Time (e.g. 5 min read)", type: "string", group: "meta" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
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
