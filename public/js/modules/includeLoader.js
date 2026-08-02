/**
 * HTML Include / Loader Helper
 * Dynamically loads HTML fragments into elements with `data-include` attribute
 */
document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');
  const loadPromises = Array.from(includes).map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        const html = await response.text();
        el.outerHTML = html;
      } else {
        console.error(`Failed to load component: ${file}`);
      }
    } catch (err) {
      console.error(`Error loading component ${file}:`, err);
    }
  });

  await Promise.all(loadPromises);
  document.dispatchEvent(new CustomEvent('includes:loaded'));
});
