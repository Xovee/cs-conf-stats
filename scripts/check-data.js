const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function decodeConfValue(value) {
  try {
    return decodeURIComponent(value.replace(/\+/g, '%20'));
  } catch {
    return value;
  }
}

const data = JSON.parse(readText('data/conf.json'));

if (!Array.isArray(data.conferences)) {
  addError('data/conf.json must contain a conferences array.');
}

const conferences = Array.isArray(data.conferences) ? data.conferences : [];
const formalConferences = conferences.filter(conference => conference.series !== 'Template');
const seriesCounts = new Map();
let eventCount = 0;

for (const conference of formalConferences) {
  if (typeof conference.series !== 'string' || conference.series.trim() === '') {
    addError('Each conference must have a non-empty series.');
    continue;
  }

  seriesCounts.set(conference.series, (seriesCounts.get(conference.series) || 0) + 1);

  if (!conference.metadata || typeof conference.metadata !== 'object') {
    addError(`${conference.series}: missing metadata object.`);
  } else if (typeof conference.metadata.series_full_title !== 'string' || conference.metadata.series_full_title.trim() === '') {
    addError(`${conference.series}: missing metadata.series_full_title.`);
  }

  if (!Array.isArray(conference.yearly_data) || conference.yearly_data.length === 0) {
    addError(`${conference.series}: missing yearly_data entries.`);
    continue;
  }

  const years = new Set();

  for (const event of conference.yearly_data) {
    eventCount += 1;
    const eventLabel = `${conference.series} ${event.year ?? '(missing year)'}`;

    if (!Number.isInteger(event.year)) {
      addError(`${eventLabel}: year must be an integer.`);
    } else if (years.has(event.year)) {
      addError(`${eventLabel}: duplicate year in conference series.`);
    } else {
      years.add(event.year);
    }

    if (typeof event.location !== 'string' || !event.location.includes(',')) {
      addError(`${eventLabel}: location should include city and country separated by a comma.`);
    }

    if (!event.main_track || typeof event.main_track !== 'object') {
      addError(`${eventLabel}: missing main_track.`);
      continue;
    }

    const { num_acc: numAccepted, num_sub: numSubmitted } = event.main_track;
    if (!isPositiveNumber(numAccepted) || !isPositiveNumber(numSubmitted)) {
      addError(`${eventLabel}: main_track counts must be positive numbers.`);
    } else if (numAccepted > numSubmitted) {
      addError(`${eventLabel}: accepted papers cannot exceed submissions.`);
    }

    if (event.second_track) {
      const { num_acc: secondAccepted, num_sub: secondSubmitted } = event.second_track;
      if (!isPositiveNumber(secondAccepted) || !isPositiveNumber(secondSubmitted)) {
        addError(`${eventLabel}: second_track counts must be positive numbers when present.`);
      } else if (secondAccepted > secondSubmitted) {
        addError(`${eventLabel}: second_track accepted papers cannot exceed submissions.`);
      }
    }
  }
}

for (const [series, count] of seriesCounts.entries()) {
  if (count > 1) {
    addError(`${series}: duplicate conference series.`);
  }
}

const knownSeries = new Set(seriesCounts.keys());
const indexHtml = readText('index.html');
const catalogHtml = readText('catalog.html');
const readme = readText('README.md');

const selectIds = new Set([...indexHtml.matchAll(/<select\s+id="([^"]+)"/g)].map(match => match[1]));
const optionValues = [...indexHtml.matchAll(/<option\s+value="([^"]*)"/g)]
  .map(match => match[1])
  .filter(Boolean);

for (const optionValue of optionValues) {
  if (!knownSeries.has(optionValue)) {
    addError(`index.html option value "${optionValue}" does not exist in data/conf.json.`);
  }
}

for (const series of knownSeries) {
  if (!optionValues.includes(series)) {
    addError(`index.html category dropdowns do not include "${series}".`);
  }
}

const clickRefs = [...indexHtml.matchAll(/clickConf\('([^']+)', '([^']+)'\)/g)]
  .map(match => ({ dropdownId: match[1], series: match[2] }));

for (const { dropdownId, series } of clickRefs) {
  if (!selectIds.has(dropdownId)) {
    addError(`clickConf references missing dropdown "${dropdownId}" for "${series}".`);
  }
  if (!knownSeries.has(series)) {
    addError(`clickConf references missing conference "${series}".`);
  }
}

const linkedSeries = new Set(
  [...indexHtml.matchAll(/href=["'][^"']*[?&]conf=([^"']+)["']/g)]
    .map(match => decodeConfValue(match[1]))
);

for (const series of linkedSeries) {
  if (!knownSeries.has(series)) {
    addError(`index.html links to missing conference "${series}".`);
  }
}

for (const series of knownSeries) {
  const encodedSeries = encodeURIComponent(series).replace(/%20/g, ' ');
  if (!catalogHtml.includes(`conf=${encodedSeries}`) && !catalogHtml.includes(`conf=${series}`)) {
    addError(`catalog.html does not link to "${series}".`);
  }
  if (!readme.includes(`${series}:`) && !readme.includes(`${series.replace('-', '+')}:`)) {
    addWarning(`README.md may be missing catalog entry for "${series}".`);
  }
}

const outputCss = readText('output.css');
if (outputCss.includes('}(min-width')) {
  addError('output.css contains malformed media query output. Rebuild it with npm run build:css.');
}

if (warnings.length > 0) {
  console.warn('Warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error('Data check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Data check passed: ${formalConferences.length} conferences, ${eventCount} yearly entries.`);
