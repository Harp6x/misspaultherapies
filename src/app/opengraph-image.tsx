import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/data";

export const alt = "Ms Paul Therapies - Online Therapy & Counselling in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const config = await getSiteConfig();
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #F5F0EB 0%, #E8E0D8 50%, #6B7C5E 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#3D2B1F",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {config.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6B7C5E",
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          {config.tagline}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#6B5D50",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          {config.description}
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            fontSize: 16,
            color: "#6B7C5E",
            fontWeight: 600,
          }}
        >
          <span>✓ RCI Licensed</span>
          <span>✓ 100% Online</span>
          <span>✓ India & Abroad</span>
          <span>✓ Free Discovery Call</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
