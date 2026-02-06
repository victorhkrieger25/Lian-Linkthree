// ================================
// EVOLUTION TIMELINE SCROLL ANIMATION
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const evolutions = document.querySelectorAll(".evolution");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.45 // ativa quando ~45% do bloco aparece
  };

  const evolutionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  evolutions.forEach(section => {
    evolutionObserver.observe(section);
  });
});


// ================================
// SMOOTH IMAGE PARALLAX (SUBTLE)
// ================================

window.addEventListener("scroll", () => {
  const images = document.querySelectorAll(".evolution-image img");

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = 1 - rect.top / windowHeight;
      const translate = progress * 14; // intensidade suave

      img.style.transform = `scale(1) translateY(${translate}px)`;
    }
  });
});


// ================================
// OPTIONAL: SMOOTH SCROLL (DESKTOP)
// ================================

document.documentElement.style.scrollBehavior = "smooth";