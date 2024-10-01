const express = require('express');
const siteController = require('../app/controllers/SitesController');
const router = express.Router();

router.get('/search', siteController.show);
router.get('/', siteController.index);

module.exports = router;