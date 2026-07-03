/* theme.js — Saint Laurent Gaseke TSS
   Handles light / dark / light-brown theme switching
   Persists choice in localStorage across all pages
*/

(function () {
  var STORAGE_KEY = 'slg-theme';
  var icons = { light: '☀️', dark: '🌙', brown: '🍂' };

  // Apply saved theme immediately (before paint)
  var saved = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(saved, false);

  function applyTheme(theme, save) {
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (save) localStorage.setItem(STORAGE_KEY, theme);
    // Update button icon if already rendered
    var btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = icons[theme] || '☀️';
    // Update active state on options
    document.querySelectorAll('.theme-opt').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-theme-val') === theme);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Inject the switcher widget into body
    var sw = document.createElement('div');
    sw.className = 'theme-switcher';
    sw.innerHTML = [
      '<div class="theme-switcher-panel" id="themePanelInner">',
      '  <div class="theme-switcher-label">Choose Theme</div>',
      '  <button class="theme-opt to-light" data-theme-val="light">',
      '    <span class="to-dot"></span> Light Mode',
      '  </button>',
      '  <button class="theme-opt to-dark" data-theme-val="dark">',
      '    <span class="to-dot"></span> Dark Mode',
      '  </button>',
      '  <button class="theme-opt to-brown" data-theme-val="brown">',
      '    <span class="to-dot"></span> Warm Brown',
      '  </button>',
      '</div>',
      '<button class="theme-toggle-btn" id="themeToggleBtn" title="Switch Theme">☀️</button>',
    ].join('');
    document.body.appendChild(sw);

    var panel = document.getElementById('themePanelInner');
    var toggleBtn = document.getElementById('themeToggleBtn');
    var current = localStorage.getItem(STORAGE_KEY) || 'light';

    // Set initial icon
    toggleBtn.textContent = icons[current] || '☀️';

    // Mark active option
    document.querySelectorAll('.theme-opt').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-theme-val') === current);
    });

    // Open / close panel
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    // Select theme
    document.querySelectorAll('.theme-opt').forEach(function (el) {
      el.addEventListener('click', function () {
        var chosen = this.getAttribute('data-theme-val');
        applyTheme(chosen, true);
        panel.classList.remove('open');
      });
    });

    // Close panel on outside click
    document.addEventListener('click', function (e) {
      if (!sw.contains(e.target)) panel.classList.remove('open');
    });
  });
})();
