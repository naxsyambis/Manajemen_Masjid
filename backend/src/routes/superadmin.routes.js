// backend/src/routes/superadmin.routes.js

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

// --- TAMBAHKAN DUA BARIS PENTING INI ---
router.get('/unassigned-takmirs', controller.getUnassignedTakmirs); 
router.post('/masjid-with-takmir', controller.storeMasjidWithTakmir);

module.exports = router;