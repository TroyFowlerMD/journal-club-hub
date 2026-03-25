/* ============================================
   Journal Club Hub — TroyMD
   Theme toggle, sidebar nav, intersection observer
   ============================================ */

(function () {
  'use strict';

  // --- Theme Toggle ---
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const iconSun = document.getElementById('themeIconSun');
  const iconMoon = document.getElementById('themeIconMoon');

  function getStoredTheme() {
    return localStorage.getItem('jc-theme') || 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('jc-theme', theme);
    if (theme === 'dark') {
      iconSun.style.display = '';
      iconMoon.style.display = 'none';
      themeLabel.textContent = 'Light mode';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = '';
      themeLabel.textContent = 'Dark mode';
    }
  }

  // Initialize theme
  applyTheme(getStoredTheme());

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // --- Mobile Sidebar ---
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on nav click (mobile)
  var navLinks = document.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // --- Intersection Observer for Active Nav ---
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-item a[data-section]');

  function setActiveNav(sectionId) {
    navItems.forEach(function (item) {
      if (item.getAttribute('data-section') === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Map section ids
  var sectionMap = {
    'home': 'home',
    'library': 'library',
    'ideas': 'ideas',
    'about': 'about'
  };

  var observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        if (sectionMap[id]) {
          setActiveNav(sectionMap[id]);
        }
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // --- Smooth scroll for nav links (fallback for browsers without scroll-behavior) ---
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL hash without jump
          history.pushState(null, null, href);
        }
      }
    });
  });

})();
