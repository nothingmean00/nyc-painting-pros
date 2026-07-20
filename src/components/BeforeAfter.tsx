"use client";

import Image from "next/image";
import { useState } from "react";

function unsplashImage(id: string, w = 1400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-line)] shadow-[var(--shadow-lift)] select-none">
      <Panel
        src={unsplashImage("photo-1562259949-e8e7689d7828")}
        alt="Painter applying a fresh finish to an interior wall"
        tone="after"
        priority
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Panel
          src={unsplashImage("photo-1513161455079-7dc1de15ef3e")}
          alt="Paint prep tools arranged before an interior painting project"
          tone="before"
        />
      </div>

      {/* labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider bg-black/55 text-white px-2.5 py-1 rounded-full">
        Before
      </span>
      <span className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider bg-[var(--color-green)] text-white px-2.5 py-1 rounded-full">
        After
      </span>

      {/* divider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-white shadow-lg grid place-items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}

function Panel({
  src,
  alt,
  tone,
  priority = false,
}: {
  src: string;
  alt: string;
  tone: "before" | "after";
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 bg-[var(--color-ink)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover ${
          tone === "before" ? "grayscale contrast-110 brightness-75" : "brightness-105"
        }`}
        priority={priority}
      />
      <div
        className={`absolute inset-0 ${
          tone === "before"
            ? "bg-[var(--color-ink)]/35"
            : "bg-gradient-to-tr from-[var(--color-ink)]/15 via-transparent to-white/10"
        }`}
      />
    </div>
  );
}
