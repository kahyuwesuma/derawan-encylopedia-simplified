'use strict';

// Boot gallery API on DOM load
const startGallery = () => {
  if (window.initGallery) {
    window.initGallery();
  }
};

document.addEventListener('DOMContentLoaded', startGallery);
document.addEventListener('includes:loaded', startGallery);
