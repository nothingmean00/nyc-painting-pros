import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icons";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CTASection } from "@/components/CTASection";
import { Guarantees } from "@/components/Trust";
import { Faq } from "@/components/Faq";
import { EstimateForm } from "@/components/EstimateForm";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbs } from "@/lib/schema";
import { site, services, areas, faqs, processSteps } from "@/lib/site";
import { moneyPages } from "@/lib/money-pages";
import { sortedPosts, unsplash } from "@/lib/blog";

const popularSlugs = [
  "apartment-painting-nyc",
  "kitchen-cabinet-painting-nyc",
  "skim-coating-nyc",
  "interior-painting-manhattan",
  "drywall-repair-nyc",
  "co-op-condo-painting-nyc",
  "brownstone-painting-brooklyn",
  "commercial-painting-manhattan",
  "exterior-painting-nyc",
];

const trustBadges = [
  { icon: "shield", label: "Licensed & Insured", sub: "$2M liability" },
  { icon: "leaf", label: "EPA Lead-Safe", sub: "RRP certified" },
  { icon: "medal", label: `${site.warrantyYears}-Year Warranty`, sub: "In writing" },
  { icon: "clock", label: "On-Time, Every Time", sub: "Or we call ahead" },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={[faqSchema(), breadcrumbs([{ name: "Home", path: "/" }])]} />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 90% at 85% -10%, rgba(22,146,79,0.12), transparent 55%), radial-gradient(90% 70% at 0% 0%, rgba(15,110,59,0.07), transparent 50%)",
          }}
        />
        <div className="container-x pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--color-line)] px-4 py-1.5 text-sm font-medium shadow-[var(--shadow-soft)]">
              <Icon.pin className="w-4 h-4 text-[var(--color-green-600)]" />
              Serving all five boroughs of NYC
            </span>
            <h1 className="font-display text-[2.6rem] sm:text-6xl leading-[1.04] mt-6">
              New York&apos;s most
              <br />
              trusted{" "}
              <span className="relative text-[var(--color-green-600)]">
                painters
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C40 3 160 3 198 8"
                    stroke="var(--color-green)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 text-lg text-[var(--color-muted)] max-w-xl leading-relaxed">
              Flawless interior, exterior &amp; commercial painting across all
              five boroughs. Meticulous prep, premium finishes, spotless
              cleanup — backed by a written {site.warrantyYears}-year
              warranty.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary text-base">
                Get a Free Estimate <Icon.arrow className="w-5 h-5" />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost text-base">
                <Icon.phone className="w-5 h-5" /> {site.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-muted)]">
              {["Free written estimates", "Low-VOC premium paints", "All five boroughs"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <Icon.check className="w-4 h-4 text-[var(--color-green-600)]" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: "0.12s" }}>
            <BeforeAfter />
            <p className="text-center text-sm text-[var(--color-muted)] mt-3">
              ← Drag to see the transformation →
            </p>
          </div>
        </div>

        {/* trust strip */}
        <div className="border-y border-[var(--color-line)] bg-white/60">
          <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--color-line)]">
            {trustBadges.map((b) => {
              const I = Icon[b.icon];
              return (
                <div key={b.label} className="flex items-center gap-3 py-5 px-4 sm:px-6">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-green)]/12 text-[var(--color-green-600)] shrink-0">
                    <I className="w-6 h-6" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold text-[0.95rem]">{b.label}</span>
                    <span className="block text-xs text-[var(--color-muted)]">{b.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ SERVICES ============================ */}
      <section className="container-x py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
            Expert painting for every NYC space
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            From a single accent wall to a full commercial build-out, our crews
            bring the same obsessive attention to prep, lines, and cleanup.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const I = Icon[s.icon];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card p-7 group hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-[var(--color-ink)] text-white group-hover:bg-[var(--color-green)] transition-colors">
                  <I className="w-6 h-6" />
                </span>
                <h3 className="font-display text-xl mt-5">{s.name}</h3>
                <p className="mt-2 text-[var(--color-muted)] leading-relaxed">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">
                  Learn more{" "}
                  <Icon.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================ WHY US (stats) ============================ */}
      <section className="bg-[var(--color-ink)] text-white">
        <div className="container-x py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow !text-[var(--color-green-300)]">Why NYC chooses us</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
              The details others skip are the ones we obsess over
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Anyone can roll paint on a wall. A finish you&apos;ll still love
              years from now comes from everything around it — protecting your
              floors, sanding between coats, cutting razor-sharp lines, and
              leaving your home cleaner than we found it.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                "Dedicated project manager on every job",
                "Background-checked, in-house crews",
                "Daily clean-up & dust containment",
                "Transparent, itemized fixed pricing",
                "Premium Benjamin Moore & Sherwin-Williams",
                "Written workmanship warranty",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Icon.check className="w-5 h-5 text-[var(--color-green-300)] mt-0.5 shrink-0" />
                  <span className="text-white/85">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "shield", t: "Licensed & insured", s: "$2M liability + workers' comp" },
              { icon: "leaf", t: "EPA Lead-Safe", s: "Certified for pre-1978 buildings" },
              { icon: "medal", t: `${site.warrantyYears}-yr warranty`, s: "In writing, on every job" },
              { icon: "pin", t: "Five boroughs", s: "Local crews, citywide reach" },
            ].map((s) => {
              const I = Icon[s.icon as keyof typeof Icon];
              return (
                <div
                  key={s.t}
                  className="rounded-2xl bg-white/[0.06] border border-white/10 p-7 backdrop-blur-sm"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-green)]/20 text-[var(--color-green-300)]">
                    <I className="w-6 h-6" />
                  </span>
                  <div className="font-display text-xl mt-4 text-white">{s.t}</div>
                  <div className="mt-1 text-sm text-white/65">{s.s}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="container-x py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
            A calm, predictable process
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            No surprises, no chaos. Here&apos;s exactly what to expect from first
            call to final walkthrough.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative">
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

      {/* ============================ AREAS ============================ */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Where we work</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
              Painting all five boroughs
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              Local crews who know your buildings, your boards, and your block.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="card p-6 group hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-2 text-[var(--color-green-600)]">
                  <Icon.pin className="w-5 h-5" />
                  <h3 className="font-display text-xl">{a.name}</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {a.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-green-600)]">
                  Painters in {a.name} <Icon.arrow className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ POPULAR IN NYC ============================ */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">Popular in NYC</span>
              <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
                Find your exact project
              </h2>
              <p className="mt-4 text-lg text-[var(--color-muted)]">
                Jump straight to the details and typical cost for the work you
                need.
              </p>
            </div>
            <Link href="/painting" className="btn btn-ghost">
              View all services <Icon.arrow className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularSlugs.map((slug) => {
              const p = moneyPages.find((m) => m.slug === slug);
              if (!p) return null;
              const I = Icon[p.icon];
              return (
                <Link
                  key={p.slug}
                  href={`/painting/${p.slug}`}
                  className="group flex items-center gap-3 rounded-xl bg-white border border-[var(--color-line)] px-4 py-3.5 hover:border-[var(--color-green)] hover:shadow-[var(--shadow-soft)] transition-all"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--color-green)]/12 text-[var(--color-green-600)] shrink-0">
                    <I className="w-5 h-5" />
                  </span>
                  <span className="font-medium text-[var(--color-ink)] capitalize">
                    {p.keyword}
                  </span>
                  <Icon.arrow className="w-4 h-4 ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-green-600)] group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ OUR PROMISE ============================ */}
      <section className="container-x py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">Our promise</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
            What you can count on
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            We&apos;d rather earn your trust with promises we keep than with
            numbers on a page. Here&apos;s exactly what every client gets.
          </p>
        </div>
        <div className="mt-12">
          <Guarantees />
        </div>
      </section>

      {/* ============================ FAQ + FORM ============================ */}
      <section className="container-x pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="font-display text-4xl mt-3 leading-tight">
              Questions, answered
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Still unsure about something? Call us at{" "}
              <a href={site.phoneHref} className="text-[var(--color-green-600)] font-semibold">
                {site.phone}
              </a>{" "}
              — we&apos;re happy to help.
            </p>
            <div className="mt-8">
              <Faq items={faqs} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28" id="estimate">
            <EstimateForm />
          </div>
        </div>
      </section>

      {/* ============================ FROM THE BLOG ============================ */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">From the blog</span>
              <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
                Painting tips for New Yorkers
              </h2>
              <p className="mt-4 text-lg text-[var(--color-muted)]">
                Costs, colors, and the decisions that actually matter — straight
                from our crews.
              </p>
            </div>
            <Link href="/blog" className="btn btn-ghost">
              Read the blog <Icon.arrow className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group card overflow-hidden flex flex-col hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={unsplash(p.cover.id, 800)}
                    alt={p.cover.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-[var(--color-green-600)] uppercase tracking-wide">
                    {p.category} · {p.readMinutes} min
                  </span>
                  <h3 className="font-display text-xl mt-2 leading-snug group-hover:text-[var(--color-green-600)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2 flex-1">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">
                    Read more <Icon.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <div className="h-20" />
    </>
  );
}
