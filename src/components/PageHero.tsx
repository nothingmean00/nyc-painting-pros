import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 80% at 80% -20%, rgba(22,146,79,0.12), transparent 55%)",
        }}
      />
      <div className="container-x pt-10 pb-12 lg:pt-14 lg:pb-16">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
          {crumbs.map((c, i) => (
            <span key={c.path} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="opacity-50">/</span>}
              {i < crumbs.length - 1 ? (
                <Link href={c.path} className="hover:text-[var(--color-green-600)]">
                  {c.name}
                </Link>
              ) : (
                <span className="text-[var(--color-ink)]">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow mt-6 block">{eyebrow}</span>}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 leading-[1.05] max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg text-[var(--color-muted)] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
