import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Painting, Wallpaper & Wall Finish Services in NYC",
  description:
    "Explore NYC painting, wallpaper installation, decorative wall finishes, cabinet refinishing, repairs, and property turnover programs. Request a detailed estimate.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Our services"
        title="Painting and wall finishes for every NYC space"
        subtitle="Interior and exterior painting, wallpaper, decorative finishes, repairs, cabinetry, and repeatable turnover scopes — planned around the surface and the building."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const I = Icon[s.icon];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card p-8 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all"
              >
                <div className="flex items-start gap-5">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[var(--color-ink)] text-white group-hover:bg-[var(--color-green)] transition-colors shrink-0">
                    <I className="w-7 h-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl">{s.name}</h2>
                    <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                      {s.intro}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-[var(--color-green-600)]">
                      Learn more{" "}
                      <Icon.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <CTASection />
      <div className="h-20" />
    </>
  );
}
