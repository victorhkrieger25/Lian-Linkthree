/* ==========================
   SCROLL ANIMATIONS
========================== */

// Seleciona todos os elementos animáveis
const animatedElements = document.querySelectorAll(
  '.card, .timeline-item, .hero, .section-title'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

// Aplica animação inicial
animatedElements.forEach((el) => {
  el.classList.add('pre-animate');
  observer.observe(el);
});

/* ==========================
   TIMELINE LINE ANIMATION
========================== */

const timeline = document.querySelector('.timeline');
const timelineLine = document.querySelector('.timeline-line');

function animateTimeline() {
  if (!timeline || !timelineLine) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.min(
    Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
    1
  );

  timelineLine.style.height = `${progress * 100}%`;
}

window.addEventListener('scroll', animateTimeline);
animateTimeline();

/* ==========================
   CARD DEPTH EFFECT (mouse)
========================== */

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 6;
    const rotateY = ((x / rect.width) - 0.5) * -6;

    card.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ==========================
   SMOOTH SCROLL FEEL
========================== */

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const diff = currentScroll - lastScroll;

  document.documentElement.style.setProperty(
    '--scroll-speed',
    Math.min(Math.abs(diff), 40)
  );

  lastScroll = currentScroll;
});