'use strict';

(function initCustomCursor() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window;

  if (isMobile || isTouch) return;

  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .card, .gallery-item, .accom-card, .season-card, .con-img-wrap, .island-slide, .dot, .partner-logo, .depth-panel, .route-step, .filter-btn, .stat-card, .h-btn-primary';

  function bindHover() {
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.removeEventListener('mouseenter', addCurBig);
      el.removeEventListener('mouseleave', removeCurBig);
      el.addEventListener('mouseenter', addCurBig);
      el.addEventListener('mouseleave', removeCurBig);
    });
  }

  function addCurBig() { document.body.classList.add('cur-big'); }
  function removeCurBig() { document.body.classList.remove('cur-big'); }

  bindHover();
  document.addEventListener('includes:loaded', bindHover);
})();

