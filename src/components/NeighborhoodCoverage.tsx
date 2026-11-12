import Link from "next/link";
import { neighborhoods, neighborhoodLinks } from "@/lib/neighborhoods";

export function NeighborhoodCoverage({ project, guide, all = false }: { project?: string; guide?: string; all?: boolean }) {
  const matching = all ? neighborhoodLinks : neighborhoodLinks.filter((link) => neighborhoods.some((n) => n.slug === link.slug && ((project && n.projects.includes(project)) || (guide && n.guide === guide))));
  if (!matching.length) return null;
  return <section className="container-x py-10 border-t border-[var(--color-line)]" aria-label="Neighborhood painting guides"><h2 className="font-display text-2xl sm:text-3xl">{all ? "Find your Manhattan neighborhood" : "Plan this work in your neighborhood"}</h2><p className="mt-3 text-[var(--color-muted)]">Local planning questions, related services and an estimate path for your address.</p><ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">{matching.map((n) => <li key={n.slug}><Link className="inline-block py-2 font-semibold underline underline-offset-4 text-[var(--color-green-600)]" href={n.href}>{n.name}</Link></li>)}</ul></section>;
}
