import Link from "next/link";
import { PageHero } from "./PageHero";
import { EstimateForm } from "./EstimateForm";
import { JsonLd } from "./JsonLd";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { site, services } from "@/lib/site";
import { moneyPages } from "@/lib/money-pages";
import { getPost } from "@/lib/blog";
import { neighborhoodLinks, type Neighborhood } from "@/lib/neighborhoods";

export function NeighborhoodPage({ neighborhood: n }: { neighborhood: Neighborhood }) {
  const path = `/areas/${n.slug}`;
  const projects = n.projects.flatMap((slug) => moneyPages.filter((p) => p.slug === slug));
  const serviceSlugs = new Set(projects.flatMap((p) => p.relatedServices));
  const guide = getPost(n.guide);
  const nearby = n.nearby.flatMap((slug) => neighborhoodLinks.filter((a) => a.slug === slug));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Service areas", path: "/areas" }, { name: "Manhattan", path: "/areas/manhattan" }, { name: n.name, path }];
  return <>
    <JsonLd data={[breadcrumbs(crumbs), faqSchema([{ q: n.question, a: n.answer }]), {
      "@context": "https://schema.org", "@type": "Service", name: `Painting services in ${n.name}`,
      serviceType: "Painting project planning and estimates", url: `${site.url}${path}`,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      areaServed: { "@type": "Place", name: `${n.name}, New York City` },
    }]} />
    <PageHero eyebrow="Manhattan painting services" title={`Painters in ${n.name}`} subtitle={n.focus} crumbs={crumbs} />
    <div className="container-x pt-6"><a href="#neighborhood-estimate" className="inline-flex min-h-11 items-center rounded-xl bg-[var(--color-ink)] px-5 py-3 font-semibold text-white">Request an estimate in {n.name}</a></div>
    <section className="container-x py-12 lg:py-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
      <div className="space-y-10">
        <section><h2 className="font-display text-3xl">Plan your {n.name} painting project</h2><p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{n.intro}</p><p className="mt-4 leading-relaxed text-[var(--color-muted)]">{n.planning}</p></section>
        <section className="card p-6"><h2 className="font-display text-2xl">What to send for an estimate</h2><ul className="mt-4 list-disc pl-5 space-y-3">{n.checklist.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-4 text-sm text-[var(--color-muted)]">Add the exact address or cross streets, room photos and preferred dates. Neighborhood names can overlap; the building and surfaces determine the final scope.</p></section>
        <section><h2 className="font-display text-3xl">Choose the work you need</h2><div className="mt-5 grid gap-4">{projects.map((p) => <Link key={p.slug} href={`/painting/${p.slug}`} className="card p-5 hover:border-[var(--color-green)]"><h3 className="font-display text-xl">{p.h1}</h3><p className="mt-2 text-sm text-[var(--color-muted)]">{p.lede}</p><span className="mt-3 inline-block font-semibold text-[var(--color-green-600)]">Review scope and pricing factors →</span></Link>)}</div></section>
        <section><h2 className="font-display text-2xl">Compare the scope before the price</h2><p className="mt-4 leading-relaxed text-[var(--color-muted)]">The estimate should identify included surfaces, preparation, products, protection, access, cleanup and exclusions. A neighborhood name does not establish a price. Compare the same room and repair schedule across quotes, and ask how additional work will be approved if preparation reveals a problem.</p><p className="mt-4 leading-relaxed text-[var(--color-muted)]">We review your project details and confirm whether photos or a walkthrough are needed. Sending a request does not book work. Building permission, work hours and return-to-use conditions should be agreed before scheduling.</p></section>
        <section><h2 className="font-display text-2xl">{n.question}</h2><p className="mt-4 leading-relaxed text-[var(--color-muted)]">{n.answer}</p></section>
        {guide && <aside className="rounded-2xl bg-[var(--color-cream-200)]/60 p-6"><p className="text-sm font-semibold">Before you request an estimate</p><Link href={`/blog/${guide.slug}`} className="mt-2 block font-display text-xl underline underline-offset-4">{guide.title}</Link><p className="mt-3 text-sm text-[var(--color-muted)]">{guide.excerpt}</p></aside>}
        <section><h2 className="font-display text-2xl">Related services</h2><ul className="mt-4 flex flex-wrap gap-3">{services.filter((s) => serviceSlugs.has(s.slug)).map((s) => <li key={s.slug}><Link className="inline-block rounded-full border border-[var(--color-line)] px-4 py-2 underline underline-offset-4" href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul></section>
        <nav aria-label="Nearby painting service areas"><h2 className="font-display text-2xl">Nearby area guides</h2><ul className="mt-4 flex flex-wrap gap-3">{nearby.map((a) => <li key={a.slug}><Link href={a.href} className="inline-block rounded-full border border-[var(--color-line)] px-4 py-2 underline underline-offset-4">{a.name}</Link></li>)}</ul><Link href="/areas/manhattan" className="mt-4 inline-block font-semibold underline">All Manhattan painting areas</Link>{n.slug === "marble-hill" && <Link href="/areas/bronx" className="ml-5 inline-block font-semibold underline">Bronx painting services</Link>}</nav>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">Local reference: <a href={n.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">neighborhood or district information</a>. This reference provides location context, not an endorsement or approval of a project. Confirm requirements with your property’s responsible contact.</p>
      </div>
      <aside id="neighborhood-estimate" className="scroll-mt-28 lg:sticky lg:top-28"><h2 className="font-display text-2xl mb-4">Your {n.name} estimate</h2><EstimateForm compact defaultDetails={`Project location: ${n.name}, Manhattan.\n`} /></aside>
    </section>
  </>;
}
