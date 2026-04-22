/**
 * Hero Carousel — rotation auto des slides avec indicateurs et flèches.
 */

const initCarousel = (root) => {
  const container = root.querySelector('.ipsosenso-hero-carousel') || root;
  const slides = root.querySelectorAll('.ipsosenso-hero-carousel__slide');
  const dots = root.querySelectorAll('.ipsosenso-hero-carousel__dot');
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const autoplay = parseInt(container.dataset.autoplay || '5000', 10);
  if (slides.length === 0) return;

  let current = 0;
  let timer = null;

  const show = (index) => {
    const normalized = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      if (i === normalized) {
        slide.classList.add('opacity-100', 'relative');
        slide.classList.remove('opacity-0', 'absolute', 'inset-0');
      } else {
        slide.classList.remove('opacity-100', 'relative');
        slide.classList.add('opacity-0', 'absolute', 'inset-0');
      }
    });
    dots.forEach((dot, i) => {
      if (i === normalized) {
        dot.classList.add('bg-white', 'w-8');
        dot.classList.remove('bg-transparent', 'w-3');
      } else {
        dot.classList.remove('bg-white', 'w-8');
        dot.classList.add('bg-transparent', 'w-3');
      }
    });
    current = normalized;
  };

  const next = () => show(current + 1);
  const prev = () => show(current - 1);

  const start = () => {
    stop();
    timer = setInterval(next, autoplay);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      start();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  start();
};

const init = () => {
  document.querySelectorAll('.ipsosenso-hero').forEach((el) => {
    if (el.dataset.ipsosensoHeroInit) return;
    el.dataset.ipsosensoHeroInit = 'true';
    initCarousel(el);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (typeof Drupal !== 'undefined') {
  Drupal.behaviors.ipsosensoHeroCarousel = {
    attach: () => init(),
  };
}
