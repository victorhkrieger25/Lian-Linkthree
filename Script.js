/* =====================
   REVEAL ON SCROLL
===================== */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 80;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* =====================
   CARD INTERACTION
===================== */
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--x');
    card.style.removeProperty('--y');
  });
});
