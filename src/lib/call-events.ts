export const callPlacements = ["header", "mobile-header", "mobile-menu", "footer", "contact"] as const;
export type CallPlacement = (typeof callPlacements)[number];

export type CallClickInput = { id: string; page: string; placement: CallPlacement };

export function isCallClickInput(value: unknown): value is CallClickInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  return typeof input.id === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.id)
    && typeof input.page === "string"
    && input.page.length <= 300
    && /^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(input.page)
    && !input.page.startsWith("/admin")
    && callPlacements.includes(input.placement as CallPlacement);
}
