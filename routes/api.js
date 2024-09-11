const express = require('express');
const router = express.Router();




const CommentController = require('../controllers/CommentController');

router.post('/comments', CommentController.create);
router.get('/articles/:article_id/comments', CommentController.getByArticle);
// router.get('/articles/:articleId/comments', CommentController.getCommentsByArticleId);

// router.put('/comments/:id', CommentController.update);
// router.delete('/comments/:id', CommentController.delete);


module.exports = router;