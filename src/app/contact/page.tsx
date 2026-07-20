import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
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

const items = [
  { icon: "phone" as const, label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: "quote" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: "pin" as const,
    label: "Office",
    value: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
  },
  { icon: "clock" as const, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Get in touch"
        title="Let's get your free estimate"
        subtitle="Tell us about the space, surface condition, access, and timeline. A project manager will review the details and confirm the right next step."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-display text-3xl">Talk to a real person</h2>
          <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
            Prefer to talk it through? We&apos;re happy to answer questions, give
            ballpark pricing, and schedule a walkthrough at your convenience.
          </p>
          <div className="mt-8 space-y-4">
            {items.map((it) => {
              const I = Icon[it.icon];
              const content = (
                <div className="flex items-start gap-4 card p-5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-green)]/12 text-[var(--color-green-600)] shrink-0">
                    <I className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-[var(--color-muted)]">
                      {it.label}
                    </span>
                    <span className="block font-semibold mt-0.5">{it.value}</span>
                  </span>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href} className="block hover:opacity-90">
                  {content}
                </a>
              ) : (
                <div key={it.label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-[var(--color-ink)] text-white p-6">
            <div className="flex items-center gap-2 text-[var(--color-green-300)]">
              <Icon.shield className="w-5 h-5" />
              <span className="font-semibold">Building paperwork coordinated</span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              If your building requires a Certificate of Insurance or specific
              additional-insured language, include it with your request so we
              can confirm the project requirements.
            </p>
          </div>
        </div>

        <div id="estimate">
          <EstimateForm />
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
