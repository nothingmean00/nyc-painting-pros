import "server-only";

import { randomInt } from "node:crypto";
import { start } from "workflow/api";
import { deliverLeadMail } from "./lead-delivery-workflow";

export function leadResponseDelaySeconds() {
  return randomInt(600, 901);
}

export async function scheduleLeadMail(intakeId: string, sendAt: string, automaticQuote: boolean) {
  // The persisted database time is authoritative. Allow one second for clock skew.
  const dueAt = new Date(new Date(sendAt).getTime() + 1000).toISOString();
  await start(deliverLeadMail, [intakeId, dueAt, automaticQuote]);
}
