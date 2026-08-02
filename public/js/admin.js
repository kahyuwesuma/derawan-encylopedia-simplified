'use strict';

let authToken = sessionStorage.getItem('adminToken') || '';

async function handleLogin(e) {
  e.preventDefault();
  const pwd = document.getElementById('passwordInput').value;
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('btnLoginSubmit');

  errorEl.style.display = 'none';
  btn.disabled = true;

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd })
    });

    const contentType = res.headers.get('content-type') || '';
    let data = {};
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      throw new Error('Server merespons non-JSON. Silakan jalankan node server.js');
    }

    if (res.ok && data.success) {
      authToken = pwd;
      sessionStorage.setItem('adminToken', pwd);
      showDashboard();
    } else {
      errorEl.textContent = data.message || 'Password salah';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = 'Gagal terhubung: ' + err.message;
    errorEl.style.display = 'block';
  } finally {
    btn.disabled = false;
  }
}

function handleLogout() {
  sessionStorage.removeItem('adminToken');
  authToken = '';
  document.getElementById('dashboardScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('passwordInput').value = '';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'block';
  fetchStatus();
}

let allWarningsData = [];
let auditCurrentPage = 1;
let auditItemsPerPage = 25;
let auditSearchQuery = '';
let auditFilterCategory = 'ALL';

function handleAuditFilterChange() {
  const searchEl = document.getElementById('auditSearchInput');
  const filterEl = document.getElementById('auditFilterSelect');
  if (searchEl) auditSearchQuery = searchEl.value.trim().toLowerCase();
  if (filterEl) auditFilterCategory = filterEl.value;
  auditCurrentPage = 1;
  renderAuditTable();
}

function handleAuditPerPageChange() {
  const perPageEl = document.getElementById('auditPerPageSelect');
  if (perPageEl) auditItemsPerPage = parseInt(perPageEl.value, 10) || 25;
  auditCurrentPage = 1;
  renderAuditTable();
}

function changeAuditPage(delta) {
  auditCurrentPage += delta;
  renderAuditTable();
}

function renderAuditTable() {
  const tbody = document.getElementById('warningsTableBody');
  const statsEl = document.getElementById('auditStatsSummary');
  const pageIndicator = document.getElementById('auditPageIndicator');
  const infoEl = document.getElementById('auditPaginationInfo');
  const btnPrev = document.getElementById('btnPrevPage');
  const btnNext = document.getElementById('btnNextPage');

  if (!tbody) return;

  // Filter items
  let filtered = allWarningsData.filter(w => {
    // Category Filter
    if (auditFilterCategory === 'DUPLICATE' && !w.issue.toLowerCase().includes('duplikat')) return false;
    if (auditFilterCategory === 'ROOT_LOOSE' && !w.location.toLowerCase().includes('root folder')) return false;
    if (auditFilterCategory === 'REGION_LOOSE' && !w.location.toLowerCase().includes('folder region')) return false;
    if (auditFilterCategory === 'SYNTAX' && (w.issue.toLowerCase().includes('duplikat') || w.location.toLowerCase().includes('root folder') || w.location.toLowerCase().includes('folder region'))) return false;

    // Search Query Filter
    if (auditSearchQuery) {
      const matchName = (w.name || '').toLowerCase().includes(auditSearchQuery);
      const matchLoc = (w.location || '').toLowerCase().includes(auditSearchQuery);
      const matchIssue = (w.issue || '').toLowerCase().includes(auditSearchQuery);
      if (!matchName && !matchLoc && !matchIssue) return false;
    }

    return true;
  });

  const totalFiltered = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / auditItemsPerPage));
  if (auditCurrentPage > totalPages) auditCurrentPage = totalPages;
  if (auditCurrentPage < 1) auditCurrentPage = 1;

  const startIdx = (auditCurrentPage - 1) * auditItemsPerPage;
  const endIdx = Math.min(startIdx + auditItemsPerPage, totalFiltered);
  const pageItems = filtered.slice(startIdx, endIdx);

  if (statsEl) {
    statsEl.textContent = `Showing: ${totalFiltered} / Total: ${allWarningsData.length} Issue`;
  }

  if (infoEl) {
    if (totalFiltered === 0) {
      infoEl.textContent = 'Showing 0 - 0 of 0 entries';
    } else {
      infoEl.textContent = `Showing ${startIdx + 1} - ${endIdx} of ${totalFiltered} entries`;
    }
  }

  if (pageIndicator) {
    pageIndicator.textContent = `Page ${auditCurrentPage} of ${totalPages}`;
  }

  if (btnPrev) btnPrev.disabled = auditCurrentPage <= 1;
  if (btnNext) btnNext.disabled = auditCurrentPage >= totalPages;

  if (totalFiltered === 0) {
    if (allWarningsData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">✨ Tidak ada masalah. Seluruh struktur file di Drive telah sesuai konvensi.</td></tr>`;
    } else {
      tbody.innerHTML = `<tr><td colspan="4" class="empty-state">🔍 Tidak ada warning yang sesuai dengan filter/pencarian Anda.</td></tr>`;
    }
    return;
  }

  tbody.innerHTML = pageItems.map(w => `
    <tr>
      <td style="font-weight: 500; color: var(--sand-w);">${w.name}</td>
      <td style="color: var(--muted);">${w.location}</td>
      <td><span class="issue-tag">${w.issue}</span></td>
      <td><a href="${w.webViewLink}" target="_blank" class="link-drive">BUKA DI DRIVE ↗</a></td>
    </tr>
  `).join('');
}

async function fetchStatus() {
  if (!authToken) return;

  try {
    const res = await fetch('/api/admin/status', {
      headers: { 'x-admin-password': authToken }
    });

    if (res.status === 401) {
      handleLogout();
      return;
    }

    const data = await res.json();

    // Status Badge & Message
    const badge = document.getElementById('syncStatusBadge');
    if (badge) {
      badge.className = `status-badge status-${data.status}`;
      badge.textContent = data.status;
    }

    const msgEl = document.getElementById('syncMessage');
    if (msgEl) msgEl.textContent = data.message || '';

    // Progress Bar update
    const prog = data.progress || { phase: 'idle', total: 0, current: 0, downloaded: 0, skipped: 0, scannedFolders: 0, totalFolders: 0 };
    const progContainer = document.getElementById('progressContainer');
    if (progContainer) {
      if (data.status === 'syncing') {
        progContainer.style.display = 'block';
        if (prog.phase === 'scanning' || prog.total === 0) {
          const folderTotal = prog.totalFolders || 1;
          const folderScanned = prog.scannedFolders || 0;
          const scanPercent = Math.min(99, Math.round((folderScanned / folderTotal) * 100));
          document.getElementById('progressBarFill').style.width = scanPercent + '%';
          document.getElementById('progressPercent').textContent = scanPercent + '%';
          document.getElementById('progressText').textContent = `Scanning Drive (${folderScanned}/${folderTotal} folder)...`;
        } else {
          const total = prog.total || 1;
          const current = prog.current || 0;
          const percent = Math.min(100, Math.round((current / total) * 100));
          document.getElementById('progressBarFill').style.width = percent + '%';
          document.getElementById('progressPercent').textContent = percent + '%';
          document.getElementById('progressText').textContent = `Mendownload asset (${current}/${total} file)...`;
        }
      } else if (data.status === 'success') {
        progContainer.style.display = 'block';
        document.getElementById('progressBarFill').style.width = '100%';
        document.getElementById('progressPercent').textContent = '100%';
        document.getElementById('progressText').textContent = 'Sinkronisasi Selesai!';
      } else {
        progContainer.style.display = 'none';
      }
    }

    // Last Sync Time
    const lastSyncEl = document.getElementById('lastSyncTime');
    if (lastSyncEl) {
      if (data.lastSyncTime) {
        const date = new Date(data.lastSyncTime);
        lastSyncEl.textContent = date.toLocaleString('id-ID');
      } else {
        lastSyncEl.textContent = 'Belum pernah';
      }
    }

    // Stats
    const filesStatsEl = document.getElementById('filesStats');
    if (filesStatsEl) filesStatsEl.textContent = prog.total || 0;
    
    const filesStatsDetailEl = document.getElementById('filesStatsDetail');
    if (filesStatsDetailEl) filesStatsDetailEl.textContent = `Downloaded: ${prog.downloaded || 0} | Skipped: ${prog.skipped || 0}`;

    // Warnings Count & Table
    const warnings = data.warnings || [];
    const warningsCountEl = document.getElementById('warningsCount');
    if (warningsCountEl) warningsCountEl.textContent = warnings.length;

    // Save raw warnings and render table
    allWarningsData = warnings;
    renderAuditTable();

    // Logs
    const logBox = document.getElementById('logBox');
    if (logBox && data.logs && data.logs.length > 0) {
      logBox.innerHTML = data.logs.map(l => `<div>${l}</div>`).join('');
    }

    // Button state
    const btn = document.getElementById('btnSync');
    if (btn) {
      if (data.status === 'syncing') {
        btn.disabled = true;
        btn.innerHTML = `<i class="ph ph-spinner spinner"></i> SYNCING IN PROGRESS...`;
      } else {
        btn.disabled = false;
        btn.innerHTML = `<i class="ph ph-arrows-clockwise"></i> START MANUAL SYNC NOW`;
      }
    }

  } catch (err) {
    console.error('Fetch status error:', err);
  }
}

async function triggerSync() {
  if (!authToken) return;

  try {
    const btn = document.getElementById('btnSync');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `MEMULAI SYNC...`;
    }

    const res = await fetch('/api/admin/sync', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-password': authToken 
      }
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Gagal memulai sync');
    } else {
      fetchStatus();
    }
  } catch (err) {
    alert('Error memicu sync: ' + err.message);
  }
}

// Auto-check session on DOMReady & trigger wipe animation out
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const wipe = document.getElementById('wipe');
    if (wipe) wipe.classList.add('out');
  }, 80);

  if (authToken) {
    showDashboard();
  }

  // Poll status every 3 seconds if logged in
  setInterval(() => {
    const dashboardScreen = document.getElementById('dashboardScreen');
    if (authToken && dashboardScreen && dashboardScreen.style.display !== 'none') {
      fetchStatus();
    }
  }, 3000);
});
