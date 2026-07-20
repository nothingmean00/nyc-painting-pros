import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { site, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Detail-Focused NYC Painting Company",
  description:
    "Learn how NYC Painting Pros plans preparation, products, protection, scheduling, and closeout for painting and wall-finish projects across all five boroughs.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "shield" as const,
    title: "Trust, in writing",
    text: "Written estimates document scope, materials, exclusions, scheduling, and workmanship warranty terms before work begins.",
  },
  {
    icon: "check" as const,
    title: "Prep is everything",
    text: "We put the unglamorous work in writing: patching, sanding, priming, masking, and surface protection before finish coats.",
  },
  {
    icon: "leaf" as const,
    title: "Healthier finishes",
    text: "Low- and zero-VOC options are selected with the room, substrate, finish, and reoccupancy needs in mind.",
  },
  {
    icon: "clock" as const,
    title: "Respect for your time",
    text: "We confirm the schedule, communicate clearly, and call ahead if building access, weather, or drying time changes the plan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="Our story"
        title="Built on craft, trust, and clean job sites"
        subtitle="NYC Painting Pros is built for homeowners, property managers, and business owners who care about prep, communication, and a clean finish."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            A New York painting company that actually picks up the phone
          </h2>
          <div className="mt-5 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg">
            <p>
              NYC painting projects fail in predictable places: vague scopes,
              rushed prep, poor protection, missed building paperwork, and crews
              that disappear when questions come up. We built the company around
              those details.
            </p>
            <p>
              Each project runs through a dedicated project manager, a written
              scope, daily cleanup, and a final walkthrough. The result is a
              calmer job and a finish backed by our written workmanship
              warranty.
            </p>
          </div>
          <a href={site.phoneHref} className="btn btn-dark mt-8">
            <Icon.phone className="w-5 h-5" /> Talk to us: {site.phone}
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v) => {
            const I = Icon[v.icon];
            return (
              <div key={v.title} className="card p-6">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-green)]/12 text-[var(--color-green-600)]">
                  <I className="w-6 h-6" />
                </span>
                <h3 className="font-display text-lg mt-4">{v.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16 lg:py-24">
          <h2 className="font-display text-3xl sm:text-4xl">What you can count on</h2>
          <p className="mt-3 text-lg text-[var(--color-muted)] max-w-2xl">
            Every promise here is something we control and stand behind on every
            single project.
          </p>
          <div className="mt-10">
            <Guarantees />
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <h2 className="font-display text-3xl sm:text-4xl max-w-2xl">
          How we deliver a careful finish
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
      </section>

      <CTASection />
      <div className="h-20" />
    </>
  );
}
