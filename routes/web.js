const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleContoller');

router.get('/home', articleController.getAllArticles);
router.get('/blog/:id', articleController.getBlogById);

module.exports = router;