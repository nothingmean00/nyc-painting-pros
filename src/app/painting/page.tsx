import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { moneyPages } from "@/lib/money-pages";

export const metadata: Metadata = {
  title: "NYC Painting Services & Costs | Find Your Project",
  description:
    "Browse NYC painting services by project type and location — apartment, brownstone, co-op, cabinet, commercial, office, retail and more. Costs, details, and free estimates.",
  alternates: { canonical: "/painting" },
};

const groups = [
  {
    title: "Homes & apartments",
    slugs: [
      "apartment-painting-nyc",
      "interior-painting-manhattan",
      "interior-painting-brooklyn",
      "pre-war-apartment-painting-nyc",
      "co-op-condo-painting-nyc",
      "single-room-accent-wall-painting-nyc",
    ],
  },
  {
    title: "Specialty & finishing",
    slugs: [
      "kitchen-cabinet-painting-nyc",
      "cabinet-refinishing-cost-nyc",
      "skim-coating-nyc",
      "drywall-repair-nyc",
      "brownstone-painting-brooklyn",
      "exterior-painting-nyc",
      "new-construction-painting-nyc",
      "rental-turnover-painting-nyc",
    ],
  },
  {
    title: "Carpentry & floors",
    slugs: ["trim-molding-installation-nyc", "wood-floor-refinishing-nyc"],
  },
  {
    title: "Commercial",
    slugs: [
      "commercial-painting-manhattan",
      "office-painting-nyc",
      "retail-storefront-painting-nyc",
      "restaurant-painting-nyc",
    ],
  },
];

export default function PaintingIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "NYC Painting", path: "/painting" },
        ])}
      />
      <PageHero
        eyebrow="Find your project"
        title="NYC painting services & costs"
        subtitle="Pick the page that matches your project for specifics, typical cost ranges, and a fast free estimate — whatever you're painting, wherever you are in the five boroughs."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "NYC Painting", path: "/painting" },
        ]}
      />
      <section className="container-x py-16 lg:py-24 space-y-14">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-2xl sm:text-3xl mb-6">{group.title}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug) => {
                const p = moneyPages.find((m) => m.slug === slug);
                if (!p) return null;
                const I = Icon[p.icon];
                return (
                  <Link
                    key={p.slug}
                    href={`/painting/${p.slug}`}
                    className="card p-6 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-ink)] text-white group-hover:bg-[var(--color-green)] transition-colors">
                      <I className="w-5 h-5" />
                    </span>
                    <h3 className="font-display text-lg mt-4">{p.h1}</h3>
                    <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                      {p.lede}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">
                      View details <Icon.arrow className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
      <CTASection />
      <div className="h-20" />
    </>
  );
}
