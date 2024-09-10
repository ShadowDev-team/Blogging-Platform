const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const mockAuth = require("../middlewares/mock");

// profile routes
router.get("/profile",mockAuth,UserController.getUserProfile);

module.exports = router;