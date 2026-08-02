'use strict';

const express = require('express');
const router = express.Router();
const galleryController = require('../src/controllers/galleryController');

router.get('/gallery', galleryController.getGalleryData);
router.get('/gallery/meta', galleryController.getGalleryMeta);
router.post('/gallery/refresh', galleryController.refreshCache);

module.exports = router;
