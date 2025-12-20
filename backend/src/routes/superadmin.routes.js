const express = require('express');
const router = express.Router();
const controller = require('../controllers/superadmin.controller');

router.get('/dashboard-stats', controller.getDashboardStats);
router.get('/masjids', controller.getAllMasjids);
router.get('/takmirs', controller.getAllTakmirs);
router.delete('/takmir/:id', controller.deleteTakmir);
router.get('/masjid', controller.getMasjidList);
router.post('/masjid', controller.storeMasjid);
router.delete('/masjid/:id', controller.deleteMasjid);

module.exports = router;