/* ═══════════════════════════════════════════════════
   PORTFOLIO — Alex Chen | main.js
   ═══════════════════════════════════════════════════ */

'use strict';

// ── CUSTOM CURSOR ────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left    = cx + 'px';
    cursor.style.top     = cy + 'px';
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}

// ── NAVBAR SCROLL ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── SMOOTH SCROLL NAV LINKS ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── ACTIVE NAV HIGHLIGHT ─────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObs.observe(s));

// ── FADE-UP ANIMATIONS ───────────────────────────
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

// ── SKILL BARS ───────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => bar.classList.add('animated'));
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach(el => barObs.observe(el));

// ── HAMBURGER / MOBILE MENU ──────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close on outside click
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ── DARK / LIGHT THEME TOGGLE ────────────────────
const themeBtn = document.getElementById('themeToggle');
const root     = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// ── ACCENT COLOR PICKER ──────────────────────────
const accentDots   = document.querySelectorAll('.accent-dot');
const savedAccent  = localStorage.getItem('portfolio-accent') || 'cyan';
root.setAttribute('data-accent', savedAccent);

accentDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const accent = dot.dataset.accent;
    root.setAttribute('data-accent', accent);
    localStorage.setItem('portfolio-accent', accent);
  });
});

// ── PROJECT FILTER ───────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        // Re-trigger animation
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── CONTACT FORM VALIDATION ──────────────────────
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

const rules = {
  name:    { min: 2,   msg: 'Name must be at least 2 characters.' },
  email:   { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Please enter a valid email address.' },
  subject: { min: 3,   msg: 'Subject must be at least 3 characters.' },
  message: { min: 20,  msg: 'Message must be at least 20 characters.' },
};

function validate(field) {
  const input = document.getElementById(field);
  const error = document.getElementById(field + 'Error');
  const val   = input.value.trim();
  const rule  = rules[field];
  let errMsg  = '';

  if (!val) {
    errMsg = 'This field is required.';
  } else if (rule.min && val.length < rule.min) {
    errMsg = rule.msg;
  } else if (rule.regex && !rule.regex.test(val)) {
    errMsg = rule.msg;
  }

  error.textContent = errMsg;
  input.classList.toggle('invalid', !!errMsg);
  return !errMsg;
}

// Live validation on blur
Object.keys(rules).forEach(field => {
  const input = document.getElementById(field);
  input.addEventListener('blur', () => validate(field));
  input.addEventListener('input', () => {
    if (input.classList.contains('invalid')) validate(field);
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const valid = Object.keys(rules).map(validate).every(Boolean);
  if (!valid) return;

  const btnText   = form.querySelector('.btn-text');
  const btnLoader = form.querySelector('.btn-loader');
  const submitBtn = form.querySelector('.submit-btn');

  btnText.hidden   = true;
  btnLoader.hidden = false;
  submitBtn.disabled = true;

  // Simulate submission (replace with real fetch to backend)
  await new Promise(r => setTimeout(r, 1500));

  form.reset();
  Object.keys(rules).forEach(f => {
    document.getElementById(f).classList.remove('invalid');
    document.getElementById(f + 'Error').textContent = '';
  });

  btnText.hidden   = false;
  btnLoader.hidden = true;
  submitBtn.disabled = false;
  success.hidden = false;

  setTimeout(() => { success.hidden = true; }, 5000);
});

// ── COUNTER ANIMATION (STATS) ────────────────────
function animateCounter(el, target, suffix) {
  let start = 0;
  const dur  = 1500;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const text   = el.textContent;
        const num    = parseInt(text);
        const suffix = text.replace(num, '');
        animateCounter(el, num, suffix);
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObs.observe(el));

// ── TYPING EFFECT (HERO ROLE) ────────────────────
const roleEl    = document.querySelector('.hero-role');
const roles     = ['AIML Engineer', 'DevOps Engineer', 'ML Systems Builder', 'Open Source Contributor'];
let   roleIdx   = 0, charIdx = 0, deleting = false;

function typeRole() {
  const current = roles[roleIdx];
  const prefix  = '<span class="role-prefix">—</span> ';

  if (!deleting) {
    charIdx++;
    roleEl.innerHTML = prefix + current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    charIdx--;
    roleEl.innerHTML = prefix + current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 40 : 80);
}

setTimeout(typeRole, 1800);

// ── PARALLAX ORBS ────────────────────────────────
const orb1 = document.querySelector('.orb1');
const orb2 = document.querySelector('.orb2');

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
}, { passive: true });
