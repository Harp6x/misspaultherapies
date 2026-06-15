"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { structure } from "@/sanity/structure";

const SINGLETON_TYPES = new Set(["siteConfig", "aboutPage"]);

export default defineConfig({
  name: "ms-paul-therapies",
  title: "Ms Paul Therapies — CMS",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((opt) => !SINGLETON_TYPES.has(opt.templateId)),
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : prev,
  },
});
