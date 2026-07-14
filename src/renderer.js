import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/** Escape HTML special chars */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render markdown with LaTeX support.
 * Strategy: extract block/inline math first, run marked, then restore rendered math.
 */
export function renderMarkdown(text) {
  // Strip BOM (U+FEFF) if present
  text = text.replace(/^\uFEFF/, '');

  const blocks = [];
  let idx = 0;

  function placeholder() {
    return `\x00MATH_${idx++}\x00`;
  }

  // Extract block math: $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, math) => {
    const key = placeholder();
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
      // Wrap in a scrollable container so wide formulas can scroll
      // horizontally WITHOUT clipping tall constructs (fractions, matrices).
      blocks.push({ key, html: `<div class="katex-wrap">${rendered}</div>` });
    } catch (e) {
      blocks.push({ key, html: `<pre class="katex-error">${escapeHtml(math)}</pre>` });
    }
    return key;
  });

  // Extract inline math: $...$ (but not $$...$$)
  text = text.replace(/(?<!\$)\$(?!\$)([^\n]+?)(?<!\$)\$(?!\$)/g, (_m, math) => {
    const key = placeholder();
    try {
      blocks.push({
        key,
        html: katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
          strict: false,
        }),
      });
    } catch (e) {
      blocks.push({ key, html: `<code class="katex-error">${escapeHtml(math)}</code>` });
    }
    return key;
  });

  // Convert ==highlight== syntax to <mark> before marked runs
  text = text.replace(/==([^=]+?)==/g, '<mark>$1</mark>');

  // Custom renderer — wrap tables in a scrollable container
  // so wide tables don't break the layout during zoom.
  const renderer = new marked.Renderer();
  renderer.table = (tableToken) => {
    return `<div class="table-wrap">${tableToken}</div>\n`;
  };

  // Render markdown
  const html = marked.parse(text, {
    gfm: true,
    breaks: true,
    headerIds: true,
    renderer,
  });

  // Restore math blocks
  let result = html;
  for (const { key, html: mathHtml } of blocks) {
    result = result.replace(key, mathHtml);
  }

  return result;
}
