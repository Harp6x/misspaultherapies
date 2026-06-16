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

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.title,
    description:
      product.shortDescription ??
      `${product.title} - a digital mental health product by Aishani Paul.`,
    path: `/products/${product.slug}`,
    ogImage: getProductImage(product).url,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const config = await getSiteConfig();
  if (!config.pageVisibility.products) notFound();

  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cta = getProductCta(product);
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

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Products", href: "/products" },
            { name: product.title, href: `/products/${product.slug}` },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Cover */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-sage/5">
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
            <span className="text-xs font-medium uppercase tracking-wide text-sage">
              {PRODUCT_TYPE_LABELS[product.productType] ?? product.productType}
            </span>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-brown">
              {product.title}
            </h1>
            {product.format && (
              <p className="mt-2 text-sm text-muted-foreground">{product.format}</p>
            )}
            {product.shortDescription && (
              <p className="mt-4 text-brown-light leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-brown">
                {isFree ? "Free" : product.price ?? "Enquire"}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
              {product.priceUSD && !isFree && (
                <span className="text-sm text-muted-foreground">
                  ({product.priceUSD})
                </span>
              )}
            </div>

            {/* CTA */}
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
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
                    <span className="text-xs font-semibold text-brown">Topics:</span>
                    {product.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-brown-light border border-border"
                      >
                        {TOPIC_LABELS[t] ?? t}
                      </span>
                    ))}
                  </div>
                )}
                {product.audience && product.audience.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-brown">For:</span>
                    {product.audience.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-brown-light border border-border"
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
          <section className="mt-12 rounded-2xl border border-border bg-cream p-6">
            <h2 className="font-serif text-xl font-semibold text-brown mb-4">
              What You Get
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-brown-light"
                >
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-sage" />
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All Products
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
}
