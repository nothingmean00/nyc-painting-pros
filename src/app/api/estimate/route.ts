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
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
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

  let recorded = false;
  try {
    await recordIntake({
      id: intakeId,
      name,
      phone,
      email,
      location,
      service,
      details,
      sourcePage: page,
      referrer,
    });
    recorded = true;
  } catch (error) {
    console.error("[estimate] Intake storage failed:", error);
    if (process.env.VERCEL_ENV === "production") {
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
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Location", location],
    ["Service", service],
    ["Details", details || "—"],
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
      "[estimate] RESEND_API_KEY not set — lead not emailed. Lead:\n" + text
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
