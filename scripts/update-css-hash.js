/**
 * scripts/update-css-hash.js
 *
 * Runs automatically after `next build` (via "postbuild" in package.json).
 * Finds the new hashed CSS filename in .next/static/css/ and updates the
 * two <link> hrefs in app/layout.tsx so the deferred stylesheet never 404s.
 *
 * Usage: add to package.json:
 *   "scripts": {
 *     "postbuild": "node scripts/update-css-hash.js"
 *   }
 */

const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(process.cwd(), '.next', 'static', 'css');
const LAYOUT_PATH = path.join(process.cwd(), 'app', 'layout.tsx');

// ── 1. Find the new CSS file ──────────────────────────────────────────────────
if (!fs.existsSync(CSS_DIR)) {
  console.error('[update-css-hash] ERROR: .next/static/css not found. Did `next build` succeed?');
  process.exit(1);
}

const cssFiles = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'));

if (cssFiles.length === 0) {
  console.error('[update-css-hash] ERROR: No CSS files found in .next/static/css/');
  process.exit(1);
}

if (cssFiles.length > 1) {
  // Multiple chunks — pick the largest one (main app stylesheet)
  cssFiles.sort((a, b) => {
    const sizeA = fs.statSync(path.join(CSS_DIR, a)).size;
    const sizeB = fs.statSync(path.join(CSS_DIR, b)).size;
    return sizeB - sizeA;
  });
  console.log(`[update-css-hash] Multiple CSS files found, using largest: ${cssFiles[0]}`);
}

const newCssFile = cssFiles[0];
const newHref = `/_next/static/css/${newCssFile}`;

// ── 2. Read layout.tsx ────────────────────────────────────────────────────────
if (!fs.existsSync(LAYOUT_PATH)) {
  console.error(`[update-css-hash] ERROR: layout.tsx not found at ${LAYOUT_PATH}`);
  process.exit(1);
}

let layout = fs.readFileSync(LAYOUT_PATH, 'utf8');

// ── 3. Find the current href ──────────────────────────────────────────────────
const hrefRegex = /\/_next\/static\/css\/[a-f0-9]+\.css/g;
const matches = layout.match(hrefRegex);

if (!matches || matches.length === 0) {
  console.error('[update-css-hash] ERROR: No CSS href found in layout.tsx. Check the <link> tags.');
  process.exit(1);
}

const currentHref = matches[0];

if (currentHref === newHref) {
  console.log(`[update-css-hash] CSS hash unchanged (${newCssFile}). No update needed.`);
  process.exit(0);
}

// ── 4. Replace all occurrences (there are two — the link and the noscript fallback) ──
const updatedLayout = layout.replaceAll(currentHref, newHref);
const replacementCount = (layout.match(hrefRegex) || []).length;

// ── 5. Write back ─────────────────────────────────────────────────────────────
fs.writeFileSync(LAYOUT_PATH, updatedLayout, 'utf8');

console.log(`[update-css-hash] ✓ Updated ${replacementCount} href(s) in layout.tsx`);
console.log(`[update-css-hash]   ${currentHref}`);
console.log(`[update-css-hash] → ${newHref}`);
