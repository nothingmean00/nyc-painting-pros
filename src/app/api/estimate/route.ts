import { MAX_REQUEST_BYTES } from "@/lib/project-photos";
import { validateProjectPhotos } from "@/lib/validate-project-photos";
import { site } from "@/lib/site";
import {
  IntakeStorageError,
  markIntakeEmailDelivered,
  recordIntake,
} from "@/lib/intakes";

// POST /api/estimate — receives a free-estimate request and emails it to the
// business. Uses the Resend REST API (no SDK dependency). Configure via env:
//
//   RESEND_API_KEY      required to actually send email
//   ESTIMATE_TO_EMAIL   inbox that receives leads (defaults to site.email)
//   ESTIMATE_FROM_EMAIL verified Resend sender (defaults to onboarding@resend.dev for testing)
//
// Outside production, missing RESEND_API_KEY logs the validated lead for local
// testing. In Vercel production, missing email delivery is treated as an error.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  photos?: unknown;
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  service?: string;
  details?: string;
  page?: string;
  referrer?: string;
  submissionId?: string;
  company?: string; // honeypot — real users never fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Lead;
  try {
    if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) {
      return Response.json({ ok: false, error: "Your request is too large. Remove a photo or shorten the project details." }, { status: 413 });
    }
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return Response.json({ ok: false, error: "Your request is too large. Remove a photo or shorten the project details." }, { status: 413 });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // JSON can be null, an array, or contain non-string fields. Reject malformed
  // input before trimming fields or touching storage and email delivery.
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const textFields = ["name", "phone", "email", "location", "service", "details", "page", "referrer", "submissionId", "company"] as const;
  if (textFields.some((field) => body[field] !== undefined && typeof body[field] !== "string")) {
    return Response.json({ ok: false, error: "Invalid field format." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without doing anything.
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const location = (body.location ?? "").trim();
  const service = (body.service ?? "").trim();
  const details = (body.details ?? "").trim();
  const page = (body.page ?? "").trim().slice(0, 300);
  const referrer = (body.referrer ?? "").trim().slice(0, 300);
  const intakeId = UUID_RE.test(body.submissionId ?? "")
    ? body.submissionId!
    : crypto.randomUUID();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!phone) errors.phone = "Phone is required.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email is required.";
  if (!location) errors.location = "Neighborhood or ZIP is required.";
  if (!service) errors.service = "Please choose a service.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  let photos;
  try {
    photos = await validateProjectPhotos(body.photos);
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Unable to process photos." }, { status: 422 });
  }

  let recorded = false;
  try {
    const intake = await recordIntake({
      id: intakeId,
      name,
      phone,
      email,
      location,
      service,
      details,
      photos,
      sourcePage: page,
      referrer,
    });
    // Retries must not overwrite existing private lead details or photos.
    if (!intake) return Response.json({ ok: true, recorded: true, intakeId });
    recorded = true;
  } catch (error) {
    console.error("[estimate] Intake storage failed.");
    if (process.env.VERCEL_ENV === "production" || photos.length > 0) {
      return Response.json(
        { ok: false, error: "Could not record your request right now." },
        { status: 503 }
      );
    }
    if (!(error instanceof IntakeStorageError)) throw error;
  }

  const to = process.env.ESTIMATE_TO_EMAIL || site.email;
  const from = process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `New estimate request — ${service} (${location})`;
  const lines = [
    ["Project photos", `${photos.length} attached; sign in to view: ${site.url}/admin/intakes/${intakeId}`],
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Location", location],
    ["Service", service],
    ["Details", details || "—"],
    ["Project photos", `${photos.length} attached; view after signing in: ${site.url}/admin/intakes/${intakeId}`],
    ["Source page", page || "Unknown"],
    ["Referrer", referrer || "Direct / not provided"],
  ];
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <h2 style="font-family:sans-serif">New estimate request</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${lines
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5a6b7b">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(
              v
            )}</strong></td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;color:#5a6b7b">Sent from ${site.domain}</p>`;

  // The database is the source of truth. Email is a secondary notification.
  if (!apiKey) {
    console.warn(
      "[estimate] Email not configured; delivery skipped."
    );
    return Response.json({ ok: true, recorded, delivered: false, intakeId });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[estimate] Resend send failed:", res.status, detail);
      return Response.json({ ok: true, recorded, delivered: false, intakeId });
    }

    if (recorded) {
      try {
        await markIntakeEmailDelivered(intakeId);
      } catch (error) {
        console.error("[estimate] Could not update email delivery state:", error);
      }
    }

    return Response.json({ ok: true, recorded, delivered: true, intakeId });
  } catch (err) {
    console.error("[estimate] Resend request error:", err);
    return Response.json({ ok: true, recorded, delivered: false, intakeId });
  }
}
