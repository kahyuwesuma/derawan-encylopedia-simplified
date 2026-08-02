'use strict';

const path = require('path');

const IS_VERCEL = process.env.VERCEL === '1';
const PORT = process.env.PORT || 3001;

const ASSETS_ROOT = path.resolve(__dirname, '../public/assets/api');
const STATUS_FILE = path.resolve(__dirname, '../public/sync-status.json');
const STATIC_JSON_PATH = path.resolve(__dirname, '../public/api/gallery.json');
const GDRIVE_CREDENTIALS_PATH = path.resolve(__dirname, '../gdrive-credentials.json');

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.avi']);
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'derawan2026';

module.exports = {
  IS_VERCEL,
  PORT,
  DEFAULT_ADMIN_PASSWORD,
  ASSETS_ROOT,
  STATUS_FILE,
  STATIC_JSON_PATH,
  GDRIVE_CREDENTIALS_PATH,
  SUPPORTED_EXT,
  VIDEO_EXT,
  IMAGE_EXT,
};
