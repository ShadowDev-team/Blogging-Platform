const Joi = require('joi');
const { Comment, User, Article } = require('../models');

class CommentController {
    async create(req, res) {
        try {
            const { content, article_id } = req.body;
            const user_id = 1;

            // Validate input
            const schema = Joi.object({
                content: Joi.string().required(),
                article_id: Joi.number().integer().required()
            });

            const { error } = schema.validate({ content, article_id });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // Check if article exists
            const article = await Article.findByPk(article_id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            console.log(article);

            // Create comment
            const comment = await Comment.create({
                content,
                article_id,
                user_id
            });

            res.status(201).json({
                message: 'Comment created successfully',
                comment
            });
        } catch (error) {
            console.error('Comment creation error:', error);
            res.status(500).json({ message: 'An error occurred while creating the comment' });
        }
    }

    async getByArticle(req, res) {
        try {
            const { article_id } = req.params;

            const comments = await Comment.findAll({
                where: { article_id }
            });

            res.json(comments);
        } catch (error) {
            console.error('Fetch comments error:', error);
            res.status(500).json({ message: 'An error occurred while fetching comments' });
        }
    }

    // async update(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { content } = req.body;
    //         const user_id = req.session.user.id;

    //         // Validate input
    //         const schema = Joi.object({
    //             content: Joi.string().required()
    //         });

    //         const { error } = schema.validate({ content });
    //         if (error) {
    //             return res.status(400).json({ message: error.details[0].message });
    //         }

    //         // Find comment
    //         const comment = await Comment.findByPk(id);
    //         if (!comment) {
    //             return res.status(404).json({ message: 'Comment not found' });
    //         }

    //         // Check if user is the author of the comment
    //         if (comment.user_id !== user_id) {
    //             return res.status(403).json({ message: 'Not authorized to update this comment' });
    //         }

    //         // Update comment
    //         await comment.update({ content });

    //         res.json({
    //             message: 'Comment updated successfully',
    //             comment
    //         });
    //     } catch (error) {
    //         console.error('Comment update error:', error);
    //         res.status(500).json({ message: 'An error occurred while updating the comment' });
    //     }
    // }

    // async getCommentsByArticleId(req, res) {
    //     try {
    //         const { articleId } = req.params;
            
    //         console.log('Received articleId:', articleId); // Log the received articleId
    //         console.log('Received articleId type:', typeof articleId); // Log the type of articleId

    //         // Validate articleId
    //         if (!articleId || isNaN(articleId)) {
    //             return res.status(400).json({ message: 'Invalid article ID' });
    //         }

    //         const numericArticleId = parseInt(articleId, 10);
    //         console.log('Numeric articleId:', numericArticleId); // Log the parsed numeric articleId

    //         // Check if the article exists
    //         const article = await Article.findByPk(numericArticleId);
    //         if (!article) {
    //             return res.status(404).json({ message: 'Article not found' });
    //         }

    //         // Fetch comments for the article
    //         const comments = await Comment.findAll({
    //             where: { article_id: numericArticleId },
    //             include: [{
    //                 model: User,
    //                 as: 'author',
    //                 attributes: ['id', 'username']
    //             }],
    //             order: [['createdAt', 'DESC']]
    //         });

    //         console.log('Found comments:', comments.length); // Log the number of comments found

    //         res.json({
    //             articleId: numericArticleId,
    //             commentsCount: comments.length,
    //             comments: comments
    //         });
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //         res.status(500).json({ message: 'An error occurred while fetching comments', error: error.message });
    //     }
    // }

    

    // async delete(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const user_id = req.session.user.id;

    //         // Find comment
    //         const comment = await Comment.findByPk(id);
    //         if (!comment) {
    //             return res.status(404).json({ message: 'Comment not found' });
    //         }

    //         // Check if user is the author of the comment
    //         if (comment.user_id !== user_id) {
    //             return res.status(403).json({ message: 'Not authorized to delete this comment' });
    //         }

    //         // Delete comment
    //         await comment.destroy();

    //         res.json({ message: 'Comment deleted successfully' });
    //     } catch (error) {
    //         console.error('Comment deletion error:', error);
    //         res.status(500).json({ message: 'An error occurred while deleting the comment' });
    //     }
    // }
}

module.exports = new CommentController();



// const Joi = require('joi');
// const { Comment, User, Article } = require('../models');

// class CommentController {
//     async create(req, res) {
//         try {
//             const { content, article_id } = req.body;
            
//             // Temporary: Log the request body
//             console.log('Request body:', req.body);

//             // Temporary: Check if user is authenticated
//             if (!req.session || !req.session.user) {
//                 return res.status(401).json({ message: 'User not authenticated' });
//             }
//             const user_id = req.session.user.id;

//             // Validate input
//             const schema = Joi.object({
//                 content: Joi.string().required(),
//                 article_id: Joi.number().integer().required()
//             });

//             const { error } = schema.validate({ content, article_id });
//             if (error) {
//                 return res.status(400).json({ message: error.details[0].message });
//             }

//             // Check if article exists
//             const article = await Article.findByPk(article_id);
//             if (!article) {
//                 return res.status(404).json({ message: 'Article not found' });
//             }

//             // Create comment
//             const comment = await Comment.create({
//                 content,
//                 article_id,
//                 user_id
//             });

//             res.status(201).json({
//                 message: 'Comment created successfully',
//                 comment
//             });
//         } catch (error) {
//             console.error('Comment creation error:', error);
//             res.status(500).json({ message: 'An error occurred while creating the comment', error: error.message });
//         }
//     }

//     // ... other methods remain the same
// }

// module.exports = new CommentController();