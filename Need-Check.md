# Need Check

A list of events that need further check.

Last reviewed: 2026-09-17.

## Purpose

This is the operational research ledger for partial records, source links, unresolved conflicts, and next candidates. Durable decisions about track scope, source confidence, valid submissions, protected recent data, and partial records live in the [data collection policy](./docs/data-collection-policy.md).

Keep this file specific to current evidence and work status. It must not override the policy.

## 2026 Partial Records

These events now have confirmed partial data in `data/conf.json`. Keep the known fields and continue looking only for the missing complements.

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
- ACM MM 2026: 7,053 main-track submissions; accepted count missing.
  Sources:
  - https://cdmc.xmu.edu.cn/info/1002/5624.htm
  - https://in.linkedin.com/in/aaryansharma-iitb
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
- CCS 2026: official location and 33rd edition recorded. Cycle A reports an upper bound of 191 acceptances (including pending Minor Revision and Shepherding decisions) from a 981-paper decision pool after excluding 225 desk rejections. Cycle B and final annual counts remain outstanding, so no annual counts are recorded yet; see the 2026-10-02 follow-up above.
  Sources:
  - https://www.sigsac.org/ccs/CCS2026/
  - https://github.com/ACM-CCS-2026/Transparency-Report
- MICRO 2026: official location and 59th edition recorded; main Research Track submission and accepted counts missing. The inaugural Industry Track uses the same submission system and accepted Industry papers will not be labeled separately in the proceedings, so a combined proceedings count must not be treated as the Research Track count.
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
