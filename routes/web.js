const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const mockAuth = require("../middlewares/mock");
const upload = require("../services/multerService.js");


 // profile routes
router.get("/profile",UserController.getUserProfile);
router.put("/profile",upload.single("profilePicture"), UserController.updateUserProfile);


module.exports = router;