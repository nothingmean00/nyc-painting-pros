import "server-only";

import { createHash } from "node:crypto";
import { makeAutomaticEstimate, readWallEstimate } from "./automatic-estimate";
import { recordIntake } from "./intakes";
import { isLeadAIEnabled, leadMailConfig } from "./lead-mail-config";
import { MAX_PHOTOS } from "./project-photos";
import { leadResponseDelaySeconds, scheduleLeadMail } from "./schedule-lead-mail";
import { site } from "./site";
import { normalizeProjectPhoto } from "./validate-project-photos";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const maxEmailImageBytes = 8_000_000;
type Attachment = { id: string; content_type?: string; size?: number; download_url?: string };
type Received = {
  from?: string; to?: string[]; received_for?: string[]; subject?: string; created_at?: string;
  text?: string | null; html?: string | null; message_id?: string; headers?: Record<string, string>; attachments?: Attachment[];
};

function address(value: string) {
  const trimmed = value.trim();
  return (trimmed.match(/<([^<>]+)>$/)?.[1] ?? trimmed).toLowerCase();
}

function reference(value?: string) {
  return value && /^<[^<>\s]{1,250}>$/.test(value) && value.trim() === value ? value : null;
}

function plainMessage(message: Received) {
  const text = message.text?.trim() || (message.html ?? "").slice(0, 100_000)
    .replace(/^[\s\S]*?<\/head\s*>/i, "").split(/<blockquote\b/i, 1)[0]
    .replace(/<\/?(?:br|div|p|li)\b[^<>]*>/gi, "\n")
    .replace(/<[^<>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&(?:apos|rsquo);|&#39;/gi, "'").replace(/&amp;/gi, "&").trim();
  return text.split(/\n\s*(?:>|On .{1,240}wrote:|-----Original Message-----)/i, 1)[0].slice(0, 5500);
}

function leadId(emailId: string) {
  const bytes = createHash("sha256").update(`resend-inquiry:${emailId}`).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  return bytes.toString("hex").replace(/^(........)(....)(....)(....)(............)$/, "$1-$2-$3-$4-$5");
}

async function downloadImage(attachment: Attachment) {
  const url = new URL(attachment.download_url ?? "");
  const configuredHost = process.env.LEAD_RESEND_ATTACHMENT_HOST?.trim().toLowerCase();
  if (url.protocol !== "https:" || url.username || url.password || url.port
    || !["cdn.resend.app", configuredHost].includes(url.hostname)) throw new Error("Unrecognized attachment host.");
  const response = await fetch(url, { redirect: "error", cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!response.ok || Number(response.headers.get("content-length")) > maxEmailImageBytes || !response.body) {
    throw new Error("Could not read attachment.");
  }
  const stream = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { value, done } = await stream.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxEmailImageBytes) {
      await stream.cancel();
      throw new Error("Image too large.");
    }
    chunks.push(value);
  }
  return normalizeProjectPhoto(Buffer.concat(chunks), maxEmailImageBytes);
}

export async function importForwardedLead(id: string, recipients: string[]) {
  const config = leadMailConfig();
  const intakeAddress = process.env.LEAD_INTAKE_ADDRESS?.trim().toLowerCase();
  if (!config || !intakeAddress || !intakeAddress.endsWith(`@${config.domain}`) || !uuid.test(id)
    || !recipients.some((value) => typeof value === "string" && [site.email, intakeAddress].includes(address(value)))) return false;
  const read = (path: string) => fetch(`https://api.resend.com/emails/receiving/${id}${path}`, {
    headers: { Authorization: `Bearer ${config.receiveKey}` }, cache: "no-store", signal: AbortSignal.timeout(6000),
  });
  const response = await read("");
  if (!response.ok) throw new Error("Could not retrieve forwarded email.");
  const message = await response.json() as Received;
  if (![...(message.received_for ?? []), ...(message.to ?? [])].some((value) => address(value) === intakeAddress)) return false;
  const rawSender = message.from ?? "";
  const sender = address(rawSender);
  const headers = Object.fromEntries(Object.entries(message.headers ?? {}).map(([key, value]) => [key.toLowerCase(), value]));
  const notificationSender = address(process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev");
  const displaySender = headers.from && address(headers.from) === sender ? headers.from : rawSender;
  const subject = (message.subject ?? "").replace(/[\r\n]/g, " ").trim().slice(0, 180);
  const body = plainMessage(message);
  const text = `${subject}\n${body}`;
  const automated = headers["auto-submitted"] && headers["auto-submitted"].toLowerCase() !== "no";
  if (!/^[^<>\s@,;]+@[^<>\s@,;]+\.[^<>\s@,;]+$/.test(sender)
    || sender === notificationSender || sender.endsWith(`@${site.email.split("@")[1]}`)
    || /^(?:no[-_.]?reply|mailer-daemon|postmaster)@/i.test(sender)
    || automated || headers["list-id"] || headers["in-reply-to"] || /^re\s*:/i.test(subject)
    || !/\b(?:paint(?:er|ing|ed)?|repaint(?:ing)?|wallpaper|plaster|drywall|coatings?|estimate|quote)\b/i.test(text)
    || !/\b(?:estimate|quote|price|interested|looking|need|can you|could you|how much|would like)\b/i.test(text)) return true;

  const receivedAt = new Date(message.created_at ?? "");
  if (Number.isNaN(receivedAt.getTime())) throw new Error("Invalid received time.");
  const images = (message.attachments ?? []).filter((item) => item.content_type?.startsWith("image/"));
  const candidates = images.filter((item) => uuid.test(item.id) && (item.size ?? 0) <= maxEmailImageBytes
    && ["image/jpeg", "image/png", "image/webp"].includes(item.content_type ?? "")).slice(0, MAX_PHOTOS);
  const results = await Promise.allSettled(candidates.map(async (item) => {
    const attachment = await read(`/attachments/${item.id}`);
    if (!attachment.ok) throw new Error("Attachment could not be retrieved.");
    return downloadImage(await attachment.json() as Attachment);
  }));
  const photos = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
  const photosIncomplete = photos.length < images.length;
  const location = text.match(/\b(?:Brooklyn|Manhattan|Queens|Bronx|Staten Island)\b/i)?.[0] ?? "Not provided";
  const pictureNote = photosIncomplete ? "Some email images could not be reviewed.\n\n" : "";
  const usefulDetails = `Subject: ${subject}\n\n${pictureNote}${body || "Read the full message in the business inbox."}`;
  const measured = body.match(/\b(\d{1,2}(?:\.\d)?)\s*[x×]\s*(\d{1,2}(?:\.\d)?)\s*[x×]\s*(\d{1,2}(?:\.\d)?)\s*(?:ft\b|feet\b)/i);
  const confirmsPackage = /\b(?:one bedroom|one room|single room)\b/i.test(body) && /\bwalls only\b/i.test(body)
    && /\b(?:empty|unfurnished)\b/i.test(body) && /\b(?:similar|same) colou?r\b/i.test(body)
    && /\b(?:I|we)(?:'ll|’ll| will) (?:supply|provide) (?:the )?paint\b/i.test(body)
    && /\bno repairs\b/i.test(body) && /\bno special access\b/i.test(body);
  const dimensions = measured && confirmsPackage ? readWallEstimate({
    length: Number(measured[1]), width: Number(measured[2]), height: Number(measured[3]), conditionsConfirmed: true,
  }) : null;
  const enabled = isLeadAIEnabled();
  const automaticQuote = enabled && !photosIncomplete && location !== "Not provided"
    ? makeAutomaticEstimate("Interior Painting", body.replace(/\bno repairs\b/gi, ""), dimensions) : null;
  const initialMailSendAt = new Date(receivedAt.getTime() + leadResponseDelaySeconds() * 1000).toISOString();
  const intakeId = leadId(id);
  const lead = await recordIntake({
    id: intakeId,
    name: (displaySender.includes("<") ? displaySender.replace(/<[^<>]*>$/, "").trim().replace(/^"|"$/g, "").slice(0, 110) : "") || "Email inquiry",
    email: sender,
    phone: "",
    location,
    service: automaticQuote ? "Interior Painting" : "Email inquiry",
    details: usefulDetails,
    photos,
    sourcePage: "Business inbox",
    referrer: "",
    sourceEmail: { id, subject, messageId: reference(message.message_id) },
    queueFirstReply: enabled,
    initialMailSendAt,
    ...(automaticQuote ? { automaticQuote } : {}),
  });
  if (lead && enabled) {
    try {
      await scheduleLeadMail(intakeId, initialMailSendAt, Boolean(automaticQuote));
    } catch {
      console.error("[lead-mail] Could not start delivery workflow; mail remains queued.", intakeId);
    }
  }
  return true;
}
