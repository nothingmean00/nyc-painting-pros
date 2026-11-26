import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getQuoteAttachment } from "@/lib/lead-sales";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; mailId: string }> }) {
  if (!await isAdminAuthenticated()) return new Response("Unauthorized", { status: 401 });
  const { id, mailId } = await params;
  if (!uuid.test(id) || !uuid.test(mailId)) return new Response("Not found", { status: 404 });
  const attachment = await getQuoteAttachment(id, mailId);
  if (!attachment?.content || attachment.content_type !== "application/pdf") return new Response("Not found", { status: 404 });
  return new Response(Uint8Array.from(Buffer.from(attachment.content, "base64")), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="nyc-painting-pros-estimate-${mailId.slice(0, 8)}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
