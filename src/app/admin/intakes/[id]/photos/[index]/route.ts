import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getIntakePhoto } from "@/lib/intakes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; index: string }> }) {
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow" };
  if (!(await isAdminAuthenticated())) return new Response("Unauthorized", { status: 401, headers });
  const { id, index } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) || !/^[0-2]$/.test(index)) {
    return new Response("Not found", { status: 404, headers });
  }
  const photo = await getIntakePhoto(id, Number(index));
  if (!photo) return new Response("Not found", { status: 404, headers });
  return new Response(new Uint8Array(Buffer.from(photo.content, "base64")), {
    headers: { ...headers, "Content-Type": "image/jpeg", "Content-Disposition": `inline; filename="project-photo-${Number(index) + 1}.jpg"` },
  });
}
