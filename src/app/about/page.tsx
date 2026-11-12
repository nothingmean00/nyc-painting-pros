import { withRouteSocial } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = withRouteSocial({
  title: "About — Detail-Focused NYC Painting Company",
  description:
    "Learn how NYC Painting Pros plans preparation, products, protection, scheduling, and closeout for painting and wall-finish projects across all five boroughs.",
  alternates: { canonical: "/about" },
}, "/about");

const values = [
  {
    icon: "shield" as const,
    title: "Trust, in writing",
    text: "Written estimates document scope, materials, exclusions, and scheduling before work begins.",
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
        eyebrow="About NYC Painting Pros"
        title="What to expect when you hire us"
        subtitle="Painting and wall repairs for homes, apartment buildings and businesses across New York City."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            Agree on the work before it starts
          </h2>
          <div className="mt-5 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg">
            <p>
              Your estimate should say which rooms and surfaces are included,
              what repairs are needed, and which paint and finish will be used.
              We discuss building paperwork and access hours before scheduling.
            </p>
            <p>
              You have a project contact for questions during the work.
              We protect the work area, clean up each day, and review the finished
              surfaces with you at the final walkthrough.
            </p>
          </div>
          <Link href="/contact" className="btn btn-dark mt-8">
            Start your project <Icon.arrow className="w-5 h-5" />
          </Link>
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
