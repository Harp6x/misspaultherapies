import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Service } from "@/content/services";

interface Props {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: Props) {
  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? LucideIcons.Sparkles;

  const imageUrl = (service as { imageUrl?: string }).imageUrl;
  const imageAlt = (service as { imageAlt?: string }).imageAlt ?? service.title;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group border-border hover:border-sage/40 block overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Card image — shown when uploaded in Sanity */}
      {imageUrl && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="from-brown/40 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className={imageUrl ? "" : "flex items-start gap-4"}>
          {!imageUrl && (
            <div className="bg-sage/10 text-sage group-hover:bg-sage flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white">
              <IconComponent className="h-6 w-6" />
            </div>
          )}
          <div className="min-w-0">
            {imageUrl && (
              <div className="bg-sage/10 text-sage group-hover:bg-sage mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <h3 className="text-brown group-hover:text-sage-dark font-serif text-lg font-semibold transition-colors">
              {service.shortTitle || service.title}
            </h3>
            {!compact && (
              <p className="text-muted-foreground mt-1 line-clamp-3 text-sm leading-relaxed">
                {service.description}
              </p>
            )}
            <p className="text-brown mt-2 text-sm font-medium">{service.fee}</p>
            <span className="text-sage group-hover:text-sage-dark mt-2 inline-flex items-center gap-1 text-sm font-medium transition-colors">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
