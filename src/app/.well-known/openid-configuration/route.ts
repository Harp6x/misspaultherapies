import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const base = siteConfig.url;

  const config = {
    issuer: base,
    authorization_endpoint: `${base}/auth.md`,
    token_endpoint: `${base}/api/oauth/token`,
    jwks_uri: `${base}/.well-known/jwks.json`,
    response_types_supported: ["token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    service_documentation: `${base}/auth.md`,
  };

  return new NextResponse(JSON.stringify(config, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
