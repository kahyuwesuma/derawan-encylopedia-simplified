(function(){
'use strict';

/* ─── KONFIGURASI ─── */
var WM = {
  photographer: 'Azman Rasyid',
  location:     'Kepulauan Derawan',
  date:         '04 Mar 2025',
  license:      'CC BY-NC 4.0',
  site:         'derawanarchipelago.id',
  position:     'br',          /* br | bl | tr | tl */
  badgeOpacity:  0.68,
  diagOpacity:   0.030,
  fontSize:      12,           /* base px, auto-scaled to image size */
  icon:          '\u25c8',
  quality:       0.90,
  skipClass:     'no-wm'
};

var _done = new WeakSet();
var _diagCache = null;

/* ── rounded rect ── */
var _rr = function(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + r, y); c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

/* ── gold gradient rule ── */
var _rule = function(ctx, x1, x2, y, lw) {
  var g = ctx.createLinearGradient(x1, y, x2, y);
  g.addColorStop(0,   'rgba(212,170,106,0)');
  g.addColorStop(0.2, 'rgba(212,170,106,0.72)');
  g.addColorStop(0.8, 'rgba(212,170,106,0.72)');
  g.addColorStop(1,   'rgba(212,170,106,0)');
  ctx.save(); ctx.fillStyle = g;
  ctx.fillRect(x1, y, x2 - x1, lw);
  ctx.restore();
}

/* ── subtle inter-row separator ── */
var _sep = function(ctx, x1, x2, y) {
  var g = ctx.createLinearGradient(x1, y, x2, y);
  g.addColorStop(0,   'rgba(255,255,255,0)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.12)');
  g.addColorStop(0.7, 'rgba(255,255,255,0.12)');
  g.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.save(); ctx.fillStyle = g;
  ctx.fillRect(x1, y, x2 - x1, 0.5);
  ctx.restore();
}

/* ── diagonal ghost pattern (cached per session) ── */
var _getDiagPattern = function(ctx, cfg) {
  if (_diagCache) return _diagCache;
  var text = cfg.icon + '  ' + cfg.photographer + '  ·  ' + cfg.site;
  var tile = document.createElement('canvas');
  tile.width = 270; tile.height = 84;
  var tc = tile.getContext('2d');
  tc.font = '10px "Space Mono","Courier New",monospace';
  tc.fillStyle = 'rgba(212,170,106,' + cfg.diagOpacity + ')';
  tc.textAlign = 'left'; tc.textBaseline = 'top';
  tc.fillText(text, 0, 0);
  tc.font = '9px "Space Mono","Courier New",monospace';
  tc.fillStyle = 'rgba(212,170,106,' + (cfg.diagOpacity * 0.5) + ')';
  tc.fillText(cfg.license + '  ·  ' + cfg.date, 0, 18);
  _diagCache = ctx.createPattern(tile, 'repeat');
  return _diagCache;
}

var _drawDiag = function(ctx, nw, nh, cfg) {
  var pat = _getDiagPattern(ctx, cfg);
  if (!pat) return;
  ctx.save();
  ctx.translate(nw / 2, nh / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = pat;
  ctx.fillRect(-nw, -nh, nw * 2, nh * 2);
  ctx.restore();
}

/* ── main stamp ── */
var _stamp = function(img, ov) {
  var cfg = {};
  var k; for (k in WM) cfg[k] = WM[k];
  if (ov) for (k in ov) cfg[k] = ov[k];

  try {
    var nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !nh) return;

    var cv = document.createElement('canvas');
    cv.width = nw; cv.height = nh;
    var ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0, nw, nh);

    var base = Math.min(nw, nh);
    /* auto-scale font: clamp between (fontSize-2) and (fontSize+6) */
    var fs  = Math.min(cfg.fontSize + 6, Math.max(cfg.fontSize - 2, Math.round(base * 0.022)));
    var f1  = fs;
    var f2  = Math.round(fs * 0.88);
    var f3  = Math.round(fs * 0.80);
    var lh  = Math.round(fs * 1.62);
    var pad = Math.round(base * 0.022);
    var gap = Math.round(fs * 0.7);

    /* badge text rows */
    var r1 = cfg.icon + '  ' + cfg.photographer;
    /* override: if caller passes locationLine, use it for row 2 */
    var r2 = (cfg.locationLine) ? cfg.locationLine : (cfg.location + '  ·  ' + cfg.date);
    var r3 = cfg.license + '  ·  ' + cfg.site;

    /* measure widths */
    ctx.font = f1 + 'px "Space Mono","Courier New",monospace';
    var w1 = ctx.measureText(r1).width;
    ctx.font = f2 + 'px "Space Mono","Courier New",monospace';
    var w2 = ctx.measureText(r2).width;
    ctx.font = f3 + 'px "Space Mono","Courier New",monospace';
    var w3 = ctx.measureText(r3).width;

    var innerW = Math.max(w1, w2, w3);
    var bW = innerW + gap * 2 + 4;
    var bH = lh * 3 + gap * 2 + 2;
    var r  = Math.round(fs * 0.55);

    var bx, by;
    var pos = cfg.position;
    bx = (pos === 'bl' || pos === 'tl') ? pad : nw - pad - bW;
    by = (pos === 'tr' || pos === 'tl') ? pad : nh - pad - bH;

    /* draw diagonal overlay */
    _drawDiag(ctx, nw, nh, cfg);

    /* ── badge background ── */
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur  = Math.round(fs * 1.5);
    ctx.shadowOffsetY = Math.round(fs * 0.3);
    ctx.globalAlpha = cfg.badgeOpacity;
    ctx.fillStyle   = 'rgba(4,10,14,0.80)';
    _rr(ctx, bx, by, bW, bH, r); ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    /* top highlight gradient */
    var hl = ctx.createLinearGradient(bx, by, bx, by + bH * 0.45);
    hl.addColorStop(0, 'rgba(255,255,255,0.055)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl; _rr(ctx, bx, by, bW, bH, r); ctx.fill();

    /* border */
    ctx.strokeStyle = 'rgba(212,170,106,0.48)';
    ctx.lineWidth   = Math.max(0.5, fs * 0.042);
    _rr(ctx, bx + 0.25, by + 0.25, bW - 0.5, bH - 0.5, r); ctx.stroke();
    ctx.restore();

    /* ── accent lines ── */
    var lx1 = bx + gap, lx2 = bx + bW - gap;
    _rule(ctx, lx1, lx2, by + 1,        Math.max(0.5, fs * 0.055));
    _rule(ctx, lx1, lx2, by + bH - 1.5, Math.max(0.5, fs * 0.055));

    /* ── row 1: photographer name ── */
    var ty = by + gap + 1;
    ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = 6;
    ctx.fillStyle   = 'rgba(255,255,255,0.96)';
    ctx.font = f1 + 'px "Space Mono","Courier New",monospace';
    ctx.textBaseline = 'top'; ctx.textAlign = 'left';
    ctx.fillText(r1, bx + gap, ty);

    _sep(ctx, bx + gap, bx + bW - gap, ty + lh - 2);

    /* ── row 2: location · date (or override) ── */
    ty += lh;
    ctx.fillStyle = 'rgba(212,170,106,0.88)';
    ctx.font = f2 + 'px "Space Mono","Courier New",monospace';
    ctx.fillText(r2, bx + gap, ty);

    _sep(ctx, bx + gap, bx + bW - gap, ty + lh - 2);

    /* ── row 3: license · site ── */
    ty += lh;
    ctx.fillStyle = 'rgba(255,255,255,0.40)';
    ctx.font = f3 + 'px "Space Mono","Courier New",monospace';
    ctx.fillText(r3, bx + gap, ty);

    ctx.shadowBlur = 0;
    img.src = cv.toDataURL('image/jpeg', cfg.quality);
  } catch(e) { /* cross-origin taint — skip silently */ }
}

/* ── schedule via IntersectionObserver (perf: stamp only when visible) ── */
var _io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (!e.isIntersecting) return;
    var img = e.target, ov = img._wmOv;
    _io.unobserve(img);
    if (img.complete && img.naturalWidth > 0) _stamp(img, ov);
    else img.addEventListener('load', function() { _stamp(img, ov); }, { once: true });
  });
}, { rootMargin: '250px' });

var scheduleWM = function(img, ov) {
  if (!img || img.tagName !== 'IMG') return;
  if (_done.has(img)) return;
  if (img.classList.contains(WM.skipClass)) return;
  _done.add(img);
  if (ov) img._wmOv = ov;
  _io.observe(img);
}

/* ── force re-stamp with override (cinematic & hero images) ── */
var applyWatermark = function(img, ov) {
  if (!img || img.tagName !== 'IMG') return;
  if (img.classList.contains(WM.skipClass)) return;
  _done.delete(img);      /* allow re-stamp */
  _io.unobserve(img);
  if (ov) img._wmOv = ov;
  _done.add(img);
  function doStamp() { _stamp(img, ov); }
  if (img.complete && img.naturalWidth > 0) doStamp();
  else img.addEventListener('load', doStamp, { once: true });
}

window.applyWatermark = applyWatermark;
window.WM_CONFIG = WM;

/* ── MutationObserver — auto-stamp injected images, skip popup thumbs ── */
var _obs = new MutationObserver(function(mutations) {
  mutations.forEach(function(m) {
    m.addedNodes.forEach(function(node) {
      if (node.nodeType !== 1) return;
      /* popup/thumbnail/logo images: mark no-wm so they stay clean */
      if (node.classList &&
          (node.classList.contains('popup-card') || node.classList.contains('site-row-thumb') || node.classList.contains('partner-logo'))) {
        if (node.querySelectorAll)
          node.querySelectorAll('img').forEach(function(i){ i.classList.add('no-wm'); });
        return;
      }
      if (node.tagName === 'IMG' && !node.classList.contains('no-wm') && !node.classList.contains('partner-logo')) scheduleWM(node);
      if (node.querySelectorAll) {
        node.querySelectorAll('img:not(.no-wm):not(.partner-logo)').forEach(function(img) {
          if (img.closest && img.closest('.popup-card,.site-row-thumb,.lb-th,.supported-by,.partner-logo')) return;
          scheduleWM(img);
        });
      }
    });
  });
});
_obs.observe(document.body, { childList: true, subtree: true });

})();
