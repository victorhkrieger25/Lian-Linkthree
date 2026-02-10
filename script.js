// =====================
// GLOW DINÂMICO (ROXO / VERDE)
// =====================
const getGlowColor = () => {
  return document.body.classList.contains('lab-mode')
    ? 'rgba(34,197,94,0.75)'   // VERDE LAB 🧪
    : 'rgba(124,58,237,0.45)'; // ROXO PADRÃO
};

// =====================
// CONFIG GLOBAL
// =====================
const body = document.body;
const toggle = document.getElementById('themeToggle');
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =====================
// TEMA (SISTEMA + MANUAL)
// =====================
if (toggle) {
  const systemDark =
    window.matchMedia('(prefers-color-scheme: dark)').matches;
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
      [
        { transform: 'scale(1)' },
        { transform: 'scale(.85)' },
        { transform: 'scale(1)' }
      ],
      { duration: 220 }
    );
  });
}

// =====================
// REVEAL DIRECIONAL (SCROLL)
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
    hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  });
}

// =====================
// GLOW REAGE AO SCROLL
// =====================
if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const visible =
        Math.max(0, 1 - Math.abs(rect.top) / window.innerHeight);

      card.style.boxShadow = `
        0 20px 40px rgba(0,0,0,.35),
        0 0 ${30 + visible * 40}px ${getGlowColor()}
      `;
    });
  });
}

// =====================
// TIMELINE PROGRESSIVA
// =====================
const timeline = document.querySelector('.timeline');

if (timeline && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(0, 1 - rect.top / window.innerHeight)
    );
    timeline.style.setProperty('--progress', `${progress * 100}%`);
  });
}

// =====================
// EASTER EGG — LAB MODE
// =====================
let labActive = false;
let keyTimer = null;

// TOAST
const showLabToast = () => {
  const toast = document.createElement('div');
  toast.className = 'lab-toast';
  toast.innerHTML = `
    <strong>🧪 Modo laboratório ativado</strong><br>
    Resultados podem incluir:<br>
    • disciplina extrema<br>
    • dieta chata<br>
    • zero vida social<br><br>
    <em>Brincadeira. Aqui é constância, não milagre.</em>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.remove(), 4800);
};

// ATIVAR LAB MODE
const activateLabMode = () => {
  if (labActive) return;
  labActive = true;

  // VERDE PRIMEIRO
  document.body.classList.add('lab-mode');

  // GLITCH
  document.body.classList.add('lab-glitch');
  setTimeout(() => {
    document.body.classList.remove('lab-glitch');
  }, 600);

  navigator.vibrate?.([60, 40, 60]);
  showLabToast();

  setTimeout(() => {
    document.body.classList.remove('lab-mode');
    labActive = false;
  }, 6000);
};

// DESKTOP — SEGURAR "L"
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'l' && !keyTimer) {
    keyTimer = setTimeout(activateLabMode, 2000);
  }
});

document.addEventListener('keyup', e => {
  if (e.key.toLowerCase() === 'l') {
    clearTimeout(keyTimer);
    keyTimer = null;
  }
});

// MOBILE — 3 TAPS NO AVATAR
const avatar = document.querySelector('.avatar');
let tapCount = 0;
let tapTimer = null;

if (avatar) {
  avatar.addEventListener('click', () => {
    tapCount++;
    clearTimeout(tapTimer);

    tapTimer = setTimeout(() => (tapCount = 0), 600);

    if (tapCount === 3) {
      activateLabMode();
      tapCount = 0;
    }
  });
}

// =====================
// ANIMAÇÃO DE ENTRADA (APENAS HERO)
// =====================
window.addEventListener('load', () => {
  if (prefersReducedMotion) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroItems = hero.querySelectorAll(
    'img, h1, .subtitle, .bio-list li, .scroll-hint'
  );

  heroItems.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
  });

  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.animate(
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(.22,1,.36,1)',
          fill: 'forwards'
        }
      );
    }, 200 + i * 120);
  });
});