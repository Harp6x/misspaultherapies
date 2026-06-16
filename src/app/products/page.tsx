import { notFound } from "next/navigation";
import { getAllProducts } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { siteConfig } from "@/lib/site-config";
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

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mental Health Products & Resources",
    description: "Digital mental health products by Ms Paul Therapies.",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/products/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <SEOJsonLd data={productsJsonLd} />
      <SEOJsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Products", href: "/products" }])} />
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
