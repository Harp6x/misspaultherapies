"use client";

/**
 * Renders YouTube or Instagram embeds from a URL.
 */

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
  );
  return match?.[1] ?? null;
}

function getInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/);
  return match?.[1] ?? null;
}

export function YouTubeEmbed({ url }: { url: string }) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

export function InstagramEmbed({ url }: { url: string }) {
  const id = getInstagramId(url);
  if (!id) return null;
  return (
    <div className="flex justify-center">
      <iframe
        src={`https://www.instagram.com/p/${id}/embed`}
        title="Instagram post"
        allowFullScreen
        className="rounded-xl border border-border shadow-md"
        width={400}
        height={500}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

export function MediaEmbed({
  type,
  url,
}: {
  type: "instagram-reel" | "instagram-post" | "youtube-video" | "image";
  url: string;
}) {
  if (type === "youtube-video") return <YouTubeEmbed url={url} />;
  if (type === "instagram-reel" || type === "instagram-post")
    return <InstagramEmbed url={url} />;
  return null;
}
