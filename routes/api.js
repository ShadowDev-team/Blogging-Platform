const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/AuthController');

// Authentification
router.post('/users/register', authenticate.register)
router.post('/users/login', authenticate.login)
router.post('/users/reset-password/:email', authenticate.resetPassword)

module.exports = router;