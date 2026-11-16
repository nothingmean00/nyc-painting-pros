import Link from "next/link";
import { Logo } from "./Logo";
import { CallLink } from "./CallLink";
import { Icon } from "./Icons";
import { site, services, areas } from "@/lib/site";
import { moneyPages } from "@/lib/money-pages";

const footerProjectSlugs = [
  "apartment-painting-nyc",
  "upper-east-side-apartment-painters",
  "tribeca-loft-painting",
  "park-slope-brownstone-painters",
  "long-island-city-condo-painting",
  "williamsburg-office-painting",
  "move-in-apartment-painting-nyc",
  "popcorn-ceiling-removal-nyc",
  "apartment-building-lobby-hallway-painting-nyc",
];

const footerProjects = footerProjectSlugs
  .map((slug) => moneyPages.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x py-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_.8fr_1.1fr]">
        <div>
          <Link href="/" aria-label="NYC Painting Pros home" className="inline-flex max-w-full">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            {site.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 py-1">
              <Icon.shield className="w-3.5 h-3.5 text-[var(--color-green-600)]" />
              Detailed Written Scopes
            </span>
            <span className="inline-flex items-center gap-1.5 py-1">
              <Icon.leaf className="w-3.5 h-3.5 text-[var(--color-green-600)]" />
              Low-VOC Options
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-[var(--color-ink)] font-semibold mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-[var(--color-green-600)] transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/painting"
                className="inline-flex items-center gap-1 text-[var(--color-green-600)] font-medium hover:underline"
              >
                All NYC projects &amp; costs →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[var(--color-ink)] font-semibold mb-4">Popular Projects</h3>
          <ul className="space-y-2.5 text-sm">
            {footerProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/painting/${p.slug}`}
                  className="hover:text-[var(--color-green-600)] transition-colors"
                >
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[var(--color-ink)] font-semibold mb-4">Areas We Serve</h3>
          <ul className="space-y-2.5 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="hover:text-[var(--color-green-600)] transition-colors"
                >
                  Painters in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[var(--color-ink)] font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="inline-flex items-center gap-2">
              <Icon.pin className="w-4 h-4 shrink-0 text-[var(--color-green-600)]" />
              {site.address.street}, {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon.clock className="w-4 h-4 shrink-0 text-[var(--color-green-600)]" />
              {site.hours}
            </li>
            <li>
              <CallLink placement="footer" className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--color-green-600)]">
                <Icon.phone className="w-4 h-4 shrink-0 text-[var(--color-green-600)]" />
                {site.phone}
              </CallLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--color-green-600)]">
                {site.email}
              </a>
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-5">
            Free Estimate <Icon.arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="container-x pb-8 flex flex-col gap-3 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <span>Building paperwork coordinated · Detailed written scopes · Final walkthrough</span>
        <span className="flex flex-wrap gap-4"><span>{site.hours}</span><a href={`mailto:${site.email}`} className="font-semibold">{site.email}</a></span>
      </div>
      <div className="border-t border-[var(--color-line)]">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/about" className="hover:text-[var(--color-ink)] transition-colors">About our process</Link>
            <Link href="/guarantee" className="hover:text-[var(--color-ink)] transition-colors">Our process</Link>
            <Link href="/blog" className="hover:text-[var(--color-ink)] transition-colors">Painting guides</Link>
            <Link href="/privacy" className="hover:text-[var(--color-ink)] transition-colors">
              Privacy
            </Link>
            <span>Serving all five boroughs of New York City</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
