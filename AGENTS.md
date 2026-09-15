# Project Instructions

These instructions apply to the entire repository.

## Read First

Before conference-data research or edits, consult the authoritative [data collection policy](./docs/data-collection-policy.md) unless its current contents are already available in context. Read only the relevant event, year, and field entries in [Need Check](./Need-Check.md), [If You Know](./If-You-Know.md), and [conference data](./data/conf.json); consult [canonical locations](./data/locations.json) when locations are involved. Read broader ledger sections only when selecting or reviewing a broader research batch. Code-only changes and instruction-only reviews do not require loading conference records.

Do not reconstruct policy from old chat history or individual event notes. Use the data collection policy as the authoritative project policy. During an authorized editing task, correct directly related stale references when the intended behavior is clear. During a read-only review, report discrepancies without editing. If reconciliation would change policy or expand the task, present the decision needed and continue unaffected work.

## Data Work

- The default statistical scope is the main Research, Technical, or Full Paper track. Add a secondary track only when it is already intentionally tracked or the user explicitly requests it.
- Use the valid substantive review or decision pool as the denominator. Exclude desk-rejected, invalid, duplicate, and non-compliant submissions; handle withdrawals according to whether they entered that pool.
- Treat existing 2024-2026 records as confirmed. Do not re-check or replace them unless `If-You-Know.md` marks the field as missing or uncertain, or the user asks for a review.
- Official sources are preferred. Without an official source, require two independent sources that verify the same field and scope.
- Partial yearly records are valid. Never invent missing values or use `0` or `null` as placeholders.
- Every location must use the exact canonical display form in `data/locations.json`, after the event location itself has been verified from an official source.
- Surface unresolved conflicting counts or ambiguous scopes to the user. Do not silently choose between them; leave only the affected fields unresolved and continue independent work within the requested scope.

## Editing Boundaries

- Edit source data and source files; regenerate derived output with `npm run build` when the change affects it.
- Do not hand-edit `conferences/`, `sitemap.xml`, `robots.txt`, or `output.css`; they are generated.
- Keep authoritative data-collection rules in `docs/data-collection-policy.md`. This file may contain a short operational summary linked to the policy; synchronize affected summary text when policy changes. Keep `Need-Check.md` operational and `If-You-Know.md` public-facing, with event evidence and work status in the tracking files.
- Preserve unrelated user changes in a dirty worktree.
- Commit or push only when the user explicitly asks.

## Verification

- For data, site code, build configuration, or generator changes, run `npm run build`, `npm run check`, and `git diff --check`, then review the resulting diff, including generated output.
- For Markdown-only documentation or instruction changes that do not affect generated output, run `npm run check:docs` and `git diff --check`, and review the changed text.
- Reuse successful checks for the same file state; rerun affected checks after relevant changes or new failure evidence. Read-only reviews require no build.
