"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { track } from "@vercel/analytics";

const PaintingScopeChat = dynamic(
  () => import("@/components/PaintingScopeChat").then((module) => module.PaintingScopeChat),
  { ssr: false },
);

export function ChatbotLoader() {
  const [open, setOpen] = useState(false);

  if (open) return <PaintingScopeChat onClose={() => setOpen(false)} />;

  return (
    <button
      type="button"
      onClick={() => {
        setOpen(true);
        try {
          track("painting_assistant_opened");
        } catch {
          // Optional analytics must not interrupt project planning.
        }
      }}
      className="mx-auto my-6 flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 font-semibold text-white shadow-xl hover:-translate-y-0.5 sm:fixed sm:bottom-6 sm:right-6 sm:z-40 sm:m-0"
      aria-label="Open Painting Project Assistant"
    >
      <MessageCircle className="h-5 w-5 text-[var(--color-green-300)]" />
      <span>Plan my project</span>
    </button>
  );
}
