import "server-only";

import { getIntakeSql } from "./intakes";
import type { QuoteDocument } from "./automatic-estimate";
import type { ProjectPhoto } from "./project-photos";

export const leadOwners = ["Malik", "Abiel"] as const;
export type LeadOwner = (typeof leadOwners)[number];
type MailKind = "first_reply" | "quote" | "follow_up" | "manual" | "received";
type MailState = "pending" | "sending" | "accepted" | "received" | "failed" | "held" | "canceled";

export type QuoteDraft = {
  owner: LeadOwner;
  scope: string;
  totalCents: number;
  timing: string;
  version: number;
};

export type SalesDetails = {
  owner: LeadOwner;
  paused: boolean;
  draft_scope: string;
  draft_total_cents: number | null;
  draft_timing: string;
  draft_version: number;
  approved_version: number;
};

export type MailEntry = {
  id: string;
  kind: MailKind;
  state: MailState;
  owner: LeadOwner;
  body: string;
  reason: string;
  quote_version: number | null;
  created_at: string;
  accepted_at: string | null;
  follow_up_on: string | null;
  provider_id: string | null;
  attachment_count: number;
  automatic: boolean;
  has_pdf: boolean;
};

export type MailEnvelope = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
  cc?: string[];
  attachments?: { filename: string; content: string; content_type: string }[];
  headers?: Record<string, string>;
};

export type ClaimedMail = MailEntry & {
  intake_id: string;
  claim_token: string;
  envelope: MailEnvelope | null;
  name: string;
  location: string;
  email: string;
  service: string;
  details: string;
  photo_count: number;
  photos?: ProjectPhoto[];
  source_email?: { id: string; messageId: string | null; subject: string } | null;
  reply_token: string;
  parent_id: string | null;
  parent_created_at: string | null;
  parent_body: string | null;
  parent_scope: string | null;
  quote_document: QuoteDocument | null;
};

export async function getSalesDetails(id: string) {
  const sql = await getIntakeSql();
  const [sales, history] = await Promise.all([
    sql`SELECT owner, paused, draft_scope, draft_total_cents, draft_timing, draft_version, approved_version
      FROM estimate_sales WHERE intake_id = ${id}`,
    sql`SELECT id, kind, state, owner, body, reason, quote_version, created_at::text,
      accepted_at::text, follow_up_on::text, provider_id, attachment_count, automatic,
      (envelope->'attachments'->0 IS NOT NULL) AS has_pdf
      FROM estimate_sales_mail WHERE intake_id = ${id}
      ORDER BY created_at DESC LIMIT 30`,
  ]);
  return { sales: (sales[0] as SalesDetails | undefined) ?? null, history: history as MailEntry[] };
}

export async function setLeadSalesControls(id: string, owner: LeadOwner, paused: boolean) {
  const sql = await getIntakeSql();
  await sql`INSERT INTO estimate_sales (intake_id, owner, paused)
    SELECT id, ${owner}, ${paused} FROM estimate_intakes WHERE id = ${id}
    ON CONFLICT (intake_id) DO UPDATE SET owner = EXCLUDED.owner, paused = EXCLUDED.paused`;
}

export async function saveLeadQuote(id: string, draft: QuoteDraft) {
  const sql = await getIntakeSql();
  const rows = await sql`INSERT INTO estimate_sales
    (intake_id, owner, draft_scope, draft_total_cents, draft_timing, draft_version)
    SELECT id, ${draft.owner}, ${draft.scope}, ${draft.totalCents}, ${draft.timing}, 1
    FROM estimate_intakes
    WHERE id = ${id} AND status NOT IN ('won', 'lost', 'archived')
      AND (${draft.version} = 0 OR EXISTS (SELECT 1 FROM estimate_sales WHERE intake_id = ${id}))
    ON CONFLICT (intake_id) DO UPDATE SET
      owner = EXCLUDED.owner, draft_scope = EXCLUDED.draft_scope,
      draft_total_cents = EXCLUDED.draft_total_cents, draft_timing = EXCLUDED.draft_timing,
      draft_version = estimate_sales.draft_version + 1
    WHERE estimate_sales.draft_version = ${draft.version}
    RETURNING intake_id`;
  return rows.length === 1;
}

export function formatQuoteTotal(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export async function approveLeadQuote(id: string, draft: QuoteDraft) {
  const sql = await getIntakeSql();
  const text = [
    "Here’s our written estimate for the painting work we discussed.",
    draft.scope,
    `Total: ${formatQuoteTotal(draft.totalCents)}`,
    draft.timing,
    "If the scope looks right, reply and we’ll prepare the agreement and check scheduling with the crew. If you’d like to adjust anything, let us know.",
  ].filter(Boolean).join("\n\n");
  const rows = await sql`WITH approved AS (
    UPDATE estimate_sales AS sales SET approved_version = draft_version
    FROM estimate_intakes AS intake
    WHERE sales.intake_id = ${id} AND intake.id = sales.intake_id
      AND intake.status NOT IN ('won', 'lost', 'archived')
      AND sales.draft_version = ${draft.version} AND sales.approved_version < sales.draft_version
      AND sales.draft_scope = ${draft.scope} AND sales.draft_total_cents = ${draft.totalCents}
      AND sales.draft_timing = ${draft.timing} AND sales.owner = ${draft.owner}
      AND NOT EXISTS (
        SELECT 1 FROM estimate_sales_mail WHERE intake_id = sales.intake_id
        AND kind = 'quote' AND state IN ('pending', 'sending')
      )
    RETURNING sales.intake_id, sales.owner, sales.approved_version
  )
  INSERT INTO estimate_sales_mail (intake_id, kind, owner, quote_version, body, quote_document)
  SELECT intake_id, 'quote', owner, approved_version, ${text},
    ${JSON.stringify({ scope: draft.scope, totalCents: draft.totalCents, timing: draft.timing })}::jsonb FROM approved
  RETURNING id`;
  return (rows[0]?.id as string | undefined) ?? null;
}

export async function queueLeadManualReply(id: string, messageId: string, owner: LeadOwner, body: string) {
  const sql = await getIntakeSql();
  await sql`INSERT INTO estimate_sales (intake_id, owner)
    SELECT id, ${owner} FROM estimate_intakes WHERE id = ${id}
    ON CONFLICT (intake_id) DO NOTHING`;
  const rows = await sql`INSERT INTO estimate_sales_mail (id, intake_id, kind, owner, body)
    VALUES (${messageId}, ${id}, 'manual', ${owner}, ${body})
    ON CONFLICT (id) DO NOTHING RETURNING id`;
  return rows.length === 1;
}

export async function queueDueFollowUps() {
  const sql = await getIntakeSql();
  await sql`INSERT INTO estimate_sales_mail (intake_id, kind, owner, quote_version, parent_id)
    SELECT q.intake_id, 'follow_up', s.owner, q.quote_version, q.id
    FROM estimate_sales_mail AS q
    JOIN estimate_sales AS s ON s.intake_id = q.intake_id AND s.approved_version = q.quote_version
    JOIN estimate_intakes AS i ON i.id = q.intake_id
    WHERE q.kind = 'quote' AND q.state = 'accepted' AND i.status = 'quoted' AND NOT s.paused
      AND q.follow_up_on <= (now() AT TIME ZONE 'America/New_York')::date
      AND EXTRACT(ISODOW FROM now() AT TIME ZONE 'America/New_York') < 6
      AND NOT EXISTS (SELECT 1 FROM estimate_sales_mail AS next WHERE next.intake_id = q.intake_id
        AND (next.kind = 'follow_up' AND next.quote_version = q.quote_version
          OR next.kind IN ('received', 'manual') AND next.created_at >= q.created_at))
    ORDER BY q.follow_up_on LIMIT 25
    ON CONFLICT (intake_id, kind, quote_version) DO NOTHING`;
}

export async function claimLeadMail(automated: boolean, target?: { intakeId?: string; mailId?: string }) {
  const sql = await getIntakeSql();
  const rows = await sql`WITH next AS (
    SELECT id FROM estimate_sales_mail
    WHERE (state = 'pending' OR state = 'sending' AND lease_until <= now())
      AND send_after <= now()
      AND (${target?.intakeId ?? null}::uuid IS NULL OR intake_id = ${target?.intakeId ?? null}::uuid)
      AND (${target?.mailId ?? null}::uuid IS NULL OR id = ${target?.mailId ?? null}::uuid)
      AND (${automated} OR kind IN ('quote', 'manual'))
    ORDER BY CASE kind WHEN 'first_reply' THEN 0 WHEN 'follow_up' THEN 2 ELSE 1 END, created_at
    FOR UPDATE SKIP LOCKED LIMIT 1
  )
  UPDATE estimate_sales_mail AS m SET state = 'sending', claim_token = gen_random_uuid(),
    lease_until = now() + INTERVAL '3 minutes'
  FROM next WHERE m.id = next.id RETURNING m.id, m.claim_token`;
  return rows[0] as { id: string; claim_token: string } | undefined;
}

export async function getSendableLeadMail(id: string, claim: string): Promise<ClaimedMail | undefined> {
  const sql = await getIntakeSql();
  const rows = await sql`SELECT m.*, i.name, i.location, i.email, i.service, i.details, i.source_email,
    CASE WHEN m.kind = 'first_reply' OR m.automatic THEN i.photos ELSE '[]'::jsonb END AS photos,
    jsonb_array_length(i.photos) AS photo_count,
    s.reply_token, CASE WHEN m.kind IN ('first_reply', 'follow_up') AND m.envelope IS NULL
      THEN s.owner ELSE m.owner END AS owner,
    parent.created_at::text AS parent_created_at, parent.body AS parent_body,
    parent.quote_document->>'scope' AS parent_scope
    FROM estimate_sales_mail AS m
    JOIN estimate_sales AS s ON s.intake_id = m.intake_id
    JOIN estimate_intakes AS i ON i.id = m.intake_id
    LEFT JOIN estimate_sales_mail AS parent ON parent.id = m.parent_id
    WHERE m.id = ${id} AND m.claim_token = ${claim} AND m.state = 'sending'
      AND (
        m.kind = 'manual'
        OR m.kind = 'quote' AND i.status IN ('new', 'contacted', 'quoted') AND m.quote_version = s.approved_version
          AND (NOT m.automatic OR NOT s.paused)
        OR NOT s.paused AND (
          m.kind = 'first_reply' AND i.status = 'new'
            AND NOT EXISTS (SELECT 1 FROM estimate_sales_mail AS other WHERE other.intake_id = m.intake_id
              AND (other.kind IN ('received', 'manual') OR other.kind = 'quote' AND other.state IN ('pending', 'sending', 'accepted')))
          OR m.kind = 'follow_up' AND i.status = 'quoted' AND m.quote_version = s.approved_version
            AND parent.state = 'accepted' AND EXTRACT(ISODOW FROM now() AT TIME ZONE 'America/New_York') < 6
            AND NOT EXISTS (SELECT 1 FROM estimate_sales_mail AS other WHERE other.intake_id = m.intake_id
              AND other.kind IN ('received', 'manual') AND other.created_at >= parent.created_at)
        )
      )`;
  return rows[0] as ClaimedMail | undefined;
}

export async function latestLeadThread(intakeId: string, parentId?: string) {
  const sql = await getIntakeSql();
  const rows = await sql`SELECT provider_id, message_id, kind FROM estimate_sales_mail
    WHERE intake_id = ${intakeId} AND state IN ('accepted', 'received')
      AND (${parentId ?? null}::uuid IS NULL OR id = ${parentId ?? null}::uuid)
    ORDER BY COALESCE(accepted_at, created_at) DESC LIMIT 1`;
  return rows[0] as { provider_id: string; message_id: string | null; kind: MailKind } | undefined;
}

export async function storeLeadEnvelope(job: ClaimedMail, envelope: MailEnvelope, body: string) {
  const sql = await getIntakeSql();
  const rows = await sql`UPDATE estimate_sales_mail
    SET envelope = COALESCE(envelope, ${JSON.stringify(envelope)}::jsonb),
      attempted_at = COALESCE(attempted_at, now()), owner = ${job.owner}, body = ${body}
    WHERE id = ${job.id} AND claim_token = ${job.claim_token} AND state = 'sending'
      AND (attempted_at IS NULL OR attempted_at > now() - INTERVAL '23 hours')
    RETURNING envelope`;
  return rows[0]?.envelope as MailEnvelope | undefined;
}

export async function finishLeadMail(id: string, claim: string, state: "failed" | "held" | "canceled", reason: string) {
  const sql = await getIntakeSql();
  await sql`WITH finished AS (
    UPDATE estimate_sales_mail SET state = ${state}, reason = ${reason}, claim_token = NULL, lease_until = NULL
    WHERE id = ${id} AND claim_token = ${claim} AND state = 'sending'
    RETURNING intake_id, automatic, state, attempted_at
  ) INSERT INTO estimate_sales_mail (intake_id, kind, quote_version)
    SELECT intake_id, 'first_reply', 0 FROM finished
    WHERE automatic AND state = 'held' AND attempted_at IS NULL
    ON CONFLICT (intake_id, kind, quote_version) DO NOTHING`;
}

export async function getQuoteAttachment(intakeId: string, mailId: string) {
  const sql = await getIntakeSql();
  const rows = await sql`SELECT envelope->'attachments'->0 AS attachment
    FROM estimate_sales_mail WHERE intake_id = ${intakeId} AND id = ${mailId}
      AND kind = 'quote' AND state = 'accepted'`;
  return rows[0]?.attachment as NonNullable<MailEnvelope["attachments"]>[number] | undefined;
}

export async function acceptLeadMail(job: ClaimedMail, providerId: string, followUpOn: string | null, reason: string) {
  const sql = await getIntakeSql();
  await sql`WITH accepted AS (
    UPDATE estimate_sales_mail SET state = 'accepted', provider_id = ${providerId}, accepted_at = now(),
      follow_up_on = ${followUpOn}::date, reason = ${reason}, claim_token = NULL, lease_until = NULL
    WHERE id = ${job.id} AND claim_token = ${job.claim_token} AND state = 'sending'
    RETURNING kind, intake_id
  ) UPDATE estimate_intakes AS i SET status = 'quoted', updated_at = now()
    FROM accepted WHERE accepted.kind = 'quote' AND i.id = accepted.intake_id AND i.status IN ('new', 'contacted', 'quoted')`;
}

export async function recordLeadInbound(input: {
  token: string; providerId: string; messageId: string | null; text: string;
  attachmentCount: number; receivedAt: string; stop: boolean;
}) {
  const sql = await getIntakeSql();
  await sql`WITH received AS (
    INSERT INTO estimate_sales_mail (intake_id, kind, state, owner, body, provider_id, message_id, attachment_count, created_at)
    SELECT intake_id, 'received', 'received', owner, ${input.text}, ${input.providerId}, ${input.messageId},
      ${input.attachmentCount}, ${input.receivedAt}::timestamptz
    FROM estimate_sales WHERE reply_token = ${input.token}
    ON CONFLICT (provider_id) DO NOTHING RETURNING intake_id
  ) UPDATE estimate_sales SET paused = true
    FROM received WHERE received.intake_id = estimate_sales.intake_id AND ${input.stop}`;
}
