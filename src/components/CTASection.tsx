import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  headline?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTASection({
  headline = "Ready to Take the First Step?",
  description = "Book a free 15-minute discovery call to see if we're the right fit — or go ahead and schedule your first session.",
  primaryHref = "/book",
  primaryLabel = "Book a Session",
  secondaryHref = "/faq",
  secondaryLabel = "Read FAQs First",
}: Props) {
  return (
    <section className="bg-sage py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          {headline}
        </h2>
        <p className="mt-4 text-lg text-sage-light leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-sage-dark shadow-sm hover:bg-cream transition-colors"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
