'use strict';

const fs = require('fs');
const { google } = require('googleapis');
const { GDRIVE_CREDENTIALS_PATH } = require('../../../config/constants');

function getDriveClient(addLog) {
  let auth = null;
  const saJsonEnv = process.env.GDRIVE_SERVICE_ACCOUNT_JSON;

  if (saJsonEnv) {
    try {
      const credentials = JSON.parse(saJsonEnv.trim());
      if (credentials.private_key && typeof credentials.private_key === 'string') {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });
    } catch (e) {
      if (addLog) addLog('Error parsing GDRIVE_SERVICE_ACCOUNT_JSON env: ' + e.message);
    }
  } else if (fs.existsSync(GDRIVE_CREDENTIALS_PATH)) {
    auth = new google.auth.GoogleAuth({
      keyFile: GDRIVE_CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });
  }

  if (!auth && process.env.GDRIVE_API_KEY) {
    return google.drive({ version: 'v3', auth: process.env.GDRIVE_API_KEY });
  }

  if (!auth) {
    return null;
  }

  return google.drive({ version: 'v3', auth });
}

module.exports = { getDriveClient };
