# Need Check

A list of events that need further check.

Last reviewed: 2026-09-17.

## Purpose

This is the operational research ledger for partial records, source links, unresolved conflicts, and next candidates. Durable decisions about track scope, source confidence, valid submissions, protected recent data, and partial records live in the [data collection policy](./docs/data-collection-policy.md).

Keep this file specific to current evidence and work status. It must not override the policy.

## 2026 Partial Records

These events now have confirmed partial data in `data/conf.json`. Keep the known fields and continue looking only for the missing complements.

### Targeted follow-up: 2026-10-22

- ACM MM 2026 accepted count verified: 1,703 Research/Main Track papers. The official technical programme fetches `program-data.json`, generated at `2026-10-21T15:01:23.878448+00:00`. Filter exactly `track="Main Track"`: 1,865 presentation occurrences consist of 162 oral presentations and 1,703 poster presentations, representing 1,703 unique paper IDs and 1,703 unique titles. Each oral paper also appears once in the poster programme. No missing IDs/titles, conflicting titles for one ID, or cross-track ID collisions were found. Exclude every other track, including BNI, Datasets, Grand Challenge, Demo and Video, Reproducibility, Open Source, Doctoral Symposium, Industry Talk, Interactive Art, and workshops. The maintainer then asked whether the counts were Main Track, reopening the scope check. The previously confirmed 7,053 submissions are retained, but the checked Xiamen University source states only that the conference received 7,053 submissions; its separate six accepted-paper examples are labeled Main Track, which does not establish the denominator's track or substantive-review exclusions. The original 24.15% ratio is computed from the retained denominator, whose scope now has a public verification item and a published caveat. Do not describe the whole pair as freshly verified. Keep the ordinal and location unchanged.
  Sources:
  - https://2026.acmmm.org/site/technical-programme.html
  - https://2026.acmmm.org/site/technical-programme.js
  - https://2026.acmmm.org/site/program-data.json
  Earlier submission-count sources:
  - https://cdmc.xmu.edu.cn/info/1002/5624.htm
  - https://in.linkedin.com/in/aaryansharma-iitb

### Targeted follow-up: 2026-10-02

- Asiacrypt 2026 partial: 197 accepted papers, 32nd edition, `Hong Kong, China`. The official homepage announced the accepted-paper list on September 22. The list is populated from the official `json/papers.json`: 197 entries with 197 unique titles. The submission count is still unverified; the largest paper ID is not a submission count.
  Sources:
  - https://asiacrypt.iacr.org/2026/
  - https://asiacrypt.iacr.org/2026/acceptedpapers.php
  - https://asiacrypt.iacr.org/2026/json/papers.json
- OOPSLA 2026 partial: 170 accepted papers, `Oakland, California, USA`. The official Accepted Papers table (`#event-overview`) has 170 unique event IDs, all labeled OOPSLA. Count this accepted set for the 2026 edition, whose two review rounds publish in PACMPL volume 10, OOPSLA1 and OOPSLA2; do not add the separate SIGPLAN track or the TOPLAS presentation visible in the program. The unique annual substantive-review submission count is still missing; major revisions can cross rounds, so raw round totals cannot be summed without deduplication evidence.
  Sources:
  - https://2026.splashcon.org/track/oopsla-2026
  - https://oopsla26.hotcrp.com/
- ESWEEK 2026 partial records: CASES 45, CODES-ISSS 46, and EMSOFT 49 accepted full papers; all three locations are `Barcelona, Spain`. Count the unique full-paper titles in the official 2026 paper sessions, attributed to this edition, excluding every entry explicitly marked `(LBR)` or `(Extended Abstract)` and excluding separate poster, special-session, and workshop events. Session counts are CASES1-9: 5+5+6+5+5+6+5+4+4=45; CODES1-9: 5+5+5+5+5+6+5+5+5=46; EMSOFT1-10: 5+4+5+5+5+5+5+5+5+5=49. Each series has the same number of unique titles as counted entries. Submission counts remain unverified. The homepage describes the program as preliminary; these are the full papers listed as of this check, not inferred final submission statistics.
  Sources:
  - https://esweek.org/
  - https://esweek.org/full-program/
- EMNLP 2026 partial: `Budapest, Hungary` recorded from the official homepage. Main 2,710 and Findings 2,487 papers are now recorded from the separately tagged official author roster as of October 2, with maintainer authorization to prefer the official counts; see the roster audit below. The program overview mixes Main, Findings, CL, TACL, Industry, SRW, and demo presentations; do not use its combined presentation total as the main-track accepted count. Valid Main and Findings submission counts remain unverified.
  Sources:
  - https://2026.emnlp.org/
  - https://2026.emnlp.org/program/
- SIGGRAPH Asia 2026 partial: 19th edition, `Kuala Lumpur, Malaysia`. The official Technical Papers page says detailed program information is still forthcoming; submission and accepted counts are not verified. Preserve the series' existing aggregate journal/conference Technical Papers scope.
  Sources:
  - https://asia.siggraph.org/2026/
  - https://asia.siggraph.org/2026/program/technical-papers/
- ACM MM, ICDM, and MICRO 2026: checked the official sites for the missing count fields; no usable main-track submission/acceptance pair was found. Existing protected facts remain unchanged. ICDM's new Applied Track and MICRO's Industry Track must remain separate from the main Research Track.
  Sources:
  - https://2026.acmmm.org/
  - https://icdm2026.neu.edu.cn/
  - https://microarch.hosting.acm.org/micro59/
- CCS 2026: the official transparency-report repository still contains only the April 20 Cycle A report. Although its table labels 191 as "Final accepts", its accompanying text says this is an upper bound because Minor Revision and Shepherding papers are not guaranteed final acceptance (78 straight accepts + 66 minor revisions + 47 shepherding). Cycle B and final annual unique counts remain unresolved; no annual counts are added.
  Source: https://github.com/ACM-CCS-2026/Transparency-Report

#### Submission-count follow-up

No complete submission/acceptance pair was added in this batch. Prioritize the missing substantive-review denominators above; location-only additions do not provide new acceptance-rate comparison points.

- ESWEEK: the official 32-page program guide confirms on page 2 that full Journal Track papers are published in TCAD, while Late Breaking papers and invited extended abstracts are separate. The guide contains no exact submission totals for CASES, CODES, or EMSOFT. Their denominators remain unresolved.
  Source: https://esweek.org/wp-content/uploads/2026/10/ESWEEK_2026_program_10.pdf
- OOPSLA: both official PACMPL volume 10 TOC endpoints returned HTTP 403, so their editorial/preface statistics could not be inspected. This access failure does not establish that the counts are unpublished.
  Sources:
  - https://dl.acm.org/toc/pacmpl/2026/10/OOPSLA1
  - https://dl.acm.org/toc/pacmpl/2026/10/OOPSLA2
- EMNLP: the expected 2026 ACL Anthology event endpoint returned HTTP 404; the official program overview still does not supply exact main-track and Findings statistics.
  Source: https://aclanthology.org/events/emnlp-2026/
- Asiacrypt: the accepted-paper JSON identifies its source as `IACR/hotcrp v2` but does not give a reviewed-submission total. No usable denominator was located in the checked official materials.
- SIGGRAPH Asia: the official Facts & Figures page gives event and attendance information, not Technical Papers submission statistics. The checked press-release listing contains earlier-event announcements rather than a 2026 Technical Papers statistical report; do not reuse older figures.
  Sources:
  - https://asia.siggraph.org/2026/about-the-event/fact-figures/
  - https://asia.siggraph.org/2026/for-the-press/press-releases/

#### Public reports and submission-system leads: 2026-10-02

These are source-reported figures, not newly confirmed main-track records. Percentages below computed from a published count pair describe that source's pool; they do not establish the project's substantive-review denominator.

- EMNLP: a Reddit commenter quotes the decision notification: "we received an unprecedented 17669 submissions" and accepted 15.4% as Main Conference papers and 14.3% to Findings. Another commenter explicitly attributes the same percentages to the decision email. These are author reports of one notification, not independent official publications. Mohammad AL-Smadi's August 24 LinkedIn post also reports 17,669 and 15.4%, and claims 2,719 Main acceptances, but its reference for that discussion is the 2025 proceedings; the exact accepted count is not established by that citation. Resolve ARR/preferred-venue versus actual committed-paper pools, desk rejections, and exact final counts before recording. Do not reverse-calculate accepted counts from the rounded rates. A separate commitment discussion reports paper IDs around 10,000; these IDs are not counts.
  Sources:
  - https://www.reddit.com/r/MachineLearning/comments/1vtdpve/comment/p4yrp0q/
  - https://www.reddit.com/r/MachineLearning/comments/1vtdpve/comment/p4yq9x4/
  - https://www.linkedin.com/posts/mohammad-al-smadi-a9136a38_emnlp-nlp-aclrollingreview-share-7497600715289182209-Tou3/
  - https://www.reddit.com/r/MachineLearning/comments/1veat2f/emnlp_commitment_submission_number_d/
- SIGGRAPH Asia: the official `siggraphasia` Instagram post dated July 25 reports 1,315 Technical Papers submissions and 322 conditionally accepted papers (24.49% of that reported pool). Conference chair Frank Guan's May 31 LinkedIn post reports 1,303 submissions and embeds ACM SIGGRAPH's May 26 announcement with the same count. The 1,303 versus 1,315 difference remains unexplained; dates/stages differ. Conditional acceptances must not be recorded as final. Confirm valid submissions and the journal/conference aggregate scope before adding counts.
  Sources:
  - https://www.instagram.com/p/DbM72bHGjih/
  - https://www.linkedin.com/posts/frank-guan-a7604221_siggraph-asia-2026-has-achieved-a-new-milestone-share-7466863735287214080-79R9/
  - https://www.linkedin.com/feed/update/urn:li:share:7464986266955190272/
- CASES: the official HotCRP public homepage states "52 of 197 submissions accepted" (26.40%). The same homepage explicitly receives both Journal Track and Late-Breaking Result Track papers. The 52 count differs from the program's 45 full papers, so this aggregate cannot establish either main-track field. Seek separate Journal Track submission/decision counts and excluded-paper treatment.
  Source: https://cases26.hotcrp.com/
- EMSOFT: the official HotCRP public homepage states "49 of 184 submissions accepted" (26.63%). The 49 count matches the program's full-paper set, and the conference homepage links this submission system. However, the public statistics do not label their track or explain desk rejection/withdrawal treatment. Keep 184 as a denominator candidate pending that scope check.
  Sources:
  - https://emsoft26.hotcrp.com/
  - https://esweek.org/emsoft/
- Asiacrypt, OOPSLA, and CODES-ISSS: no usable 2026 submission/rate report found in this public-search pass. OpenAccept's Asiacrypt table ends at 2025. SIGPLAN's Objectives of OOPSLA supplies approximate 2024/2025 round counts and only an expectation of growth in 2026, not 2026 statistics. CODES' public submission-system homepage has no count pair and receives both Journal and Late-Breaking tracks. This search result does not establish that nobody has shared figures.
  Sources:
  - https://openaccept.org/c/sec/asiacrypt/
  - https://www.sigplan.org/Conferences/SPLASH/ObjectivesOfOOPSLA/
  - https://codes2026.hotcrp.com/

#### Scope and official-roster follow-up: 2026-10-02

- EMNLP official roster: the conference Program page links to the public spreadsheet `EMNLP 26 Author Presenter Schedule and Times`. Its `Author Presentations ` sheet (sheet ID 943432490; trailing space in the tab name) has 5,612 rows including the header. The full readable fetch includes all 5,611 paper rows and the two auxiliary sheets. Count only paper IDs matching `^[0-9]+-MAIN$` or `^[0-9]+-FIND$`, excluding CL, TACL, IND, and DEMO. This yields 2,710 unique Main IDs/titles and 2,487 unique Findings IDs/titles, with no duplicate IDs, duplicate titles, or missing titles in either set. Include virtual entries and the 1,068 Findings entries marked Not Presenting; do not count only in-person presentations. The file metadata was modified on October 1 at 23:45:16 UTC. These are current official-roster counts, not an established decision-pool acceptance total. The Main roster differs by 9 from the unsupported LinkedIn claim of 2,719. The reason is not established; do not infer withdrawals or corrections. The maintainer explicitly instructed official sources to take precedence (official counts prevail), authorizing recording these dated roster counts: Main 2,710 and Findings 2,487. Store a note identifying the October 2 roster scope; do not treat the unsupported 2,719 claim as the source of an accepted count. The 17,669 substantive-review denominator remains unconfirmed.
  Sources:
  - https://2026.emnlp.org/program/
  - https://docs.google.com/spreadsheets/d/1aXGTy_7Xeh-OXIs3iJSbDpUsZ6YhbfA76b17kBZH0Yk/edit?gid=943432490#gid=943432490
  - https://www.linkedin.com/posts/pghazvinian_emnlp2026-emnlp-emnlp2026-share-7498401680791650304-uvFl/
  The last author post confirms 17,669 and only approximate 15%/14% rates; it does not state exact accepted counts. Search-engine generated summaries claiming exact counts from this post are not evidence.
- SIGGRAPH Asia: the official submission page links a three-page PDF headed `SIGGRAPH Asia 2026 Conditionally Accepted Technical Papers`. It lists 322 IDs (110, 110, and 102 on pages 1-3), matching the Instagram conditional count. This strengthens the conditional-count evidence but does not establish final acceptance. The current program page still says detailed program information is forthcoming. The submission page confirms the integrated Journal/Conference Technical Papers review scope; the 1,303 versus 1,315 submission discrepancy and valid-review denominator remain unresolved.
  Sources:
  - https://asia.siggraph.org/2026/submissions/technical-papers/
  - https://asia.siggraph.org/2026/images/pdfs/SIGGRAPH-Asia-2026-Conditionally-Accepted-Technical-Papers.pdf
  - https://asia.siggraph.org/2026/program/technical-papers/
- EMSOFT: the full-length CFP links directly to `emsoft26.hotcrp.com` and confirms two-stage Journal Track review and TCAD publication. Its public Deadlines page lists March registration/full submission and June resubmission only, with no separate June 5 Late-Breaking deadline. The 49/184 homepage pair therefore has additional main-track evidence, but its treatment of desk rejections and withdrawals is still unstated. Do not assume those exclusions from the generic term submissions.
  Sources:
  - https://esweek.org/emsoft_cfp/
  - https://emsoft26.hotcrp.com/deadlines
  - https://esweek.org/author-information/
- CASES: ESWEEK's author instructions confirm that Journal and Late-Breaking papers are mutually exclusive publication pools. The combined HotCRP homepage pair still cannot be partitioned into a 45-paper Journal Track denominator. No 2026 TCAD guest editorial was identified by the focused public search; unrelated current-issue/editorial matches do not establish ESWEEK statistics.
  Source: https://esweek.org/author-information/

### Targeted follow-up: 2026-09-25

- NeurIPS 2026 completed: 7,900/30,709 (25.73%). The official Main Track decision notification supplied by the maintainer states "30709 valid paper submissions with a PDF" and 7,900 final acceptances: 7,496 posters, 292 spotlights, and 112 orals. These presentation categories sum to the main-track accepted total and are not separate tracks. The notification reports a rounded rate of 25.7%. The official conference homepage confirms the Fortieth Annual Conference and Sydney as the main site (December 6-12), with Atlanta and Paris as satellite sites (December 9-13). The canonical main location is recorded as `Sydney, Australia`, with the satellite arrangement explained in the event note.
  Source: NeurIPS 2026 Program Chairs' decision notification via OpenReview, provided by the maintainer on 2026-09-25; no public source URL supplied. Personal submission details are not retained.
  Official ordinal and location source: https://neurips.cc/Conferences/2026 (checked 2026-09-25).

### Targeted follow-up: 2026-09-15

- UIST 2026 completed: 253/1,175 (21.53%). Two independent author/research-group pages report 253 accepted papers. The official pre-rebuttal summary explicitly separates 1,259 complete submissions into 84 pre-full-review rejections (27 desk and 57 assisted desk) and 1,175 papers receiving four reviews. The maintainer approved correcting the protected existing denominator on 2026-09-15; the complete-submission denominator used by the author pages is not used for the project rate.
  Sources:
  - https://uist.acm.org/2026/announcements/
  - https://makeabilitylab.cs.washington.edu/member/jaredhwang/
  - https://ruixiao24.github.io/publications/
- ICRA 2026 completed: 1,882/4,947 (38.04%). On 2026-09-15, the maintainer confirmed that 4,947 is the valid substantive-review pool, resolving the denominator question and replacing the earlier 5,088 submission total. Minoru Asada's first-hand conference report quotes the program chair's opening presentation with this ratio; Herbie Wright independently reports 1,882 accepted conference papers and distinguishes over 1,000 journal transfers. The exact breakdown of the 141 excluded submissions is not asserted.
  Sources:
  - https://robogaku.jp/news/2026/pblog040.html
  - https://thoughts.herbiewright.com/posts/icra_trends/
  - https://2026.ieee-icra.org/announcements/record-of-submissions/
- SIGCOMM 2026 completed: 109/513 (21.25%). On 2026-09-15, the maintainer confirmed this ratio for the project's decision-pool scope. The conference welcome-session report gives 109 accepts, including 19 one-shot revisions. This approved decision statistic replaces the existing 110 from the official accepted-paper page; the reason for the one-paper discrepancy is not asserted.
  Sources:
  - https://everythinginsigcomm.group/t/sigcomm26-conference-welcome-awards/499
  - https://conferences.sigcomm.org/sigcomm/2026/accepted/

### Existing partial records

- PODS 2026: 41 accepted research papers; submission count missing.
  Source: https://2026.sigmod.org/pods_papers.shtml
- SODA 2026: 154 accepted papers counted from the official accepted-paper list; submission count missing.
  Source: https://www.siam.org/conferences-events/past-event-archive/soda26/program/accepted-papers/
- RSS 2026: 203 accepted papers; submission count missing.
  Source: https://roboticsconference.org/program/papers/
- RECOMB 2026: 65 accepted papers; submission count missing.
  Source: https://recomb.org/recomb2026/accepted_papers.html
- ICDE 2026: 261 accepted research papers; submission count missing.
  Source: https://icde2026.github.io/accepted-papers.html
- ICWSM 2026: 154 full papers in the official proceedings; the exact full-paper submission count is not published. ICWSM 2026 used three submission rounds (2025-05-15, 2025-09-15, 2026-01-15) plus revise-and-resubmit, and both the official site and the proceedings preface state only an approximate 20% acceptance rate, so the submission count stays unresolved rather than being derived from the rate (policy section 12).
  Sources:
  - https://ojs.aaai.org/index.php/ICWSM/issue/view/735
  - https://icwsm.org/2026/submit.html
- SDM 2026: official location recorded; submission and accepted counts missing.
  Source: https://www.siam.org/conferences-events/siam-conferences/sdm26/
- VLDB 2026: official location recorded; rolling Research Track submission and accepted counts missing.
  Source: https://vldb.org/2026/
- ICDM 2026: official location recorded; Research Track submission and accepted counts missing.
  Source: https://icdm2026.neu.edu.cn/
- COLT 2026: 191 accepted papers; exact submission count missing. One institutional announcement says nearly 650 submissions.
  Sources:
  - https://learningtheory.org/colt2026/accepted.html
  - https://www.linkedin.com/posts/the-taub-faculty-of-computer-science-technion_congratulations-to-elizaveta-nesterova-activity-7476920744724180992-j8gN
- PPoPP 2026: 51 accepted main-conference papers; submission count missing.
  Source: https://ppopp26.sigplan.org/track/PPoPP-2026-papers
- DAC 2026: 544 accepted Research Manuscripts recorded from the official accepted-ID page; submission count missing.
  Source: https://dac.com/2026/accepted-paper-ids
- ATC 2026: official Hong Kong location recorded; main-track submission and accepted counts are not yet available. From 2026, the former USENIX ATC continues as the ACM SIGOPS Annual Technical Conference (ATC).
  Source: https://sigops.org/s/conferences/atc/2026/index.html
- ICS 2026: 102 accepted main-conference papers counted from the official program; submission count missing.
  Source: https://dipsa-qub.github.io/ICS2026-webpage/program/program.html
- STOC 2026: 212 accepted papers counted from the official accepted-paper list; submission count missing.
  Source: https://acm-stoc.org/stoc2026/accepted-papers.html
- ICFP 2026: 38 accepted PACMPL papers counted from the unique paper DOIs on the official Accepted Papers page; submission count missing.
  Source: https://icfp26.sigplan.org/track/icfp-2026/icfp-2026-icfp-papers
- FM 2026: 45 Research Track papers are recorded. The proceedings report 239 combined Research and TAP submissions and 51 accepted papers overall; the official TAP list contains 6 accepted papers, so the combined submission count cannot be used for the Research Track.
  Sources:
  - https://link.springer.com/book/10.1007/978-3-032-26204-2
  - https://conf.researchr.org/track/fm-2026/fm-2026-research-paper
  - https://conf.researchr.org/track/fm-2026/fm-2026-tap
- FOCS 2026: 174 accepted papers counted from the official list; submission count missing.
  Source: https://focs.computer.org/2026/accepted-papers/
- VIS 2026: 145 accepted VIS full papers counted from the official page after excluding 63 papers marked TVCG and 11 marked CG&A; submission count missing. Boston is recorded as the flagship location, while Paris and Tianjin are satellite locations.
  Sources:
  - https://www.ieeevis.org/year/2026/info/program/papers_list/
  - https://www.ieeevis.org/year/2026/satellites/
- SIGSPATIAL 2026: 58 accepted Research Papers counted from the official list before the separate Short Papers section; Research Paper submission count missing.
  Source: https://sigspatial2026.sigspatial.org/research-accepted/
- CCS 2026 partial, updated 2026-10-22: 482 accepted main-conference papers recorded; official location and 33rd edition retained. The official accepted-paper page lists 187 First Cycle papers and 295 Second Cycle papers, or 482 unique titles. The Main Conference Schedule contains 483 unique `data-paper-id` values: 187 Cycle A and 296 Cycle B papers, with no duplicate IDs. Of the 482 accepted-list papers, 481 match the schedule titles exactly; Cycle B #259 changes "Cross-Publication-Origin" to "Cross-Publication-Point" in its RPKI title, with the same six authors in the same order, so these are one paper. The schedule additionally lists Cycle B #1241, "GPUThor: Amplifying Rowhammer Attacks via Non-Uniform Patterns to Exploit ECC-Protected GPUs", in the H7 Hardware technical session; the accepted list does not include it. Both pages enumerate main-conference technical papers, not artifacts, workshops, or separate posters. Their HTTP Last-Modified headers are October 16 for the accepted list and October 6 for the schedule, so the 483 count cannot simply be treated as the later update. The maintainer subsequently authorized choosing one supported source for comparable counts differing by at most three papers. Under that rule, use the explicit official accepted-paper list's 482, and retain the unexplained one-paper discrepancy in the published note; no omission or withdrawal cause is asserted. The transparency-report repository still contains only the April 20 Cycle A report: 191 is an upper bound including pending revisions/shepherding, and 981 is only that cycle's decision pool. No final unique annual submission count is verified; do not sum cycles without overlap evidence.
  Sources:
  - https://www.sigsac.org/ccs/CCS2026/
  - https://www.sigsac.org/ccs/CCS2026/program/accepted-papers.html
  - https://www.sigsac.org/ccs/CCS2026/program/schedule.html
  - https://github.com/ACM-CCS-2026/Transparency-Report
- MICRO 2026: 213 accepted main Research Track papers recorded from the official program and program co-chair report; submission count remains unresolved. The 7 inaugural Industry Track papers are excluded. Researcher-reported 842 submissions still lack substantive-review pool clarification; see the one-hour exploration below.
  Sources:
  - https://microarch.hosting.acm.org/micro59/
  - https://www.microarch.org/micro59/submit/industrial.php
- MobiCom 2026: 88 accepted main-conference papers counted from the official accepted-paper page (29 Summer + 59 Winter); the annual submission count is still missing.
  Sources:
  - https://www.sigmobile.org/mobicom/2026/
  - https://www.sigmobile.org/mobicom/2026/accepted.html
- IMC 2026: official location and 26th edition recorded. The accepted-paper page now posts both Cycle 1 (23 papers) and Cycle 2 (54 entries), but the Cycle 2 list mixes in the Replicability Track without separation, so the main-track accepted count and the exact annual full-paper submission statistics remain unresolved.
  Sources:
  - https://conferences.sigcomm.org/imc/2026/
  - https://conferences.sigcomm.org/imc/2026/accepted-papers/
- SC 2026: official Chicago location recorded; Technical Paper submission and accepted counts missing. Two independent author pages report an acceptance rate of about 19% (19.2% and 19.0%), but exact counts are not yet available.
  Sources:
  - https://sc26.supercomputing.org/
  - https://abrahamchan.github.io/
  - https://hasanur-rahman.github.io/
- ICCAD 2026: official San Jose location and 45th edition recorded; Regular Paper submission and accepted counts missing. An author announcement reports an approximate 24% acceptance rate, which is insufficient for exact counts.
  Sources:
  - https://iccad.com/2026/
  - https://sites.google.com/view/liang/publication
  - https://www.linkedin.com/in/sang-geon-yun

## 2026 Completed In This Sweep

- RTSS 2026: 48/350 Research Track papers. Initial decisions were 32 accepted plus 18 conditionally accepted papers; the official program lists 48 research papers, which is the value recorded.
  Sources:
  - https://2026.rtss.org/
  - https://2026.rtss.org/program/program/
- UIST 2026: 253/1,175 fully reviewed papers; see the 2026-09-15 follow-up above for sources and the approved denominator correction.
- ICRA 2026: 1,882/4,947 valid submissions; see the 2026-09-15 follow-up above for sources and maintainer confirmation.
- SIGCOMM 2026: 109/513; see the 2026-09-15 follow-up above for sources and the maintainer-approved resolution.

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
- CIKM 2026: 597/2,216 full research papers.
  Sources:
  - https://gli.konkuk.ac.kr/publications/papers/
  - https://news.hntou.edu.cn/jxky/202608/t20260817_105843.html
- CSCW 2026: 194/637 complete paper submissions in the official May 2025 cycle.
  Sources:
  - https://cscw.acm.org/2026/blog/finaldecisions.html
  - https://cscw.acm.org/2026/
- USENIX Security 2026: 362/2,750 valid submissions across the two review cycles.
  Sources:
  - https://www.usenix.org/sites/default/files/sec26_message.pdf
  - https://www.usenix.org/conference/usenixsecurity26/technical-sessions
- CAV 2026: 81/319 across the official paper categories: 54 full papers, 21 short tool papers, and 6 industrial experience reports and case studies.
  Sources:
  - https://link.springer.com/book/10.1007/978-3-032-32519-8
  - https://conferences.i-cav.org/2026/
- MobiSys 2026: 68/302 main-conference papers. The official program confirms the accepted set, and two independent author publication pages report the same ratio.
  Sources:
  - https://www.sigmobile.org/mobisys/2026/program/
  - https://nxc.snu.ac.kr/publications
  - https://www.cse.msu.edu/~ghtu/publications.html
- FSE 2026: 211/920 Research Papers. The accepted count appears on the official program, and the full ratio is independently reported in the conference sponsorship material and an author announcement.
  Sources:
  - https://conf.researchr.org/track/fse-2026/fse-2026-research-papers
  - https://www.shinhwei.com/FSE-Sponsorship-Information.pdf
  - https://www.linkedin.com/posts/jaydeb-sarker_mentoringresearch-fse2026-activity-7442521717106790401-hMwi
- ICALP 2026: 190/628 eligible submissions across Tracks A and B (155/523 and 35/105 respectively).
  Source: https://drops.dagstuhl.de/storage/00lipics/lipics-vol374-icalp2026/LIPIcs.ICALP.2026.0/LIPIcs.ICALP.2026.0.pdf
- LICS 2026: 82/293 paper submissions; the proceedings also report seven desk rejections.
  Source: https://drops.dagstuhl.de/storage/00lipics/lipics-vol380-lics2026/LIPIcs.LICS.2026.0/LIPIcs.LICS.2026.0.pdf
- CCC 2026: 42/124 submissions.
  Source: https://drops.dagstuhl.de/storage/00lipics/lipics-vol383-ccc2026/LIPIcs.CCC.2026.0/LIPIcs.CCC.2026.0.pdf
- CRYPTO 2026: 189/781 full papers.
  Source: https://link.springer.com/book/10.1007/978-3-032-35428-0
- ECOOP 2026: 30/98 unique submissions across the two official review rounds.
  Source: https://drops.dagstuhl.de/storage/00lipics/lipics-vol372-ecoop2026/LIPIcs.ECOOP.2026.0/LIPIcs.ECOOP.2026.0.pdf
- ISMB 2026: 65/408 Proceedings submissions.
  Source: https://academic.oup.com/bioinformatics/article/42/Supplement_1/btag279/8726347
- UAI 2026: 332/1,087 papers. An NTT institutional announcement reports 1,087 submissions and a 30.5% acceptance rate; an independent author announcement gives the exact ratio.
  Sources:
  - https://www.group.ntt/en/topics/2026/08/14/uai2026.html
  - https://www.linkedin.com/in/parth-patel-1020prp
- SIGGRAPH 2026: Conference track 195/961 and Journal-only track 132/216. The 132 Journal papers include 97 journal-only submissions and 35 dual-track submissions, following the same display convention as existing years.
  Sources:
  - https://dl.acm.org/doi/10.1145/3815597
  - https://s2026.siggraph.org/program/technical-papers/
- ASE 2026: 263/1,304 Research Papers. The official accepted-paper page confirms the accepted set, while two independent author and research-group publication pages report the exact ratio.
  Sources:
  - https://conf.researchr.org/track/ase-2026/ase-2026-research-track
  - https://security.csl.toronto.edu/blog/wp-publications/dingase2026rfc2tla/
  - https://rebels.cs.uwaterloo.ca/publications.html
- ISSTA 2026: 210/888 Research Papers. The official accepted-paper page confirms the accepted set, and a Waterloo research-group publication page reports the exact ratio.
  Sources:
  - https://conf.researchr.org/track/issta-2026/issta-2026-research-papers
  - https://rebels.cs.uwaterloo.ca/publications.html
- SenSys 2026: 48/257 papers. This is the inaugural ACM/IEEE SenSys formed by merging the former SenSys, IPSN, and IoTDI communities.
  Sources:
  - https://sensys26.hotcrp.com/
  - https://sensys.acm.org/2026/
- IROS 2026: 1,585/4,348 contributed conference papers. The larger 4,947 figure reported elsewhere includes additional submission pools and is not used, consistent with prior years.
  Sources:
  - https://bme.uic.edu/news-stories/internship-leads-to-a-published-paper-for-undergrad/
  - https://www.linkedin.com/posts/fpt-software-ai-center_fpt-airesidency-iros2026-activity-7477692478129848320-tJVC
  - https://2026.ieee-iros.org/
- ICME 2026: 1,101/3,810 valid submissions. Two independent acceptance announcements report this review-decision ratio. A later General Chair summary reports 1,092/3,989 overall; the valid-submission ratio is used to exclude invalid or desk-rejected papers.
  Sources:
  - https://www.linkedin.com/posts/fpt-software-ai-center_fptsoftwareaicenter-airesidency-ai1-activity-7441831263021355009-eCdf
  - https://www.linkedin.com/posts/yassin-terraf_icme2026-speakeridentification-speakerrecognition-activity-7459543824915234816-OF-1
  - https://www.linkedin.com/posts/supavadee_icme2026-ieee-multimedia-activity-7482467345958047744-m3Al

## 2026 Non-Event

- NAACL has no independent 2026 annual meeting. Do not add a NAACL 2026 record.
- ICCV is biennial and has no 2026 edition. Do not add an ICCV 2026 record.

## Next Online-Check Candidates

After resolving the partial records above, continue with conferences whose 2026 proceedings or chair reports may now be available. The first 2026 candidate sweep is complete; choose the next batch from conferences that still lack a 2026 entry.

## Bounded 2025 Follow-up: 2026-10-02

The maintainer requested one limited attempt at IMC, ICWSM, CSCW, and UbiComp, with difficult fields deferred until new evidence appears. No new complete submission/acceptance pair was verified in this pass.

- IMC 2025 partial: 25th edition, `Madison, USA`, 46 Long papers and 23 Short papers. Counted 73 unique program entry IDs: 46 Long (including 2 separately award-tagged papers), 23 Short (including 1 award-tagged paper), 3 Replicability Track papers, and 1 keynote. Exclude the latter two categories from the tracked paper counts. The two deadlines were November 21, 2024 and May 15, 2025, with one-shot revisions across cycles. The public Cycle 2 HotCRP page gives no counts. The ACM proceedings search-result snippet reports 72/305, but the proceedings page stopped at browser security verification; the figure's long/short/replicability split, unique annual pool, and validity filters could not be checked. Do not use 305 as the long-paper denominator. Both tracked submission counts remain unresolved; deferred pending new evidence.
  Sources:
  - https://conferences.sigcomm.org/imc/2025/
  - https://conferences.sigcomm.org/imc/2025/program/
  - https://conferences.sigcomm.org/imc/2025/cfp/
  - https://imc2025-cycle2.hotcrp.com/
  - https://dl.acm.org/doi/proceedings/10.1145/3730567
- ICWSM 2025 partial: 139 accepted full papers, 19th edition, `Copenhagen, Denmark`. On October 2, the maintainer explicitly instructed using 139 from the official program's page 4, "From the Program Chairs". The official volume 19 Full Papers section contains 138 entries (unique article IDs 35800-35937), separate from 24 dataset, 7 poster, and 1 demonstration papers; the difference remains unexplained and is retained in the published note. The chairs' message reports 139 full papers and 33 dataset/poster/demo papers, and maps the full-paper program to January, May, and September 2024 and January 2025 cycles; 64 full papers were selected under the 2024 chairs, and only 33 of the 139 were accepted in their first round. The proceedings' introductory text describes an approximately 25% acceptance rate without an exact submission count. The submission count remains deferred; do not infer a denominator from the approximate rate or the number of first-round acceptances.
  Sources:
  - https://ojs.aaai.org/index.php/ICWSM/issue/view/658
  - https://www.icwsm.org/2025/icwsm-program.pdf
- CSCW 2025 unresolved: the official CFP maps the July and October 2024 new-paper cycles, including their revision deadlines, to presentation at CSCW 2025; the May 2025 submission deadline feeds CSCW 2026 instead. The checked conference/program pages and official awards announcement provide no complete annual count pair. The awards announcement's 13 Best Papers at 1% and 43 Honorable Mentions at the next 3% are rounded award rules, not exact submission statistics. Counts deferred pending new evidence.
  Sources:
  - https://cscw.acm.org/2025/index.php/submit-papers/
  - https://cscw.acm.org/2025/index.php/program/
  - https://medium.com/acm-cscw/announcing-the-best-of-cscw-2025-a95517e67ba3
- UbiComp 2025 unresolved: the official IMWUT Papers page explicitly maps the main technical track to IMWUT 2024 Issue 4 and IMWUT 2025 Issues 1-3. The checked official program page and focused public search yielded no countable annual main-track list or unique reviewed-submission total. Counts deferred pending new evidence; do not substitute calendar-year IMWUT totals or the separate ISWC Notes and Briefs track.
  Sources:
  - https://www.ubicomp.org/ubicomp-iswc-2025/imwut_papers/
  - https://www.ubicomp.org/ubicomp-iswc-2025/program/

## Historical Follow-up: 2026-10-07

The maintainer requested a bounded first batch covering ECOOP 2022, ECOOP 2023, and AISTATS 2020, including researcher pages, public statistical datasets, blogs, and news search results alongside official material. Three accepted-paper counts are recorded. On October 7, the maintainer explicitly instructed adopting Emery Berger's submission counts of 78 for ECOOP 2022 and 97 for ECOOP 2023, with published source and uncertainty notes. These are maintainer-approved counts, not independently verified review-pool totals. AISTATS 2020 remains partial.

- AISTATS 2020 partial: 23rd edition, `Online, Online`, 423 accepted papers. Counted 423 `.paper` entries in the official PMLR volume 108. The official conference site confirms the actual virtual meeting on August 26-28, superseding the original Palermo plan. The proceedings introduction and conference homepage give no submission total. Paper Copilot also reports 423 and cites PMLR, so it is a dependent source. Konstantin Mishchenko's blog reports only his own three acceptances, one rejection, and one withdrawal, not conference totals; it also retains the original planned venue and dates. No exact whole-conference submission total was located in the checked public results.
  Sources:
  - https://proceedings.mlr.press/v108/
  - https://aistats.org/aistats2020/
  - https://papercopilot.com/aistats-paper-list/aistats-2020-paper-list/
  - https://konstmish.com/post/20_aistats/
- ECOOP 2023 recorded by maintainer decision: 44/97, 37th edition, `Seattle, USA`. The official Research Papers accepted table contains 44 unique event IDs, matching proceedings articles 1-44: 37 regular papers, 3 experience papers, and 4 pearls/brave new ideas. Retain the existing series scope across these categories. Article 12, LoRe, is an extended abstract explicitly included in the official Research Papers accepted set; the CFP permits journal-after publication after ECOOP PC acceptance, so the title alone is not a reason to subtract it. Exclude front matter, keynotes, artifacts, and unrelated program tracks. Emery Berger's public CSV reports 44/97 with source `personal communication`. CCFCFP repeats 44/97 but links to Berger's repository, so it does not independently corroborate 97. The unique substantive-review pool and cycle-overlap treatment behind 97 remain unverified. The maintainer approved recording 97 with this limitation stated in the published note; retain the public scope-verification item. The chairs' message on PDF page 9 gives no exact paper totals and describes two rounds with revisions possibly crossing years. Its traditional 25% cap includes submissions and re-submissions and cannot supply a denominator. The 45 submissions on PDF page 11 are artifacts, not papers.
  Sources:
  - https://2023.ecoop.org/track/ecoop-2023-papers
  - https://drops.dagstuhl.de/entities/volume/LIPIcs-volume-263
  - https://drops.dagstuhl.de/storage/00lipics/lipics-vol263-ecoop2023/LIPIcs.ECOOP.2023.0/LIPIcs.ECOOP.2023.0.pdf
  - https://github.com/emeryberger/csconferences/blob/main/csconferences.csv
  - https://ccfcfp.com/conf/ecoop/
- ECOOP 2022 recorded by maintainer decision: 35/78, 36th edition, `Berlin, Germany`. The official Research Papers accepted table lists 35 papers, matching proceedings articles 1-35 (31 regular papers and 4 extended abstracts). All four abstracts are in the official Research Papers accepted set; do not subtract them merely by publication format. The program also contains presentations from earlier conferences, which are outside that set and must not be added. Berger's public CSV reports 36/78 without a source for this row. On October 7, the maintainer explicitly chose the official count of 35 with a published note retaining the unexplained difference from 36. The submission count of 78 lacks independent corroboration and unique review-pool evidence. The maintainer subsequently approved recording 78 from Berger with the source and limitations stated in the published note, while retaining the official accepted count of 35. Keep the public scope-verification and accepted-count discrepancy item. The official volume verifies the physical Berlin edition; the conference site also describes a virtual event. PDF page 11 explains two review rounds and journal-first/after publication without exact paper totals. The 57 submissions on PDF page 13 are artifacts, not papers. Neither the 25% cap nor artifact counts can supply a paper denominator.
  Sources:
  - https://2022.ecoop.org/
  - https://2022.ecoop.org/track/ecoop-2022-papers
  - https://drops.dagstuhl.de/entities/volume/LIPIcs-volume-222
  - https://drops.dagstuhl.de/storage/00lipics/lipics-vol222-ecoop2022/LIPIcs.ECOOP.2022.0/LIPIcs.ECOOP.2022.0.pdf
  - https://github.com/emeryberger/csconferences/blob/main/csconferences.csv

Additional checks: OpenAccept has no ECOOP 2022/2023 records; Maria Christakis's publication page has no statistics for these two editions. OpenResearch stopped at robot verification and supplied no usable page evidence. These failed or irrelevant leads are not corroboration. AISTATS 2020's submission count is deferred until new evidence appears rather than inferred from rates. The two ECOOP submission counts are recorded only under the explicit maintainer decision above.

### Second historical batch: 2026-10-07

The maintainer requested further historical exploration and a local site preview. This bounded batch covers ICML 2013, SDM 2019, and SDM 2012-2014. Two official accepted-paper counts are recorded; no new submission count or acceptance-rate pair is verified.

- ICML 2013 partial: 30th edition, `Atlanta, USA`, 283 accepted papers. The official PMLR volume 28 contains 283 `.paper` entries with 283 unique article links across Cycles 1-3. The official conference site confirms Atlanta. The CFP and author instructions describe three review cycles and permit some declined Cycle I papers to resubmit in Cycle III; raw cycle submission totals would therefore need annual deduplication. No exact unique substantive-review submission count was found in the checked conference/proceedings material or public statistical datasets. Paper Copilot's accepted count cites PMLR and is dependent evidence; its displayed zero submissions is a missing-data placeholder, not a denominator.
  Sources:
  - https://proceedings.mlr.press/v28/
  - https://icml.cc/2013/
  - https://icml.cc/2013/index.html%3Fpage_id=25.html
  - https://icml.cc/2013/index.html%3Fpage_id=19.html
  - https://papercopilot.com/venue-overview/icml-2013-venue-overview/
- SDM 2019 partial: `Calgary, Canada`, 89 accepted research papers. The official archived homepage confirms Calgary, Alberta, Canada, May 2-4, 2019. Counted 89 paper entries with 89 unique abstract IDs in the official CP1-CP15 paper sessions: 7+6+6+6+6+6+6+6+5+6+5+5+8+5+6=89. Exclude invited talks, tutorials, workshops, doctoral forum, and repeat poster presentations. The program also displays unrelated current-year tutorial links without event times; these are outside the counted paper sessions. No submission count or directly stated ordinal was verified. Crossref identifies the official proceedings as DOI `10.1137/1.9781611975673`, but its metadata supplies no statistics.
  Sources:
  - https://www.siam.org/conferences-events/past-event-archive/sdm19/
  - https://meetings.siam.org/program.cfm?CONFCODE=DT19
  - https://meetings.siam.org/sess/dsp_programsess.cfm?SESSIONCODE=67364
  - https://doi.org/10.1137/1.9781611975673
- SDM 2012 unresolved: Pavel Kuksa's publication page explicitly reports 99 accepted papers out of 362 submissions (27%). The publisher's indexed snippet also mentions 362 received submissions, but the full proceedings preface could not be read, so the snippet does not establish review-pool scope or serve as verified official evidence. Kuksa's CV copy on Academia.edu is the same author's evidence, not independent corroboration. Do not record either count until a direct official source or two independent sources establish the relevant field and scope. The publisher page stopped at Cloudflare verification; Princeton's catalog stopped at bot detection; the modern SIAM `sdm12` archive URL returned Page Not Found. These access failures do not establish that the original statistics are unavailable.
  Sources and leads:
  - http://pkuksa.org/~pkuksa/Publications.htm
  - https://epubs.siam.org/doi/abs/10.1137/1.9781611972825
  - https://epubs.siam.org/doi/book/10.1137/1.9781611972825
  - https://catalog.princeton.edu/catalog/99131851318906421
- SDM 2013-2014 unresolved: Crossref confirms the proceedings DOIs below, but provides no statistics or useful abstract. Public search results for Secure Data Management (also abbreviated SDM) refer to a different workshop and must be excluded. The official Data Mining & Analytics charter-renewal report is a promising historical source, but its request returned HTTP 403 and the browser PDF frame showed no readable content. The checked Yangqiu Song publication page provides no statistics for these editions. No main-track counts or officially verified locations were added.
  Sources and leads:
  - https://doi.org/10.1137/1.9781611972832
  - https://doi.org/10.1137/1.9781611973440
  - https://www.siam.org/media/km3jnse3/dma_charter_18_19.pdf
  - https://home.cse.ust.hk/~yqsong/publications.html

### Third historical batch: 2026-10-22

The maintainer requested another data update. This bounded historical batch covers COLT 2011, IMC 2018, and FAST 2008. Verified accepted counts and official locations/ordinals are recorded; submission counts remain unresolved.

- COLT 2011 partial: 24th edition, `Budapest, Hungary`, 36 accepted papers. The official PMLR preface explicitly states, "There was a total of 36 accepted papers and a total of 6 open problems." The volume's 42 listed contributions mix these categories; exclude the 6 open problems from the main track. The conference website separately lists Accepted Papers and Accepted Open Problems. The preface, conference homepage, submission instructions, accepted lists, and programme do not provide an exact submission count. The homepage, preface, and programme give July 9-11; the PMLR volume metadata says June, which does not affect the recorded fields.
  Sources:
  - https://proceedings.mlr.press/v19/
  - https://proceedings.mlr.press/v19/kakade11a/kakade11a.pdf
  - http://www.conferences.hu/colt2011/index.html
  - http://www.conferences.hu/colt2011/accepted_papers.html
  - http://www.conferences.hu/colt2011/accepted_op.html
- IMC 2018 partial: 18th edition, `Boston, USA`, 28 long papers and 15 short papers counted from the individually labeled official programme. The 28 long papers include 3 Distinguished Paper Award papers and 1 Community Contribution Award paper; these labels do not create additional papers. Preserve the existing Long main-track / Short second-track convention and exclude separate posters and other activities. Chunyi Peng's CV, page 2, Conference Papers [C1], reports "28 out of 112 long submissions, acceptance rate: 25%", but this is one secondary source with unverified review-pool exclusions; keep 112 as a lead. RIPE's opening-plenary liveblog reports 174 submitted and 43 accepted papers overall, without a track split. Do not assign 174 to a single track or subtract 112 to infer short submissions. The official ACM proceedings endpoint returned HTTP 403, so its front matter could not be read.
  Sources:
  - https://conferences.sigcomm.org/imc/2018/
  - https://conferences.sigcomm.org/imc/2018/program/
  - https://www.cs.purdue.edu/homes/chunyi/cv-chunyi-public.pdf
  - https://labs.ripe.net/author/gergana_petrova/imc-2018-liveblog/
  - https://dl.acm.org/doi/proceedings/10.1145/3278532
- FAST 2008 partial: 6th edition, `San Jose, California, USA`, 21 accepted technical papers. The official chairs' invitation explicitly states "The FAST '08 program includes 21 technical papers" and separately lists 2 keynote addresses, WiPs, and posters. The technical programme contains 21 papers (Wednesday 6, Thursday 9, Friday 6), excluding those other activities and tutorials. No exact substantive-review submission count was verified. The official conference-report PDF and special-issue introduction below returned HTTP 403, and their browser PDF views supplied no readable content; leave the denominator unresolved.
  Sources:
  - https://www.usenix.org/legacy/events/fast08/invitation.html
  - https://www.usenix.org/legacy/events/fast08/tech/
  - https://www.usenix.org/legacy/publications/login/2008-06/openpdfs/fast08reports.pdf
  - https://dl.acm.org/doi/pdf/10.1145/1416944.1416945

### Additional half-hour exploration: 2026-10-22

The maintainer authorized another half hour, starting at 15:21:33 UTC. This batch adds 23 historical yearly records: 2 complete pairs, 20 accepted-count partials, and 1 metadata-only partial. CIKM 2003 additionally gains a precise uncertainty note; its existing counts are unchanged. These results are incremental to the preceding one-hour batch. No commit or push was requested.

- NAACL 2001 complete: 2nd, `Pittsburgh, USA`, 31/110 main-conference papers. Kevin Knight's Program Chair Report in the official executive-committee minutes gives the exact pair and regional components 22/80 + 8/19 + 1/11. It describes assigning each paper three reviewers and sending the papers for review, supporting the substantive-review pool. The official newsletter confirms 31 and separates three invited speakers, demonstrations, SRW, other workshops, and co-located EMNLP. The original CD-ROM main program enumerates the same 31 regular titles. Exclude the Anthology proceedings metadata item rather than using its 32-entry total.
  Sources:
  - https://naacl.org/minutes/2001/index.html
  - https://naacl.org/posts/2001-09-01-newsletter
  - https://www.cs.cmu.edu/~ref/naacl/main-index.html
  - https://www.cs.cmu.edu/~ref/naacl2001.html
  - https://aclanthology.org/volumes/N01-1/

- NDSS historical records: the official accepted-paper lists and programs support the technical-paper counts below. Panel sessions, invited talks, tutorials, and BOFs are excluded. Locations use the existing canonical `San Diego, California, USA`; location is omitted for 1994 because its checked program does not explicitly identify the city. Unsupported ordinals are omitted, rather than calculated from the year.

  | Year | Accepted | Submissions | Additional verified facts and boundaries |
  | --- | ---: | ---: | --- |
  | 2011 | 28 | unresolved | 18th; count the unlinked DTA++ title, so a Read More link count of 27 is incomplete |
  | 2006 | 17 | unresolved | 13th; official program independently totals 17 across six technical sessions |
  | 2005 | 16 | unresolved | 12th; publicity-chair announcement confirms venue and separates the pre-conference workshop |
  | 2004 | 16 | unresolved | 11th; official accepted list and contemporaneous call |
  | 2003 | 17 | unresolved | 10th; official program totals 17, excluding panel and invited sessions |
  | 2002 | 15 | unresolved | 9th; final official list/program 15 versus Almeroth table 16; choose the official enumeration and retain an event discrepancy note |
  | 2001 | 16 | unresolved | official list and event venue |
  | 2000 | 15 | 51 | complete pair; exclude the Windows 2000 BOF, classified as a report |
  | 1999 | 11 | unresolved | official list and contemporaneous call |
  | 1998 | 12 | unresolved | official program has 12 technical papers and three separate panels; external 15 may mix the panels, so it is not used |
  | 1997 | 13 | unresolved | general chair advertises 4th annual; an eyewitness report calls it fifth counting the 1993 precursor; use the advertised official ordinal |
  | 1996 | 14 | unresolved | the PC co-chair's official preliminary program and a post-conference report match on 14 technical papers; the reported total of 40 combines papers, panels, and BOFs |
  | 1995 | 15 | unresolved | the signed official preliminary program's 15 technical titles all match the final proceedings TOC; three panel contributions excluded |
  | 1994 | 15 | unresolved | five technical sessions contain 3+2+4+3+3 papers; exclude three panels and the banquet talk |
  | 1993 | 12 | unresolved | precursor PSRG workshop; official retrospective gives 12 selected papers and over 20 submissions; do not turn the lower bound into an exact denominator |

  Official lists/programs and event pages:
  - https://www.ndss-symposium.org/ndss2011/accepted-papers/
  - https://www.ndss-symposium.org/ndss2011/
  - https://www.ndss-symposium.org/ndss2006/accepted-papers/
  - https://www.ndss-symposium.org/ndss2006/ndss-2006-programme/
  - https://www.ndss-symposium.org/ndss2005/accepted-papers/
  - https://www.ndss-symposium.org/ndss2004/accepted-papers/
  - https://www.ndss-symposium.org/ndss2003/accepted-papers/
  - https://www.ndss-symposium.org/ndss2003/ndss-2003-programme/
  - https://www.ndss-symposium.org/ndss2002/accepted-papers/
  - https://www.ndss-symposium.org/ndss2002/ndss-2002-programme/
  - https://www.ndss-symposium.org/ndss2001/accepted-papers/
  - https://www.ndss-symposium.org/ndss2001/
  - https://www.ndss-symposium.org/ndss2000/accepted-papers/
  - https://www.ndss-symposium.org/ndss2000/bof-windows-2000-security/
  - https://www.ndss-symposium.org/ndss2000/
  - https://www.ndss-symposium.org/ndss1999/accepted-papers/
  - https://www.ndss-symposium.org/ndss1998/accepted-papers/
  - https://www.ndss-symposium.org/ndss1998/ndss-1998-programme/
  - https://www.ndss-symposium.org/ndss1997/accepted-papers/
  - https://www.ndss-symposium.org/ndss1996/
  - https://www.ndss-symposium.org/ndss1994/ndss-1994-programme/
  - https://www.ndss-symposium.org/wp-content/uploads/2023/08/NDSS2023_Proceedings_Front_Matter.pdf
  - https://www.ndss-symposium.org/previous-ndss-symposia/
  - https://www.ndss-symposium.org/wp-content/uploads/NDSS-2025-Welcome.pdf

  NDSS 2000 denominator decision: Mahesh V. Tripunitara's contemporaneous Cipher report explicitly attributes 51 submissions and 15 acceptances to program co-chair Gene Tsudik, immediately followed by a minimum of three reviews per paper. Kevin Almeroth's separately maintained UCSB statistics table independently agrees on 51/15 and one track; no copying from the report was indicated. Together these support the same field and scope under the two-source standard. The official accepted list independently verifies the numerator. IEEE hosting the report is not used to assert that IEEE organized this edition. Retain the concise provenance/BOF note in the event record.
  - https://www.ieee-security.org/Cipher/ConfReports/2000/CR2000-NDSS2000.html
  - https://sites.cs.ucsb.edu/~almeroth/conf/stats/

  Venue/ordinal evidence and remaining NDSS leads: the official calls preserved by IEEE for 1998-1999 and 2003-2006 identify the edition and San Diego venue. Karen Seo's signed publicity announcement confirms 2005; the ISOC chapter newsletter confirms ninth annual/venue in 2002; David Balenson's signed general-chair announcement controls 1997's advertised ordinal. Researcher totals 139 (2011), 127 (2006), 124 (2005), 98 (2004), 82 (2003), 79 (2002), and 66 (2001) lack established review-pool filtering and remain unrecorded. The 2000 report's comparison with 36 submissions in 1999 does not establish that earlier year's pool.
  - https://www.ieee-security.org/CFP/past-conferences-2006.html
  - https://www.ieee-security.org/CFP/past-conferences-2004.html
  - https://www.ieee-security.org/CFP/past-conferences-2003.html
  - https://www.ieee-security.org/CFP/past-conferences-1999.html
  - https://www.ieee-security.org/CFP/past-conferences-1998.html
  - https://lists.w3.org/Archives/Public/w3c-ietf-xmldsig/2005JanMar/0000.html
  - https://isoc-e.org/newsletter-vol-1-issue-1/
  - https://mailarchive.ietf.org/arch/msg/ids/5v6gvK4ipj7NDUJLQS8tu3Tm6CU/
  - https://www.ieee-security.org/Cipher/ConfReports/conf-rep-SNDSS97.html
  - https://www.ieee-security.org/Cipher/ConfReports/conf-rep-SNDSS96.html
  - https://catless.ncl.ac.uk/risks/17/52
  - https://www.pnr.iki.fi/ndss2003-report.html
  - https://zhiqlin.github.io/publication.html
  - https://jianying.space/conference-ranking.html
  - https://www.cs.ucf.edu/~czou/CAP6135-13/index.html
  - https://www.ndss-symposium.org/ndss1995/

  NDSS 1996 refinement: PC co-chair David M. Balenson's signed announcement of December 7, 1995 labels its schedule Preliminary Program. Its six technical sessions enumerate 2+1+3+3+2+3 = 14 papers. Christoph Schuba's post-conference report describes the same 14 papers, corroborating that the preliminary list matches the event. Exclude three panels, the Java BOF, and the banquet talk. The combined total of 40 submissions still cannot serve as the technical-paper denominator.

  NDSS 1995 refinement: program co-chair David M. Balenson's signed announcement of December 7, 1994 confirms Catamaran Hotel, San Diego, and a preliminary program with 3+2+1+3+3+3 = 15 technical papers. All 15 titles match the final proceedings TOC, including the last title by Suzan Mendes and Christian Huitema, A new approach to the X.509 framework: allowing a global authentication infrastructure without a global trust model (172-190). Exclude three panel contributions; do not count the payment panel as a technical paper. Record 15 accepted and the verified canonical location; submission count and ordinal remain unresolved.
  - https://catless.ncl.ac.uk/Risks/16/62
  - https://dblp.dagstuhl.de/db/conf/ndss/ndss1995.html

- EMNLP accepted-count partials: official Anthology contribution IDs were reconciled with the original PDF TOCs and programs. Do not use volume-entry totals that include front matter, Author Index, or invited material. Each linked front PDF and relevant TOC page was read; counts are as follows.
  - 2003: `Sapporo, Japan`, 28 research papers, W03-1001 through W03-1028. W03-1000 is front matter; Kevin Knight's separately identified invited talk is excluded. The preserved official CFP establishes location. A newly found official SIGDAT Summer 2004 report states 28 selected from 121 submissions, but does not settle eligibility/desk-rejection filtering. The 2003 CFP allows rejection without review for nonconforming papers, so 121 remains a reported-total lead rather than the stored review-pool denominator.
  - 2000: `Hong Kong, China`, 27 research papers, W00-1301 through W00-1327. Exclude W00-1300 and W00-1328 (Author Index). The final and printed presentation programs have 26 research presentations, omitting Anna Korhonen's W00-1327 on page 216. Use the stronger official proceedings count 27 and retain the one-paper discrepancy in the event note. No withdrawal explanation or exact submission pool was found. This was the joint EMNLP/VLC event.
  - 1999: `College Park, USA`, metadata only. The proceedings contain 35 contributions; exclude the two explicitly invited talks W99-0601 (Kenneth Church) and W99-0616 (Richard Schwartz), leaving 33 research papers. The printed program has 25 research presentations and omits the final eight proceedings papers, W99-0628 through W99-0635. Their category/presentation status is unexplained, so the accepted field remains unresolved. W99-0627 studies ACL 1999 paper routing, not EMNLP submissions.
  - 1998: 3rd, `Granada, Spain`, 12 research papers, W98-1501 through W98-1512. Exclude W98-1500 and W98-1513 (Author Index). The foreword gives only an imprecise submission description; Kevin Knight's invited talk is separate.
  - 1997: 2nd, `Providence, Rhode Island, USA`, 23 research papers, W97-0301 through W97-0323. The program separately labels invited talks by Tom Mitchell and Michael Mauldin. No exact denominator; do not reverse-calculate from a rounded 35%.
  - 1996: `Philadelphia, USA`, 14 research papers, W96-0201 through W96-0214. The cover confirms University of Pennsylvania and location; no ordinal or submission total is inferred.
  Sources:
  - https://aclanthology.org/events/emnlp-2003/
  - https://aclanthology.org/W03-1000.pdf
  - https://people.csail.mit.edu/mcollins/emnlp03.cfp.html
  - https://www.aclweb.org/archive/reports/acl2004-reports/all.pdf
  - https://aclanthology.org/events/emnlp-2000/
  - https://aclanthology.org/W00-1300.pdf
  - https://nlp.stanford.edu/IR-book/emnlp-vlc2000.html
  - https://nlp.stanford.edu/IR-book/finalprogram.html
  - https://aclanthology.org/events/emnlp-1999/
  - https://aclanthology.org/W99-0600.pdf
  - https://aclanthology.org/events/emnlp-1998/
  - https://aclanthology.org/W98-1500.pdf
  - https://aclanthology.org/events/emnlp-1997/
  - https://aclanthology.org/W97-0300.pdf
  - https://aclanthology.org/events/emnlp-1996/
  - https://aclanthology.org/W96-0200.pdf

- SIGIR 2000 partial: 23rd, `Athens, Greece`, 38 full papers. The official July 2000-June 2001 annual report explicitly separates 38 full papers, 30 posters, and 7 demonstrations. Record 38 only. The submission field remains unresolved. An indexed excerpt from Donna Harman's later historical monograph reports regional submission counts 41/42/57 (sum 140), but an independently verified matching valid-review total was not established; do not import 140. A nominal 25% acceptance rate on an author's publication page is not enough to reconstruct an exact denominator.
  Sources:
  - https://sigir.org/files/reports/sigir-annual-report-2001.pdf
  - https://www2.aueb.gr/conferences/sigir2000/English/progCom.html
  - https://www.nowpublishers.com/article/Details/INR-065
  - https://dokumen.pub/information-retrieval-the-early-years-9781680835854-1680835858.html
  - https://www.cs.columbia.edu/~gravano/vita.html

- CIKM 2003 remains uncertain: existing 59/378 is retained. The official 2004 SIGIR business-meeting report states 386 submissions and rounded acceptance percentages. The eight-paper denominator difference cannot be resolved by the small-count tolerance; it may concern a validity filter, but no eight-paper exclusion was documented. The rounded 15% rate does not verify an exact numerator. Replace the vague event warning with this concrete source conflict, and retain the public request for clarification.
  Source: https://sigir.org/files/forum/2004D/lewis_sigirforum_2004d.pdf

- SODA 2008 remains unresolved: Erik Demaine's event record reports 455 submitted, 135 accepted, and 5 withdrawn, without establishing when those withdrawals occurred or how they relate to 455. Its confu.org rendering is the same collection, not independent corroboration. The original SIAM site and the PC-chair accepted-list URL linked by a contemporaneous blog now return 404. The journal special-issue foreword's 12 articles are a later selected subset, not the conference accepted total. No SODA record was added from these leads.
  Sources:
  - https://erikdemaine.org/events/?prefix=SODA
  - https://confu.org/SODA
  - https://www.siam.org/meetings/da08/
  - https://infoweekly.blogspot.com/2007/09/
  - https://www.cs.bu.edu/~steng/SODA2008accepted.txt
  - https://paperity.org/p/376861004/foreword-to-special-issue-on-soda-2008

- Other bounded follow-ups: no new ACL 1992-1996 denominator was established. UAI 1991's editor-uploaded arXiv HTML is a TOC, not its full front matter; Google Books locates a real preface but withholds full preview. Neither all 59 chapters nor the visible accepted-paper referee statement establishes the complete competitive count or exact submissions. ECIR 2001's BCS report enumerates presentations but does not settle invited-paper boundaries or supply a denominator; neighboring Informer issues checked for 1995, 1998, and 1999 produced no exact ECIR review pool. No values were inferred from these materials.
  - https://arxiv.org/abs/1304.3853
  - https://arxiv.org/html/1304.3853/
  - https://books.google.com/books?id=EM3NBQAAQBAJ
  - https://www.bcs.org/media/7488/informer11.pdf
  - https://www.bcs.org/media/7516/summer_98.pdf
  - https://www.bcs.org/media/7517/summer_99.pdf
  - https://www.bcs.org/media/7514/spring_99.pdf
  - https://www.bcs.org/media/7512/spring_95.pdf
  - https://www.bcs.org/media/7515/summer_95.pdf

Access limits: source requests used finite timeouts. ACL Admin Wiki returned 429; the NDSS welcome-PDF download and ScienceDirect/Now Publishers returned 403; the SIGIR 1999 report path returned a verification challenge; Internet Archive's availability endpoint returned 429. Certificate verification failed for the legacy Athens conference host and CERIST library PDF. These stopped the affected routes; no certificate, challenge, or rate-limit bypass was used. Previously retrieved text and independently accessible sources supplied the recorded facts. Research froze at 15:47 UTC; integration and the required build/checks followed.


### One-hour exploration: 2026-10-22

The maintainer authorized one hour of further exploration, starting at 12:23:35 UTC. This batch uses conference sites, publisher front matter, society reports, and public researcher records. Records already pending at the start of the hour (ACM MM/CCS 2026, COLT 2011, IMC 2018, and FAST 2008) are not discoveries from this batch. No commit or push was requested. The integrated result is 30 new historical yearly records: 3 complete pairs, 20 accepted-count partials, and 7 metadata-only partials. The existing MICRO 2026 record additionally gains its accepted count. No existing count was replaced.

- MICRO 2026 partial: 213 accepted main Research Track papers. The official program has 223 `.paper` entries: 3 welcome messages, 7 entries in the explicitly labeled Industry Session, and 213 regular research papers with 213 unique titles. Distinguished-paper labels do not add papers. Program co-chair Sophia Shao's public report independently states 220 papers, comprising 213 main-track and 7 inaugural Industry Track papers. Do not add the Industry Track as an unrequested secondary track. Tor Aamodt reports 213/842, while Jianping Zeng reports 215/842; the official program/chair report determines the accepted count. Neither researcher page explains the validity/desk-rejection/withdrawal treatment behind 842, so the denominator remains unresolved even though both pages report it. Zeng's page also reports 52/233 for ICS 2026, without explaining how that pool maps to the full annual program; do not import that denominator.
  Sources:
  - https://microarch.hosting.acm.org/micro59/program/
  - https://microarch.hosting.acm.org/micro59/submit/papers.php
  - https://microarch.hosting.acm.org/micro59/submit/industrial.php
  - https://www.linkedin.com/posts/sophia-shao-8040b711_micro-2026-activity-7509710120965128192-lr5B
  - https://people.ece.ubc.ca/aamodt/publications/
  - https://jianpingzeng.github.io/

- ACL 1992-1996 partial: the official front matter identifies the main program, separate student sessions, invited speakers, edition, and physical location. Counts below use the official complete-volume BibTeX entries and PDF table-of-contents boundaries, not the total number of entries in a volume. None of these main-program prefaces states an exact submission count. Student-session submission totals belong to a separate pool and are not recorded.
  - 1992: 30th, `Newark, USA`, 34 main papers on pages 1-272; excludes 20 student-session papers starting on page 273. The preface's "over seven hundred papers" covers multiple meetings in the field, not ACL 1992.
  - 1993: 31st, `Columbus, USA`, 33 main papers. Of 36 entries before the student section on page 274, exclude the three explicitly invited abstracts: Planning Multimodal Discourse (95-96), Transfers of Meaning (191-192), and Quantificational Domains and Recursive Contexts (224-225). Exclude 11 student papers. The BibTeX titles omit the invited labels; the original program and PDF TOC supply them.
  - 1994: 32nd, `Las Cruces, USA`, 40 main papers. Of 42 entries before the student section on page 310, exclude the explicitly invited abstracts From Strings to Trees to Strings to Trees (page 33) and Optimality Theory (page 271). Exclude 10 student papers.
  - 1995: 33rd, `Cambridge (MA), USA`, 37 main papers on pages 1-283; excludes 19 student papers starting on page 284. The 19/48 pair in the student preface is not a main-track statistic.
  - 1996: 34th, `Santa Cruz, California, USA`, 42 main papers. Of 44 entries before the student section on page 342, exclude the invited papers Using Eye Movements to Study Spoken Language Comprehension (48-54) and Head Automata and Bilingual Tiling (167-176). Exclude 14 student papers. The student-session 14/32 pair is separate.
  Sources (front matter and complete official bibliographies):
  - https://aclanthology.org/P92-1000.pdf
  - https://aclanthology.org/volumes/P92-1.bib
  - https://aclanthology.org/P93-1000.pdf
  - https://aclanthology.org/volumes/P93-1.bib
  - https://aclanthology.org/P94-1000.pdf
  - https://aclanthology.org/volumes/P94-1.bib
  - https://aclanthology.org/P95-1000.pdf
  - https://aclanthology.org/volumes/P95-1.bib
  - https://aclanthology.org/P96-1000.pdf
  - https://aclanthology.org/volumes/P96-1.bib

- FM predecessors: the official FME symposium history explicitly includes VDM 1987, 1988, 1990, and 1991 in this series. The original Springer titles/forewords verify 1st/Brussels, 2nd/Dublin, 3rd/Kiel, and 4th/Noordwijkerhout respectively. The history uses the broader name Noordwijk for 1991; the specific original proceedings title uses Noordwijkerhout. Record that specific venue. No FM event was held in 1998: the official series history proceeds from the 8th edition in 1997 to the 9th in 1999. Remove the stale FM 1998 request, without creating a yearly record.
  - 1991 partial: front-matter PDF page 4 explicitly separates 31 papers, 3 invited talks, 7 shorter project reports, and 14 tool-demonstration abstracts; a second volume contains 8 tutorials. Record 31 regular papers only. The external-referee statement gives no total submission count.
  - 1990 partial: PDF pages 14-16 and the publisher's 27-chapter TOC contain 24 regular papers and 3 explicitly invited talks. PDF page 11 says all submitted papers, accepted or rejected, received at least three reviews, but supplies no number. Record 24 accepted only.
  - 1988 metadata only: the foreword/TOC distinguish invited material but do not establish the competitive main-track count or denominator; do not convert all 29 published chapters to acceptances.
  - 1987 metadata only: PDF page 5 says originators present key papers and other papers were solicited from experts. Do not turn the published chapter count into competitive submission/acceptance statistics.
  Sources:
  - https://www.fmeurope.org/symposia/
  - https://link.springer.com/book/10.1007/3-540-54834-3
  - https://link.springer.com/content/pdf/bfm:978-3-540-46449-5/1
  - https://link.springer.com/book/10.1007/3-540-52513-0
  - https://link.springer.com/content/pdf/bfm:978-3-540-47006-9/1
  - https://link.springer.com/book/10.1007/3-540-50214-9
  - https://link.springer.com/content/pdf/bfm:978-3-540-45955-2/1
  - https://link.springer.com/book/10.1007/3-540-17654-3
  - https://link.springer.com/content/pdf/bfm:978-3-540-47740-2/1

- ECOOP 1990 metadata only: AITO's official series history explicitly lists the joint OOPSLA/ECOOP event in Ottawa, Canada, October 21-25, 1990. No paper count was verified, and no ordinal is inferred. The joint event does not supply a denominator for either series by itself.
  Source: https://sites.google.com/aito.org/home/ecoop/ecoop-conference-series

- Eurocrypt 1991 partial: `Brighton, UK`, 43 regular-program papers. The complete official TOC has 54 unique chapter IDs: chapters 1-43 occupy pages 1-507, while chapters 44-54 are the 11 explicitly labeled rump-session short papers, pages 508-556. The preface explains the regular PC review versus the rump session's simplified review. Exclude the latter from the main track. No exact submission count or stated ordinal was found.
  Sources:
  - https://link.springer.com/book/10.1007/3-540-46416-6
  - https://link.springer.com/book/10.1007/3-540-46416-6?page=2
  - https://link.springer.com/book/10.1007/3-540-46416-6?page=3
  - https://link.springer.com/content/pdf/bfm:978-3-540-46416-7/1

- Eurocrypt 1992 partial: Balatonfüred, Hungary, 35 regular-program papers. The official TOC contains 45 unique chapters. Exclude chapter 17, the panel report on Trapdoor Primes and Moduli (194-199), and chapters 37-45, the 9 selected rump-session contributions (449-491). The preface explicitly identifies these separate categories and their simplified review. Record the 35 remaining regular papers, rather than the book's 45-chapter total. No exact submission count or stated ordinal was found. Use the conference year 1992, not the book's copyright year 1993.
  Sources:
  - https://link.springer.com/book/10.1007/3-540-47555-9
  - https://link.springer.com/book/10.1007/3-540-47555-9?page=2
  - https://link.springer.com/book/10.1007/3-540-47555-9?page=3
  - https://link.springer.com/content/pdf/bfm:978-3-540-47555-2/1

- Crypto 1987 partial: `Santa Barbara, California, USA`, 36 regular-program papers. The front matter, PDF page 3, states that Sections 1-6 contain all regular-program papers, including two not presented at the meeting; Section 7 contains informal rump-session material and a short comment. Complete official TOC enumeration gives 36 papers on pages 3-426, chapters 1-36, and 7 informal contributions from page 429, chapters 37-43. Retain the two accepted but unpresented papers rather than using attendance/presentation as the acceptance stage. No exact submission count or stated ordinal was found.
  Sources:
  - https://link.springer.com/book/10.1007/3-540-48184-2
  - https://link.springer.com/book/10.1007/3-540-48184-2?page=2
  - https://link.springer.com/book/10.1007/3-540-48184-2?page=3
  - https://link.springer.com/content/pdf/bfm:978-3-540-48184-3/1

Additional unresolved checks:

- ATC 2026: the official accepted list explicitly contains 135 unique papers, but neither it nor the schedule separates Long, Short, and Operational Systems submissions. The CFP identifies these categories; preserve the established Long/Short series split and do not assign 135 to the main track. The two-page extended abstract is review material attached to the same submission, not an extra paper category. Sources: https://sigops.org/s/conferences/atc/2026/accepted.html ; https://sigops.org/s/conferences/atc/2026/schedule.html ; https://atc26.hotcrp.com/
- ICDM 2026: a newly indexed official Accepted Papers page is only a heading/introduction, with no paper entries, file links, iframe, or linked paper dataset in the checked document. Its existence does not supply an accepted count. The NEU main site links the same accepted-page path. Sources: https://www3.cs.stonybrook.edu/~icdm2026/11676/list.htm ; https://icdm2026.neu.edu.cn/
- ICFP 2026: the official program lists Manuel Serrano's PC-chair report in the business meeting, but the checked page has no attached report or statistics. Keep the submission field open. Source: https://icfp26.sigplan.org/track/icfp-2026-icfp-papers
- ACL 1987-1990 follow-up: the checked official 1987 and 1988 prefaces give no exact main-track submission total. The 1989 front-matter page and 1990 PDF requests ended with TLS transport errors; no statistic was imported from those failed requests. Sources: https://aclanthology.org/P87-1000.pdf ; https://aclanthology.org/P88-1000.pdf ; https://aclanthology.org/events/acl-1989/ ; https://aclanthology.org/events/acl-1990/
- EMNLP final follow-up: the official EMNLP 2001 proceedings entry was read but exposes no linked PDF or statistics, so its bibliographic metadata does not supply a denominator. The EMNLP 2003 event-page request timed out; no count was imported. Sources: https://aclanthology.org/W01-0500/ ; https://aclanthology.org/events/emnlp-2003/
- ECIR 2001: searches found an official SIGMOD Record report for ECIR 2002, not 2001. Its 23/52 pair belongs to the already complete 2002 record; it does not fill 2001. Source: https://sigmodrecord.org/?smd_process_download=1&download_id=5653
- Crypto 1984-1986 and Eurocrypt 1984/1985/1987: official Springer front matter was read but supplied no exact submission total. Crypto 1985 omits two accepted papers and Crypto 1986 omits four regular papers; neither volume's raw chapter count establishes the complete accepted count without further program reconciliation. Eurocrypt 1984's preface has inconsistent year labels; do not import its approximate "close to 50" statement. No additional counts were entered from these volumes. Sources: https://link.springer.com/book/10.1007/3-540-39568-7 ; https://link.springer.com/book/10.1007/3-540-39799-X ; https://link.springer.com/book/10.1007/3-540-47721-7 ; https://link.springer.com/book/10.1007/3-540-39757-4 ; https://link.springer.com/book/10.1007/3-540-39805-8 ; https://link.springer.com/book/10.1007/3-540-39118-5


- CAV 1989-1991 partial: use the meeting year rather than the later copyright year. The official original title pages verify 1st/Grenoble (1989), 2nd/New Brunswick (1990), and 3rd/Aalborg (1991). The 1991 front matter, PDF page 4, explicitly states "42 refereed papers plus 2 invited talks"; record 42, excluding Joseph Sifakis's and Colin Stirling's invited contributions. The 1989 preface warns that some lecturers did not supply manuscripts, so its 31 published chapters do not establish complete acceptances. The 1990 Springer and organizer-hosted DIMACS prefaces give no totals; the first one-page contribution is not explicitly marked invited, so neither its length nor the 38-chapter total settles the accepted count. All three submission counts remain unresolved.
  Sources:
  - https://link.springer.com/book/10.1007/3-540-52148-8
  - https://link.springer.com/content/pdf/bfm:978-3-540-46905-6/1
  - https://link.springer.com/book/10.1007/BFb0023712
  - https://link.springer.com/content/pdf/bfm:978-3-540-38394-9/1
  - https://archive.dimacs.rutgers.edu/archive/Volumes/Vol03.html
  - https://link.springer.com/book/10.1007/3-540-55179-4
  - https://link.springer.com/content/pdf/bfm:978-3-540-46763-2/1

- Additional learning-theory leads: AISTATS 2020's official post charts a record submission year without labeling the exact 2020 bar; do not estimate a denominator from the image. ICML 2013's official news archive supplies no annual deduplicated count. Thomas Zeugmann's COLT 1994 report has two publication versions, which are not independent sources: SIGACT DOI 10.1145/190616.190622 and SIGART DOI 10.1145/191604.191610. A metadata abstract reports 24 long papers and 12 short papers/posters selected from 78 submissions, but the complete report and review-pool scope were not verified; keep this as a lead rather than recording 36/78 as a main-track pair.
  Sources and leads:
  - https://x.com/Aistats2020/status/1186598304311840770
  - https://icml.cc/2013/index.html%3Fcat=6.html
  - https://doi.org/10.1145/190616.190622
  - https://doi.org/10.1145/191604.191610
  - https://api.openalex.org/works/doi:10.1145/190616.190622

- FSE 1998 and 2000 metadata only: ACM's publisher-deposited Crossref proceedings records explicitly identify the 6th edition in Lake Buena Vista, Florida (1998), and the 8th edition in San Diego, California (2000). Both paper counts remain unresolved. Sources: https://api.crossref.org/works/10.1145/288195 ; https://api.crossref.org/works/10.1145/355045

- ICS 2013 tracking cleanup: the pre-existing record already contains 43/202, 27th edition, `Eugene, USA`, without a separate field-level uncertainty note. Remove the stale whole-year request from the public list; the data record is unchanged and this is not a new statistical pair from the one-hour batch.

- USENIX ATC 2001 partial: `Boston, USA`, 24 General Track refereed papers. The official page explicitly labels GENERAL TRACK REFEREED PAPERS and lists eight sessions of three papers each: Operating Systems, Security, Storage I, Tools, Web Servers, Scheduling, Storage II, Networking. Daily counts are 9+6+9. Exclude the separately linked FREENIX track, invited talks, and tutorials. No withdrawal, unprinted-paper, or conditional-acceptance label is present in this final list. The official press release reports 48 excellent papers out of 138 submissions for the conference including General and FREENIX; do not assign 138 to General. No exact ordinal or General Track submission total was verified.
  Sources:
  - https://www.usenix.org/legacy/events/usenix01/technical.html
  - https://www.usenix.org/legacy/events/usenix01/letter.html
  - https://www.usenix.org/legacy/events/usenix01/pressrelease.html

- IMC 2007/2008 further checks: the official programs do not explicitly label Long versus Short papers, so presentation duration cannot establish per-track counts. The 2007 program explicitly includes an invited Legal Issues paper that must be excluded from refereed-paper counts. Official pages verify San Diego for 2007 and Vouliagmeni for 2008; these remain source leads alongside the missing per-track fields. Sources: https://conferences.sigcomm.org/imc/2007/program.html ; https://conferences.sigcomm.org/imc/2008/program.html ; https://api.crossref.org/works/10.1145/1452520

#### EuroVis / VisSym 1999

Official Springer front matter: https://link.springer.com/content/pdf/bfm:978-3-7091-6803-5/1

PDF page index 4, Preface: “The 64 paper submissions were carefully evaluated and only 30 papers (21 research papers and 9 case studies) were selected”. The same paragraph says these were selected for presentation and proceedings inclusion. This directly describes evaluation of the 64 submissions. No separate rejected-without-review count is stated.

Official conference CFP: https://www.cg.tuwien.ac.at/events/VisSym99/cfp.html

The Paper Submission section explicitly requests a full paper for both types, with research papers up to ten pages and case studies up to six. The conference uses a single presentation track, one program-co-chair / PC organization, one deadline and notification schedule, and one submission destination; authors label the contribution as research paper or case study. The front matter reports one reviewed 64-to-30 pool. This supports a unified historical full-technical-paper population, with the research/case-study split retained in the event note. It is not a merger of an identified Short or Industry track. The different page limits are material and should remain in this ledger.

The CFP's Aims and Scope explicitly identifies 1999 as the first Joint Eurographics–IEEE TCVG symposium, following nine earlier EG visualization workshops. Therefore use `1st` for the joint-series numbering already used by the repository, not the tenth workshop-series label in the book preface. The official home and CFP confirm Vienna, Austria: https://www.cg.tuwien.ac.at/events/VisSym99/

#### EuroVis / VisSym 2000

Official Springer front matter: https://link.springer.com/content/pdf/bfm:978-3-7091-6783-0/1

PDF page index 3, Preface: “This year, 66 papers and case studies were submitted of which 27 were accepted.” The same page thanks the IPC for “reviewing all submitted papers”. It identifies the second joint symposium and Amsterdam.

PDF page indices 6–8, TOC: 6 Information Visualization + 6 Large Datasets and Multi Resolution + 3 Volume and Flow Visualization + 6 Visualization Systems + 6 Applications and Case Studies = **27 technical papers**. Exclude the separately listed Invited Speaker, page 1. Technical-paper start pages are:

`3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 105, 115, 125, 137, 147, 157, 167, 179, 189, 199, 209, 219, 229, 239, 249, 259, 269`.

Official chair Robert van Liere's original CFP is preserved in the InfoVis mailing-list archive: https://www.infovis.org/archives/list/infovis%40infovis.org/latest?page=256

Relevant passage: “Authors are requested to prepare their contribution as a full paper. Accepted research and case study papers are limited to 10 pages.” Both types share the full-paper submission / PC process, and the preface confirms review of all submissions. Preserve the case-study scope in the event note.

#### EuroVis / VisSym 2001

Official Springer front matter: https://link.springer.com/content/pdf/bfm:978-3-7091-6215-6/1

PDF page index 4, Preface, reports submitted papers reaching 68 and a program of 33 presentations: “reach 68 this year” and “extend the program to 33 presentations”. It explicitly calls the event the third joint symposium and gives Ascona, Switzerland, May 28–30, 2001. The preface thanks reviewers; it does not give a separate invalid, desk-rejected or withdrawal total.

PDF page indices 6–8, TOC: Geoscience 2 + Multi-resolution 3 + Unstructured Data 4 + Flow 3 + Biomedical 4 + Information Visualization 3 + Object Representation 4 + Volume Rendering 4 + Information Visualization Applications 3 + Automotive 3 = **33 technical papers**, excluding the separately listed Invited Speaker at page 1. Technical-paper start pages:

`3, 15, 25, 35, 45, 55, 65, 75, 85, 95, 107, 117, 127, 137, 147, 157, 165, 175, 185, 193, 203, 213, 223, 233, 243, 253, 263, 273, 283, 291, 301, 309, 319`.

Springer's book metadata reports 34 chapters because it includes the invited speaker. Do not use 34 as accepted papers. Case-study papers are interleaved into the topical technical program; no separate secondary review track was identified.

#### EuroVis / VisSym 2002

Official technical-proceedings collection: https://diglib.eg.org/collections/8cb2aa04-5320-48bf-a7d1-44f00baa78e6

The collection was read successfully through ordinary HTTPS requests (HTTP 200). It contains 31 specific paper entries and 31 unique numbered paper PDFs; the UI says “Now showing 1 - 31 of 31”. No preface, invited-talk, Short, or poster entry appears. Unique PDF page ranges:

`009-018, 019-024, 025-034, 035-041, 043-052, 053-060, 061-070, 071-076, 077-086, 087-094, 095-104, 105-114, 115-124, 125-132, 133-140, 141-150, 151-157, 159-164, 165-171, 173-182, 183-188, 189-194, 195-200, 201-204, 205-210, 211-216, 217-225, 227-232, 233-240, 241-249, 251-259`.

This includes a paper explicitly titled as a case study at pages 189–194, within the same technical proceedings. Do not infer a separate Short track from page length.

Official conference announcement from `vissym02@gris.uni-tuebingen.de`, preserved in the InfoVis archive, calls it the IV joint symposium and gives Barcelona, Spain: https://www.infovis.org/archives/list/infovis%40infovis.org/latest?page=255 . The official VisSym 1999 site's links also identify the 2002 host: https://www.cg.tuwien.ac.at/events/VisSym99/ . The original 2002 site has a certificate verification failure; certificate checks were not disabled.

**Submission count unresolved:** Thad Starner's CV gives 31 of 80 accepted for his 2002 VisSym paper, printed page 56, PDF index 55: https://faculty.cc.gatech.edu/~thad/thad.pdf . This is one secondary source; the alias at `sites.cc.gatech.edu/home/thad/thad.pdf` is the same document, not independent corroboration. The 80 count and its validity filtering were not confirmed elsewhere; it is not recorded in `data/conf.json`.

#### EuroVis / VisSym 2003

Official technical-proceedings collection: https://diglib.eg.org/collections/62da5720-b544-44f5-88d9-f27fa12e8749

The collection was read successfully through ordinary HTTPS requests (HTTP 200). It contains 30 specific technical-paper entries and 30 unique numbered PDFs, with UI “Now showing 1 - 30 of 30”. Unique page ranges:

`009-018, 019-028, 029-038, 039-048, 049-058, 059-066, 067-074, 075-084, 085-094, 095-104, 105-112, 113-122, 123-128, 129-134, 135-140, 141-148, 149-156, 157-166, 167-176, 177-184, 185-194, 195-202, 203-212, 213-222, 223-230, 231-238, 239-248, 249-258, 259-266, 267-276`.

Two entries explicitly begin `Case Study:` (pages 123–128 and 129–134); they are included in the unified technical proceedings and should be acknowledged by a concise event note. This does not prove those are the only application/case-study papers, so do not invent a complete subtype breakdown. No separate Short track or invited-talk item was found in this collection.

Official chair CFP preserved in the InfoVis archive identifies the fifth joint symposium in Grenoble, France, May 26–28, 2003: https://www.infovis.org/archives/list/infovis%40infovis.org/latest?page=255 . It solicits research papers and case studies as the scientific content of the same event, with one deadline / notification schedule and submission portal. Original website: `http://www.inrialpes.fr/VisSym03` (timed out).

**Submission count unresolved.** Neither the 2002 nor 2003 collection contains a preface entry, and numbered papers start at page 9. No number is inferred from the absent preliminary pages.

#### Eurographics 2013

Official Full Papers collection: https://diglib.eg.org/collections/ca737798-f865-4168-bb73-2cc820e3fc3b

The collection explicitly has Full Papers scope and 53 entries: **1 Preface and Table of Contents + 52 individually enumerated research articles**. Exclude the preface. The first article is `Circular Arc Snakes and Kinematic Surface Generation`; the final article is `Sifted Disks`. Do not record the raw 53-item metadata count.

Official original homepage and final program: http://eg2013.udg.edu/ and http://eg2013.udg.edu/fullPaperProgram.shtml . The homepage explicitly identifies the 34th conference in Girona, Spain; the event-news page reports that the 34th edition finished: http://eg2013.udg.edu/news.shtml . The program also contains additional presentations marked `(CGF)`, e.g. `Dependency Free Parallel Progressive Meshes` and `Content-Aware Automatic Photo Enhancement`; these are excluded by using the official conference Full Papers collection.

**205 is not recorded in `data/conf.json`.** Two separate secondary records report 52/205: Ke-Sen's index https://www.realtimerendering.com/kesen/ and author John D. Owens's institutional bibliography https://www.ece.ucdavis.edu/~jowens/owens_bib.html . In Owens's `Ebeida:2013:SD` entry (`Sifted Disks`, CGF 32(2), 509–518), the original field is `acceptance = {52/205 (25.3\%)}`. No Ke-Sen, `kesen`, or `realtimerendering` attribution was found anywhere in that bibliography, and the entry is an author-specific publication record. Nevertheless, neither secondary source establishes desk-rejection / withdrawal filtering or the exact substantive-review pool. The official program and news do not supply that detail. Keep submissions unresolved until the substantive-review pool is verified.

The official preface item https://diglib.eg.org/items/6a0b4b6e-7621-425b-8e95-6c1135dca184 returned 403 earlier and was not retried or accessed through an alternate endpoint. The collection's preface entry displays an empty file list. An independent Wiley article-page attempt also returned 403 and was stopped.

#### Eurographics 2014

Official publisher's CGF 33(2) contents: https://onlinelibrary.wiley.com/toc/14678659/33/2

All three TOC pages were inspected: **20 + 20 + 12 = 52 articles**, pages 1–516. Page 2: https://onlinelibrary.wiley.com/toc/14678659/2014/33/2?page=2 ; page 3: https://onlinelibrary.wiley.com/toc/14678659/2014/33/2?page=3 . These are conference technical papers, without Front Matter, STAR or Short entries. Article start pages:

`1, 11, 23, 33, 43, 53, 63, 73, 83, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 263, 273, 283, 293, 303, 313, 323, 333, 341, 351, 361, 371, 381, 391, 401, 411, 421, 429, 439, 449, 459, 469, 479, 487, 497, 507`.

The original official homepage times out, but its public archived copy is available: https://web.archive.org/web/20140410025712/http://eg2014.unistra.fr:80/ . Its two Full Papers program pages contain 32 + 30 = 62 presentations; the 10 entries outside the conference issue were not individually classified. Do not use 62 as the acceptance count. Archived programs: https://web.archive.org/web/20140418220046/http://eg2014.unistra.fr/html/program/full-papersA.html and https://web.archive.org/web/20140418225800/http://eg2014.unistra.fr/html/program/full-papersB.html . The publisher's 52-paper issue is the precise numerator source.

Official tutorial cover, PDF page index 0, visibly confirms the **35th** annual conference and **Strasbourg, France**, April 7–11, 2014: https://diglib.eg.org/bitstream/handle/10.2312/egt.20141019.t9/04_compressive_sensing.pdf?isAllowed=y&sequence=6 . Its cover was rendered and inspected in memory; no extra file was written.

**Submissions unresolved:** 209 is only corroborated by Ke-Sen and a blog copying Ke-Sen's entire list, which is not independent. No substantive-review filtering was established. The known 403 digital-library collection / preface resources were not retried.

#### Eurographics 2017

Official CGF 36(2) Full Papers front matter and TOC: https://onlinelibrary.wiley.com/doi/10.1111/cgf.13145 . Header confirms 38th, Lyon, France. The technical TOC has **44** numeric-page articles, excluding award biographies and invited talks at Roman-numbered pages. Start pages:

`1, 9, 21, 31, 39, 49, 63, 75, 85, 95, 107, 119, 131, 143, 153, 163, 177, 189, 199, 213, 225, 235, 247, 259, 269, 281, 295, 311, 325, 337, 349, 361, 375, 387, 397, 409, 421, 431, 443, 455, 467, 477, 487, 495`.

The official Full Papers program https://eg2017.projet.liris.cnrs.fr/000000084.html has **66** unique `.accordion-heading > a.accordion-toggle` presentation titles. It includes papers outside the CGF 36(2) conference issue. For example the Art session has three presentations, but only the light-painting paper belongs to that issue. `SketchSoup` is a regular CGF 36(8) article (302–312): https://onlinelibrary.wiley.com/doi/10.1111/cgf.13081 ; `Integrated Structural–Architectural Design for Interactive Planning` is CGF 36(8), 80–94: https://onlinelibrary.wiley.com/doi/10.1111/cgf.12996 . These two are journal presentations excluded from 44. The remaining 20 extra presentations were not individually classified, so do not claim a verified 22-paper subtype breakdown from subtraction alone. Numerator comes positively from the 44 published conference full papers.

**Submissions unresolved.** No counts narrative was found in the official full-paper front matter; the separate STAR preface must not be used for Full Papers. The original `eurographics2017.fr` domain now serves unrelated content; use the CNRS archive above.

#### Eurographics 2018

Official CGF 37(2) Full Papers front matter and TOC: https://onlinelibrary.wiley.com/doi/10.1111/cgf.13381 . Header confirms 39th, Delft, The Netherlands. **44** numeric-page technical articles, excluding awards and invited talks. Start pages:

`1, 13, 25, 37, 51, 63, 75, 87, 101, 111, 123, 135, 145, 157, 169, 179, 191, 205, 217, 227, 239, 251, 263, 275, 287, 297, 311, 321, 329, 339, 355, 365, 377, 389, 401, 415, 431, 443, 455, 463, 475, 485, 497, 511`.

Use the conference issue, excluding journal-only presentations. Ke-Sen's paper page explicitly marks some program papers `(CGF Paper)`: https://www.realtimerendering.com/kesen/eg2018Papers.htm . **Submissions unresolved.**

#### Eurographics 2019

Official CGF 38(2) Full Papers front matter and TOC: https://onlinelibrary.wiley.com/doi/10.1111/cgf.13651 . Header confirms 40th, Genoa, Italy. **37** numeric-page technical articles, excluding awards and invited talks. Start pages:

`1, 13, 27, 37, 49, 59, 71, 83, 93, 105, 121, 135, 147, 157, 169, 181, 193, 207, 219, 235, 245, 255, 265, 277, 291, 305, 317, 331, 343, 355, 367, 379, 393, 405, 417, 431, 441`.

The official PDF is https://diglib.eg.org/bitstream/handle/10.1111/cgf13651/preface_eg2019.pdf . No submission-count narrative was found. Search hits containing 121 and 37 in this PDF are TOC page numbers, not evidence for submissions. **121 remains one secondary source (Ke-Sen), and is not recorded in `data/conf.json`.** Program / personal paper lists contain additional CGF presentations; use the 37 conference-issue articles.

#### Eurographics 2020

Official CGF 39(2) Full Papers front matter and TOC: https://onlinelibrary.wiley.com/doi/10.1111/cgf.13956 . Header confirms 41st. **49** numeric-page technical articles, excluding awards. Start pages:

`1, 9, 23, 35, 51, 65, 77, 89, 101, 111, 121, 133, 147, 157, 167, 179, 191, 203, 219, 235, 247, 261, 277, 291, 303, 315, 325, 335, 351, 363, 373, 385, 399, 411, 423, 435, 451, 463, 475, 487, 497, 509, 523, 535, 545, 555, 569, 585, 597`.

Actual event location is **Online, Online**. Official joint EGEV homepage confirms virtual delivery: https://conferences.eg.org/egev20/ . Do not use the planned Norrkoping location from earlier front matter. The official program https://conferences.eg.org/egev20/program/ separates EG Full Papers from EuroVis, Short, STAR and other categories, and marks additional journal presentations `(CGF)`; these are not counted in the 49-paper conference issue. **Submissions unresolved.**


### Further historical exploration: 2026-10-23

The maintainer authorized another search for missing historical information. This batch adds 17 yearly records: 13 accepted-count partials and 4 metadata-only partials. No new substantive-review denominator or complete pair was established. The existing SODA Short Paper series is preserved. Prior pending edits and all existing yearly records are retained; no commit or push was requested.

#### ICML 1994-2000

| Year | Accepted | Edition | Verified canonical location | Remaining fields |
| --- | ---: | --- | --- | --- |
| 2000 | 151 | 17th | Stanford, California, USA | substantive-review submissions; one-paper discrepancy noted |
| 1999 | 54 | 16th | Bled, Slovenia | substantive-review submissions |
| 1997 | unresolved | 14th | Nashville, USA | both counts |
| 1996 | unresolved | 13th | Bari, Italy | both counts |
| 1995 | 68 | 12th | Tahoe City, California, USA | submissions |
| 1994 | 42 | 11th | New Brunswick, USA | submissions |

- **1999:** the official homepage reports 152 received submissions and 54 acceptances. The accepted list and final technical program each enumerate 54 research papers; exclude the three invited talks and do not add the joint ICML/ILP poster session again. The CFP promises two PC reviews but also permits rejection of overlength papers without review. The 152 received total does not establish whether these were excluded; retain it as a lead. Justin Boyan's contemporary CV corroborates the received total but does not settle the filtering.
  Sources: https://icml.cc/Conferences/1999/ ; https://icml.cc/Conferences/1999/accepted.html ; https://icml.cc/Conferences/1999/icmlprog.html ; https://icml.cc/Conferences/1999/cfp.html ; https://www.cs.cmu.edu/~jab/cv/cv100.html
- **2000:** slide 6 of the official ICML 2004 program-chairs welcome has exact printed labels 349 Submitted / 151 Accepted / 198 Rejected for 2000. The chart was visually checked. Use **151 accepted**, following policy section 4's preference for an explicit chair-report acceptance count over a presentation schedule. The original final talk schedule has 154 items: 150 technical papers, three invited talks and one panel. The separate final poster schedule also has 150 ICML papers, excluding 76 COLT/UAI posters. Retain an event note on the unexplained one-paper difference; do not invent a withdrawal or decision-stage explanation. The chart does not label 151 as conditional or initial. The 2000 submission instructions discuss returned non-conforming papers and conditional revision, while the retrospective chart does not explain filtering; **349 remains unresolved** as a valid-review denominator.
  Sources: https://icml.cc/Conferences/2004/welcome.pdf ; https://icml.cc/Conferences/2000/ ; https://icml.cc/Conferences/2000/schedule.html ; https://icml.cc/Conferences/2000/posters.html ; https://icml.cc/Conferences/2000/guidelines.html ; https://icml.cc/Conferences/2000/instructions.html ; https://icml.cc/Conferences/2000/rev2k.html
- **1995:** the official publisher's `Contributed Papers` section contains 68 titles. Exclude the three `Invited Talks (Abstracts Only)` and all front matter, schedule and index entries. The description explicitly names the twelfth conference and Granlibakken Resort, Tahoe City, California; do not replace Tahoe City with Lake Tahoe.
  Source: https://shop.elsevier.com/books/machine-learning-proceedings-1995/prieditis/978-1-55860-377-6
- **1994:** the official publisher's `Contributed Papers` section contains 42 titles; exclude its three invited talks and front matter. The event-specific description explicitly says Eleventh, New Brunswick, July 10-13, 1994, resolving the same product page's stale `Eighth` subtitle. DBLP also identifies the eleventh edition. No ordinal is inferred from the year.
  Sources: https://shop.elsevier.com/books/machine-learning-proceedings-1994/cohen/978-1-55860-335-6 ; https://dblp.org/db/conf/icml/icml1994.html
- **1996:** official event and organizer announcement establish 13th/Bari. Its technical program is explicitly preliminary; final counts remain open.
  Sources: https://icml.cc/Conferences/1996/ ; https://icml.cc/Conferences/1996/Prel.html ; https://icml.cc/Conferences/1996/Sched.html
- **1997:** Douglas Fisher's signed contemporary announcement, preserved by KDnuggets, establishes 14th/Vanderbilt University/Nashville. A new lead is the chair-authored report by Frey, Li, Talbert and Fisher, *A Review of the Fourteenth International Conference on Machine Learning*, Intelligent Data Analysis 2(3):245-255. DOIs 10.3233/IDA-1998-2307 and 10.1016/S1088-467X(98)00027-4 are versions of the same report, not independent evidence. Full text was not obtained; no statistics inferred from its abstract.
  Sources: https://www.kdnuggets.com/news/96/n32.html ; https://journals.sagepub.com/doi/pdf/10.3233/IDA-1998-2307?download=true

#### HPDC 1992-2007

| Year | Accepted | Edition | Verified canonical location | Scope |
| --- | ---: | --- | --- | --- |
| 2007 | 20 | 16th | Monterey, California, USA | main technical papers |
| 2001 | 39 | 10th | San Francisco, California, USA | main technical papers |
| 1995 | 27 | 4th | unresolved | contributed technical papers |
| 1994 | 34 | 3rd | San Francisco, California, USA | main technical papers |
| 1993 | unresolved | 2nd | Spokane, USA | metadata only |
| 1992 | unresolved | 1st | Syracuse, USA | metadata only |

- The official series archive explicitly identifies all six ordinals and locations. Spokane is newly registered. For 1995 the official venue is The Ritz Carlton, Pentagon City, Virginia; leave location unresolved until the exact canonical locality is verified instead of substituting the bibliographic Washington DC label.
  Sources: https://hpdc.sci.utah.edu/ ; https://hpdc.sci.utah.edu/1995/registration.html
- **2007:** official main technical sessions enumerate 3+4+2+4+4+3 = 20. Exclude Hot Topics, posters, three keynotes, industry panel and workshops. Official venue identifies Monterey Hyatt Regency. Almeroth reports 100/20, but its denominator filtering and independence from repeating aggregators are unverified; 100 is not imported.
  Sources: https://hpdc.sci.utah.edu/2007/program.htm ; https://hpdc.sci.utah.edu/2007/venue.htm ; https://sites.cs.ucsb.edu/~almeroth/conf/stats/
- **2001:** the archived 15-page final program explicitly numbers 9+7 Tuesday, 9+6 Wednesday and 8 Thursday technical papers, totaling 39. Text and rendered program pages were checked. Exclude six invited talks, two keynotes, nine posters, demos, tutorials and associated workshops. Its cover identifies Tenth/HPDC-10, Nikko Hotel, San Francisco. No exact denominator appears; approximate author-reported rates are not reverse-calculated.
  Sources: https://hpdc.sci.utah.edu/2001/HPDC10.pdf ; https://hpdc.sci.utah.edu/2001/hpdc.html
- **1995:** official Final Program has 28 topical-session items after excluding Session 1's two invited papers. Its Session 4B also contains Ira Richer's one-page *Invited Paper: Overview of the MAGIC Project - Challenges and Accomplishments*, page 139, explicitly classified by the successfully retrieved final proceedings TOC. Excluding it leaves 27 contributed papers. Tutorials, demos, keynotes and panel are separate. Direct IEEE/DOI verification was unavailable; the classification uses the previously readable TOC, not later challenge HTML.
  Sources: https://hpdc.sci.utah.edu/1995/program.html ; https://dblp.uni-trier.de/db/conf/hpdc/hpdc1995.html
- **1994:** technical sessions enumerate 3+3+2+2+3+3+3+3+3+3+3+3 = 34. Exclude three Session 1 invited papers, two keynotes, tutorials and government-strategies panel. Official program identifies Third, Westin St. Francis, San Francisco. The 1992/1993 records retain only official series metadata because contributed/invited counts were not established.
  Source: https://hpdc.sci.utah.edu/1994/program.txt

#### SOSP 1991-1997 and non-event correction

- The official SIGOPS collected proceedings archive enumerates 23 technical papers for 1997 (16th, Saint-Malo), 22 for 1995 (15th, Copper Mountain), 21 for 1993 (14th, Asheville) and 18 for 1991 (13th, Pacific Grove). A complete 84-title audit was retained in the local research cache. The archive colophon explicitly excludes posters/WIP, including 1995's printed poster summaries. Additionally exclude Torvalds's 1997 keynote, the 1995 panel, Wilkes's 1993 invited talk and the 1991 panel. The official SOSP history confirms editions and venues; Asheville and Copper Mountain are newly registered.
  Sources: https://www.sigops.org/s/conferences/sosp/2015/archive/ ; https://sigops.org/s/conferences/sosp/2015/archive/colophon.html ; https://sosp.org/
- The FY1997 SIGOPS report's indexed text independently describes 23 reviewed and shepherded papers. No valid-review denominator was verified. Secondary tables report 120 submissions for 1997 and 84 for 1995, but their shared provenance and filtering are unresolved; neither is imported.
  Sources: https://sigops.org/s/archives/homepage/2007/97annrpt.html ; https://www.myhuiban.com/conference/88 ; https://www.resurchify.com/conference_details.php?id=88 ; https://www.cs.iit.edu/~xli/CS-Conference-Accept-Ratio.htm
- **SOSP 1965 is a non-event:** the live official history explicitly says the first conference was held in 1967 and its edition table starts at 1967. Remove 1965 from the missing-year request; do not create a yearly record.
  Source: https://sosp.org/

#### SODA 2001 and older leads

- **2001 partial:** 12th, Washington DC, USA; **95 Long Form** and **32 Short Form** accepted papers, read directly from the original proceedings preface in the normal Google Books preview. The preface reports an electronic PC meeting August 16-September 7, 2000, selection by originality/contribution/relevance, and 77 additional reviewers. Its phrase `not formally refereed` is qualified by attempts to verify the main claims and an explicit selection process. Exclude the separately invited plenaries by Graham, Manber and Papadimitriou. The book description's 130 papers includes these three; do not use it as the main-track accepted count. Long/Short are already intentionally tracked separately in this series.
- **Submission conflict held:** the preface states 224 Long + 89 Short = **313**, versus **299 overall** in Erik Demaine's table (which agrees on 127 accepted overall). The 14-paper discrepancy is unexplained, so both denominators remain absent and the event note retains the figures. The June 2000 call confirms distinct Long/Short routes, but does not resolve the difference.
  Sources: https://books.google.com/books?id=GKivfpn3MQAC&printsec=frontcover#v=onepage&q=preface&f=false ; https://erikdemaine.org/events/?prefix=SODA ; https://na-digest.coecis.cornell.edu/na-digest-html/00/v00n26.html
- Older leads remain open: Demaine reports 1999 174/337, 1997 83/245, 1995 70/250, 1994 79/222, 1993 53/244, 1992 52/178, 1991 54/190 and 1990 53/190. `confu.org/SODA` is the same collection, not corroboration. The 1999 call has Long/Short routes, so its aggregate is not a main-track pair. Google Books' 1997 description gives 85 papers without separating invited/contributed work; no readable preface was available. An official ACM SIGACT report with a SODA 1990-2005 chart is a new lead, but direct access returned 403 before its chart could be checked.
  Sources: https://erikdemaine.org/events/?prefix=SODA ; https://books.google.com/books/about/Proceedings_of_the_Eighth_Annual_ACM_SIA.html?id=kAlnjT3qfN8C ; https://www.acm.org/binaries/content/assets/sigs/sgb/minutes/archives/march-19-20-2005/agenda031905_8.pdf

Access stops this batch: ScienceDirect and ACM returned 403, Purdue engineering returned 429, and later SIGOPS/DBLP retrieval showed verification challenges. Those sources were stopped. Earlier successfully retrieved material and clearly labeled indexed evidence remain usable. No challenge, certificate, subscription or preview restriction was bypassed. Six canonical locations were added for verified new venues; no existing data was replaced.

## If-You-Know Exceptions

These recent-year items stay on the check list because `If-You-Know.md` explicitly marks them as missing or uncertain, even if nearby years may already exist in `data/conf.json`:

- IMC 2025: long- and short-paper submission counts; 46 Long and 23 Short accepted papers are recorded.
- WSDM 2024.
- CSCW 2019-2025.
- VLDB 2016-now.
- ECIR 2026: full/short paper submission counts. Official proceedings report 46 full papers and 37 short papers, and Springer reports 530 total submissions across all tracks, but the existing ECIR schema needs separate full-paper and short-paper submission counts.

## Location Corrections

A 2026-09-17 audit of the canonical location registry verified three previously flagged spellings.

- ICALP 1981: the official Springer proceedings title uses "Acre (Akko), Israel", so the recorded "Arce, Israel" was corrected to "Acre, Israel" and kept as an alias.
  Source: https://link.springer.com/book/10.1007/3-540-10843-2
- HPCA 2001: Crossref metadata for the official IEEE proceedings (DOI 10.1109/hpca.2001) gives the event location as "Monterrey, Nuevo Leon, Mexico", so "Nuevo Leone, Mexico" was corrected to "Monterrey, Mexico" and the old form kept as an alias. The HPCA history page uses the same misspelled "Nuevo Leone" region name.
  Sources:
  - https://api.crossref.org/works?query.bibliographic=Proceedings+Seventh+International+Symposium+on+High-Performance+Computer+Architecture
  - https://hpca-conf.org/
- ASE 2022: no change. The official conference site itself labels the venue "Oakland Center, Michigan, USA", matching the recorded value.
  Source: https://conf.researchr.org/home/ase-2022

## Journal / Rolling-Review Venue Mapping

Policy section 12 requires an explicit conference-year mapping before counts are added. Verify each volume, issue, or cycle against the venue's official material and record the mapping here.

- VLDB / PVLDB: PVLDB is a rolling journal, and its policy offers every accepted paper a presentation slot at the next available VLDB, so a volume's paper count does not map cleanly to one conference edition. A 2026-09-17 check found no public per-year submission count, and the volume front matter PDFs are not machine-readable with the available tooling. The confirmed 2025 record (369/1613) needs its scope source identified before 2016-2024 can be filled consistently. Backlog: 2016-2024.
  Sources:
  - https://www.vldb.org/pvldb/
  - https://vldb.org/2025/
- CSCW / PACM HCI: map each CSCW review cycle and its PACM HCI issue to the CSCW edition in which the papers are presented; a cycle can precede the edition by more than a year. Backlog: 2019-2025.
  The official 2025 CFP maps the July and October 2024 new-paper cycles to CSCW 2025. See the bounded follow-up above for the unresolved counts.
  Sources:
  - https://cscw.acm.org/2025/index.php/submit-papers/
  - https://cscw.acm.org/2026/
  - https://dl.acm.org/journal/pacmhci
- UbiComp / IMWUT: UbiComp/ISWC 2023 is recorded with 149 IMWUT full papers counted from the official paper-session listing (accepted only; the submission count is not published). The 2017-2022 and 2024-2025 editions remain unresolved because their programs do not expose a countable accepted list (2024 and 2025 link to an Angular SIGCHI program app). Backlog: 2017-2022, 2024-2025.
  The official 2025 mapping is IMWUT 2024 Issue 4 plus IMWUT 2025 Issues 1-3; see the bounded follow-up above.
  Sources:
  - https://www.ubicomp.org/ubicomp-iswc-2025/imwut_papers/
  - https://www.ubicomp.org/ubicomp-iswc-2023/program/paper_sessions/
  - https://www.ubicomp.org/ubicomp-iswc-2026/past-conferences/
- ICWSM: sum the final acceptances of every submission cycle that feeds one ICWSM edition only when the cycles are unique and non-overlapping, and keep full papers separate from the Research Poster Track. The 2025 chairs' message maps its program to January, May, and September 2024 and January 2025 cycles; 139 accepted full papers are recorded by maintainer decision. Backlog: 2021-2024, plus the 2025-2026 full-paper submission counts.
  Sources:
  - https://icwsm.org/2026/
  - https://ojs.aaai.org/index.php/ICWSM

## Local Data Backlog

These are visible from `data/conf.json` and are separate from the 2026 sweep:

- ICWSM 2021-2024 remain absent; 2025 and 2026 are recorded as partial entries. The mapping is tracked under Journal / Rolling-Review Venue Mapping.
- UbiComp latest local year is 2023 (accepted count only); the journal/rolling mapping is defined in policy section 12 and tracked under Journal / Rolling-Review Venue Mapping.
