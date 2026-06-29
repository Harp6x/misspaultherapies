import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllBlogPosts, blogCategories, getSiteConfig } from "@/lib/data";
import { buildMetadata, blogListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { NewsletterSection } from "@/components/NewsletterSection";

export const revalidate = false;

export const metadata = buildMetadata({
  title: "Mental Health Blog - Therapy Tips, Anxiety, Depression & Relationships | India",
  description:
    "Expert articles on anxiety, depression, relationships, self-care, and therapy in India - by Aishani Paul, RCI-licensed clinical psychologist. Evidence-based mental health insights.",
  path: "/blog",
});

export default async function BlogPage() {
  const config = await getSiteConfig();
  if (!config.pageVisibility.blog) notFound();

  const blogPosts = await getAllBlogPosts();
  const categories = Array.from(
    new Set([
      ...(config.options.blogCategories.length ? config.options.blogCategories : blogCategories),
      ...blogPosts.map((post) => post.category),
    ])
  );
  return (
    <>
      <SEOJsonLd data={blogListJsonLd(blogPosts)} />
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ])}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />

        <div className="text-center">
          <h1 className="text-brown font-serif text-4xl font-bold sm:text-5xl">Blog & Resources</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            Insights on mental health, relationships, and well-being.
          </p>
        </div>

        {/* Category chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-sage/10 text-sage-dark inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Posts grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-border overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {post.coverImage?.asset?.url && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.coverImage.asset.url}
                    alt={post.coverImage.alt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="bg-sage/10 text-sage inline-block rounded-full px-3 py-1 text-xs font-medium">
                  {post.category}
                </span>
                <h2 className="text-brown group-hover:text-sage-dark mt-3 font-serif text-lg font-semibold transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
                  <span>{post.readingTime}</span>
                  <span className="text-sage font-medium">Read article &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <NewsletterSection className="mt-16" />
      </div>

      <CTASection
        headline="Want Personalised Support?"
        description="Reading is a great start - but sometimes you need someone in your corner. Let's talk."
      />
    </>
  );
}
