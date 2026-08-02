'use strict';

/* ── SCROLL REVEAL ── */
let srObs;
function observeSR() {
  if (!srObs) {
    srObs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          srObs.unobserve(e.target);
        }
      });
    }, { threshold: .09, rootMargin: '50px' });
  }
  document.querySelectorAll('.sr:not(.on)').forEach(el => srObs.observe(el));
}

/* ── COUNT UP ── */
function countUp(el) {
  const target = parseInt(el.dataset.count) || 0, suffix = el.dataset.suffix || '', sym = el.dataset.sym || '';
  if (sym) { el.textContent = sym; el.classList.add('counted'); return; }
  if (!target) { el.textContent = suffix; el.classList.add('counted'); return; }
  let n = 0;
  el.classList.add('counted');
  const inc = target / 90, t = setInterval(() => {
    n = Math.min(n + inc, target);
    el.textContent = Math.round(n) + suffix;
    if (n >= target) clearInterval(t);
  }, 18);
}

/* ── PARALLAX ── */
const parallaxElements = [];
function handleParallax() {
  parallaxElements.forEach(item => {
    const rect = item.el.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) {
      if (item.isDepth) {
        const progress = (innerHeight / 2 - rect.top) / innerHeight, shift = progress * item.speed * 300;
        item.el.style.transform = `translateY(${shift}px)`;
        const img = item.el.querySelector('img');
        if (img) img.style.transform = `scale(1.18) translateY(${-shift * 1.6}px)`;
      } else {
        const sY = window.pageYOffset, eT = rect.top + sY, offset = (sY - eT + innerHeight) * item.speed;
        item.el.style.transform = `translateY(${offset}px)`;
      }
    }
  });
}

function rafThrottle(fn) {
  let p = false;
  return function(...a) {
    if (p) return;
    p = true;
    requestAnimationFrame(function() {
      fn(...a);
      p = false;
    });
  };
}

window.observeSR = observeSR;

document.addEventListener('DOMContentLoaded', () => {
  // Page Wipe Out
  setTimeout(() => {
    const wipe = document.getElementById('wipe');
    if (wipe) wipe.classList.add('out');
  }, 80);

  // Scroll reveal observe
  observeSR();

  // Count up observer
  const cntObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num-s[data-count],.stat-num-s[data-sym]').forEach(countUp);
        cntObs.unobserve(e.target);
      }
    });
  }, { threshold: .3 });
  const ss = document.querySelector('.stats-section');
  if (ss) cntObs.observe(ss);

  // Parallax Setup
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  document.querySelectorAll('[data-parallax]').forEach(el => parallaxElements.push({ el, speed: .15 }));
  document.querySelectorAll('.depth-panel').forEach(p => parallaxElements.push({ el: p, speed: parseFloat(p.dataset.speed || '.03'), isDepth: true }));

  if (!isMobile) {
    window.addEventListener('scroll', rafThrottle(handleParallax), { passive: true });
    handleParallax();
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
