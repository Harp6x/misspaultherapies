"use client";

import { useEffect } from "react";

export function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Support both document.modelContext and window.modelContext per WebMCP spec
    const win = window as unknown as {
      modelContext?: {
        registerTool?: (tool: unknown) => Promise<unknown>;
      };
    };
    const doc = document as unknown as {
      modelContext?: {
        registerTool?: (tool: unknown) => Promise<unknown>;
      };
    };

    const ctx = doc.modelContext || win.modelContext;
    if (!ctx || typeof ctx.registerTool !== "function") return;

    try {
      ctx.registerTool({
        name: "get_therapy_services",
        description:
          "Query available online clinical therapy modalities, specialisations, and session fees for Ms Paul Therapies.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return {
            content: [
              {
                type: "text",
                text: "Ms Paul Therapies is an RCI-registered clinical psychology practice offering Individual Therapy (₹1,500), Couples Therapy (₹3,500), Adolescent Therapy (₹1,500), Family Therapy (₹3,500), and Culturally Sensitive NRI Therapy abroad.",
              },
            ],
          };
        },
      });

      ctx.registerTool({
        name: "book_discovery_call",
        description:
          "Get the direct scheduling link for a free 15-minute discovery consultation with Aishani Paul on Cal.com.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return {
            content: [
              {
                type: "text",
                text: "Schedule your free 15-minute discovery call at https://cal.com/mspaultherapies/15min (no financial commitment).",
              },
            ],
          };
        },
      });
    } catch {
      // Safe fallback if WebMCP execution context is not ready
    }
  }, []);

  return null;
}
