/**
 * Patches the About Page document in Sanity with text content,
 * preserving the existing photo and resume.
 *
 * Usage:
 *   SANITY_TOKEN=<your-editor-token> node scripts/patch-about.mjs
 */

import { createClient } from "@sanity/client";

const projectId = "k0r3y2my";
const dataset = "production";
const token = process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "❌  Set SANITY_TOKEN env var first.\n" +
      "   → Create an Editor token at: https://www.sanity.io/manage/project/k0r3y2my/api#tokens\n" +
      "   Then run: SANITY_TOKEN=sk... node scripts/patch-about.mjs"
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

// First check if the document exists
const existing = await client.fetch('*[_type == "aboutPage"][0]{ _id, title, photo }');
console.log("Existing aboutPage doc:", existing ? `_id=${existing._id}, has photo=${!!existing.photo}` : "NOT FOUND");

const docId = existing?._id || "aboutPage";

// Use patch to set only the text fields, preserving photo & resume
const result = await client
  .patch(docId)
  .set({
    title: "About Aishani Paul",
    bioParagraph1:
      "I'm a licensed clinical psychologist with a deep commitment to making quality mental healthcare accessible, inclusive, and culturally attuned.",
    bioParagraph2:
      "With an M.Phil in Clinical Psychology and registration with the Rehabilitation Council of India (RCI No: A118537), I bring both academic rigour and heartfelt compassion to my practice.",
    bioParagraph3:
      "I work with individuals, couples, adolescents, and families - offering all sessions online so that geography is never a barrier to getting help. Whether you're in India or living abroad, my goal is to create a safe, non-judgmental space where real change can happen.",
    credentials: [
      { _key: "c1", icon: "Award", label: "M.Phil in Clinical Psychology" },
      { _key: "c2", icon: "Award", label: "RCI Licensed Clinical Psychologist" },
      { _key: "c3", icon: "Languages", label: "English, Hindi & Bengali" },
    ],
    approachIntro:
      "I use an integrative therapeutic approach, which means I don't follow a one-size-fits-all model. Instead, I draw from multiple evidence-based modalities to create a treatment plan that's uniquely suited to you.",
    values: [
      {
        _key: "v1",
        icon: "Heart",
        title: "Compassion First",
        description:
          "Every session is built on warmth, empathy, and genuine care. You deserve to feel safe and heard.",
      },
      {
        _key: "v2",
        icon: "BookOpen",
        title: "Evidence-Based",
        description:
          "I draw from proven therapeutic modalities - CBT, DBT, EFT, psychodynamic, and mindfulness - tailored to you.",
      },
      {
        _key: "v3",
        icon: "Languages",
        title: "Culturally Sensitive",
        description:
          "Your cultural background shapes your experience. I honour that context in every conversation.",
      },
    ],
    languagesText:
      "I offer therapy in {languages}. Sessions can be conducted in any of these languages or a comfortable mix.",
    connectHeading: "Connect with Me",
    connectText:
      "Follow @mspaultherapies for mental health tips, insights, and behind-the-scenes of my practice.",
    socialLinks: [
      { _key: "s1", platform: "Instagram", url: "https://www.instagram.com/mspaultherapies", icon: "Camera" },
      { _key: "s2", platform: "YouTube", url: "https://www.youtube.com/@mspaultherapies", icon: "CirclePlay" },
      { _key: "s3", platform: "LinkedIn", url: "https://www.linkedin.com/in/mspaultherapies", icon: "Briefcase" },
    ],
  })
  .commit();

console.log(`\n✅ Patched aboutPage (${result._id}) — text fields populated, photo preserved.`);
console.log("→ Open Sanity Studio to verify: https://mspaultherapies.vercel.app/studio");
console.log("→ The website will reflect changes within 60 seconds.\n");
