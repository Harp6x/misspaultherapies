import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, IndianRupee, ArrowRight } from "lucide-react";
import { getAllWorkshops } from "@/sanity/fetch";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";

export const metadata = buildMetadata({
  title: "Mental Health Workshops & Group Sessions — Ms Paul Therapies India",
  description:
    "Join upcoming mental health workshops and group therapy sessions by Aishani Paul — learn coping skills, explore wellness topics, and connect with others. Online across India.",
  path: "/workshops",
});

export const revalidate = 60;

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  open: "bg-green-100 text-green-700",
  "sold-out": "bg-red-100 text-red-700",
  completed: "bg-gray-100 text-gray-500",
};

export default async function WorkshopsPage() {
  const workshops = await getAllWorkshops();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: "Workshops", href: "/workshops" }]} />

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brown text-center">
          Workshops &amp; Events
        </h1>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Group sessions and workshops on mental health, coping skills, and personal growth. Join live or watch the recording.
        </p>

        {workshops.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              No upcoming workshops at the moment. Follow us on Instagram to get notified!
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((w) => (
              <div
                key={w.slug}
                className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {w.coverImage?.asset?.url && (
                  <Image
                    src={w.coverImage.asset.url}
                    alt={w.coverImage.alt ?? w.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`self-start rounded-full px-3 py-1 text-xs font-medium ${statusColors[w.status] ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {w.status.replace("-", " ")}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-brown">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {w.description}
                  </p>
                  <div className="mt-4 space-y-1 text-sm text-brown-light">
                    {w.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-sage" />
                        {new Date(w.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    {w.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-sage" />
                        {w.duration}
                      </div>
                    )}
                    {w.fee && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-sage" />
                        {w.fee}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4">
                    {w.registrationUrl && w.status !== "completed" && w.status !== "sold-out" ? (
                      <a
                        href={w.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark transition-colors"
                      >
                        Register Now <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={`/workshops/${w.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
                      >
                        View Details <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CTASection />
    </>
  );
}
