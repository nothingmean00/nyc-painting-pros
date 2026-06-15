"use client";

import { useState } from "react";
import { Icon } from "./Icons";
import { services, site } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function EstimateForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        `We couldn't send that just now. Please call us at ${site.phone}.`
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-green)]/15 text-[var(--color-green-600)] grid place-items-center">
          <Icon.check className="w-7 h-7" />
        </div>
        <h3 className="font-display text-2xl mt-4">Request received!</h3>
        <p className="text-[var(--color-muted)] mt-2">
          Thanks — a project manager will reach out within one business hour
          (usually much sooner) to confirm the details of your free estimate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8 grid gap-4" noValidate>
      {!compact && (
        <div>
          <h3 className="font-display text-2xl">Get your free estimate</h3>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            No obligation. Most quotes back within 24 hours.
          </p>
        </div>
      )}
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
        >
          {error}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="name" autoComplete="name" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Neighborhood / ZIP" name="location" required />
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm font-medium">Project type</span>
        <select
          name="service"
          className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a service…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Something else</option>
        </select>
      </label>
      <label className="grid gap-1.5">
        <span className="text-sm font-medium">Tell us about the project</span>
        <textarea
          name="details"
          rows={compact ? 2 : 3}
          placeholder="Rooms, square footage, timeline, colors in mind…"
          className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 resize-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary w-full text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          <>
            Get My Free Estimate <Icon.arrow className="w-5 h-5" />
          </>
        )}
      </button>
      <p className="text-xs text-[var(--color-muted)] text-center">
        By submitting you agree to be contacted about your project. We never
        share your information.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
      />
    </label>
  );
}
