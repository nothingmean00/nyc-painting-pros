export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-stretch gap-3 ${className}`}>
      <span
        className="w-[5px] shrink-0 rounded-full bg-[var(--color-green)]"
        aria-hidden="true"
      />
      <span className="flex flex-col justify-center leading-none">
        <span className="flex items-baseline gap-1.5 text-[var(--color-ink)]">
          <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.16em]">
            NYC
          </span>
          <span className="font-display text-[1.18rem] tracking-[-0.04em]">
            Painting Pros
          </span>
        </span>
        <span className="mt-1.5 text-[0.53rem] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Homes · Buildings · Businesses
        </span>
      </span>
    </span>
  );
}
