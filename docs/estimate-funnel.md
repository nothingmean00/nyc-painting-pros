# Estimate funnel measurement

The shared estimate form sends these Vercel Analytics custom events. Each has a
`page` property containing only the pathname, so project briefs and campaign
query strings are not included in custom properties.

| Event | Trigger | Additional properties |
| --- | --- | --- |
| `estimate_started` | First edit, validation block, or valid submit per mounted form | None |
| `estimate_validation_blocked` | First invalid event for each required field per mounted form | `field`: name, phone, email, location, or service |
| `estimate_attempted` | Each valid submit, including retries | None |
| `estimate_failed` | Rejected response or failed request | `reason`: validation, rate_limit, server, or network |
| `estimate_submitted` | API confirms `ok: true` | `service`: an existing service label or Other |

Analytics errors must not prevent submission or turn an accepted request into an
error. No names, contact details, project text, referrers, or submission IDs are
passed to these events. The protected intake workflow remains the source of truth
for requests and qualification. Success events do not establish lead quality,
email delivery, booked work, or revenue.

## How to use the data

Compare starts, attempts, failures, and accepted requests by pathname over the
same 28-day and 90-day windows. Prioritize existing pages generating qualified
requests, then investigate frequently blocked fields and failed attempts. Starts
without success are an abandonment proxy, not a count of unique abandoned leads:
remounts, reloads, retries, blocked analytics, and differing measurement windows
affect the totals. Validation blocks are deduplicated per field per mount;
attempts and failures are not deduplicated.

The new events begin with the September 30, 2026 release; do not compare them to
earlier zero counts as a performance increase. Aggregate exports were unavailable
at release. Check whether the production analytics plan captures custom events
before interpreting missing events as no activity. Review on October 30,
November 29, and December 29, 2026. Obtain aggregate page performance and qualified
intake totals without exporting customer details.

## Safe verification

Use a local production build and replace the browser's estimate fetch with mock
responses before interacting. Capture `window.va` calls locally. Verify one start
per mount, field-block deduplication, no attempt on native-invalid submission,
422 correction, failure/retry, and success. Make `window.va` throw and confirm
an accepted mocked request still displays confirmation. Never send test leads to
the production form or database.
