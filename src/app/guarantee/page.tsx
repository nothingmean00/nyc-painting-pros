import { withRouteSocial } from "@/lib/metadata";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { faqs, processSteps } from "@/lib/site";

export const metadata: Metadata = withRouteSocial({
  title: "Our Painting Process",
  description: "See how NYC Painting Pros documents scope, preparation, scheduling, and the final walkthrough for painting projects.",
  alternates: { canonical: "/guarantee" },
}, "/guarantee");

export default function GuaranteePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Our Process", path: "/guarantee" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our process"
        title="A clear process from estimate to handoff"
        subtitle="See how we plan the scope, prepare surfaces, coordinate the schedule, and review completed work with you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Process", path: "/guarantee" },
        ]}
      />

      <section className="container-x py-16 lg:py-24">
        <Guarantees />
      </section>

      {/* How we earn it */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16 lg:py-24">
          <h2 className="font-display text-3xl sm:text-4xl max-w-2xl">
            How we organize every painting project
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
