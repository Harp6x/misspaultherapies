import { Quote } from "lucide-react";

interface Props {
  quote: string;
  name: string;
  context?: string;
}

export function TestimonialCard({ quote, name, context }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <Quote className="h-6 w-6 text-sage/40 mb-3" />
      <blockquote className="text-sm text-brown leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-medium text-brown">{name}</p>
        {context && (
          <p className="text-xs text-muted-foreground">{context}</p>
        )}
      </div>
    </div>
  );
}
