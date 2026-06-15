import Link from "next/link";
import { Icon } from "./Icons";
import { site } from "@/lib/site";

export function CTASection({
  title = "Ready for a flawless finish?",
  subtitle = "Get a free, no-obligation estimate today. Most quotes back within 24 hours.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-ink)] text-white px-6 sm:px-12 py-14 sm:py-16 paint-grid">
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "var(--color-green)", opacity: 0.25 }}
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-white/75 text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn btn-primary text-base">
              Get a Free Estimate <Icon.arrow className="w-5 h-5" />
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base !text-white !border-white/40 hover:!bg-white hover:!text-[var(--color-ink)]">
              <Icon.phone className="w-5 h-5" /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
