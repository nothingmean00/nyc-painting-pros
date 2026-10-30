"use client";

import { useId, useState } from "react";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, type ProjectPhoto } from "@/lib/project-photos";

async function preparePhoto(file: File): Promise<ProjectPhoto> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Please use JPEG, PNG, or WebP photos. Export HEIC photos as JPEG first.");
  if (file.size > 20_000_000) throw new Error("Choose photos smaller than 20 MB each.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40_000_000) throw new Error("This photo is too large. Try a smaller version.");
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Your browser could not prepare this photo.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.8, 0.65, 0.5]) {
      const content = canvas.toDataURL("image/jpeg", quality).split(",")[1];
      if (content && content.length * 0.75 <= MAX_PHOTO_BYTES) return { content };
    }
    throw new Error("This photo is too detailed to upload. Try a smaller version.");
  } finally {
    bitmap.close();
  }
}

export function ProjectPhotoPicker({ photos, onChange, disabled, busy, onBusyChange }: {
  photos: ProjectPhoto[]; onChange: (photos: ProjectPhoto[]) => void; disabled: boolean;
  busy: boolean; onBusyChange: (busy: boolean) => void;
}) {
  const helpId = useId();
  const [error, setError] = useState("");
  return <fieldset className="grid gap-3 min-w-0" disabled={disabled || busy}>
    <legend className="text-sm font-medium mb-2">Project photos (optional)</legend>
    <p id={helpId} className="text-sm text-[var(--color-muted)]">Add up to 3 JPEG, PNG, or WebP photos, up to 20 MB each. We resize them for upload. Show the room or surface; avoid people and personal documents.</p>
    <input aria-label="Add project photos" aria-describedby={helpId} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={disabled || busy || photos.length >= MAX_PHOTOS}
      className="block w-full min-w-0 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-3 file:font-medium"
      onChange={async (event) => {
        const files = Array.from(event.currentTarget.files ?? []);
        event.currentTarget.value = "";
        setError("");
        if (photos.length + files.length > MAX_PHOTOS) { setError("You can add up to 3 photos. Remove one before adding another."); return; }
        onBusyChange(true);
        try {
          const prepared: ProjectPhoto[] = [];
          for (const file of files) prepared.push(await preparePhoto(file));
          onChange([...photos, ...prepared]);
        } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to read that photo. Try a different image."); }
        finally { onBusyChange(false); }
      }} />
    {busy && <p role="status" className="text-sm">Preparing photos...</p>}
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    {photos.length > 0 && <ul className="grid grid-cols-3 gap-3" aria-label="Selected project photos">
      {photos.map((photo, index) => <li key={index} className="min-w-0">
        {/* Data URLs are local previews, never sent to analytics. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${photo.content}`} alt={`Selected project photo ${index + 1}`} className="aspect-square w-full rounded-lg object-cover" />
        <button type="button" onClick={() => { onChange(photos.filter((_, i) => i !== index)); setError(""); }} className="mt-1 min-h-11 text-sm underline" aria-label={`Remove photo ${index + 1}`}>Remove</button>
      </li>)}
    </ul>}
    <p className="text-xs text-[var(--color-muted)]">Photos are sent only when you submit your estimate request and are kept with your private project details.</p>
  </fieldset>;
}
