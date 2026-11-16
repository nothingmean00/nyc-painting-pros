"use client";

import type { ReactNode } from "react";
import type { CallPlacement } from "@/lib/call-events";
import { site } from "@/lib/site";
import { trackCallClick } from "@/lib/track-call-click";

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
      trackCallClick(placement);
      onClick?.();
    }}
  >{children}</a>;
}
