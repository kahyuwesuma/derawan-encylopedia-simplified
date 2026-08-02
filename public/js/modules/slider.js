'use strict';

let cur_s = 0, total = 4, autoT;

function goToSlide(n) {
  const track = document.getElementById('islandsTrack');
  const dots = document.querySelectorAll('.dot');
  const numEl = document.getElementById('slideNum');
  const slides = document.querySelectorAll('.island-slide');
  if (!track || !slides.length) return;

  slides[cur_s]?.classList.remove('active');
  dots[cur_s]?.classList.remove('active');
  const oldFill = dots[cur_s]?.querySelector('.dot-fill');
  if (oldFill) oldFill.style.animation = 'none';

  cur_s = (n + total) % total;
  track.style.transform = `translateX(-${cur_s * 100}%)`;
  slides[cur_s]?.classList.add('active');
  dots[cur_s]?.classList.add('active');

  const fill = dots[cur_s]?.querySelector('.dot-fill');
  if (fill) {
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = 'dotFill 5s linear forwards';
  }
  if (numEl) numEl.textContent = String(cur_s + 1).padStart(2, '0');
  resetAuto();
}

function nextSlide() { goToSlide(cur_s + 1); }
function prevSlide() { goToSlide(cur_s - 1); }

function resetAuto() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  clearInterval(autoT);
  if (!isMobile) autoT = setInterval(nextSlide, 5500);
}

window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

document.addEventListener('DOMContentLoaded', () => {
  const initSliderEvents = () => {
    const iw = document.getElementById('islandsWrap');
    if (iw && !iw.dataset.touchBound) {
      iw.dataset.touchBound = "true";
      let ts = 0, te = 0;
      iw.addEventListener('touchstart', e => { ts = e.touches[0].clientX; }, { passive: true });
      iw.addEventListener('touchmove', e => { te = e.touches[0].clientX; }, { passive: true });
      iw.addEventListener('touchend', () => {
        const d = ts - te;
        if (Math.abs(d) > 50) { d > 0 ? nextSlide() : prevSlide(); }
        ts = 0; te = 0;
      });
    }
  };

  initSliderEvents();
  document.addEventListener('includes:loaded', initSliderEvents);

  document.addEventListener('keydown', e => {
    const lbObj = document.getElementById('lightbox');
    if (lbObj && lbObj.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearInterval(autoT) : resetAuto();
  });

  resetAuto();
});
