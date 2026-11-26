"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Icon } from "./Icons";
import { services, site } from "@/lib/site";

import { ProjectPhotoPicker } from "./ProjectPhotoPicker";
import type { ProjectPhoto } from "@/lib/project-photos";

type Status = "idle" | "submitting" | "sent" | "error";

type EstimateEvent =
  | "estimate_viewed"
  | "estimate_started"
  | "estimate_validation_blocked"
  | "estimate_attempted"
  | "estimate_failed"
  | "estimate_submitted";

// Only fixed categories and the pathname belong in analytics, never form text
// or query strings (the project assistant can prefill details through the URL).
function trackEstimate(event: EstimateEvent, properties: Record<string, string> = {}) {
  try {
    track(event, { ...properties, page: window.location.pathname, form_version: "simplified-v1" });
  } catch {
    // Analytics must never change the outcome of an estimate request.
  }
}

export function EstimateForm({
  compact = false,
  defaultDetails = "",
  defaultService = "",
}: {
  compact?: boolean;
  defaultDetails?: string;
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const submissionId = useRef<string | null>(null);
  const started = useRef(false);
  const blockedFields = useRef(new Set<string>());
  const [projectBrief, setProjectBrief] = useState(defaultDetails);
  const [selectedService, setSelectedService] = useState(services.some((service) => service.name === defaultService) ? defaultService : "");
  const [photos, setPhotos] = useState<ProjectPhoto[]>([]);
  const [photosBusy, setPhotosBusy] = useState(false);
  const confirmation = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const element = formRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackEstimate("estimate_viewed");
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status === "sent") confirmation.current?.focus();
  }, [status]);

  function trackStart() {
    if (started.current) return;
    started.current = true;
    trackEstimate("estimate_started");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || photosBusy) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    trackStart();
    trackEstimate("estimate_attempted");
    setStatus("submitting");
    setError("");

    const data = Object.fromEntries(new FormData(form).entries());
    const wallEstimate = selectedService === "Interior Painting" && data.wallConditions === "yes" ? {
      length: Number(data.wallLength), width: Number(data.wallWidth), height: Number(data.wallHeight),
      conditionsConfirmed: true,
    } : undefined;
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
          photos,
          wallEstimate,
          page,
          referrer,
          submissionId: submissionId.current,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        trackEstimate("estimate_failed", {
          reason: res.status === 422 ? "validation" : res.status === 429 ? "rate_limit" : "server",
        });
      }
      if (res.status === 422 && json.errors) {
        const messages: string[] = [];
        for (const name of ["name", "phone", "email", "location", "service"]) {
          const message = json.errors[name];
          const field = form.elements.namedItem(name);
          if (
            typeof message === "string" &&
            (field instanceof HTMLInputElement || field instanceof HTMLSelectElement)
          ) {
            field.setCustomValidity(message);
            messages.push(message);
          }
        }
        if (messages.length) {
          setStatus("error");
          setError(`Please check your details: ${messages.join(" ")}`);
          form.reportValidity();
          return;
        }
      }
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(typeof json.error === "string" ? json.error : `We couldn't send that just now. Please email us at ${site.email}.`);
        return;
      }
      // Conversion event — see which pages/services actually produce leads.
      trackEstimate("estimate_submitted", {
        service: services.find((service) => service.name === data.service)?.name ?? "Other",
      });
      setStatus("sent");
    } catch {
      trackEstimate("estimate_failed", { reason: "network" });
      setStatus("error");
      setError(
        `We couldn't send that just now. Please email us at ${site.email}.`
      );
    }
  }

  if (status === "sent") {
    return (
      <div ref={confirmation} tabIndex={-1} role="status" className="card p-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)]">
        <div className="mx-auto w-14 h-14 rounded-none bg-[var(--color-green)]/15 text-[var(--color-green-600)] grid place-items-center">
          <Icon.check className="w-7 h-7" />
        </div>
        <h3 className="font-display text-2xl mt-4">Request received!</h3>
        <p className="text-[var(--color-muted)] mt-2">
          Thanks — a project manager will review the details and contact you to
          confirm the next step for your estimate.
        </p>
        <p className="mt-4 text-sm text-[var(--color-muted)]">We will confirm whether photos or a walkthrough are needed before preparing your written estimate. This request does not book work or commit you to a purchase.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInvalid={(event) => {
        const field = event.target;
        if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement)) return;
        if (!["name", "phone", "email", "location", "service"].includes(field.name)) return;
        trackStart();
        if (blockedFields.current.has(field.name)) return;
        blockedFields.current.add(field.name);
        trackEstimate("estimate_validation_blocked", { field: field.name });
      }}
      onInput={(event) => {
        const field = event.target;
        if (
          (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) &&
          field.name !== "company"
        ) {
          trackStart();
        }
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement) {
          field.setCustomValidity("");
        }
      }}
      className="estimate-form p-5 sm:p-8 grid gap-5"
      aria-label="Request a painting estimate"
      aria-busy={status === "submitting"}
    >
      {!compact && (
        <div>
          <h3 className="font-display text-2xl">Get your free estimate</h3>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            No obligation. Add photos if helpful; we will confirm whether a walkthrough is needed.
          </p>
        </div>
      )}
      <p className="text-sm text-[var(--color-muted)]">Start with four required details. Phone, project notes and photos are optional.</p>
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
          className="rounded-none bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
        >
          {error}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="name" autoComplete="name" required />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          hint="Add a number if you would like us to call about your estimate."
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
        <span className="text-sm font-medium">Project type (required)</span>
        <select
          name="service"
          className="rounded-none border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
          value={selectedService}
          onChange={(event) => setSelectedService(event.target.value)}
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
          <option value="Other">Not sure / something else</option>
        </select>
      </label>
      {selectedService === "Interior Painting" && (
        <details className="border border-[var(--color-line)] p-4">
          <summary className="cursor-pointer text-sm font-medium">Add measurements for one room (optional)</summary>
          <p className="mt-3 text-sm text-[var(--color-muted)]">For a straightforward walls-only repaint, measure the room length, width, and ceiling height.</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[["Length", "wallLength"], ["Width", "wallWidth"], ["Height", "wallHeight"]].map(([label, field]) => (
              <label key={field} className="min-w-0 text-xs font-medium">
                {label} (ft)
                <input type="number" name={field} step="0.1" min="0" max="99" className="mt-1 min-w-0 w-full border border-[var(--color-line)] px-2 py-2 text-base" />
              </label>
            ))}
          </div>
          <label className="mt-3 flex items-start gap-2 text-sm">
            <input type="checkbox" name="wallConditions" value="yes" className="mt-1" />
            <span>This is one clear room in NYC with sound, already painted walls. I’m supplying paint in a similar color. There are no repairs or special access requirements.</span>
          </label>
        </details>
      )}
      <details open={defaultDetails ? true : undefined} className="rounded-none border border-[var(--color-line)] p-4">
      <summary className="cursor-pointer font-medium text-sm">Add project details or photos (optional)</summary>
      <div className="grid gap-4 pt-4">
      <label className="grid gap-1.5">
        <span className="text-sm font-medium">Tell us about the project (optional)</span>
        <span className="text-sm text-[var(--color-muted)]">Include walls, ceilings or trim, repairs, whether the space is occupied, and your preferred dates. Approximate details are fine.</span>
        <textarea
          name="details"
          value={projectBrief}
          onChange={(event) => setProjectBrief(event.target.value)}
          rows={compact ? 2 : 3}
          placeholder="Rooms, approximate size, surface condition, timeline, and access details…"
          className="rounded-none border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30 resize-none"
        />
      </label>
      <ProjectPhotoPicker photos={photos} onChange={setPhotos} busy={photosBusy} onBusyChange={setPhotosBusy} disabled={status === "submitting" || photosBusy} />
      </div>
      </details>
      <p className="text-sm text-[var(--color-muted)]">We will review your request and contact you about the next step. No payment or booking is required.</p>
      <button
        type="submit"
        disabled={status === "submitting" || photosBusy}
        className="btn btn-primary w-full text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          <>
            Request My Free Estimate <Icon.arrow className="w-5 h-5" />
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
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">{label}{required ? " (required)" : ""}</span>
      {hint && <span className="text-xs text-[var(--color-muted)]">{hint}</span>}
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="rounded-none border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
      />
    </label>
  );
}
