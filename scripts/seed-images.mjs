#!/usr/bin/env node
/**
 * seed-images.mjs
 *
 * Downloads therapy-specific photos from Unsplash and uploads them to Sanity.
 * Then patches siteConfig (heroSlides) and each service document (card image).
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/seed-images.mjs
 */

import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const PROJECT_ID = "k0r3y2my";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error("❌  Missing SANITY_TOKEN. Run: SANITY_TOKEN=sk... node scripts/seed-images.mjs");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: API_VERSION,
  useCdn: false,
});

// ── Photo library ─────────────────────────────────────────────────────────────
// All photos: real therapy / mental-health session context, Unsplash (free)
// IDs verified working as of June 2026.

const HERO_PHOTOS = [
  {
    unsplashId: "photo-1516574187841-cb9cc2ca948b",
    alt: "Two people in a warm, supportive therapeutic conversation",
  },
  {
    unsplashId: "photo-1590650046871-92c887180603",
    alt: "Person journaling thoughtfully — a cornerstone of therapy",
  },
  {
    unsplashId: "photo-1559757148-5c350d0d3c56",
    alt: "Open notebook on a comfortable couch — therapy reflection",
  },
  {
    unsplashId: "photo-1506126613408-eca07ce68773",
    alt: "Person in a calm, mindful moment of presence",
  },
  {
    unsplashId: "photo-1544006659-f0b21884ce1d",
    alt: "A warm, inviting therapy room with soft light and plants",
  },
  {
    unsplashId: "photo-1531983412531-1f49a365ffed",
    alt: "A thoughtful individual in a quiet, reflective moment",
  },
];

// Matched to service titles as stored in Sanity
const SERVICE_PHOTOS = [
  {
    titleMatch: "Individual Therapy",
    unsplashId: "photo-1590650046871-92c887180603",
    alt: "One-on-one individual therapy — personal, focused support",
  },
  {
    titleMatch: "Couples Therapy",
    unsplashId: "photo-1516574187841-cb9cc2ca948b",
    alt: "Couples therapy — improving communication and emotional connection",
  },
  {
    titleMatch: "Adolescent Therapy",
    unsplashId: "photo-1531983412531-1f49a365ffed",
    alt: "Adolescent therapy — a safe space for teenagers to grow",
  },
  {
    titleMatch: "Family Therapy",
    unsplashId: "photo-1559757148-5c350d0d3c56",
    alt: "Family therapy — working through challenges together with care",
  },
  {
    titleMatch: "Psychological Assessments",
    unsplashId: "photo-1576091160550-2173dba999ef",
    alt: "Psychological assessment — structured clinical evaluation",
  },
  {
    titleMatch: "Therapy for NRIs",
    unsplashId: "photo-1517048676732-d65bc937f952",
    alt: "Online therapy for NRIs and Indians abroad — support across borders",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function key() {
  return randomBytes(6).toString("hex");
}

async function downloadImage(unsplashId) {
  const url = `https://images.unsplash.com/${unsplashId}?w=1920&q=85&fit=crop&auto=format`;
  process.stdout.write(`  ↓ Downloading ${unsplashId}... `);
  const res = await fetch(url, {
    headers: { "User-Agent": "MsPaulTherapies/1.0 seed-images-script" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} from Unsplash`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  console.log(`${(buffer.length / 1024).toFixed(0)} KB`);
  return { buffer, contentType };
}

async function uploadAsset(buffer, contentType) {
  process.stdout.write(`  ↑ Uploading to Sanity... `);
  // Use @sanity/client's built-in asset upload
  const asset = await client.assets.upload("image", buffer, {
    contentType,
    filename: `therapy-${key()}.jpg`,
  });
  console.log(`✓ ${asset._id.slice(0, 45)}...`);
  return asset._id;
}

function imageRef(assetId) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

// ── Main ────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n📸  Ms Paul Therapies — Seed Images\n");

  // ── 1. Hero slideshow ──────────────────────────────────────────────────────
  console.log("── Hero Slideshow Photos ──────────────────────────────────────");
  const heroSlides = [];
  for (const photo of HERO_PHOTOS) {
    try {
      const { buffer, contentType } = await downloadImage(photo.unsplashId);
      const assetId = await uploadAsset(buffer, contentType);
      heroSlides.push({
        _type: "object",
        _key: key(),
        image: imageRef(assetId),
        alt: photo.alt,
      });
    } catch (err) {
      console.error(`  ✗ ${photo.unsplashId}: ${err.message}`);
    }
  }
  console.log(`\n  ${heroSlides.length}/${HERO_PHOTOS.length} hero photos ready.\n`);

  // ── 2. Patch siteConfig ────────────────────────────────────────────────────
  console.log("── Patching siteConfig ────────────────────────────────────────");
  const siteConfigId = await client.fetch(`*[_type == "siteConfig"][0]._id`);
  if (!siteConfigId) {
    console.error("  ✗ No siteConfig document found. Run seed-sanity.mjs first.");
  } else if (heroSlides.length === 0) {
    console.error("  ✗ No slides uploaded — skipping patch.");
  } else {
    await client.patch(siteConfigId).set({ heroSlides }).commit();
    console.log(`  ✓ siteConfig patched with ${heroSlides.length} hero slides.\n`);
  }

  // ── 3. Service images ──────────────────────────────────────────────────────
  console.log("── Service Card Images ────────────────────────────────────────");
  const services = await client.fetch(
    `*[_type == "service" && published != false]{ _id, title }`
  );
  console.log(`  Found ${services?.length ?? 0} services in Sanity.\n`);

  for (const sp of SERVICE_PHOTOS) {
    const match = (services ?? []).find((s) =>
      s.title?.toLowerCase().startsWith(sp.titleMatch.toLowerCase())
    );
    if (!match) {
      console.log(`  ⚠  No service found matching "${sp.titleMatch}" — skipping.`);
      continue;
    }
    console.log(`\n  Service: ${match.title}`);
    try {
      const { buffer, contentType } = await downloadImage(sp.unsplashId);
      const assetId = await uploadAsset(buffer, contentType);
      await client
        .patch(match._id)
        .set({ image: { ...imageRef(assetId), alt: sp.alt } })
        .commit();
      console.log(`  ✓ Card image set.`);
    } catch (err) {
      console.error(`  ✗ ${match.title}: ${err.message}`);
    }
  }

  console.log("\n✅  Done! Sanity updated.");
  console.log("   The live site will refresh within 60 s (ISR revalidation).\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
