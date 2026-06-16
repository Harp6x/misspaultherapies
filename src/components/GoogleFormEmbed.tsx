import { siteConfig } from "@/lib/site-config";
import { ExternalLink } from "lucide-react";

export function GoogleFormEmbed() {
  const url = siteConfig.googleFormUrl;

  if (!url || url.startsWith("[")) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-accent p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Intake form URL not yet configured. Update{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            googleFormUrl
          </code>{" "}
          in <code className="text-xs bg-muted px-1 py-0.5 rounded">site-config.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sage-dark transition-colors"
      >
        Open Intake Form
        <ExternalLink className="h-4 w-4" />
      </a>
      <p className="text-sm text-muted-foreground">
        The intake form will open in a new tab. It takes about 2–3 minutes to complete.
      </p>
    </div>
  );
}
