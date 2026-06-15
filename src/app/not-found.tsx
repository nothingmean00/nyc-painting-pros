import Link from "next/link";
import { Icon } from "@/components/Icons";
import { services } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-x py-24 lg:py-32 text-center">
      <div className="font-display text-7xl text-[var(--color-green)]/30">404</div>
      <h1 className="font-display text-4xl mt-2">This wall doesn&apos;t exist</h1>
      <p className="mt-4 text-[var(--color-muted)] max-w-md mx-auto">
        The page you&apos;re looking for may have moved. Let&apos;s get you back
        to a fresh coat.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back home <Icon.arrow className="w-4 h-4" />
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Free estimate
        </Link>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="text-sm rounded-full border border-[var(--color-line)] px-3 py-1.5 hover:border-[var(--color-green)] hover:text-[var(--color-green-600)]"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
