import "server-only";

import { setTimeout as delay } from "node:timers/promises";
import { site } from "./site";
import { isLeadAIEnabled, leadMailConfig } from "./lead-mail-config";
import { automatedLeadSignature, firstLeadReply, quoteLeadFollowUp, suitableForAutomaticQuote } from "./lead-reply-copy";
import { automaticEstimateEnabled } from "./automatic-estimate";
import { createQuotePdf } from "./quote-pdf";
import {
  acceptLeadMail, claimLeadMail, finishLeadMail, formatQuoteTotal, getSendableLeadMail, latestLeadThread,
  recordLeadInbound, storeLeadEnvelope, type ClaimedMail, type MailEnvelope,
} from "./lead-sales";

const subject = "Your estimate request with NYC Painting Pros";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class MailBlocked extends Error {
  constructor(message: string, readonly state: "failed" | "held" = "held") {
    super(message);
  }
}

function resend(path: string, key: string, options: RequestInit = {}) {
  return fetch(`https://api.resend.com/emails${path}`, {
    ...options,
    cache: "no-store",
    headers: { ...options.headers, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(6000),
  });
}

function replyAddress(token: string, domain: string) {
  return `lead-${token}@${domain}`;
}

function replyToken(recipients: string[], domain: string) {
  for (const address of recipients) {
    if (typeof address !== "string") continue;
    const value = address.trim().toLowerCase();
    const email = value.match(/<([^<>]+)>$/)?.[1] ?? value;
    const [local, host, extra] = email.split("@");
    if (extra !== undefined || host !== domain || !local.startsWith("lead-")) continue;
    const token = local.slice("lead-".length);
    if (uuidPattern.test(token)) return token;
  }
  return null;
}

function safeMessageId(value: unknown): string | null {
  return typeof value === "string" && value === value.trim() && /^<[^<>\s]{1,250}>$/.test(value) ? value : null;
}

type ReceivedEmail = {
  to?: string[];
  received_for?: string[];
  text?: string | null;
  html?: string | null;
  message_id?: string;
  created_at?: string;
  attachments?: unknown[];
};

export async function importLeadReply(id: string, recipients: string[]) {
  const config = leadMailConfig();
  if (!config || !uuidPattern.test(id)) return;
  const hintedToken = replyToken(recipients, config.domain);
  if (!hintedToken) return;
  const response = await resend(`/receiving/${id}`, config.receiveKey);
  if (!response.ok) throw new Error(`Resend reply lookup failed (${response.status})`);
  const message = await response.json() as ReceivedEmail;
  const token = replyToken([...(message.to ?? []), ...(message.received_for ?? [])], config.domain);
  if (token !== hintedToken) throw new Error("Resend reply recipient could not be verified.");
  const receivedAt = new Date(message.created_at ?? "");
  if (Number.isNaN(receivedAt.getTime())) throw new Error("Resend reply time could not be verified.");
  const body = typeof message.text === "string" ? message.text.trim() : "";
  const newestText = body.split(/\n\s*(?:>|On .{1,240}wrote:|-----Original Message-----)/i, 1)[0];
  const stop = /\b(?:unsubscribe|opt out|stop (?:emailing|contacting|sending)|do not contact|don't contact|not interested|went with another|hired someone)\b/i.test(newestText)
    || /^stop[.!]?$/i.test(newestText.trim());
  await recordLeadInbound({
    token,
    providerId: id,
    messageId: safeMessageId(message.message_id),
    text: body.slice(0, 6000) || (message.html ? "HTML-only reply. Open in Resend to read the full message." : "No plain-text message."),
    attachmentCount: Array.isArray(message.attachments) ? message.attachments.length : 0,
    receivedAt: receivedAt.toISOString(),
    stop,
  });
}

async function ensureNoQuoteReply(job: ClaimedMail, config: NonNullable<ReturnType<typeof leadMailConfig>>) {
  if (!job.parent_created_at) throw new MailBlocked("Original quote could not be verified.");
  try {
    const query = new URLSearchParams({
      to: replyAddress(job.reply_token, config.domain),
      start_date: new Date(job.parent_created_at).toISOString(),
      limit: "10",
    });
    const response = await resend(`/receiving?${query}`, config.receiveKey);
    if (!response.ok) throw new Error("Reply check failed");
    const result = await response.json() as { data?: { id: string; to: string[] }[]; has_more?: boolean };
    if (!Array.isArray(result.data) || typeof result.has_more !== "boolean") throw new Error("Invalid reply check");
    if (!result.data.length && !result.has_more) return;
    const latest = result.data[0];
    if (latest) await importLeadReply(latest.id, [replyAddress(job.reply_token, config.domain)]);
  } catch {
    throw new MailBlocked("Could not verify customer replies. Review the inbox before following up.");
  }
  throw new MailBlocked("A reply was received. Review the conversation before responding.");
}

async function threadHeaders(job: ClaimedMail, key: string) {
  const thread = await latestLeadThread(job.intake_id, job.parent_id ?? undefined);
  if (!thread) {
    if (job.kind === "follow_up") throw new MailBlocked("Original quote thread could not be found.");
    const original = safeMessageId(job.source_email?.messageId);
    return original ? { "In-Reply-To": original, References: original } : undefined;
  }
  if (thread.kind === "received" && thread.message_id) {
    return { "In-Reply-To": thread.message_id, References: thread.message_id };
  }
  const path = thread.kind === "received" ? "/receiving/" : "/";
  if (!uuidPattern.test(thread.provider_id)) throw new MailBlocked("Previous email could not be identified.");
  const response = await resend(`${path}${thread.provider_id}`, key);
  if (!response.ok) throw new MailBlocked("Previous email could not be verified in Resend.");
  const email = await response.json() as { message_id?: string; last_event?: string };
  if (job.kind === "follow_up" && !["delivered", "opened", "clicked"].includes(email.last_event ?? "")) {
    throw new MailBlocked("The original quote has no confirmed delivery. Check Resend before following up.");
  }
  const messageId = safeMessageId(email.message_id);
  if (!messageId) throw new MailBlocked("The previous email has no usable thread identifier.");
  return { "In-Reply-To": messageId, References: messageId };
}

export function quoteFollowUpDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((value) => value.type === type)?.value;
  const date = new Date(`${part("year")}-${part("month")}-${part("day")}T00:00:00Z`);
  let businessDays = 0;
  while (businessDays < 2) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) businessDays++;
  }
  return date.toISOString().slice(0, 10);
}

async function sendLeadMail(job: ClaimedMail, config: NonNullable<ReturnType<typeof leadMailConfig>>, envelope: MailEnvelope) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": `estimate-sales/${job.id}` },
    body: JSON.stringify(envelope),
  };
  let response = await resend("", config.sendKey, options).catch(() => null);
  if (!response || response.status >= 500 || response.status === 429) {
    const wait = Math.max(1, Number(response?.headers.get("retry-after")) || 0);
    if (wait <= 4) {
      await delay(wait * 1000);
      if (job.kind === "follow_up") await ensureNoQuoteReply(job, config);
      if (!await getSendableLeadMail(job.id, job.claim_token)) throw new MailBlocked("Lead changed before the retry.");
      response = await resend("", config.sendKey, options).catch(() => null);
    }
  }
  if (!response?.ok) {
    throw new MailBlocked(`Resend did not confirm the send${response ? ` (HTTP ${response.status})` : ""}. Check the send log before retrying.`, "failed");
  }
  const result = await response.json() as { id?: string };
  if (!result.id || !uuidPattern.test(result.id)) throw new MailBlocked("Resend returned no usable send ID. Check the send log.", "failed");
  return result.id;
}

export async function processLeadMail(target?: { intakeId?: string; mailId?: string }) {
  const config = leadMailConfig();
  if (!config) return false;
  const claim = await claimLeadMail(isLeadAIEnabled(), target);
  if (!claim) return false;
  try {
    const job = await getSendableLeadMail(claim.id, claim.claim_token);
    if (!job) {
      await finishLeadMail(claim.id, claim.claim_token, "canceled", "Lead status, replies, or pause settings changed.");
      return true;
    }
    if (job.automatic && (!isLeadAIEnabled() || !automaticEstimateEnabled())) {
      throw new MailBlocked("Automatic quoting is off. Review this estimate before contacting the customer.");
    }
    let body = job.body;
    let reason = "";
    let envelope = job.envelope;
    if (!envelope) {
      if (job.kind === "first_reply") {
        ({ body, reason } = await firstLeadReply(job));
        if (!body) throw new MailBlocked(reason);
      }
      else if (job.kind === "follow_up") body = await quoteLeadFollowUp(job);
      else if (job.automatic && job.quote_document) {
        if (!await suitableForAutomaticQuote(job).catch(() => false)) {
          throw new MailBlocked("The project details need a team review before we send an estimate.");
        }
        const quote = job.quote_document;
        body = [
          "Hi, thanks for sending over the room measurements. I’ve attached the estimate for painting the walls.",
          `The estimate is ${formatQuoteTotal(quote.totalCents)}. ${quote.timing}`,
          "If everything looks right, reply here and we’ll go over the next steps.",
          automatedLeadSignature,
        ].join("\n\n");
      } else body = [body, `\n${job.owner}\nNYC Painting Pros`].join("\n");

      const headers = await threadHeaders(job, config.receiveKey);
      const threadSubject = job.source_email?.subject || subject;
      const attachment = job.kind === "quote" && job.quote_document ? [{
        filename: `nyc-painting-pros-estimate-${job.id.slice(0, 8)}.pdf`,
        content_type: "application/pdf",
        content: await createQuotePdf(job.quote_document, {
          name: job.name, location: job.location, id: job.id, createdAt: job.created_at,
        }),
      }] : undefined;
      envelope = {
        from: `${site.name} <${site.email}>`,
        to: [job.email],
        reply_to: replyAddress(job.reply_token, config.domain),
        subject: headers ? `Re: ${threadSubject}` : threadSubject,
        text: body,
        ...(headers && { headers }),
        ...(attachment && { attachments: attachment }),
        ...(job.kind === "quote" && { cc: ["abielsoares@nycpaintingpros.com"] }),
      };
    }
    const saved = await storeLeadEnvelope(job, envelope, body);
    if (!saved) throw new MailBlocked("The safe retry window expired. Check the send log.", "failed");
    if (job.kind === "follow_up") await ensureNoQuoteReply(job, config);
    if (!await getSendableLeadMail(claim.id, claim.claim_token)) {
      await finishLeadMail(claim.id, claim.claim_token, "canceled", "Lead status, replies, or pause settings changed.");
      return true;
    }
    const providerId = await sendLeadMail(job, config, saved);
    await acceptLeadMail(job, providerId, job.kind === "quote" ? quoteFollowUpDate() : null, reason);
  } catch (error) {
    const known = error instanceof MailBlocked;
    if (!known) console.error("[lead-mail] Processing failed", claim.id);
    await finishLeadMail(claim.id, claim.claim_token, known ? error.state : "failed",
      known ? error.message : "Could not complete the send. Review the inbox and Resend log.");
  }
  return true;
}
