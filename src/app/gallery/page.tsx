import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getAllGalleryItems } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
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

export const revalidate = false;

export default async function GalleryPage() {
  const config = await getSiteConfig();
  if (!config.pageVisibility.gallery) notFound();

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
          <div className="mt-12 space-y-12">
            <div className="rounded-2xl border border-beige-dark bg-white p-8 text-center max-w-3xl mx-auto shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brown">
                Therapy Insights, Reels &amp; Mental Health Education
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Aishani Paul creates evidence-based psychoeducational content breaking down complex psychological concepts into digestible, compassionate daily practices. Explore our social channels for practical tools, grounding exercises, and boundary scripts.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {config.socials.instagram && !config.socials.instagram.startsWith("[") && (
                  <a
                    href={config.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
                  >
                    Follow on Instagram
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {config.socials.youtube && !config.socials.youtube.startsWith("[") && (
                  <a
                    href={config.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-beige-dark bg-cream px-5 py-2.5 text-sm font-semibold text-brown hover:bg-beige transition-colors"
                  >
                    Subscribe on YouTube
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
              <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage mb-3">
                  Emotional Regulation
                </span>
                <h3 className="font-serif text-lg font-semibold text-brown">Somatic Grounding &amp; Nervous System Resets</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quick, clinically tested techniques to bring your body out of fight-or-flight during panic, anxiety spikes, or sensory overwhelm.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage mb-3">
                  Indian Family Dynamics
                </span>
                <h3 className="font-serif text-lg font-semibold text-brown">Boundary Scripts Without Guilt</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nuanced conversational scripts for navigating parental pressure, joint family friction, and collectivist guilt while maintaining connection.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage mb-3">
                  Relationship Clarity
                </span>
                <h3 className="font-serif text-lg font-semibold text-brown">De-escalating Couple Conflicts</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Practical breakdowns of common relationship loops (pursuer-distancer, emotional shutdown, resentment) and how to communicate unmet needs.
                </p>
              </div>
            </div>
          </div>
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
