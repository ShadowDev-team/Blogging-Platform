const express = require('express');
const router = express.Router();
const authenticate = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const upload = require("../services/multerService.js");
const articleController = require('../controllers/ArticleContoller');


//home page and blog routes
router.get('/blogs/create',(req, res)=>{
    res.render('pages/addBlog');
})
router.get('/', articleController.getAllArticles);
router.get('/blog/:id', articleController.getBlogById);
// router.post('/createarticle', articleController.createArticle);
router.post("/createarticle",upload.single("image"), articleController.createArticle);


router.post('/blogs/delete', articleController.deleteBlog);
router.get('/blogs/edit/:id', articleController.editBlog)
router.post('/blogs/update/:id', articleController.updateBlog)


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