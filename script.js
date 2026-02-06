// 1. Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Sistema de Animação
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os grupos
    const cards = document.querySelectorAll(".card");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const heroElements = document.querySelectorAll(".hero > *, .bio-list li");

    // Aplica os estados iniciais via JS (caso o CSS falhe, o JS garante)
    heroElements.forEach(el => el.classList.add("fade-slide"));
    cards.forEach((card, i) => {
        card.classList.add(i % 2 === 0 ? "fade-slide-left" : "fade-slide-right");
    });

    // Configura o Observador
    const appearanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1, // Ativa quando 10% do item aparece
        rootMargin: "0px 0px -50px 0px" // Ativa um pouco antes de chegar na visão total
    });

    // Coloca todos para serem observados
    const allAnimatables = document.querySelectorAll('.fade-slide, .fade-slide-left, .fade-slide-right, .timeline-item');
    
    allAnimatables.forEach(el => {
        appearanceObserver.observe(el);
    });
});
