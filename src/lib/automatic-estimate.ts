import "server-only";

export type QuoteDocument = { scope: string; totalCents: number; timing: string };

export function automaticEstimateEnabled() {
  return Boolean(rateCard());
}

function rateCard() {
  if (process.env.LEAD_AUTO_QUOTE_ENABLED !== "true") return null;
  // ASAP Repair's NYC labor catalog, reviewed November 26, 2026. The
  // published small-room range is $450–$645, with paint supplied separately.
  const benchmark = Number(process.env.LEAD_AUTO_QUOTE_MARKET_CENTS ?? 54750);
  const tax = process.env.LEAD_AUTO_QUOTE_TAX ?? "additional";
  if (!Number.isSafeInteger(benchmark) || benchmark <= 0 || benchmark > 110000
    || (tax !== "included" && tax !== "additional")) return null;
  return { totalCents: Math.round(benchmark * 0.9), tax };
}

export function readWallEstimate(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as { length?: unknown; width?: unknown; height?: unknown; conditionsConfirmed?: unknown };
  const { length, width, height } = input;
  if (input.conditionsConfirmed !== true || typeof length !== "number" || typeof width !== "number"
    || typeof height !== "number" || ![length, width, height].every(Number.isFinite)
    || length < 6 || width < 6 || height < 7 || length > 15 || width > 15 || height > 12) return null;
  return { length, width, height };
}

export function makeAutomaticEstimate(
  service: string, details: string, wallEstimate: ReturnType<typeof readWallEstimate>,
): QuoteDocument | null {
  const rates = rateCard();
  if (!rates || !wallEstimate || service !== "Interior Painting") return null;
  const { length, width, height } = wallEstimate;
  if (length * width > 120 || height > 9 || 2 * (length + width) * height > 400) return null;
  // Free-form requests that could conflict with the package take the ordinary review path.
  if (/\b(?:ceiling|trim|doors?|baseboards?|wallpaper|patch|repair|plaster|mold|leak|damage|lead paint|asbestos|high walls|scaffold|commercial|coi|insurance)\b/i.test(details)) return null;
  const tax = rates.tax === "included" ? "Price includes applicable tax." : "Applicable tax is additional.";
  return {
    totalCents: rates.totalCents,
    scope: [
      `Repaint the walls of one room measuring ${length} x ${width} ft. with ${height} ft. ceiling height.`,
      "Includes standard floor protection and two finish coats on sound, previously painted walls. Customer supplies paint.",
      "Walls only. Repairs, ceilings, trim, doors, and special access are outside this estimate.",
    ].join("\n\n"),
    timing: `${tax} Based on the measurements and conditions provided. We’ll confirm access, scope, and scheduling before booking. Any change to the scope requires a revised estimate.`,
  };
}
