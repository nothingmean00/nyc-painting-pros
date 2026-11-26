import "server-only";

export function leadOpenAIConfig() {
  const model = process.env.LEAD_AI_MODEL?.trim().replace(/^openai\//, "");
  const apiKey = process.env.LEAD_OPENAI_API_KEY?.trim();
  if (!model || !/^[a-z0-9][a-z0-9._-]*$/i.test(model) || !apiKey) return null;
  return { model, apiKey };
}

export function leadMailConfig() {
  const domain = process.env.LEAD_REPLY_DOMAIN?.trim().toLowerCase();
  const sendKey = process.env.RESEND_API_KEY;
  const receiveKey = process.env.RESEND_RECEIVING_API_KEY || sendKey;
  const webhookSecret = process.env.LEAD_RESEND_WEBHOOK_SECRET;
  if (!domain || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)
    || !sendKey || !receiveKey || !webhookSecret?.startsWith("whsec_") || !process.env.CRON_SECRET) {
    return null;
  }
  return { domain, sendKey, receiveKey, webhookSecret };
}

export function isLeadAIEnabled() {
  return process.env.LEAD_AI_ENABLED === "true"
    && Boolean(leadOpenAIConfig() && leadMailConfig());
}
