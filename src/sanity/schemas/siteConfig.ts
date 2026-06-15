import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

const tagArray = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    group: "options",
    of: [{ type: "object", fields: [defineField({ name: "value", type: "string", title: "Value", validation: (r) => r.required() })], preview: { select: { title: "value" } } }],
  });

export const siteConfigSchema = defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact & Booking" },
    { name: "fees", title: "Fees" },
    { name: "newsletter", title: "Newsletter" },
    { name: "pages", title: "Page Visibility" },
    { name: "options", title: "Dropdown Options" },
  ],
  fields: [
    // ── General ──
    defineField({
      name: "name",
      title: "Site Name",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "general" }),
    defineField({ name: "description", title: "Site Description", type: "text", rows: 3, group: "general" }),
    defineField({ name: "author", title: "Author Name", type: "string", group: "general" }),
    defineField({ name: "handle", title: "Internet Handle (e.g. mspaultherapies)", type: "string", group: "general" }),
    defineField({ name: "seo", title: "Default SEO", type: "seo", group: "general" }),

    // ── Contact & Booking ──
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number (digits only, e.g. 919123311295)", type: "string", group: "contact" }),
    defineField({ name: "whatsappMessage", title: "Default WhatsApp Message", type: "string", group: "contact" }),
    defineField({ name: "rciNumber", title: "RCI Registration Number", type: "string", group: "contact" }),
    defineField({ name: "qualifications", title: "Qualifications", type: "array", of: [{ type: "string" }], group: "contact" }),
    defineField({ name: "languages", title: "Languages", type: "array", of: [{ type: "string" }], group: "contact" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "contact" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url", group: "contact" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "contact" }),
    defineField({ name: "googleFormUrl", title: "Google Form Intake URL", type: "url", group: "contact" }),
    defineField({ name: "upiId", title: "UPI ID", type: "string", group: "contact", description: "e.g. yourname@oksbi" }),
    defineField({ name: "upiNumber", title: "UPI Phone Number", type: "string", group: "contact", description: "Phone number linked to your UPI, shown for payments." }),
    defineField({ name: "razorpayUrl", title: "Razorpay Payment Link", type: "url", group: "contact", description: "Paste your Razorpay payment page/link. Leave empty to hide the Razorpay option until ready." }),
    defineField({ name: "upiQrCode", title: "UPI QR Code Image", type: "image", options: { hotspot: true }, group: "contact", description: "Upload your UPI QR code so clients can scan and pay." }),

    // ── Fees ──
    defineField({ name: "feeIndividual", title: "Fee - Individual Session", type: "string", group: "fees" }),
    defineField({ name: "feeCouples", title: "Fee - Couples Session", type: "string", group: "fees" }),
    defineField({ name: "feeFamily", title: "Fee - Family Session", type: "string", group: "fees" }),
    defineField({ name: "feeAssessment", title: "Fee - Assessment", type: "string", group: "fees" }),
    defineField({ name: "feePackage", title: "Fee - Package Deal", type: "string", group: "fees" }),
    defineField({ name: "slidingScale", title: "Sliding Scale Note", type: "text", rows: 2, group: "fees" }),
    defineField({ name: "sessionDuration", title: "Session Duration", type: "string", group: "fees" }),
    defineField({ name: "cancellationPolicy", title: "Cancellation Policy", type: "text", rows: 3, group: "fees" }),

    // ── Newsletter (Kit / ConvertKit) ──
    defineField({
      name: "kitFormType",
      title: "Newsletter Form Type (Kit)",
      type: "string",
      group: "newsletter",
      description: "Inline = shows in-page on blog/resources. Modal / Slide-in / Sticky bar = loads once site-wide and pops up automatically (set the trigger inside Kit). Off = hidden everywhere.",
      options: {
        list: [
          { title: "Inline (in-page form)", value: "inline" },
          { title: "Modal (popup)", value: "modal" },
          { title: "Slide-in", value: "slide-in" },
          { title: "Sticky bar", value: "sticky-bar" },
          { title: "Off (disabled)", value: "off" },
        ],
        layout: "radio",
      },
      initialValue: "inline",
    }),
    defineField({ name: "kitUid", title: "Kit Form UID (data-uid)", type: "string", group: "newsletter", description: "The data-uid value from your Kit embed snippet, e.g. 1d5b37459d." }),
    defineField({ name: "kitScriptUrl", title: "Kit Embed Script URL (src)", type: "url", group: "newsletter", description: "The full src URL from your Kit embed snippet, e.g. https://ms-paul-therapies.kit.com/1d5b37459d/index.js." }),

    // ── Page Visibility Toggles ──
    defineField({ name: "enableBlogPage", title: "Enable Blog Page", type: "boolean", initialValue: true, group: "pages", description: "Toggle the Blog page on/off." }),
    defineField({ name: "enableProductsPage", title: "Enable Products Page", type: "boolean", initialValue: true, group: "pages", description: "Toggle the Products page on/off." }),
    defineField({ name: "enableWorkshopsPage", title: "Enable Workshops Page", type: "boolean", initialValue: true, group: "pages", description: "Toggle the Workshops page on/off." }),
    defineField({ name: "enableGalleryPage", title: "Enable Gallery Page", type: "boolean", initialValue: true, group: "pages", description: "Toggle the Gallery page on/off." }),
    defineField({ name: "enableResourcesPage", title: "Enable Resources Page", type: "boolean", initialValue: true, group: "pages", description: "Toggle the Resources page on/off." }),

    // ── Dropdown Options (CMS-editable tag lists) ──
    tagArray("blogCategories", "Blog Categories", "Options for the Blog category dropdown (e.g. Mental Health, Relationships)"),
    tagArray("faqCategories", "FAQ Categories", "Options for the FAQ category dropdown (e.g. Getting Started, Sessions)"),
    tagArray("productTypes", "Product Types", "Options for the Product type dropdown (e.g. Worksheet, eBook, Course)"),
    tagArray("productTopics", "Product Topics", "Options for the Product topic dropdown (e.g. Anxiety, Self-Care)"),
    tagArray("productAudiences", "Product Audiences", "Options for the Product audience dropdown (e.g. Adults, Couples)"),
    tagArray("workshopStatuses", "Workshop Statuses", "Options for the Workshop status dropdown (e.g. Upcoming, Open, Sold Out)"),
  ],
  preview: {
    prepare() {
      return { title: "Site Configuration" };
    },
  },
});
