import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogSlugs, getBlogPostBySlug, getSiteConfig } from "@/lib/data";
import { blogPostingJsonLd, buildArticleMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";
import { BlogPostCTA } from "@/components/BlogPostCTA";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PortableTextBody } from "@/components/PortableTextBody";
import { MediaEmbed } from "@/components/MediaEmbed";

export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildArticleMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.description,
    slug: post.slug,
    datePublished: post.datePublished,
    category: post.category,
    image: post.seo?.ogImageUrl ?? post.coverImage?.asset?.url,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const config = await getSiteConfig();
  if (!config.pageVisibility.blog) notFound();

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SEOJsonLd data={blogPostingJsonLd(post)} />
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <Link
          href="/blog"
          className="text-sage hover:text-sage-dark mb-6 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header>
          <span className="bg-sage/10 text-sage inline-block rounded-full px-3 py-1 text-xs font-medium">
            {post.category}
          </span>
          <h1 className="text-brown mt-4 font-serif text-3xl font-bold sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{post.description}</p>
          <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.datePublished).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {post.coverImage?.asset?.url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.coverImage.asset.url}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Content */}
        {post.body ? (
          Array.isArray(post.body) ? (
            <div className="mt-12">
              <PortableTextBody value={post.body} />
            </div>
          ) : (
            <div
              className="prose prose-brown [&_h2]:text-brown [&_h3]:text-brown [&_p]:text-brown-light [&_li]:text-brown-light [&_strong]:text-brown [&_em]:text-brown-light [&_blockquote]:border-sage [&_blockquote]:text-muted-foreground mt-12 max-w-none [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_li]:text-sm [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.body as string }}
            />
          )
        ) : (
          <div className="border-border bg-cream mt-12 rounded-2xl border-2 border-dashed p-12 text-center">
            <p className="text-muted-foreground">
              This article is coming soon. Check back later for the full content.
            </p>
          </div>
        )}

        {(post.youtubeUrl || post.instagramUrl) && (
          <div className="mt-10 space-y-8">
            {post.youtubeUrl && <MediaEmbed type="youtube-video" url={post.youtubeUrl} />}
            {post.instagramUrl && <MediaEmbed type="instagram-post" url={post.instagramUrl} />}
          </div>
        )}

        {/* Inline CTA after reading */}
        <BlogPostCTA whatsappNumber={config.whatsappNumber} />

        {/* Newsletter signup */}
        <NewsletterSection className="mt-12" />
      </article>

      <CTASection />
    </>
  );
}
