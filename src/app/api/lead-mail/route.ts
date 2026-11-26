import { createHash, timingSafeEqual } from "node:crypto";
import { processLeadMail } from "@/lib/lead-mail";
import { isLeadAIEnabled, leadMailConfig } from "@/lib/lead-mail-config";
import { queueDueFollowUps } from "@/lib/lead-sales";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization") ?? "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!secret || !timingSafeEqual(digest(authorization), digest(`Bearer ${secret}`))) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!leadMailConfig()) return Response.json({ enabled: false });

  if (isLeadAIEnabled()) await queueDueFollowUps();
  let processed = 0;
  const deadline = Date.now() + 18000;
  while (processed < 25 && Date.now() < deadline && await processLeadMail()) processed++;
  return Response.json({ processed });
}
