// =====================================================
// SMOOTH SCROLL (fallback)
// =====================================================
document.documentElement.style.scrollBehavior = "smooth";


// =====================================================
// REVEAL ANIMATIONS (GLOBAL)
// =====================================================
const revealElements = document.querySelectorAll(
  '.hero, .card, .section-title, .timeline-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  el.classList.add('pre-animate');
  revealObserver.observe(el);
});


// =====================================================
// TIMELINE LINE PROGRESS
// =====================================================
const timeline = document.querySelector('.timeline');
const timelineLine = document.querySelector('.timeline-line');

function updateTimelineLine() {
  if (!timeline || !timelineLine) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.min(
    Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
    1
  );

  timelineLine.style.height = `${progress * 100}%`;
}

window.addEventListener('scroll', updateTimelineLine);
updateTimelineLine();


// =====================================================
// CARD HOVER DEPTH (DESKTOP ONLY)
// =====================================================
if (window.innerWidth > 1024) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * 4;
      const rotateY = ((x / rect.width) - 0.5) * -4;

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
}