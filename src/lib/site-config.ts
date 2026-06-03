export const siteConfig = {
  name: "Ms Paul Therapies",
  shortName: "MPT",
  tagline: "Compassionate Therapy for Meaningful Change",
  description:
    "Professional psychotherapy and counselling services by Aishani Paul. Offering individual, couples, adolescent, and family therapy - online across India and for NRIs abroad.",
  url: "https://mspaultherapies.in",
  author: "Aishani Paul",
  handle: "mspaultherapies",

  // Contact
  email: "mspaultherapies@gmail.com",
  phone: "+91 91233 11295",
  whatsappNumber: "919123311295",
  whatsappMessage:
    "Hi, I'd like to enquire about therapy sessions with Ms Paul Therapies.",

  // Credentials
  rciNumber: "A118537",
  qualifications: [
    "M.Phil in Clinical Psychology",
    "RCI Licensed Clinical Psychologist",
  ],
  languages: ["English", "Hindi", "Bengali"],

  // Social links
  socials: {
    instagram: "https://www.instagram.com/mspaultherapies",
    youtube: "https://www.youtube.com/@mspaultherapies",
    linkedin: "https://www.linkedin.com/in/mspaultherapies",
  },

  // Booking
  googleFormUrl: "https://forms.gle/7jRaX8H9ftoG34726",
  discoveryCallUrl: "https://cal.com/mspaultherapies/discovery-call",
  // Used for booking a full session after the intake form.
  sessionBookingUrl: "https://cal.com/mspaultherapies/sessionbooking",

  // Payment (these can be overridden / managed in Sanity Studio → Site Configuration)
  upiId: "paulaishani@oksbi",
  upiNumber: "8961511045",
  razorpayUrl: "", // paste Razorpay link in Sanity; empty hides the option
  upiQrCodeUrl: "", // upload QR in Sanity; empty hides the QR

  // Fees
  fees: {
    individual: "₹1,500 per session",
    couples: "₹3,500 per session",
    family: "₹3,500 - ₹5,000 per session",
    assessment: "₹500 - ₹7,500 (varies by assessment)",
    package: "₹3,899 for 4 individual sessions",
  },
  slidingScale:
    "Sliding scale available for students, unemployed individuals, homemakers, and others in financial need. Please reach out to discuss.",
  sessionDuration: "45-50 minutes",
  cancellationPolicy:
    "Cancellations must be made at least 24 hours in advance. No-show fees are non-refundable if cancelled less than 24 hours before the session.",

  // Newsletter (Kit / ConvertKit) — overridable in Sanity → Site Configuration
  // formType: "inline" renders in-page; "modal" | "slide-in" | "sticky-bar"
  // load once globally and auto-trigger; "off" disables it everywhere.
  newsletter: {
    formType: "inline" as
      | "inline"
      | "modal"
      | "slide-in"
      | "sticky-bar"
      | "off",
    uid: "1d5b37459d",
    scriptUrl: "https://ms-paul-therapies.kit.com/1d5b37459d/index.js",
  },

  // Analytics placeholders
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",

  // SEO
  ogImage: "/opengraph-image",
  twitterHandle: "@mspaultherapies",
} as const;

export type SiteConfig = typeof siteConfig;
