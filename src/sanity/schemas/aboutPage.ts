import { defineType, defineField } from "sanity";

export const aboutPageSchema = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "About Aishani Paul",
    }),
    defineField({
      name: "photo",
      title: "Professional Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "bioParagraph1",
      title: "Bio - Paragraph 1",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bioParagraph2",
      title: "Bio - Paragraph 2",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bioParagraph3",
      title: "Bio - Paragraph 3",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "approachIntro",
      title: "Approach - Intro Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "languagesText",
      title: "Languages Section Text",
      type: "text",
      rows: 2,
      description: "Use {languages} as a placeholder for the language list from Site Config.",
    }),
    defineField({
      name: "connectHeading",
      title: "Connect Section - Heading",
      type: "string",
    }),
    defineField({
      name: "connectText",
      title: "Connect Section - Subtext",
      type: "string",
    }),
    defineField({
      name: "resume",
      title: "Resume / CV (PDF)",
      type: "file",
      options: { accept: ".pdf" },
      description: "Upload a PDF resume. Visitors can view or download it from the About page.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform Name", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
