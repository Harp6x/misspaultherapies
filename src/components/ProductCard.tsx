import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { SanityProduct } from "@/sanity/fetch";
import { PRODUCT_TYPE_LABELS, TOPIC_LABELS, getProductCta, getProductImage } from "@/lib/products";

const priceBadge: Record<string, string> = {
  free: "bg-green-100 text-green-700",
  paid: "bg-terracotta/10 text-terracotta",
  bundle: "bg-sage/15 text-sage-dark",
  "coming-soon": "bg-gray-100 text-gray-500",
};

export function ProductCard({
  product,
  whatsappNumber,
}: {
  product: SanityProduct;
  whatsappNumber: string;
}) {
  const cta = getProductCta(product, whatsappNumber);
  const href = `/products/${product.slug}`;
  const isFree = product.priceType === "free";
  const image = getProductImage(product);
  return (
    <div className="border-border flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Cover */}
      <Link href={href} className="bg-sage/5 relative block aspect-[16/9]">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
            priceBadge[product.priceType] ?? priceBadge.paid
          }`}
        >
          {isFree ? "Free" : (product.price ?? "Paid")}
        </span>
        {product.featured && (
          <span className="bg-brown absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-sage text-xs font-medium tracking-wide uppercase">
          {PRODUCT_TYPE_LABELS[product.productType] ?? product.productType}
        </span>
        <h3 className="text-brown mt-1 font-serif text-lg font-semibold">
          <Link href={href} className="hover:text-sage-dark transition-colors">
            {product.title}
          </Link>
        </h3>
        {product.format && <p className="text-muted-foreground mt-1 text-xs">{product.format}</p>}
        {product.shortDescription && (
          <p className="text-brown-light mt-2 line-clamp-3 text-sm">{product.shortDescription}</p>
        )}

        {/* Topic tags */}
        {product.topics && product.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="bg-cream text-brown-light border-border rounded-full border px-2 py-0.5 text-[11px]"
              >
                {TOPIC_LABELS[t] ?? t}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        {!isFree && product.price && (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-brown font-serif text-xl font-bold">{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="bg-sage hover:bg-sage-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            {cta.label}
            {cta.external ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </a>
          <Link
            href={href}
            className="text-sage hover:text-sage-dark text-sm font-medium transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
