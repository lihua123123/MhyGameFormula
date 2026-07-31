import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import colors from './content/colors.json';

// 根据配色 JSON（单一数据源）生成元素颜色样式
// 例如 colors.json 中 "Electro": "#7950f2" -> `.Electro { color: #7950f2; }`
// renderer.js 仅被浏览器端 main.js 引入，模块加载时注入一次即可
if (typeof document !== 'undefined') {
  // 按游戏分组（colors.json 顶层键：genshin / sr / zzz），
  // 生成带游戏作用域的选择器，如 .genshin .Electro、.zzz .Assault，
  // 避免不同游戏补充同名颜色类时相互冲突。
  const colorStyle = document.createElement('style');
  colorStyle.id = 'element-colors';
  colorStyle.textContent = Object.entries(colors)
    .flatMap(([game, map]) =>
      Object.entries(map).map(([name, color]) => {
        const sel = `.${game} .${name}`;
        // 渐变值通过 background-clip: text 实现文字渐变色
        if (typeof color === 'string' && color.includes('linear-gradient')) {
          return `${sel} { background: ${color}; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }`;
        }
        return `${sel} { color: ${color}; }`;
      })
    )
    .join('\n');
  document.head.appendChild(colorStyle);
}

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
  // 用 .katex-inline 包裹，配合 CSS 让内联公式与普通文本在视觉上区分开
  text = text.replace(/(?<!\$)\$(?!\$)([^\n]+?)(?<!\$)\$(?!\$)/g, (_m, math) => {
    const key = placeholder();
    try {
      blocks.push({
        key,
        html: `<span class="katex-inline">${katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
          strict: false,
        })}</span>`,
      });
    } catch (e) {
      blocks.push({
        key,
        html: `<span class="katex-inline"><code class="katex-error">${escapeHtml(math)}</code></span>`,
      });
    }
    return key;
  });

  // Convert ==highlight== syntax to <mark> before marked runs
  text = text.replace(/==([^=]+?)==/g, '<mark>$1</mark>');

  // marked 在 CJK 文本中对 **...** 定界符的解析不可靠：同一段内多个加粗相邻时，
  // 闭合 ** 若紧贴中文字符会被判为非法定界符，导致把远处内容错误地包进 <strong>
  // （例如 **异常增伤**包含了 会变成 **异常增伤<strong>包含了…</strong>）。
  // 这里在 marked 之前把所有 **...** 统一转成 <strong>，跳过 marked 的定界符匹配，
  // 同时覆盖了原先仅针对 **X%**的 的变通逻辑。
  text = text.replace(/\*\*((?:(?!\*\*).)+?)\*\*/g, '<strong>$1</strong>');

  // Render markdown
  let html = marked.parse(text, {
    gfm: true,
    breaks: true,
    headerIds: true,
  });

  // Wrap tables in a scrollable container
  // so wide tables don't break the layout during zoom.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>');
  html = html.replace(/<\/table>/g, '</table></div>');

  // Restore math blocks
  let result = html;
  for (const { key, html: mathHtml } of blocks) {
    result = result.replace(key, mathHtml);
  }

  return result;
}
