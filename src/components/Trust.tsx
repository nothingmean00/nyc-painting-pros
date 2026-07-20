import { Icon, type IconName } from "./Icons";
import { guarantees } from "@/lib/site";

export function Guarantees({ limit }: { limit?: number }) {
  const list = limit ? guarantees.slice(0, limit) : guarantees;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((g) => {
        const I = Icon[g.icon as IconName];
        return (
          <div key={g.title} className="card p-7 flex flex-col h-full">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-[var(--color-green)]/12 text-[var(--color-green-600)]">
              <I className="w-6 h-6" />
            </span>
            <h3 className="font-display text-xl mt-5">{g.title}</h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">{g.text}</p>
          </div>
        );
      })}
    </div>
  );
}

const credentials = [
  "Detailed written scopes",
  "Surface-specific preparation",
  "Building requirements coordinated",
  "Written warranty",
] as const;

export function CredentialStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {credentials.map((c) => (
        <span
          key={c}
          className={`inline-flex items-center gap-2 ${
            dark ? "text-white/85" : "text-[var(--color-muted)]"
          }`}
        >
          <Icon.check
            className={`w-4 h-4 ${dark ? "text-[var(--color-green-300)]" : "text-[var(--color-green-600)]"}`}
          />
          {c}
        </span>
      ))}
    </div>
  );
}
