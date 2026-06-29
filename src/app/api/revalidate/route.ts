import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const DOCUMENT_TYPE_TO_TAGS: Record<string, string[]> = {
  siteConfig: ["siteConfig"],
  aboutPage: ["aboutPage"],
  service: ["service"],
  blogPost: ["blogPost"],
  faq: ["faq"],
  resource: ["resource"],
  testimonial: ["testimonial"],
  location: ["location"],
  galleryItem: ["galleryItem"],
  workshop: ["workshop"],
  product: ["product"],
};

const DOCUMENT_TYPE_TO_PATHS: Record<string, string[]> = {
  siteConfig: ["/"],
  aboutPage: ["/about"],
  service: ["/", "/services", "/sitemap.xml"],
  blogPost: ["/", "/blog", "/sitemap.xml"],
  faq: ["/faq"],
  resource: ["/resources"],
  testimonial: ["/"],
  location: ["/sitemap.xml"],
  galleryItem: ["/", "/gallery"],
  workshop: ["/workshops"],
  product: ["/products", "/sitemap.xml"],
};

const DOCUMENT_TYPE_TO_SLUG_PATH: Record<string, string> = {
  service: "/services",
  blogPost: "/blog",
  location: "/locations",
  product: "/products",
};

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;
  const providedSecret =
    request.headers.get("x-sanity-revalidate-secret") ?? request.nextUrl.searchParams.get("secret");

  if (!configuredSecret) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 503 });
  }

  if (providedSecret !== configuredSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const documentType = body._type;
  if (!documentType) {
    return NextResponse.json({ message: "Missing _type in body" }, { status: 400 });
  }

  const tags = DOCUMENT_TYPE_TO_TAGS[documentType] ?? [];
  const paths = DOCUMENT_TYPE_TO_PATHS[documentType] ?? [];

  if (tags.length === 0 && paths.length === 0) {
    return NextResponse.json({
      revalidated: false,
      ignored: true,
      type: documentType,
      reason: "Document type does not affect the public site",
    });
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const path of paths) {
    if (documentType === "siteConfig" && path === "/") {
      revalidatePath(path, "layout");
    } else {
      revalidatePath(path);
    }
  }

  const slug = body.slug?.current;
  const slugPrefix = DOCUMENT_TYPE_TO_SLUG_PATH[documentType];
  if (slug && slugPrefix) {
    revalidatePath(`${slugPrefix}/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    type: documentType,
    slug: slug ?? null,
    tags,
    paths,
  });
}
