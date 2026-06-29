import Image from "next/image";
import Link from "next/link";
import { Quote, Star } from "lucide-react";

interface Props {
  quote: string;
  name: string;
  context?: string;
  rating?: number;
  anonymous?: boolean;
  photo?: { asset: { url: string }; alt?: string };
  relatedService?: { title: string; slug: string };
}

export function TestimonialCard({
  quote,
  name,
  context,
  rating,
  anonymous,
  photo,
  relatedService,
}: Props) {
  return (
    <div className="border-border rounded-2xl border bg-white p-6 shadow-sm">
      <Quote className="text-sage/40 mb-3 h-6 w-6" />
      {rating && (
        <div className="mb-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
            />
          ))}
        </div>
      )}
      <blockquote className="text-brown text-sm leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="border-border mt-4 border-t pt-3">
        <div className="flex items-center gap-3">
          {!anonymous && photo?.asset?.url && (
            <Image
              src={photo.asset.url}
              alt={photo.alt ?? name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          )}
          <p className="text-brown text-sm font-medium">{anonymous ? "Anonymous client" : name}</p>
        </div>
        {context && <p className="text-muted-foreground text-xs">{context}</p>}
        {relatedService && (
          <Link
            href={`/services/${relatedService.slug}`}
            className="text-sage hover:text-sage-dark mt-2 inline-block text-xs font-medium"
          >
            {relatedService.title}
          </Link>
        )}
      </div>
    </div>
  );
}
