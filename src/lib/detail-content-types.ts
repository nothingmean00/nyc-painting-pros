import type { MoneyPage } from "./money-pages";
import type { Post } from "./blog";

export type DetailPair = {
  money: Omit<MoneyPage, "icon" | "relatedAreas" | "planningLinks">;
  blog: Omit<Post, "date" | "author" | "cover" | "relatedPages" | "references" | "readMinutes">;
};

export function buildDetailContent(pairs: DetailPair[]) {
  const pages: MoneyPage[] = pairs.map(({ money, blog }) => ({
    ...money,
    updated: "2026-11-10",
    icon: "roller",
    relatedAreas: ["manhattan", "brooklyn", "queens", "bronx", "staten-island"],
    planningLinks: [{ label: blog.title, href: `/blog/${blog.slug}` }],
  }));
  const posts: Post[] = pairs.map(({ money, blog }) => {
    const words = JSON.stringify([blog.intro, blog.blocks, blog.takeaway]).split(/\s+/).length;
    return {
      ...blog,
      date: "2026-11-10",
      author: "NYC Painting Pros Team",
      cover: { id: "photo-1562259949-e8e7689d7828", alt: "Illustrative interior painting preparation with a roller" },
      readMinutes: Math.max(3, Math.ceil(words / 200)),
      relatedPages: [money.slug, ...(money.relatedPages ?? [])],
      references: money.references,
    };
  });
  return { pages, posts };
}
