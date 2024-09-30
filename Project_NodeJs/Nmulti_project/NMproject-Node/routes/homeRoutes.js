// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController');

router.get('/', homeController.getHomePage);

module.exports = router;
