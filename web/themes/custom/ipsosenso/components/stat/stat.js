/**
 * Stat — animation de compteur au scroll (IntersectionObserver).
 */

const animateNumber = (el, target, duration = 1500) => {
  const isPercent = target.toString().includes('%');
  const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
  if (isNaN(numeric)) return;

  const startTime = performance.now();
  const format = (val) => {
    if (Number.isInteger(numeric)) return Math.floor(val).toString();
    return val.toFixed(1);
  };

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = format(numeric * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = String(target);
    }
  };

  requestAnimationFrame(tick);
};

const init = () => {
  const stats = document.querySelectorAll('[data-ipsosenso-stat]');
  if (stats.length === 0 || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberEl = entry.target.querySelector('[data-stat-value]');
        if (numberEl && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const value = numberEl.dataset.statValue;
          animateNumber(numberEl, value);
        }
      }
    });
  }, { threshold: 0.3 });

  stats.forEach((stat) => {
    if (stat.dataset.ipsosensoStatInit) return;
    stat.dataset.ipsosensoStatInit = 'true';
    observer.observe(stat);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (typeof Drupal !== 'undefined') {
  Drupal.behaviors.ipsosensoStat = {
    attach: () => init(),
  };
}
