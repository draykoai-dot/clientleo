// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .fleet-card, .pillar, .stat, .about-card-front, .about-card-back, .section-header'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- BOOKING FORM ----
const form = document.getElementById('bookingForm');
const successMsg = document.getElementById('formSuccess');
const dateInput = document.getElementById('date');

// Set min date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.reportValidity();
    });
    return;
  }

  const btn = form.querySelector('.btn-primary');
  const btnText = btn.querySelector('.btn-text');

  btn.disabled = true;
  btnText.textContent = 'Sending…';

  // Simulate async submission
  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(f => (f.value = ''));
    btn.disabled = false;
    btnText.textContent = 'Request Booking';
    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => successMsg.classList.remove('visible'), 8000);
  }, 1400);
});

// ---- SMOOTH ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
