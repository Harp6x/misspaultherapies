import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function BlogPostCTA() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I just read one of your blog posts and I'd like to learn more about therapy sessions."
  )}`;

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-sage/5 to-cream border border-sage/20 p-8 text-center">
      <h3 className="font-serif text-xl font-bold text-brown">
        Resonated with This Article?
      </h3>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
        If something in this article spoke to you, that&apos;s worth paying attention to.
        A confidential conversation could be the next step.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/book"
          className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
        >
          Book a Session
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-sage/30 px-6 py-2.5 text-sm font-semibold text-sage-dark hover:bg-sage/5 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
