"use client";

import { useState } from "react";

// Photo-free before/after: two stylized "wall" panels with a drag slider.
// Swap the panel backgrounds for real <img> elements once you have project photos.
export function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-line)] shadow-[var(--shadow-lift)] select-none">
      {/* AFTER (full, underneath) */}
      <Panel state="after" />
      {/* BEFORE (clipped on top) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Panel state="before" />
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

function Panel({ state }: { state: "before" | "after" }) {
  const before = state === "before";
  return (
    <div
      className="absolute inset-0"
      style={{
        background: before
          ? "linear-gradient(160deg,#9a958c,#827d73 60%,#6f6a61)"
          : "linear-gradient(160deg,#f6efe2,#efe6d3 55%,#e7d9bf)",
      }}
    >
      {/* simple "room" geometry */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* wall accent */}
        <rect
          x="40"
          y="50"
          width="150"
          height="200"
          fill={before ? "#736e65" : "var(--color-ink)"}
          opacity={before ? 0.5 : 1}
        />
        {/* window / frame */}
        <rect
          x="240"
          y="80"
          width="110"
          height="120"
          rx="4"
          fill="none"
          stroke={before ? "#5f5b53" : "#ffffff"}
          strokeWidth="6"
        />
        <line x1="295" y1="80" x2="295" y2="200" stroke={before ? "#5f5b53" : "#ffffff"} strokeWidth="4" />
        <line x1="240" y1="140" x2="350" y2="140" stroke={before ? "#5f5b53" : "#ffffff"} strokeWidth="4" />
        {/* peeling / stains for before */}
        {before && (
          <>
            <path d="M60 60 q10 20 -4 36" stroke="#5a564f" strokeWidth="3" fill="none" opacity="0.6" />
            <circle cx="150" cy="180" r="18" fill="#5f5b53" opacity="0.35" />
            <path d="M100 220 q20 -10 40 4" stroke="#5a564f" strokeWidth="3" fill="none" opacity="0.5" />
          </>
        )}
        {/* baseboard */}
        <rect x="0" y="250" width="400" height="16" fill={before ? "#5f5b53" : "#ffffff"} />
      </svg>
    </div>
  );
}
