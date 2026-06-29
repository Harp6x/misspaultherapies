import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, IndianRupee, ArrowRight } from "lucide-react";
import { getAllWorkshops } from "@/sanity/fetch";
import { getSiteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";

export const metadata = buildMetadata({
  title: "Mental Health Workshops & Group Sessions India",
  description:
    "Join upcoming mental health workshops and group therapy sessions by Aishani Paul - learn coping skills, explore wellness topics, and connect with others. Online across India.",
  path: "/workshops",
});

export const revalidate = false;

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  open: "bg-green-100 text-green-700",
  "sold-out": "bg-red-100 text-red-700",
  completed: "bg-gray-100 text-gray-500",
};

export default async function WorkshopsPage() {
  const config = await getSiteConfig();
  if (!config.pageVisibility.workshops) notFound();

  const workshops = await getAllWorkshops();
  const statusOrder = config.options.workshopStatuses.map((status) =>
    status.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );
  const orderedWorkshops = [...workshops].sort((a, b) => {
    const aIndex = statusOrder.indexOf(a.status);
    const bIndex = statusOrder.indexOf(b.status);
    return (
      (aIndex < 0 ? Number.MAX_SAFE_INTEGER : aIndex) -
      (bIndex < 0 ? Number.MAX_SAFE_INTEGER : bIndex)
    );
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Workshops", href: "/workshops" }]} />

        <h1 className="text-brown text-center font-serif text-4xl font-bold sm:text-5xl">
          Workshops &amp; Events
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center">
          Group sessions and workshops on mental health, coping skills, and personal growth. Join
          live or watch the recording.
        </p>

        {workshops.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              No upcoming workshops at the moment. Follow us on Instagram to get notified!
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {orderedWorkshops.map((w) => (
              <div
                key={w.slug}
                className="border-border flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {w.coverImage?.asset?.url && (
                  <Image
                    src={w.coverImage.asset.url}
                    alt={w.coverImage.alt ?? w.title}
                    width={600}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className={`self-start rounded-full px-3 py-1 text-xs font-medium ${statusColors[w.status] ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {w.status.replace("-", " ")}
                  </span>
                  <h3 className="text-brown mt-3 font-serif text-lg font-semibold">{w.title}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{w.description}</p>
                  <div className="text-brown-light mt-4 space-y-1 text-sm">
                    {w.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="text-sage h-4 w-4" />
                        {new Date(w.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    {w.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="text-sage h-4 w-4" />
                        {w.duration}
                      </div>
                    )}
                    {w.fee && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="text-sage h-4 w-4" />
                        {w.fee}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href={`/workshops/${w.slug}`}
                      className="text-sage hover:text-sage-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                    {w.registrationUrl && w.status !== "completed" && w.status !== "sold-out" && (
                      <a
                        href={w.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sage hover:bg-sage-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                      >
                        Register Now <ArrowRight className="h-4 w-4" />
                      </a>
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
