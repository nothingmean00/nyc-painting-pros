import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { site, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — A Painting Company NYC Can Trust",
  description:
    "NYC Painting Pros is a licensed, insured painting company serving all five boroughs. Learn how our obsession with prep, premium finishes, and clean job sites delivers a flawless result every time.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "shield" as const,
    title: "Trust, in writing",
    text: "Licensed, insured, and bonded with a written workmanship warranty on every project. No handshake promises.",
  },
  {
    icon: "check" as const,
    title: "Prep is everything",
    text: "We never skip the unglamorous work. 80% of a flawless finish happens before the first finish coat.",
  },
  {
    icon: "leaf" as const,
    title: "Healthier finishes",
    text: "Premium low-VOC and zero-VOC paints as standard, so your space is safe to enjoy the same day.",
  },
  {
    icon: "clock" as const,
    title: "Respect for your time",
    text: "We show up when we say, communicate daily, and finish on schedule — or we call you ahead.",
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
        subtitle="We started NYC Painting Pros to be the painters New Yorkers actually want to recommend — meticulous, communicative, and genuinely respectful of your home."
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
              NYC Painting Pros started with a simple frustration: too many
              painters in this city show up late, cut corners, and leave a mess.
              We set out to build the opposite — a company New Yorkers could
              trust with the keys to their home.
            </p>
            <p>
              That standard drives every job. Each project runs through a
              dedicated project manager, every crew is in-house and
              background-checked, and every finish is backed by our written
              warranty. No corners, no surprises, no mess left behind.
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
          How we deliver a flawless finish, every time
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
