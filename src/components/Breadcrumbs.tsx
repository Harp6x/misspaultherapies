import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SEOJsonLd } from "./SEOJsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: Props) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <SEOJsonLd data={breadcrumbJsonLd(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {i === allItems.length - 1 ? (
                <span className="font-medium text-brown" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-sage-dark transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
