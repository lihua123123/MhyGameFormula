/**
 * Build a single-file HTML version:
 * 1. Run the regular vite build (which inlines fonts via inline-fonts.mjs)
 * 2. Inline style.css and script.js into index.html
 * 3. Output as dist-single/index.html
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const distDir = join(rootDir, 'dist');
const singleDir = join(rootDir, 'dist-single');

console.log('=== Step 1: Running regular build ===\n');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

console.log('\n=== Step 2: Inlining into single HTML file ===\n');

// Read the three files
const html = readFileSync(join(distDir, 'index.html'), 'utf-8');
const css = readFileSync(join(distDir, 'style.css'), 'utf-8');
const js = readFileSync(join(distDir, 'script.js'), 'utf-8');

// Inline CSS in <head>
let singleHtml = html.replace(
  /<link rel="stylesheet" crossorigin href="\.?\/?style\.css">/,
  () => `<style>\n${css}\n</style>`,
);

// Inline JS (keep type="module" so it's deferred)
singleHtml = singleHtml.replace(
  /<script type="module" crossorigin src="\.?\/?script\.js"><\/script>/,
  () => `<script type="module">\n${js}\n</script>`,
);

// Ensure dist-single directory exists and write
mkdirSync(singleDir, { recursive: true });
writeFileSync(join(singleDir, 'index.html'), singleHtml, 'utf-8');

console.log(`✅ Single file build complete: ${join(singleDir, 'index.html')}`);
console.log(`   Size: ${(singleHtml.length / 1024).toFixed(1)} KB`);

