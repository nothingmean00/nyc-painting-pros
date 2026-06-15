import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { site, faqs, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Guarantee — Licensed, Insured & Warrantied Painting",
  description: `Why NYC trusts NYC Painting Pros: licensed and insured, a written ${site.warrantyYears}-year workmanship warranty, free itemized estimates, and a spotless job site on every project.`,
  alternates: { canonical: "/guarantee" },
};

export default function GuaranteePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Our Guarantee", path: "/guarantee" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our guarantee"
        title="Promises we put in writing"
        subtitle="We'd rather earn your trust with commitments we keep than with numbers on a page. Here's exactly what every NYC Painting Pros client can count on."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Guarantee", path: "/guarantee" },
        ]}
      />

      <section className="container-x py-16 lg:py-24">
        <Guarantees />
      </section>

      {/* The written warranty highlight */}
      <section className="container-x pb-16 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-ink)] text-white p-8 sm:p-12 grid lg:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="grid place-items-center w-24 h-24 rounded-2xl bg-[var(--color-green)]/20 text-[var(--color-green-300)] shrink-0">
            <Icon.medal className="w-12 h-12" />
          </div>
          <div>
            <h2 className="font-display text-3xl">
              Our written {site.warrantyYears}-year workmanship warranty
            </h2>
            <p className="mt-3 text-white/75 leading-relaxed max-w-2xl">
              If anything covered by our workmanship fails within{" "}
              {site.warrantyYears} years — peeling, flaking, or premature wear
              from how we applied it — we come back and fix it at no cost to you.
              It&apos;s in writing on every estimate, because a guarantee you
              can&apos;t hold isn&apos;t a guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* How we earn it */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16 lg:py-24">
          <h2 className="font-display text-3xl sm:text-4xl max-w-2xl">
            How we earn that guarantee on every job
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <div className="font-display text-5xl text-[var(--color-green)]/25">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg mt-2">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Good to know</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3">Common questions</h2>
        </div>
        <div className="mt-8 max-w-3xl">
          <Faq items={faqs} />
        </div>
      </section>

      <CTASection />
      <div className="h-20" />
    </>
  );
}
