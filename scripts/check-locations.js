const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const errors = [];

function readJSON(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), 'utf8'));
}

function addError(message) {
  errors.push(message);
}

function locationKey(location) {
  const parts = String(location).split(',').map(part => part.trim()).filter(Boolean);
  if (parts.length < 2) {
    return null;
  }
  return `${parts[0].toLowerCase()}|${parts.at(-1).toLowerCase()}`;
}

const data = readJSON('data/conf.json');
const registry = readJSON('data/locations.json');
const canonicalLocations = registry.canonical_locations;
const aliases = registry.aliases;

if (!Array.isArray(canonicalLocations) || canonicalLocations.length === 0) {
  addError('data/locations.json must contain a non-empty canonical_locations array.');
}

if (!aliases || typeof aliases !== 'object' || Array.isArray(aliases)) {
  addError('data/locations.json must contain an aliases object.');
}

const canonicalSet = new Set();
const canonicalByKey = new Map();

for (const location of Array.isArray(canonicalLocations) ? canonicalLocations : []) {
  if (typeof location !== 'string' || !locationKey(location)) {
    addError(`Invalid canonical location: ${JSON.stringify(location)}.`);
    continue;
  }
  if (canonicalSet.has(location)) {
    addError(`Duplicate canonical location: "${location}".`);
    continue;
  }

  canonicalSet.add(location);
  const key = locationKey(location);
  if (canonicalByKey.has(key)) {
    addError(`Canonical locations "${canonicalByKey.get(key)}" and "${location}" describe the same city and country.`);
  } else {
    canonicalByKey.set(key, location);
  }
}

for (const [alias, canonical] of Object.entries(aliases || {})) {
  if (!locationKey(alias)) {
    addError(`Invalid location alias: "${alias}".`);
  }
  if (!canonicalSet.has(canonical)) {
    addError(`Location alias "${alias}" points to unknown canonical location "${canonical}".`);
  }
  if (canonicalSet.has(alias)) {
    addError(`Location alias "${alias}" is also listed as canonical.`);
  }
}

for (const conference of data.conferences || []) {
  if (conference.series === 'Template') {
    continue;
  }

  for (const event of conference.yearly_data || []) {
    if (event.location === undefined) {
      continue;
    }

    const label = `${conference.series} ${event.year ?? '(missing year)'}`;
    if (aliases?.[event.location]) {
      addError(`${label}: use canonical location "${aliases[event.location]}" instead of alias "${event.location}".`);
      continue;
    }
    if (canonicalSet.has(event.location)) {
      continue;
    }

    const suggested = canonicalByKey.get(locationKey(event.location));
    if (suggested) {
      addError(`${label}: location "${event.location}" conflicts with canonical "${suggested}".`);
    } else {
      addError(`${label}: location "${event.location}" is not registered in data/locations.json.`);
    }
  }
}

if (errors.length > 0) {
  console.error('Location check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Location check passed: ${canonicalSet.size} canonical locations and ${Object.keys(aliases || {}).length} aliases.`);
