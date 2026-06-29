import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getAllProductSlugs, getProductBySlug } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  PRODUCT_TYPE_LABELS,
  TOPIC_LABELS,
  AUDIENCE_LABELS,
  getProductCta,
  getProductImage,
} from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { PortableTextBody } from "@/components/PortableTextBody";
import { CTASection } from "@/components/CTASection";

export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seo?.metaTitle || product.title,
    description:
      product.seo?.metaDescription ??
      product.shortDescription ??
      `${product.title} - a digital mental health product by Aishani Paul.`,
    path: `/products/${product.slug}`,
    ogImage: product.seo?.ogImageUrl ?? getProductImage(product).url,
    noIndex: product.seo?.noIndex,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const config = await getSiteConfig();
  if (!config.pageVisibility.products) notFound();

  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cta = getProductCta(product, config.whatsappNumber);
  const isFree = product.priceType === "free";
  const image = getProductImage(product);
  return (
    <>
      <SEOJsonLd
        data={productJsonLd({
          title: product.title,
          description: product.shortDescription,
          slug: product.slug,
          price: product.price,
          priceType: product.priceType,
          image: image.url,
        })}
      />
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.title, href: `/products/${product.slug}` },
        ])}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Products", href: "/products" },
            { name: product.title, href: `/products/${product.slug}` },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Cover */}
          <div className="border-border bg-sage/5 relative aspect-[4/3] overflow-hidden rounded-2xl border">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <span className="text-sage text-xs font-medium tracking-wide uppercase">
              {PRODUCT_TYPE_LABELS[product.productType] ?? product.productType}
            </span>
            <h1 className="text-brown mt-1 font-serif text-3xl font-bold sm:text-4xl">
              {product.title}
            </h1>
            {product.format && (
              <p className="text-muted-foreground mt-2 text-sm">{product.format}</p>
            )}
            {product.shortDescription && (
              <p className="text-brown-light mt-4 leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-brown font-serif text-3xl font-bold">
                {isFree ? "Free" : (product.price ?? "Enquire")}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-lg line-through">
                  {product.originalPrice}
                </span>
              )}
              {product.priceUSD && !isFree && (
                <span className="text-muted-foreground text-sm">({product.priceUSD})</span>
              )}
            </div>

            {/* CTA */}
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className="bg-sage hover:bg-sage-dark mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              {cta.label}
              {cta.external ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </a>

            {/* Tags */}
            {(product.topics?.length || product.audience?.length) && (
              <div className="mt-6 space-y-3">
                {product.topics && product.topics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-brown text-xs font-semibold">Topics:</span>
                    {product.topics.map((t) => (
                      <span
                        key={t}
                        className="bg-cream text-brown-light border-border rounded-full border px-2.5 py-0.5 text-xs"
                      >
                        {TOPIC_LABELS[t] ?? t}
                      </span>
                    ))}
                  </div>
                )}
                {product.audience && product.audience.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-brown text-xs font-semibold">For:</span>
                    {product.audience.map((a) => (
                      <span
                        key={a}
                        className="bg-cream text-brown-light border-border rounded-full border px-2.5 py-0.5 text-xs"
                      >
                        {AUDIENCE_LABELS[a] ?? a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* What you get */}
        {product.highlights && product.highlights.length > 0 && (
          <section className="border-border bg-cream mt-12 rounded-2xl border p-6">
            <h2 className="text-brown mb-4 font-serif text-xl font-semibold">What You Get</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="text-brown-light flex items-start gap-2 text-sm">
                  <Check className="text-sage mt-0.5 h-4 w-4 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Full description */}
        {product.body && (
          <section className="mt-12 max-w-3xl">
            <PortableTextBody value={product.body} />
          </section>
        )}

        <div className="mt-12">
          <Link
            href="/products"
            className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All Products
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
}
