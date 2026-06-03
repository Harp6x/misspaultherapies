import Link from "next/link";
import { getAllBlogPosts, blogCategories } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { NewsletterSection } from "@/components/NewsletterSection";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Mental Health Blog - Therapy Tips, Anxiety, Depression & Relationships | India",
  description:
    "Expert articles on anxiety, depression, relationships, self-care, and therapy in India - by Aishani Paul, RCI-licensed clinical psychologist. Evidence-based mental health insights.",
  path: "/blog",
});

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />

        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
            Blog & Resources
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Insights on mental health, relationships, and well-being. New
            articles coming soon.
          </p>
        </div>

        {/* Category chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {blogCategories.map((cat) => (
            <span
              key={cat}
              className="inline-block rounded-full bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-dark"
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
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage">
                {post.category}
              </span>
              <h2 className="mt-3 font-serif text-lg font-semibold text-brown group-hover:text-sage-dark transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.readingTime}</span>
                <span className="text-sage font-medium">Read article &rarr;</span>
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
