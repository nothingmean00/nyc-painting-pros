export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="var(--color-ink)" />
        {/* roller handle */}
        <path
          d="M11 26v-3h7"
          stroke="var(--color-cream)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* roller head */}
        <rect
          x="16"
          y="11"
          width="15"
          height="7"
          rx="2"
          fill="var(--color-green)"
        />
        <path
          d="M31 14.5h2.5"
          stroke="var(--color-green)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* fresh paint drip */}
        <path
          d="M18 23v6"
          stroke="var(--color-green)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.15rem] leading-none tracking-tight">
        <span className="text-[var(--color-ink)]">NYC Painting</span>{" "}
        <span className="text-[var(--color-green-600)]">Pros</span>
      </span>
    </span>
  );
}
