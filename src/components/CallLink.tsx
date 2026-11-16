"use client";

import type { ReactNode } from "react";
import type { CallPlacement } from "@/lib/call-events";
import { site } from "@/lib/site";

export function CallLink({ placement, className, children, onClick }: {
  placement: CallPlacement;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return <a
    href={site.phoneHref}
    aria-label={`Call NYC Painting Pros at ${site.phone}`}
    data-call-location={placement}
    className={className}
    onClick={() => {
      // Count explicit activations only. Never hold up the phone app for analytics.
      try {
        void fetch("/api/call-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: crypto.randomUUID(), page: window.location.pathname, placement }),
          keepalive: true,
        }).catch(() => {});
      } catch { /* Calling still works when tracking is unavailable. */ }
      onClick?.();
    }}
  >{children}</a>;
}
