"use client";

import { useRef, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { trackCallClick } from "@/lib/track-call-click";
import type { CallPlacement } from "@/lib/call-events";

export function PhoneReveal({ placement, className }: { placement: CallPlacement; className?: string }) {
  const [revealed, setRevealed] = useState(false);
  const recorded = useRef(false);

  return <button
    type="button"
    className={`${className ?? ""} ${revealed ? "select-text cursor-text" : "cursor-pointer hover:underline"}`}
    data-call-location={placement}
    aria-label={revealed ? `Phone number: ${site.phone}` : "Show NYC Painting Pros phone number"}
    onClick={() => {
      if (recorded.current) return;
      recorded.current = true;
      setRevealed(true);
      trackCallClick(placement);
    }}
  >
    <Phone className="size-3.5" aria-hidden="true" />
    <span aria-live="polite">{revealed ? site.phone : "Call us"}</span>
  </button>;
}
