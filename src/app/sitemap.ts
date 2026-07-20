import type { MetadataRoute } from "next";
import { site, services, areas } from "@/lib/site";
import { moneyPages } from "@/lib/money-pages";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/areas", "/painting", "/blog", "/guarantee", "/about", "/contact", "/privacy"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    // Money pages — highest commercial intent, prioritized for crawl.
    ...moneyPages.map((p) => ({
      url: `${site.url}/painting/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...areas.map((a) => ({
      url: `${site.url}/areas/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
