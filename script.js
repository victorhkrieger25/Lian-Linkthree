// CONFIGURAÇÃO DE TEMA (Executar o mais rápido possível)
const toggle = document.getElementById('themeToggle');
const body = document.body;

const applyTheme = (theme) => {
  if (theme === 'light') {
    body.classList.remove('dark');
    toggle.textContent = '🌙';
  } else {
    body.classList.add('dark');
    toggle.textContent = '☀️';
  }
};

// Recupera a preferência salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

toggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// REVEAL COM INTERSECTION OBSERVER (Mais performático)
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Opcional: parar de observar após revelar uma vez
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 }); // Dispara quando 15% do elemento está visível

reveals.forEach(el => revealObserver.observe(el));
