const fs = require('fs');
const path = require('path');
const { SITE_URL, buildSlugMap, readConferences } = require('./seo-utils');

const rootDir = path.resolve(__dirname, '..');
const conferences = readConferences(rootDir);
const slugBySeries = buildSlugMap(conferences);
const errors = [];

function addError(message) {
  errors.push(message);
}

function readText(relativePath) {
  const filePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(filePath)) {
    addError(`${relativePath} is missing.`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

function expectedPagePaths() {
  const pages = [
    {
      path: 'conferences/index.html',
      canonical: `${SITE_URL}/conferences/`,
    },
  ];

  for (const conference of conferences) {
    const slug = slugBySeries.get(conference.series);
    pages.push({
      path: path.join('conferences', slug, 'index.html'),
      canonical: `${SITE_URL}/conferences/${slug}/`,
    });

    for (const event of conference.yearly_data) {
      pages.push({
        path: path.join('conferences', slug, String(event.year), 'index.html'),
        canonical: `${SITE_URL}/conferences/${slug}/${event.year}/`,
      });
    }
  }

  return pages;
}

function checkPage(page, seenTitles) {
  const html = readText(page.path);
  if (!html) {
    return;
  }

  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch || titleMatch[1].trim() === '') {
    addError(`${page.path}: missing title.`);
  } else if (seenTitles.has(titleMatch[1])) {
    addError(`${page.path}: duplicate title "${titleMatch[1]}".`);
  } else {
    seenTitles.add(titleMatch[1]);
  }

  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) {
    addError(`${page.path}: missing or weak meta description.`);
  }

  if (!html.includes(`<link rel="canonical" href="${page.canonical}">`)) {
    addError(`${page.path}: canonical does not match ${page.canonical}.`);
  }

  if (!/<h1\b[^>]*>/.test(html)) {
    addError(`${page.path}: missing h1.`);
  }

  if (!/<script type="application\/ld\+json">/.test(html)) {
    addError(`${page.path}: missing JSON-LD structured data.`);
  }
}

function checkSitemap(pages) {
  const sitemap = readText('sitemap.xml');
  const robots = readText('robots.txt');

  if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    addError('sitemap.xml must be an XML sitemap.');
  }

  const expectedUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/fun-fact.html`,
    `${SITE_URL}/catalog.html`,
    ...pages.map(page => page.canonical),
  ];
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  const uniqueSitemapUrls = new Set(sitemapUrls);

  if (sitemapUrls.length !== uniqueSitemapUrls.size) {
    addError('sitemap.xml contains duplicate URLs.');
  }

  for (const url of expectedUrls) {
    if (!uniqueSitemapUrls.has(url)) {
      addError(`sitemap.xml is missing ${url}.`);
    }
  }

  if (sitemap.includes('?conf=')) {
    addError('sitemap.xml should use static SEO URLs, not ?conf= query URLs.');
  }

  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    addError('robots.txt must point to sitemap.xml.');
  }
}

function checkGeneratedDirectory() {
  if (!fs.existsSync(path.join(rootDir, 'conferences', '.generated-by-cs-conf-stats'))) {
    addError('conferences/.generated-by-cs-conf-stats is missing.');
  }
}

const pages = expectedPagePaths();
const seenTitles = new Set();

checkGeneratedDirectory();
for (const page of pages) {
  checkPage(page, seenTitles);
}
checkSitemap(pages);

if (errors.length > 0) {
  console.error('SEO check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`SEO check passed: ${pages.length} generated pages and sitemap URLs verified.`);
