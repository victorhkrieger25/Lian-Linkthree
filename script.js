// ==========================
// LENIS SMOOTH SCROLL
// ==========================
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel: true, smoothTouch: true });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ==========================
// ANIMAÇÃO CARDS E ELEMENTOS AO SCROLL
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const heroAvatar = document.querySelector(".avatar");
  if(heroAvatar) heroAvatar.classList.add("hero-avatar-float");

  const animatedElements = document.querySelectorAll(".section-title, .card, .timeline-item");

  animatedElements.forEach((el, i) => {
    if(el.classList.contains("card")) {
      if(i % 2 === 0) el.style.transform = "translateX(-50px)";
      else el.style.transform = "translateX(50px)";
      el.style.opacity = "0";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0,0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
});