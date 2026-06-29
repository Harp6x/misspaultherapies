import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function BlogPostCTA({ whatsappNumber }: { whatsappNumber: string }) {
  const waUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I just read one of your blog posts and I'd like to learn more about therapy sessions."
  )}`;

  return (
    <div className="from-sage/5 to-cream border-sage/20 mt-12 rounded-2xl border bg-gradient-to-br p-8 text-center">
      <h3 className="text-brown font-serif text-xl font-bold">Resonated with This Article?</h3>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
        If something in this article spoke to you, that&apos;s worth paying attention to. A
        confidential conversation could be the next step.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/book"
          className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors"
        >
          Book a Session
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-sage/30 text-sage-dark hover:bg-sage/5 inline-flex items-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
