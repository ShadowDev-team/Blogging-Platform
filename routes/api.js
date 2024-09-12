const express = require('express');
const router = express.Router();
const authenticate = require('../controllers/AuthController');

// Authentification
router.post('/users/register', authenticate.register);
router.post('/users/login', authenticate.login);
router.get('/users/reset-password', authenticate.resetPassword);
router.post('/users/reset-password/confirm', authenticate.changePassword);
router.get('/users/me', authenticate.me);




const CommentController = require('../controllers/CommentController');

router.post('/comments', CommentController.create);
router.get('/articles/:article_id/comments', CommentController.getByArticle);
// router.get('/articles/:articleId/comments', CommentController.getCommentsByArticleId);

// router.put('/comments/:id', CommentController.update);
// router.delete('/comments/:id', CommentController.delete);


module.exports = router;