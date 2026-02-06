// 1. Inicialização do Lenis (Smooth Scroll)
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

// 2. Lógica de Animação ao Scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const heroElements = document.querySelectorAll(".hero > *, .bio-list li");

  // Adiciona as classes de animação iniciais
  heroElements.forEach(el => el.classList.add("fade-slide"));
  
  cards.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? "fade-slide-left" : "fade-slide-right");
  });

  // O Observer que detecta quando o elemento aparece na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Opcional: parar de observar após animar
        // observer.unobserve(entry.target); 
      }
    });
  }, { 
    threshold: 0.15, // Ativa quando 15% do item aparece
    rootMargin: "0px 0px -50px 0px" 
  });

  // Seleciona todos os itens que devem ser observados
  const elementsToAnimate = document.querySelectorAll(".fade-slide, .fade-slide-left, .fade-slide-right, .timeline-item");
  
  elementsToAnimate.forEach(el => observer.observe(el));
});
