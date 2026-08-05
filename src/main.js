import './style.css';
import { renderMarkdown } from './renderer.js';
import genshinContent from './content/genshin.md?raw';
import srContent from './content/sr.md?raw';
import zzzContent from './content/zzz.md?raw';

/**
 * 游戏配置单一数据源。
 * 新增游戏：加一行 import + 一个配置项即可，导航 tab、视图容器、hash 校验、
 * 懒渲染、键盘切换全部自动生效，无需再改 index.html。
 */
const games = [
  { id: 'genshin', title: '原神', heading: '原神 · 伤害计算公式', content: genshinContent },
  { id: 'sr', title: '星穹铁道', heading: '崩坏：星穹铁道 · 伤害计算公式', content: srContent },
  { id: 'zzz', title: '绝区零', heading: '绝区零 · 伤害计算公式', content: zzzContent },
];
const gameIds = games.map(g => g.id);
const isValidGame = (id) => gameIds.includes(id);

// --- 由配置生成导航 tab 与视图容器 ---
const navList = document.querySelector('.nav-links');
const viewsHost = document.getElementById('views');
const tabs = {};
const views = {};

games.forEach(({ id, title, heading }) => {
  const tab = document.createElement('a');
  tab.href = '#';
  tab.dataset.game = id;
  tab.id = `tab-${id}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', `view-${id}`);
  tab.textContent = title;
  navList.appendChild(tab);
  tabs[id] = tab;

  const view = document.createElement('section');
  view.className = 'game-view';
  view.id = `view-${id}`;
  view.setAttribute('role', 'tabpanel');
  view.setAttribute('aria-labelledby', `tab-${id}`);
  view.style.display = 'none';
  view.innerHTML = `
    <header class="page-header">
      <h1>${heading}</h1>
    </header>
    <div class="markdown-body ${id}" id="content-${id}"></div>`;
  viewsHost.appendChild(view);
  views[id] = view;
});

const navLinks = Object.values(tabs);

// Lazy render: only run markdown + KaTeX rendering the first time a game's
// tab is shown, so startup doesn't pay the render cost for all games.
const rendered = new Set();
function renderGame(game) {
  if (rendered.has(game)) return;
  const el = document.getElementById(`content-${game}`);
  if (el) {
    el.innerHTML = renderMarkdown(games.find(g => g.id === game).content);
    rendered.add(game);
  }
}

function switchGame(game) {
  if (!isValidGame(game)) return;
  renderGame(game);
  navLinks.forEach(link => {
    const active = link.dataset.game === game;
    link.classList.toggle('active', active);
    link.setAttribute('aria-selected', String(active));
    link.tabIndex = active ? 0 : -1; // roving tabindex
  });
  Object.keys(views).forEach(key => {
    views[key].style.display = key === game ? '' : 'none';
  });
  document.title = `${games.find(g => g.id === game).title} · 伤害计算公式`;
  if (window.location.hash !== `#${game}`) {
    window.location.hash = game;
  }
}

// Keyboard: Left/Right arrows cycle through the tabs
navList.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  e.preventDefault();
  const current = navLinks.findIndex(l => l.classList.contains('active'));
  const next = (Math.max(current, 0) + (e.key === 'ArrowRight' ? 1 : -1) + navLinks.length) % navLinks.length;
  switchGame(navLinks[next].dataset.game);
  navLinks[next].focus();
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchGame(link.dataset.game);
  });
});

// Restore last viewed game from URL hash
const initialGame = window.location.hash.replace('#', '') || 'genshin';
switchGame(isValidGame(initialGame) ? initialGame : 'genshin');

// Browser back/forward support.
// 注意：页内锚点（如 #加权规则，marked 会做 URL 编码）也会触发 hashchange，
// 这里只在 hash 是合法游戏 id 时才切换，避免劫持锚点滚动。
window.addEventListener('hashchange', () => {
  const g = window.location.hash.replace('#', '');
  if (isValidGame(g)) switchGame(g);
});
