const express = require('express');
const authenticate = require("../controllers/AuthController");
const router = express.Router();
const UserController = require("../controllers/UserController");
const upload = require("../services/multerService.js");


 // profile routes
router.get("/profile",UserController.getUserProfile);
router.put("/profile",upload.single("profilePicture"), UserController.updateUserProfile);


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
router.get('/reset-password/verify', authenticate.checkResetToken)
router.get('/logout', authenticate.logout)

module.exports = router;