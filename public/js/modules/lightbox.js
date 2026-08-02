'use strict';

let lb, lbImg, lbCap, lbMetaEl, lbCtr, lbIdx = 0;

function openLB(idx) {
  lb = document.getElementById('lightbox');
  lbImg = document.getElementById('lb-img');
  lbCap = document.getElementById('lb-caption');
  lbMetaEl = document.getElementById('lb-meta');
  lbCtr = document.getElementById('lbCounter');
  if (!lb) return;

  lbIdx = idx;
  showLB();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLB() {
  const items = window.galleryItems || [];
  const item = items[lbIdx];
  if (!item || !lbImg) return;
  lbImg.style.opacity = '0';
  lbImg.style.transform = 'scale(.97)';
  setTimeout(() => {
    lbImg.src = item.fullSrc || (item.src ? item.src.replace(/=w\d+.*$/, '=s0') : '');
    lbImg.alt = item.label || '';
    if (lbCap) lbCap.textContent = item.label || (item.meta?.species) || '';
    if (lbMetaEl) {
      if (item.meta) {
        const m = item.meta;
        lbMetaEl.textContent = [item.site, item.region, m.photographer ? '© ' + m.photographer : '', m.date].filter(Boolean).join('  ·  ');
      } else {
        lbMetaEl.textContent = '';
      }
    }
    if (lbCtr) lbCtr.textContent = (lbIdx + 1) + ' / ' + items.length;
    lbImg.style.transition = 'opacity .4s,transform .4s';
    lbImg.style.opacity = '1';
    lbImg.style.transform = 'scale(1)';
  }, 200);
}

function closeLB() {
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
  if (lbImg) lbImg.src = '';
}

window.openLB = openLB;
window.closeLB = closeLB;

document.addEventListener('DOMContentLoaded', () => {
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbEl = document.getElementById('lightbox');

  if (lbClose) lbClose.addEventListener('click', closeLB);
  if (lbPrev) lbPrev.addEventListener('click', e => {
    e.stopPropagation();
    const items = window.galleryItems || [];
    lbIdx = (lbIdx - 1 + items.length) % items.length;
    showLB();
  });
  if (lbNext) lbNext.addEventListener('click', e => {
    e.stopPropagation();
    const items = window.galleryItems || [];
    lbIdx = (lbIdx + 1) % items.length;
    showLB();
  });
  if (lbEl) {
    lbEl.addEventListener('click', e => { if (e.target === lbEl) closeLB(); });
    let lbTS = 0;
    lbEl.addEventListener('touchstart', e => { lbTS = e.touches[0].clientX; }, { passive: true });
    lbEl.addEventListener('touchend', e => {
      const items = window.galleryItems || [];
      const d = lbTS - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) {
        d > 0 ? (lbIdx = (lbIdx + 1) % items.length) : (lbIdx = (lbIdx - 1 + items.length) % items.length);
        showLB();
      }
    });
  }

  document.addEventListener('keydown', e => {
    const lbObj = document.getElementById('lightbox');
    if (lbObj && lbObj.classList.contains('open')) {
      const items = window.galleryItems || [];
      if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % items.length; showLB(); }
      if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + items.length) % items.length; showLB(); }
      if (e.key === 'Escape') closeLB();
    }
  });
});
