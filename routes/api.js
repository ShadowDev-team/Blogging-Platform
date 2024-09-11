const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/AuthController');

// Authentification
router.post('/users/register', authenticate.register);
router.post('/users/login', authenticate.login);
router.get('/users/reset-password', authenticate.resetPassword);
router.post('/users/reset-password/confirm', authenticate.changePassword);
router.get('/users/me', authenticate.me);

module.exports = router;