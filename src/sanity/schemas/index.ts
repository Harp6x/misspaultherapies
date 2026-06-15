import { siteConfigSchema } from "./siteConfig";
import { serviceSchema } from "./service";
import { blogPostSchema } from "./blogPost";
import { faqSchema } from "./faq";
import { resourceSchema } from "./resource";
import { testimonialSchema } from "./testimonial";
import { locationSchema } from "./location";
import { aboutPageSchema } from "./aboutPage";
import { galleryItemSchema } from "./galleryItem";
import { workshopSchema } from "./workshop";
import { leadCaptureSchema } from "./leadCapture";
import { productSchema } from "./product";

// Reusable object types
import { seo } from "./objects/seo";
import { portableText } from "./objects/portable-text";

export const schemaTypes = [
  // Objects
  seo,
  portableText,
  // Singletons
  siteConfigSchema,
  aboutPageSchema,
  // Documents
  serviceSchema,
  blogPostSchema,
  faqSchema,
  resourceSchema,
  testimonialSchema,
  locationSchema,
  galleryItemSchema,
  workshopSchema,
  leadCaptureSchema,
  productSchema,
];
