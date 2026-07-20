"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Icon } from "./Icons";
import { services, site } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function EstimateForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const submissionId = useRef<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const page =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "";
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    submissionId.current ??= crypto.randomUUID();

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          page,
          referrer,
          submissionId: submissionId.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      // Conversion event — see which pages/services actually produce leads.
      track("estimate_submitted", {
        service: String(data.service ?? "unknown"),
        page,
      });
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
          Thanks — a project manager will review the details and contact you to
          confirm the next step for your estimate.
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
            No obligation. We will confirm whether photos or a walkthrough are needed.
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
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
        />
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
          placeholder="Rooms, approximate size, surface condition, timeline, and access details…"
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
        By submitting, you agree to be contacted about your project. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-green-600)]">
          privacy policy
        </Link>
        .
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
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
      />
    </label>
  );
}
