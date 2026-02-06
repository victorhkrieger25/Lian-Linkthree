// SCROLL SUAVE
document.documentElement.style.scrollBehavior = "smooth";

// ANIMAÇÃO SIMPLES AO APARECER
const elements = document.querySelectorAll(
  '.hero, .card, .timeline-item, .section-title'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "0.6s ease";
  observer.observe(el);
});