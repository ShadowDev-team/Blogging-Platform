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
                where: { article_id },
                order: [['createdAt', 'DESC']],
                limit:3
          
            });
    
            res.json(comments);
        } catch (error) {
            console.error('Fetch comments error:', error);
            res.status(500).json({ message: 'An error occurred while fetching comments' });
        }
    }
    

   
}

module.exports = new CommentController();


