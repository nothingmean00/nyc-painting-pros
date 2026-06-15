import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { areas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Serve — Painters Across All Five NYC Boroughs",
  description:
    "NYC Painting Pros serves Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Find your neighborhood and book a free estimate today.",
  alternates: { canonical: "/areas" },
};

export default function AreasIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas" },
        ])}
      />
      <PageHero
        eyebrow="Coverage"
        title="Painting all five boroughs of NYC"
        subtitle="Local, background-checked crews who know your buildings and boards — from Tribeca high-rises to Staten Island family homes."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas" },
        ]}
      />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/areas/${a.slug}`}
              className="card p-8 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-2 text-[var(--color-green-600)]">
                <Icon.pin className="w-6 h-6" />
                <h2 className="font-display text-2xl text-[var(--color-ink)]">
                  {a.name}
                </h2>
              </div>
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
                {a.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.neighborhoods.slice(0, 6).map((n) => (
                  <span
                    key={n}
                    className="text-xs rounded-full bg-[var(--color-cream)] border border-[var(--color-line)] px-2.5 py-1 text-[var(--color-muted)]"
                  >
                    {n}
                  </span>
                ))}
                <span className="text-xs px-2.5 py-1 text-[var(--color-green-600)] font-semibold">
                  + more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
      <div className="h-20" />
    </>
  );
}
