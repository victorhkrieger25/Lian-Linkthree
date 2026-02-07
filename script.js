// animação de entrada suave
document.querySelectorAll('section').forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = '1s';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }, 200 * i);
});

// parallax no avatar
const avatar = document.querySelector('.avatar');

document.addEventListener('mousemove', e => {
  const x = (window.innerWidth/2 - e.clientX)/40;
  const y = (window.innerHeight/2 - e.clientY)/40;
  avatar.style.transform = `translateY(-10px) rotateX(${y}deg) rotateY(${x}deg)`;
});