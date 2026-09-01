const fs = require('fs');
const path = require('path');
const { SITE_URL, buildSlugMap, readConferences, slugifySeries } = require('./seo-utils');

const rootDir = path.resolve(__dirname, '..');
const conferencesDir = path.join(rootDir, 'conferences');
const generatedMarkerPath = path.join(conferencesDir, '.generated-by-cs-conf-stats');
const conferences = readConferences(rootDir);
const slugBySeries = buildSlugMap(conferences);
const sitemapUrls = [];

function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeXML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function jsonForHTML(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function stripHTML(value) {
  return String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toText(value) {
  if (Array.isArray(value)) {
    return value.map(toText).filter(Boolean).join(', ');
  }
  return stripHTML(value);
}

function extractUrls(value) {
  const values = Array.isArray(value) ? value : [value];
  const urls = new Set();

  for (const item of values) {
    const text = String(item ?? '');
    const hrefMatches = [...text.matchAll(/href=['"]([^'"]+)['"]/g)].map(match => match[1]);
    const bareMatches = text.match(/https?:\/\/[^\s"'<>]+/g) || [];

    for (const url of [...hrefMatches, ...bareMatches]) {
      urls.add(url);
    }
  }

  return [...urls];
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return 'N/A';
  }
  return new Intl.NumberFormat('en-US').format(value);
}

function isKnownCount(value) {
  return Number.isFinite(value) && value > 0;
}

function isCompleteTrack(track) {
  return isKnownCount(track?.num_acc) && isKnownCount(track?.num_sub);
}

function formatTrack(track) {
  if (!track || (!isKnownCount(track.num_acc) && !isKnownCount(track.num_sub))) {
    return '';
  }
  if (isCompleteTrack(track)) {
    return `${formatNumber(track.num_acc)} / ${formatNumber(track.num_sub)} (${((track.num_acc / track.num_sub) * 100).toFixed(1)}%)`;
  }
  if (isKnownCount(track.num_acc)) {
    return `${formatNumber(track.num_acc)} accepted`;
  }
  return `${formatNumber(track.num_sub)} submitted`;
}

function getRate(event) {
  const accepted = event.main_track?.num_acc;
  const submitted = event.main_track?.num_sub;

  if (!Number.isFinite(accepted) || !Number.isFinite(submitted) || submitted <= 0) {
    return null;
  }

  return accepted / submitted;
}

function formatRate(event) {
  const rate = getRate(event);
  return rate === null ? 'N/A' : `${(rate * 100).toFixed(1)}%`;
}

function eventSummary(conference, event) {
  const series = conference.series;
  const accepted = event.main_track?.num_acc;
  const submitted = event.main_track?.num_sub;
  const facts = [];

  if (isCompleteTrack(event.main_track)) {
    facts.push(`accepted ${formatNumber(accepted)} papers out of ${formatNumber(submitted)} submissions, for an acceptance rate of ${formatRate(event)}`);
  } else {
    if (isKnownCount(accepted)) facts.push(`has ${formatNumber(accepted)} accepted papers recorded`);
    if (isKnownCount(submitted)) facts.push(`received ${formatNumber(submitted)} submissions`);
  }
  if (event.location) facts.push(`was held in ${event.location}`);

  if (facts.length === 0) {
    return `${series} ${event.year} has a partial record in CS Conf Stats.`;
  }
  return `${series} ${event.year} ${facts.join(', and ')}.`;
}

function sortedYears(conference) {
  return [...conference.yearly_data].sort((a, b) => b.year - a.year);
}

function conferenceUrl(conference) {
  return `/conferences/${slugBySeries.get(conference.series)}/`;
}

function yearUrl(conference, year) {
  return `/conferences/${slugBySeries.get(conference.series)}/${year}/`;
}

function absoluteUrl(relativeUrl) {
  return `${SITE_URL}${relativeUrl}`;
}

function addSitemapUrl(relativeUrl, priority, changefreq) {
  sitemapUrls.push({
    loc: absoluteUrl(relativeUrl),
    priority,
    changefreq,
  });
}

function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function legacySlugs(conference) {
  const aliases = Array.isArray(conference.metadata.aliases) ? conference.metadata.aliases : [];
  const canonicalSlug = slugBySeries.get(conference.series);
  return [...new Set(aliases.map(slugifySeries))].filter(slug => slug && slug !== canonicalSlug);
}

function redirectPage(canonicalPath, label) {
  const canonical = absoluteUrl(canonicalPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${escapeHTML(canonicalPath)}">
  <link rel="canonical" href="${escapeHTML(canonical)}">
  <title>${escapeHTML(label)} | CS Conf Stats</title>
</head>
<body>
  <p>This conference has a new name. <a href="${escapeHTML(canonicalPath)}">Continue to ${escapeHTML(label)}</a>.</p>
</body>
</html>
`;
}

function renderLegacyRedirects(conference) {
  const canonicalSlug = slugBySeries.get(conference.series);
  let count = 0;

  for (const legacySlug of legacySlugs(conference)) {
    const canonicalPath = `/conferences/${canonicalSlug}/`;
    writeFile(path.join('conferences', legacySlug, 'index.html'), redirectPage(canonicalPath, conference.series));
    count += 1;

    for (const event of conference.yearly_data) {
      const yearPath = `/conferences/${canonicalSlug}/${event.year}/`;
      writeFile(path.join('conferences', legacySlug, String(event.year), 'index.html'), redirectPage(yearPath, `${conference.series} ${event.year}`));
      count += 1;
    }
  }

  return count;
}

function resetGeneratedDirectory() {
  if (fs.existsSync(conferencesDir)) {
    if (!fs.existsSync(generatedMarkerPath)) {
      throw new Error('Refusing to overwrite conferences/: missing generated marker.');
    }
    fs.rmSync(conferencesDir, { recursive: true, force: true });
  }

  fs.mkdirSync(conferencesDir, { recursive: true });
  fs.writeFileSync(generatedMarkerPath, 'Generated by scripts/generate-seo-pages.js\n', 'utf8');
}

function pageShell({ title, description, canonicalPath, body, structuredData }) {
  const canonical = absoluteUrl(canonicalPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHTML(description)}">
  <title>${escapeHTML(title)}</title>
  <link href="/output.css" rel="stylesheet">
  <link rel="canonical" href="${escapeHTML(canonical)}">
  <meta property="og:title" content="${escapeHTML(title)}">
  <meta property="og:description" content="${escapeHTML(description)}">
  <meta property="og:image" content="${SITE_URL}/img/csconfstats-intro.png">
  <meta property="og:url" content="${escapeHTML(canonical)}">
  <script type="application/ld+json">${jsonForHTML(structuredData)}</script>
</head>
<body class="min-h-screen flex flex-col bg-gray-100 text-gray-800">
<header class="site-header">
  <div class="site-header-inner">
    <a href="/" class="site-brand" aria-label="CS Conf Stats home">
      <img src="/img/logo.svg" alt="CS Conf Stats logo" class="h-10 w-10">
      <span class="site-brand-title">CS Conf Stats</span>
    </a>
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="/">Main</a>
      <a href="/conferences/">Conferences</a>
      <a href="/fun-fact.html">Fun Facts</a>
      <a href="https://github.com/Xovee/cs-conf-stats" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </div>
</header>
<main class="container mx-auto px-4 py-8 flex-1">
${body}
</main>
<footer class="py-6 border-t bg-white">
  <div class="container mx-auto px-4 text-base">
    <p>Created and maintained by <a href="https://www.xoveexu.com" target="_blank" rel="noopener noreferrer">Xovee Xu</a>. Data are collected from proceedings and the web, and corrections are welcome on <a href="https://github.com/Xovee/cs-conf-stats" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
  </div>
</footer>
</body>
</html>
`;
}

function breadcrumbStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function datasetStructuredData({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url: absoluteUrl(path),
    creator: {
      '@type': 'Person',
      name: 'Xovee Xu',
      url: 'https://www.xoveexu.com',
    },
    license: 'https://github.com/Xovee/cs-conf-stats',
  };
}

function graphStructuredData(...items) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

function renderTable(conference, events) {
  const rows = events.map((event, index) => {
    const accepted = event.main_track?.num_acc;
    const submitted = event.main_track?.num_sub;
    const note = toText(event.note);
    const secondTrack = formatTrack(event.second_track);
    const rowClass = index === 0 ? 'is-latest' : '';

    return `      <tr class="${rowClass}">
        <td class="p-3"><a href="${yearUrl(conference, event.year)}">${event.year}</a></td>
        <td class="p-3">${escapeHTML(event.location || 'N/A')}</td>
        <td class="p-3 text-right">${formatNumber(accepted)}</td>
        <td class="p-3 text-right">${formatNumber(submitted)}</td>
        <td class="p-3 text-right"><span class="rate-badge">${formatRate(event)}</span></td>
        <td class="p-3">${escapeHTML(secondTrack)}</td>
        <td class="p-3">${escapeHTML(note)}</td>
      </tr>`;
  }).join('\n');

  return `<div class="seo-table-card">
  <table class="seo-table">
    <thead>
      <tr>
        <th>Year</th>
        <th>Location</th>
        <th class="text-right">Accepted</th>
        <th class="text-right">Submitted</th>
        <th class="text-right">Acceptance Rate</th>
        <th>Second Track</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</div>`;
}

function renderExternalLinks(conference) {
  const websiteUrls = extractUrls(conference.metadata.website);
  const proceedingsUrls = extractUrls(conference.metadata.proceedings);
  const links = [];

  for (const url of websiteUrls) {
    links.push(`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Official website</a>`);
  }
  for (const url of proceedingsUrls) {
    links.push(`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Proceedings</a>`);
  }

  if (links.length === 0) {
    return '';
  }

  return `<p>${links.join(' | ')}</p>`;
}

function renderChartLink(series) {
  return `<p class="seo-chart-cta">
    <a href="/?conf=${encodeURIComponent(series)}" aria-label="View ${escapeHTML(series)} on the main interactive CS Conf Stats chart">
      <span>View interactive chart</span>
      <strong>${escapeHTML(series)} on CS Conf Stats</strong>
    </a>
  </p>`;
}

function renderSubmissionTrendCard(events) {
  const recentEvents = events
    .filter(event => Number.isFinite(event.main_track?.num_sub) && event.main_track.num_sub > 0)
    .slice(0, 5);

  if (recentEvents.length < 2) {
    return '';
  }

  const latest = recentEvents[0];
  const baseline = recentEvents[recentEvents.length - 1];
  const latestSubmissions = latest.main_track.num_sub;
  const baselineSubmissions = baseline.main_track.num_sub;
  const delta = latestSubmissions - baselineSubmissions;
  const percentChange = delta / baselineSubmissions;
  const sign = delta >= 0 ? '+' : '-';
  const changeLabel = `${sign}${Math.abs(percentChange * 100).toFixed(1)}%`;
  const deltaLabel = `${sign}${formatNumber(Math.abs(delta))}`;

  return `<div class="seo-stat-card seo-stat-card-wide">
    <div class="conf-card-title">Submission Trend</div>
    <div class="conf-card-big-desc">${changeLabel}</div>
    <div class="conf-card-desc">Last ${recentEvents.length} events (${baseline.year}-${latest.year}): ${formatNumber(baselineSubmissions)} &rarr; ${formatNumber(latestSubmissions)} submissions (${deltaLabel}).</div>
  </div>`;
}

function relatedConferences(conference, limit = 6) {
  const sameDiscipline = conferences
    .filter(item => item.series !== conference.series && item.discipline === conference.discipline)
    .slice(0, limit);

  return sameDiscipline.map(item => `<a href="${conferenceUrl(item)}">${escapeHTML(item.series)}</a>`).join(', ');
}

function renderConferencePage(conference) {
  const events = sortedYears(conference);
  const latest = events[0];
  const completeEvents = events.filter(event => isCompleteTrack(event.main_track));
  const latestComplete = completeEvents[0] || null;
  const series = conference.series;
  const fullTitle = toText(conference.metadata.series_full_title);
  const discipline = conference.discipline;
  const yearRange = `${events[events.length - 1].year}-${events[0].year}`;
  const latestSummary = isCompleteTrack(latest.main_track)
    ? `${series} ${latest.year} accepted ${formatNumber(latest.main_track.num_acc)} papers out of ${formatNumber(latest.main_track.num_sub)} submissions, for an acceptance rate of ${formatRate(latest)}.`
    : eventSummary(conference, latest);
  const title = `${series} Acceptance Rate and Submission Statistics | CS Conf Stats`;
  const description = `${series} acceptance rate and submission statistics from ${yearRange}, including yearly accepted papers, submissions, locations, and notes.`;
  const canonicalPath = conferenceUrl(conference);
  const related = relatedConferences(conference);
  const mainDisciplines = toText(conference.metadata.main_discipline);
  const otherDisciplines = toText(conference.metadata.other_discipline);
  const parentOrg = toText(conference.metadata.parent_org);
  const note = toText(conference.metadata.note);

  const body = `<nav class="text-sm md:text-base mb-6">
  <a href="/">Home</a> / <a href="/conferences/">Conferences</a> / ${escapeHTML(series)}
</nav>

<section class="mb-8">
  <h1 class="text-3xl md:text-5xl text-uestc mb-4">${escapeHTML(series)} Acceptance Rate and Submission Statistics</h1>
  <p>${escapeHTML(fullTitle)} is tracked by CS Conf Stats as a ${escapeHTML(discipline)} conference. The dataset covers ${events.length} events from ${yearRange}.</p>
  <p>${escapeHTML(latestSummary)}</p>
  ${renderChartLink(series)}
  ${renderExternalLinks(conference)}
</section>

<section class="seo-stat-grid mb-8">
  ${latestComplete ? `<div class="seo-stat-card seo-stat-card-accent">
    <div class="conf-card-title">${latestComplete === latest ? 'Latest Acceptance Rate' : 'Latest Complete Rate'}</div>
    <div class="conf-card-big-desc">${formatRate(latestComplete)}</div>
    <div class="conf-card-desc">${latestComplete.year}: ${formatNumber(latestComplete.main_track.num_acc)} accepted / ${formatNumber(latestComplete.main_track.num_sub)} submitted</div>
  </div>` : ''}
  <div class="seo-stat-card">
    <div class="conf-card-title">Years Covered</div>
    <div class="conf-card-big-desc">${events.length}</div>
    <div class="conf-card-desc">${escapeHTML(yearRange)}</div>
  </div>
  <div class="seo-stat-card">
    <div class="conf-card-title">Discipline</div>
    <div class="conf-card-desc">${escapeHTML(discipline)}</div>
    <div class="conf-card-desc">${escapeHTML(mainDisciplines)}</div>
  </div>
  ${renderSubmissionTrendCard(events)}
</section>

<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">Yearly Statistics</h2>
  ${renderTable(conference, events)}
</section>

<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">Conference Details</h2>
  <dl class="seo-detail-list">
    <dt>Full Title</dt>
    <dd>${escapeHTML(fullTitle)}</dd>
    <dt>Main Discipline</dt>
    <dd>${escapeHTML(mainDisciplines)}</dd>
    <dt>Other Topics</dt>
    <dd>${escapeHTML(otherDisciplines)}</dd>
    <dt>Parent Organization</dt>
    <dd>${escapeHTML(parentOrg)}</dd>
    <dt>Notes</dt>
    <dd>${escapeHTML(note || 'No conference-level note is recorded.')}</dd>
  </dl>
</section>

<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">More ${escapeHTML(series)} Pages</h2>
  <ul class="seo-year-list seo-list-card">
    ${events.map(event => `<li><a href="${yearUrl(conference, event.year)}">${series} ${event.year}</a></li>`).join('\n    ')}
  </ul>
  ${related ? `<p>Related ${escapeHTML(discipline)} conferences: ${related}.</p>` : ''}
</section>`;

  const structuredData = graphStructuredData(
    breadcrumbStructuredData([
      { name: 'Home', path: '/' },
      { name: 'Conferences', path: '/conferences/' },
      { name: series, path: canonicalPath },
    ]),
    datasetStructuredData({
      name: `${series} acceptance rate and submission statistics`,
      description,
      path: canonicalPath,
    })
  );

  writeFile(path.join('conferences', slugBySeries.get(series), 'index.html'), pageShell({
    title,
    description,
    canonicalPath,
    body,
    structuredData,
  }));
  addSitemapUrl(canonicalPath, '0.8', 'weekly');
}

function comparisonSentence(conference, event, olderEvent) {
  if (!olderEvent) {
    return `${conference.series} ${event.year} is the earliest event currently recorded for this conference in CS Conf Stats.`;
  }

  const currentRate = getRate(event);
  const olderRate = getRate(olderEvent);
  const comparisons = [];

  if (currentRate !== null && olderRate !== null) {
    const rateDirection = currentRate >= olderRate ? 'increased' : 'decreased';
    comparisons.push(`the acceptance rate ${rateDirection} from ${formatRate(olderEvent)} to ${formatRate(event)}`);
  }

  const submitted = event.main_track?.num_sub;
  const olderSubmitted = olderEvent.main_track?.num_sub;
  if (isKnownCount(submitted) && isKnownCount(olderSubmitted)) {
    const submissionDirection = submitted >= olderSubmitted ? 'increased' : 'decreased';
    comparisons.push(`submissions ${submissionDirection} from ${formatNumber(olderSubmitted)} to ${formatNumber(submitted)}`);
  }

  if (comparisons.length === 0) {
    return `${conference.series} ${event.year} and ${olderEvent.year} do not yet have enough matching data for a direct comparison.`;
  }

  return `Compared with ${conference.series} ${olderEvent.year}, ${comparisons.join(', and ')}.`;
}

function renderYearPage(conference, event, events) {
  const series = conference.series;
  const fullTitle = toText(conference.metadata.series_full_title);
  const accepted = event.main_track?.num_acc;
  const submitted = event.main_track?.num_sub;
  const hasAccepted = isKnownCount(accepted);
  const hasSubmitted = isKnownCount(submitted);
  const hasCompleteTrack = isCompleteTrack(event.main_track);
  const rate = formatRate(event);
  const canonicalPath = yearUrl(conference, event.year);
  const title = hasCompleteTrack
    ? `${series} ${event.year} Acceptance Rate: ${formatNumber(accepted)}/${formatNumber(submitted)} = ${rate} | CS Conf Stats`
    : `${series} ${event.year} Conference Statistics | CS Conf Stats`;
  const description = hasCompleteTrack
    ? `${series} ${event.year} accepted ${formatNumber(accepted)} papers out of ${formatNumber(submitted)} submissions, for an acceptance rate of ${rate}.`
    : `${eventSummary(conference, event)} This partial record contains the currently verified details.`;
  const eventIndex = events.findIndex(item => item.year === event.year);
  const newerEvent = eventIndex > 0 ? events[eventIndex - 1] : null;
  const olderEvent = eventIndex < events.length - 1 ? events[eventIndex + 1] : null;
  const note = toText(event.note);
  const related = relatedConferences(conference, 4);

  const body = `<nav class="text-sm md:text-base mb-6">
  <a href="/">Home</a> / <a href="/conferences/">Conferences</a> / <a href="${conferenceUrl(conference)}">${escapeHTML(series)}</a> / ${event.year}
</nav>

<section class="mb-8">
  <h1 class="text-3xl md:text-5xl text-uestc mb-4">${escapeHTML(series)} ${event.year} ${hasCompleteTrack ? 'Acceptance Rate' : 'Conference Statistics'}</h1>
  <p>${escapeHTML(description)}</p>
  ${event.location ? `<p>${escapeHTML(fullTitle)} ${event.year}${event.ordinal ? ` (${escapeHTML(event.ordinal)})` : ''} was held in ${escapeHTML(event.location)}.</p>` : ''}
  <p>${escapeHTML(comparisonSentence(conference, event, olderEvent))}</p>
  ${renderChartLink(series)}
</section>

<section class="seo-stat-grid mb-8">
  ${hasCompleteTrack ? `<div class="seo-stat-card seo-stat-card-accent">
    <div class="conf-card-title">Acceptance Rate</div>
    <div class="conf-card-big-desc">${rate}</div>
  </div>` : ''}
  ${hasAccepted ? `<div class="seo-stat-card">
    <div class="conf-card-title">Accepted Papers</div>
    <div class="conf-card-big-desc">${formatNumber(accepted)}</div>
  </div>` : ''}
  ${hasSubmitted ? `<div class="seo-stat-card">
    <div class="conf-card-title">Submissions</div>
    <div class="conf-card-big-desc">${formatNumber(submitted)}</div>
  </div>` : ''}${!hasCompleteTrack && event.location ? `
  <div class="seo-stat-card">
    <div class="conf-card-title">Location</div>
    <div class="conf-card-desc">${escapeHTML(event.location)}</div>
  </div>` : ''}
</section>

<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">${escapeHTML(series)} ${event.year} Statistics</h2>
  <div class="seo-table-card">
    <table class="seo-table">
      <tbody>
        <tr><th>Conference</th><td>${escapeHTML(series)} - ${escapeHTML(fullTitle)}</td></tr>
        <tr><th>Year</th><td>${event.year}</td></tr>
        <tr><th>Ordinal</th><td>${escapeHTML(event.ordinal || '')}</td></tr>
        <tr><th>Location</th><td>${escapeHTML(event.location || 'N/A')}</td></tr>
        <tr><th>Accepted</th><td>${formatNumber(accepted)}</td></tr>
        <tr><th>Submitted</th><td>${formatNumber(submitted)}</td></tr>
        <tr><th>Acceptance Rate</th><td><span class="rate-badge">${rate}</span></td></tr>
        <tr><th>Note</th><td>${escapeHTML(note || 'No event-level note is recorded.')}</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">More Pages</h2>
  <p>
    ${newerEvent ? `<a href="${yearUrl(conference, newerEvent.year)}">Newer: ${series} ${newerEvent.year}</a> | ` : ''}
    <a href="${conferenceUrl(conference)}">All ${escapeHTML(series)} acceptance rates</a>
    ${olderEvent ? ` | <a href="${yearUrl(conference, olderEvent.year)}">Older: ${series} ${olderEvent.year}</a>` : ''}
  </p>
  ${related ? `<p>Related conferences: ${related}.</p>` : ''}
</section>`;

  const structuredData = graphStructuredData(
    breadcrumbStructuredData([
      { name: 'Home', path: '/' },
      { name: 'Conferences', path: '/conferences/' },
      { name: series, path: conferenceUrl(conference) },
      { name: String(event.year), path: canonicalPath },
    ]),
    datasetStructuredData({
      name: `${series} ${event.year} acceptance rate`,
      description,
      path: canonicalPath,
    })
  );

  writeFile(path.join('conferences', slugBySeries.get(series), String(event.year), 'index.html'), pageShell({
    title,
    description,
    canonicalPath,
    body,
    structuredData,
  }));
  addSitemapUrl(canonicalPath, '0.7', 'monthly');
}

function renderConferencesIndex() {
  const grouped = new Map();
  for (const conference of conferences) {
    const group = conference.discipline || 'Other';
    if (!grouped.has(group)) {
      grouped.set(group, []);
    }
    grouped.get(group).push(conference);
  }

  const sections = [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([discipline, items]) => {
    const links = items
      .sort((a, b) => a.series.localeCompare(b.series))
      .map(conference => {
        const events = sortedYears(conference);
        const latest = events[0];
        const latestValue = isCompleteTrack(latest.main_track) ? formatRate(latest) : 'partial data';
        return `<li><a href="${conferenceUrl(conference)}"><span>${escapeHTML(conference.series)}</span>: ${escapeHTML(toText(conference.metadata.series_full_title))}</a> <span class="text-gray-600">Latest ${latest.year}: ${latestValue}</span></li>`;
      })
      .join('\n');

    return `<section class="mb-8">
  <h2 class="text-2xl md:text-3xl mb-3">${escapeHTML(discipline)}</h2>
  <div class="seo-list-card">
    <ol class="seo-conference-list">
${links}
    </ol>
  </div>
</section>`;
  }).join('\n');

  const title = 'Computer Science Conference Acceptance Rates | CS Conf Stats';
  const description = `Browse acceptance rate and submission statistics for ${conferences.length} computer science conferences.`;
  const canonicalPath = '/conferences/';
  const body = `<nav class="text-sm md:text-base mb-6">
  <a href="/">Home</a> / Conferences
</nav>

<section class="mb-8">
  <h1 class="text-3xl md:text-5xl text-uestc mb-4">Computer Science Conference Acceptance Rates</h1>
  <p>${escapeHTML(description)} Each conference page includes yearly accepted papers, submissions, acceptance rates, locations, and notes.</p>
</section>

${sections}`;

  const structuredData = graphStructuredData(
    breadcrumbStructuredData([
      { name: 'Home', path: '/' },
      { name: 'Conferences', path: canonicalPath },
    ]),
    datasetStructuredData({
      name: 'Computer science conference acceptance rate statistics',
      description,
      path: canonicalPath,
    })
  );

  writeFile(path.join('conferences', 'index.html'), pageShell({
    title,
    description,
    canonicalPath,
    body,
    structuredData,
  }));
  addSitemapUrl(canonicalPath, '0.9', 'weekly');
}

function renderSitemaps() {
  const staticUrls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE_URL}/fun-fact.html`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${SITE_URL}/catalog.html`, priority: '0.5', changefreq: 'monthly' },
  ];

  const urls = [...staticUrls, ...sitemapUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${escapeXML(item.loc)}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  writeFile('sitemap.xml', xml);
  writeFile('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
}

resetGeneratedDirectory();
renderConferencesIndex();

for (const conference of conferences) {
  const events = sortedYears(conference);
  renderConferencePage(conference);
  for (const event of events) {
    renderYearPage(conference, event, events);
  }
}

const legacyRedirectCount = conferences.reduce((total, conference) => total + renderLegacyRedirects(conference), 0);

renderSitemaps();

const yearPageCount = conferences.reduce((total, conference) => total + conference.yearly_data.length, 0);
console.log(`Generated SEO pages: ${conferences.length} conference pages, ${yearPageCount} year pages, ${legacyRedirectCount} legacy redirects, sitemap.xml, robots.txt.`);
