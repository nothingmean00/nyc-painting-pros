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
      <div className="editorial-cta">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-[var(--color-muted)] text-lg">{subtitle}</p>
        </div>
        <Link href={href} className="btn btn-primary text-base">
          Get a Free Estimate <Icon.arrow className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
