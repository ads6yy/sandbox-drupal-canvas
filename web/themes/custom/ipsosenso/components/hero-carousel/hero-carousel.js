/**
 * Hero Carousel — rotation auto des slides avec indicateurs cliquables.
 */

const initCarousel = (root) => {
  const slides = root.querySelectorAll('.ipsosenso-hero-carousel__slide');
  const dots = root.querySelectorAll('.ipsosenso-hero-carousel__dot');
  const autoplay = parseInt(root.dataset.autoplay || '5000', 10);
  if (slides.length === 0) return;

  let current = 0;
  let timer = null;

  const show = (index) => {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('opacity-100', 'relative');
        slide.classList.remove('opacity-0', 'absolute', 'inset-0');
      } else {
        slide.classList.remove('opacity-100', 'relative');
        slide.classList.add('opacity-0', 'absolute', 'inset-0');
      }
    });
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-white', 'w-8');
        dot.classList.remove('bg-transparent', 'w-3');
      } else {
        dot.classList.remove('bg-white', 'w-8');
        dot.classList.add('bg-transparent', 'w-3');
      }
    });
    current = index;
  };

  const next = () => show((current + 1) % slides.length);

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

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  start();
};

const init = () => {
  document.querySelectorAll('[data-ipsosenso-carousel]').forEach((el) => {
    if (el.dataset.ipsosensoCarouselInit) return;
    el.dataset.ipsosensoCarouselInit = 'true';
    initCarousel(el);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-init si Drupal behaviors
if (typeof Drupal !== 'undefined') {
  Drupal.behaviors.ipsosensoHeroCarousel = {
    attach: () => init(),
  };
}
