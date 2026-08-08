import { Icon } from "@/components/Icons";

const resources = [
  {
    href: "https://nycmovingpros.com/move-readiness",
    title: "Coordinate the move around drying time",
    body: "Use NYC Moving Pros’ readiness plan to align building rules, movers, and the handoff after painting.",
    icon: "house" as const,
  },
  {
    href: "https://www.pestshieldnyc.com/blog/moving-into-new-nyc-apartment-pest-checklist",
    title: "Inspect before cracks are painted or sealed",
    body: "Use PestShield NYC’s apartment checklist to document activity around cabinets, pipes, baseboards, and closets first.",
    icon: "shield" as const,
  },
] as const;

export function PropertyCareResources() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-cream-200)]/50">
      <div className="container-x py-16 lg:py-20">
        <span className="eyebrow">Move-in planning</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">Sequence painting, pest checks, and moving day</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--color-muted)]">The best time to inspect and paint is before furniture arrives. These independent NYC planning resources help protect access and reduce rework.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => {
            const ResourceIcon = Icon[resource.icon];
            return (
              <a key={resource.href} href={resource.href} className="group rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-green)] hover:shadow-[var(--shadow-soft)]">
                <ResourceIcon className="h-6 w-6 text-[var(--color-green-600)]" />
                <h3 className="mt-4 font-display text-xl">{resource.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{resource.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">Open resource <Icon.arrow className="h-4 w-4" /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
