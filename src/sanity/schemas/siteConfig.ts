import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteConfigSchema = defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Site Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Internet Handle (e.g. mspaultherapies)",
      type: "string",
    }),

    // Contact
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (digits only, e.g. 919123311295)",
      type: "string",
    }),
    defineField({
      name: "whatsappMessage",
      title: "Default WhatsApp Message",
      type: "string",
    }),

    // Credentials
    defineField({
      name: "rciNumber",
      title: "RCI Registration Number",
      type: "string",
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Socials
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),

    // Booking
    defineField({
      name: "googleFormUrl",
      title: "Google Form Intake URL",
      type: "url",
    }),
    defineField({
      name: "upiId",
      title: "UPI ID",
      type: "string",
      description: "e.g. yourname@oksbi",
    }),
    defineField({
      name: "upiNumber",
      title: "UPI Phone Number",
      type: "string",
      description: "Phone number linked to your UPI, shown for payments.",
    }),
    defineField({
      name: "razorpayUrl",
      title: "Razorpay Payment Link",
      type: "url",
      description:
        "Paste your Razorpay payment page/link. Leave empty to hide the Razorpay option until ready.",
    }),
    defineField({
      name: "upiQrCode",
      title: "UPI QR Code Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload your UPI QR code so clients can scan and pay.",
    }),

    // Fees
    defineField({
      name: "feeIndividual",
      title: "Fee - Individual Session",
      type: "string",
    }),
    defineField({
      name: "feeCouples",
      title: "Fee - Couples Session",
      type: "string",
    }),
    defineField({
      name: "feeFamily",
      title: "Fee - Family Session",
      type: "string",
    }),
    defineField({
      name: "feeAssessment",
      title: "Fee - Assessment",
      type: "string",
    }),
    defineField({
      name: "feePackage",
      title: "Fee - Package Deal",
      type: "string",
    }),
    defineField({
      name: "slidingScale",
      title: "Sliding Scale Note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "sessionDuration",
      title: "Session Duration",
      type: "string",
    }),
    defineField({
      name: "cancellationPolicy",
      title: "Cancellation Policy",
      type: "text",
      rows: 3,
    }),

    // Newsletter (Kit / ConvertKit)
    defineField({
      name: "kitFormType",
      title: "Newsletter Form Type (Kit)",
      type: "string",
      description:
        "Inline = shows in-page on blog/resources. Modal / Slide-in / Sticky bar = loads once site-wide and pops up automatically (set the trigger inside Kit). Off = hidden everywhere.",
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
    defineField({
      name: "kitUid",
      title: "Kit Form UID (data-uid)",
      type: "string",
      description:
        "The data-uid value from your Kit embed snippet, e.g. 1d5b37459d.",
    }),
    defineField({
      name: "kitScriptUrl",
      title: "Kit Embed Script URL (src)",
      type: "url",
      description:
        "The full src URL from your Kit embed snippet, e.g. https://ms-paul-therapies.kit.com/1d5b37459d/index.js. Paste a new one anytime you change or recreate the form in Kit.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Configuration" };
    },
  },
});
