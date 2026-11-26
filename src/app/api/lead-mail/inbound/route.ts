import { createHmac, timingSafeEqual } from "node:crypto";
import { importLeadReply } from "@/lib/lead-mail";
import { leadMailConfig } from "@/lib/lead-mail-config";
import { importForwardedLead } from "@/lib/forwarded-lead-email";

export const maxDuration = 45;

function validSignature(headers: Headers, body: string, secret: string) {
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatures = headers.get("svix-signature");
  if (!id || !timestamp || !/^\d{1,12}$/.test(timestamp) || !signatures
    || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const key = Buffer.from(secret.slice("whsec_".length), "base64");
  if (!key.length) return false;
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(/\s+/).some((entry) => {
    const [version, signature] = entry.split(",");
    if (version !== "v1" || !signature) return false;
    const actual = Buffer.from(signature, "base64");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
}

export async function POST(request: Request) {
  const config = leadMailConfig();
  if (!config) return new Response("Not configured", { status: 503 });
  if (Number(request.headers.get("content-length")) > 131072) return new Response("Too large", { status: 413 });
  const body = await request.text();
  if (Buffer.byteLength(body) > 131072) return new Response("Too large", { status: 413 });
  if (!validSignature(request.headers, body, config.webhookSecret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: { type?: string; data?: { email_id?: string; to?: string[] } } | null;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Invalid event", { status: 400 });
  }
  if (event?.type !== "email.received") return Response.json({ ok: true });
  const { email_id: id, to } = event.data ?? {};
  if (typeof id !== "string" || !Array.isArray(to)) return new Response("Invalid event", { status: 400 });
  try {
    if (!await importForwardedLead(id, to)) await importLeadReply(id, to);
    return Response.json({ ok: true });
  } catch {
    console.error("[lead-mail] Could not import inbound event");
    return new Response("Reply import failed", { status: 503 });
  }
}
