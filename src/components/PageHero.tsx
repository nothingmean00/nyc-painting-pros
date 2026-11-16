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
    <section className="border-b border-[var(--color-line)]">
      <div className="container-x pt-8 pb-12 lg:pt-10 lg:pb-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
          {crumbs.map((c, i) => (
            <span key={c.path} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="opacity-50">/</span>}
              {i < crumbs.length - 1 ? (
                <Link href={c.path} className="hover:text-[var(--color-green-600)]">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-[var(--color-ink)]">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow mt-6 block">{eyebrow}</span>}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.05] max-w-4xl">
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
