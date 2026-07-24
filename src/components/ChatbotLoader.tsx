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
        track("painting_assistant_opened");
      }}
      className="fixed bottom-4 right-3 z-40 flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 font-semibold text-white shadow-xl hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      aria-label="Open Painting Project Assistant"
    >
      <MessageCircle className="h-5 w-5 text-[var(--color-green-300)]" />
      <span className="hidden min-[360px]:inline">Plan my project</span>
    </button>
  );
}
