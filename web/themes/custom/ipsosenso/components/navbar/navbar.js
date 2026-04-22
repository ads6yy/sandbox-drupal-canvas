/**
 * Navbar — ajoute la classe --scrolled après X pixels de scroll.
 */

const initNavbar = (nav) => {
  const threshold = 60;
  const update = () => {
    if (window.scrollY > threshold) {
      nav.classList.add('ipsosenso-navbar--scrolled');
    } else {
      nav.classList.remove('ipsosenso-navbar--scrolled');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
};

const init = () => {
  document.querySelectorAll('[data-ipsosenso-navbar]').forEach((el) => {
    if (el.dataset.ipsosensoNavbarInit) return;
    el.dataset.ipsosensoNavbarInit = 'true';
    initNavbar(el);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (typeof Drupal !== 'undefined') {
  Drupal.behaviors.ipsosensoNavbar = { attach: () => init() };
}
