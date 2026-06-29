import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getBlogSlugs, getBlogPostBySlug, getSiteConfig } from "@/lib/data";
import { blogPostingJsonLd, buildArticleMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { CTASection } from "@/components/CTASection";
import { BlogPostCTA } from "@/components/BlogPostCTA";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PortableTextBody } from "@/components/PortableTextBody";

export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildArticleMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.description,
    slug: post.slug,
    datePublished: post.datePublished,
    category: post.category,
    image: post.seo?.ogImage?.asset?.url,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const config = await getSiteConfig();
  if (!config.pageVisibility.blog) notFound();

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SEOJsonLd data={blogPostingJsonLd(post)} />
      <SEOJsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }])} />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-sage hover:text-sage-dark transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header>
          <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage">
            {post.category}
          </span>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-brown">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
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

        {/* Content */}
        {post.body ? (
          Array.isArray(post.body) ? (
            <div className="mt-12">
              <PortableTextBody value={post.body} />
            </div>
          ) : (
            <div
              className="mt-12 prose prose-brown max-w-none
                [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-brown [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brown [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:text-brown-light [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-brown-light [&_li]:text-sm
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4
                [&_strong]:text-brown [&_em]:text-brown-light
                [&_blockquote]:border-l-4 [&_blockquote]:border-sage [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6"
              dangerouslySetInnerHTML={{ __html: post.body as string }}
            />
          )
        ) : (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-border bg-cream p-12 text-center">
            <p className="text-muted-foreground">
              This article is coming soon. Check back later for the full content.
            </p>
          </div>
        )}

        {/* Inline CTA after reading */}
        <BlogPostCTA />

        {/* Newsletter signup */}
        <NewsletterSection className="mt-12" />
      </article>

      <CTASection />
    </>
  );
}
