// =====================================
// FADE + SLIDE ANIMATION (Intersection)
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(`
    .hero *,
    .section-title,
    .card,
    .timeline-item
  `);

  // Estado inicial
  animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transitionDelay = `${index * 0.05}s`;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedElements.forEach(el => observer.observe(el));
});


// =====================================
// CARDS — ANIMAÇÃO EM CASCATA
// =====================================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});


// =====================================
// TIMELINE LINE — ANIMAÇÃO DE CRESCIMENTO
// =====================================

const timeline = document.querySelector(".timeline");
const timelineLine = document.querySelector(".timeline-line");

function animateTimelineLine() {
  if (!timeline || !timelineLine) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight) {
    const progress = Math.min(
      (windowHeight - rect.top) / (rect.height + windowHeight),
      1
    );

    timelineLine.style.height = `${progress * 100}%`;
  }
}

timelineLine.style.height = "0%";
timelineLine.style.transition = "height 1.2s ease";

window.addEventListener("scroll", animateTimelineLine);
animateTimelineLine();


// =====================================
// HOVER SUAVE NOS CARDS (desktop)
// =====================================

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ANIMAÇÃO HERO
  const heroAvatar = document.querySelector(".avatar");
  if(heroAvatar) heroAvatar.classList.add("hero-avatar-float");

  // ELEMENTOS PARA ANIMAÇÃO
  const animatedElements = document.querySelectorAll(
    ".section-title, .card, .timeline-item"
  );

  animatedElements.forEach((el, i) => {
    // cards alternam direção
    if(el.classList.contains("card")) {
      if(i % 2 === 0) el.classList.add("pre-animate-left");
      else el.classList.add("pre-animate-right");
    } else {
      el.classList.add("pre-animate");
    }
  });

  // OBSERVER PARA DISPARAR ANIMAÇÕES AO SCROLL
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if(entry.target.classList.contains("pre-animate-left"))
            entry.target.classList.add("animate-left");
          else if(entry.target.classList.contains("pre-animate-right"))
            entry.target.classList.add("animate-right");
          else
            entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach(el => observer.observe(el));
});
