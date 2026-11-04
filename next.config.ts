import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/nri-therapy-abroad",
        destination: "/services/nri-abroad",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Signal", value: "search=yes, ai-input=yes, ai-train=yes" },
          {
            key: "Link",
            value: [
              '</api/markdown>; rel="alternate"; type="text/markdown"',
              '</llms.txt>; rel="describedby"; type="text/plain"',
              '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
              '</.well-known/ai-catalog.json>; rel="service-desc"; type="application/json"',
              '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
              '</.well-known/agent-card.json>; rel="service-desc"; type="application/json"',
              '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"',
              '</auth.md>; rel="author"',
            ].join(", "),
          },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Accept" },
        ],
      },
    ];
  },
};

export default nextConfig;
