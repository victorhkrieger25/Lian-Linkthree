document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const timelineImages = document.querySelectorAll('.timeline-card img');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    reveals.forEach((el, index) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 120) {
        el.classList.add('active');

        // efeito stagger (delay automático)
        el.style.transitionDelay = `${index * 0.12}s`;
      }
    });

    // parallax suave nas imagens da timeline
    timelineImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const speed = 0.15;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (rect.top - windowHeight / 2) * speed;
        img.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});