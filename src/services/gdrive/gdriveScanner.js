'use strict';

const path = require('path');
const { SUPPORTED_EXT } = require('../filenameParser');

function validateFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (!SUPPORTED_EXT.has(ext)) {
    return { valid: false, reason: `Unsupported file extension (${ext})` };
  }

  const base = path.basename(filename, ext);
  const parts = base.split(/_+/).map(s => s.trim()).filter(Boolean);

  if (parts.length === 0) {
    return { valid: false, reason: 'Filename has no readable species/site tokens' };
  }

  return { valid: true };
}

async function scanDriveHierarchy(drive, folderId, addLog, warnings, syncState, saveStatus) {
  addLog(`Scanning Google Drive root folder: ${folderId}`);

  // Fetch Regions (level 1 subfolders) & root loose files concurrently
  const [regionsRes, rootFilesRes] = await Promise.all([
    drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, webViewLink)',
      pageSize: 1000
    }),
    drive.files.list({
      q: `'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, webViewLink)',
      pageSize: 1000
    })
  ]);

  const regions = regionsRes.data.files || [];
  addLog(`Found ${regions.length} region folder(s)`);

  (rootFilesRes.data.files || []).forEach(f => {
    warnings.push({
      id: f.id,
      name: f.name,
      location: 'Root Folder (Drive)',
      issue: 'File diletakkan langsung di folder utama (Harus di dalam folder Region -> Site)',
      webViewLink: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`
    });
  });

  if (syncState && syncState.progress) {
    syncState.progress.phase = 'scanning';
    syncState.progress.totalFolders = regions.length;
    syncState.progress.scannedFolders = 0;
    if (saveStatus) saveStatus();
  }

  let rawSiteFiles = [];
  let scannedFolderCount = 0;

  // Process all region folders
  for (const regionFolder of regions) {
    addLog(`Scanning Region: ${regionFolder.name}`);

    const [sitesRes, regionLooseFiles] = await Promise.all([
      drive.files.list({
        q: `'${regionFolder.id}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, webViewLink)',
        pageSize: 1000
      }),
      drive.files.list({
        q: `'${regionFolder.id}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, webViewLink)',
        pageSize: 1000
      })
    ]);

    const sites = sitesRes.data.files || [];

    (regionLooseFiles.data.files || []).forEach(f => {
      warnings.push({
        id: f.id,
        name: f.name,
        location: `Folder Region: ${regionFolder.name}`,
        issue: 'File diletakkan langsung di folder Region tanpa folder Dive Site',
        webViewLink: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`
      });
    });

    if (syncState && syncState.progress) {
      syncState.progress.totalFolders += sites.length;
    }

    // Scan site folders
    const siteFileResults = await Promise.all(sites.map(async (siteFolder) => {
      const filesRes = await drive.files.list({
        q: `'${siteFolder.id}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name, size, md5Checksum, webViewLink)',
        pageSize: 1000
      });

      const files = filesRes.data.files || [];
      const siteItems = files.map(file => ({
        id: file.id,
        name: file.name,
        size: parseInt(file.size || '0', 10),
        md5: file.md5Checksum,
        regionFolder: regionFolder.name,
        siteFolder: siteFolder.name,
        webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`
      }));

      scannedFolderCount++;
      if (syncState && syncState.progress) {
        syncState.progress.scannedFolders = scannedFolderCount;
        syncState.message = `Scanning folder (${scannedFolderCount}/${syncState.progress.totalFolders}): ${regionFolder.name} / ${siteFolder.name}`;
        if (saveStatus) saveStatus();
      }

      return siteItems;
    }));

    siteFileResults.forEach(files => {
      rawSiteFiles = rawSiteFiles.concat(files);
    });

    scannedFolderCount++;
    if (syncState && syncState.progress) {
      syncState.progress.scannedFolders = scannedFolderCount;
      if (saveStatus) saveStatus();
    }
  }

  // 1. Audit pass for Filename Format Validation
  // 2. Audit pass for Duplicate Files (Filename or MD5 Hash)
  const seenNames = new Map();
  const seenMd5s = new Map();
  const validDriveFiles = [];

  for (const item of rawSiteFiles) {
    const locStr = `${item.regionFolder} / ${item.siteFolder}`;

    // Check filename syntax validation
    const val = validateFilename(item.name);
    if (!val.valid) {
      warnings.push({
        id: item.id,
        name: item.name,
        location: locStr,
        issue: val.reason,
        webViewLink: item.webViewLink
      });
    }

    // Check duplicate filename
    const normName = item.name.replace(/[\/\\]/g, '-').toLowerCase();
    if (seenNames.has(normName)) {
      const firstLoc = seenNames.get(normName);
      warnings.push({
        id: item.id,
        name: item.name,
        location: locStr,
        issue: `File duplikat nama (Sudah ada di ${firstLoc})`,
        webViewLink: item.webViewLink
      });
    } else {
      seenNames.set(normName, locStr);
    }

    // Check duplicate MD5 hash content (if present and non-empty)
    if (item.md5) {
      if (seenMd5s.has(item.md5)) {
        const firstInfo = seenMd5s.get(item.md5);
        if (firstInfo.id !== item.id) {
          warnings.push({
            id: item.id,
            name: item.name,
            location: locStr,
            issue: `Konten file identik/duplikat MD5 dengan "${firstInfo.name}" (${firstInfo.location})`,
            webViewLink: item.webViewLink
          });
        }
      } else {
        seenMd5s.set(item.md5, { id: item.id, name: item.name, location: locStr });
      }
    }

    // Only include in valid sync downloads if syntax is valid and name not duplicated
    if (val.valid && seenNames.get(normName) === locStr) {
      validDriveFiles.push(item);
    }
  }

  if (syncState && syncState.progress) {
    syncState.progress.phase = 'downloading';
    if (saveStatus) saveStatus();
  }

  return validDriveFiles;
}

module.exports = {
  validateFilename,
  scanDriveHierarchy
};
