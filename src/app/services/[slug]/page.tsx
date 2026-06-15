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
import { serviceSchema, faqSchema, breadcrumbs } from "@/lib/schema";
import { site, services, areas } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.name} in NYC | ${s.keyword}`;
  return {
    title,
    description: `${s.intro} Free estimates, licensed & insured, ${site.warrantyYears}-year warranty across all five boroughs.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description: s.short, url: `${site.url}/services/${s.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s),
          faqSchema(s.faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title={s.hero}
        subtitle={s.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ]}
      />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-display text-3xl">What&apos;s included</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-4">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-[var(--color-green)]/15 text-[var(--color-green-600)] mt-0.5 shrink-0">
                  <Icon.check className="w-4 h-4" />
                </span>
                <span className="text-[var(--color-ink)]">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl bg-[var(--color-ink)] text-white p-8">
            <h3 className="font-display text-2xl">
              Why NYC trusts us for {s.name.toLowerCase()}
            </h3>
            <p className="mt-3 text-white/75 leading-relaxed">
              We treat every job — large or small — with the same standard:
              meticulous prep, premium coatings, crisp lines, and a spotless
              finish backed by our written warranty.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {["Licensed & insured", "EPA Lead-Safe", "Free written quote", `${site.warrantyYears}-yr warranty`].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5">
                    <Icon.check className="w-3.5 h-3.5 text-[var(--color-green-300)]" /> {t}
                  </span>
                )
              )}
            </div>
          </div>

          {s.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-3xl mb-6">
                {s.name} FAQs
              </h2>
              <Faq items={s.faqs} />
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 space-y-6">
          <EstimateForm compact />
          <div className="card p-6">
            <h3 className="font-semibold">Available across NYC</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="text-sm rounded-full border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-green)] hover:text-[var(--color-green-600)] transition-colors"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* other services */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16">
          <h2 className="font-display text-3xl">Explore more services</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const I = Icon[o.icon];
              return (
                <Link key={o.slug} href={`/services/${o.slug}`} className="card p-6 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-ink)] text-white group-hover:bg-[var(--color-green)] transition-colors">
                    <I className="w-5 h-5" />
                  </span>
                  <h3 className="font-display text-lg mt-4">{o.name}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">{o.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <h2 className="font-display text-3xl sm:text-4xl">Our promise on every job</h2>
        <div className="mt-10">
          <Guarantees limit={3} />
        </div>
      </section>

      <CTASection title={`Need ${s.name.toLowerCase()} in NYC?`} />
      <div className="h-20" />
    </>
  );
}
