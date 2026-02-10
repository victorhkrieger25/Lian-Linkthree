// =====================
// CONFIG GLOBAL
// =====================
const body = document.body;
const toggle = document.getElementById('themeToggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =====================
// TEMA (SISTEMA + MANUAL)
// =====================
if (toggle) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');

  const applyTheme = dark => {
    body.classList.toggle('dark', dark);
    toggle.textContent = dark ? '☀️' : '🌙';
  };

  applyTheme(saved ? saved === 'dark' : systemDark);

  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';

    toggle.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(.85)' }, { transform: 'scale(1)' }],
      { duration: 220 }
    );
  });
}

// =====================
// REVEAL DIRECIONAL
// =====================
const reveals = document.querySelectorAll('.reveal');

if (!prefersReducedMotion) {
  reveals.forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'from-left' : 'from-right');
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach(el => observer.observe(el));
}

// =====================
// PARALLAX SUAVE NO HERO
// =====================
const hero = document.querySelector('.hero');

if (hero && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.15}px)`;
  });
}

// =====================
// GLOW REAGE AO SCROLL
// =====================
document.querySelectorAll('.card').forEach(card => {
  window.addEventListener('scroll', () => {
    const rect = card.getBoundingClientRect();
    const visible = Math.max(0, 1 - Math.abs(rect.top) / window.innerHeight);

    card.style.boxShadow = `
      0 20px 40px rgba(0,0,0,.35),
      0 0 ${30 + visible * 40}px rgba(124,58,237,.45)
    `;
  });
});

// =====================
// TIMELINE PROGRESSIVA
// =====================
const timeline = document.querySelector('.timeline');

if (timeline && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
    timeline.style.setProperty('--progress', `${progress * 100}%`);
  });
}