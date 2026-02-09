// =====================
// TEMA (SISTEMA + MANUAL)
// =====================
const body = document.body;
const toggle = document.getElementById('themeToggle');

// Detecta tema do sistema
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Tema salvo
const savedTheme = localStorage.getItem('theme');

// Aplica tema inicial
if (savedTheme) {
  body.classList.toggle('dark', savedTheme === 'dark');
} else {
  body.classList.toggle('dark', systemPrefersDark);
}

// Ícone correto
toggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';

// Alternar manualmente
toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// =====================
// REVEAL COM OBSERVER
// =====================
const reveals = document.querySelectorAll('.reveal');

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


// GLOW DINÂMICO NOS CARDS
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(124,58,237,0.18),
        var(--bg-card) 60%
      )
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--bg-card)';
  });
});


