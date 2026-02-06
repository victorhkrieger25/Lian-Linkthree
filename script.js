// Inicialização do Scroll Suave
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Selecionar elementos
  const heroItems = document.querySelectorAll(".hero > *, .bio-list li");
  const cards = document.querySelectorAll(".card");
  const timelineItems = document.querySelectorAll(".timeline-item");

  // 2. Aplicar classes de animação iniciais
  heroItems.forEach(el => el.classList.add("fade-slide"));
  
  cards.forEach((card, i) => {
    // Alterna a entrada entre esquerda e direita
    card.classList.add(i % 2 === 0 ? "fade-slide-left" : "fade-slide-right");
  });

  // 3. Configurar o Observador (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Opcional: observer.unobserve(entry.target); // Para animar apenas uma vez
      }
    });
  }, { 
    threshold: 0.1, // Ativa quando 10% do item aparece
    rootMargin: "0px 0px -20px 0px"
  });

  // 4. Observar todos os itens animáveis
  const itemsToObserve = document.querySelectorAll(".fade-slide, .fade-slide-left, .fade-slide-right, .timeline-item");
  itemsToObserve.forEach(item => observer.observe(item));
});
