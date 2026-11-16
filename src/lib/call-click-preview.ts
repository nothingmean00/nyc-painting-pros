import "server-only";

import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "./site";
import { isCallClickInput, type CallClickInput } from "./call-events";

// Explicit local-preview storage. Never use a function's temporary filesystem on Vercel.
export function callClickPreviewDirectory() {
  return !process.env.VERCEL && process.env.CALL_CLICK_PREVIEW_STORE
    ? path.resolve(process.env.CALL_CLICK_PREVIEW_STORE) : undefined;
}

export async function recordPreviewCallClick(directory: string, input: CallClickInput) {
  await mkdir(directory, { recursive: true });
  try {
    await writeFile(path.join(directory, `${input.id}.json`), JSON.stringify({
      id: input.id, page: input.page, placement: input.placement,
      createdAt: new Date().toISOString(), destination: site.phone,
    }), { flag: "wx", mode: 0o600 });
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") return false;
    throw error;
  }
}

export async function getPreviewCallClickReport(directory: string) {
  await mkdir(directory, { recursive: true });
  const files = (await readdir(directory)).filter((file) => /^[0-9a-f-]{36}\.json$/i.test(file));
  const clicks = (await Promise.all(files.map(async (file) => {
    const value = JSON.parse(await readFile(path.join(directory, file), "utf8")) as Record<string, unknown>;
    const { createdAt, destination } = value;
    if (!isCallClickInput(value) || typeof createdAt !== "string" || !Number.isFinite(Date.parse(createdAt)) || typeof destination !== "string") throw new Error("Invalid preview click record.");
    return { ...value, destination, createdAt };
  }))).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" });
  return {
    mode: "local-preview" as const,
    total: clicks.length,
    today: clicks.filter((click) => day.format(new Date(click.createdAt)) === day.format(new Date())).length,
    week: clicks.filter((click) => Date.parse(click.createdAt) >= Date.now() - 7 * 86400000).length,
    clicks: clicks.slice(0, 100),
  };
}
