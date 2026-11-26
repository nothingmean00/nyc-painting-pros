"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { leadMailConfig } from "@/lib/lead-mail-config";
import { processLeadMail } from "@/lib/lead-mail";
import {
  approveLeadQuote, getSalesDetails, leadOwners, queueLeadManualReply,
  saveLeadQuote, setLeadSalesControls, type LeadOwner,
} from "@/lib/lead-sales";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function field(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function ownerFrom(data: FormData) {
  const value = field(data, "owner");
  return leadOwners.find((owner) => owner === value);
}

async function authorizedLead(data: FormData) {
  await requireAdmin();
  const id = field(data, "id");
  if (!uuidPattern.test(id)) redirect("/admin");
  return id;
}

function finish(id: string, notice: string): never {
  revalidatePath("/admin");
  revalidatePath(`/admin/intakes/${id}`);
  redirect(`/admin/intakes/${id}?sales=${notice}#sales`);
}

function sendAfterResponse(mailId: string) {
  after(async () => {
    await processLeadMail({ mailId });
  });
}

export async function updateLeadControlsAction(data: FormData) {
  const id = await authorizedLead(data);
  const owner = ownerFrom(data);
  if (!owner) finish(id, "invalid");
  await setLeadSalesControls(id, owner, data.get("paused") === "yes");
  finish(id, "settings");
}

export async function saveLeadQuoteAction(data: FormData) {
  const id = await authorizedLead(data);
  const owner = ownerFrom(data);
  const scope = field(data, "scope");
  const timing = field(data, "timing");
  const total = field(data, "total");
  const version = Number(field(data, "version"));
  if (!owner || !scope || scope.length > 4000 || timing.length > 500
    || !/^\d{1,7}(?:\.\d{1,2})?$/.test(total) || Number(total) <= 0
    || !Number.isSafeInteger(version) || version < 0) finish(id, "invalid");
  const [dollars, fraction = ""] = total.split(".");
  const totalCents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
  if (!await saveLeadQuote(id, { owner, scope, totalCents, timing, version })) finish(id, "changed");
  finish(id, "draft");
}

export async function approveLeadQuoteAction(data: FormData) {
  const id = await authorizedLead(data);
  if (!leadMailConfig()) finish(id, "mail-disabled");
  const { sales } = await getSalesDetails(id);
  const version = Number(field(data, "version"));
  const owner = ownerFrom(data);
  if (!sales || !sales.draft_total_cents || sales.draft_version !== version || sales.owner !== owner) finish(id, "changed");

  const mailId = await approveLeadQuote(id, {
    owner: sales.owner, scope: sales.draft_scope, timing: sales.draft_timing,
    totalCents: sales.draft_total_cents, version,
  });
  if (!mailId) finish(id, "changed");
  sendAfterResponse(mailId);
  finish(id, "quote-queued");
}

export async function sendLeadReplyAction(data: FormData) {
  const id = await authorizedLead(data);
  if (!leadMailConfig()) finish(id, "mail-disabled");
  const owner: LeadOwner | undefined = ownerFrom(data);
  const body = field(data, "body");
  const messageId = field(data, "messageId");
  if (!owner || !body || body.length > 6000 || !uuidPattern.test(messageId)) finish(id, "invalid");
  if (await queueLeadManualReply(id, messageId, owner, body)) sendAfterResponse(messageId);
  finish(id, "reply-queued");
}
