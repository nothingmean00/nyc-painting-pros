import sharp from "sharp";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, type ProjectPhoto } from "./project-photos";

export async function validateProjectPhotos(value: unknown): Promise<ProjectPhoto[]> {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_PHOTOS) throw new Error("Choose up to 3 photos.");
  const result: ProjectPhoto[] = [];
  for (const item of value) {
    if (!item || typeof item.content !== "string" || item.content.length > Math.ceil(MAX_PHOTO_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(item.content)) {
      throw new Error("A photo could not be read. Remove it and choose a JPEG, PNG, or WebP image.");
    }
    const bytes = Buffer.from(item.content, "base64");
    if (!bytes.length || bytes.length > MAX_PHOTO_BYTES) throw new Error("A photo is too large. Remove it and try a smaller image.");
    try {
      const image = sharp(bytes, { limitInputPixels: 40_000_000, failOn: "warning" });
      const meta = await image.metadata();
      if (!["jpeg", "png", "webp"].includes(meta.format ?? "") || (meta.pages ?? 1) > 1) throw new Error("Unsupported image");
      // Decode and re-encode: reject disguised files and remove EXIF/GPS metadata.
      const normalized = await image.rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).flatten({ background: "#ffffff" }).jpeg({ quality: 78 }).toBuffer();
      if (normalized.length > MAX_PHOTO_BYTES) throw new Error("Image too large");
      result.push({ content: normalized.toString("base64") });
    } catch {
      throw new Error("A photo could not be processed. Remove it and choose a different JPEG, PNG, or WebP image.");
    }
  }
  return result;
}
