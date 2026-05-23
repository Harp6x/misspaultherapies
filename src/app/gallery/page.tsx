import Image from "next/image";
import { getAllGalleryItems } from "@/sanity/fetch";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { MediaEmbed } from "@/components/MediaEmbed";

export const metadata = buildMetadata({
  title: "Mental Health Videos & Reels - Therapy Tips & Insights",
  description:
    "Watch Instagram reels, YouTube videos, and mental health content from Ms Paul Therapies - practical therapy tips, coping strategies, and wellness conversations by Aishani Paul.",
  path: "/gallery",
});

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Gallery", href: "/gallery" }]} />

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown text-center">
          Gallery &amp; Media
        </h1>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Reels, videos, and moments - follow along for mental health tips, insights, and conversations.
        </p>

        {items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            Coming soon - check back for reels, videos, and more!
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {item.type === "image" && item.image?.asset?.url ? (
                  <Image
                    src={item.image.asset.url}
                    alt={item.image.alt ?? item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                ) : item.url ? (
                  <div className="p-4">
                    <MediaEmbed type={item.type} url={item.url} />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-brown">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                  <span className="mt-2 inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage">
                    {item.type.replace("-", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CTASection />
    </>
  );
}
