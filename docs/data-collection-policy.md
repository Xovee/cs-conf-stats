# Data Collection Policy

This is the authoritative policy for researching, deciding, recording, and maintaining conference statistics in CS Conf Stats. `AGENTS.md`, `README.md`, `Need-Check.md`, and `If-You-Know.md` should point here instead of restating durable rules.

Last reviewed: 2026-09-01.

## 1. Project Scope

The project primarily tracks the main Research, Technical, or Full Paper track of each conference. The goal is a consistent annual series, not exhaustive coverage of every track.

- Track a secondary track only when it is important, already part of the series' established schema, or explicitly requested by the maintainer.
- Keep Main, Short, Industry, Applied, Findings, Journal, demo, workshop, and other pools separate.
- Do not combine tracks merely because a proceedings preface reports one overall total.
- Preserve a conference's established historical scope when possible. If a newly available number uses a different scope, leave the field incomplete instead of breaking comparability.
- For rolling or journal-first venues, establish a conference-year mapping before adding annual counts.

## 2. What Counts as a Submission

Use the number of valid papers that entered the substantive review or decision pool.

- Exclude desk-rejected, invalid, duplicate, and non-compliant papers. Exclude withdrawals that left before substantive review or decision; investigate later withdrawals instead of applying a blanket rule.
- Prefer explicit labels such as `valid submissions`, `eligible submissions`, or `papers sent for review` over an undifferentiated received total.
- Do not sum multiple cycles or resubmission pools unless the source states that the annual figures are unique and non-overlapping.
- Do not treat an initial or conditional acceptance as final when shepherding or a later decision stage can change the count.
- If only an overall total including excluded papers is known, record other verified fields as a partial entry and keep the submission count unresolved.

## 3. Source Standard

Judge every field independently. A location, ordinal, submission count, and accepted count may each have different evidence.

### Official evidence

One direct official source is sufficient when it clearly states or enumerates the field and its scope. Preferred official sources include:

- proceedings prefaces or chair reports;
- conference, society, or publisher pages;
- official accepted-paper lists or programs;
- official transparency reports or submission-system summaries.

Counting a clearly scoped official accepted-paper list is allowed. Record any material exclusions or category boundaries in the research ledger.

### Independent corroboration

When no official source is available, two genuinely independent sources may validate the same exact field and scope. Suitable sources include author homepages, CVs, research-group pages, institutional news, blogs, and public reports.

Two pages copying the same announcement are not independent. An approximate percentage and an exact count do not mutually verify an exact ratio unless the arithmetic and rounding leave only one possible value.

### Inference and estimates

Do not add inferred or estimated counts by default. The maintainer may explicitly approve a defensible estimate or reverse calculation. When approved, store a concise `note` explaining the inference, rounding, or range. Never use an estimate merely as a placeholder for an unknown field.

## 4. Conflicts and Decisions

- First determine whether apparently conflicting figures use different tracks, cycles, validity filters, or decision stages.
- Prefer an official value only after confirming that it matches the project's scope.
- If exact figures still conflict, present the values, sources, and likely scope difference to the maintainer. Do not choose silently.
- A missing submission count or missing accepted count is not a reason to reject verified facts; it produces a partial record.
- A concise event `note` should explain an unusual statistical convention or approved inference. It is not a general citation dump.

## 5. Protected Recent Data

Existing records for 2024, 2025, and 2026 in `data/conf.json` are treated as maintainer-confirmed and should not be re-checked during routine sweeps.

Exceptions apply when:

- [If You Know](../If-You-Know.md) explicitly marks a field as missing or uncertain;
- the maintainer explicitly asks to revisit the event.

This protected-year list is deliberate and should be updated explicitly when the project advances to a new collection year.

## 6. Partial Records and Display Behavior

In `yearly_data`, `year` is required. `ordinal`, `location`, `main_track.num_sub`, `main_track.num_acc`, `second_track`, and `note` are independently optional when verified. Do not use `0`, `null`, empty track objects, or invented values for missing facts.

The current application handles partial records as follows:

- acceptance-rate charts and selectivity rankings require both `num_acc` and `num_sub` from the same track;
- submission trend views may use a known `num_sub` without `num_acc`;
- Fun Facts submission and acceptance totals use each known count independently;
- location-based Fun Facts use any verified location;
- every yearly record, including a location-only record, contributes to the event count;
- generated conference pages describe known partial facts without calculating a rate.

This behavior allows useful facts to be published early without pretending that the acceptance rate is known.

## 7. Conference Names and Locations

- `series` is the current canonical short name. Historical or alternate names belong in `metadata.aliases`.
- A rename that changes the canonical series must be handled as a repository-wide data and link migration, not as a note-only edit.
- Verify the actual host city or primary venue from an official conference source.
- Then use the exact `City, Country` display value registered in [canonical locations](../data/locations.json).
- Reuse the repository's existing country and city spelling. Add common alternate forms to `aliases`, pointing to one canonical value.
- For distributed or satellite events, record the principal conference location and explain material exceptions in a note or the research ledger.

The location registry controls spelling and identity consistency; it does not replace factual venue verification.

## 8. Record Status

Classify each researched event into one of four states:

- **Complete:** main-track submission and accepted counts are both verified and recorded.
- **Partial:** at least one useful fact is verified and recorded, but the main-track pair is incomplete.
- **Unresolved:** evidence is insufficient, conflicting, or uses an incompatible scope. Track it without adding an unsupported field.
- **Non-event:** the conference did not hold an edition that year. Record this in the research ledger and do not add a yearly record.

## 9. File Responsibilities

- [data/conf.json](../data/conf.json): published conference metadata and verified or explicitly approved yearly facts.
- [data/locations.json](../data/locations.json): canonical location spellings and aliases.
- [Need-Check.md](../Need-Check.md): operational research ledger, current partial records, source links, conflicts, and next candidates.
- [If-You-Know.md](../If-You-Know.md): concise public list of missing or uncertain statistics where outside help is useful.
- [TODO.md](../TODO.md): product and engineering backlog, not conference research status.
- `conferences/`, `sitemap.xml`, `robots.txt`, and `output.css`: generated output; do not edit by hand.

## 10. Standard Workflow

1. Read this policy, both tracking lists, and the relevant existing conference records.
2. Skip routine re-checking of protected recent records unless an exception applies.
3. Research official sources first. Use two independent secondary sources only when official evidence is unavailable.
4. Confirm track scope, denominator rules, cycle overlap, and decision stage before accepting a number.
5. Classify the event as complete, partial, unresolved, or non-event. Ask the maintainer only when a real conflict or policy choice remains.
6. Update `data/conf.json`, `data/locations.json`, and the two tracking files as appropriate. Keep source URLs and unresolved details in `Need-Check.md`.
7. Run `npm run build`, `npm run check`, and `git diff --check`.
8. Review the full diff for accidental generated-file churn or unrelated edits.
9. Commit and push only when the maintainer explicitly requests it.

## 11. Changing This Policy

Policy changes should be made here first. Update shorter references only when needed, run the document and project checks, and describe the behavioral change clearly in the commit. Event-specific decisions belong in event notes or the research ledger, not in this policy.
