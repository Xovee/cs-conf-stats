# Project Instructions

These instructions apply to the entire repository.

## Read First

Before researching or editing conference data, read these files in order:

1. [Data collection policy](./docs/data-collection-policy.md) - the authoritative rules.
2. [Need Check](./Need-Check.md) - the active research ledger.
3. [If You Know](./If-You-Know.md) - the public list of missing or uncertain data.
4. The relevant records in [conference data](./data/conf.json) and [canonical locations](./data/locations.json).

Do not reconstruct policy from old chat history or individual event notes. If another project document conflicts with the data collection policy, follow the policy and fix the stale document in the same change.

## Data Work

- The default statistical scope is the main Research, Technical, or Full Paper track. Add a secondary track only when it is already intentionally tracked or the user explicitly requests it.
- Use the valid substantive review or decision pool as the denominator. Exclude desk-rejected, invalid, duplicate, and non-compliant submissions; handle withdrawals according to whether they entered that pool.
- Treat existing 2024-2026 records as confirmed. Do not re-check or replace them unless `If-You-Know.md` marks the field as missing or uncertain, or the user asks for a review.
- Official sources are preferred. Without an official source, require two independent sources that verify the same field and scope.
- Partial yearly records are valid. Never invent missing values or use `0` or `null` as placeholders.
- Every location must use the exact canonical display form in `data/locations.json`, after the event location itself has been verified from an official source.
- Surface conflicting counts or ambiguous scopes to the user. Do not silently choose between them.

## Editing Boundaries

- Edit source data and source files, then regenerate derived output with `npm run build`.
- Do not hand-edit `conferences/`, `sitemap.xml`, `robots.txt`, or `output.css`; they are generated.
- Keep `Need-Check.md` operational and `If-You-Know.md` public-facing. Durable rules belong only in `docs/data-collection-policy.md`.
- Preserve unrelated user changes in a dirty worktree.
- Commit or push only when the user explicitly asks.

## Verification

After changing data, documentation, or site code, run:

```shell
npm run build
npm run check
git diff --check
```

Review the resulting diff, including generated files, before reporting completion.
