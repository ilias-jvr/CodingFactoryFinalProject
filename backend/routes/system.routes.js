const express = require('express');
const router = express.Router();
const SystemController = require('../controllers/system.controller');

// Login route
router.post('/login', SystemController.login);

// Logout route
router.post('/register', SystemController.register);

module.exports = router;
