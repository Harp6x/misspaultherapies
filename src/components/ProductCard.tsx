import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Package } from "lucide-react";
import type { SanityProduct } from "@/sanity/fetch";
import {
  PRODUCT_TYPE_LABELS,
  TOPIC_LABELS,
  getProductCta,
} from "@/lib/products";

const priceBadge: Record<string, string> = {
  free: "bg-green-100 text-green-700",
  paid: "bg-terracotta/10 text-terracotta",
  bundle: "bg-sage/15 text-sage-dark",
  "coming-soon": "bg-gray-100 text-gray-500",
};

export function ProductCard({ product }: { product: SanityProduct }) {
  const cta = getProductCta(product);
  const href = `/products/${product.slug}`;
  const isFree = product.priceType === "free";

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Cover */}
      <Link href={href} className="block relative aspect-[16/9] bg-sage/5">
        {product.coverImage?.asset?.url ? (
          <Image
            src={product.coverImage.asset.url}
            alt={product.coverImage.alt ?? product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sage/40">
            <Package className="h-10 w-10" />
          </div>
        )}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
            priceBadge[product.priceType] ?? priceBadge.paid
          }`}
        >
          {isFree ? "Free" : product.price ?? "Paid"}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-sage">
          {PRODUCT_TYPE_LABELS[product.productType] ?? product.productType}
        </span>
        <h3 className="mt-1 font-serif text-lg font-semibold text-brown">
          <Link href={href} className="hover:text-sage-dark transition-colors">
            {product.title}
          </Link>
        </h3>
        {product.format && (
          <p className="mt-1 text-xs text-muted-foreground">{product.format}</p>
        )}
        {product.shortDescription && (
          <p className="mt-2 text-sm text-brown-light line-clamp-3">
            {product.shortDescription}
          </p>
        )}

        {/* Topic tags */}
        {product.topics && product.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.topics.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-cream px-2 py-0.5 text-[11px] text-brown-light border border-border"
              >
                {TOPIC_LABELS[t] ?? t}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        {!isFree && product.price && (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-brown">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
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
            className="text-sm font-medium text-sage hover:text-sage-dark transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
