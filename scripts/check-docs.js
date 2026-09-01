const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const requiredDocs = [
  'AGENTS.md',
  'README.md',
  'docs/data-collection-policy.md',
  'Need-Check.md',
  'If-You-Know.md',
];
const requiredReferences = {
  'AGENTS.md': [
    'docs/data-collection-policy.md',
    'Need-Check.md',
    'If-You-Know.md',
    'data/conf.json',
    'data/locations.json',
  ],
  'README.md': [
    'docs/data-collection-policy.md',
    'Need-Check.md',
    'If-You-Know.md',
  ],
  'Need-Check.md': ['docs/data-collection-policy.md'],
  'If-You-Know.md': ['docs/data-collection-policy.md', 'Need-Check.md'],
};
const errors = [];

function addError(message) {
  errors.push(message);
}

function decodeTarget(target) {
  try {
    return decodeURIComponent(target);
  } catch {
    return target;
  }
}

for (const relativePath of requiredDocs) {
  const filePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(filePath)) {
    addError(`${relativePath} is missing.`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const links = [...content.matchAll(/!?(?:\[[^\]]*\])\(([^)]+)\)/g)];

  for (const requiredReference of requiredReferences[relativePath] || []) {
    if (!content.includes(requiredReference)) {
      addError(`${relativePath}: missing required reference to ${requiredReference}.`);
    }
  }

  for (const match of links) {
    let target = match[1].trim();
    if (target.startsWith('<') && target.endsWith('>')) {
      target = target.slice(1, -1);
    }
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) {
      continue;
    }

    target = decodeTarget(target.split('#')[0].split('?')[0]);
    if (!target) {
      continue;
    }

    const resolvedPath = path.resolve(path.dirname(filePath), target);
    if (!fs.existsSync(resolvedPath)) {
      addError(`${relativePath}: local link "${match[1]}" does not exist.`);
    }
  }
}

if (errors.length > 0) {
  console.error('Documentation check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Documentation check passed: ${requiredDocs.length} policy and project files verified.`);
