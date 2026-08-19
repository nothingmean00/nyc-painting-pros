import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { EstimateForm } from "@/components/EstimateForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Free Estimate — NYC Painting Pros",
  description:
    "Request a free, no-obligation estimate for painting, wallpaper, wall finishes, repairs, or property turnovers in New York City.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ projectBrief?: string | string[] }>;
}) {
  const rawBrief = (await searchParams).projectBrief;
  const projectBrief = (Array.isArray(rawBrief) ? rawBrief[0] : rawBrief)
    ?.replace(/[<>]/g, "")
    .slice(0, 1600) ?? "";
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="container-x pb-8 pt-14 lg:pb-10 lg:pt-20">
        <div className="max-w-4xl">
          <span className="eyebrow">Project intake</span>
          <h1 className="section-title mt-4">Tell us what you&apos;re planning.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            Share the space, scope, timing, and any building requirements. We&apos;ll
            review everything and confirm the most useful next step.
          </p>
        </div>
      </section>

      <section className="container-x grid items-start gap-8 pb-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 lg:pb-28">
        <div id="estimate" className="min-w-0">
          <EstimateForm defaultDetails={projectBrief} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-32">
          <div className="rounded-2xl bg-[var(--color-ink)] p-6 text-white">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-green-300)]">
              What happens next
            </span>
            <ol className="mt-5 space-y-5">
              {[
                "We review your project details.",
                "We confirm whether photos or a walkthrough are needed.",
                "You receive a clear written scope and estimate.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-white/75">
                  <span className="font-display text-lg text-[var(--color-green-300)]">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 text-[var(--color-green-600)]">
              <Icon.shield className="h-5 w-5" />
              <span className="font-semibold">Building projects</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              Add COI language, access hours, freight-elevator rules, and required
              completion dates to the project description.
            </p>
          </div>

          <div className="px-2 py-3 text-sm text-[var(--color-muted)]">
            Prefer email?{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-[var(--color-green-600)] hover:underline">
              {site.email}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
