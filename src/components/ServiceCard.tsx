import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: Props) {
  // Dynamically resolve the Lucide icon
  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? LucideIcons.Sparkles;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-sage/40 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage group-hover:bg-sage group-hover:text-white transition-colors">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-semibold text-brown group-hover:text-sage-dark transition-colors">
            {service.title}
          </h3>
          {!compact && (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {service.description}
            </p>
          )}
          <p className="mt-2 text-sm font-medium text-brown">
            {service.fee}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sage group-hover:text-sage-dark transition-colors">
            Learn more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
