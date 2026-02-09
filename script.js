// =====================
// CONFIGURAÇÕES GLOBAIS
// =====================
const body = document.body;
const toggle = document.getElementById('themeToggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =====================
// TEMA (SISTEMA + MANUAL)
// =====================
if (toggle) {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  const setTheme = dark => {
    body.classList.toggle('dark', dark);
    toggle.textContent = dark ? '☀️' : '🌙';
  };

  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(systemPrefersDark);
  }

  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';

    // feedback sutil
    toggle.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.85)' }, { transform: 'scale(1)' }],
      { duration: 220, easing: 'ease-out' }
    );
  });
}

// =====================
// REVEAL (INTERSECTION)
// =====================
const reveals = document.querySelectorAll('.reveal');

if (reveals.length && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
}

// =====================
// GLOW DINÂMICO (RAF)
// =====================
document.querySelectorAll('.card').forEach(card => {
  let rafId = null;

  const onMove = e => {
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      card.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(124,58,237,0.18),
          var(--bg-card) 65%
        )
      `;
    });
  };

  card.addEventListener('mousemove', onMove);

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--bg-card)';
  });
});

// =====================
// TIMELINE PROGRESSIVA
// =====================
const timeline = document.querySelector('.timeline');

if (timeline && !prefersReducedMotion) {
  let ticking = false;

  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const height = rect.height;
    const visible = Math.min(
      height,
      Math.max(0, window.innerHeight - rect.top)
    );

    const progress = Math.max(0, Math.min(1, visible / height));
    timeline.style.setProperty('--progress', `${progress * 100}%`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  });

  updateTimeline();
}