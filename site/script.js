// ============================================
// SISOS — Section-Based Navigation Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');
  const heroBanner = document.getElementById('hero-banner');
  const statsBar = document.getElementById('stats-bar');
  const panels = document.querySelectorAll('.section-panel');
  const navLinks = document.querySelectorAll('.nav-link');

  // --- Section switching ---
  function showSection(sectionId) {
    // Hide all panels
    panels.forEach(panel => {
      panel.classList.remove('active', 'fade-in');
    });

    // Show target panel
    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
      // Trigger fade-in on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.classList.add('fade-in');
        });
      });
    }

    // Show/hide hero banner & stats bar (only on home)
    if (sectionId === 'home') {
      heroBanner.style.display = '';
      statsBar.style.display = '';
    } else {
      heroBanner.style.display = 'none';
      statsBar.style.display = 'none';
    }

    // Update active nav link
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + sectionId);

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Close mobile menu
    nav.classList.remove('active');
    menuBtn.classList.remove('open');

    // Re-trigger counter animation if coming to home
    if (sectionId === 'home') {
      countersAnimated = false;
      animateCounters();
    }
  }

  // --- Handle all clicks with data-section ---
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-section]');
    if (link) {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
    }
  });

  // --- Mobile Menu Toggle ---
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // --- Header scroll effect ---
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Animated counters ---
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else if (target >= 1000) {
          counter.textContent = Math.floor(current).toLocaleString('en-IN');
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // --- Appointment form handling ---
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Request Submitted!';
      btn.style.background = '#7B2240';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);

      console.log('Appointment request:', Object.fromEntries(formData));
    });
  }

  // --- Handle initial hash or default to home ---
  const initialHash = window.location.hash.replace('#', '') || 'home';
  const validSections = Array.from(panels).map(p => p.id);
  if (validSections.includes(initialHash)) {
    showSection(initialHash);
  } else {
    showSection('home');
  }

  // Start counter animation on load (home is default)
  animateCounters();

  // --- Handle browser back/forward ---
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (validSections.includes(hash)) {
      showSection(hash);
    }
  });

});
