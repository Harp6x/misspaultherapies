import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const openapi = {
    openapi: "3.1.0",
    info: {
      title: `${siteConfig.name} Public API`,
      description: `Public discovery and contact endpoints for ${siteConfig.name}, private clinical psychology practice run by ${siteConfig.author} (M.Phil, RCI License ${siteConfig.rciNumber}).`,
      version: "1.0.0",
      contact: {
        name: siteConfig.author,
        email: siteConfig.email,
        url: base,
      },
    },
    servers: [
      {
        url: base,
        description: "Production Server",
      },
    ],
    paths: {
      "/api/health": {
        get: {
          summary: "System health and practitioner availability status",
          operationId: "getHealth",
          responses: {
            "200": {
              description: "Service is healthy and available",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string" },
                      name: { type: "string" },
                      practitioner: { type: "string" },
                      rciNumber: { type: "string" },
                      timestamp: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/contact": {
        post: {
          summary: "Submit a confidential inquiry",
          operationId: "submitContactForm",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "message"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    phone: { type: "string" },
                    subject: { type: "string" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Inquiry received successfully",
            },
            "400": {
              description: "Validation error",
            },
          },
        },
      },
      "/llms.txt": {
        get: {
          summary: "Machine-readable practice summary for AI agents",
          operationId: "getLlmsTxt",
          responses: {
            "200": {
              description: "Plaintext markdown overview",
              content: {
                "text/plain": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
      "/llms-full.txt": {
        get: {
          summary: "Extended clinical reference, modalities, fees, and FAQ for AI agents",
          operationId: "getLlmsFullTxt",
          responses: {
            "200": {
              description: "Full clinical practice reference",
              content: {
                "text/plain": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  return new NextResponse(JSON.stringify(openapi, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
