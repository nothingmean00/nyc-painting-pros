import { withRouteSocial } from "@/lib/metadata";
import { detailMoneyPages } from "@/lib/detail-content";
import type { Metadata } from "next";
import { ProjectFinder } from "@/components/ProjectFinder";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { moneyPages } from "@/lib/money-pages";

export const metadata: Metadata = withRouteSocial({
  title: "NYC Painting Services & Costs | Find Your Project",
  description:
    "Compare NYC painting scopes for apartments, cabinets, brownstones, offices and detailed finish projects. Review preparation, pricing factors and request an estimate.",
  alternates: { canonical: "/painting" },
}, "/painting");

const groups = [
  { title: "Detailed painting & finishing scopes", slugs: detailMoneyPages.map((page) => page.slug) },
  {
    title: "Project planning & access",
    slugs: ["occupied-apartment-painting-nyc", "stairwell-painting-nyc", "high-ceiling-painting-nyc", "pre-sale-apartment-painting-nyc", "multi-unit-painting-nyc"],
  },
  {
    title: "Decorative wall finishes",
    slugs: ["limewash-painting-nyc", "venetian-plaster-nyc", "roman-clay-walls-nyc"],
  },
  {
    title: "Rooms & interior details",
    slugs: ["bathroom-painting-nyc", "kitchen-wall-painting-nyc", "ceiling-painting-nyc", "interior-trim-painting-nyc", "interior-door-painting-nyc", "closet-painting-nyc", "built-in-bookcase-painting-nyc", "wainscoting-painting-nyc"],
  },
  {
    title: "Homes & apartments",
    slugs: [
      "apartment-painting-nyc",
      "interior-painting-manhattan",
      "interior-painting-brooklyn",
      "pre-war-apartment-painting-nyc",
      "co-op-condo-painting-nyc",
      "single-room-accent-wall-painting-nyc",
      "upper-east-side-apartment-painters",
      "tribeca-loft-painting",
      "park-slope-brownstone-painters",
      "long-island-city-condo-painting",
      "move-in-apartment-painting-nyc",
      "move-out-apartment-painting-nyc",
    ],
  },
  {
    title: "Specialty & finishing",
    slugs: [
      "wallpaper-removal-nyc",
      "wallpaper-installation-nyc",
      "water-stain-repainting-nyc",
      "plaster-wall-repair-painting-nyc",
      "kitchen-cabinet-painting-nyc",
      "cabinet-refinishing-cost-nyc",
      "skim-coating-nyc",
      "drywall-repair-nyc",
      "brownstone-painting-brooklyn",
      "exterior-painting-nyc",
      "exterior-metal-railing-painting-nyc",
      "new-construction-painting-nyc",
      "rental-turnover-painting-nyc",
      "popcorn-ceiling-removal-nyc",
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
      "office-move-out-painting-nyc",
      "williamsburg-office-painting",
      "apartment-building-lobby-hallway-painting-nyc",
      "retail-storefront-painting-nyc",
      "restaurant-painting-nyc",
    ],
  },
];

const groupedSlugs = new Set(groups.flatMap((group) => group.slugs));
const additionalPages = moneyPages.filter((page) => !groupedSlugs.has(page.slug));
const completeGroups = additionalPages.length ? [...groups, { title: "More project scopes", slugs: additionalPages.map((page) => page.slug) }] : groups;

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
        subtitle="Find the scope, preparation questions, and pricing factors for your project, then request an itemized estimate across NYC's five boroughs."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "NYC Painting", path: "/painting" },
        ]}
      />
      <ProjectFinder groups={completeGroups.map((group) => ({
        title: group.title,
        projects: group.slugs.flatMap((slug) => {
          const page = moneyPages.find((item) => item.slug === slug);
          return page ? [{ slug: page.slug, title: page.h1, description: page.lede, keyword: page.keyword, icon: page.icon }] : [];
        }),
      }))} />
      <CTASection />
      <div className="h-20" />
    </>
  );
}
