import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const requests = new Map<string, { count: number; resetAt: number }>();

function allowed(ip: string) {
  const now = Date.now();
  const current = requests.get(ip);
  if (!current || current.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

const instructions = `You are the Project Scope Assistant for NYC Painting Pros.

Your only job is to help a prospective customer assemble a useful painting-project brief before requesting a free estimate.

Ask one concise question at a time. Collect, when relevant:
- project type: interior, exterior, cabinet refinishing, wallpaper, commercial, turnover, repair, or other
- NYC neighborhood or ZIP and property type
- rooms, approximate square footage, ceiling height, and occupied or vacant status
- surface condition: cracks, peeling, water damage, plaster repair, skim coating, wallpaper removal
- walls, ceilings, trim, doors, cabinets, or specialty finishes included
- color or sheen decisions if known
- building access, elevator, working-hour restrictions, COI requirements, and parking/loading constraints
- desired timing and whether photos or a walkthrough are available

Rules:
- Never provide or invent a binding quote, final price, crew availability, start date, warranty coverage, certification, insurance status, or building approval.
- You may explain which project details commonly affect an estimate, but say the project manager must confirm scope and pricing.
- Do not ask for names, phone numbers, email addresses, precise apartment numbers, payment information, or other sensitive information. The estimate form collects contact details.
- Do not diagnose hazardous materials. If lead, mold, asbestos, active leaks, or structural damage are mentioned, tell the customer not to disturb the area and to have the appropriate qualified professional assess it.
- Keep replies under 90 words and avoid hype.
- Once enough scope is collected, summarize it as a compact bullet list and tell the customer to use “Build my estimate request.”`;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!allowed(ip)) {
    return Response.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
    if (!messages.length || JSON.stringify(messages).length > 20_000) {
      return Response.json({ error: "Invalid conversation." }, { status: 400 });
    }

    const result = streamText({
      model: process.env.AI_CHAT_MODEL || "inclusionai/ling-3.0-flash-free",
      system: instructions,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 350,
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[project-scope-chat]", error);
    return Response.json({ error: "The assistant is temporarily unavailable." }, { status: 500 });
  }
}
