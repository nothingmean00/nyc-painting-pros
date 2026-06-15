import { site } from "@/lib/site";

// POST /api/estimate — receives a free-estimate request and emails it to the
// business. Uses the Resend REST API (no SDK dependency). Configure via env:
//
//   RESEND_API_KEY      required to actually send email
//   ESTIMATE_TO_EMAIL   inbox that receives leads (defaults to site.email)
//   ESTIMATE_FROM_EMAIL verified Resend sender (defaults to onboarding@resend.dev for testing)
//
// Without RESEND_API_KEY the lead is validated and logged server-side (so it is
// never silently lost) and the form still confirms success.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  service?: string;
  details?: string;
  company?: string; // honeypot — real users never fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!phone) errors.phone = "Phone is required.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "A valid email is required.";
  if (!location) errors.location = "Neighborhood or ZIP is required.";
  if (!service) errors.service = "Please choose a service.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
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

  // No key configured — log the lead so it is recoverable, and confirm success.
  if (!apiKey) {
    console.warn(
      "[estimate] RESEND_API_KEY not set — lead not emailed. Lead:\n" + text
    );
    return Response.json({ ok: true, delivered: false });
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
      return Response.json(
        { ok: false, error: "Could not send right now." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[estimate] Resend request error:", err);
    return Response.json(
      { ok: false, error: "Could not send right now." },
      { status: 502 }
    );
  }
}
