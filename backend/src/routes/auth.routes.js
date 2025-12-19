const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

// Route untuk login
router.post("/login", controller.login);

// Route untuk registrasi akun baru (Takmir/Admin)
router.post("/register", controller.register);

module.exports = router;