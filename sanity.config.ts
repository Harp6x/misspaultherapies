"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export default defineConfig({
  name: "ms-paul-therapies",
  title: "Ms Paul Therapies — CMS",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site Config as a singleton
            S.listItem()
              .title("Site Configuration")
              .id("siteConfig")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
                  .title("Site Configuration")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("About Page")
              ),
            S.divider(),
            // Regular document lists
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("resource").title("Resources"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("location").title("Location Pages"),
            S.divider(),
            S.documentTypeListItem("galleryItem").title("Gallery / Media"),
            S.documentTypeListItem("workshop").title("Workshops"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
});
