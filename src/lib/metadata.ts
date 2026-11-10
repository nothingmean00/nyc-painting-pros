import type { Metadata } from "next";
import { site } from "./site";

export function withRouteSocial(metadata: Metadata, path: string): Metadata {
  const rawTitle = typeof metadata.title === "string" ? metadata.title : metadata.title && "absolute" in metadata.title ? metadata.title.absolute : site.name;
  const title = rawTitle.includes(site.name) ? rawTitle : `${rawTitle} | ${site.name}`;
  const description = conciseDescription(metadata.description ?? site.description);
  return { ...metadata, title: { absolute: title }, description, ...socialMetadata(title, description, path) };
}

export function socialMetadata(title: string, description: string, path: string) {
  return {
    openGraph: {
      type: "website" as const,
      title,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      images: [{ url: `${site.url}/og-positioning.png`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [`${site.url}/og-positioning.png`],
    },
  };
}

export function conciseDescription(text: string, maxLength = 160) {
  if (text.length <= maxLength) return text;

  const candidate = text.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const cleanCut = lastSpace > maxLength * 0.75 ? candidate.slice(0, lastSpace) : candidate;

  return `${cleanCut.replace(/[\s,;:—-]+$/, "")}…`;
}
