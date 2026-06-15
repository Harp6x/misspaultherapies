import type { StructureBuilder, StructureResolver } from "sanity/structure";

/**
 * Custom Studio desk structure for Ms Paul Therapies.
 *
 * Content types with a `published` field get Published / Drafts / All sub-folders.
 * Testimonials use `approved` instead of `published`.
 */

function publishedDraftItem(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  field = "published",
) {
  return S.listItem()
    .title(title)
    .schemaType(schemaType)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .title(field === "approved" ? "Approved" : "Published")
            .schemaType(schemaType)
            .child(
              S.documentList()
                .title(`${title} — ${field === "approved" ? "Approved" : "Published"}`)
                .schemaType(schemaType)
                .filter(`_type == "${schemaType}" && ${field} != false`),
            ),
          S.listItem()
            .title(field === "approved" ? "Pending" : "Drafts")
            .schemaType(schemaType)
            .child(
              S.documentList()
                .title(`${title} — ${field === "approved" ? "Pending" : "Drafts"}`)
                .schemaType(schemaType)
                .filter(`_type == "${schemaType}" && ${field} == false`),
            ),
          S.divider(),
          S.listItem()
            .title("All")
            .schemaType(schemaType)
            .child(S.documentTypeList(schemaType).title(`${title} — All`)),
        ]),
    );
}

const HANDLED_TYPES = [
  "siteConfig",
  "aboutPage",
  "service",
  "blogPost",
  "faq",
  "resource",
  "testimonial",
  "location",
  "galleryItem",
  "workshop",
  "leadCapture",
  "product",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Ms Paul Therapies")
    .items([
      // ─── Site ───
      S.listItem()
        .title("Site Configuration")
        .id("siteConfig")
        .child(
          S.document().schemaType("siteConfig").documentId("siteConfig").title("Site Configuration"),
        ),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(
          S.document().schemaType("aboutPage").documentId("aboutPage").title("About Page"),
        ),

      S.divider(),

      // ─── Core Content ───
      publishedDraftItem(S, "Services", "service"),
      publishedDraftItem(S, "Blog Posts", "blogPost"),
      publishedDraftItem(S, "FAQs", "faq"),
      S.documentTypeListItem("resource").title("Resources"),
      publishedDraftItem(S, "Testimonials", "testimonial", "approved"),
      S.documentTypeListItem("location").title("Location Pages"),

      S.divider(),

      // ─── Extra Content ───
      S.documentTypeListItem("galleryItem").title("Gallery / Media"),
      publishedDraftItem(S, "Workshops", "workshop"),
      publishedDraftItem(S, "Products", "product"),

      S.divider(),

      // ─── Data ───
      S.documentTypeListItem("leadCapture").title("Lead Captures"),

      // Future document types
      ...S.documentTypeListItems().filter(
        (item) => !HANDLED_TYPES.includes(item.getId() ?? ""),
      ),
    ]);
