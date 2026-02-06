// ==========================
// LENIS SMOOTH SCROLL
// ==========================
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001-Math.pow(2,-10*t)),
  smoothWheel: true,
  smoothTouch: true
});

function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ==========================
// ANIMAÇÃO AO ENTRAR NA TELA (IntersectionObserver)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".card, .timeline-item, .section-title");

  animatedElements.forEach((el, i) => {
    // delay de cascata
    el.style.transitionDelay = `${i * 0.15}s`;
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("active"); // ativa animação
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
});