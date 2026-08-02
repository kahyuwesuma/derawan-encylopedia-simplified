'use strict';

const express = require('express');
const router = express.Router();
const adminController = require('../src/controllers/adminController');
const { requireAdminAuth } = require('../src/middlewares/authMiddleware');

router.get('/admin', adminController.getAdminPage);
router.post('/api/admin/login', adminController.loginAdmin);
router.get('/api/admin/status', requireAdminAuth, adminController.getStatus);
router.post('/api/admin/sync', requireAdminAuth, adminController.triggerSync);
router.get('/api/cron/sync', adminController.triggerCronSync);

module.exports = router;
