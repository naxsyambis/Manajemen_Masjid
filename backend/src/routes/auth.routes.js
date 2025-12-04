const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

// Route untuk proses login
router.post("/login", controller.login);

// Contoh route register (untuk testing awal)
router.post("/register", controller.register);

module.exports = router;