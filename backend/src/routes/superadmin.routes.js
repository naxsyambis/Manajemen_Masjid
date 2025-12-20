const express = require('express');
const router = express.Router();
const controller = require('../controllers/superadmin.controller');

router.get('/dashboard-stats', controller.getDashboardStats);
router.get('/masjids', controller.getAllMasjids);
router.get('/takmirs', controller.getAllTakmirs);
router.delete('/takmir/:id', controller.deleteTakmir);

module.exports = router;