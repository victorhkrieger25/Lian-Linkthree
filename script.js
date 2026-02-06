// ==========================
// LENIS SMOOTH SCROLL
// ==========================
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: true
});

function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ==========================
// FADE + SLIDE AO SCROLL
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const heroElements = document.querySelectorAll(".hero img, .hero .title, .hero .subtitle, .bio-list, .scroll-hint");

  // Classes iniciais
  cards.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? "fade-slide-left" : "fade-slide-right");
  });

  timelineItems.forEach(item => item.classList.add("fade-slide"));
  heroElements.forEach(el => el.classList.add("fade-slide"));

  // Observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observar todos
  document.querySelectorAll(".fade-slide, .fade-slide-left, .fade-slide-right")
          .forEach(el => observer.observe(el));
});