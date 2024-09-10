const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const mockAuth = require("../middlewares/mock");


// Multer configuration
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
 // profile routes
router.get("/profile", mockAuth, UserController.getUserProfile);
router.put("/profile", mockAuth, upload.single("profilePicture"), UserController.updateUserProfile);


module.exports = router;