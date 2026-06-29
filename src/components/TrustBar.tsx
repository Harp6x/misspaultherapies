import { Shield, Video, Globe, Clock, Star } from "lucide-react";

export function TrustBar({ rciNumber }: { rciNumber: string }) {
  const badges = [
    { icon: Shield, label: "RCI Licensed", detail: `Reg. ${rciNumber}` },
    { icon: Star, label: "M.Phil Clinical Psychology", detail: "Qualified" },
    { icon: Video, label: "100% Online", detail: "From anywhere" },
    { icon: Globe, label: "India & Abroad", detail: "NRI friendly" },
    { icon: Clock, label: "Flexible Hours", detail: "Evenings & weekends" },
  ];
  return (
    <section className="bg-brown border-brown/10 border-y py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-center">
              <b.icon className="text-sage-light h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">{b.label}</p>
                <p className="text-xs text-white/60">{b.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
