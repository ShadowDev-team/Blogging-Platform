const express = require('express');
const authenticate = require("../controllers/AuthController");
const router = express.Router();

// Authentification
router.get('/login', (req, res) => {
    res.render('pages/auth/login', { layout: false });
})
router.get('/register', (req, res) => {
    res.render('pages/auth/register', { layout: false });
})
router.get('/reset-password', (req, res) => {
    res.render('pages/auth/reset-password', { layout: false });
})
router.get('/logout', authenticate.logout)

module.exports = router;