import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { EstimateForm } from "@/components/EstimateForm";
import { Guarantees } from "@/components/Trust";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { site, areas, services, faqs } from "@/lib/site";
import { moneyPages } from "@/lib/money-pages";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  const title = `Painters in ${a.name} | ${site.name}`;
  const description = `Painting, wallpaper, wall-finish, and turnover services in ${a.name}. Review local project options and request a detailed estimate.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/areas/${a.slug}` },
    openGraph: { title, description, url: `${site.url}/areas/${a.slug}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();
  const localProjectPages = moneyPages
    .filter((p) => p.relatedAreas.includes(a.slug))
    .slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Areas We Serve", path: "/areas" },
            { name: a.name, path: `/areas/${a.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Areas we serve"
        title={`Painters in ${a.name}`}
        subtitle={a.blurb}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas" },
          { name: a.name, path: `/areas/${a.slug}` },
        ]}
      />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-display text-3xl">
            Local painters who know {a.name}
          </h2>
          <p className="mt-4 text-[var(--color-muted)] leading-relaxed text-lg">
            We plan {a.name} projects around the details that change the job:
            building access, COI requirements, surface condition, room-by-room
            sequencing, and cleanup. You get a dedicated project manager,
            premium low-VOC finishes, and a documented walkthrough from day one
            to final touchups.
          </p>

          <h3 className="font-display text-2xl mt-12">Services in {a.name}</h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {services.map((s) => {
              const I = Icon[s.icon];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex items-start gap-3 card p-5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--color-green)]/12 text-[var(--color-green-600)] shrink-0">
                    <I className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="block text-sm text-[var(--color-muted)]">{s.short}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          {localProjectPages.length > 0 && (
            <>
              <h3 className="font-display text-2xl mt-12">
                Popular {a.name} painting projects
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {localProjectPages.map((p) => {
                  const I = Icon[p.icon];
                  return (
                    <Link
                      key={p.slug}
                      href={`/painting/${p.slug}`}
                      className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-green)] hover:shadow-[var(--shadow-soft)]"
                    >
                      <span className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--color-ink)] text-white shrink-0">
                        <I className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">{p.h1}</span>
                        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-[var(--color-muted)]">
                          {p.lede}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <h3 className="font-display text-2xl mt-12">
            Neighborhoods we cover in {a.name}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {a.neighborhoods.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-1.5 text-sm rounded-full bg-white border border-[var(--color-line)] px-3 py-1.5"
              >
                <Icon.pin className="w-3.5 h-3.5 text-[var(--color-green-600)]" />
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 space-y-6">
          <EstimateForm compact />
          <div className="card p-6">
            <h3 className="font-semibold">Other boroughs</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {areas
                .filter((x) => x.slug !== a.slug)
                .map((x) => (
                  <Link
                    key={x.slug}
                    href={`/areas/${x.slug}`}
                    className="text-sm rounded-full border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-green)] hover:text-[var(--color-green-600)] transition-colors"
                  >
                    {x.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16">
          <h2 className="font-display text-3xl sm:text-4xl">
            What every {a.name} job comes with
          </h2>
          <div className="mt-10">
            <Guarantees limit={3} />
          </div>
        </div>
      </section>

      <CTASection title={`Get a free estimate in ${a.name}`} />
      <div className="h-20" />
    </>
  );
}
