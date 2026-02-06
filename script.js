const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  // Seleciona todos os itens da timeline para observar
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });

  // Também observa os cards e o hero
  document.querySelectorAll('.card, .hero > *').forEach((el, i) => {
    if (!el.classList.contains('fade-slide-left') && !el.classList.contains('fade-slide-right')) {
        el.classList.add('fade-slide');
    }
    observer.observe(el);
  });
});
