import type { BlogPhoto } from "@/lib/blog-images";

export function PhotoCredit({ photo }: { photo: BlogPhoto }) {
  if (!photo.photographer || !photo.photographerUrl || !photo.photoUrl) return null;
  return <p className="px-1 py-2 text-xs leading-relaxed text-[var(--color-muted)]">Illustrative photo by <a className="underline underline-offset-2" href={photo.photographerUrl} rel="noopener noreferrer" target="_blank">{photo.photographer}</a> on <a className="underline underline-offset-2" href={photo.photoUrl} rel="noopener noreferrer" target="_blank">Unsplash</a>.</p>;
}
