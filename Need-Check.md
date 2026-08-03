# Need Check

A list of events that need further check.

Last reviewed: 2026-07-03.

## Rule

For recent years, if 2024, 2025, or 2026 data already exists in `data/conf.json`, treat it as confirmed and do not re-check it here.

Exception: keep the item here when `If-You-Know.md` explicitly says that a recent-year statistic is still missing or uncertain.

When official statistics are unavailable, data can still be treated as valid if two independent sources, such as author pages, blogs, CVs, or reports, mutually verify the same number.

## 2026 Data To Add or Check

These 2026 events are not yet in `data/conf.json`, and official pages show that results, proceedings, or programs are available or likely available.

- AISTATS 2026: held May 2-5, 2026 in Tangier. Paper decisions and accepted-paper workflow are complete; check the virtual site now and PMLR again when the proceedings volume appears.
  Source: https://virtual.aistats.org/Conferences/2026
- SIGMOD/PODS 2026: held May 31-Jun 05, 2026 in Bengaluru. Accepted-paper pages are visible for both SIGMOD and PODS; update both series after counting papers and checking submission counts.
  Source: https://2026.sigmod.org/
- NDSS 2026: held Feb 23-27, 2026 in San Diego. Accepted papers are visible; accepted count and submission count need extraction/checking.
  Source: https://www.ndss-symposium.org/ndss2026/
- IEEE S&P 2026: held May 18-21, 2026 in San Francisco. Accepted papers page is visible; accepted count and submission count need extraction/checking.
  Source: https://www.ieee-security.org/TC/SP2026/accepted-papers.html
- POPL 2026: held Jan 11-17, 2026 in Rennes. The official site says the POPL proceedings have been published in ACM DL.
  Source: https://conf.researchr.org/home/POPL-2026
- PLDI 2026: held Jun 15-19, 2026 in Boulder. Program and research-paper track are visible; count accepted research papers and find submission count.
  Source: https://pldi26.sigplan.org/
- ICSE 2026: held Apr 12-18, 2026 in Rio de Janeiro. Program/research track is visible; count accepted research-track papers and find submission count.
  Source: https://conf.researchr.org/home/icse-2026
- SODA 2026: held Jan 11-14, 2026 in Vancouver. SIAM links the online program, proceedings, and searchable abstracts.
  Source: https://www.siam.org/conferences-events/past-event-archive/soda26/

## 2026 Sweep Findings

Search paused on 2026-07-03. Do not edit `conf.json` from these notes without a final source/mapping check.

### High-Confidence Candidate

None right now.

### Strong Leads Needing One More Check

- AISTATS 2026: the official virtual site lists 609 paper/poster entries, but no submitted-paper count was found. Check PMLR/OpenReview again later for official proceedings/statistics.
  Source: https://virtual.aistats.org/virtual/2026/papers.html?filter=titles
- ASPLOS 2026: one independent conference note reports 152 accepted out of 1048 submissions, with Spring 20/208 and Summer 132/840. Official program/proceedings pages exist, but the submitted count still needs an official source or a second independent source.
  Sources:
  - https://paper.lingyunyang.com/reading-notes/conference/asplos-2026.md
  - https://www.asplos-conference.org/asplos2026/program/
  - https://dl.acm.org/doi/proceedings/10.1145/3760250
  - https://dl.acm.org/doi/proceedings/10.1145/3779212
- OSDI 2026: one independent conference note reports 135 accepted out of 679 submissions. The USENIX technical sessions page is available, but a chair-message/proceedings-statistics source or a second independent source is still needed.
  Sources:
  - https://paper.lingyunyang.com/reading-notes/conference/osdi-2026.md
  - https://www.usenix.org/conference/osdi26/technical-sessions
- EuroSys 2026: one independent conference note reports Spring-cycle stats of 79 accepted out of 404 submissions. Official papers page is visible, but this is only Spring-cycle data and still needs final total/mapping confirmation.
  Sources:
  - https://paper.lingyunyang.com/reading-notes/conference/eurosys-2026.md
  - https://2026.eurosys.org/papers.html
- HPCA 2026: OpenAccept reports 119 accepted out of 602 submissions, but no official or second independent source was found yet.
  Source: https://github.com/OpenAccept/openaccept-metadata/blob/master/sys/HPCA.json

### Not Ready / Conflicting

- PLDI 2026, ICSE 2026, SODA 2026, POPL 2026, SIGMOD/PODS 2026, NDSS 2026, IEEE S&P 2026, IPDPS 2026, RTAS 2026, Eurographics 2026, EuroVis 2026, ICMR 2026, ICRA 2026, RSS 2026, VR 2026, and NAACL 2026: official programs/proceedings or accepted-paper pages are visible, but accepted/submitted statistics were not fully verified in this paused search.

## Next Online-Check Candidates

These 2026 entries are not yet in `data/conf.json` and should be checked for newly published results, accepted-paper pages, or proceedings:

- EuroSys 2026
- ASPLOS 2026
- HPCA 2026
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
