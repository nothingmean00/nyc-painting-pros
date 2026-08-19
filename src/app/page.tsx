import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { EstimateForm } from "@/components/EstimateForm";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PropertyCareResources } from "@/components/PropertyCareResources";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { areas, faqs, processSteps, services, site } from "@/lib/site";

const projectImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Bright, freshly finished New York living space",
    title: "Apartment interiors",
    text: "Pre-war rooms, new condos, move-ins, and full-home repaints.",
    href: "/painting/apartment-painting-nyc",
  },
  {
    src: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1400&q=85",
    alt: "Refined kitchen with painted cabinetry",
    title: "Cabinet refinishing",
    text: "A smooth, durable finish without replacing sound cabinets.",
    href: "/painting/kitchen-cabinet-painting-nyc",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    alt: "Warm, polished commercial interior",
    title: "Commercial spaces",
    text: "Offices, retail, lobbies, and turns planned around your hours.",
    href: "/services/commercial-painting",
  },
] as const;

const trustItems = [
  ["shield", "Building-ready", "Insurance and access details coordinated"],
  ["check", "Scope-first", "Prep, products, and exclusions in writing"],
  ["clock", "Schedule-led", "Clear sequencing and daily cleanup"],
  ["medal", `${site.warrantyYears}-year warranty`, "Written workmanship coverage"],
] as const;

const audiences = [
  {
    icon: "house",
    label: "For homeowners",
    title: "Homes",
    text: "Apartments, brownstones, condos, cabinets, and specialty finishes—planned around daily life.",
    href: "/services/interior-painting",
    link: "Explore residential painting",
  },
  {
    icon: "building",
    label: "For property teams",
    title: "Buildings",
    text: "Repeatable turnovers, common areas, lobbies, and multi-property programs with clear closeout.",
    href: "/services/property-manager-turnovers",
    link: "Explore property programs",
  },
  {
    icon: "roller",
    label: "For organizations",
    title: "Businesses",
    text: "Offices, retail, hospitality, and occupied spaces scheduled to minimize operational disruption.",
    href: "/services/commercial-painting",
    link: "Explore commercial painting",
  },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={[faqSchema(), breadcrumbs([{ name: "Home", path: "/" }])]} />

      <section className="relative overflow-hidden bg-[var(--color-ink)] text-white">
        <div className="absolute inset-0 opacity-50 paint-grid" aria-hidden="true" />
        <div className="container-x relative grid min-h-[760px] items-stretch lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10 flex flex-col justify-center py-20 pr-0 lg:py-28 lg:pr-16">
            <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green-300)]">
              <span className="h-px w-8 bg-current" />
              Homes · Buildings · Businesses
            </div>
            <h1 className="font-display max-w-3xl text-[clamp(3.25rem,6.3vw,6.7rem)] leading-[.9] tracking-[-0.055em]">
              NYC painting for
              <span className="block text-[var(--color-green-300)]">every kind of space.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl">
              One detail-focused team for homes, managed buildings, and businesses
              across all five boroughs—from careful prep to final walkthrough.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary text-base">
                Request a free estimate <Icon.arrow className="h-5 w-5" />
              </Link>
              <Link href="/services/property-manager-turnovers" className="btn border border-white/25 bg-white/5 text-base text-white hover:bg-white hover:text-[var(--color-ink)]">
                Commercial &amp; property teams
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              {["Free itemized estimates", "Premium low-VOC options", "One project contact"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Icon.check className="h-4 w-4 text-[var(--color-green-300)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] lg:min-h-full">
            <div className="absolute inset-0 -right-[50vw]">
              <Image
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1800&q=88"
                alt="Professional painter carefully applying a fresh wall finish"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/15 to-transparent lg:from-[var(--color-ink)]/55" />
            </div>
            <div className="absolute bottom-8 left-0 max-w-[290px] rounded-xl border border-white/20 bg-[var(--color-ink)]/82 p-5 shadow-2xl backdrop-blur-md lg:-left-8 lg:bottom-12">
              <div className="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-green-300)]">The NYC difference</div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Co-op rules, COIs, freight elevators, occupied spaces—we plan for the details that make city projects different.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-line)] bg-white">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {trustItems.map(([icon, title, text], index) => {
            const I = Icon[icon];
            return (
              <div key={title} className={`flex gap-4 px-3 py-7 sm:px-6 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} lg:border-l first:lg:border-l-0`}>
                <I className="mt-1 h-5 w-5 shrink-0 text-[var(--color-green)]" />
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-x section-pad !pb-0" aria-labelledby="choose-your-path">
        <div className="max-w-3xl">
          <span className="eyebrow">Choose your path</span>
          <h2 id="choose-your-path" className="section-title mt-4">Built around who you are responsible for.</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const I = Icon[audience.icon];
            return (
              <Link
                key={audience.title}
                href={audience.href}
                className={`group relative overflow-hidden rounded-[1.25rem] border p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-8 ${index === 1 ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-line)] bg-white"}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${index === 1 ? "bg-white/10 text-[var(--color-green-300)]" : "bg-[var(--color-cream-200)] text-[var(--color-green-600)]"}`}>
                    <I className="h-6 w-6" />
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-[.16em] ${index === 1 ? "text-white/55" : "text-[var(--color-muted)]"}`}>{audience.label}</span>
                </div>
                <h3 className="font-display mt-10 text-4xl">{audience.title}</h3>
                <p className={`mt-4 min-h-20 leading-relaxed ${index === 1 ? "text-white/68" : "text-[var(--color-muted)]"}`}>{audience.text}</p>
                <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${index === 1 ? "text-[var(--color-green-300)]" : "text-[var(--color-green-600)]"}`}>
                  {audience.link} <Icon.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-x section-pad">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className="section-title mt-4">One crew for the whole finish.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              Painting is only the visible layer. We handle the repairs, prep,
              protection, finish selection, and closeout that make the result last.
            </p>
            <Link href="/services" className="btn btn-ghost mt-8">
              Explore every service <Icon.arrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid border-t border-[var(--color-line)] sm:grid-cols-2">
            {services.slice(0, 6).map((service, index) => {
              const I = Icon[service.icon];
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className={`group border-b border-[var(--color-line)] py-7 transition-colors hover:bg-white sm:p-7 ${index % 2 ? "sm:border-l" : ""}`}>
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--color-cream-200)] text-[var(--color-green-600)] transition-colors group-hover:bg-[var(--color-green)] group-hover:text-white">
                      <I className="h-5 w-5" />
                    </span>
                    <Icon.arrow className="h-5 w-5 text-[var(--color-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-green)]" />
                  </div>
                  <h3 className="font-display mt-8 text-2xl">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{service.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <span className="eyebrow">Spaces we transform</span>
              <h2 className="section-title mt-4">Made for how New York lives.</h2>
            </div>
            <p className="max-w-md text-[var(--color-muted)]">Residential and commercial scopes shaped around the building, schedule, surface, and people using the space.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projectImages.map((project, index) => (
              <Link key={project.title} href={project.href} className={`group relative overflow-hidden rounded-[1.25rem] bg-[var(--color-ink)] ${index === 1 ? "md:translate-y-8" : ""}`}>
                <div className="relative aspect-[4/5]">
                  <Image src={project.src} alt={project.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <h3 className="font-display text-3xl">{project.title}</h3>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">{project.text}</p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[var(--color-ink)] transition-transform group-hover:translate-x-1">
                        <Icon.arrow className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-pad">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">A better process</span>
            <h2 className="section-title mt-4">Less disruption. More certainty.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">You always know what happens next, who to contact, and what the finished work includes.</p>
          </div>
          <ol className="border-t border-[var(--color-line)]">
            {processSteps.map((step, index) => (
              <li key={step.title} className="grid gap-4 border-b border-[var(--color-line)] py-7 sm:grid-cols-[5rem_1fr] sm:py-9">
                <span className="font-display text-3xl text-[var(--color-green)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--color-muted)]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-cream-200)] section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="eyebrow">Local by design</span>
            <h2 className="section-title mt-4">Every borough. Every kind of building.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]">From Manhattan co-ops to Brooklyn brownstones and Queens homes, we adapt the plan to your property—not the other way around.</p>
          </div>
          <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {areas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="group flex items-center justify-between gap-5 py-5">
                <span className="font-display text-2xl sm:text-3xl">{area.name}</span>
                <span className="flex items-center gap-3 text-sm font-semibold text-[var(--color-muted)] group-hover:text-[var(--color-green-600)]">
                  View area <Icon.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-pad" id="estimate">
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="eyebrow">Start your project</span>
            <h2 className="section-title mt-4">Tell us what needs painting.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]">Share a few details now. We’ll confirm whether photos are enough for pricing or whether an on-site walkthrough makes more sense.</p>
            <div className="mt-9 rounded-xl border border-[var(--color-line)] bg-white p-6">
              <p className="text-sm font-semibold">Prefer email?</p>
              <a href={`mailto:${site.email}`} className="font-display mt-2 inline-flex items-center gap-3 text-xl text-[var(--color-green-600)] sm:text-2xl">
                {site.email}
              </a>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{site.hours}</p>
            </div>
          </div>
          <EstimateForm />
        </div>
      </section>

      <section className="container-x pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Straight answers.</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <PropertyCareResources />
      <CTASection title="A better finish starts with a better plan." subtitle="Tell us about your space, timeline, and priorities. We’ll help you define the right scope." />
      <div className="h-16" />
    </>
  );
}
