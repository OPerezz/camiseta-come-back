const slides = [...document.querySelectorAll('.hero__slide')];
const dotsContainer = document.querySelector('.hero__dots');
const prev = document.querySelector('.hero__nav--prev');
const next = document.querySelector('.hero__nav--next');
const toggle = document.querySelector('.hero__toggle');

let current = 0;
let autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let timer;

function classForSlide(index) {
  if (index === current) return 'is-active';
  if (index === (current - 1 + slides.length) % slides.length) return 'is-prev';
  if (index === (current + 1) % slides.length) return 'is-next';
  return '';
}

function renderDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `hero__dot ${index === current ? 'is-active' : ''}`;
    dot.type = 'button';
    dot.role = 'tab';
    dot.setAttribute('aria-selected', String(index === current));
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    dot.addEventListener('click', () => {
      current = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.className = `hero__slide ${classForSlide(index)}`.trim();
  });
  renderDots();
}

function move(step) {
  current = (current + step + slides.length) % slides.length;
  updateCarousel();
}

function stopAutoplay() {
  clearInterval(timer);
  timer = null;
}

function startAutoplay() {
  stopAutoplay();
  if (!autoplay) return;
  timer = setInterval(() => move(1), 5000);
}

prev.addEventListener('click', () => move(-1));
next.addEventListener('click', () => move(1));

toggle.addEventListener('click', () => {
  autoplay = !autoplay;
  toggle.textContent = autoplay ? 'Pausar' : 'Reproduzir';
  toggle.setAttribute('aria-pressed', String(!autoplay));
  startAutoplay();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') move(-1);
  if (event.key === 'ArrowRight') move(1);
});

updateCarousel();
startAutoplay();


window.addEventListener('scroll', reveal);

function reveal() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
