// ============================================
// SISOS — Shraddha Institute Website Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuBtn.classList.remove('open');
    });
  });

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

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

  // Trigger counters when stats section is visible
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // --- Appointment form handling ---
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const speciality = formData.get('speciality');
      const doctor = formData.get('doctor');
      const date = formData.get('date');
      const message = formData.get('message');

      // Build WhatsApp message
      let waMsg = `Hi, I'd like to book an appointment at Shraddha Institute.\n\n`;
      waMsg += `Name: ${name}\n`;
      waMsg += `Phone: ${phone}\n`;
      if (speciality) waMsg += `Speciality: ${speciality}\n`;
      if (doctor) waMsg += `Preferred Doctor: ${doctor}\n`;
      if (date) waMsg += `Preferred Date: ${date}\n`;
      if (message) waMsg += `Condition: ${message}\n`;

      // Show success message
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

      // In production, this would submit to a backend or redirect to WhatsApp
      console.log('Appointment request:', Object.fromEntries(formData));
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
