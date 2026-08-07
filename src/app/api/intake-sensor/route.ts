import { timingSafeEqual } from "node:crypto"
import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

function authorized(request: Request) {
  const expected = process.env.INTAKE_SENSOR_TOKEN?.trim()
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim()
  if (!expected || !supplied) return false
  const left = Buffer.from(expected)
  const right = Buffer.from(supplied)
  return left.length === right.length && timingSafeEqual(left, right)
}

function sinceDate(request: Request) {
  const raw = new URL(request.url).searchParams.get("since")
  const parsed = raw ? new Date(raw) : new Date(Date.now() - 24 * 60 * 60 * 1000)
  const floor = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  return Number.isNaN(parsed.getTime()) || parsed < floor ? floor : parsed
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return NextResponse.json({ error: "Database unavailable" }, { status: 503 })

  const sql = neon(databaseUrl)
  const since = sinceDate(request)
  const events = await sql`
    SELECT id, status, source_page, email_delivered, created_at, updated_at
    FROM estimate_intakes
    WHERE created_at >= ${since.toISOString()}::timestamptz
       OR updated_at >= ${since.toISOString()}::timestamptz
    ORDER BY updated_at ASC
    LIMIT 1000
  `
  return NextResponse.json({
    asset: "nyc-painting-pros",
    generatedAt: new Date().toISOString(),
    events: events.map((row) => ({
      id: String(row.id),
      status: String(row.status),
      source: String(row.source_page || ""),
      notificationDelivered: Boolean(row.email_delivered),
      createdAt: new Date(row.created_at as string).toISOString(),
      updatedAt: new Date(row.updated_at as string).toISOString(),
    })),
  })
}
