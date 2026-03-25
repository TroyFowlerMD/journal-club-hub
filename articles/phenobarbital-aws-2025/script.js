/* ============================================================
   Phenobarbital for AWS — Journal Club Dashboard · Interactive Behavior
   ============================================================ */

(function () {
  'use strict';

  /* --- Force Dark Theme as Default --- */
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  let currentTheme = 'dark';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    const sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    const moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeBtn.innerHTML = (currentTheme === 'dark' ? sunSVG : moonSVG) + '<span>' + (currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode') + '</span>';
    themeBtn.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
  }

  /* --- Expand / Collapse Section Cards --- */
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.section-card');
      const body = card.querySelector('.section-body');
      if (card.classList.contains('collapsed')) {
        // Expand
        card.classList.remove('collapsed');
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
        setTimeout(() => { body.style.maxHeight = 'none'; }, 400);
      } else {
        // Collapse
        body.style.maxHeight = body.scrollHeight + 'px';
        body.offsetHeight; // force reflow
        requestAnimationFrame(() => {
          card.classList.add('collapsed');
          body.style.maxHeight = '0';
          body.style.opacity = '0';
        });
      }
    });

    // Keyboard accessibility
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Initialize all sections as expanded
  document.querySelectorAll('.section-card:not(.collapsed) .section-body').forEach(body => {
    body.style.maxHeight = 'none';
    body.style.opacity = '1';
  });

  /* --- Scroll Spy (Intersection Observer) --- */
  const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  const sections = [];

  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  let activeId = null;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s.el));

  function setActiveNav(id) {
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector('.sidebar-nav a[href="#' + id + '"]');
    if (active) active.classList.add('active');
  }

  /* --- Smooth Scroll for Nav Links --- */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        // If section is collapsed, expand it first
        const card = target.closest('.section-card');
        if (card && card.classList.contains('collapsed')) {
          card.querySelector('.section-header').click();
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu
        closeMobileMenu();
      }
    });
  });

  /* --- Mobile Hamburger Menu --- */
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }

  function closeMobileMenu() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  /* --- Key Results Sub-Tabs --- */
  const tabContainers = document.querySelectorAll('.subsection-tabs');
  tabContainers.forEach(tabContainer => {
    tabContainer.addEventListener('click', e => {
      const tab = e.target.closest('.subsection-tab');
      if (!tab) return;

      const target = tab.dataset.tab;
      if (!target) return;

      // Deactivate all tabs and panels within the same section
      const sectionBody = tabContainer.closest('.section-body');
      tabContainer.querySelectorAll('.subsection-tab').forEach(t => t.classList.remove('active'));
      sectionBody.querySelectorAll('.subsection-panel').forEach(p => p.classList.remove('active'));

      // Activate clicked tab and corresponding panel
      tab.classList.add('active');
      const panel = sectionBody.querySelector('#panel-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* --- Animate potency bars on scroll into view --- */
  const potencyBars = document.querySelectorAll('.potency-bar-fill');
  if (potencyBars.length) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width;
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    potencyBars.forEach(bar => {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0%';
      barObserver.observe(bar);
    });
  }

})();
