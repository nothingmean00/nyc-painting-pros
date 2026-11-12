import Link from "next/link";
import { Icon } from "./Icons";

export function CTASection({
  title = "Need a painting estimate?",
  subtitle = "Tell us what needs painting and when. Photos are helpful, but you can send your request without them.",
  href = "/contact",
}: {
  title?: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-ink)] text-white px-6 sm:px-12 py-14 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-white/75 text-lg">{subtitle}</p>
          <div className="mt-8">
            <Link href={href} className="btn btn-primary text-base">
              Get a Free Estimate <Icon.arrow className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
