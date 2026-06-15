import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { Faq } from "@/components/Faq";
import { EstimateForm } from "@/components/EstimateForm";
import { Guarantees } from "@/components/Trust";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbs } from "@/lib/schema";
import { moneyPages, getMoneyPage } from "@/lib/money-pages";
import { site, services, areas } from "@/lib/site";

export function generateStaticParams() {
  return moneyPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getMoneyPage(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/painting/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `${site.url}/painting/${p.slug}`,
    },
  };
}

export default async function MoneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getMoneyPage(slug);
  if (!p) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "NYC Painting", path: "/painting" },
    { name: p.keyword, path: `/painting/${p.slug}` },
  ];
  const relatedServices = services.filter((s) => p.relatedServices.includes(s.slug));
  const relatedAreas = areas.filter((a) => p.relatedAreas.includes(a.slug));
  const relatedPages = (p.relatedPages ?? [])
    .map((rp) => getMoneyPage(rp))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: p.keyword,
            description: p.description,
            serviceType: p.keyword,
            provider: { "@id": `${site.url}/#business` },
            areaServed: { "@type": "City", name: "New York" },
            url: `${site.url}/painting/${p.slug}`,
          },
          faqSchema(p.faqs),
          breadcrumbs(trail),
        ]}
      />
      <PageHero eyebrow="NYC painting" title={p.h1} subtitle={p.lede} crumbs={trail} />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">
        <article className="min-w-0">
          {/* Intro */}
          <div className="space-y-4 text-lg text-[var(--color-muted)] leading-relaxed">
            {p.intro.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          {/* Scope */}
          <div className="mt-12">
            <h2 className="font-display text-3xl">{p.scope.heading}</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-4">
              {p.scope.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-[var(--color-green)]/15 text-[var(--color-green-600)] mt-0.5 shrink-0">
                    <Icon.check className="w-4 h-4" />
                  </span>
                  <span className="text-[var(--color-ink)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content sections */}
          {p.sections.map((sec) => (
            <div key={sec.h2} className="mt-12">
              <h2 className="font-display text-3xl">{sec.h2}</h2>
              <p className="mt-4 text-[var(--color-muted)] leading-relaxed text-lg">
                {sec.body}
              </p>
              {sec.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <Icon.check className="w-5 h-5 text-[var(--color-green-600)] mt-0.5 shrink-0" />
                      <span className="text-[var(--color-ink)]">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Cost table */}
          <div className="mt-12">
            <h2 className="font-display text-3xl">
              {p.keyword.charAt(0).toUpperCase() + p.keyword.slice(1)} cost
            </h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed text-lg">
              {p.cost.intro}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
              <table className="w-full text-left">
                <thead className="bg-[var(--color-cream-200)]/60 text-sm">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Project</th>
                    <th className="px-5 py-3 font-semibold text-right">Typical range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  {p.cost.rows.map((row) => (
                    <tr key={row.item}>
                      <td className="px-5 py-3.5">{row.item}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-[var(--color-ink)] whitespace-nowrap">
                        {row.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{p.cost.note}</p>
          </div>

          {/* FAQs */}
          <div className="mt-12">
            <h2 className="font-display text-3xl mb-6">Frequently asked questions</h2>
            <Faq items={p.faqs} />
          </div>

          {/* Internal links */}
          {(relatedServices.length > 0 || relatedAreas.length > 0) && (
            <div className="mt-12 rounded-2xl bg-[var(--color-cream-200)]/50 border border-[var(--color-line)] p-7">
              <h2 className="font-display text-2xl">Related painting services & areas</h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-6">
                {relatedServices.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Services
                    </h3>
                    <ul className="space-y-1.5">
                      {relatedServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="inline-flex items-center gap-1.5 text-[var(--color-ink)] hover:text-[var(--color-green-600)] font-medium"
                          >
                            <Icon.arrow className="w-4 h-4 text-[var(--color-green-600)]" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {relatedAreas.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Areas we serve
                    </h3>
                    <ul className="space-y-1.5">
                      {relatedAreas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/areas/${a.slug}`}
                            className="inline-flex items-center gap-1.5 text-[var(--color-ink)] hover:text-[var(--color-green-600)] font-medium"
                          >
                            <Icon.pin className="w-4 h-4 text-[var(--color-green-600)]" />
                            Painters in {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </article>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-28 space-y-6">
          <EstimateForm compact />
          <div className="card p-6">
            <h3 className="font-semibold">Why choose NYC Painting Pros</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Licensed, bonded & insured",
                "EPA Lead-Safe certified",
                `${site.warrantyYears}-year written warranty`,
                "Free, itemized estimates",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon.check className="w-4 h-4 text-[var(--color-green-600)]" />
                  {t}
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="btn btn-dark w-full mt-5">
              <Icon.phone className="w-4 h-4" /> {site.phone}
            </a>
          </div>
        </aside>
      </section>

      {/* More popular pages */}
      {relatedPages.length > 0 && (
        <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
          <div className="container-x py-16">
            <h2 className="font-display text-3xl">Popular in NYC</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((rp) => {
                const I = Icon[rp.icon];
                return (
                  <Link
                    key={rp.slug}
                    href={`/painting/${rp.slug}`}
                    className="card p-6 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-ink)] text-white group-hover:bg-[var(--color-green)] transition-colors">
                      <I className="w-5 h-5" />
                    </span>
                    <h3 className="font-display text-lg mt-4">{rp.h1}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">
                      Learn more <Icon.arrow className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-16 lg:py-24">
        <h2 className="font-display text-3xl sm:text-4xl">Our promise on every job</h2>
        <div className="mt-10">
          <Guarantees limit={3} />
        </div>
      </section>

      <CTASection title={`Get a free estimate for ${p.keyword.toLowerCase()}`} />
      <div className="h-20" />
    </>
  );
}
