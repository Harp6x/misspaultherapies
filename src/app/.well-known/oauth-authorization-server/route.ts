import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const metadata = {
    issuer: base,
    authorization_endpoint: `${base}/auth.md`,
    token_endpoint: `${base}/api/oauth/token`,
    jwks_uri: `${base}/.well-known/jwks.json`,
    response_types_supported: ["token"],
    grant_types_supported: ["client_credentials"],
    service_documentation: `${base}/auth.md`,
    ui_locales_supported: ["en-IN", "en"],
    agent_auth: {
      register_uri: `${base}/auth.md`,
      supported_identity_types: ["agent", "crawler"],
      supported_credential_types: ["none", "bearer_token"],
      documentation: `${base}/auth.md`,
    },
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

