/**
 * Post-build script: inline KaTeX font files as base64 data URIs in style.css,
 * then delete the font files so no separate downloads are needed.
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

for (const match of matches) {
  const fontPath = match[1].replace(/['"]/g, '');
  const fontName = fontPath.split('/').pop() || fontPath;
  if (inlined.has(fontName)) continue;

  const fontFile = join(distDir, fontName);
  try {
    const fontData = readFileSync(fontFile);
    const ext = extname(fontName).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const base64 = fontData.toString('base64');
    const dataUri = `data:${mime};base64,${base64}`;

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
}

// 3. Write the updated CSS
writeFileSync(join(distDir, 'style.css'), css, 'utf-8');
console.log(`\nDone. Inlined ${inlined.size} font files into style.css`);
console.log(`Remaining files in dist/: ${readdirSync(distDir).join(', ')}`);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
