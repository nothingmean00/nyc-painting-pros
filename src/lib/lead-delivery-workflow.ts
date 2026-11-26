import { sleep } from "workflow";

export async function deliverLeadMail(intakeId: string, dueAt: string, automaticQuote: boolean) {
  "use workflow";
  await sleep(new Date(dueAt));
  await processInitialMail(intakeId, automaticQuote);
}

async function processInitialMail(intakeId: string, automaticQuote: boolean) {
  "use step";
  const { processLeadMail } = await import("./lead-mail");
  await processLeadMail({ intakeId });
  if (automaticQuote) await processLeadMail({ intakeId });
}
