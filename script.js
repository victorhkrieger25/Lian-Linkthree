// entrada suave
document.querySelectorAll('section').forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = '1s';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 200 * i);
});

// timeline automática
const slides = document.querySelectorAll('.timeline img');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 2500);