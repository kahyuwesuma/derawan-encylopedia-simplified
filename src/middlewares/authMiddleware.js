'use strict';

const { DEFAULT_ADMIN_PASSWORD } = require('../../config/constants');

function requireAdminAuth(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  const providedPassword = req.headers['x-admin-password'] || req.body?.password;
  const authHeader = req.headers['authorization'];
  const expectedBearer = `Bearer ${Buffer.from(adminPassword).toString('base64')}`;

  if (
    (providedPassword && providedPassword === adminPassword) ||
    (authHeader && (authHeader === adminPassword || authHeader === expectedBearer))
  ) {
    return next();
  }

  return res.status(401).json({
    success: false,
    authenticated: false,
    message: 'Akses tidak sah. Silakan login terlebih dahulu.'
  });
}

function verifyAdminPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  return password === adminPassword;
}

module.exports = {
  requireAdminAuth,
  verifyAdminPassword
};
