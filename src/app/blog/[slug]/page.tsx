import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icons";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { posts, getPost, sortedPosts, unsplash } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: `${site.url}/blog/${p.slug}`,
      images: [{ url: unsplash(p.cover.id, 1200) }],
      publishedTime: p.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const related = sortedPosts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: p.title, path: `/blog/${p.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: unsplash(p.cover.id, 1200),
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbs(trail)]} />

      <article>
        {/* Header */}
        <div className="container-x pt-10 lg:pt-14">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
            <Link href="/" className="hover:text-[var(--color-green-600)]">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/blog" className="hover:text-[var(--color-green-600)]">Blog</Link>
            <span className="opacity-50">/</span>
            <span className="text-[var(--color-ink)] truncate max-w-[60vw]">{p.category}</span>
          </nav>

          <div className="max-w-3xl mt-6">
            <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <span className="inline-flex items-center rounded-full bg-[var(--color-green)]/12 text-[var(--color-green-600)] px-3 py-1 font-semibold text-xs uppercase tracking-wide">
                {p.category}
              </span>
              <span>{formatDate(p.date)}</span>
              <span>· {p.readMinutes} min read</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.08]">
              {p.title}
            </h1>
            <p className="mt-5 text-xl text-[var(--color-muted)] leading-relaxed">
              {p.excerpt}
            </p>
            <p className="mt-5 text-sm text-[var(--color-muted)]">
              By {p.author}
            </p>
          </div>
        </div>

        {/* Cover */}
        <div className="container-x mt-8">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-[var(--color-line)]">
            <Image
              src={unsplash(p.cover.id, 1600)}
              alt={p.cover.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <div className="container-x py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            {p.intro.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="text-lg leading-relaxed text-[var(--color-ink)] [&:not(:first-child)]:mt-5 first:text-xl first:text-[var(--color-ink)]"
              >
                {para}
              </p>
            ))}

            {p.blocks.map((block) => (
              <section key={block.h2} className="mt-10">
                <h2 className="font-display text-2xl sm:text-3xl leading-snug">
                  {block.h2}
                </h2>
                {block.body.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]"
                  >
                    {para}
                  </p>
                ))}
                {block.bullets && (
                  <ul className="mt-5 space-y-3">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Icon.check className="w-5 h-5 text-[var(--color-green-600)] mt-0.5 shrink-0" />
                        <span className="text-[var(--color-ink)] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {p.takeaway && (
              <div className="mt-10 rounded-2xl bg-[var(--color-cream-200)]/60 border-l-4 border-[var(--color-green)] p-6">
                <div className="flex items-center gap-2 text-[var(--color-green-600)] font-semibold text-sm uppercase tracking-wide">
                  <Icon.check className="w-4 h-4" /> The takeaway
                </div>
                <p className="mt-2 text-lg text-[var(--color-ink)] leading-relaxed">
                  {p.takeaway}
                </p>
              </div>
            )}

            {/* Author / CTA card */}
            <div className="mt-12 rounded-2xl bg-[var(--color-ink)] text-white p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
              <div>
                <h3 className="font-display text-2xl">Got a project in mind?</h3>
                <p className="mt-1 text-white/70">
                  Free, no-obligation estimates across all five boroughs.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/contact" className="btn btn-primary">
                  Free estimate
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost !text-white !border-white/40 hover:!bg-white hover:!text-[var(--color-ink)]">
                  <Icon.phone className="w-4 h-4" /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-[var(--color-cream-200)]/50 border-y border-[var(--color-line)]">
        <div className="container-x py-16">
          <h2 className="font-display text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group card overflow-hidden flex flex-col hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={unsplash(r.cover.id, 800)}
                    alt={r.cover.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-[var(--color-green-600)] uppercase tracking-wide">
                    {r.category}
                  </span>
                  <h3 className="font-display text-lg mt-2 leading-snug group-hover:text-[var(--color-green-600)] transition-colors">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <div className="h-20" />
    </>
  );
}
