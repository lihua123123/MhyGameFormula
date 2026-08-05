/**
 * Post-build script: slim down KaTeX fonts in style.css.
 * Only woff2 (the only format modern browsers need) is inlined as a base64
 * data URI; redundant woff/ttf entries are stripped from each @font-face
 * src list and their files deleted, so no separate downloads or 404s occur.
 */
import { readFileSync, writeFileSync, unlinkSync, readdirSync } from 'fs';
import { join, extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

const MIME_TYPES = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/truetype',
};

// 1. Read the CSS file
let css;
try {
  css = readFileSync(join(distDir, 'style.css'), 'utf-8');
} catch {
  console.error('style.css not found. Build may have failed.');
  process.exit(1);
}

// 2. Find all @font-face url() references to local font files
const fontRegex = /url\(([^)]+?\.(woff2|woff|ttf))\)/gi;
const matches = [...css.matchAll(fontRegex)];
const inlined = new Set();
const stripped = new Set();

for (const match of matches) {
  const fontPath = match[1].replace(/['"]/g, '');
  const fontName = fontPath.split('/').pop() || fontPath;
  if (inlined.has(fontName) || stripped.has(fontName)) continue;

  const fontFile = join(distDir, fontName);
  const ext = extname(fontName).toLowerCase();

  if (ext === '.woff2') {
    // Modern browsers only need woff2 — inline it as a data URI.
    try {
      const fontData = readFileSync(fontFile);
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      const dataUri = `data:${mime};base64,${fontData.toString('base64')}`;
      css = css.replace(
        new RegExp(`url\\(['"]?${escapeRegex(fontPath)}['"]?\\)`, 'gi'),
        `url('${dataUri}')`,
      );
      // Delete the font file
      try { unlinkSync(fontFile); } catch { /* ignore */ }
      inlined.add(fontName);
      console.log(`  ✓ Inlined ${fontName}`);
    } catch (err) {
      console.warn(`  ⚠ Could not process ${fontName}: ${err.message}`);
    }
  } else {
    // woff/ttf are redundant for modern browsers: strip the whole
    // ", url(...) format('...')" entry from the @font-face src list so the
    // browser won't try to download a file we're about to delete.
    css = css.replace(
      new RegExp(`(?:,\\s*)?url\\(['"]?${escapeRegex(fontPath)}['"]?\\)\\s*format\\(['"][^'"]+['"]\\)\\s*,?`, 'gi'),
      '',
    );
    try { unlinkSync(fontFile); } catch { /* ignore */ }
    stripped.add(fontName);
    console.log(`  ✂ Stripped ${fontName}`);
  }
}

// 3. Write the updated CSS
writeFileSync(join(distDir, 'style.css'), css, 'utf-8');
console.log(`\nDone. Inlined ${inlined.size} woff2 fonts, stripped ${stripped.size} woff/ttf references.`);
console.log(`Remaining files in dist/: ${readdirSync(distDir).join(', ')}`);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
