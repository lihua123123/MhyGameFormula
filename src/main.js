import './style.css';
import { initTheme, createThemeToggle } from './theme.js';
import { renderMarkdown } from './renderer.js';
import genshinContent from './content/genshin.md?raw';
import zzzContent from './content/zzz.md?raw';

initTheme();
createThemeToggle(document.getElementById('theme-toggle-root'));

// Render content for both games
document.getElementById('content-genshin').innerHTML = renderMarkdown(genshinContent);
document.getElementById('content-zzz').innerHTML = renderMarkdown(zzzContent);

// Tab switching
const navLinks = document.querySelectorAll('.nav-links a[data-game]');
const views = {
  genshin: document.getElementById('view-genshin'),
  zzz: document.getElementById('view-zzz'),
};

function switchGame(game) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.game === game);
  });
  Object.keys(views).forEach(key => {
    views[key].style.display = key === game ? '' : 'none';
  });
  window.location.hash = game;
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchGame(link.dataset.game);
  });
});

// Restore last viewed game from URL hash
const initialGame = window.location.hash.replace('#', '') || 'genshin';
if (initialGame === 'genshin' || initialGame === 'zzz') {
  switchGame(initialGame);
} else {
  switchGame('genshin');
}
