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

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function validateTrack(track, eventLabel, trackName) {
  if (track === undefined) {
    return { hasData: false, isComplete: false };
  }
  if (!track || typeof track !== 'object' || Array.isArray(track)) {
    addError(`${eventLabel}: ${trackName} must be an object when present.`);
    return { hasData: false, isComplete: false };
  }

  const hasAccepted = hasOwn(track, 'num_acc');
  const hasSubmitted = hasOwn(track, 'num_sub');
  if (!hasAccepted && !hasSubmitted) {
    addError(`${eventLabel}: ${trackName} must contain num_acc or num_sub.`);
    return { hasData: false, isComplete: false };
  }

  if (hasAccepted && !isPositiveNumber(track.num_acc)) {
    addError(`${eventLabel}: ${trackName}.num_acc must be a positive number when present.`);
  }
  if (hasSubmitted && !isPositiveNumber(track.num_sub)) {
    addError(`${eventLabel}: ${trackName}.num_sub must be a positive number when present.`);
  }
  if (hasAccepted && hasSubmitted && isPositiveNumber(track.num_acc) && isPositiveNumber(track.num_sub)
      && track.num_acc > track.num_sub) {
    addError(`${eventLabel}: ${trackName} accepted papers cannot exceed submissions.`);
  }

  return {
    hasData: true,
    isComplete: hasAccepted && hasSubmitted
  };
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
const conferenceNames = new Map();
let eventCount = 0;
let completeEventCount = 0;
let partialEventCount = 0;

for (const conference of formalConferences) {
  if (typeof conference.series !== 'string' || conference.series.trim() === '') {
    addError('Each conference must have a non-empty series.');
    continue;
  }

  seriesCounts.set(conference.series, (seriesCounts.get(conference.series) || 0) + 1);
  conferenceNames.set(conference.series.toLowerCase(), conference.series);

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

    const hasLocation = hasOwn(event, 'location');
    if (hasLocation && (typeof event.location !== 'string' || !event.location.includes(','))) {
      addError(`${eventLabel}: location should include city and country separated by a comma when present.`);
    }

    const mainTrack = validateTrack(event.main_track, eventLabel, 'main_track');
    const secondTrack = validateTrack(event.second_track, eventLabel, 'second_track');
    const hasOrdinal = typeof event.ordinal === 'string' && event.ordinal.trim() !== '';
    const hasNote = typeof event.note === 'string' && event.note.trim() !== '';

    if (!hasLocation && !hasOrdinal && !hasNote && !mainTrack.hasData && !secondTrack.hasData) {
      addError(`${eventLabel}: partial entry must contain at least one known fact beyond the year.`);
    }

    if (mainTrack.isComplete) {
      completeEventCount += 1;
    } else {
      partialEventCount += 1;
    }
  }
}

for (const conference of formalConferences) {
  const aliases = conference.metadata?.aliases;
  if (aliases === undefined) {
    continue;
  }
  if (!Array.isArray(aliases) || aliases.length === 0) {
    addError(`${conference.series}: metadata.aliases must be a non-empty array when present.`);
    continue;
  }

  for (const alias of aliases) {
    if (typeof alias !== 'string' || alias.trim() === '') {
      addError(`${conference.series}: every metadata alias must be a non-empty string.`);
      continue;
    }
    const normalizedAlias = alias.trim().toLowerCase();
    if (conferenceNames.has(normalizedAlias)) {
      addError(`${conference.series}: alias "${alias}" conflicts with conference name "${conferenceNames.get(normalizedAlias)}".`);
      continue;
    }
    conferenceNames.set(normalizedAlias, conference.series);
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

console.log(`Data check passed: ${formalConferences.length} conferences, ${eventCount} yearly entries (${completeEventCount} complete, ${partialEventCount} partial).`);
