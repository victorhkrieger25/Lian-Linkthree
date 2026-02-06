// ================================
// SCROLL SUAVE (fallback)
// ================================
document.documentElement.style.scrollBehavior = "smooth";


// ================================
// REVEAL SIMPLES (SEM EXAGERO)
// ================================
const elements = document.querySelectorAll(
  '.hero, .section-title, .card, .timeline-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => {
  el.classList.add('pre-animate');
  observer.observe(el);
});


// ================================
// TIMELINE LINE (PROGRESSO)
// ================================
const timeline = document.querySelector('.timeline');
const line = document.querySelector('.timeline-line');

function updateLine() {
  if (!timeline || !line) return;

  const rect = timeline.getBoundingClientRect();
  const h = window.innerHeight;

  const progress = Math.min(
    Math.max((h - rect.top) / (rect.height + h), 0),
    1
  );

  line.style.height = `${progress * 100}%`;
}

window.addEventListener('scroll', updateLine);
updateLine();