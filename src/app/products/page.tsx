import { notFound } from "next/navigation";
import { getAllProducts } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ProductFilters } from "@/components/ProductFilters";

export const metadata = buildMetadata({
  title: "Products - Courses, Toolkits & Free Resources",
  description:
    "Browse digital mental health products by Aishani Paul - self-paced courses, mini-courses, ebooks, toolkits, and free resources for anxiety, relationships, self-worth and more.",
  path: "/products",
});

export const revalidate = 60;

export default async function ProductsPage() {
  const config = await getSiteConfig();
  if (!config.pageVisibility.products) notFound();

  const products = await getAllProducts();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Products", href: "/products" }]} />

        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown">
            Products &amp; Resources
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Self-paced courses, toolkits, and free resources to support your
            mental health - filter by type, topic, who it&apos;s for, and price.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            Products are coming soon. Follow @mspaultherapies to be the first to
            know!
          </p>
        ) : (
          <ProductFilters products={products} />
        )}
      </div>

      <CTASection />
    </>
  );
}
