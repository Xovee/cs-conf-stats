const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://csconfstats.xoveexu.com';

function slugifySeries(series) {
  return String(series)
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/\+/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildSlugMap(conferences) {
  const usedSlugs = new Set();
  const slugs = new Map();

  for (const conference of conferences) {
    const baseSlug = slugifySeries(conference.series) || 'conference';
    let slug = baseSlug;
    let suffix = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(slug);
    slugs.set(conference.series, slug);
  }

  return slugs;
}

function readConferences(rootDir) {
  const dataPath = path.join(rootDir, 'data', 'conf.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return data.conferences.filter(conference => conference.series !== 'Template');
}

module.exports = {
  SITE_URL,
  buildSlugMap,
  readConferences,
  slugifySeries,
};
