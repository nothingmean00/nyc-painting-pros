"use client";

import { useState } from "react";

export function Faq({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 hover:bg-[var(--color-cream)]/60 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg leading-snug">{item.q}</span>
              <span
                className={`shrink-0 grid place-items-center w-8 h-8 rounded-full border border-[var(--color-line)] transition-transform ${
                  isOpen ? "rotate-45 bg-[var(--color-green)] text-white border-transparent" : ""
                }`}
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-5 text-[var(--color-muted)] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
