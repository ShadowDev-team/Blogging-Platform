const express = require('express');
const router = express.Router();
const authenticate = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const upload = require("../services/multerService.js");
const articleController = require('../controllers/ArticleContoller');


//home page and blog routes
router.get('/blog/create',(req, res)=>{
    res.render('pages/addBlog');
})
router.get('/home', articleController.getAllArticles);
router.get('/blog/:id', articleController.getBlogById);
router.post('/createArticle', articleController.createArticle);
router.post('/blog/delete', articleController.deleteBlog);
router.get('/blog/edit/:id', articleController.editBlog)
router.post('/blog/update/:id', articleController.updateBlog)


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