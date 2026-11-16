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
    alt: "Bright living room with white walls",
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
  ["shield", "Building paperwork", "Insurance and access details coordinated"],
  ["check", "Written estimates", "Prep, products, and exclusions in writing"],
  ["clock", "Work schedule", "Work hours agreed before the job starts"],
  ["medal", "Final walkthrough", "Completed work reviewed together"],
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
    text: "Rental turnovers, hallways and lobbies, with access and work hours agreed in advance.",
    href: "/services/property-manager-turnovers",
    link: "Painting for property managers",
  },
  {
    icon: "roller",
    label: "For business owners",
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

      <section className="container-x" aria-label="NYC painting for homes, buildings and businesses">
        <div className="hero-grid">
          <div className="hero-photo">
            <Image
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1800&q=88"
              alt="Paint roller applying paint to a wall"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Homes · Buildings · Businesses</p>
            <h1 className="font-display hero-title mt-7">NYC painting for every kind of space.</h1>
            <p className="mt-7 text-lg leading-[1.4] text-[var(--color-ink)] lg:text-[1.2rem]">
              Interior and exterior painting across all five boroughs. Tell us
              what needs painting, and we will put the preparation, materials and price in writing.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact" className="btn btn-primary text-base lg:text-lg">
                Request a free estimate <Icon.arrow className="h-5 w-5" />
              </Link>
              <Link href="/services/property-manager-turnovers" className="btn btn-ghost text-base lg:text-lg">
                Commercial &amp; property teams
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-details">
          <div className="hero-benefits text-sm">
            {["Free itemized estimates", "Premium low-VOC options", "One project contact"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="hero-access">
            <h2 className="eyebrow">Building access</h2>
            <p className="mt-2 text-sm leading-relaxed">Co-op rules, COIs, freight elevators, occupied spaces—we plan for the details that make city projects different.</p>
          </div>
        </div>
      </section>

      <section className="container-x section-pad !pb-0" aria-labelledby="choose-your-path">
        <div className="max-w-3xl">
          <span className="eyebrow">Painting services</span>
          <h2 id="choose-your-path" className="section-title mt-4">What needs painting?</h2>
        </div>
        <div className="mt-10 border-t border-[var(--color-line)]">
          {audiences.map((audience) => (
            <Link key={audience.title} href={audience.href} className="audience-row group">
              <div>
                <h3 className="font-display">{audience.title}</h3>
                <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-muted)]">{audience.label}</p>
              </div>
              <div>
                <p className="text-lg leading-relaxed lg:text-xl">{audience.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[var(--color-line)] underline-offset-4 group-hover:decoration-current">
                  {audience.link} <Icon.arrow className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 border-b border-[var(--color-line)] pb-8 lg:grid-cols-4">
          {trustItems.map(([, title, text]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x section-pad">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className="section-title mt-4">Painting, repairs and wall finishes.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              Your estimate can include wall repairs, wallpaper removal, cabinet
              refinishing and surface preparation, along with the painting.
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
                    <span className="inline-flex text-[var(--color-ink)]" aria-hidden="true"><I className="h-5 w-5" /></span>
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
              <span className="eyebrow">Project ideas</span>
              <h2 className="section-title mt-4">Apartments, kitchens and workspaces.</h2>
            </div>
            <p className="max-w-md text-[var(--color-muted)]">Residential and commercial scopes shaped around the building, schedule, surface, and people using the space.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projectImages.map((project) => (
              <Link key={project.title} href={project.href} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={project.src} alt={project.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="project-caption border-t border-[var(--color-line)] mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display">{project.title}</h3><Icon.arrow className="h-5 w-5 shrink-0" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{project.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section-pad">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title mt-4">From estimate to final walkthrough.</h2>
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
            <span className="eyebrow">Areas we serve</span>
            <h2 className="section-title mt-4">Painting across all five boroughs.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]">Choose your borough for information about local painting projects and building access.</p>
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
            <div className="mt-9 rounded-none border border-[var(--color-line)] bg-white p-6">
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
            <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Common questions.</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="container-x py-14">
        <p className="eyebrow">Before you request a quote</p>
        <h2 className="section-title mt-4">Compare the scope, then compare the price.</h2>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">Decide which surfaces, repairs and building requirements belong in your project. These guides help you ask for estimates you can compare.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            ["/blog/how-much-does-it-cost-to-paint-an-apartment-nyc", "Apartment painting costs", "Planning ranges and a sample scope comparison."],
            ["/painting/co-op-condo-painting-nyc", "Co-op and condo planning", "Separate building requirements, documents and approval."],
            ["/painting/kitchen-cabinet-painting-nyc", "Cabinet painting scope", "Check condition, count surfaces and plan finish care."],
          ].map(([href, title, text]) => <Link key={href} href={href} className="card p-6 hover:border-[var(--color-green)]"><h3 className="font-display text-xl">{title}</h3><p className="mt-3 text-[var(--color-muted)]">{text}</p><span className="mt-4 inline-block font-semibold underline">Read the guide</span></Link>)}
        </div>
      </section>
      <PropertyCareResources />
      <CTASection title="Need a painting estimate?" subtitle="Tell us which rooms or surfaces need work and when you would like to start." />
      <div className="h-16" />
    </>
  );
}
