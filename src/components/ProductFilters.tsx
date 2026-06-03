"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { SanityProduct } from "@/sanity/fetch";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCT_TYPE_LABELS,
  TOPIC_LABELS,
  AUDIENCE_LABELS,
  PRICE_TYPE_LABELS,
} from "@/lib/products";

type Filters = {
  type: string | null;
  price: string | null;
  topics: string[];
  audience: string[];
  q: string;
};

const EMPTY: Filters = { type: null, price: null, topics: [], audience: [], q: "" };

function presentValues(products: SanityProduct[], key: "topics" | "audience") {
  const set = new Set<string>();
  products.forEach((p) => (p[key] ?? []).forEach((v) => set.add(v)));
  return set;
}

export function ProductFilters({ products }: { products: SanityProduct[] }) {
  const [f, setF] = useState<Filters>(EMPTY);

  const types = useMemo(
    () => Array.from(new Set(products.map((p) => p.productType))),
    [products]
  );
  const prices = useMemo(
    () => Array.from(new Set(products.map((p) => p.priceType))),
    [products]
  );
  const topics = useMemo(() => presentValues(products, "topics"), [products]);
  const audiences = useMemo(() => presentValues(products, "audience"), [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (f.type && p.productType !== f.type) return false;
      if (f.price && p.priceType !== f.price) return false;
      if (f.topics.length && !f.topics.every((t) => p.topics?.includes(t)))
        return false;
      if (f.audience.length && !f.audience.every((a) => p.audience?.includes(a)))
        return false;
      if (f.q) {
        const hay = `${p.title} ${p.shortDescription ?? ""}`.toLowerCase();
        if (!hay.includes(f.q.toLowerCase())) return false;
      }
      return true;
    });
  }, [products, f]);

  const toggle = (key: "topics" | "audience", v: string) =>
    setF((s) => ({
      ...s,
      [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v],
    }));

  const active =
    f.type || f.price || f.topics.length || f.audience.length || f.q;

  const Pill = ({
    on,
    onClick,
    children,
  }: {
    on: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
        on
          ? "bg-sage text-white border-sage"
          : "bg-white text-brown-light border-border hover:border-sage"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filter sidebar */}
      <aside className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={f.q}
            onChange={(e) => setF((s) => ({ ...s, q: e.target.value }))}
            placeholder="Search products"
            className="w-full rounded-full border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-sage focus:outline-none"
          />
        </div>

        <FilterGroup title="Type">
          {types.map((t) => (
            <Pill
              key={t}
              on={f.type === t}
              onClick={() => setF((s) => ({ ...s, type: s.type === t ? null : t }))}
            >
              {PRODUCT_TYPE_LABELS[t] ?? t}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup title="Price">
          {prices.map((p) => (
            <Pill
              key={p}
              on={f.price === p}
              onClick={() => setF((s) => ({ ...s, price: s.price === p ? null : p }))}
            >
              {PRICE_TYPE_LABELS[p] ?? p}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup title="Topic / Issue">
          {Array.from(topics).map((t) => (
            <Pill key={t} on={f.topics.includes(t)} onClick={() => toggle("topics", t)}>
              {TOPIC_LABELS[t] ?? t}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup title="For Whom">
          {Array.from(audiences).map((a) => (
            <Pill
              key={a}
              on={f.audience.includes(a)}
              onClick={() => toggle("audience", a)}
            >
              {AUDIENCE_LABELS[a] ?? a}
            </Pill>
          ))}
        </FilterGroup>
      </aside>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => setF(EMPTY)}
              className="inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:text-terracotta-dark"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            No products match these filters. Try clearing some.
          </p>
        ) : (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-serif text-sm font-semibold text-brown mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
