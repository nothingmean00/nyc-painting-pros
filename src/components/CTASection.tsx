import Link from "next/link";
import { Icon } from "./Icons";

export function CTASection({
  title = "Ready to plan your project?",
  subtitle = "Tell us what you are working on and we will recommend the right scope, finish, and next step.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-ink)] text-white px-6 sm:px-12 py-14 sm:py-16 paint-grid">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-white/75 text-lg">{subtitle}</p>
          <div className="mt-8">
            <Link href="/contact" className="btn btn-primary text-base">
              Get a Free Estimate <Icon.arrow className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
