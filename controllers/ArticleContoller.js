const { Model } = require("sequelize");

const blog = require("../models").Article;
const {User}= require("../models");
const body = require('body-parser');


class ArticleContoller {
async getAllArticles(req, res){
    try{
        const articles = await blog.findAll();
        res.render('pages/home', {articles});
    }catch(error){
        console.error( error);
    }
}

async getBlogById(req, res){
    const id= req.params.id;
    try{
        
        const article = await blog.findByPk(id,{
            include: [{
                model: User,
                as: 'author'
            }]
        });
        if(article !== null){
            res.render('pages/blog', {article});
        }else{
            res.render('404');
        }
    }catch(error){
        console.error(error)
    }
}
async createArticle(req, res){
    const {title, description, content} = req.body;
    try{
        let user_id =1;
        const article = await blog.create({
            user_id,
            title,
            description,
            content,
        });
        // res.status(204).send();
        if(article){
            res.status(200).render('pages/addBlog');
        }else{
            res.status(400).render('pages/addBlog');

        }
 
    }catch(error){
        console.error('errrrrrrr'+error);
    }

}




}

module.exports = new ArticleContoller;