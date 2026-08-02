'use strict';

const fs = require('fs');
const path = require('path');
const { STATUS_FILE } = require('../../../config/constants');

let syncState = {
  status: 'idle', // 'idle' | 'syncing' | 'success' | 'error'
  lastSyncTime: null,
  syncStartedAt: null,
  message: 'System ready',
  progress: { phase: 'idle', total: 0, current: 0, downloaded: 0, skipped: 0, scannedFolders: 0, totalFolders: 0 },
  warnings: [],
  logs: []
};

// Load saved status on start
try {
  if (fs.existsSync(STATUS_FILE)) {
    const raw = fs.readFileSync(STATUS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    syncState = { ...syncState, ...parsed, status: 'idle' };
  }
} catch (e) {
  // Ignore fallback
}

function saveStatus() {
  try {
    const dir = path.dirname(STATUS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STATUS_FILE, JSON.stringify(syncState, null, 2));
  } catch (err) {
    console.error('[gdrive-status] Failed to save status:', err.message);
  }
}

function addLog(msg) {
  const time = new Date().toLocaleTimeString();
  const entry = `[${time}] ${msg}`;
  syncState.logs.unshift(entry);
  if (syncState.logs.length > 100) syncState.logs.pop();
  console.log('[gdrive-sync]', entry);
  saveStatus();
}

function getSyncStatus() {
  if (syncState.status !== 'syncing' && fs.existsSync(STATUS_FILE)) {
    try {
      const raw = fs.readFileSync(STATUS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      syncState = { ...syncState, ...parsed };
    } catch (e) {
      console.error('[gdrive-status] Failed to reload status file:', e.message);
    }
  }
  return syncState;
}

function updateSyncState(patch) {
  syncState = { ...syncState, ...patch };
  saveStatus();
}

module.exports = {
  syncState,
  saveStatus,
  addLog,
  getSyncStatus,
  updateSyncState
};
