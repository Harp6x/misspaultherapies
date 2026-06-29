import { ExternalLink } from "lucide-react";

export function GoogleFormEmbed({ url }: { url: string }) {
  if (!url || url.startsWith("[")) {
    return (
      <div className="border-border bg-accent rounded-2xl border-2 border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Intake form URL not yet configured. Update{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">googleFormUrl</code> in Sanity
          Studio → Site Configuration.
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
        className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
      >
        Open Intake Form
        <ExternalLink className="h-4 w-4" />
      </a>
      <p className="text-muted-foreground text-sm">
        The intake form will open in a new tab. It takes about 2–3 minutes to complete.
      </p>
    </div>
  );
}
