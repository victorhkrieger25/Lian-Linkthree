// =====================================================
// SMOOTH SCROLL (fallback se Lenis não carregar)
// =====================================================
document.documentElement.style.scrollBehavior = "smooth";


// =====================================================
// TIMELINE — ANIMAÇÃO AO APARECER (IntersectionObserver)
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.35
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
});


// =====================================================
// TIMELINE — SLIDER DE IMAGENS AUTOMÁTICO (POR ITEM)
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const timelines = document.querySelectorAll(".timeline-images");

  timelines.forEach(container => {
    const images = container.querySelectorAll("img");
    let current = 0;

    if (images.length <= 1) return;

    // Estado inicial
    images.forEach((img, index) => {
      img.style.opacity = index === 0 ? "1" : "0";
      img.style.position = "absolute";
      img.style.inset = "0";
      img.style.transition = "opacity 0.8s ease";
    });

    container.style.position = "relative";
    container.style.height = images[0].offsetHeight + "px";

    setInterval(() => {
      images[current].style.opacity = "0";
      current = (current + 1) % images.length;
      images[current].style.opacity = "1";
    }, 3000); // troca a cada 3s
  });
});


// =====================================================
// PARALLAX SUAVE NAS IMAGENS (SCROLL)
// =====================================================
window.addEventListener("scroll", () => {
  const images = document.querySelectorAll(".timeline-images img");

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = 1 - rect.top / windowHeight;
      const translate = Math.min(progress * 18, 18);

      img.style.transform = `scale(1.05) translateY(${translate}px)`;
    }
  });
});


// =====================================================
// EFEITO DE DESTAQUE AO PASSAR O MOUSE (DESKTOP)
// =====================================================
document.querySelectorAll(".timeline-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("hovered");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("hovered");
  });
});


// =====================================================
// PERFORMANCE: PAUSA ANIMAÇÕES FORA DA TELA
// =====================================================
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("paused");
  } else {
    document.body.classList.remove("paused");
  }
});

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
