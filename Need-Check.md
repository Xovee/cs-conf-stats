# Need Check

A list of events that need further check.

Last reviewed: 2026-08-03.

## Rule

For recent years, if 2024, 2025, or 2026 data already exists in `data/conf.json`, treat it as confirmed and do not re-check it here.

Exception: keep the item here when `If-You-Know.md` explicitly says that a recent-year statistic is still missing or uncertain.

When official statistics are unavailable, data can still be treated as valid if two independent sources, such as author pages, blogs, CVs, or reports, mutually verify the same number.

## 2026 Data To Add or Check

These 2026 events are not yet in `data/conf.json`, and official pages show that results, proceedings, or programs are available or likely available.

- PODS 2026: held May 31-Jun 05, 2026 in Bengaluru. The official accepted-paper page lists 41 PODS papers, and DBLP/ACM DL confirm the PACMMOD PODS proceedings/issues, but no submission count was found in official pages, news, author pages, or title-specific searches.
  Sources:
  - https://2026.sigmod.org/pods_papers.shtml
  - https://dblp.uni-trier.de/db/conf/pods/index.html
  - https://dl.acm.org/doi/10.1145/3767714
- SODA 2026: held Jan 11-14, 2026 in Vancouver. SIAM links the online program, proceedings, and searchable abstracts.
  Source: https://www.siam.org/conferences-events/past-event-archive/soda26/

## 2026 Sweep Findings

Search paused on 2026-07-03. Do not edit `conf.json` from these notes without a final source/mapping check.

### High-Confidence Candidate

None right now.

### Strong Leads Needing One More Check

- PODS 2026: official accepted-paper page lists 41 papers, but submission count was not found after checking official pages, DBLP/ACM DL, SIGMOD/PODS news, title-specific queries, and several author/homepage/news hits. Keep tracking for a chair report, SIGMOD Record/SIGACT News note, or author/CV acceptance-rate source.
  Sources:
  - https://2026.sigmod.org/pods_papers.shtml
  - https://dblp.uni-trier.de/db/conf/pods/index.html

### Not Ready / Conflicting

- SODA 2026, IPDPS 2026, RTAS 2026, Eurographics 2026, EuroVis 2026, ICMR 2026, ICRA 2026, RSS 2026, VR 2026, and NAACL 2026: official programs/proceedings or accepted-paper pages are visible, but accepted/submitted statistics were not fully verified in this paused search.

## Next Online-Check Candidates

These 2026 entries are not yet in `data/conf.json` and should be checked for newly published results, accepted-paper pages, or proceedings:

- PODS 2026
- IPDPS 2026
- RTAS 2026
- TACAS 2026
- Eurographics 2026
- EuroVis 2026
- ICMR 2026
- ICRA 2026
- RSS 2026
- RECOMB 2026
- VR 2026
- NAACL 2026

## If-You-Know Exceptions

These recent-year items stay on the check list because `If-You-Know.md` explicitly marks them as missing or uncertain, even if nearby years may already exist in `data/conf.json`:

- IMC 2025: number of long-paper submissions.
- WSDM 2024.
- CSCW 2019-2024.
- VLDB 2016-now.
- ECIR 2026: full/short paper submission counts. Official proceedings report 46 full papers and 37 short papers, and Springer reports 530 total submissions across all tracks, but the existing ECIR schema needs separate full-paper and short-paper submission counts.

## Local Data Backlog

These are visible from `data/conf.json` and are separate from the 2026 sweep:

- ICWSM latest local year is 2020. Check 2021-2026 proceedings/statistics.
- UbiComp latest local year is 2016. This likely needs a separate policy because UbiComp/IMWUT has a journal/rolling publication model.
