import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { sortedPosts, unsplash } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Painting Tips & Guides | NYC Painting Pros Blog",
  description:
    "Practical painting advice for New Yorkers — apartment painting costs, color ideas, prep secrets, cabinet refinishing, co-op approvals and more, from NYC's painting pros.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="The blog"
        title="Painting tips & guides for New Yorkers"
        subtitle="Real, useful advice from the crews painting NYC apartments, brownstones, and businesses every day — costs, colors, prep, and the decisions that actually matter."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="container-x py-16 lg:py-24">
        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center card overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px] overflow-hidden">
            <Image
              src={unsplash(featured.cover.id, 1200)}
              alt={featured.cover.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              priority
            />
          </div>
          <div className="p-7 lg:pr-12 lg:py-10">
            <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <span className="inline-flex items-center rounded-full bg-[var(--color-green)]/12 text-[var(--color-green-600)] px-3 py-1 font-semibold text-xs uppercase tracking-wide">
                {featured.category}
              </span>
              <span>{formatDate(featured.date)}</span>
              <span>· {featured.readMinutes} min read</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl mt-4 leading-tight group-hover:text-[var(--color-green-600)] transition-colors">
              {featured.title}
            </h2>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed text-lg">
              {featured.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-[var(--color-green-600)]">
              Read article{" "}
              <Icon.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Rest grid */}
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group card overflow-hidden flex flex-col hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={unsplash(p.cover.id, 800)}
                  alt={p.cover.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-green-600)] uppercase tracking-wide">
                    {p.category}
                  </span>
                  <span>· {p.readMinutes} min</span>
                </div>
                <h3 className="font-display text-xl mt-3 leading-snug group-hover:text-[var(--color-green-600)] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3 flex-1">
                  {p.excerpt}
                </p>
                <span className="mt-4 text-sm text-[var(--color-muted)]">
                  {formatDate(p.date)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title="Reading is great. A flawless finish is better."
        subtitle={`Put our advice to work — get a free estimate or call ${site.phone}.`}
      />
      <div className="h-20" />
    </>
  );
}
