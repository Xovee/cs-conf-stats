# Need Check

A list of events that need further check.

Last reviewed: 2026-09-01.

## Rule

For recent years, if 2024, 2025, or 2026 data already exists in `data/conf.json`, treat it as confirmed and do not re-check it here.

Exception: keep the item here when `If-You-Know.md` explicitly says that a recent-year statistic is still missing or uncertain.

When official statistics are unavailable, data can still be treated as valid if two independent sources, such as author pages, blogs, CVs, or reports, mutually verify the same number.

## 2026 Partial Records

These events now have confirmed partial data in `data/conf.json`. Keep the known fields and continue looking only for the missing complements.

- PODS 2026: 41 accepted research papers; submission count missing.
  Source: https://2026.sigmod.org/pods_papers.shtml
- SODA 2026: 154 accepted papers counted from the official accepted-paper list; submission count missing.
  Source: https://www.siam.org/conferences-events/past-event-archive/soda26/program/accepted-papers/
- ICRA 2026: 5,088 submissions; accepted count missing.
  Source: https://2026.ieee-icra.org/contribute/call-for-icra-2026-papers-now-accepting-submissions/
- RSS 2026: 203 accepted papers; submission count missing.
  Source: https://roboticsconference.org/program/papers/
- RECOMB 2026: 65 accepted papers; submission count missing.
  Source: https://recomb.org/recomb2026/accepted_papers.html

## 2026 Completed In This Sweep

- TACAS 2026: regular research papers 34/117; regular tool papers 15/33.
  Source: https://etaps.org/files/2026/tacas-i-2026.pdf
- Eurographics 2026: 96/253 valid full-paper submissions.
  Source: https://diglib.eg.org/handle/10.1111/cgf70327
- EuroVis 2026: 52/195 full-paper submissions, excluding 10 desk rejections.
  Source: https://diglib.eg.org/handle/10.1111/cgf70477
- ICMR 2026: long papers 277/788; short papers 39/144.
  Source: https://iris.cnr.it/handle/20.500.14243/596261
- VR 2026: 228/775 under the unified TVCG and conference-paper review process. The total comprises 160 TVCG papers and 68 conference-only papers.
  Sources:
  - https://doi.org/10.1109/TVCG.2026.3673782
  - https://ieeevr.org/2026/program/papers/

## 2026 Non-Event

- NAACL has no independent 2026 annual meeting. Do not add a NAACL 2026 record.

## Next Online-Check Candidates

After resolving the partial records above, continue with conferences whose 2026 proceedings or chair reports may now be available:

- ICDE 2026
- VLDB 2026
- CIKM 2026
- ACM MM 2026
- ICDM 2026
- SDM 2026
- ICWSM 2026
- CSCW 2026
- UIST 2026
- SIGCOMM 2026

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
