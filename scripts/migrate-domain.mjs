/**
 * Migration: replace mspaultherapies.com → mspaultherapies.in in Sanity content
 *
 * Targets:
 *  - product.actionUrl (string)
 *  - Portable Text link markDefs with href fields inside common rich-text fields (body, description)
 *  - Light generic scan for top-level string fields on products
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/migrate-domain.mjs [--dry]
 */

import { createClient } from "@sanity/client";

const projectId = "k0r3y2my";
const dataset = "production";
const token = process.env.SANITY_TOKEN;
const DRY_RUN = process.argv.includes("--dry") || process.env.DRY_RUN === "1";

if (!token) {
  console.error(
    "❌  Set SANITY_TOKEN env var first.\n" +
      "   → Create an Editor token at: https://www.sanity.io/manage/project/k0r3y2my/api#tokens\n" +
      "   Then run: SANITY_TOKEN=sk... node scripts/migrate-domain.mjs [--dry]"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const OLD_HOST = "mspaultherapies.com";
const NEW_HOST = "mspaultherapies.in";

function replaceHostInUrl(url) {
  if (typeof url !== "string") return url;
  try {
    const u = new URL(url, "https://" + OLD_HOST);
    if (u.hostname === OLD_HOST || url.includes(OLD_HOST)) {
      return url.replaceAll(OLD_HOST, NEW_HOST);
    }
  } catch {
    // not an absolute URL — still do a literal replace if it contains the host
    if (url.includes(OLD_HOST)) return url.replaceAll(OLD_HOST, NEW_HOST);
  }
  return url;
}

function deepReplaceStrings(obj) {
  if (Array.isArray(obj)) return obj.map(deepReplaceStrings);
  if (obj && typeof obj === "object") {
    const next = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "href") {
        next[k] = replaceHostInUrl(v);
      } else {
        next[k] = deepReplaceStrings(v);
      }
    }
    return next;
  }
  if (typeof obj === "string") return obj.includes(OLD_HOST) ? obj.replaceAll(OLD_HOST, NEW_HOST) : obj;
  return obj;
}

function ptWithReplacedHrefs(pt) {
  if (!Array.isArray(pt)) return pt;
  return pt.map((block) => {
    if (!block || typeof block !== "object") return block;
    const next = { ...block };
    if (Array.isArray(block.markDefs)) {
      next.markDefs = block.markDefs.map((md) => ({ ...md, href: replaceHostInUrl(md.href) }));
    }
    return next;
  });
}

async function run() {
  console.log(`\n🔄 Scanning Sanity for '${OLD_HOST}' → '${NEW_HOST}'...`);

  const docs = await client.fetch(
    `*[_type in ["product", "post", "page"]]{
      _id, _type, title,
      actionUrl,
      body,
      shortDescription,
      description
    }`
  );

  let changed = 0;
  for (const d of docs) {
    const patch = {};

    // Simple string field
    if (typeof d.actionUrl === "string" && d.actionUrl.includes(OLD_HOST)) {
      patch.actionUrl = replaceHostInUrl(d.actionUrl);
    }

    // Rich text: replace hrefs in markDefs
    if (d.body) {
      const next = ptWithReplacedHrefs(d.body);
      if (JSON.stringify(next) !== JSON.stringify(d.body)) patch.body = next;
    }
    if (d.description) {
      const next = ptWithReplacedHrefs(d.description);
      if (JSON.stringify(next) !== JSON.stringify(d.description)) patch.description = next;
    }
    if (typeof d.shortDescription === "string" && d.shortDescription.includes(OLD_HOST)) {
      patch.shortDescription = replaceHostInUrl(d.shortDescription);
    }

    // Light generic pass over string keys at top-level
    for (const [k, v] of Object.entries(d)) {
      if (typeof v === "string" && v.includes(OLD_HOST)) {
        patch[k] = v.replaceAll(OLD_HOST, NEW_HOST);
      }
    }

    const fields = Object.keys(patch);
    if (fields.length === 0) continue;

    changed++;
    console.log(`  • ${d._type} ${d.title ? `“${d.title}”` : d._id}: ${fields.join(", ")}`);
    if (!DRY_RUN) {
      await client.patch(d._id).set(patch).commit();
    }
  }

  console.log(`\n✅  ${changed} document(s) updated${DRY_RUN ? " (dry run)" : ""}.\n`);
}

run().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
