/** Theme switcher with localStorage persistence */

const STORAGE_KEY = 'damage-formulas-theme';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  // Follow system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getInitialTheme());

  // Listen for system changes when no explicit choice is stored
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function createThemeToggle(container) {
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.title = 'Toggle dark / light mode';

  const sun = document.createElement('span');
  sun.className = 'icon-sun';
  sun.textContent = '☀';

  const moon = document.createElement('span');
  moon.className = 'icon-moon';
  moon.textContent = '☾';

  btn.appendChild(sun);
  btn.appendChild(moon);

  btn.addEventListener('click', () => {
    toggleTheme();
  });

  if (container) {
    container.appendChild(btn);
  }
  return btn;
}
