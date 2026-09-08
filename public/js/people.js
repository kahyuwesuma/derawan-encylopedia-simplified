'use strict';

/**
 * PEOPLE / MANAGEMENT PAGE — DYNAMIC RENDERER
 * Populates the contributors page using data from contributors.js
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONTRIBUTORS === 'undefined') {
    console.error('CONTRIBUTORS data not found. Ensure contributors.js is loaded.');
    return;
  }

  const content = document.getElementById('people-content');
  if (!content) return;

  const leadership = [...(CONTRIBUTORS.founder || []), ...(CONTRIBUTORS.advisoryBoard || [])];
  renderGridSection('Leadership & Advisory Board', leadership, content, 'advisory');
  renderGridSection('Editorial Board', CONTRIBUTORS.editorialBoard, content, 'editorial');
  renderScientificSection(CONTRIBUTORS.scientificContributors, content);
  renderGridSection('Underwater Contributors', CONTRIBUTORS.underwaterContributors, content, 'underwater');
  renderGridSection('Landscape Contributors', CONTRIBUTORS.landscapeContributors, content, 'landscape');
  renderCommunitySection(CONTRIBUTORS.communityCustodians, content);

  // Re-observe animations for dynamic content
  if (window.observeSR) {
    window.observeSR();
  }
});

/**
 * Renders the Featured Founder section
 */
function renderFounder(founderList, container) {
  if (!founderList || !founderList.length) return;
  const f = founderList[0];

  const section = document.createElement('section');
  section.className = 'mgmt-section founder-section';
  section.innerHTML = `
    <div class="container">
      <div class="founder-wrap">
        <div class="founder-photo-wrap sr">
          <div class="founder-photo-frame">
            ${f.photo ? `<img src="/assets/img/people/${f.photo}" alt="${f.name}">` : `
              <div class="founder-photo-placeholder">
                <i class="ph ph-user"></i>
                <span>Photo Coming Soon</span>
              </div>
            `}
          </div>
          <div class="founder-corner"></div>
          <div class="founder-badge">Founder & Director</div>
        </div>
        <div class="founder-content">
          <span class="founder-title-tag sr d1">Primary Profile</span>
          <h2 class="founder-name sr d1">${f.name}</h2>
          <p class="founder-role sr d2">${f.role}</p>
          <div class="founder-divider sr d2"></div>
          <div class="founder-meta sr d3">
            <div class="founder-meta-item">
              <i class="ph ph-briefcase"></i>
              <span>${f.organization}</span>
            </div>
            ${f.location ? `
              <div class="founder-meta-item">
                <i class="ph ph-map-pin"></i>
                <span>${f.location}</span>
              </div>
            ` : ''}
          </div>
          ${f.description ? `<p class="founder-bio sr d3">${f.description}</p>` : ''}
        </div>
      </div>
    </div>
  `;
  container.appendChild(section);
}

/**
 * Renders a standard Grid Section for contributors
 */
function renderGridSection(title, list, container, type) {
  if (!list || !list.length) return;

  const section = document.createElement('section');
  section.className = `mgmt-section ${type}-section`;

  let gridClass = 'contrib-grid';
  if (list.length >= 4) gridClass += ' contrib-grid-4';
  else if (list.length === 3) gridClass += ' contrib-grid-3';

  section.innerHTML = `
    <div class="container">
      <div class="mgmt-section-header">
        <div class="mgmt-section-eyebrow sr">
          <div class="mgmt-eyebrow-line"></div>
          <span class="mono gold">${title}</span>
        </div>
        <h2 class="sr d1">${title}</h2>
      </div>
      <div class="${gridClass}">
        ${list.map((c, i) => renderContributorCard(c, i)).join('')}
      </div>
    </div>
  `;
  container.appendChild(section);
}

/**
 * Renders a single contributor card for the grid
 */
function renderContributorCard(c, index) {
  const delayClass = `d${(index % 3) + 1}`;
  const statusLabel = getStatusLabel(c.status);
  const statusClass = c.status === 'tbc' ? 'status-tbc' : (c.status === 'coming-soon' ? 'status-coming-soon' : '');

  return `
    <div class="contrib-card sr ${delayClass}">
      <div class="contrib-card-photo">
        ${c.photo ? `<img src="/assets/img/people/${c.photo}" alt="${c.name}">` : `
          <div class="contrib-photo-placeholder">
            <i class="ph ph-user"></i>
            <span>Photo Coming Soon</span>
          </div>
        `}
        <div class="contrib-card-shine"></div>
      </div>
      <div class="contrib-card-body">
        ${statusLabel ? `<div class="contrib-card-status ${statusClass}">${statusLabel}</div>` : ''}
        <h3 class="contrib-card-name">${c.name}</h3>
        <p class="contrib-card-role">${c.role}</p>
        ${c.location ? `
          <div class="contrib-card-location">
            <i class="ph ph-map-pin"></i>
            <span>${c.location}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Renders the Scientific Contributors section (Special Dark UI)
 */
function renderScientificSection(list, container) {
  if (!list || !list.length) return;

  const section = document.createElement('section');
  section.className = 'mgmt-section scientific-section';
  section.innerHTML = `
    <div class="container">
      <div class="mgmt-section-header">
        <div class="mgmt-section-eyebrow sr">
          <div class="mgmt-eyebrow-line" style="background: var(--gold-l);"></div>
          <span class="mono" style="color: var(--gold-l);">Knowledge Base</span>
        </div>
        <h2 class="sr d1" style="color:#fff;">Scientific Contributors</h2>
        <p class="sr d2" style="color: rgba(255,255,255,.5); max-width: 600px; margin-top: 1rem;">
          Expert researchers and scientists providing data and verification for the encyclopedia.
        </p>
      </div>
      <div class="contrib-compact-grid">
        ${list.map((c, i) => `
          <div class="scientific-compact-card sr d${(i % 3) + 1}">
            <div class="scientific-avatar">
              ${c.photo ? `<img src="/assets/img/people/${c.photo}" alt="${c.name}">` : `<i class="ph ph-microscope"></i>`}
            </div>
            <div class="scientific-info">
              <h3 class="scientific-name">${c.name}</h3>
              <p class="scientific-role">${c.role}</p>
              ${c.status !== 'confirmed' ? `
                <div class="scientific-status-badge">
                  ${getStatusLabel(c.status)}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.appendChild(section);
}

/**
 * Renders the Community Custodians section
 */
function renderCommunitySection(list, container) {
  if (!list || !list.length) return;

  const section = document.createElement('section');
  section.className = 'mgmt-section community-section';
  section.innerHTML = `
    <div class="container">
      <div class="mgmt-section-header">
        <div class="mgmt-section-eyebrow sr">
          <div class="mgmt-eyebrow-line"></div>
          <span class="mono gold">Local Wisdom</span>
        </div>
        <h2 class="sr d1">Community Custodians</h2>
        <p class="sr d2" style="max-width: 600px; margin-top: 1rem;">
          The local voices and guardians of Derawan's history and natural heritage.
        </p>
      </div>
      <div class="contrib-compact-grid">
        ${list.map((c, i) => `
          <div class="contrib-compact-card sr d${(i % 3) + 1}">
            <div class="contrib-compact-avatar">
              ${c.photo ? `<img src="/assets/img/people/${c.photo}" alt="${c.name}">` : `
                <div class="contrib-compact-avatar-placeholder">
                  <i class="ph ph-users"></i>
                </div>
              `}
            </div>
            <div class="contrib-compact-info">
              <h3 class="contrib-compact-name">${c.name}</h3>
              <p class="contrib-compact-role">${c.role}</p>
              <div class="contrib-compact-status">
                <i class="ph ph-map-pin"></i> ${c.location}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.appendChild(section);
}

function getStatusLabel(status) {
  switch (status) {
    case 'confirmed': return null;
    case 'tbc': return 'TBC';
    case 'coming-soon': return 'Coming Soon';
    default: return null;
  }
}
