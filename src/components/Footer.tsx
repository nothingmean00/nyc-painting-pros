import Link from "next/link";
import { Logo } from "./Logo";
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
];

const footerProjects = footerProjectSlugs
  .map((slug) => moneyPages.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-cream)]/80 mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="bg-[var(--color-cream)] inline-flex rounded-xl px-3 py-2">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            {site.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1">
              <Icon.shield className="w-3.5 h-3.5 text-[var(--color-green-300)]" />
              Detailed Written Scopes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1">
              <Icon.leaf className="w-3.5 h-3.5 text-[var(--color-green-300)]" />
              Low-VOC Options
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-[var(--color-green-300)] transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/painting"
                className="inline-flex items-center gap-1 text-[var(--color-green-300)] font-medium hover:underline"
              >
                All NYC projects &amp; costs →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Popular Projects</h3>
          <ul className="space-y-2.5 text-sm">
            {footerProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/painting/${p.slug}`}
                  className="hover:text-[var(--color-green-300)] transition-colors"
                >
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Areas We Serve</h3>
          <ul className="space-y-2.5 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="hover:text-[var(--color-green-300)] transition-colors"
                >
                  Painters in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 text-white font-semibold text-base hover:text-[var(--color-green-300)]"
              >
                <Icon.phone className="w-4 h-4" /> {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon.pin className="w-4 h-4 shrink-0 text-[var(--color-green-300)]" />
              {site.address.street}, {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon.clock className="w-4 h-4 shrink-0 text-[var(--color-green-300)]" />
              {site.hours}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--color-green-300)]">
                {site.email}
              </a>
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary mt-5">
            Free Estimate <Icon.arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-cream)]/55">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>Serving all five boroughs of New York City</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
