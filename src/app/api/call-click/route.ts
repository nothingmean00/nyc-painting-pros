import { isCallClickInput } from "@/lib/call-events";
import { recordCallClick } from "@/lib/call-clicks";

export const runtime = "nodejs";

const reply = (status: number, ok: boolean) => Response.json({ ok }, {
  status, headers: { "Cache-Control": "no-store" },
});

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin
    || request.headers.get("sec-fetch-site") === "cross-site") return reply(403, false);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply(415, false);
  if (Number(request.headers.get("content-length")) > 2048) return reply(413, false);

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, false);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return reply(413, false); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return reply(400, false); }
  if (!isCallClickInput(body)) return reply(400, false);

  try {
    return reply(await recordCallClick({ id: body.id.toLowerCase(), page: body.page, placement: body.placement }) ? 201 : 200, true);
  } catch {
    console.error("[call-clicks] Storage unavailable.");
    return reply(503, false);
  }
}
