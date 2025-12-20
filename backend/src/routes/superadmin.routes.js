const express = require('express');
const router = express.Router();
const controller = require('../controllers/superadmin.controller');

router.get('/dashboard-stats', controller.getDashboardStats);

module.exports = router;