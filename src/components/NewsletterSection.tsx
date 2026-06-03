import { getSiteConfig } from "@/lib/data";
import { NewsletterEmbed } from "@/components/NewsletterEmbed";

/**
 * Server wrapper for the inline newsletter form.
 * Reads the Kit config from Sanity Site Configuration and only renders the
 * in-page form when the form type is "inline". For "modal" / "slide-in" /
 * "sticky-bar" the form is loaded once globally (see GlobalKitEmbed in the
 * root layout), so nothing is rendered here. "off" hides it everywhere.
 */
export async function NewsletterSection({
  className = "",
}: {
  className?: string;
}) {
  const config = await getSiteConfig();
  const { formType, uid, scriptUrl } = config.newsletter;

  if (formType !== "inline" || !uid || !scriptUrl) return null;

  return <NewsletterEmbed uid={uid} src={scriptUrl} className={className} />;
}
