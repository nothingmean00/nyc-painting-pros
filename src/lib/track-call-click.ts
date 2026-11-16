import type { CallPlacement } from "./call-events";

export function trackCallClick(placement: CallPlacement) {
  try {
    void fetch("/api/call-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), page: window.location.pathname, placement }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* Revealing the number and calling still work if tracking is unavailable. */ }
}
