import { after } from "next/server";
import { MAX_REQUEST_BYTES } from "@/lib/project-photos";
import { validateProjectPhotos } from "@/lib/validate-project-photos";
import { site } from "@/lib/site";
import { isLeadAIEnabled } from "@/lib/lead-mail-config";
import { makeAutomaticEstimate, readWallEstimate } from "@/lib/automatic-estimate";
import {
  IntakeStorageError,
  markIntakeEmailDelivered,
  recordIntake,
} from "@/lib/intakes";

// POST /api/estimate records requests, notifies the team, and sends a separate
// customer receipt. Uses the Resend REST API. Configure via env:
//
//   RESEND_API_KEY      required to actually send email
//   ESTIMATE_TO_EMAIL   optional comma-separated additional lead recipients
//   ESTIMATE_FROM_EMAIL verified Resend sender (defaults to onboarding@resend.dev for testing)
//
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  wallEstimate?: unknown;
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

const EMAIL_RE = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function sendCustomerReceipt(apiKey: string, email: string, intakeId: string) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Idempotency-Key": `estimate-receipt/${intakeId}`,
  };
  const body = JSON.stringify({
    from: `${site.name} <${site.email}>`,
    to: [email],
    reply_to: site.email,
    subject: "We received your estimate request | NYC Painting Pros",
    text: [
      "Hi,",
      "Thanks for requesting an estimate. We’ll take a look and get back to you about the next step.",
      "If you have a few photos or anything you forgot to mention, you can send them by replying here.",
      "NYC Painting Pros",
    ].join("\n\n"),
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(5000),
    }).catch(() => null);

    if (response?.ok) return;
    const status = response?.status;
    const retryable = status === undefined || status === 429 || status >= 500;
    const retrySeconds = Math.max(1, Number(response?.headers.get("retry-after")) || 0);
    if (attempt === 0 && retryable && retrySeconds <= 5) {
      await new Promise((resolve) => setTimeout(resolve, retrySeconds * 1000));
      continue;
    }

    console.error("[estimate] Customer receipt failed:", intakeId, status ?? "request error");
    return;
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const receivedAt = Date.now();
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

  const queueFirstReply = isLeadAIEnabled();
  const dimensions = readWallEstimate(body.wallEstimate);
  const automaticQuote = queueFirstReply ? makeAutomaticEstimate(service, details, dimensions) : null;
  const scheduling = queueFirstReply ? await import("@/lib/schedule-lead-mail") : null;
  const initialMailSendAt = scheduling
    ? new Date(receivedAt + scheduling.leadResponseDelaySeconds() * 1000).toISOString() : undefined;
  const storedDetails = dimensions
    ? [details, `Customer supplied room dimensions: ${dimensions.length} x ${dimensions.width} ft.; ${dimensions.height} ft. high. Confirmed a clear room, sound previously painted walls, customer-supplied similar-color paint, and ordinary access.`].filter(Boolean).join("\n\n")
    : details;
  let recorded = false;
  try {
    const intake = await recordIntake({
      id: intakeId,
      name,
      phone,
      email,
      location,
      service,
      details: storedDetails,
      photos,
      sourcePage: page,
      referrer,
      ...(queueFirstReply && { queueFirstReply, initialMailSendAt }),
      ...(automaticQuote && { automaticQuote }),
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

  // Always notify both intake owners and preserve configured extra recipients.
  const to = Array.from(
    new Set(
      [
        site.email,
        "abielsoares@nycpaintingpros.com",
        ...(process.env.ESTIMATE_TO_EMAIL || "").split(","),
      ]
        .map((address) => address.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  const from = process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `New estimate request — ${service} (${location})`;
  const lines = [
    ["Project photos", `${photos.length} attached; sign in to view: ${site.url}/admin/intakes/${intakeId}`],
    ["Name", name],
    ["Phone", phone || "Not provided — contact by email"],
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
      "[estimate] Email not configured; delivery skipped."
    );
    return Response.json({ ok: true, recorded, delivered: false, intakeId });
  }

  if (recorded) {
    if (scheduling && initialMailSendAt) {
      after(async () => {
        try {
          await scheduling.scheduleLeadMail(intakeId, initialMailSendAt, Boolean(automaticQuote));
        } catch {
          console.error("[estimate] Could not start the delivery workflow; the mail remains queued.", intakeId);
        }
      });
    } else {
      after(() => sendCustomerReceipt(apiKey, email, intakeId));
    }
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
        to,
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
